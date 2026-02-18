# Tasks Todo

## Phase 1: Critical Fixes ✅ COMPLETE

- [x] Pull latest from origin/main (fast-forward merge)
- [x] Run npm install, verify build
- [x] Fix memory leak in `TypingAnimatedText.jsx` (added dependency array)
- [x] Fix typo in `app/bookmarks/page.jsx` (`mx-aut` → `mx-auto`)
- [x] Add ARIA labels to `ContactCard.jsx` (icon-only links)
- [x] Add `rel="noopener"` to external links in ContactCard

## Phase 2: Error Handling ✅ COMPLETE

- [x] Create `components/ErrorBoundary.jsx`
- [x] Create `app/error.jsx` (Next.js route-level error)
- [x] Move GA ID to `.env.local`
- [x] Create `.env.example`
- [x] Integrate ErrorBoundary in `app/layout.jsx`
- [x] Fix typo in layout.jsx comment (`anayltics` → `analytics`)

## Phase 3: Image Optimization ✅ COMPLETE

- [x] Audit image sizes (was 29MB)
- [x] Convert 27 large PNGs to WebP
- [x] Resize oversized images (gacWeb: 3978x7966 → 2000px width)
- [x] Optimize picture.jpeg (1.2MB → 717KB)
- [x] Update all code imports to use .webp
- [x] Remove original PNG files
- [x] **Result: 29MB → 10MB (66% reduction!)**

## Phase 4: Code Quality (Partially Done)

- [x] Create `lib/constants.js` for social links
- [x] Create `lib/animations.js` for shared animation config
- [x] Add ARIA attributes to Tabs component
- [ ] Centralize brand colors fully (still duplicated in globals.css `@theme` + `:root` + tailwind.config.js)

## Phase 5: Tooling ✅ COMPLETE

- [x] Strengthen ESLint config
- [x] Add Prettier config
- [x] Clean dead code (Experience.jsx)

## Phase 6: Dependencies

- [ ] Update safe dependencies (framer-motion, luxon, etc.)
- [ ] Plan Next.js 16 migration

---

## Comprehensive Review (February 2026)

### A. Code Quality Issues

**HIGH PRIORITY**

1. **Typo in Section.jsx:12** — `projecctB` should be `projectB`
   ```js
   ([, projectA], [, projecctB]) => {
   ```

2. **CaseStudyLayout.jsx:1** — Uses backtick instead of quotes for `"use client"`
   ```js
   `use client`;  // should be "use client"
   ```

3. **Duplicate brand color definitions** — Colors defined in THREE places:
   - `styles/globals.css` `@theme` block (lines 5-9)
   - `styles/globals.css` `:root` block (lines 11-15) — redundant with @theme
   - `tailwind.config.js` (lines 12-17)
   Single source of truth needed.

4. **`not-found.jsx` hardcodes social links** — Uses raw URLs instead of `SOCIAL_LINKS` from `lib/constants.js`, and includes `posts.cv` link not used elsewhere.

5. **`not-found.jsx` uses different X URL** — `https://x.com/ulasalyesil` vs `https://twitter.com/ulasalyesil` everywhere else.

6. **SelectedProjects.jsx:33** — Missing leading `/` on Jotform target:
   ```jsx
   target="jotform-integrations"  // should be "/jotform-integrations"
   ```

7. **Unused component: `LayersImage.jsx`** — Has a generic alt text `"Picture of the author"` and uses deprecated `layout='responsive'` prop. Not imported anywhere.

8. **Unused component: `HProjectCard.jsx`** — Not imported by any page. Dead code.

9. **Unused component: `Article.jsx`** — Not imported by any page. Dead code.

10. **Unused data file: `public/data/layersURLs.json`** — Not imported anywhere.

**MEDIUM PRIORITY**

11. **`app/page.jsx` is client component unnecessarily** — `"use client"` at top, but could be server component if framer-motion was isolated to child components. This forces the entire homepage to be client-rendered.

