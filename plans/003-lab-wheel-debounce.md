# Plan 003: Fix the lab modal wheel debounce defeated by effect re-runs

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- components/lab/LabApp.tsx`
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

The lab page (`/lab`) opens experiments in a modal; scrolling the wheel/trackpad cycles to the next/previous item. The cycling handler debounces with a `wheelLock` that should hold for 380ms after each cycle. But the effect that owns this state lists `selected` in its dependency array — and cycling *changes* `selected* — so React tears down and re-creates the effect on every cycle, resetting `wheelLock` to `false` immediately. The 380ms lock is therefore dead code in practice: one trackpad momentum swipe emits events for hundreds of ms and rapid-fires through multiple items instead of advancing one. The pending `setTimeout`s are also never cleared on cleanup.

## Current state

- `components/lab/LabApp.tsx` — client component owning lab modal state. The buggy effect is lines 81–123:

```tsx
// Body scroll lock + keyboard/wheel/swipe cycling
useEffect(() => {
  if (selected == null) return;
  document.body.style.overflow = "hidden";

  let wheelLock = false;
  let wheelAccum = 0;
  let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;
  const onKey = (e: KeyboardEvent) => { ... };       // uses only close() / cycle()
  const onWheel = (e: WheelEvent) => {
    if (wheelLock) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    wheelAccum += delta;
    if (wheelResetTimer) clearTimeout(wheelResetTimer);
    wheelResetTimer = setTimeout(() => { wheelAccum = 0; }, 160);
    if (Math.abs(wheelAccum) > 24) {
      wheelLock = true;
      cycle(wheelAccum > 0 ? "next" : "prev");
      wheelAccum = 0;
      setTimeout(() => { wheelLock = false; }, 380);   // id never captured
    }
  };
  window.addEventListener("keydown", onKey);
  window.addEventListener("wheel", onWheel, { passive: true });
  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("wheel", onWheel);
    // BUG: wheelResetTimer and the lock timeout are not cleared
  };
}, [selected, cycle, close]);   // BUG: `selected` re-runs this on every cycle
```

- Key facts that make the fix safe:
  - Nothing inside the effect reads `selected` itself — only whether the modal is open (`selected == null` guard) and the stable callbacks.
  - `cycle` is a `useCallback` with deps `[total]` (line 32–41) and `close` is a `useCallback` with `[]` (line 43–48); `total` is a module-constant-derived length — both are referentially stable across cycles.
  - Therefore keying the effect on a derived boolean `isOpen = selected != null` preserves all behavior (scroll lock applied when opening, removed when closing) while keeping `wheelLock`/`wheelAccum` alive across cycles.

- Repo conventions: TypeScript strict; functional components; inline handler style as in the excerpt. Match it.

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Lint      | `npm run lint`     | exit 0              |
| Build     | `npm run build`    | exit 0              |
| Dev       | `npm run dev`      | serves localhost:3000 |

## Scope

**In scope**:
- `components/lab/LabApp.tsx` (the lines 81–123 effect only)

**Out of scope** (do NOT touch):
- `components/lab/LabCanvas.tsx`, `LabModal.tsx`, `LabCard.tsx` — unrelated.
- The touch-swipe handlers at lines 125–139 — they have their own thresholds and are not part of this bug.
- The keyboard handler logic — keys are discrete presses; no debounce change needed.
- The wheel threshold constants (24, 160ms, 380ms) — tuned by the maintainer; keep the values.

## Git workflow

- Branch: `advisor/003-lab-wheel-debounce`
- Single commit, e.g. `fix(lab): keep wheel debounce state across cycles`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Re-key the effect and capture timer ids

In `components/lab/LabApp.tsx`:

1. Above the effect, derive: `const isOpen = selected != null;`
2. Change the effect guard from `if (selected == null) return;` to `if (!isOpen) return;`
3. Capture the lock timeout id: `let wheelLockTimer: ReturnType<typeof setTimeout> | null = null;` and assign `wheelLockTimer = setTimeout(() => { wheelLock = false; }, 380);`
4. In the cleanup, add: `if (wheelResetTimer) clearTimeout(wheelResetTimer);` and `if (wheelLockTimer) clearTimeout(wheelLockTimer);`
5. Change the dependency array to `[isOpen, cycle, close]`.

**Verify**: `npx tsc --noEmit` → exit 0; `npm run lint` → exit 0 (no new warnings in LabApp.tsx).

### Step 2: Behavioral check in the browser

Run the dev server, open `http://localhost:3000/lab`, click a card to open the modal, then:

- Scroll once firmly with a wheel/trackpad → exactly ONE item advance per gesture (momentum tail must not advance further within ~380ms).
- Arrow keys still cycle; Escape still closes; body scroll is locked while open and restored after close.

If no interactive browser/preview tool is available, instead verify by code-reading that (a) the effect deps contain no value that changes during cycling, and (b) both timers are cleared in cleanup — and say in your report that the manual check was skipped.

**Verify**: behavior as described, no console errors.

## Test plan

No test runner exists in this repo yet (plan 006 introduces one, scoped to the scatter algorithm). This fix is verified by typecheck + the manual behavioral check. Do not introduce a test framework in this plan.

## Done criteria

- [ ] Effect dependency array in `LabApp.tsx` no longer contains `selected` (grep: `grep -n "\[selected, cycle, close\]" components/lab/LabApp.tsx` → no matches)
- [ ] Both `setTimeout` ids inside the effect are captured and cleared in the cleanup function
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0
- [ ] `git status` shows only `components/lab/LabApp.tsx` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The live effect body differs from the excerpt (drift).
- You find that `cycle` or `close` are no longer stable `useCallback`s — the fix's safety argument depends on that.
- The manual check shows one gesture still skipping items — the thresholds may need retuning, which is the maintainer's call (the constants are out of scope).

## Maintenance notes

- If swipe-vs-wheel behavior is ever unified, the same "state must outlive `selected` changes" constraint applies.
- Reviewer should scrutinize: that body scroll lock still releases when the modal closes (the `isOpen` transition true→false runs the cleanup).
