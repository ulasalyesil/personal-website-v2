# Tasks Todo

## Previous Work (Completed)

<details>
<summary>Phase 1–3, 5: Click to expand</summary>

### Phase 1: Critical Fixes ✅
- [x] Fix memory leak in TypingAnimatedText.jsx
- [x] Fix typo in bookmarks/page.jsx
- [x] Add ARIA labels to ContactCard.jsx
- [x] Add rel="noopener" to external links in ContactCard

### Phase 2: Error Handling ✅
- [x] Create ErrorBoundary.jsx
- [x] Create app/error.jsx
- [x] Move GA ID to .env.local
- [x] Integrate ErrorBoundary in layout.jsx

### Phase 3: Image Optimization ✅
- [x] Convert 27 PNGs to WebP (29MB → 10MB, 66% reduction)

### Phase 5: Tooling ✅
- [x] ESLint config, Prettier, dead code removal

</details>

## Phase 4: Code Quality (Partially Done)

- [x] Create `lib/constants.js` for social links
- [x] Create `lib/animations.js` for shared animation config
- [x] Add ARIA attributes to Tabs component
- [ ] Centralize brand colors fully (still duplicated in globals.css `@theme` + `:root` + tailwind.config.js)

## Phase 6: Dependencies

- [ ] Update safe dependencies (framer-motion, luxon, etc.)
- [ ] Plan Next.js 16 migration

---

## Code Review — Implementation Plan

Eight independent tasks. Any task can be worked on in isolation without
affecting the others. Shared files are noted where they exist — the changes
target different sections of those files so they won't conflict.

---

### Task 1: Critical Runtime Fixes
**Priority:** Critical
**Files:** `CaseStudyLayout.jsx`, `app/layout.jsx`
**Estimated scope:** 3 line changes

- [ ] `CaseStudyLayout.jsx:1` — Fix backtick `` `use client` `` → `"use client"`.
      This is a **broken directive** — the component runs as a server component
      but uses Framer Motion, which likely causes runtime errors on every case
      study page.
- [ ] `app/layout.jsx:31-32` — Move `<Analytics />` and `<GoogleAnalytics>`
      from between `</body>` and `</html>` to inside `<body>`. Currently invalid
      HTML.
- [ ] `app/layout.jsx:26,28` — Fix broken dark mode gradient classes.
      `dark:neutral-950/0` is missing the `to-` prefix. Should be
      `dark:to-neutral-950/0`. The bottom gradient overlay likely doesn't
      render in dark mode.

---

### Task 2: Dark Mode Component Fixes
**Priority:** High
**Files:** `Footer.jsx`, `TimeZoneCard.jsx`
**Estimated scope:** ~10 lines changed

- [ ] `Footer.jsx:14` — `<XIcon fill="#000" />` hardcodes black. Invisible on
      dark backgrounds. Use `currentColor` or a dark-mode-aware value.
- [ ] `TimeZoneCard.jsx:65` — `theme('colors-neutral-400')` inside an inline
      `style` attribute. The `theme()` function only works in PostCSS-processed
      CSS, not in JS. Replace with the actual hex value (`#a3a3a3`).
- [ ] `TimeZoneCard.jsx:108` — Time marker gradient uses hardcoded `#171717`,
      invisible in dark mode. Needs a conditional or CSS variable approach.

---

### Task 3: Navigation & Routing
**Priority:** High
**Files:** `Tabs.jsx`
**Estimated scope:** ~15 lines changed

- [ ] Add `usePathname()` from `next/navigation` to determine the real active
      route.
- [ ] Separate **hover highlight** (visual feedback, current behavior) from
      **active route indicator** (semantic, for accessibility).
- [ ] Move `aria-current="page"` from hover-based `isSelected` to
      pathname-based comparison. Currently screen readers announce whichever
      tab is hovered as the "current page."
- [ ] Update to modern Next.js Link API — remove `passHref`, `legacyBehavior`,
      and nested `<a>` tag. These are deprecated in Next.js 13+.
- [ ] Optional: visually distinguish the active-route tab (e.g., bolder text)
      vs. the hover highlight pill.

---

### Task 4: Responsive Layout Fixes
**Priority:** High
**Files:** `app/page.jsx`, `app/about/page.jsx`, `components/SelectedProjects.jsx`, `CaseStudyLayout.jsx`
**Estimated scope:** ~10 lines changed

- [ ] `app/page.jsx:19` — Replace `sm:w-[1200px]` with `w-full max-w-[1200px]`.
      Current code jumps from mobile width to fixed 1200px at the 640px
      breakpoint, causing horizontal overflow on tablets/small laptops.
