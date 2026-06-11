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

## Project-Specific Notes
<!-- Notes specific to this portfolio project -->
