# Plan 011 — Spike findings: case studies in a dialog, slugs unchanged

Executed 2026-06-11 against the post-009 tree (plans 001–010 landed). Prototype
subject: **wisecareai**, opened from `/works` and `/` via Next.js intercepting +
parallel routes (Option A). Option B (lab-style `pushState`) was **not needed** —
Option A passed every constraint.

## Outcome (2026-08-24)

**Rollout rejected. The prototype has been removed.** All eight case studies
now open as full pages.

Deleted: `app/(main)/@modal/` (the `(.)wisecareai` intercept, `CaseStudyDialog`,
`default.tsx`) and the `modal` slot in `app/(main)/layout.tsx`.
`app/(case-study)/wisecareai/content.ts` stays — the content split it introduced
became the standard for every case study.

Reason: the case study format redesign of the same day built the page around
window-scroll reading affordances the dialog does not have — a sticky section
rail, a reading-progress line, section anchors, and the cover-to-article view
transition (which the dialog deliberately omits). The flagship case study is
~13,000px tall, which a centred dialog is the wrong container for. The spike's
own open questions (dialog width, missing Back nav, transition story) were never
resolved, and resolving them would have meant designing against the reading
page rather than with it.

The findings below stand as a record of what was tested and what worked.

---

## Recommendation

**Adopt Option A — intercepting + parallel routes — with one STATIC intercept
folder per case study.** Do not use a dynamic `(.)[slug]` intercept (see
probe results). The prototype is committed and working for wisecareai; the
rollout is mechanical.

## Constraint matrix (Option A, verified in dev on a clean server)

| # | Constraint | Result |
|---|-----------|--------|
| 1 | `/wisecareai` direct load renders the full page with plan 009 metadata | **PASS** — `(case-study)` layout, Back nav, `<title>WiseCareAI — Ulaş Alyeşil</title>`, all 9 images |
| 2 | Soft nav from `/` or `/works` opens dialog; URL `/wisecareai`; Back restores page + scroll | **PASS** — works page stays rendered behind scrim; Back restored `scrollY` exactly (220 → 220) |
| 3 | Refresh while dialog open lands on the full page | **PASS** — hard load renders the `(case-study)` route at the same URL |
| 4 | Escape + scrim-click close; body scroll locked while open | **PASS** — both close via `router.back()`; `body.overflow` locked/released correctly |
| 5 | No bundle regression for users who never open a dialog | **PASS** — `/works` First Load JS identical pre/post spike (980 B route / 160 kB); intercept is its own route chunk (`/(.)wisecareai`, 2.1 kB / 136 kB) |

Bonus: links from the home featured grid intercept too, with zero changes to
`app/(main)/page.tsx`.

## Probe results (step 3)

### Dynamic `(.)[slug]` intercept — REJECTED

On a clean dev server, `app/(main)/@modal/(.)[slug]/page.tsx` intercepted
**every single-segment soft navigation**, including `/about`, `/bookmarks`,
and `/lab` (probe rendered with `slug: "about"` etc., while the *previous*
page stayed in the children slot — i.e. navigation visibly broke). Static
routes do NOT take precedence over a same-level dynamic intercept, because
parallel slots match independently: the `@modal` slot matches `(.)[slug]`
regardless of what `children` would match. An intercept page also cannot
"decline" and fall through to normal navigation, so the dynamic variant is
unusable. **Rollout must create one static `(.)<slug>` folder per case
study** (~12 lines each; they did intercept `/wisecareai` and `/commodore`
correctly when tested as the only variant).

### Route-group boundary

Interception from `(main)` pages into a URL owned by `(case-study)` works.
The plan's worry about cross-group interception was unfounded in Next 15.5.19.

### View transitions

`CaseStudyLayout`'s `viewTransitionName: project-<slug>` is set only when a
`slug` prop is passed. The dialog deliberately omits it
(`app/(main)/@modal/(.)wisecareai/page.tsx`), so:
- no duplicate-name collision with the home grid's covers (verified: after
  dialog open from home, only the four cover names exist in the document);
- the cover→article morph does NOT fire on dialog opens. The full-page morph
  still works for hard loads. Whether the dialog open should get its own
  transition (e.g. scale/fade, or a same-document view transition) is a
  rollout design decision.

### Dev-server gotchas (cost ~30 min of this spike; recorded in tasks/lessons.md)

1. The first prototype run crashed with `TypeError: initialTree is not
   iterable` in the client router. Cause: stale `.next` from a production
   build earlier in the session, NOT a routing bug. `rm -rf .next` fixed it.
2. Swapping intercept folders while the dev server runs poisons its route
   state (a probe appeared to show `/commodore` not intercepting; a clean
   restart showed it does). Always restart dev (and clear `.next`) after
   adding/removing intercepting or parallel route folders.

## What the committed prototype contains

- `app/(case-study)/wisecareai/content.ts` — extracted props + contentBlocks
  (static image imports included); `page.tsx` slimmed to spread it.
- `app/(main)/layout.tsx` — accepts and renders the `modal` slot.
- `app/(main)/@modal/default.tsx` — renders null.
- `app/(main)/@modal/CaseStudyDialog.tsx` — client scrim+panel; Escape/scrim →
  `router.back()`; body scroll lock (lab conventions).
- `app/(main)/@modal/(.)wisecareai/page.tsx` — the intercept; renders
  `CaseStudyLayout` inside the dialog, `slug` omitted.

## Rollout checklist (follow-up plan, after recommendation is accepted)

Per remaining case study (×6: commodore, full-spectrum-insights, genesis,
good-afternoon-creative, jotform-integrations, getirfinans-dark-mode):
1. Extract `content.ts` (move inline blocks + image imports; commodore and
   good-afternoon-creative already keep content in JSON — extract props only).
2. Add `app/(main)/@modal/(.)<slug>/page.tsx` (copy of the wisecareai one).

Plus once:
3. Decide the dialog-open transition story (none / fade / view transition).
4. Decide mobile presentation (current: centered panel with padding; consider
   full-screen sheet under `sm:`).
5. Optional polish: focus trap + initial focus, `loading.tsx` for the modal
   slot, close button for touch users, scrollbar-shift compensation.

Effort: **S–M** (~half a day including verification; the pattern is proven).

## Open questions for the maintainer

- Dialog typography width is `max-w-3xl` vs the full page's `max-w-5xl` —
  intentional (dialogs read narrower), but confirm.
- The full page's sticky "Back" nav doesn't exist in the dialog (scrim/Escape
  replace it). OK?
- Should the lab modal later migrate to this mechanism? (Deferred note from
  the plan — two URL-synced overlay systems now coexist.)
- `next/link` prefetches the intercepted route in production viewports —
  good for perceived speed, slight transfer cost on works (7 links). Likely
  fine; measure in the post-rollout perf audit.
