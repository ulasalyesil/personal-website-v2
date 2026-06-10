# Plan 004: Fix the TimeZoneCard server/client hydration mismatch

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- components/TimeZoneCard.tsx`
> If the file changed since this plan was written, compare the "Current
> state" excerpt against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

`TimeZoneCard` initializes its clock state with `DateTime.now()` during render. The component is a client component but is server-rendered first (it appears on the about page hover popups and in the lab "time-card" preview), so the HTML carries the *server's* render time and the client hydrates with *its own* time — the text (`h:mm a`), the date, and the timeline marker's `left: %` style all differ. React reports a hydration mismatch error, and the marker visibly jumps. The fix is the standard "render a stable placeholder until mounted" pattern.

## Current state

- `components/TimeZoneCard.tsx` — the whole component is 85 lines. The bug is line 24; the interval effect (26–31) is fine:

```tsx
const [now, setNow] = useState(DateTime.now().setZone(zone));   // line 24 — runs on server AND client

useEffect(() => {
  const interval = setInterval(() => {
    setNow(DateTime.now().setZone(zone));
  }, 1000);
  return () => clearInterval(interval);
}, [zone]);
```

- Derived values that all depend on `now` (lines 33–38): `formattedTime`, `formattedDate`, `gmtOffset`, `markerPosition` (a percentage used as `left` style at line 72).
- The card's outer div has a fixed height (`h-32`, line 41), so a placeholder render does not shift layout.
- Consumers: `app/(main)/about/page.tsx:39,43` (hover popups) and `components/lab/previews.tsx` (lab preview). Both render it client-side after interaction in the about case, but the lab preview can be in the initial HTML.
- Repo conventions: TypeScript strict, no `suppressHydrationWarning` used anywhere — prefer the mounted-gate pattern over suppression.

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Lint      | `npm run lint`     | exit 0              |
| Build     | `npm run build`    | exit 0              |
| Dev       | `npm run dev`      | serves localhost:3000 |

## Scope

**In scope**:
- `components/TimeZoneCard.tsx`

**Out of scope** (do NOT touch):
- `app/(main)/about/page.tsx`, `components/lab/previews.tsx` — consumers need no change.
- Replacing luxon with `Intl` — considered separately and rejected for now.
- The card's visual design/markup below line 40.

## Git workflow

- Branch: `advisor/004-timezonecard-hydration`
- Single commit, e.g. `fix: avoid TimeZoneCard hydration mismatch`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Gate the time-dependent render on mount

In `components/TimeZoneCard.tsx`:

1. Change line 24 to `const [now, setNow] = useState<DateTime | null>(null);`
2. In the existing effect, set the time immediately on mount before starting the interval:

```tsx
useEffect(() => {
  setNow(DateTime.now().setZone(zone));
  const interval = setInterval(() => {
    setNow(DateTime.now().setZone(zone));
  }, 1000);
  return () => clearInterval(interval);
}, [zone]);
```

3. Guard the derived values: when `now` is `null`, render the same card shell (`h-32` outer div, labels, tick ruler) but with em-dash/empty time values and the marker hidden. The simplest shape: compute `formattedTime`, `formattedDate`, `gmtOffset` only when `now != null` and fall back to `"--"`; wrap the marker div (lines 69–80) in `{now && (...)}`.

The server-rendered HTML and the first client render are now identical (both the `null` branch), and the real time appears one effect-tick after mount.

**Verify**: `npx tsc --noEmit` → exit 0.

### Step 2: Confirm the mismatch is gone

`npm run dev`, open `http://localhost:3000/lab` (the time-card preview) and `http://localhost:3000/about` (hover "Berlin"). Check the browser console.

**Verify**: no hydration-mismatch error mentioning TimeZoneCard; clock ticks; marker positioned. If no browser/preview tool is available, verify by reasoning that no render output depends on `DateTime.now()` before the effect runs, and note the skipped manual check in your report.

## Test plan

No test runner exists yet (plan 006 adds one for the scatter algorithm only). Verification is the console check above. Do not add a test framework in this plan.

## Done criteria

- [ ] `grep -n "useState(DateTime.now" components/TimeZoneCard.tsx` → no matches
- [ ] First-render output contains no value derived from the current time (manual code check)
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0
- [ ] `git status` shows only `components/TimeZoneCard.tsx` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The live file differs from the excerpt (drift).
- The placeholder state visibly breaks the card layout (height/width change) — the design intent is the maintainer's; report with a screenshot rather than redesigning.

## Maintenance notes

- If a city/timezone is ever added (CITY_MAP at lines 11–14), no change to this pattern is needed — the gate is zone-independent.
- Reviewer should scrutinize: the `null`-state visuals (briefly visible on slow connections).
