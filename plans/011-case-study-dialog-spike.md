# Plan 011: Spike — open case studies in a dialog while keeping their slugs

> **Executor instructions**: This is a SPIKE plan: the deliverable is a working
> prototype for ONE case study plus a written recommendation — NOT a full
> rollout. Follow it step by step, run every verification command, and honor
> the STOP conditions. When done, update the status row for this plan in
> `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- "app/(case-study)/" "app/(main)/" components/CaseStudyLayout.tsx`
> These files have known uncommitted WIP at planning time (getirfinans-dark-mode,
> home page featured list). Compare the "Current state" excerpts against the
> live code before proceeding; on a structural mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P3
- **Effort**: M (spike) — full rollout estimated L, scoped by a follow-up plan
- **Risk**: MED (routing architecture change; prototype only, so contained)
- **Depends on**: plans/009-case-study-seo.md should land FIRST (the dialog approach must preserve its per-page metadata — see Constraints)
- **Category**: direction
- **Planned at**: commit `cae30f1`, 2026-06-10 (requested by the maintainer the same day)

## Why this matters

The maintainer wants case studies to feel lighter: clicking one from the home or works page should open it in a dialog over the current page instead of a full navigation — but the slugs must stay exactly as they are (`/wisecareai`, `/commodore`, …) so direct links, SEO, and shared URLs keep working. The repo already proves the interaction pattern works at small scale: the lab page opens items in a modal, syncs the URL with `history.pushState`, and keeps `/lab/[slug]` as a real route for direct loads (`components/lab/LabApp.tsx:50-78`). The question this spike answers: which of two architectures should carry the same pattern for case studies, which are much heavier (full pages with their own layout, metadata, and static image imports).

## The two candidate architectures

**Option A — Next.js intercepting + parallel routes (idiomatic).**
A `@modal` parallel-route slot in the `(main)` layout plus intercepting routes (`(.)wisecareai` etc.) renders the case-study content in a dialog on *soft* navigation from `(main)` pages, while a *hard* load of `/wisecareai` still renders the existing full page from `(case-study)`. URL updates through the real router (back/forward, prefetch, scroll restoration all native).
Known risks to probe: interception across route groups (`(main)` → `(case-study)` segments), whether six static intercepting folders are needed vs. one dynamic `(.)[slug]` (and whether a dynamic intercept accidentally catches `/about` etc. — static routes should win, verify), and dismiss behavior (`router.back()` vs. closing to `/`).

**Option B — Lab-style client dialog + `history.pushState`.**
A client component on home/works opens a `CaseStudyDialog` and pushes the slug URL, exactly like `LabApp`. Full pages remain untouched for direct loads.
Known risks: bypasses the Next router (router cache and the URL can desync), no prefetching of dialog content, and the pattern duplicates what intercepting routes do natively.

**Shared prerequisite for either option**: case-study content currently lives inline in each `page.tsx` as a `contentBlocks` array passed to `CaseStudyLayout` (see `app/(case-study)/wisecareai/page.tsx:12-124`). To render the same content in a dialog, the blocks must be extracted into an importable module per case study (e.g. `app/(case-study)/wisecareai/content.ts` exporting `contentBlocks`, plus the title/date/company/role/websiteUrl props). Static image imports move with them — they work in any module.

## Current state

- Route groups: `app/(main)/` (home, about, works, bookmarks, lab — shares `app/(main)/layout.tsx` with Header/MobileTabBar) and `app/(case-study)/` (seven case-study folders — shares `app/(case-study)/layout.tsx`, which is a different shell: sticky Back nav + Footer, lines 4–38).
- Case-study links originate from `app/(main)/page.tsx` (featured grid) and `app/(main)/works/page.tsx` (full list, targets from `public/data/projects.json` — each entry has a `target` like `/wisecareai`).
- `components/CaseStudyLayout.tsx:54-71` sets `viewTransitionName: project-<slug>` on the first image, paired with `experimental.viewTransition: true` in `next.config.js` — the current page-to-page transition. A dialog replaces this experience; whether to keep, adapt, or drop the view transition for dialog opens is one of the spike's decision points.
- The lab precedent: `components/lab/LabApp.tsx` — modal open/close with `history.pushState` (lines 43–55), popstate sync (58–70), `replaceState` while cycling (73–78), scrim + centered fixed container (158–187).
- Plan 009 (if landed) adds `export const metadata` to each case-study `page.tsx` — those pages must keep serving direct loads with their metadata under either option.
- Uncommitted WIP touches `app/(main)/page.tsx` and `app/(case-study)/getirfinans-dark-mode/` — use **wisecareai** as the spike subject and leave WIP files alone.

## Constraints (apply to both options — these are the acceptance bar)

