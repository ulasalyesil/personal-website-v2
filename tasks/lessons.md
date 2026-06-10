# Lessons Learned

## Patterns & Rules
<!-- Document patterns and rules learned from corrections -->

- **Never run `npm run build` while the dev server is running** — they share
  `.next/`, and the build clobbers the dev server's compiled chunks
  (MODULE_NOT_FOUND on vendor-chunks). Stop the preview server before
  building, or restart it after. (Discovered 2026-06-11 during plan 006
  verification — the lab page 500'd after a concurrent build.)

## Mistakes to Avoid
<!-- Track mistakes and their solutions -->

## Project-Specific Notes
<!-- Notes specific to this portfolio project -->
