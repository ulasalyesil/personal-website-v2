# Plan 006: Establish a Vitest baseline with characterization tests for the lab scatter algorithm

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- components/lab/LabCanvas.tsx package.json .github/workflows/ci.yml`
> If `LabCanvas.tsx` changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/001-ci-workflow.md (adds the CI file this plan extends; if 001 hasn't landed, skip step 5 and say so)
- **Category**: tests
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

The repo has zero tests — the only gates are typecheck, lint, and build. That's acceptable for a mostly-presentational portfolio, except for one module: the lab page's scatter layout algorithm (`components/lab/LabCanvas.tsx:14-113`), ~100 lines of seeded-random rejection sampling with a deterministic grid-scan fallback and a scale-down retry loop. It's pure logic, it has real invariants (no overlaps, in-bounds, obstacle avoidance, determinism for a given seed), and it's exactly the code a future tweak (margin, gutter, retry counts) would silently break. Characterization tests pin today's behavior before anyone refactors it.

## Current state

- `components/lab/LabCanvas.tsx` — contains BOTH the pure algorithm (lines 1–113: `seedRand`, `overlaps`, `scatterAt`, `gridScan`, `scatter`, types `Placed`/`Rect`, constants `MARGIN=24`, `GUTTER=32`, `MAX_TRIES=600`) and the React component (lines 115–198). None of the algorithm functions are exported. Signatures as they exist today:

```ts
function seedRand(seed: number): () => number               // line 14
function overlaps(a: Rect, b: Rect, gutter = 0): boolean    // line 24
function scatterAt(items: LabItem[], W: number, H: number, scale: number,
                   rand: () => number, obstacles: Rect[]): Placed[] | null  // line 36
function gridScan(s: {w,h}, W, H, placed: Placed[], obstacles: Rect[]): Rect | null  // line 76
function scatter(items: LabItem[], W: number, H: number,
                 rand: () => number, obstacles: Rect[] = []): Placed[]      // line 95
