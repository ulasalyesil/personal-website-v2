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

## Project-Specific Notes
<!-- Notes specific to this portfolio project -->
