# Plan 002: Upgrade Next.js from 15.4.10 to latest 15.5.x to clear high-severity advisories

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- package.json package-lock.json next.config.js`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (001's CI verifies it if already landed)
- **Category**: security
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

`npm audit` flags `next@15.4.10` (the pinned version at `package.json:23`) with eight high-severity advisories, including image-optimizer DoS (GHSA-9g9p-9gw9-jx7f), RSC DoS, request smuggling in rewrites, and middleware cache poisoning. The site is Vercel-hosted (which mitigates several self-hosting-specific issues) and has no middleware, but the image optimizer IS in use (`next/image` throughout, plus a `remotePatterns` entry in `next.config.js`). All advisories are fixed within the 15.5.x line, so this is a patch-level bump with no breaking changes expected.

## Current state

- `package.json:23` — `"next": "15.4.10"` (exact pin, no caret).
- `package.json:41` — `"eslint-config-next": "^15.4.1"` (caret; bump alongside).
- `next.config.js` (entire file) uses two stable-enough surfaces — verify they still work after upgrade:

```js
module.exports = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2wx6rahy8yxgr.cloudfront.net",
        ...
      },
    ],
  },
};
```

- The `experimental.viewTransition` flag is load-bearing: `components/CaseStudyLayout.tsx:61` sets `viewTransitionName` styles. If 15.5.x renamed or removed this experimental flag, the build will warn or fail — that is a STOP condition, not something to work around.
- Baseline at planning time: `npx tsc --noEmit` exits 0, `npm run lint` exits 0 with warnings, `npm run build` not run by the advisor (verify it passes BEFORE upgrading so failures can be attributed).

## Commands you will need

| Purpose   | Command                                  | Expected on success |
|-----------|------------------------------------------|---------------------|
| Install   | `npm install next@^15.5.0 eslint-config-next@^15.5.0` | exit 0 |
| Audit     | `npm audit`                              | no `next` advisories remain |
| Typecheck | `npx tsc --noEmit`                       | exit 0              |
| Lint      | `npm run lint`                           | exit 0              |
| Build     | `npm run build`                          | exit 0, all routes compile |

## Scope

**In scope**:
- `package.json`, `package-lock.json` (version bumps only)

**Out of scope** (do NOT touch):
- `next.config.js` — unless the upgrade *requires* a rename of `experimental.viewTransition`, which is a STOP condition to report, not silently apply.
- Upgrading to Next 16 — major version, different blast radius, not this plan.
- Any other dependency (react, tailwind, etc.).
- All application source files.

## Git workflow

- Branch: `advisor/002-next-upgrade`
- Single commit, e.g. `chore: upgrade next to 15.5.x (security advisories)`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Establish baseline

Run `npm run build` on the unmodified tree.

**Verify**: exit 0. If it fails, STOP — pre-existing breakage.

### Step 2: Bump

Run `npm install next@^15.5.0 eslint-config-next@^15.5.0` (installs latest 15.5.x).

**Verify**: `npm ls next` shows a `15.5.*` version; `npm audit 2>&1 | grep -A2 "^next"` shows no remaining `next` advisories.

### Step 3: Re-verify the full gate

**Verify**: `npx tsc --noEmit` → 0; `npm run lint` → 0; `npm run build` → 0 with no new warnings about `experimental.viewTransition` being unrecognized.

### Step 4 (recommended if a preview tool is available): Smoke-test

Start the dev server, load `/`, `/works`, `/about`, `/lab`, and one case study (`/wisecareai`). Check the browser console for errors.

**Verify**: pages render, no console errors attributable to the upgrade.

## Test plan

No unit tests exist yet (plan 006). The gate is typecheck + lint + build + the smoke test above.

## Done criteria

- [ ] `npm ls next` reports 15.5.x
- [ ] `npm audit` reports zero advisories against `next`
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0
- [ ] `git status` shows only `package.json` and `package-lock.json` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The baseline build (step 1) fails before any change.
- The build after upgrade warns that `experimental.viewTransition` is unknown/renamed — report the exact warning; the fix needs maintainer sign-off because view transitions are a user-facing feature.
- `npm install` wants to change `react`/`react-dom` versions to satisfy peer deps.
- Only a 15.6+ or 16.x release satisfies the advisories — report; that's a bigger upgrade than this plan authorizes.

## Maintenance notes

- The exact pin (`15.4.10`, no caret) suggests the maintainer prefers controlled bumps — keep the caret-vs-pin style they choose in review.
- Follow-up deferred: Next 16 migration evaluation (not urgent; 15.x is current-supported).
