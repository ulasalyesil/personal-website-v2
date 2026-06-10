# Plan 001: Add a GitHub Actions CI workflow gating typecheck, lint, and build

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- .github/ package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

This repo has no CI of any kind — there is no `.github` directory at all. The only verification gates (`tsc --noEmit`, `next lint`, `next build`) run only when the maintainer remembers to run them locally; PRs (the repo has merged several, e.g. #9) merge unverified. A single workflow that runs typecheck + lint + build on every push and PR is the verification baseline every other plan in `plans/` relies on.

## Current state

- There is **no** `.github/` directory in the repo root (verified 2026-06-10).
- `package.json:5-12` defines the scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

- There is no `test` script (plan 006 adds one later — do NOT add a test step here).
- There is no `typecheck` script; typechecking is done via `npx tsc --noEmit` (verified to exit 0 at planning time).
- `npm run lint` currently exits 0 with ~8 warnings (unused vars, console statements) — warnings do not fail the build and must not fail CI.
- The build needs no secrets: the only env var is `NEXT_PUBLIC_GA_ID` (see `.env.example`), read with a `?? ""` fallback at `app/layout.tsx:24`, so `next build` succeeds without it.
- Stack: Next.js 15.x, npm with committed `package-lock.json` (use `npm ci`). No `engines` field and no `.nvmrc`; use Node 24 (current LTS, Vercel default).
- Default branch: `main`.

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Install   | `npm ci`           | exit 0              |
| Typecheck | `npx tsc --noEmit` | exit 0, no output   |
| Lint      | `npm run lint`     | exit 0 (warnings OK)|
| Build     | `npm run build`    | exit 0              |

## Scope

**In scope** (the only files you should modify/create):
- `.github/workflows/ci.yml` (create)
- `package.json` (one addition only: a `"typecheck": "tsc --noEmit"` script entry)

**Out of scope** (do NOT touch):
- Any deploy/Vercel configuration — deployment is handled by Vercel's git integration, not CI.
- Pre-commit hooks, husky, lint-staged — considered and rejected for this repo.
- A test step — there is no test runner yet; plan 006 adds it and will extend this workflow.
- All application source files.

## Git workflow

- Branch: `advisor/001-ci-workflow`
- Single commit; message style matches repo (short conventional-ish, e.g. `ci: add typecheck/lint/build workflow`).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add a `typecheck` script

In `package.json`, add `"typecheck": "tsc --noEmit"` to `scripts` (after `"start"`).

**Verify**: `npm run typecheck` → exits 0, no errors.

### Step 2: Create the workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

**Verify**: `npx tsc --noEmit && npm run lint && npm run build` all exit 0 locally (the same sequence CI will run). If a YAML linter is available, also validate the file parses.

## Test plan

No unit tests for a workflow file. Verification is running the three CI commands locally (step 2) — they are exactly what the workflow executes. Full end-to-end confirmation happens on the first push after merge; note in your report that the operator should check the Actions tab then.

## Done criteria

- [ ] `.github/workflows/ci.yml` exists and contains typecheck, lint, and build steps
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- A `.github/workflows/` directory already exists (someone added CI since planning).
- `npm run build` fails locally — the failure predates your change; report it instead of fixing app code.
- You feel the need to add secrets/env vars to the workflow — the build is verified to need none; needing one means an assumption broke.

## Maintenance notes

- Plan 006 (test baseline) extends this workflow with `npm test`. Plan 002 (Next.js upgrade) should be verified by this CI once both land.
- Reviewer should scrutinize: Node version choice (24) and that lint warnings don't fail the job.