12. **Inconsistent import paths** — Mix of `../components/` and `@/components/`:
    - `app/page.jsx:6` uses `@/components/SelectedProjects` but line 8 uses `../components/Section`

13. **Tabs.jsx uses deprecated Next.js Link API** — `passHref` and `legacyBehavior` props are unnecessary in Next.js 13+. Uses nested `<a>` inside `<Link>`.

14. **`CaseStudyTitle.jsx` and `CaseStudyLayout.jsx` both define local `animationConfig`** — Should use `fadeInUp` from `lib/animations.js` instead of duplicating.

15. **Section.jsx:19** — Contains a TODO comment: `// https://www.joshuawootonn.com/vercel-tabs-component check this out`

16. **Date format inconsistency in `others.json`** — `"February 2021"` (no comma) vs all other dates like `"August, 2021"` (with comma).

17. **`app/about/page.jsx:8`** — Orphan comment `// otherData import removed - not currently used`.

18. **Genesis case study** — `GenesisContent.jsx` is dead code. Content is now inline in `page.jsx`, but the old component file still exists.

19. **`TypingAnimatedText.jsx` ignores className prop** — Component doesn't accept `className` but callers pass it (e.g. `LinkItem.jsx`). Styles silently dropped.

20. **`TypingAnimatedText.jsx:27` uses undefined Tailwind class** — `text-muted-foreground` doesn't exist in tailwind config. No styling applied.

21. **`Section.jsx:36` — `<ol>` with no `<li>` wrappers** — SectionItem rendered directly inside `<ol>` without `<li>`. Breaks semantic HTML and screen reader list interpretation.

22. **`bookmarks/page.jsx:21`** — Same `<ol>` without `<li>` issue. LinkItem not wrapped.

23. **`about/page.jsx` HoverableWord lacks keyboard support** — `onMouseEnter/Leave` handlers but no `onFocus/onBlur`. Keyboard users can't trigger hover content.

24. **Missing skip-to-content link** — `layout.jsx` has no skip navigation link for keyboard users.

25. **`HProjectCard.jsx:37-41` — Image missing `width`/`height` or `fill` prop** — Next.js Image requires explicit dimensions. Currently relying on CSS sizing only.

26. **`ProjectCard.jsx:12-16` — Same Image dimension issue** — No explicit `width`/`height` or `fill` prop.

### B. Design & UI Issues

**HIGH PRIORITY**

1. **Footer `pb-80` (320px bottom padding)** — `components/Footer.jsx:10` creates enormous empty space. Should be `pb-16` or `pb-24`.

2. **Custom cursor breaks mobile/touch** — `globals.css:51` sets `* { cursor: none !important; }` globally. No cursor visible on mobile/tablet. Should scope to pointer devices only:
   ```css
   @media (hover: hover) { * { cursor: none; } }
   ```

3. **Inconsistent container breakpoints** — Home page uses `sm:w-[1200px]`, About page uses `md:w-[1200px]`. Different breakpoints trigger the max-width.

4. **SelectedProjects inconsistent breakpoints** — First row uses `sm:flex-row` (line 14), second row uses `md:flex-row` (line 28). Cards wrap at different screen widths.

5. **Gallery not responsive** — `CaseStudyLayout.jsx:62` uses `grid-cols-2` with no mobile fallback (`grid-cols-1`). On narrow screens, gallery images are squeezed.

**MEDIUM PRIORITY**

6. **Button `h-8` (32px) too small for mobile touch targets** — Recommended 44px minimum. Consider `h-10` or `h-11`.

7. **Button component has duplicate styles** — `primary` and `primaryLong` differ only by `w-full`. Use a `fullWidth` prop instead.

8. **Hero heading hierarchy** — Two `<h1>` elements: name (`text-xl`) and tagline (`text-4xl`). Should use `<h1>` for name and `<h2>` or `<p>` for tagline.

9. **Footer hardcoded color** — `hover:text-[#017bfc]` at line 24 instead of using a design token.

