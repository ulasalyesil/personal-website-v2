# Plan 005: Remove the unused react-aria-components dependency

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- package.json package-lock.json`
> If these changed since this plan was written, re-run the grep in
> "Current state" before proceeding.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

`react-aria-components@^1.10.1` is declared at `package.json:26` but imported nowhere in the codebase. It isn't shipped to users (unimported code isn't bundled), but it inflates installs, lockfile churn, and the `npm audit` surface for zero benefit. Removing it is free.

## Current state

- `package.json:26` — `"react-aria-components": "^1.10.1"` in `dependencies`.
- Verified at planning time: `grep -rn "react-aria" app components lib hooks data types styles --include="*.ts" --include="*.tsx" --include="*.css"` → zero matches.
- Note: `tw-animate-css` was also suspected unused but IS imported (`styles/globals.css:4`) — leave it alone.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Pre-check | `grep -rn "react-aria" app components lib hooks data types styles` | no matches |
| Remove    | `npm uninstall react-aria-components` | exit 0             |
| Typecheck | `npx tsc --noEmit`                   | exit 0              |
| Build     | `npm run build`                      | exit 0              |

## Scope

**In scope**: `package.json`, `package-lock.json`.

**Out of scope** (do NOT touch): every other dependency (`tw-animate-css`, `luxon`, `@radix-ui/react-icons`, `lucide-react`, `react-markdown` are all in use — verified); all source files.

## Git workflow

- Branch: `advisor/005-remove-unused-dep`
- Single commit, e.g. `chore: remove unused react-aria-components`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Re-confirm it's unused, then remove

Run the pre-check grep (must return nothing), then `npm uninstall react-aria-components`.

**Verify**: `grep -n "react-aria" package.json` → no matches; `npm ls react-aria-components` → "(empty)" or not found.

### Step 2: Full gate

**Verify**: `npx tsc --noEmit` → 0; `npm run build` → 0.

## Test plan

Not applicable — removal of an unimported package. The build gate is the test.

## Done criteria

- [ ] `react-aria-components` absent from `package.json` and `package-lock.json`
- [ ] `npx tsc --noEmit` and `npm run build` exit 0
- [ ] `git status` shows only `package.json`/`package-lock.json` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- The pre-check grep finds an import (someone started using it since planning).
- `npm uninstall` removes or downgrades any OTHER package in the lockfile beyond react-aria's own dependency subtree — inspect the diff; if unrelated packages move, report instead of committing.

## Maintenance notes

- If accessible component primitives are wanted later, decide deliberately between react-aria-components and Radix (icons from `@radix-ui/react-icons` are already in use) rather than re-adding both.
