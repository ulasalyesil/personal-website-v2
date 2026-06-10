# Plan 010: Resolve the WorkExperience limbo — ship it on the about page or delete it

> **Executor instructions**: This plan has TWO mutually exclusive branches.
> **The operator must tell you which branch to execute when dispatching you.
> If no branch was specified, STOP immediately and ask — do not pick one.**
> Otherwise follow the chosen branch step by step, run every verification
> command, and honor the STOP conditions. When done, update the status row
> for this plan in `plans/README.md` — unless a reviewer dispatched you and
> told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- "app/(main)/about/page.tsx" components/WorkExperience.tsx data/experience.ts types/index.ts package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S (either branch)
- **Risk**: LOW (delete) / MED (ship — publishes content that needs maintainer sign-off)
- **Depends on**: none (interacts with plan 007 — see Maintenance notes)
- **Category**: direction
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

A complete, polished `WorkExperience` accordion component (105 lines: expandable position rows, markdown descriptions, skill pills, "current employer" pulse dot) exists with its typed data file — but its only render site is commented out. Finished code in limbo rots: the data has already drifted from reality (see below), and the component silently holds the repo's only `react-markdown` dependency. Either the section ships, or the code and its dependency go. Both outcomes are better than limbo. **Which one is a product decision the maintainer must make** — hence the two branches.

**Content decision (resolved by the maintainer, 2026-06-10)**: the current employer is **Getir Finans**. `data/experience.ts` predates this — it lists Getir Finans as a past role ("2022 — 2024") and marks Freelance as current. The career sequence evidenced in the repo: Getir Finans 2022–2024 → WiseCareAI 2024–2025 → back at GetirFinans 2025–present (the getirfinans-dark-mode case study is dated "2025 — 2026" with role "Product Designer"; the about page says "Currently at getirfinans"). Step A1 specifies the exact data edit.

## Current state

- `app/(main)/about/page.tsx:10-11` — imports both pieces:

```tsx
import WorkExperience from "@/components/WorkExperience";
import { experience } from "@/data/experience";
```

- `app/(main)/about/page.tsx:150-152` — the disabled render site:

```tsx
{/* <AnimateItem>
  <WorkExperience items={experience} />
</AnimateItem> */}
```

- `components/WorkExperience.tsx` — the component; client component using `react-markdown` (line 4), `lucide-react` `ChevronDown` (line 5), `Pill` (line 8), `triggerHaptic` (line 7). Renders `<section className="mt-16">`.
- `data/experience.ts` — 3 entries: WiseCareAI (2024–2025), Getir Finans (2022–2024), Freelance (2023–Present, `isCurrentEmployer: true`).
- `types/index.ts:56-73` — `ExperiencePositionItem` and `ExperienceItem` interfaces; used ONLY by `data/experience.ts` and `components/WorkExperience.tsx` (verify with grep before deleting).
- `react-markdown` (`package.json:28`) is imported ONLY in `components/WorkExperience.tsx` (verified by grep at planning time).
- Note: `app/(main)/about/page.tsx` already has uncommitted local modifications in the maintainer's tree, and plan 008 also edits this file — coordinate ordering (see Maintenance notes).

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Lint      | `npm run lint`     | exit 0              |
| Build     | `npm run build`    | exit 0              |
| Dev       | `npm run dev`      | serves localhost:3000 |

## Scope

**In scope** (branch-dependent):
- SHIP: `app/(main)/about/page.tsx`, `data/experience.ts` (content corrections supplied by the operator)
- DELETE: `app/(main)/about/page.tsx`, `components/WorkExperience.tsx`, `data/experience.ts`, `types/index.ts` (the two experience interfaces only), `package.json`/`package-lock.json` (react-markdown removal)

**Out of scope** (both branches, do NOT touch):
- `components/ui/Pill.tsx`, `lib/haptics.ts`, `lucide-react` — used elsewhere (verify before assuming; Pill/haptics have other consumers).
- The rest of `types/index.ts` (project/content-block types are live).
- Any visual redesign of the component in the SHIP branch.

## Git workflow

- Branch: `advisor/010-workexperience-<ship|delete>`
- Single commit, e.g. `feat(about): show work experience` or `chore: remove unshipped WorkExperience component`.
- Do NOT push or open a PR unless the operator instructed it.

## Branch A — SHIP

### Step A1: Update `data/experience.ts` (content specified — no gate)

Apply exactly these edits, keeping the `ExperienceItem` shape (see `types/index.ts:56-73`):

