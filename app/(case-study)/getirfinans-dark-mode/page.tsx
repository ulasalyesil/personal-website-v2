import CaseStudyLayout from "@/components/CaseStudyLayout";

// TODO: replace each placeholder with the real exported image.
// Real paths (create these files, then swap the import below):
//   import cover from "@/public/images/getirfinans-dark-mode/cover.webp";
//   import legacyVsNew from "@/public/images/getirfinans-dark-mode/legacy-vs-new.webp";
//   import tokenStructure from "@/public/images/getirfinans-dark-mode/token-structure.webp";
//   import fxChart from "@/public/images/getirfinans-dark-mode/fx-chart.webp";
//   import aiComponents from "@/public/images/getirfinans-dark-mode/ai-components.webp";
//   import docsWebsite from "@/public/images/getirfinans-dark-mode/docs-website.webp";
//   import bottomSheet from "@/public/images/getirfinans-dark-mode/bottom-sheet.webp";
import cover from "@/public/images/wisecare/cover.webp"; // PLACEHOLDER
import legacyVsNew from "@/public/images/wisecare/form.webp"; // PLACEHOLDER
import tokenStructure from "@/public/images/wisecare/init.webp"; // PLACEHOLDER
import fxChart from "@/public/images/wisecare/plan_selection.webp"; // PLACEHOLDER
import aiComponents from "@/public/images/wisecare/ai_found.webp"; // PLACEHOLDER
import docsWebsite from "@/public/images/wisecare/marketing.webp"; // PLACEHOLDER
import bottomSheet from "@/public/images/wisecare/wizard.webp"; // PLACEHOLDER

