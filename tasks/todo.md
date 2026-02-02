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

## Phase 4: Code Quality (Next)

- [ ] Centralize brand colors in `tailwind.config.js`
- [ ] Create `lib/constants.js` for social links
- [ ] Create `lib/animations.js` for shared animation config
- [ ] Add ARIA attributes to Tabs component

## Phase 5: Tooling ✅ COMPLETE

- [x] Strengthen ESLint config
- [x] Add Prettier config
- [x] Clean dead code (Experience.jsx)


## Phase 6: Dependencies

- [ ] Update safe dependencies (framer-motion, luxon, etc.)
- [ ] Plan Next.js 16 migration

---

## Review Notes

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
