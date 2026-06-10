# Session Summary — Codebase Audit & Improvement Plans

**Date:** 2026-06-10 · **Audited at commit:** `cae30f1` (with uncommitted WIP in the tree) · **Produced by:** /improve (advisor mode — read-only on source; all output lives in `plans/` and `tasks/todo.md`)

---

## 1. What happened

A full standard-depth audit of the site across nine categories (correctness, security, performance, tests, tech debt, dependencies, DX, docs, direction), run with three parallel audit agents whose findings were each re-verified against the live code. 19 raw findings → 8 confirmed → **11 plan files** written for executor agents, plus decisions collected from Ulaş.

**Repo state at audit time:** Next.js 15.4.10 (App Router) + React 19 + Tailwind v4, TypeScript strict (clean), no tests, no CI. Uncommitted WIP: getirfinans-dark-mode case study (text complete, images placeholder), homepage featured-list swap, heading-block support in CaseStudyLayout/types.

---

## 2. Confirmed findings (all have plans)

| # | Finding | Plan |
|---|---------|------|
| 1 | Lab modal wheel debounce defeated — effect re-runs on every cycle, resets `wheelLock`; trackpad momentum skips items (`LabApp.tsx:81-123`) | 003 |
| 2 | TimeZoneCard hydration mismatch — state seeded with `DateTime.now()` at render (`TimeZoneCard.tsx:24`) | 004 |
| 3 | Next.js 15.4.10 carries 8 high-severity advisories; fixed in 15.5.x | 002 |
| 4 | No CI whatsoever — nothing gates typecheck/lint/build | 001 |
| 5 | Dead data: `public/data/experience.json` (diverged) + `layersURLs.json` + `LayersImage.tsx` unused; README documents files that don't exist (`uiShots.json`) | 007 |
| 6 | `react-aria-components` declared, never imported | 005 |
| 7 | Zero test baseline; the lab scatter algorithm (~100 lines of placement math) is the one genuinely test-worthy module | 006 |
| 8 | About-page hover words ("Ulaş", "Berlin", "Istanbul") invisible to touch + keyboard users; also the repo's only `target="_blank"` missing `rel` | 008 |

**Direction findings (accepted):** per-case-study SEO metadata + sitemap/robots (plan 009); WorkExperience component in limbo — ship or delete (plan 010); case studies in a dialog (plan 011, added on request).

## 3. Findings considered and rejected

Full list with reasons in `plans/README.md` § "Findings considered and rejected". Highlights: ResizeObserver leak (false — `disconnect()` covers it), inert `placeholder` flag (false — LabCard reads it), missing image dimensions/CLS (false — static imports carry dimensions), luxon→Intl swap (real but not worth the timezone-correctness risk), pre-commit hooks (marginal once CI exists).

---

## 4. Decisions made (by Ulaş, 2026-06-10)

1. **All 8 findings + all direction items become plans.** (No deferrals.)
2. **Current employer is Getir Finans** — plan 010 runs the SHIP branch; the data edit is fully specified in the plan (new "Product Designer, 2025 — Present" position, current-employer flag moves from Freelance, Getir Finans listed first). Reviewer still sanity-checks the inferred title/start date.
3. **Production domain confirmed: `ulasalyesil.com`** — plan 009's metadataBase is settled.
4. **getirfinans-dark-mode WIP:** confirmed that only images remain (7 case-study images + 1 homepage cover; text/structure/types complete). Ulaş collects the images himself.
5. **Image spec for mockups: 2560 × 1600 px, 16:10, WebP** — matches existing covers exactly; homepage card crops to 16:10 so the cover displays uncropped.
6. **Case-study dialog** (same slugs, lighter open from home/works) approved as a spike — plan 011, after 009, wisecareai-only prototype ending in a recommendation.
7. **AI assistant case study is coming** — Ulaş brings the brief; nothing is planned or built before then.

---

## 5. The plans (`plans/001-…` to `011-…`)

| Plan | What lands | Effort |
|------|-----------|--------|
| 001 | GitHub Actions CI: typecheck + lint + build on push/PR | S |
| 002 | Next.js → 15.5.x, advisories cleared | S |
| 003 | Lab wheel debounce fixed (effect keyed on `isOpen`, timers cleared) | S |
| 004 | TimeZoneCard renders a stable placeholder until mounted | S |
| 005 | `react-aria-components` removed | S |
| 006 | Vitest + scatter extracted to `scatter.ts` + 7 characterization tests; CI gains `npm test` | M |
| 007 | Dead data files + LayersImage + dead remotePattern deleted; README structure section fixed | S |
| 008 | Hover words: tap-to-peek on touch, focus/blur on keyboard, `rel` added | M |
| 009 | Per-case-study `metadata`, `metadataBase`, `sitemap.ts`, `robots.ts` | M |
| 010 | WorkExperience SHIPS on /about with corrected data | S |
| 011 | SPIKE: wisecareai opens in a dialog via intercepting routes (fallback: lab-style pushState); deliverable = working prototype + recommendation + rollout checklist | M |

Sequencing constraints: 002/005/006 touch the lockfile (run sequentially); 008/010 edit the same file (sequentially); 006 soft-depends on 001; 011 after 009.

---

## 6. Execution day — 2026-06-11 (run sheet also in `tasks/todo.md`)

1. **Images first (Ulaş):** 7 WebP files at 2560×1600 into `public/images/getirfinans-dark-mode/` → swap the 8 placeholder imports (paths in the TODO comments) → **commit the WIP** (plan drift-checks want a clean tree).
2. **Batch 1** (~45–60 min): 001, 002, 003, 004, 005, 007.
3. **Batch 2** (~30 min): 006.
4. **Batch 3** (~30–40 min): 008 → 010 (ship branch).
5. **Batch 4** (~20 min): 009.
6. **If time allows:** 011 spike.

Total for 001–010: roughly a 2–3 hour afternoon, executor agents in isolated worktrees with an advisor review of each diff.

---

## 7. Backlog (after execution day)

- **Image & performance checkup, site-wide (requested 2026-06-10).** A focused audit: every image on the site (formats, dimensions vs. rendered size, `sizes` attributes, lazy/priority loading, payload weight), plus general performance with a **native-feel-on-mobile** bar — interaction latency, scroll behavior, animation cost, bundle composition, font loading. **Deliberately scheduled AFTER execution day**: today the tree has WiseCare placeholders standing in for all getirfinans images and uncommitted WIP, so an image audit now would measure the wrong files. Run as `/improve perf` (or `/improve deep perf`) once the images are committed and plans 001–010 have landed; findings become new numbered plans.
- **AI assistant case study** — awaiting Ulaş's brief. Do not start.

---

## 8. Standing context for future sessions

- The advisor never edits source; executors do, in worktrees, one plan at a time, reviewed before merge.
- `plans/README.md` is the living index (status column updated by executors). Rejected findings are recorded there so they don't get re-audited.
- `tasks/todo.md` carries the dated run sheets and backlog; `tasks/lessons.md` is the corrections log.
