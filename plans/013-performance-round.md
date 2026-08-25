# Plan 013: Measured performance round

Branch: `perf/measured-round-013`. Baseline commit: `808a9b3` (main, clean).
Written 2026-08-25 after a real Lighthouse run, which this repo had never had.

## Skills that informed this plan

Routed through `ui-skills start`, which caps selection at three. This is broad
multi-surface review work, so all three were used:

| Skill                               | What it contributed                                                                                                                                                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pbakaus/optimize`                  | "Measure before and after, optimize the biggest bottleneck first." Drove the decision to run Lighthouse before touching the bundle findings, which is what caught the real problem.                                           |
| `addyosmani/web-quality-audit`      | The Lighthouse 13 evidence workflow and the rule to keep measured findings separate from source-read hypotheses. Its LCP/INP/CLS thresholds are the pass bar used below.                                                      |
| `ibelick/fixing-motion-performance` | Rules 3 and 4 (batch reads, never poll scroll for animation) which is exactly what `CaseStudyNav` does. Also rule 2, "prefer downgrading technique over removing motion entirely", which is the shape of the `AnimateIn` fix. |

`find-skills` covered the gap ui-skills has no entry for, the image and video
pipeline: `agricidaniel/claude-seo@seo-images` (4.7K installs). It supplied the
tiered file-size budgets used below and, more usefully, the rule that an LCP
image must never carry `loading="lazy"`, which is one of the two causes of the
LCP failure. It was read, not installed; its `<picture>` guidance is not
applicable here because `next/image` negotiates format and size at request time.

## The measured baseline

Production build, `next start`, Lighthouse 13.4.1 mobile preset, median of 3 runs.

| route             | perf | a11y | best-p | SEO | FCP   | LCP       | TBT | CLS   |
| ----------------- | ---- | ---- | ------ | --- | ----- | --------- | --- | ----- |
| `/`               | 80   | 96   | 96     | 100 | 0.91s | **5.48s** | 4ms | 0.000 |
| `/about`          | 80   | 100  | 96     | 100 | 1.21s | **5.26s** | 3ms | 0.000 |
| `/getirfinans-ai` | 96   | 96   | 96     | 100 | 1.06s | 2.80s     | 4ms | 0.000 |

First Load JS, from the same build:

| route                 | First Load JS |
| --------------------- | ------------- |
| `/about`              | 234 kB        |
| `/`                   | 176 kB        |
| `/lab`, `/lab/[slug]` | 167 kB        |
| `/works`              | 160 kB        |
| `/bookmarks`          | 159 kB        |
| case studies          | 136 to 145 kB |
| shared by all         | 115 kB        |

`public/` is 30MB: 19MB video, 11MB images.

## What the measurement changed about the brief

The brief expected the bundle to be the story. It is not.

**TBT is 3 to 4ms on every route.** JavaScript execution is not blocking
anything. The 234 kB on `/about` costs transfer and parse, and is worth fixing
on its own terms, but it is not what makes the page score 80. Treating the
dependency list as the headline would have been optimizing the wrong thing.

**LCP is the entire gap**, and it has one root cause plus one aggravating
factor:

1. **Root cause: every main-content page ships server-rendered as invisible.**
   `AnimateIn`/`AnimateItem` (`components/AnimateIn.tsx`) wrap the whole content
   tree of `/`, `/about`, `/works`, `/bookmarks` and `/lab` in a framer-motion
   `variants` pair whose `hidden` state is `{ opacity: 0, y: 12 }`. framer-motion
   serializes that initial variant into the SSR HTML. Confirmed directly:

   ```
   curl -s localhost:3100/ | grep -o 'style="opacity:0;transform:translateY(12px)"'
   ```

   returns hits. So the content paints at FCP as nothing, and only becomes
   visible after the framer-motion bundle downloads, React hydrates, and the
   0.08s-per-child stagger runs. LCP therefore tracks hydration, not paint,
   which is why FCP is 0.9s and LCP is 5.5s with a TBT of 4ms.

   This is a correctness problem as much as a speed one: with JS disabled or
   still loading, the page is blank.

2. **Aggravating factor on `/`: the LCP image is lazy-loaded.**
   `lcp-discovery-insight` fails with `eagerlyLoaded: false` and
   `priorityHinted: false`. The LCP element is the first project cover in the
   grid (`div.grid > a.group > div.relative > img.object-cover`), inside the
   initial viewport at 512px on a 640px-tall mobile viewport, carrying
   `loading="lazy"` and no `fetchpriority`.

Two further measured findings that the brief did not have, both trivial and both
on every single page:

3. **`app/favicon.ico` is 285KB** for 4 icons at 16x16 and 32x32. It is the
   single largest request on every route of the site, larger than the entire
   framework chunk.

4. **`gtag.js` loads with an empty measurement ID.** `app/layout.tsx` renders
   `<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />`.
   With the variable unset, it still fetches 87KB from googletagmanager.com and
   produces the console 404 that `errors-in-console` flags. In production with a
   real ID this is a legitimate 87KB; unset, it is 87KB for nothing.

## Correction to the brief's asset read

The brief states `picture.jpeg` is "717KB delivered for a 192px square". It is
not. Every image on this site is a static import rendered through `next/image`,
which resizes and re-encodes at request time. Measured:

```
/_next/image?url=...picture...&w=256&q=75  ->  26,008 bytes, image/webp
```

26KB delivered, not 720KB. The same holds for `genesis/11.jpg` (1.1MB source)
and `gacWeb.webp` (620KB source).

So raster source weight is **not** a delivered-bytes problem. It is a repo and
deployment weight problem, and there it is worse than the brief says, because
statically imported files under `public/` ship **twice**: once verbatim as part
of `public/`, and once as a content-hashed copy in `.next/static/media`
(6.8MB in this build). That reframes the pipeline decision below.

The delivered-bytes image win is a different one and the brief did not have it:
`next.config.js` sets no `images` config, so Next serves WebP only. Enabling
AVIF is the change that actually reduces what users download.

## Work items, ordered by measured impact

### P0-1. Make content visible at first paint (`AnimateIn`)

Replace the framer-motion entry animation with a CSS animation that runs on
paint without waiting for hydration. Per the motion skill's rule 2, downgrade
the technique, do not remove the motion: same 12px rise, same 0.35s ease-out,
same 0.08s stagger, expressed as `animation` + `animation-delay` and honoring
`prefers-reduced-motion` in CSS rather than via `useReducedMotion()`.

This also deletes a `"use client"` boundary from four page trees.

Do NOT touch: the `view-transition-name` pairs, the `compare` block, the
68-character measure, or the gallery's `frame: "detail"` sizing.

### P0-2. Prioritize the LCP image on `/`

Pass `priority` to the first project cover in the grid. `next/image`'s `priority`
sets both `loading="eager"` and `fetchpriority="high"`, which is exactly the two
checklist items `lcp-discovery-insight` fails. First cover only; making them all
eager would just move the problem.

### P0-3. Rebuild the favicon

285KB to a normal multi-resolution ICO. Target under 15KB.

### P0-4. Guard Google Analytics behind a set measurement ID

Render `<GoogleAnalytics>` only when `NEXT_PUBLIC_GA_ID` is non-empty. Removes
87KB and a console 404 wherever the ID is unset. Note for the after-numbers:
the local measurement has no ID set, so this delta is real locally and would
not appear on production if the ID is configured there. Reported separately so
the other numbers stay honest.

### P0-5. Get the raw capture sources out of the shipped tree

`public/video/getirfinans-ai/incoming/` is 18.4MB of build inputs for
`scripts/ai-captures.sh`, tracked in git and deployed to every visitor's CDN
origin. They are inputs, not runtime assets.

**Decision: git-ignore them locally, keep the folder and its README as the
documented drop location.** Not Git LFS (adds a required setup step to a
one-person repo for files that are already generated-from elsewhere), not an
external bucket (adds credentials and a fetch step to a build that currently has
neither). The recordings live on the device they were captured from; the script
regenerates the shipped clips from them on demand, and the shipped clips stay
committed so a normal build needs neither the sources nor ffmpeg.

`git rm --cached` them, extend `.gitignore`, and state the rule in the README
that already sits in that folder.

### P1-6. Delete unreferenced images

19 files, ~3.6MB, all verified at zero references across `app/`, `components/`,
`lib/` and `scripts/` by full path, basename, and bare stem (the stem check is
what makes this safe against the `` `${I}/name.webp` `` template literals the
brief warns about; a control group of 6 known-live files all returned hits).

```
genesis/13.jpg  genesis/14.webp
quickbooks/{createInvoice,integrationsList,tables,actionList}.{png,webp}
wisecare/Untitled.png
carousel/{jf.png,frey.png,gac.webp}
Frey_App_Icon.png  frey_overview.png
goodafternoon/gacWeb2.webp
gacLogo.svg  noise.svg
```

`genesis/14.webp` is on the brief's list and was a false negative in the first
pass of the audit (the stem "14" collides); it is confirmed dead by direct grep.
`gacLogo.svg` and `noise.svg` are not on the brief's list and are also dead.

### P1-7. Enable AVIF

`images: { formats: ["image/avif", "image/webp"] }` in `next.config.js`. This is
the only change in this plan that reduces bytes users actually download for
images. Measure the delta on a representative cover.

### P1-8. Remove the inert `experimental.viewTransition` flag

Verified inert: `'unstable_ViewTransition' in require('react')` is `false` on
19.2, and `lib/useRouteTransition.ts` calls `document.startViewTransition`
itself. Removing it changes nothing at runtime and removes a misleading signal.

### P2-9. Dependency verdicts

TBT is 4ms, so none of these are urgent. Each gets a measured verdict rather
than an assumption. Two icon libraries needs an answer either way.

### P2-10. `CaseStudyNav` scroll handler

`measure()` runs `getBoundingClientRect()` over every section and calls three
`setState`s on every rAF tick while scrolling, so each frame does N layout reads
plus a full React re-render of the nav. rAF-throttled, so it is not unbounded,
but it violates the motion skill's rules 3 and 4.

Fix within the existing stack: `IntersectionObserver` for active section and
`engaged`, and write the progress bar's width straight to the DOM node instead
of through React state. No library change, no scroll-timeline dependency, so no
browser-support risk. Behavior identical.

## Done means

- Lighthouse before and after on the same three routes, same conditions, deltas stated.
- `public/` materially smaller and the raw sources no longer tracked.
- `/about` either no longer the outlier or a written reason why it has to be.
- `plans/README.md` updated, `tasks/todo.md` reflecting what landed.

## Results

All numbers same conditions as the baseline: production build, `next start` on
port 3100, Lighthouse 13.4.1 mobile preset, median of 3 runs.

### Lighthouse

| route             | perf            | LCP               | TBT       | total bytes        |
| ----------------- | --------------- | ----------------- | --------- | ------------------ |
| `/`               | 80 → **97**     | 5.48s → **2.58s** | 4ms → 2ms | 795KB → **352KB**  |
| `/about`          | 80 → **97**     | 5.26s → **2.46s** | 3ms → 3ms | 734KB → **301KB**  |
| `/getirfinans-ai` | 96 → **97**     | 2.80s → **2.56s** | 4ms → 2ms | 772KB → **395KB**  |

LCP is down 53% on `/` and 53% on `/about`. Accessibility, best practices and
SEO were already 96 to 100 and are unchanged.

These are from the final build, re-run after the last code change. An earlier
3-run pass on `/getirfinans-ai` produced 95 / 2.91s; five runs put its median at
97 / 2.56s and the final 3-run pass agreed. Its LCP element is a video poster,
which makes it the noisiest of the three: treat anything under about 150ms on
that route as run-to-run variance, not signal.

`lcp-discovery-insight` now passes on `/`. It still fails on `/getirfinans-ai`,
where the LCP element is the first gallery video's poster and nothing hints its
priority. Not fixed here: the constraint says improve the encoding before
touching gallery behavior, and at 97 it is not worth the risk. Left as the one
open LCP item.

### Bundles

| route                 | before     | after          |      |
| --------------------- | ---------- | -------------- | ---- |
| `/about`              | 234 kB     | **128 kB**     | -45% |
| `/`                   | 176 kB     | **126 kB**     | -28% |
| `/lab`, `/lab/[slug]` | 167 kB     | **155 kB**     | -7%  |
| `/works`              | 160 kB     | **110 kB**     | -31% |
| `/bookmarks`          | 159 kB     | **109 kB**     | -31% |
| case studies          | 136-145 kB | **124-133 kB** | -9%  |
| shared by all         | 115 kB     | **102 kB**     | -11% |

**`/about` is no longer the outlier.** At 128 kB it now sits level with `/`
(126 kB). The largest route is `/lab` at 155 kB, which is framer-motion driving
the lab modal: that is the one place in the app where the motion is the
feature, so it stays.

The shared chunk fell 13 kB because `AnimateIn` stopped being a client
component, which took framer-motion off the shared path for every route that
only used it for the page entry.

### Assets

|                     | before              | after                   |
| ------------------- | ------------------- | ----------------------- |
| `public/`, tracked  | 29.9 MB (103 files) | **7.7 MB (80 files)**   |
| whole repo, tracked | 36.8 MB (360 files) | **14.3 MB (339 files)** |
| `public/video/`     | 19 MB               | **832 KB**              |
| `public/images/`    | 11 MB               | **7.0 MB**              |
| `app/favicon.ico`   | 285,478 B           | **2,701 B**             |

Three parts: 18.4MB of raw capture sources moved out of the tree, ~3.9MB of
unreferenced images deleted, and a favicon that was 285KB for a blue circle.

AVIF, measured on a project cover at `w=750&q=75`:

| client                          | bytes      |
| ------------------------------- | ---------- |
| `Accept: image/webp`            | 12,714     |
| `Accept: image/avif,image/webp` | **10,801** |

15% off every optimized image for AVIF-capable browsers, WebP fallback intact.

### Scroll cost in `CaseStudyNav`

120 scripted scroll frames down `/getirfinans-design-system` in headless Chrome,
CDP `Performance.getMetrics` deltas, median of 3 runs each:

|                     | before | after    |
| ------------------- | ------ | -------- |
| ScriptDuration      | 37ms   | **12ms** |
| LayoutDuration      | 5ms    | 4ms      |
| RecalcStyleDuration | 26ms   | 26ms     |
| RecalcStyleCount    | 137    | 254      |

Script time per scroll is down 68%. Layout and style time did not move, so the
win is main-thread JavaScript, not rendering. Recalc _count_ went up, because
the progress bar is now a direct style write on every frame that moves it
rather than a React re-render, but each one is scoped to a single inline width
instead of the whole nav subtree, so the total recalc duration is unchanged.
Reporting both directions rather than only the flattering one.

### Dependency verdicts

| dep                     | verdict            | measured cost                  | reasoning                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------- | ------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-markdown`        | **REMOVED**        | part of `/about` -106 kB       | Rendered 5 strings from `data/experience.ts`. Checked all 5: **0 contain any markdown syntax**. It was a parser rendering paragraphs. Replaced with `<p>`.                                                                                                                                                                                                                                                                         |
| `lucide-react`          | **REMOVED**        | 45 MB installed, one icon used | Imported once, for `ChevronDown`. Inlined the same 16-unit path `CaseStudyNav` already draws by hand.                                                                                                                                                                                                                                                                                                                              |
| `@radix-ui/react-icons` | **KEEP**           | 2 usages                       | This is the answer to "two icon libraries": keep the one with more than one use and per-icon module resolution, drop the one imported for a single glyph.                                                                                                                                                                                                                                                                          |
| `luxon`                 | **KEEP, deferred** | off `/about`'s initial bundle  | `plans/README.md` rejected replacing it with `Intl` as a timezone-correctness risk for small payoff. That call stands and is not re-litigated. The measurement showed a different fix: `TimeZoneCard` only renders when the reader hovers "Berlin" or "Istanbul", so `next/dynamic` takes luxon off the initial bundle while keeping luxon. Verified in-browser: hovering "Berlin" loads 2 chunks on demand and the clock renders. |
| `framer-motion`         | **KEEP, narrowed** | shared chunk -13 kB            | The largest legitimate dependency. Removed from the page-entry path, where it was costing an SSR-invisible page; still drives the lab modal, sidebar stack and stack springs, which are interaction motion and belong in JS.                                                                                                                                                                                                       |