type Placed = { x: number; y: number; w: number; h: number; item: LabItem } // line 7
```

- `scatter`'s contract (from reading the code): tries `scatterAt` at a starting scale `min(1, W*0.38/maxW, H*0.5/maxH)`, retrying 8 times at ×0.9 shrink; on total failure returns the last attempt `?? []` (line 112) — it never throws.
- `components/lab/data.ts` exports `LAB_ITEMS: LabItem[]` (5 items with `w`/`h` ranging 280–460 × 240–380) and `type LabItem`.
- `package.json` — no `test` script, no test deps. Scripts are dev/build/start/lint/format/format:check (+ `typecheck` if plan 001 landed).
- `.github/workflows/ci.yml` — exists only if plan 001 landed; it runs typecheck, lint, build.
- Path alias: `@/*` → repo root (`tsconfig.json:24-28`).

## Commands you will need

| Purpose   | Command                          | Expected on success |
|-----------|----------------------------------|---------------------|
| Install   | `npm install -D vitest`          | exit 0              |
| Tests     | `npm test`                       | all pass            |
| Typecheck | `npx tsc --noEmit`               | exit 0              |
| Build     | `npm run build`                  | exit 0              |

## Scope

**In scope**:
- `components/lab/scatter.ts` (create — extracted algorithm)
- `components/lab/scatter.test.ts` (create)
- `components/lab/LabCanvas.tsx` (delete the moved code, add the import — no behavioral edits)
- `package.json` (add `vitest` devDep + `"test": "vitest run"` script)
- `.github/workflows/ci.yml` (add `npm test` step — only if the file exists)

**Out of scope** (do NOT touch):
- Any behavior change to the algorithm — this is a pure move + pin. Constants, math, iteration order all stay byte-identical.
- React component testing (jsdom, testing-library) — deliberately excluded; the value here is the pure logic.
- `components/lab/LabApp.tsx`, `LabModal.tsx`, `LabCard.tsx`, `data.ts`.
- TimeZoneCard tests — its logic is luxon formatting, low value.

## Git workflow

- Branch: `advisor/006-test-baseline-scatter`
- Two commits work well: `refactor(lab): extract scatter algorithm to scatter.ts` then `test: characterize scatter layout invariants`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Extract the algorithm

Create `components/lab/scatter.ts`. Move lines 7–113 of `LabCanvas.tsx` (the `Placed` type, `MARGIN`, `GUTTER`, `MAX_TRIES`, `seedRand`, `Rect`, `overlaps`, `scatterAt`, `gridScan`, `scatter`) into it verbatim, adding `export` to: `seedRand`, `overlaps`, `scatter`, `scatterAt`, and the types `Placed` and `Rect`. Keep `gridScan` and the constants unexported but move them too (`scatterAt` needs them). Keep the existing comments. The file imports `type { LabItem } from "./data"`.

In `LabCanvas.tsx`, delete the moved code and add:
`import { scatter, seedRand, type Placed, type Rect } from "./scatter";`
(`LabCanvas` uses `Rect` for its `safeRect` state and obstacles — check lines 128 and 158–167.)

**Verify**: `npx tsc --noEmit` → exit 0; `git diff` shows the algorithm lines moved, not edited.

### Step 2: Install vitest and add the script

`npm install -D vitest`; add `"test": "vitest run"` to scripts. No vitest config file is needed — the tests are pure TS with relative imports.

**Verify**: `npx vitest run` → "no test files found" exits non-zero or reports none; that's expected until step 3 (use `npx vitest run --passWithNoTests` if you want a clean check here).

### Step 3: Write the characterization tests

Create `components/lab/scatter.test.ts` using `import { describe, it, expect } from "vitest"`. Build a small item factory rather than importing `LAB_ITEMS` (keeps tests stable when the maintainer edits real items):

```ts
const item = (slug: string, w: number, h: number) =>
  ({ slug, title: slug, tag: "code", date: "", frame: "none" as const, preview: slug, w, h, blurb: "" });
```

Cover at minimum:

1. **Determinism** — `scatter(items, 1200, 800, seedRand(42), [])` twice → deep-equal results; `seedRand(43)` → different placement (compare stringified coords).
2. **No pairwise overlaps** — for the standard case (5 items sized like the real ones, 1200×800 canvas): every pair fails `overlaps(a, b)` with gutter 0 (the algorithm guarantees ≥ GUTTER spacing at unchanged scale; asserting non-overlap at gutter 0 characterizes without over-pinning).
3. **In bounds** — every placed rect satisfies `x >= 0`, `y >= 0`, `x + w <= W`, `y + h <= H` for the standard case.
4. **Obstacle avoidance** — with one obstacle rect `{x: 0, y: 0, w: 420, h: 80}` (mirrors the real safe-area title block), no placed card overlaps it (gutter 0).
5. **Degenerate canvas never throws** — `scatter(items, 60, 60, seedRand(1), [])` returns an array (possibly empty/lossy per line 111–112) without throwing.
6. **`overlaps` unit cases** — touching rects with gutter 0 (not overlapping), the same rects with gutter 1 (overlapping), fully disjoint, fully contained.
7. **`seedRand` range** — 1000 draws from `seedRand(7)` all in `[0, 1)`.

If test 2/3/4 fail against the real algorithm output, the *test expectation* is wrong (e.g. scale-shrink case) — adjust the canvas size up, never the algorithm. That's what characterization means here.

**Verify**: `npm test` → all tests pass.

### Step 4: Full gate

**Verify**: `npx tsc --noEmit` → 0; `npm run lint` → 0; `npm run build` → 0 (proves the extraction didn't break the page).

### Step 5: Wire into CI (conditional)

If `.github/workflows/ci.yml` exists, add `- run: npm test` between the lint and build steps.

**Verify**: file contains the step; YAML still valid.

## Test plan

This plan IS the test plan — see step 3. Expected end state: ≥7 passing tests in `components/lab/scatter.test.ts`, `npm test` green.

## Done criteria

- [ ] `components/lab/scatter.ts` exists; `grep -n "function scatter" components/lab/LabCanvas.tsx` → no matches
- [ ] `npm test` exits 0 with ≥7 tests passing
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0
- [ ] Algorithm behavior unchanged: `git diff` on the moved lines shows relocation + `export` keywords only
- [ ] CI workflow includes `npm test` (if the workflow exists)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `LabCanvas.tsx` lines 7–113 don't match the "Current state" signatures (drift — someone refactored first).
- A characterization test fails and the cause is genuinely the algorithm violating its own invariant (e.g. real overlaps at default scale) — that's a bug discovery, not a test bug; report it with the failing seed/inputs.
- `vitest` needs a config file or jsdom to run these pure-TS tests — something is off with the setup; report rather than adding config sprawl.

## Maintenance notes

- Any future change to `MARGIN`/`GUTTER`/`MAX_TRIES` or the retry loop should update these tests deliberately — failing tests after such a change are the feature working.
- Deferred: component-level tests (LabApp modal state, URL sync) — revisit only if that logic grows.
