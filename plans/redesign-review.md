# Redesign review

## Verdict: ship after fixes

Fix the hero's hidden keyboard focus and the new low-contrast text before shipping. Resolve the Lab reading/history defects or explicitly accept them as existing issues. Complete light-mode and reduced-motion browser verification before treating this as full release sign-off.

Reviewed 17 September 2026 against `plans/home-redesign.md`. Review only: no application edits, commits, dependency installs or deployments.

The requested nine-commit scope is actually **10 commits**: `main` at `64c1447` through `redesign/home` at `8f5bc27`. All ten were included, including the final About rewrite. This report is the only authored file.

## Checks run

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass with existing console/unused-signature warnings; no new blocking errors |
| `npm test` | Exit 0, but **no test files found**. `--passWithNoTests` means this is not behavioral coverage. |
| `npm run build` | Pass; 25 static outputs |
| Production server | Reviewed production build on localhost:3107; separately built and served `main` on localhost:3108 for comparison |
| Route responses | All 15 requested routes returned 200; an unknown route returned 404 |
| Responsive DOM matrix | 16 routes × 6 widths = 96 checks, at 360, 390, 768, 1024, 1440 and 2560 CSS pixels. Verified actual viewport width after navigation. No document horizontal overflow, exactly one H1, no duplicate active `view-transition-name` values. |
| Visual browser review | Real browser screenshots and interactive spot checks, in dark mode. This was not a screenshot comparison of every matrix cell. |
| Light mode | Static CSS/token review only. Runtime emulation unavailable. |
| Reduced motion | Static implementation review only. Runtime emulation unavailable. |

Routes: `/`, `/works`, `/about`, `/lab`, `/lab/common-ground`, `/lab/fx-chart-range`, `/bookmarks`, `/getirfinans-ai`, `/getirfinans-design-system`, `/jotform-integrations`, `/wisecareai`, `/commodore`, `/genesis`, `/full-spectrum-insights`, `/good-afternoon-creative`. Unknown-route check: `/review-missing-route`.

## Findings, P0 to P3

No P0 issue found. P1 denotes a release blocker; P2 denotes a material usability defect. Existing findings are explicitly marked and are not redesign regressions.

| Priority | Finding and evidence | File / route | Impact | Fix direction |
|---|---|---|---|---|
| **P1** | **The dark hero overlay hides keyboard focus.** At 360px, Tab focused Résumé at x≈203, y=56, 80×44px. The real anchor had a computed 2px solid orange outline, but no ring was visible in the screenshot. Work on the light side showed its ring. The opaque dark copy paints over the real focused light copy. | `/`; `components/home/ModeSplitHero.module.css:21`, `:151`; `components/home/ModeSplitHero.tsx:25` | Keyboard visitors cannot see which link is active on the dark side, despite the underlying link receiving focus. | Put the single interactive foreground above the palette layers, or mirror the focused target's visual state into the overlay. Preserve the overlay's `inert` and `aria-hidden` semantics. Test every nav link and contact CTA with the boundary at both edges and its resting position. |
| **P1** | **New small text fails contrast.** The green Lab band's 16px/500 kicker uses 72% white over `#2f6f52`: **3.97:1**. The new 12px Now badge uses `#c94200` on its 12% brand tint over white: **4.15:1**. Both need 4.5:1. The badge result is a static light-palette calculation, not a light-mode browser observation. | `/`, `components/home/LabFeature.module.css:26`; `/about`, `components/WorkExperience.module.css:63` | Small labels are harder to read and fail the normal-text contrast threshold. | Use full white or a verified higher-opacity white for the kicker. Darken the badge foreground or change its background until the composed pair reaches 4.5:1. Recheck both schemes. |
| **P2, existing** | **Closing the Lab dialog during Back navigation destroys Forward history.** Reproduction on both redesign and `main`: load `/lab`, open Common Ground, go Back, then Forward. Both browser sessions reported no next page in history. `popstate` closes the dialog; its `onClose` pushes a new `/lab` entry. | `/lab`; `components/lab/LabApp.tsx:69`, `:177` | Browser navigation cannot reliably restore the experiment just visited. Closing can also add redundant index entries. | Make URL-driven dialog synchronization side-effect-free. Let one explicit navigation action own history writes; do not push history from the native close event when responding to `popstate`. |
| **P2, existing handler; redesign exposure** | **Scrolling a long Lab description changes experiments.** At 1024×900, Common Ground's description extends down the left pane and the navigation sits below the visible area. Scrolling over the description changed the URL to `/lab/fx-chart-range`. The window wheel listener cycles after accumulated delta exceeds 24. This listener already exists on `main`; the redesigned larger description typography increases the space required. | `/lab/common-ground`; `components/lab/LabApp.tsx:103`, `:121`; `components/lab/LabModal.tsx` | A normal reading gesture unexpectedly replaces the content being read. | Give long copy a usable scroll region and avoid consuming its wheel gestures. Prefer explicit Previous/Next controls; if gesture cycling remains, scope it to an intentional surface and respect nested scrolling. |
| **P2, existing; code evidence** | **Lab entry motion does not consult reduced-motion preferences.** `slideVariants` applies vertical movement and is used by both modal variants without a reduced-motion branch. CSS suppression of the dialog entry class does not remove these Framer Motion variants. Runtime with the preference enabled was not tested. | `components/lab/LabModal.tsx:8`, `:111`, `:200` | Cycling experiments can still animate for visitors requesting reduced motion. | Use the preference to remove positional transitions, then verify entry, cycling and exit in a browser with reduced motion enabled. |

