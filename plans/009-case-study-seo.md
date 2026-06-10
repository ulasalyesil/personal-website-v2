# Plan 009: Give every case study its own metadata, and add sitemap + robots

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat cae30f1..HEAD -- "app/(case-study)/" app/layout.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction / seo
- **Planned at**: commit `cae30f1`, 2026-06-10

## Why this matters

This is a hiring-facing design portfolio, and case studies are the pages that get shared — in applications, DMs, and social posts. Today only two routes in the whole app export metadata: the root layout (generic title/description) and the lab page. Every case study therefore shares the same `<title>` ("Ulaş Alyeşil | Product Designer"), the same description, and the same OG image. A shared link to the WiseCareAI case study previews identically to the homepage. Per-page metadata, a sitemap, and robots.txt fix discoverability and link previews at small cost. The maintainer's own `tasks/todo.md` lists this under Future Considerations.

## Current state

- Site domain: `ulasalyesil.com` — **confirmed by the maintainer on 2026-06-10**, not an assumption.
- `app/layout.tsx:6-9` — the only site-wide metadata:

```tsx
export const metadata = {
  title: "Ulaş Alyeşil | Product Designer",
  description: "Product designer focused on clear interfaces, useful tools, and creative technology.",
};
```

No `metadataBase` is set. Root-level `app/opengraph-image.png` and `app/twitter-image.png` exist and apply site-wide by Next convention.

- Metadata exemplar to imitate — `app/(main)/lab/page.tsx:3-7`:

```tsx
export const metadata = {
  title: "Lab — Ulaş Alyeşil",
  description: "Scraps, sketches, and half-finished experiments that wouldn't fit anywhere else.",
};
```

- Committed case studies (each `app/(case-study)/<slug>/page.tsx`, each a server component default-exporting a `<CaseStudyLayout>` with `title`, `date`, `company`, `role` props and rich `contentBlocks`):
  - `commodore` (content in `CommodoreContent.json`)
  - `full-spectrum-insights`
  - `genesis`
  - `good-afternoon-creative` (content in `gacContent.json`)
  - `jotform-integrations`
  - `wisecareai`
- `app/(case-study)/getirfinans-dark-mode/` also exists but is **untracked WIP — out of scope**.
- Each case-study page already imports a cover image as a static import (e.g. `app/(case-study)/wisecareai/page.tsx:2` — `import cover from "@/public/images/wisecare/cover.webp"`). Static imports expose `.src`.
- Other `(main)` pages (`/`, `/about`, `/works`, `/bookmarks`) have no per-page metadata either; about/works/bookmarks get a title here as a cheap bonus (see step 3). Note `app/(main)/page.tsx` and `app/(main)/bookmarks/page.tsx` may be client components (`"use client"`) — client components cannot export `metadata`; check the directive on line 1 of each page first and skip any client-component page (do NOT restructure pages to add metadata).
- `components/lab/data.ts` exports `LAB_ITEMS` with `slug` fields — the lab deep-link routes (`app/(main)/lab/[slug]/page.tsx`) exist and belong in the sitemap.

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Typecheck | `npx tsc --noEmit` | exit 0              |
| Build     | `npm run build`    | exit 0; route list includes `/sitemap.xml` and `/robots.txt` |
| Dev       | `npm run dev`      | serves localhost:3000 |

## Scope

**In scope**:
- `app/layout.tsx` (add `metadataBase` only)
- The six committed case-study `page.tsx` files (add `export const metadata` to each)
- `app/(main)/about/page.tsx`, `app/(main)/works/page.tsx`, `app/(main)/bookmarks/page.tsx` (add a one-line `metadata` export ONLY where the page is a server component — about/page.tsx is `"use client"`, so it will likely be skipped; that's fine, note it)
- `app/sitemap.ts` (create)
- `app/robots.ts` (create)

**Out of scope** (do NOT touch):
- `app/(case-study)/getirfinans-dark-mode/` — uncommitted WIP.
- Restructuring any client page into server+client split just to add metadata.
- JSON-LD / structured data, breadcrumbs, per-page OG image *generation* — deferred.
- `components/CaseStudyLayout.tsx` (has uncommitted local changes).

## Git workflow

- Branch: `advisor/009-case-study-seo`
- Commits: one for metadataBase + case-study metadata, one for sitemap/robots. Message style e.g. `feat(seo): per-case-study metadata`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Set `metadataBase`

In `app/layout.tsx`, change the metadata export to:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ulasalyesil.com"),
  title: "Ulaş Alyeşil | Product Designer",
  description: "Product designer focused on clear interfaces, useful tools, and creative technology.",
};
```

**Verify**: `npx tsc --noEmit` → 0; `npm run build` → 0 and the previous "metadataBase not set" build warning (if it was appearing) is gone.

### Step 2: Per-case-study metadata

In each of the six case-study `page.tsx` files, add above the default export (using `wisecareai` as the worked example):

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WiseCareAI — Ulaş Alyeşil",
  description:
    "End-to-end product design for a US health-insurance platform: design system, agent tools, and AI-augmented enrollment.",
  openGraph: {
    title: "WiseCareAI — Ulaş Alyeşil",
    description: "End-to-end product design for a US health-insurance platform.",
    images: [{ url: cover.src }],
  },
};
```