10. **Page selection color** — `app/page.jsx:22` uses `selection:text-[#017BFC]` (hardcoded blue) while brand color is orange.

11. **`layout.jsx` gradient overlay** — Uses `w-screen` which can cause horizontal overflow. Should use `w-full`.

12. **`layout.jsx:31-33`** — `<Analytics />` and `<GoogleAnalytics>` are placed after `</body>` but inside `</html>`. They should be inside `<body>`.

### C. Navigation & Information Architecture

**Route Map:**
| Route | In Nav? | In Projects List? |
|-------|---------|-------------------|
| `/` | Yes (Home) | — |
| `/about` | Yes | — |
| `/works` | Yes | — |
| `/bookmarks` | Yes (hidden mobile) | — |
| `/wisecareai` | No | Yes (case study) |
| `/full-spectrum-insights` | No | Yes (case study) |
| `/jotform-integrations` | No | Yes (projects) |
| `/good-afternoon-creative` | No | Yes (projects) |
| `/commodore` | No | Yes (projects) |
| `/genesis` | No | Yes (projects) |

**Issues:**

1. **No back navigation on case studies** — Case study pages have no "Back to Works" or breadcrumb. Only the header nav pill. User must use browser back or nav.

2. **Bookmarks hidden on mobile** — `Tabs.jsx:9` hides Bookmarks tab on mobile (`hideOnMobile: true`). Mobile users cannot discover this page unless they know the URL.

3. **No sitemap.xml** — Missing `app/sitemap.js` for SEO.

4. **No robots.txt** — Missing `app/robots.js` or `public/robots.txt`.