Contrast uses composited sRGB colours and relative luminance, not opacity values alone. The ordinary white Lab heading passes at about 5.97:1; the 82% white summary passes at about 4.62:1. Do not treat the entire green band as failing.

Standards: [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [WCAG focus visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

## Regressions against main

1. **Hidden hero focus:** introduced by the new duplicated, clipped hero layers. The old homepage did not have this overlay.
2. **Green Lab kicker contrast:** introduced by `LabFeature`.
3. **Light Now badge contrast:** introduced by the redesigned experience ledger.

Lab history corruption reproduces on `main`. The wheel-cycling and modal animation handlers predate the redesign. The larger modal body text is a redesign change, but no claim is made that the original long-description layout was fully usable.

## Focus-area assessment

### Hero and transitions

The hero intentionally displays both palettes. Only the light layer contributes its content to the accessibility tree; the dark copy is inert. The slider code supports arrow increments, Shift increments and Home/End, with edge clamping to keep the grip on screen. The grip is 48px; the narrower vertical strip should not be mistaken for its complete target.

The reduced-motion branch sets the hero boundary immediately rather than running the introductory sweep. This was source-checked, not preference-enabled runtime-tested. Full drag, touch, pointer-cancellation and all keyboard endpoint combinations are not certified by this review.

No duplicate active transition names appeared in the 96 route/width checks. The AI gallery opts out where required; cover naming and next-study destinations were inspected. This confirms name uniqueness, not every browser's animated transition behavior.

### Case-study layout and navigation

The editorial layout switches at 1024px to a kicker rail and separate title/content lanes. The responsive matrix found no page-level overflow. The renderer retains full-width and first-image distinctions. No current content using the new bleed lane was found, so a real bleed example was not exercised.

The in-study navigation is conditional on content length and section count; the inspected current routes did not mount it. Its source offsets account for the 56px header. Sticky behavior with an actually eligible long study remains unverified.

### About and content provenance

About remains a server page with metadata, while the interactive text is isolated in `components/about/AboutText.tsx`. The text transformation preserves trailing punctuation. No factual contradiction was found between the rewritten introduction, work data and experience entries.

| Status | Supporting source in this repository / externally |
|---|---|
| GetirFinans AI: shipped on iOS, with SwiftUI prototypes | AI case-study copy distinguishes shipped work and prototypes; related captures and experience support the scope |
| GetirFinans design system: shipped app-wide | Design-system case-study content and work experience |
| Jotform: launched | Case-study source links the [official QuickBooks integration launch article](https://www.jotform.com/blog/introducing-jotforms-quickbooks-integration/) |
| WiseCareAI: market-ready | Case-study status explicitly says market-ready and not launched; the new work summary does not claim a launch |

These are provenance checks, not independent verification of private employment or product metrics. The authored copy must remain the source of truth for unpublished claims.

### Tap targets and images

The sampled standalone controls at 360px met the requested 44px target check. Inline prose links were considered separately. This was DOM geometry inspection, not a physical touch-device test.

Largest rendered image checks used DOM geometry and loading attributes. Large below-fold content should remain lazy; the largest image anywhere in a document is not necessarily its LCP element.

| Route / group | Large-image observation |
|---|---|
| Home | Lab device image is tall below the fold; selected-work imagery is the relevant earlier content |
| Work | Leading AI project cover is prioritized |
| About | Portrait is prioritized and supplies responsive sizes |
| Lab and both Lab details | Device/screenshot content inspected; modal and background imagery can coexist |
| GetirFinans AI | Visual lead cover is prioritized; duplicate gallery transition naming is disabled |
| Design system | Tall token-naming documentation image is lazy below the fold; leading figure has priority |
| Jotform | Large mapper image is lazy below the fold; cover has priority |
| WiseCareAI | Large form image is lazy below the fold; leading image has priority |
| Commodore | Tall landing-page image is the first content image and has priority |
| Genesis | Primary media is video; the next-study image must not be confused with the study's primary media |
| Full Spectrum Insights | Large screenshot is lazy; leading image has priority |
| Good Afternoon Creative | Long landing-page image is lazy; leading banner has priority |
| Bookmarks / missing route | No content image requiring a largest-image assessment |

No measured LCP, image decode timing, bandwidth benchmark or field performance claim is made.

## Not checked / limits

- Light-mode rendering and preference-enabled reduced-motion behavior. The browser exposed viewport control but no media-preference emulation. Attempting to inspect OS settings encountered a system permission barrier; no settings were changed.
- Physical touch, screen-reader announcements, exhaustive focus trapping, modifier-click/new-tab behavior, and every hero drag/keyboard endpoint.
- Screenshot review of every route at every width. The full matrix was DOM-checked; visual and interactive checks were sampled.
- A current case study that mounts the conditional in-study navigation, and authored content exercising the bleed lane.
- LCP/performance profiling and independent verification of private status claims.
- The separate SEO audit, known grafik bookmark issue and pre-existing unused SidebarStack/ContactCard code, as instructed.

A passing build and zero document overflow do not resolve the findings above or substitute for the unavailable preference checks.