1. Slugs unchanged; `/wisecareai` direct load renders the full page exactly as today, with its metadata.
2. Soft navigation from `/` or `/works` opens a dialog; URL becomes `/wisecareai`; browser Back closes the dialog and restores the underlying page (with scroll position).
3. Refresh while the dialog is open lands on the full page (same URL — that's the point).
4. Escape and scrim-click close the dialog; body scroll locked while open (the lab's conventions).
5. No regression to the works/home pages' bundle for users who never open a dialog (content must be code-split — dynamic import or route-based splitting, not a static import of all seven case studies into the home page).

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Lint      | `npm run lint`     | exit 0              |
| Build     | `npm run build`    | exit 0              |
| Dev       | `npm run dev`      | serves localhost:3000 |
| Tests     | `npm test`         | pass (only if plan 006 landed) |

## Scope

**In scope** (spike — one case study only):
- `app/(case-study)/wisecareai/content.ts` (create — extracted blocks)
- `app/(case-study)/wisecareai/page.tsx` (slim to import from content.ts)
- Option A: `app/(main)/@modal/` slot files + `app/(main)/layout.tsx` (accept the slot prop)
- Option B (only if A fails): a `CaseStudyDialog` client component + minimal wiring on `app/(main)/works/page.tsx`
- A written findings report: `plans/011-spike-findings.md`

**Out of scope** (do NOT touch):
- The other six case studies — rollout is a follow-up plan after the recommendation is accepted.
- `app/(main)/page.tsx` and `app/(case-study)/getirfinans-dark-mode/` — uncommitted WIP.
- `components/lab/*` — the precedent is read-only reference.
- Removing the `(case-study)` full pages or layout — they stay regardless of option.
- Visual design of the dialog beyond a serviceable scrim + panel (reuse the lab's scrim treatment).

## Git workflow

- Branch: `advisor/011-case-study-dialog-spike`
- Commit per step; this branch is a prototype — it may be merged, cherry-picked, or kept as reference depending on the recommendation.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Extract wisecareai content

Create `app/(case-study)/wisecareai/content.ts` exporting the props currently inlined in `page.tsx` (title, date, company, role, websiteUrl, slug, contentBlocks — move the image imports too). Slim `page.tsx` to import and spread them into `<CaseStudyLayout>`.

**Verify**: `npx tsc --noEmit` → 0; `npm run build` → 0; `/wisecareai` renders identically (compare against production or a pre-change screenshot).

### Step 2: Prototype Option A (intercepting routes)

1. Add the parallel slot: `app/(main)/@modal/default.tsx` returning `null`, and update `app/(main)/layout.tsx` to accept and render the `modal` slot prop alongside `children`.
2. Add the intercept: `app/(main)/@modal/(.)wisecareai/page.tsx` (static folder for the spike; the dynamic-`[slug]` question is step 3) rendering a client dialog component that imports the extracted `content.ts` and renders `CaseStudyLayout` (or a lighter variant) inside a scrim + scrollable panel, with Escape/scrim-click calling `router.back()`.
3. Test the full constraint list (1–5 above) in the dev server, navigating from `/works` → wisecareai.

**Verify**: each numbered constraint, in the browser. Record pass/fail per constraint in the findings file.

### Step 3: Probe Option A's open risks

- Try replacing the static intercept with `(.)[slug]` and confirm `/about`, `/lab`, `/bookmarks` soft navigations are NOT intercepted (static segments should take precedence). Record the result.
- Check the view transition: does the existing `viewTransitionName` cover-image morph still fire on dialog open, double-fire, or break? Record what happens; do not fix beyond disabling the transition name for intercepted opens if trivially possible.
- `npm run build` → confirm the intercepting structure builds and the route table looks sane.

**Verify**: findings recorded; build exits 0.

### Step 4 (only if Option A fails a constraint irreparably): Prototype Option B

Replicate the lab pattern: a client wrapper on `/works` that intercepts clicks on case-study links, opens `CaseStudyDialog` (dynamic-importing the content module), and manages `pushState`/`popstate` like `LabApp.tsx:43-78`. Test the same constraint list.

**Verify**: constraint list pass/fail recorded.

### Step 5: Write the recommendation

Create `plans/011-spike-findings.md`: constraint matrix for the tested option(s), the recommended architecture, the rollout checklist for the remaining six case studies (content extraction per study + one intercept folder each, or the dynamic segment if step 3 proved it safe), open questions (e.g. dialog vs. full-page typography width, what happens to the case-study Back nav, mobile presentation — full-screen sheet vs. centered panel), and a coarse effort estimate for the rollout.

**Verify**: file exists and answers: which option, why, what's next, what's unresolved.

## Test plan

The constraint list (1–5) IS the test matrix, executed manually in the dev server for each prototyped option. If plan 006's vitest setup exists, `npm test` must still pass (the spike shouldn't touch tested code).

## Done criteria

- [ ] `/wisecareai` direct load is pixel-equivalent to today and `npm run build` exits 0
- [ ] A working dialog prototype exists for wisecareai behind at least one option
- [ ] Constraint matrix with pass/fail per option recorded in `plans/011-spike-findings.md`
- [ ] A clear recommendation + rollout checklist + open questions in the same file
- [ ] No out-of-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Interception across the `(main)`/`(case-study)` route-group boundary fundamentally doesn't work in this Next version (i.e. the intercepted route cannot coexist with the `(case-study)` full page at the same URL) — that kills Option A's premise; report before sinking time into workarounds, then proceed to Option B only if the operator confirmed that fallback at dispatch.
- Constraint 5 can't be met without restructuring all case studies' image imports — that changes the rollout cost materially; report with numbers from the build output.
- You're tempted to roll out to more than wisecareai because "it's working" — the spike ends at the recommendation.

## Maintenance notes

- Interacts with plan 009: metadata stays on the full-page routes; the dialog never needs its own metadata (it's the same URL).
- Interacts with the `experimental.viewTransition` flag and `CaseStudyLayout`'s `viewTransitionName` — the rollout plan must decide the transition story explicitly.
- The lab modal and this dialog will be two URL-synced overlay systems; after rollout, consider whether the lab should migrate to the same mechanism (deferred, note only).
