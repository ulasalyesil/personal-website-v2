# Plan 012: Lab — composed coordinate canvas (kill the random scatter)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat e8bcbb2..HEAD -- components/lab/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1 (the Lab is the portfolio's primary differentiator)
- **Effort**: M
- **Risk**: MED (touches the only bespoke layout system in the repo; has characterization tests in `components/lab/scatter.test.ts`)
- **Depends on**: none

## Why

The Lab is meant to be the site's main driver — it's what signals "builder," not
just "designer." Today it renders items via `scatter()` with a per-load random
seed (`LabCanvas.tsx:23`, `seed = Math.floor(Math.random() * 1e9)`) and
rejection-sampling placement (`scatter.ts:50-68`). The result reads as an
*accidental* layout: uneven density, dead zones, every card the same visual
weight, and a different (often worse) arrangement on every visit.

The fix is not "grid instead of scatter." It is **composition instead of
randomness**: deliberate placement on a coordinate system the author controls,
a tile-size hierarchy, and a graph-paper treatment that makes the canvas itself
read as an engineered instrument (on-brand with the procedural.computer
aesthetic reference). Direction rationale lives in the vault:
`03-projects/personal-website/lab/lab-direction.md`.

## Current state (excerpts — verify against live before editing)

- `components/lab/data.ts` — `LabItem` carries pixel `w`/`h`; 6 items; mostly `tag: "ui"`.
- `components/lab/scatter.ts` — `scatter()` + `scatterAt()` + `gridScan()`; deterministic `seedRand`; obstacle avoidance for the title safe-area.
- `components/lab/LabCanvas.tsx` — measures wrapper, builds obstacles from `safeAreaRef`, calls `scatter()` with a **random** seed, absolutely positions each `lab-scale-in` card.
- `components/lab/LabCard.tsx` — `aspectRatio: w/h`, hover preview, mono tag pill, `wip` flag.
- `components/lab/scatter.test.ts` — characterization tests (no overlap, obstacle avoidance, determinism).

## Target

A composed canvas, not a feed and not a vanilla grid:

1. **Coordinate model, author-controlled.** Each item declares its position on a
   normalized grid, not a random pixel. Replace per-load randomness with a fixed,
   art-directed arrangement per breakpoint.
2. **Tile-size hierarchy (size = importance).** 3 sizes: `lg` (flagship,
   e.g. the AI thinking-state prototype), `md`, `sm` (lotties). Drives visual
   rhythm and stops every card competing.
3. **Graph-paper canvas.** Faint coordinate grid background + hairline rules +
   mono coordinate/label captions. This is the single move that makes it feel
   engineered rather than a moodboard.
4. **Every tile live, never a grey rectangle.** Carry over the grey-flash fix
   from the case-study review (skeleton or play-on-load; no empty box on mount).
5. **Responsive degradation.** Below `768px` (the existing `useIsMobile`
   breakpoint in `LabApp.tsx`), collapse to a single-column chronological feed.
   The composed canvas is a desktop affordance; mobile is the lab-notebook view.

## Steps

### 1. Extend the item model with placement + size

In `components/lab/data.ts`, add to `LabItem`:

```ts
size: "sm" | "md" | "lg";          // drives the tile footprint
// Normalized placement on a 12-col coordinate grid, author-set per item.
// Omit to fall back to auto-flow (see step 3).
pos?: { col: number; row: number };
```

Keep `w`/`h` as the preview's intrinsic aspect ratio (still used by
`LabCard`'s `aspectRatio`). `size` now governs the footprint; `w`/`h` only the
inner preview shape. Assign `size` to all 6 existing items (flagship candidates
→ `lg`; `time-card`/`reader-inbox` → `sm`/`md`).

### 2. Replace the scatter engine with a coordinate layout

New `components/lab/layout.ts` (retire `scatter.ts` once tests are ported):

- A 12-column coordinate grid with a fixed row height and gutter.
- `size` → column/row span (`sm` ≈ 3×2, `md` ≈ 4×3, `lg` ≈ 6×4 — tune visually).
- Honor each item's `pos`; auto-flow any item without one into the next free
  cells (deterministic, top-left → bottom-right; this replaces the random
  fallback, not the composition).
- Keep the title safe-area as a reserved region (port the obstacle concept).
- **No `Math.random`.** Layout is a pure function of items + canvas width.

Port `scatter.test.ts` → `layout.test.ts`: no overlap, safe-area respected,
determinism (same input → same output, every load).

### 3. Graph-paper canvas treatment

In `LabCanvas.tsx` (or a new `LabGrid.tsx`):

- Background: faint coordinate grid (CSS `repeating-linear-gradient` or an SVG
  pattern) using `--color-border-subtle` at low alpha. Cell size = the layout's
  grid unit so cards land *on* the lines.
- Hairline rules framing the canvas; mono coordinate ticks on one axis.
- Card label captions in mono (LabCard already uses mono for the tag pill —
  extend the treatment to a small coordinate/index caption).

### 4. Mobile feed fallback

When `useIsMobile()` is true, render items as a single-column list ordered by
`date` (newest first), full-width cards, no coordinate grid. Reuse `LabCard`'s
preview; drop absolute positioning.

### 5. Seed the range (content, not layout — can be a follow-up PR)

The set is currently `ui`-heavy. To make the canvas read as "works across
motion/code/systems," the build should leave clean insertion points for, per
`03-projects/personal-website/lab/lab-candidates.md`: the motion rebuilds
(badge / thumbs-up / accordion), a `generative` capture (Ben Nazım TD tree),
and the `code` color-scale tool. Adding those items is data-only once the
model in step 1 exists.

## Verification

- `npm run test` — `layout.test.ts` green (no overlap, deterministic, safe-area honored).
- `npm run typecheck && npm run build` — clean.
- Visual (dev server): canvas identical across two reloads (determinism); cards
  sit on grid lines; `lg`/`md`/`sm` hierarchy reads clearly; no grey flash on
  mount; resize below 768px → single-column feed.
- `prefers-reduced-motion`: entrance still respects the existing
  `lab-scale-in` reduced-motion guard in `styles/globals.css`.

## STOP conditions

- Drift check shows `components/lab/` changed since `e8bcbb2` and the live code
  no longer matches the excerpts above.
- Removing `scatter.ts` would leave `scatter.test.ts` importing a missing module
  without a ported replacement — port tests in the same change.
- The coordinate layout can't satisfy the no-overlap invariant for the current
  item set at a common desktop width (≥1024px) — stop and report; the size spans
  need tuning, not a random fallback.

## Out of scope

- New lab item *content* beyond assigning `size`/`pos` to the existing 6 (step 5
  is a follow-up).
- Changes to `LabModal` (the open/cycle/slide interaction stays as-is).