1. On the `getir-finans` entry: add `isCurrentEmployer: true`, and add a SECOND position object at the top of its `positions` array (the existing senior role stays as the second position):

```ts
{
  id: "getir-product-designer",
  title: "Product Designer",
  employmentPeriod: "2025 — Present",
  employmentType: "Full-time",
  description:
    "Designing features and owning the design system for Turkey's leading service banking app. Rebuilt the color foundation and shipped dark mode via a two-tier token system.",
  skills: ["Product Design", "Design Systems", "Figma", "Dark Mode"],
},
```

2. On the `freelance` entry: remove `isCurrentEmployer: true` (set to `false` or delete the property). Leave its period as is.
3. Reorder the top-level array so `getir-finans` is first (current employer leads), then `wisecare`, then `freelance`.

The description text above is drawn from the site's own copy (`app/(main)/about/page.tsx:71`) and the getirfinans-dark-mode case study; the reviewer may rewrite the wording, but the facts (title, period, current-employer flag) are settled.

**Verify**: `npx tsc --noEmit` → 0.

### Step A2: Enable the render

In `app/(main)/about/page.tsx:150-152`, remove the JSX comment markers so the block renders:

```tsx
<AnimateItem>
  <WorkExperience items={experience} />
</AnimateItem>
```

**Verify**: `npm run dev`, open `/about` → "Work Experience" section renders below the paragraphs; rows expand/collapse; the pulse dot sits on the correct current employer; no console errors. `npm run lint && npm run build` → 0.

## Branch B — DELETE

### Step B1: Remove the render site and imports

In `app/(main)/about/page.tsx`: delete lines 150–152 (the commented block) and the two imports at lines 10–11.

**Verify**: `npx tsc --noEmit` → 0; `npm run lint` shows no new unused-import warnings for this file.

### Step B2: Delete the files

Delete `components/WorkExperience.tsx` and `data/experience.ts`.

**Verify**: `npx tsc --noEmit` → 0.

### Step B3: Remove the orphaned types

First verify exclusivity: `grep -rn "ExperienceItem\|ExperiencePositionItem" app components lib data hooks --include="*.ts" --include="*.tsx"` → must return ZERO matches (the two consumer files are gone). Then delete the two interfaces and their section comment from `types/index.ts:54-73`.

**Verify**: `npx tsc --noEmit` → 0.

### Step B4: Remove the orphaned dependency

Verify exclusivity: `grep -rn "react-markdown" app components lib --include="*.ts" --include="*.tsx"` → zero matches. Then `npm uninstall react-markdown`.

**Verify**: `npx tsc --noEmit` → 0; `npm run build` → 0.

## Test plan

No unit-test layer applies. Branch A: the manual render check in A3. Branch B: typecheck after each deletion step is the proof of no remaining consumers.

## Done criteria

Branch A:
- [ ] `/about` renders the Work Experience section with operator-approved content
- [ ] `grep -n "{/\*" "app/(main)/about/page.tsx"` shows no commented-out WorkExperience block
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0

Branch B:
- [ ] `components/WorkExperience.tsx` and `data/experience.ts` deleted
- [ ] `grep -rn "WorkExperience\|ExperienceItem" app components lib data types` → no matches
- [ ] `react-markdown` absent from `package.json`
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0

Both:
- [ ] `git status` shows only in-scope files changed
- [ ] `plans/README.md` status row updated (note which branch ran)

## STOP conditions

Stop and report back (do not improvise) if:

- No branch was specified at dispatch.
- (A) The live `data/experience.ts` no longer matches the entry ids referenced in Step A1 (`getir-finans`, `wisecare`, `freelance`) — the content edit can't be applied mechanically; report.
- (B) Any exclusivity grep (B3, B4) returns matches — a new consumer appeared since planning.
- `app/(main)/about/page.tsx` has drifted beyond the excerpts (it has known uncommitted WIP and plan 008 also targets it).

## Maintenance notes

- **Ordering with plan 008**: both branches edit `app/(main)/about/page.tsx`. Run 008 and 010 sequentially (either order), never in parallel worktrees against the same file.
- **Interaction with plan 007**: 007's README rewrite mentions `data/experience.ts`. If branch B runs after 007, also remove that README line (one-line follow-up; note it in your report).
- (A) Reviewer should fact-check the rendered employment history against the maintainer's resume/LinkedIn — particularly the new position's title and "2025 — Present" start, which were inferred from the case study (`date: "2025 — 2026"`, `role: "Product Designer"`) rather than stated explicitly.