### Also done

- `experimental.viewTransition` removed from `next.config.js`. Re-verified inert
  first: `'unstable_ViewTransition' in require('react')` is `false`. Route
  transitions still run through `lib/useRouteTransition.ts`.
- Google Analytics no longer renders with an empty measurement id.

### Not a finding: the console 404

`errors-in-console` fails on every route, before and after. It is
`/_vercel/insights/script.js`, the `@vercel/analytics` script, which only exists
when serving from Vercel and 404s under `next start`. It is an artifact of
measuring on localhost, not a bug, and nothing was changed for it.

### Corrections to the brief, restated

1. `picture.jpeg` is **not** "717KB delivered for a 192px square". It is 26KB
   delivered, because `next/image` re-encodes and resizes static imports at
   request time. Raster source weight is a repo and deploy cost, not a
   delivered-bytes cost.
2. The bundle was not the reason `/about` scored 80. TBT was 3ms. The bundle
   was worth fixing, and was fixed, but the score came back from LCP.
3. `.claude/launch.json` names the dev server `dev` on port 3001, not
   `portfolio`. Unchanged, noted so the next session's brief is right.

### Verification performed

- Typecheck and lint clean; `npm test` reports no test files.
- All 13 routes loaded in headless Chrome at 1440x900: every one returns 200,
  renders content, and every `.enter-item` settles at opacity 1.