- [ ] `app/about/page.jsx:157` — Remove `md:px-auto`. `px-auto` is not a valid
      Tailwind utility (padding doesn't accept `auto`). This is a no-op.
- [ ] `SelectedProjects.jsx:33,39` — Normalize relative `target` paths to
      include leading `/`. Currently `"jotform-integrations"` and
      `"good-afternoon-creative"` lack `/` while siblings use `/wisecareai`.
- [ ] `SelectedProjects.jsx:14,28` — Inconsistent breakpoints: first row uses
      `sm:flex-row`, second uses `md:flex-row`. Cards wrap at different widths.
- [ ] `CaseStudyLayout.jsx:62` — Gallery uses `grid-cols-2` with no mobile
      fallback. Add `grid-cols-1 sm:grid-cols-2` so images aren't squeezed
      on narrow screens.
- [ ] `layout.jsx:26,28` — Gradient overlay uses `w-screen` which can cause
      horizontal overflow. Consider `w-full`.

---

### Task 5: Accessibility Pass
**Priority:** Medium
**Files:** `globals.css`, `app/layout.jsx`, `Hero.jsx`, `Button.jsx`, `app/about/page.jsx`, `Section.jsx`, `app/bookmarks/page.jsx`
**Shared files:** `layout.jsx` (also in Task 1 — different section), `about/page.jsx` (also in Task 4/8 — different section)
**Estimated scope:** ~35 lines changed

- [ ] `globals.css:50-52` — Scope `* { cursor: none !important }` to pointer
      devices only: wrap in `@media (pointer: fine)`. Currently hides cursor
      for ALL users including those with accessibility needs.
- [ ] `globals.css` — Add `*:focus-visible` outline styles. Currently no visible
      focus indicator on keyboard navigation. With cursor hidden, keyboard users
      are completely lost.
- [ ] `app/layout.jsx` — Add a skip-to-content link (`<a href="#main">`) as the
      first child of `<body>`, visually hidden until focused.
- [ ] `Hero.jsx:39` — `<a>` without `href` wrapping "open for new
      opportunities". Not a valid link, not keyboard-focusable. Change to
      `<span>` or `<p>`.
- [ ] `Hero.jsx` — Two `<h1>` elements (name + tagline). Should use `<h1>` for
      name and `<h2>` or `<p>` for tagline.
- [ ] `Button.jsx:16` — Add `rel="noopener noreferrer"` when `target` prop is
      `"_blank"`. Currently no rel attribute on external links.
- [ ] `about/page.jsx:39-50` — `HoverableWord` renders `<Link>` with
      `target="_blank"` but no `rel` attribute. Add `rel="noopener noreferrer"`.
- [ ] `about/page.jsx` — HoverableWord lacks keyboard support. `onMouseEnter/Leave`
      but no `onFocus/onBlur`. Keyboard users can't trigger hover content.
- [ ] `Section.jsx:36` — `<ol>` with no `<li>` wrappers. SectionItem rendered
      directly inside `<ol>`. Breaks semantic HTML and screen reader list parsing.
- [ ] `bookmarks/page.jsx` — Same `<ol>` without `<li>` issue with LinkItem.
- [ ] (Design decision) Color contrast: `text-neutral-500` (#737373) on #f5f5f5
      is ~3.5:1, below WCAG AA (4.5:1). Consider `text-neutral-600` (#525252)
      for body text. Widespread — affects Footer, SectionItem, Hero subtitle.

---

### Task 6: TypingAnimatedText Rewrite
**Priority:** Medium
**Files:** `components/TypingAnimatedText.jsx`
**Estimated scope:** ~20 lines changed

- [ ] Rewrite interval logic using `useRef` for the character index instead of
      state-driven `[i, text]` dependency. Current approach creates/destroys an
      interval on every single character — works but wastes lifecycle effort.
- [ ] Fix the text fallback logic. Line 33: `{displayedText ? displayedText : text}`
      shows full text only *before* typing starts (when `displayedText` is `""`).
      Once a single character is typed, it shows partial text forever if the
      component unmounts mid-animation. Should show full text after animation
      completes OR when not in viewport.
- [ ] `text-muted-foreground` class on line 27 doesn't exist in Tailwind config.
      Replace with `text-neutral-500` or appropriate class.
- [ ] Component doesn't accept `className` prop but callers may pass it.
      Styles silently dropped. Add `className` prop support.
- [ ] Consider using IntersectionObserver (or Framer Motion's `whileInView`) to
      only start the typing animation when the element scrolls into view,
      rather than immediately on mount. Currently 8+ items on the works page
      all type simultaneously.

---

### Task 7: Code Cleanup & Housekeeping
**Priority:** Low
**Files:** Various (see list below)
**Shared files:** `CaseStudyLayout.jsx` (also in Task 1 — different line), `about/page.jsx` (also in Tasks 4/5/8)
**Estimated scope:** File deletions + ~20 lines changed

- [ ] Delete unused components:
      - `components/Article.jsx` — not imported anywhere
      - `components/LayersImage.jsx` — not imported anywhere
      - `app/genesis/GenesisContent.jsx` — not imported by genesis/page.jsx
- [ ] Verify `components/HProjectCard.jsx` usage — appears unused. Delete if
      confirmed.
- [ ] Delete unused data: `public/data/layersURLs.json` — not imported anywhere.
- [ ] Remove `react-aria-components` from `package.json` — listed as dependency
      but never imported.
- [ ] `Section.jsx:12` — Fix typo `projecctB` → `projectB`.
- [ ] `Section.jsx:19` — Remove stale TODO comment link.
- [ ] `about/page.jsx:8` — Remove orphan comment `// otherData import removed`.
- [ ] `app/not-found.jsx` — Replace hardcoded social URLs with `SOCIAL_LINKS`
      from `lib/constants.js`. Also: hardcoded URLs use `x.com` while
      constants use `twitter.com` — unify.
- [ ] Deduplicate animation configs:
      - `about/page.jsx:18-22` — import `fadeInUp` from `lib/animations.js`
        instead of redefining
      - `CaseStudyLayout.jsx:9-13` — same
      - `CaseStudyTitle.jsx` — same
- [ ] Normalize import paths to consistently use `@/` alias (currently mixed
      with `../` relative paths in the same files, e.g., `ContactCard.jsx`).
- [ ] `globals.css:5-15` — Remove duplicate `:root` block; `@theme` already
      registers CSS variables in Tailwind v4.
- [ ] `others.json` — Date format inconsistency: `"February 2021"` (no comma)
      vs all other dates like `"August, 2021"` (with comma).
- [ ] `gacContent.json` — Typo: "their focused to create" → "they focused on
      creating".
- [ ] `app/page.jsx:22` — Hardcoded `selection:text-[#017BFC]` (blue) while
      brand color is orange. Use brand token.
- [ ] `Footer.jsx:24` — Hardcoded `hover:text-[#017bfc]` instead of design token.

---

### Task 8: About Page Touch Support
**Priority:** Low
**Files:** `app/about/page.jsx`
**Shared files:** Also touched by Tasks 4, 5, 7 — all target different sections
**Estimated scope:** ~25 lines changed

- [ ] The hover-to-reveal interaction (profile image, timezone cards) has no
      touch/mobile fallback. On touch devices, these interactive words look
      like regular links and the content popup never appears.
- [ ] Options to evaluate:
      1. **Tap-to-toggle**: First tap shows content, second tap follows link
      2. **Always visible on mobile**: Show timezone/profile below the text on
         small screens (no hover needed)
      3. **Long-press to preview**: Show content on long-press, normal tap
         follows link
- [ ] Whichever approach: ensure the timezone card's fixed `w-3xs` (256px)
      doesn't overflow on small viewports.
- [ ] The `pointer-events-none` on the popup (line 201) prevents interaction
      with the timezone card. Consider if that's intentional.

---

## Future Considerations (from reviews)

These are larger-scope items not in the 8-task plan:

- [ ] Add per-page metadata to all case study pages (all 6 inherit generic title)
- [ ] Add `app/sitemap.js` and `app/robots.js` for SEO
- [ ] Add back-navigation / breadcrumbs to case study pages
- [ ] Handle external project links in SectionItem (`target="_blank"` for
      "Frey Money", "Dezign Brief" etc.)
- [ ] Add `loading.jsx` states for route transitions
- [ ] Consider converting static pages (Bookmarks) to server components
- [ ] Evaluate framer-motion bundle impact / dynamic imports
- [ ] Footer `pb-80` (320px padding) — reduce to `pb-16` or `pb-24`
- [ ] Button `h-8` (32px) too small for mobile touch — consider `h-10`
- [ ] Button: consolidate `primary`/`primaryLong` into a `fullWidth` prop
- [ ] Bookmarks tab hidden on mobile — no way to discover the page
- [ ] Footer shows only X + LinkedIn vs Contacts showing 5 platforms

---

## File Dependency Map

Shows which tasks touch each file. If working on two tasks that share a file,
do them sequentially to avoid merge conflicts.

| File | Tasks |
|------|-------|
| `app/layout.jsx` | 1, 4, 5 |
| `app/about/page.jsx` | 4, 5, 7, 8 |
| `CaseStudyLayout.jsx` | 1, 4, 7 |
| `globals.css` | 5, 7 |
| All other files | Single task each |

---

## Recommended Order (if doing sequentially)

1 → 2 → 4 → 3 → 5 → 6 → 7 → 8

Critical fixes first, then dark mode and layout (user-facing), then
accessibility and component improvements, then housekeeping.