5. **Minimal root metadata** — `layout.jsx` only has `title` and `description`. Missing: `keywords`, `authors`, `openGraph` config, `twitter` card config. (OG and Twitter images exist as static files but aren't wired up in metadata.)

6. **Case study pages have no per-page metadata** — All pages inherit generic "Ulaş Alyeşil | Product Designer". Each case study should export its own metadata.

7. **External project links open inline** — "Frey Money" and "Dezign Brief" in `projects.json` point to external URLs but `SectionItem.jsx` doesn't set `target="_blank"`. These navigate away from the portfolio.

### D. Content Quality

1. **FSI date says "June, 2025"** — This is reasonable (current: Feb 2026), but verify.

2. **`gacContent.json` has typo** — "their focused to create" should be "they focused on creating".

3. **`GenesisContent.jsx`** — Dead component with older-style content. Should be deleted since `page.jsx` has cleaner inline content.

4. **Footer inconsistency** — "reach me at" section shows only X + LinkedIn, while Contacts component on home/about shows 5 platforms.

### E. Performance Notes

1. **All pages are client components** — Every page uses `"use client"`, preventing server-rendering. Static pages like Bookmarks could be server components.

2. **Framer Motion bundle** — Every page imports framer-motion. Consider dynamic imports or lighter animation for simple fade-ins.

3. **No loading.jsx states** — No route-level loading UI during navigation.

4. **`react-aria-components` is installed but unused** — Listed in `package.json` but not imported anywhere. Dead dependency.

---

## Recommended Next Steps (Priority Order)

### Quick Wins (< 30 min each)
- [ ] Fix `projecctB` typo in Section.jsx
- [ ] Fix backtick in CaseStudyLayout.jsx
- [ ] Fix missing `/` in SelectedProjects target
- [ ] Delete dead components: LayersImage, HProjectCard, Article, GenesisContent
- [ ] Delete unused data file: layersURLs.json
- [ ] Remove `react-aria-components` from dependencies
- [ ] Fix footer bottom padding (pb-80 → pb-24)
- [ ] Scope custom cursor to pointer devices only
- [ ] Fix analytics placement in layout.jsx (move inside body)
- [ ] Use `SOCIAL_LINKS` in not-found.jsx
- [ ] Fix inconsistent X/Twitter URL
- [ ] Add `className` prop to TypingAnimatedText.jsx
- [ ] Replace `text-muted-foreground` with `text-neutral-500` in TypingAnimatedText
- [ ] Wrap SectionItem in `<li>` inside Section.jsx `<ol>`
- [ ] Wrap LinkItem in `<li>` inside bookmarks/page.jsx `<ol>`

### Medium Effort (1-2 hours each)
- [ ] Add per-page metadata to all case study pages (all 6 missing)
- [ ] Add sitemap.js and robots.js
- [ ] Standardize container breakpoints (sm vs md)
- [ ] Make gallery responsive (grid-cols-1 on mobile)
- [ ] Remove duplicate brand color definitions
- [ ] Update Tabs.jsx to modern Next.js Link API
- [ ] Add back-navigation to case study pages
- [ ] Handle external project links (open in new tab)
- [ ] Add keyboard support (onFocus/onBlur) to About page HoverableWord
- [ ] Add skip-to-content link in layout.jsx
- [ ] Fix Image components (add fill prop or explicit dimensions)

### Larger Tasks
- [ ] Convert Bookmarks page to server component
- [ ] Add loading.jsx states for route transitions
- [ ] Review and consolidate animation configs (use lib/animations everywhere)
- [ ] Evaluate framer-motion bundle impact

---

## Previous Review Notes

### Phase 1 Review (Completed)

**Changes Made:**
1. `components/TypingAnimatedText.jsx` - Fixed critical memory leak by adding `[i, text]` dependency array to useEffect
2. `app/bookmarks/page.jsx` - Fixed typo `mx-aut` → `mx-auto`
3. `components/ContactCard.jsx` - Added ARIA labels for accessibility, added `noopener` to rel attribute

**Verification:**
- ✅ Build passes
- ✅ All 16 pages generate successfully
- ✅ No ESLint errors

### Phase 2 Review (Completed)

**Changes Made:**
1. `components/ErrorBoundary.jsx` - NEW FILE: Class component with error catching and fallback UI
2. `app/error.jsx` - NEW FILE: Next.js route-level error page with reset functionality
3. `app/layout.jsx` - Wrapped children with ErrorBoundary, moved GA ID to env var, fixed typo
4. `.env.local` - NEW FILE: Contains NEXT_PUBLIC_GA_ID
5. `.env.example` - NEW FILE: Template for environment variables

**Verification:**
- ✅ Build passes
- ✅ All 16 pages generate successfully
- ✅ ErrorBoundary imported and integrated
- ✅ GA ID now uses environment variable

### Phase 3 Review (Completed)

**Changes Made:**
1. Converted 27 PNG images to WebP format
2. Resized gacWeb from 3978x7966 to 2000px width (2.3MB → 617KB)
3. Optimized picture.jpeg (1.2MB → 717KB)
4. Updated imports in 7 files to use .webp:
   - `components/SelectedProjects.jsx`
   - `app/wisecareai/page.jsx`
   - `app/good-afternoon-creative/page.jsx`
   - `app/full-spectrum-insights/page.jsx`
   - `app/commodore/page.jsx`
   - `app/jotform-integrations/page.jsx`
   - `app/genesis/page.jsx`
5. Removed 27 original PNG files

**Image Size Reduction:**
| Before | After | Reduction |
|--------|-------|-----------|
| 29MB | 10MB | 66% |

**Verification:**
- ✅ Build passes
- ✅ All 16 pages generate successfully
- ✅ All images load correctly

### Phase 5 Review (Completed)

**Changes Made:**
1. `.eslintrc.json` - Added rules: `no-unused-vars`, `no-console`, `react/self-closing-comp`, `react/jsx-curly-brace-presence`
2. `.prettierrc` - NEW FILE: Standard Prettier config
3. `package.json` - Added prettier devDependency and format scripts
4. `components/Experience.jsx` - DELETED: Unused component
5. `app/page.jsx` - Removed dead import and commented usage

**Verification:**
- ✅ Dev server running
- ✅ All routes compiling
- ✅ Dead code removed