- Entry stagger measured in the DOM at 0s / 0.08s / 0.16s, matching the
  framer-motion timing it replaced.
- `CaseStudyNav` driven through top, mid-document, bottom and back-to-top:
  active section, progress bar and compact bar correct at all four.
- `scripts/ai-captures.sh` re-verified at the new source path, including the
  new guard when the sources are absent, and one clip re-encoded to 600x590
  matching the committed `ai-chat-entrance.mp4`.

The preview pane could not be used for visual checks: `window.innerHeight`
reads 0 there, so nothing scrolls and computed styles freeze mid-transition.
That is a sharper version of the pane note already in `tasks/lessons.md`.
Everything above was verified through a real headless Chrome instead.

### An IntersectionObserver bug worth recording

The first rewrite of `CaseStudyNav` used an `IntersectionObserver` to track the
active section. It passed every test except one: scrolling to the bottom and
jumping back to the top left the active section stale at `#token-limits`
instead of resetting to the first.

The cause is structural, not a missing guard. An observer only fires when an
element _crosses_ the root boundary. Jumping from the bottom to the top moves a
far-off section from entirely above the viewport to entirely below it, and it
was not intersecting in either state, so no callback ever runs and the internal
"passed" set keeps a stale entry.

The shipped version measures each section's offset once, caches it, and does
arithmetic against `window.scrollY` per frame, re-measuring on `ResizeObserver`.
Zero layout reads per frame, and correct at any scroll position including an
instant jump. This is the motion skill's rule 3, "measure once, then animate",
which is the right rule here and not the one the observer version followed.
