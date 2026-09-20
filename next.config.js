/** @type {import('next').NextConfig} */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

/**
 * The HUD chrome reports the system, so every readout it prints has to be
 * measured rather than written. These are the build-time half: the ref comes
 * from git, the counts from parsing the token layer itself. A value that
 * cannot be measured is omitted, never faked — a decorative readout would
 * defeat the only reason the chrome is there.
 */
function systemFacts() {
  const facts = {};
  const git = (args) =>
    execSync(`git ${args}`, { cwd: __dirname, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

  try {
    facts.NEXT_PUBLIC_BUILD_REF = git("rev-parse --short HEAD");
    facts.NEXT_PUBLIC_BUILD_BRANCH = git("rev-parse --abbrev-ref HEAD");
  } catch {
    // Not a checkout (CI tarball, container). The UI falls back to "local".
  }

  try {
    const css = fs.readFileSync(path.join(__dirname, "styles/globals.css"), "utf8");
    const declarations = (block) => (block.match(/^\s*--[\w-]+:/gm) || []).length;
    const darkAt = css.indexOf("@media (prefers-color-scheme: dark)");
    facts.NEXT_PUBLIC_TOKEN_COUNT = String(declarations(css.slice(css.indexOf("@theme"), darkAt)));
    facts.NEXT_PUBLIC_TOKEN_OVERRIDES = String(declarations(css.slice(darkAt, css.indexOf("\n}", darkAt))));
  } catch {
    // Same rule: leave it unset rather than print a number nothing produced.
  }

  return facts;
}

// `experimental.viewTransition` used to be set here. It only exposes React's
// `unstable_ViewTransition`, which stable React 19.2 does not export
// (`'unstable_ViewTransition' in require('react')` is false), so it was inert:
// the route morph is driven by `document.startViewTransition` in
// `lib/useRouteTransition.ts`. Removed 2026-08-25 so the config stops implying
// a mechanism the app does not use.

module.exports = {
  env: systemFacts(),
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