export default function GetirFinansDarkModeCase() {
  return (
    <CaseStudyLayout
      slug="getirfinans-dark-mode"
      title="GetirFinans Dark Mode"
      date="2025 — 2026"
      company="GetirFinans"
      role="Product Designer"
      contentBlocks={[
        // ── Context ──────────────────────────────────────────────
        {
          type: "text",
          text: "GetirFinans started as a product inside the Getir super-app — light mode only, built on a flat set of named color variables with no semantic layer. When we built the standalone app, we needed dark mode. But to do dark mode properly, we needed a system first.",
        },
        // Image: light/dark side-by-side of a key screen, or the new bottom sheet.
        { type: "image", src: cover, alt: "GetirFinans key screen in light and dark mode" },

        // ── The Legacy System ────────────────────────────────────
        { type: "heading", text: "The Legacy System" },
        {
          type: "text",
          text: "The starting color system was a flat list: Getir-Primary, GraySecondary, PalePurple, FintechGreen. Names described visual properties, not intent. No primitive/semantic separation. No mode awareness. It worked well enough for a single-mode app living inside a larger shell.",
        },
        // Image: before/after — flat legacy color variables vs. new semantic naming.
        { type: "image", src: legacyVsNew, alt: "Flat legacy color variables versus new semantic naming" },

        // ── The Brief Was the Wrong Model ────────────────────────
        { type: "heading", text: "The Brief Was the Wrong Model" },
        {
          type: "text",
          text: 'The brief from product and engineering was direct: "give us dark mode equivalents of our colors." That\'s the wrong model.',
        },
        {
          type: "text",
          text: 'Dark mode is not an inversion of light mode. A 1:1 mapping breaks status colors, destroys elevation hierarchy, and creates surfaces that feel visually wrong even when they\'re technically "darkened." Resolving that framing — before designing anything — was the first real design decision on this project.',
        },

        // ── A Two-Tier Token System ──────────────────────────────
        { type: "heading", text: "A Two-Tier Token System" },
        {
          type: "text",
          text: "The solution was a two-tier token system: primitives and semantics.",
        },
        {
          type: "text",
          text: "Primitives are raw palette scales — purple-light.50, neutral.900, cool-gray.500. They don't carry meaning, just values.",
        },
        {
          type: "text",
          text: "Semantics are intent-based — bg/surface/default, text/content/primary, border/input/default. They describe what a color does, not what it looks like. A single semantic token maps to different primitive values per mode.",
        },
        {
          type: "text",
          text: "One exception: bg/ai/* — an isolated namespace for AI components. The existing semantic tokens conflated AI surfaces with error/success states, which broke visually in dark mode. Isolation was the cleaner fix than trying to redefine shared tokens.",
        },
        // Image: two-tier token diagram — primitive → semantic.
        { type: "image", src: tokenStructure, alt: "Two-tier token diagram: primitive to semantic" },

        // ── What Dark Mode Actually Required ──────────────────────
        { type: "heading", text: "What Dark Mode Actually Required" },
        {
          type: "text",
          text: "Three categories of colors needed non-obvious decisions:",
        },
        {
          type: "text",
          text: "Status colors — not inversion, range-switching. bg/status/success in light mode maps to green.50 (pale green background). In dark mode, green.50 disappears on a dark canvas. The fix: map to green.900 — same semantic meaning, different scale position.",
        },
        {
          type: "text",
          text: "Transparent overlays — alpha-based surfaces (nav backgrounds, modals) behave differently when stacked on dark. Required separate alpha values per mode, not just color swaps.",
        },
        {
          type: "text",
          text: "Brand color — kept identical across modes. bg/action/primary maps to purple-dark.700 (#5D3EBC) in both light and dark. Brand is a mode-independent anchor. Most fintech dark modes oversaturate brand color on dark surfaces — the decision here was restraint.",
        },

        // ── Beyond the Token System ──────────────────────────────
        { type: "heading", text: "Beyond the Token System" },
        {
          type: "text",
          text: "Some parts of the product fell outside the token system entirely.",
        },
        {
          type: "text",
          text: "FX line chart — the SVG stroke was hardcoded in markup with a Display P3 fallback. The fill gradient (light: #F3F0FE → white) required a conditional SwiftUI render path — isDark environment check, separate gradient values. Not a token swap.",
        },
        {
          type: "text",
          text: "Google Maps — runs on a separate JSON style file. Token system doesn't apply. Required a full parallel dark style definition.",
        },
        {
          type: "text",
          text: "Lottie animations — dark mode color management is outside the token system. Required separate animation files or layer-level overrides. Android constraint: layers nested inside precomps don't support runtime color override.",
        },
        // Image: FX line chart in light vs dark (conditional render case).
        { type: "image", src: fxChart, alt: "FX line chart in light versus dark mode" },

        // ── The Real Structural Problem ──────────────────────────
        { type: "heading", text: "The Real Structural Problem" },
        {
          type: "text",
          text: "The largest single challenge wasn't color decisions — it was icon delivery.",
        },
        {
          type: "text",
          text: "Core UI icons were exported as PNGs per domain and uploaded to separate Directus CDN buckets. No versioning, no registry, no token injection possible at runtime. Dark mode required a full parallel set of PNGs — same icon existed across 6+ CDN locations, each needing a manual re-export.",
        },
        {
          type: "text",
          text: "This wasn't a dark mode problem. It was a governance failure dark mode made impossible to ignore. Every theming decision going forward carries that tax until icons are migrated to SVG.",
        },

        // ── AI Components ────────────────────────────────────────
        { type: "heading", text: "AI Components" },
        {
          type: "text",
          text: "AI components — podcast cards and AI assistant surfaces — needed their own token namespace (bg/ai/*, text/ai/*, icon/ai/*) because the existing semantic tokens conflated AI backgrounds with error states. In dark mode, that confusion became visible.",
        },
        {
          type: "text",
          text: "bg/ai/primary in dark mode is #2B2438 — a desaturated dark purple. Not an inversion of the light value. Dark AI surfaces needed to feel contained and premium, not just dark.",
        },
        // Image: AI components (podcast cards) in dark mode.
        { type: "image", src: aiComponents, alt: "AI podcast cards in dark mode" },

        // ── How It Shipped ───────────────────────────────────────
        { type: "heading", text: "How It Shipped" },
        {
          type: "text",
          text: "This was a solo project end-to-end.",
        },
        {
          type: "text",
          text: 'The dev team\'s initial position was reasonable: refactoring files at scale is expensive, and the brief said "dark mode equivalents," not "new token system." Changing that required showing them what the token system would actually look like for them — fewer conditionals, one source of truth per semantic role, cleaner handoff. Once the system was visible, they became advocates.',
        },
        {
          type: "text",
          text: "Beyond the token system itself: facilitated sessions on token usage across the team, wrote implementation guidelines, educated other designers on the two-tier model, and built a documentation and education website at gf-design-system.vercel.app so the system had a living reference anyone could open.",
        },
        // Image: screenshot of gf-design-system.vercel.app.
        { type: "image", src: docsWebsite, alt: "GetirFinans design system documentation website" },

        // ── The Standout Screen ──────────────────────────────────
        { type: "heading", text: "The Standout Screen" },
        {
          type: "text",
          text: "The new bottom sheet, designed after the token system shipped, is the clearest example of what the system enables. Every color decision is a semantic token reference — no hardcoded values, no one-off overrides. Light and dark modes are a single design file with a mode toggle. That's the difference between adapting a product to dark mode and building a product that understands it.",
        },
        // Image: the new bottom sheet — standout screen.
        { type: "image", src: bottomSheet, alt: "The new bottom sheet in light and dark mode" },

        // ── Outcome ──────────────────────────────────────────────
        { type: "heading", text: "Outcome" },
        {
          type: "text",
          text: "Users responded well. Internal reception was strong — the design team, engineering, and leadership all use the app. The system is in active production. The documentation site is a living reference the team actually uses.",
        },
        {
          type: "text",
          text: "What dark mode forced: a formal token governance process, a clearer case for SVG icon migration, and a design system that was documented well enough for the full team to understand and apply.",
        },
        {
          type: "text",
          text: "I rebuilt the color foundation of a live fintech product, solo, while convincing the team that the problem was never dark mode — it was the system underneath.",
        },
      ]}
    />
  );
}
