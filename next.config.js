/** @type {import('next').NextConfig} */

// `experimental.viewTransition` used to be set here. It only exposes React's
// `unstable_ViewTransition`, which stable React 19.2 does not export
// (`'unstable_ViewTransition' in require('react')` is false), so it was inert:
// the route morph is driven by `document.startViewTransition` in
// `lib/useRouteTransition.ts`. Removed 2026-08-25 so the config stops implying
// a mechanism the app does not use.

module.exports = {
  images: {
    // Default is WebP only. AVIF first is the one change in the 013 round that
    // reduces the bytes a visitor actually downloads for an image; Next falls
    // back to WebP on browsers that do not accept AVIF.
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      // The Common Ground prototype is a static export living in
      // public/common-ground. Next serves public/ files by exact path, so the
      // clean URL needs pointing at the export's entry document.
      { source: "/common-ground", destination: "/common-ground/index.html" },
      { source: "/common-ground/", destination: "/common-ground/index.html" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/getirfinans-dark-mode",
        destination: "/getirfinans-design-system",
        permanent: true,
      },
    ];
  },
};
