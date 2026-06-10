# Plan 008: Make the about-page hover words work on touch and keyboard

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- "app/(main)/about/page.tsx"`
> If the file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (interaction-design judgment; visual behavior change)
- **Depends on**: none
- **Category**: bug / a11y
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

The about page highlights three words — "Ulaş", "Berlin", "Istanbul" — that reveal a floating card (profile photo or timezone card) on mouse hover. The reveal is wired exclusively to `onMouseEnter`/`onMouseLeave`, so touch users (a large share of portfolio traffic) and keyboard users never see the cards at all; the words behave as plain external links. The maintainer's own `tasks/todo.md` (Task 8) flags this. The fix adds focus-based reveal for keyboard and tap-to-peek for touch, without changing mouse behavior. A drive-by inconsistency gets fixed in the same file: this is the only external `target="_blank"` link in the repo missing `rel="noopener noreferrer"` (Footer and SectionItem both have it).

## Current state

- `app/(main)/about/page.tsx` — client component, 156 lines. The relevant pieces:

`HoverableWord` (lines 56–67) — mouse-only, no `rel`:

```tsx
const HoverableWord = ({ word, contentType, onHover, onLeave, link }: HoverableWordProps) => (
  <Link
    href={link}
    target="_blank"
    className="relative inline-block group"
    onMouseEnter={() => onHover(contentType)}
    onMouseLeave={onLeave}
  >
    <span className="absolute inset-0 bg-brand rounded-md scale-x-110 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
    <span className="relative z-10">{word}</span>
  </Link>
);
```

- State lives in `About` (lines 106–115): `activeContentType: HoverKey | null`, handlers `handleWordHover`/`handleWordLeave` passed down through `processText` (lines 76–104). The revealed card renders at lines 142–146, absolutely centered over the paragraph block, `pointer-events-none`.
- `hoverContent` map (lines 33–46): word → `{ component, link }`. Links are LinkedIn and two Wikipedia pages — external URLs passed to next/link's `<Link>`.
- Exemplar for external-link convention: `components/Footer.tsx` uses `target="_blank" rel="noopener noreferrer"` (and uses plain `<a>`; SectionItem likewise). Match that convention.
- Repo conventions: TypeScript strict; handlers defined inline; Tailwind classes; `group-hover:` styling for the highlight.

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Lint      | `npm run lint`     | exit 0              |
| Build     | `npm run build`    | exit 0              |
| Dev       | `npm run dev`      | serves localhost:3000 |

## Suggested executor toolkit

- If preview tools are available (`preview_start`, `preview_resize`, `preview_snapshot`), use them for step 4 — `preview_resize` can emulate a narrow viewport, though true touch-event emulation may not be available; in that case verify the touch path by code-reading and say so.

## Scope

**In scope**:
- `app/(main)/about/page.tsx` only.

**Out of scope** (do NOT touch):
- `components/TimeZoneCard.tsx` (plan 004 owns it), `components/Footer.tsx`, `components/ui/Button.tsx`.
- The visual design of the floating card or the highlight effect.
- The paragraph copy.
- Converting `<Link>` to `<a>` — tempting (external URLs don't need next/link) but a separate cosmetic call; leave the component type alone.

## Git workflow

- Branch: `advisor/008-hoverword-touch-keyboard`
- Single commit, e.g. `fix(about): hover words usable via touch and keyboard`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add `rel` and keyboard focus support

In `HoverableWord`:
- Add `rel="noopener noreferrer"` to the `<Link>`.
- Add `onFocus={() => onHover(contentType)}` and `onBlur={onLeave}` (links are natively focusable; no tabIndex needed).
- Make the highlight respond to focus as well as hover: extend the highlight span's classes with `group-focus-visible:opacity-100`.

**Verify**: `npx tsc --noEmit` → 0. In the browser: Tab to each word → card appears, highlight visible; Tab away → card hides.

### Step 2: Add tap-to-peek for touch

Behavior to implement (first tap peeks, second tap follows the link — the standard disclosure pattern for hover content on touch):

- In `About`, track which word was peeked: `const [peeked, setPeeked] = useState<HoverKey | null>(null);`
- Pass an `onTap(contentType) => boolean` (or equivalent) down to `HoverableWord`, and give `HoverableWord` an `onClick` handler:

```tsx
onClick={(e) => {
  // Only intercept for touch/coarse pointers — mouse users hover first, so click-through stays native.
  if (window.matchMedia("(hover: none)").matches && peekedKey !== contentType) {
    e.preventDefault();
    onHover(contentType);
    onPeek(contentType);
  }
}}
```

- In `About`, `onPeek` sets `peeked`; tapping elsewhere should dismiss: add an effect (or a document-level `pointerdown` listener while `peeked != null`) that clears `peeked` and `activeContentType` when the tap target is outside a hover word. Keep it simple — one listener, added when `peeked != null`, removed on cleanup.
- Second tap on the same word: `peekedKey === contentType`, so the guard falls through and the link opens normally.

Exact prop plumbing is yours, but the threading must go through `processText` (lines 76–104), which currently forwards `onHover`/`onLeave` — extend its signature consistently.

**Verify**: `npx tsc --noEmit` → 0; `npm run lint` → 0.

### Step 3: Keep mouse behavior identical

Confirm by code-reading: on devices where `(hover: none)` is false, `onClick` never calls `preventDefault`, and the mouseenter/mouseleave handlers are unchanged.

**Verify**: in a desktop browser, hover each word → card appears as before; click → link opens in new tab on first click.

### Step 4: Touch check

In a touch emulator (browser devtools device mode) on `http://localhost:3000/about`: first tap on "Berlin" → timezone card appears, no navigation; tap elsewhere → card dismisses; tap "Berlin" twice in a row → second tap opens Wikipedia. If touch emulation isn't available in your environment, verify the logic paths by reading and report the check as skipped.

**Verify**: behavior as described, no console errors.

## Test plan

No test runner targets UI in this repo (plan 006 is pure-logic only). Verification is the manual matrix in steps 1, 3, 4: keyboard / mouse / touch.

## Done criteria

- [ ] `grep -n 'rel="noopener noreferrer"' "app/(main)/about/page.tsx"` → ≥1 match
- [ ] `grep -n "onFocus" "app/(main)/about/page.tsx"` → ≥1 match
- [ ] First-tap-peek logic present and guarded by a coarse-pointer/hover-none media query check
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0
- [ ] `git status` shows only `app/(main)/about/page.tsx` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The file has drifted from the excerpts (note: this file already has uncommitted local modifications in the maintainer's tree — the drift check matters here).
- The tap-to-peek interaction conflicts with the centered overlay (e.g. the card covers the word being tapped, blocking the second tap) — the overlay is `pointer-events-none` so it shouldn't, but if it does, report rather than redesigning the overlay.
- You find yourself wanting to restructure `processText` or the `hoverContent` map beyond adding the new callback — that's over-reach for this fix.

## Maintenance notes

- If a fourth hover word is added, no new wiring is needed — the pattern is per-key, not per-word.
- Reviewer should scrutinize: the global dismiss listener's cleanup (no leaked listeners when navigating away mid-peek), and that desktop click behavior is untouched.
- Deferred: converting these external links from next/link `<Link>` to `<a>` for convention's sake.
