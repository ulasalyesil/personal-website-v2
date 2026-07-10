# Lessons Learned

## Patterns & Rules
<!-- Document patterns and rules learned from corrections -->

- **Never run `npm run build` while the dev server is running** — they share
  `.next/`, and the build clobbers the dev server's compiled chunks
  (MODULE_NOT_FOUND on vendor-chunks). Stop the preview server before
  building, or restart it after. (Discovered 2026-06-11 during plan 006
  verification — the lab page 500'd after a concurrent build.)

- **Clear `.next` and restart dev before testing routing-structure changes**
  (parallel routes, intercepting routes, adding/removing route folders).
  Two incidents during plan 011: (1) a leftover production build in `.next`
  made the client router crash with `TypeError: initialTree is not iterable`
  on interception — looked like a Next bug, was stale cache; (2) swapping an
  intercept folder while dev ran produced contradictory interception results
  until a clean restart. Routing behavior is only trustworthy on a freshly
  started dev server with a clean `.next`.

## Mistakes to Avoid
<!-- Track mistakes and their solutions -->

- **If framer-motion animations "don't run" in the preview browser, check
  `document.visibilityState` and probe `requestAnimationFrame` FIRST** —
  before bisecting code. A hidden/minimized preview window pauses rAF
  entirely: springs never start (elements stay at their initial values),
  ResizeObserver never fires (lab canvas renders zero cards), and
  `experimental.viewTransition` makes soft navigations hang. Each
  `preview_screenshot` forces one paint frame, which advances animations by
  one tick — usable as a manual frame pump, and also the tell-tale clue
  (state flips but styles freeze). Cost: ~45 min of false code-bisecting on
  2026-06-11 while building the site nav shell.

- **Functional flows ARE testable in a hidden claude-in-chrome tab** (when no
  visible window exists): hidden documents *skip* view transitions instead of
  hanging, so soft navigation works — unlike the "visible-but-unpainted"
  preview pane. Technique: set `window.__marker` before acting; if it's gone
  afterwards, a full reload happened (that's how the double-close history bug
  surfaced on 2026-07-10). Springs/AnimatePresence exits stay frozen (rAF),
  so exiting panes linger — that's an artifact, not a bug. Motion *feel*
  still needs a visible window. Also: don't `await` across a navigation
  inside one `javascript_tool` call — the eval context dies and the click
  degrades into a hard navigation.

## Project-Specific Notes
<!-- Notes specific to this portfolio project -->
