# Plan 007: Delete dead data files and dead component; fix the stale README structure section

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- public/data/ components/LayersImage.tsx README.md next.config.js`
> If any in-scope file changed since this plan was written, re-run the
> greps in "Current state" before proceeding; on a mismatch, treat it as a
> STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (coordinate with plan 010 — see Maintenance notes)
- **Category**: tech-debt
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

Three artifacts are dead and one document is actively wrong:

1. `public/data/experience.json` — imported nowhere, AND its content has diverged from the live source `data/experience.ts` (different companies, different dates). Whoever updates experience next risks editing the dead file.
2. `public/data/layersURLs.json` — imported nowhere (CloudFront image URLs for a removed feature).
3. `components/LayersImage.tsx` — a component imported nowhere; the only would-be consumer of layersURLs.json.
4. `README.md:19-26` documents `experience.json` and a `uiShots.json` that doesn't even exist, and doesn't mention the real data sources. Stale docs are worse than missing docs.

## Current state

Verified at planning time (re-run these before deleting):

- `grep -rn "experience.json" app components lib hooks data --include="*.ts" --include="*.tsx"` → zero matches. The live experience data is `data/experience.ts` (TypeScript, typed by `ExperienceItem` from `types/index.ts:67-73`), imported only at `app/(main)/about/page.tsx:11`.
- `grep -rn "layersURLs\|LayersImage" app components --include="*.tsx" --include="*.ts"` → matches only inside `components/LayersImage.tsx` itself (its own definition).
- Live data files that ARE used (do not touch): `public/data/projects.json` (imported in `app/(main)/page.tsx:6` and `app/(main)/works/page.tsx:4`) and `public/data/others.json` (imported in `app/(main)/works/page.tsx:5`).
- `next.config.js:8-14` allowlists `d2wx6rahy8yxgr.cloudfront.net` for remote images. The only references to that host in the repo are inside `public/data/layersURLs.json`. Once that file is deleted, the remotePattern is dead config too.
- `README.md` is 30 lines; the structure section (lines 19–26) reads:

```
public/data/ – JSON data files, such as:
projects.json – metadata for showcased projects.
experience.json – timeline data for work history.
uiShots.json – configuration for the UI shots carousel.
```

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Build     | `npm run build`    | exit 0              |

## Scope

**In scope**:
- `public/data/experience.json` (delete)
- `public/data/layersURLs.json` (delete)
- `components/LayersImage.tsx` (delete)
- `next.config.js` (remove the now-dead `remotePatterns` entry — keep the `images` key structure valid; if it becomes an empty array, keep `images: { remotePatterns: [] }` or drop the `images` key entirely, either is fine)
- `README.md` (fix the structure section)

**Out of scope** (do NOT touch):
- `public/data/projects.json`, `public/data/others.json` — live. Note `projects.json` may have uncommitted local changes; do not reformat or stage it.
- `data/experience.ts` — the live source; plan 010 decides its fate.
- `experimental.viewTransition` in `next.config.js`.

## Git workflow

- Branch: `advisor/007-dead-data-readme`
- Single commit, e.g. `chore: remove dead data files and stale README entries`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Re-verify deadness, then delete

Run both greps from "Current state". If clean, delete `public/data/experience.json`, `public/data/layersURLs.json`, `components/LayersImage.tsx`.

**Verify**: `npx tsc --noEmit` → exit 0 (proves nothing imported the component).

### Step 2: Remove the dead remotePattern

Run `grep -rn "d2wx6rahy8yxgr" app components lib public/data styles` — expect zero matches now. Then remove the cloudfront `remotePatterns` entry from `next.config.js`.

**Verify**: `npm run build` → exit 0.

### Step 3: Fix the README structure section

Rewrite lines 13–29 of `README.md` to match reality. Keep the existing terse, lowercase-friendly tone. Accurate content to convey:

- `app/` — App Router pages in two route groups: `(main)` (home, about, works, bookmarks, lab) and `(case-study)` (one folder per case study).
- `components/` — reusable components; `components/lab/` is the interactive lab canvas.
- `public/data/` — `projects.json` (case-study metadata for home/works) and `others.json` (secondary works list).
- `data/experience.ts` — typed work-history data (currently unrendered; see about page).
- `public/images/`, `styles/` — as currently described.

Do not add setup/contributing sections beyond this — out of this plan's scope.

**Verify**: `grep -n "uiShots\|experience.json" README.md` → no matches.

## Test plan

Not applicable — deletions of unreferenced files plus a docs edit. Typecheck + build are the gates.

## Done criteria

- [ ] The three dead files no longer exist
- [ ] `grep -rn "d2wx6rahy8yxgr" .` (excluding node_modules/.next/plans) → no matches
- [ ] `grep -n "uiShots\|experience.json" README.md` → no matches
- [ ] `npx tsc --noEmit` and `npm run build` exit 0
- [ ] `git status` shows only in-scope files changed
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Either grep in step 1 finds a new consumer (the working tree has active WIP; someone may have wired these up since planning).
- Deleting the remotePattern breaks the build with an error about a remote image — some page is loading from CloudFront that grep missed; restore the pattern and report.

## Maintenance notes

- Plan 010 (WorkExperience ship-or-delete) touches `data/experience.ts`. If 010's "delete" branch is chosen, the README line about `data/experience.ts` written here must be removed then — note it in 010's review.
- Reviewer should scrutinize: that `projects.json`'s uncommitted local changes weren't swept into this commit.
