# Lessons Learned

## Patterns & Rules
<!-- Document patterns and rules learned from corrections -->

- **Never run `npm run build` while the dev server is running** — they share
  `.next/`, and the build clobbers the dev server's compiled chunks
  (MODULE_NOT_FOUND on vendor-chunks). Stop the preview server before
  building, or restart it after. (Discovered 2026-06-11 during plan 006
  verification — the lab page 500'd after a concurrent build.)

- **Clear `.next` and restart dev before testing routing-structure changes**
  (parallel routes, intercepting routes, adding/removing route folders).
  Two incidents during plan 011: (1) a leftover production build in `.next`
  made the client router crash with `TypeError: initialTree is not iterable`
  on interception — looked like a Next bug, was stale cache; (2) swapping an
  intercept folder while dev ran produced contradictory interception results
  until a clean restart. Routing behavior is only trustworthy on a freshly
  started dev server with a clean `.next`.

- **`cn()` silently drops custom font-size utilities.** tailwind-merge only
  knows Tailwind's built-in scales, so a theme size like `text-body` or
  `text-lead` looks like a text *color* to it: `cn("text-lead",
  "text-text-primary")` returned only the color and the size vanished, with no
  error and no lint warning. Symptom: an element renders at the inherited size
  while the class list still looks right in the source. Fixed on 2026-08-24 by
  declaring the sizes in `extendTailwindMerge` in `lib/cn.ts` — any new
  `--text-*` token must be added to that list. Plain `className` strings are
  unaffected, which is why some elements were correct and others were not.

- **`experimental.viewTransition` in next.config does nothing on stable React.**
  It only exposes React's `unstable_ViewTransition`, which `react@19.2.4` does
  not export (`'unstable_ViewTransition' in require('react')` is `false`).
  Setting `view-transition-name` on elements is therefore inert on its own:
  something has to call `document.startViewTransition`. `lib/useRouteTransition.ts`
  does it directly. To check whether a transition actually runs, patch
  `document.startViewTransition` in the console before clicking and count the
  calls; it was 0 before 2026-08-24.

- **A duplicate `view-transition-name` silently disables the whole transition.**
  The home page renders the featured grid *and* the full project list, so four
  slugs claimed the same name twice and nothing morphed. `Section` takes
  `claimedSlugs` so the list yields those names to the grid. When adding a new
  surface that links to case studies, check for duplicates first:
  `[...document.querySelectorAll('*')].filter(e => e.style?.viewTransitionName)`.

- **A JS-driven entry animation makes the whole page invisible until hydration.**
  framer-motion serializes the `initial` variant into the SSR HTML, so
  `AnimateIn`'s `{ opacity: 0, y: 12 }` shipped on every page and the content
  only appeared once the bundle downloaded and React hydrated. Lighthouse read
  it exactly as it looked: FCP 0.9s, LCP 5.5s, TBT 4ms, on pages whose text was
  in the HTML the entire time. Entry motion that is decorative belongs in CSS,
  where it runs at first paint and needs no JavaScript; keep framer-motion for
  interaction motion (the lab modal, the sidebar stack). Fixed 2026-08-25 in
  plan 013. The check is
  `curl -s localhost:PORT/ | grep 'opacity:0;transform'` returning nothing.

- **An IntersectionObserver cannot answer "how far down the page am I".**
  It fires on boundary *crossings*. Jump from the bottom of a long article to
  the top and a far-off section goes from entirely above the viewport to
  entirely below it without ever intersecting, so no callback runs and any
  derived state goes stale. Caught in plan 013 when `CaseStudyNav`'s active
  section stayed on section 4 after scrolling back to the top. For
  scroll-position questions: measure the offsets once, cache them, re-measure
  on `ResizeObserver`, and do arithmetic against `window.scrollY` per frame.
  Zero layout reads, and correct at any scroll position. Use IntersectionObserver
  for what it is for, which is visibility (the AI gallery uses it correctly to
  pause off-screen video).

- **`next/image` re-encodes and resizes static imports at request time**, so a
  fat source file is a repo and deploy cost, not a delivered-bytes cost.
  `picture.jpeg` is 720KB on disk and 26KB over the wire. Before "optimizing" an
  image, measure what is actually served:
  `curl -s -o /dev/null -w '%{size_download}' '/_next/image?url=...&w=256&q=75'`.
  The delivered-bytes lever is `images.formats` in `next.config.js`, not the
  source file. Corollary: a statically imported file under `public/` ships
  twice, once verbatim and once hashed into `.next/static/media`.

## Mistakes to Avoid
<!-- Track mistakes and their solutions -->

- **If framer-motion animations "don't run" in the preview browser, check
  `document.visibilityState` and probe `requestAnimationFrame` FIRST** —
  before bisecting code. A hidden/minimized preview window pauses rAF
  entirely: springs never start (elements stay at their initial values),
  ResizeObserver never fires (lab canvas renders zero cards), and
  `experimental.viewTransition` makes soft navigations hang. Each
  `preview_screenshot` forces one paint frame, which advances animations by
  one tick — usable as a manual frame pump, and also the tell-tale clue
  (state flips but styles freeze). Cost: ~45 min of false code-bisecting on
  2026-06-11 while building the site nav shell.

- **Functional flows ARE testable in a hidden claude-in-chrome tab** (when no
  visible window exists): hidden documents *skip* view transitions instead of
  hanging, so soft navigation works — unlike the "visible-but-unpainted"
  preview pane. Technique: set `window.__marker` before acting; if it's gone
  afterwards, a full reload happened (that's how the double-close history bug
  surfaced on 2026-07-10). Springs/AnimatePresence exits stay frozen (rAF),
  so exiting panes linger — that's an artifact, not a bug. Motion *feel*
  still needs a visible window. Also: don't `await` across a navigation
  inside one `javascript_tool` call — the eval context dies and the click
  degrades into a hard navigation.

- **Measure before believing a bundle-size diagnosis.** Plan 013 arrived with a
  written brief saying `/about`'s 234 kB First Load JS was the performance
  problem. TBT was 3ms. The bundle was worth reducing and came down 45%, but
  every point of the score came from LCP, and the LCP cause (an entry animation)
  appeared in none of the static analysis. Reading a dependency graph tells you
  what is big, never what is slow. Run Lighthouse first, then read code to
  explain what it found.

- **The preview pane can have a zero-height viewport**, not just a paused rAF.
  On 2026-08-25 `window.innerHeight` and `document.documentElement.scrollHeight`
  both read 0 there, so `window.scrollTo` did nothing and no scroll-driven
  behavior could be exercised at all. Anything scroll-dependent needs a real
  browser: `puppeteer-core` against
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` with an explicit
  `defaultViewport` works, and CDP `Performance.getMetrics` deltas around a
  scripted scroll give real LayoutCount / RecalcStyleCount / ScriptDuration
  numbers for before-and-after comparisons.

- **`/_vercel/insights/script.js` 404s under `next start` and is not a bug.**
  It only exists when served from Vercel. It makes Lighthouse's
  `errors-in-console` fail on every route in local measurement. Do not "fix" it
  by removing `<Analytics />`.

- **`npm run format` reformats the entire repo, not your diff.** Running it in
  plan 013 touched 204 files, reflowing every markdown table and escaping
  emphasis markers in files the change never went near. Format only the files
  you actually edited, or restore the rest before committing.

## Project-Specific Notes
<!-- Notes specific to this portfolio project -->

- **Use “fintech” for public-facing GetirFinans positioning.**
  (Correction, 2026-09-16.)

- **Never infer a product decision from synthesized notes or a recording.**
  State only the visible behavior until the decision owner confirms the
  rationale, especially for AI waiting and answer states. (Correction,
  2026-09-16.)

- **Everything shown in the design-system study is built and in production.**
  "The rest of the system is still being built" was wrong: the components and
  screens on the page are shipped. Do not frame shown work as unfinished; check
  any "still in progress" or "unproven" line against what the page shows.
  (Correction, 2026-09-16.)