Rules:
- `title`: `"<CaseStudyLayout title prop> — Ulaş Alyeşil"` (matches the lab page's `"Lab — Ulaş Alyeşil"` pattern).
- `description`: 1–2 sentences distilled from that page's FIRST `type: "text"` content block (or from the JSON content file for commodore/good-afternoon-creative). Factual, no superlatives, ≤160 chars.
- `images`: the page's existing cover static import. If a page has no obvious cover import, use its first imported image.

**Verify**: `npx tsc --noEmit` → 0. Then `npm run dev` and `curl -s localhost:3000/wisecareai | grep -o "<title>[^<]*</title>"` → `WiseCareAI — Ulaş Alyeşil` (repeat spot-check for one more case study).

### Step 3: Main-page titles (server components only)

Check line 1 of `app/(main)/works/page.tsx`, `bookmarks/page.tsx`, `about/page.tsx`. For each WITHOUT `"use client"`, add e.g. `export const metadata = { title: "Works — Ulaş Alyeşil" };`. Skip client components and list them in your report.

**Verify**: `npx tsc --noEmit` → 0.

### Step 4: Sitemap and robots

Create `app/sitemap.ts`:

```tsx
import type { MetadataRoute } from "next";
import { LAB_ITEMS } from "@/components/lab/data";

const BASE = "https://ulasalyesil.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/works", "/bookmarks", "/lab"];
  const caseStudies = [
    "/commodore", "/full-spectrum-insights", "/genesis",
    "/good-afternoon-creative", "/jotform-integrations", "/wisecareai",
  ];
  const labItems = LAB_ITEMS.map((it) => `/lab/${it.slug}`);
  return [...staticRoutes, ...caseStudies, ...labItems].map((path) => ({
    url: `${BASE}${path}`,
  }));
}
```

Create `app/robots.ts`:

```tsx
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ulasalyesil.com/sitemap.xml",
  };
}
```

**Verify**: `npm run build` → route table includes `/sitemap.xml` and `/robots.txt`; `curl -s localhost:3000/sitemap.xml` (dev server) lists all routes above.

## Test plan

No unit-test layer applies (plan 006 covers pure logic only). Verification: the curl/grep checks in steps 2 and 4, plus the full build.

## Done criteria

- [ ] `grep -rln "export const metadata" "app/(case-study)"` → 6 files (excluding getirfinans-dark-mode)
- [ ] `app/sitemap.ts` and `app/robots.ts` exist; build emits `/sitemap.xml` and `/robots.txt`
- [ ] `metadataBase` set in `app/layout.tsx`
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all exit 0
- [ ] No files outside the in-scope list modified (`git status`) — in particular NOT `getirfinans-dark-mode/` or `CaseStudyLayout.tsx`
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- A case-study page turns out to be a client component (`"use client"`) — it can't export metadata; report which, don't restructure.
- `getirfinans-dark-mode` has been committed by the time you run — it's then in scope in spirit, but confirm with the operator before touching what was WIP.

## Maintenance notes

- New case studies must add their own `metadata` export and a sitemap entry — worth a line in CLAUDE.md or the README "adding a case study" docs when those are written.
- Reviewer should scrutinize: the descriptions (they're authored content — the maintainer may want to rewrite them) and the domain.
- Deferred: per-page generated OG images (`opengraph-image.tsx` per route), JSON-LD Person schema.
