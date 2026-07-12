import CaseStudyLayout from "@/components/CaseStudyLayout";
import {
  TokenExplorer,
  ComponentSandbox,
  ColorGrid,
  CodeSwitcher,
  FxChartSimulator,
  BottomSheetSimulator,
  AiComponentPreview,
} from "./components";

// For static assets that are still screenshots
import docsWebsite from "@/public/images/getirfinans-design-system/docs-website.webp";

export default function GetirFinansDesignSystemCase() {
  const customComponents = {
    "palette-grid": <ColorGrid />,
    "token-explorer": <TokenExplorer />,
    "code-switcher": <CodeSwitcher />,
    "fx-chart": <FxChartSimulator />,
    "ai-components": <AiComponentPreview />,
    "bottom-sheet": <BottomSheetSimulator />,
    "component-sandbox": <ComponentSandbox />,
  };

  return (
    <CaseStudyLayout
      slug="getirfinans-design-system"
      title="GetirFinans Design System"
      date="2025 — Present"
      company="GetirFinans"
      role="Design System Lead"
      customComponents={customComponents}
      contentBlocks={[
        // ── Opening ──────────────────────────────────────────────
        {
          type: "text",
          text: "GetirFinans started as a product inside the Getir super-app: light mode only, inheriting the parent shell's conventions. The color foundation was a flat variable list named by appearance (GrayPrimary, OffWhite, DarkPurple, PalePurple, FintechGreen). No primitives, no semantics, no mode awareness. Design lived across 20 independent domain Figma files with no component sync protocol. Then leadership asked for dark mode.",
        },
        {
          type: "text",
          text: "Most design system case studies show a system that was never load-bearing. This one was rebuilt underneath a running product, and the constraint that forced it is the same constraint that proved it worked.",
        },
        { type: "custom", id: "palette-grid" },

        // ── The Legacy System ────────────────────────────────────
        { type: "heading", text: "The Legacy System" },
        {
          type: "text",
          text: "The starting color system was a flat list: Getir-Primary, GraySecondary, PalePurple, FintechGreen. Names described visual properties, not intent. No primitive/semantic separation. No mode awareness. It worked well enough for a single-mode app living inside a larger shell.",
        },
        { type: "custom", id: "code-switcher" },

        // ── System Architecture ──────────────────────────────────
        { type: "heading", text: "System Architecture" },
        {
          type: "text",
          text: "The foundation is a two-tier token system: primitives carry values, semantics carry intent.",
        },
        {
          type: "text",
          text: "Primitives are raw palette scales: purple-light.50, neutral.900, cool-gray.500. They don't carry meaning, just values.",
        },
        {
          type: "text",
          text: "Semantics follow a {property}/{context}/{variant} pattern: bg/surface/default, text/content/primary, border/input/default. They describe what a color does, not what it looks like.",
        },
        {
          type: "text",
          text: "The token collections are primitives, semantics, and [legacy]. The legacy collection is kept deliberately during migration: it lets 20 domains migrate incrementally instead of in one synchronized big-bang refactor.",
        },
        {
          type: "text",
          text: "Modes (light and dark) are resolved at the semantic layer. A semantic token's identity is stable; only its primitive binding changes per mode. The system spans three platforms: web, iOS, and Android.",
        },
        { type: "custom", id: "token-explorer" },
        {
          type: "text",
          text: "Namespace isolation: bg/ai/*, text/ai/*, and icon/ai/* form an isolated namespace for AI surfaces. The rationale is architectural, not aesthetic. AI surfaces were sharing semantic tokens with error and success states. In light mode the collision was invisible. In dark mode it broke. The principle: when two things share a token by coincidence rather than by intent, they will diverge eventually. Isolate early.",
        },
        {
          type: "text",
          text: "The dimensional layer, honestly stated: spacing (9 steps: 0/4/8/12/16/24/32/48/64), size (10 steps, including a 2-step touch target scale), radius (8 steps), and breakpoint (3 steps) primitives are built. Semantics exist for color only; the dimensional primitives haven't been promoted into the semantic collection yet. This is a deliberate sequencing decision: color was the layer under production pressure and the layer where a mistake is visible to every user. Ship the semantic layer where it's load-bearing, build primitives beneath the rest, and promote them once the naming has been proven by the color layer. The color system is the template: same two-tier shape, same slash-delimited naming.",
        },
        {
          type: "text",
          text: "Three design decisions define this architecture.",
        },
        {
          type: "text",
          text: "Brand invariance: bg/action/primary resolves to #5D3EBC in both modes. Brand is a mode-independent anchor. Most fintech dark modes oversaturate the brand color into large fills; here purple lives at the stroke, accent, and border layer.",
        },
        {
          type: "text",
          text: "Status colors range-switch, they do not invert. green.50 in light mode becomes green.900 in dark mode: same semantic role, different scale position. Semantic equivalence across modes is not positional equivalence in a scale. This is the intellectual center of the case study, and the precise reason the original brief was wrong.",
        },
        {
          type: "text",
          text: "Keeping the legacy collection alive: deleting it would have forced a synchronized migration across 20 domains. Keeping it made migration incremental and reversible.",
        },
        { type: "custom", id: "component-sandbox" },

        // ── Chapter One: Dark Mode as the Forcing Function ───────
        { type: "heading", text: "Chapter One: Dark Mode as the Forcing Function" },
        {
          type: "text",
          text: 'The brief from product and engineering was direct: "give us dark mode equivalents of our colors." That framing is wrong. Dark mode is not an inversion of light mode. A 1:1 hex mapping breaks status colors, collapses elevation hierarchy, and produces surfaces that are technically darker and perceptually wrong. Resolving the framing before designing anything was the first real design decision.',
        },
        {
          type: "text",
          text: "The dark palette: canvas #0E0E0E, near-black with no blue bias and not pure black. Surfaces at #1A1A1A and #262626 in tight steps: flat and dense rather than heavily elevated. Status colors sit in the 900 range, muted, with no neon-on-black. Reference points: Apple HIG as primary, Revolut and iOS system apps for comparison.",
        },
        {
          type: "text",
          text: "Engineering's initial resistance was correct on its own terms. Refactoring 20 domains is expensive and the brief asked for hex values. What changed it was showing them the token system from their side: fewer conditionals, one source of truth per semantic role, cleaner handoff. They became advocates.",
        },

        // ── Where the Token System Ran Out ────────────────────────
        { type: "heading", text: "Where the Token System Ran Out" },
        {
          type: "text",
          text: "These are boundary conditions of a token architecture, not failures.",
        },
        {
          type: "text",
          text: "FX line chart: the SVG stroke was hardcoded in markup with a Display P3 fallback. The fill gradient required a conditional SwiftUI render path (an isDark environment check, separate gradient values per mode), not a token swap. The root cause: the token system is single-value. Data visualization needs ordered palettes, contrast guarantees, and multi-series logic. Colors designed for UI surfaces were reused for data. Charts were never modeled as a semantic domain.",
        },
        {
          type: "text",
          text: "Google Maps runs on a separate JSON style file the token system doesn't reach. Purple was tried on base tile geometry and explicitly removed; the final version is neutral geometry with purple reserved for overlays and markers.",
        },
        {
          type: "text",
          text: "Lottie color management sits outside the token system entirely: parallel animation files or layer-level overrides. Android constraint: layers nested inside precomps don't support runtime color override.",
        },
        {
          type: "text",
          text: "Liquid glass on the home action grid was evaluated and rejected: contrast failure in dark mode, and it doesn't satisfy HIG intent for static containers.",
        },
        { type: "custom", id: "fx-chart" },
        {
          type: "text",
          text: "bg/ai/primary in dark mode is #2B2438, a desaturated dark purple, not an inversion of the light value. Dark AI surfaces needed to feel contained and premium, not just dark.",
        },
        { type: "custom", id: "ai-components" },

        // ── The Governance Failure Dark Mode Exposed ──────────────
        { type: "heading", text: "The Governance Failure Dark Mode Exposed" },
        {
          type: "text",
          text: "Core UI icons were exported as PNGs per domain and uploaded to separate Directus CDN buckets. No versioning, no registry, no token injection possible at runtime. Dark mode required a full parallel set of PNGs: the same icon existed across 6+ CDN locations, each needing a manual re-export.",
        },
        {
          type: "text",
          text: "This was never a dark mode problem. It was a governance problem that dark mode made impossible to ignore. Every theming decision carries that tax until icons migrate to SVG.",
        },
        {
          type: "text",
          text: "A Slack tracking list (name, domain, CDN link, type, request owner, status) was the operational workaround. It documented the absence of a system, and that documentation became the business case for building one.",
        },

        // ── Documentation as an Artifact of the System ────────────
        { type: "heading", text: "Documentation as an Artifact of the System" },
        {
          type: "text",
          text: "gf-design-system.vercel.app is a Next.js documentation and education site, live and in active use by the team. The color section alone is 7 pages: introduction, primitives, semantics, reality, dark mode, overlay, and gradients.",
        },
        {
          type: "text",
          text: 'The "reality" page documents the gap between the system as designed and the system as implemented in production right now. Most design systems hide this. Publishing it is what made the migration tractable.',
        },
        {
          type: "text",
          text: "The repo split (design system source and documentation, previously one monorepo) was a governance decision, not a technical one. The reason is the argument: if documentation can drift from source, the documentation is a claim rather than evidence. The docs site consumes published token packages, so it cannot describe a token that doesn't ship.",
        },
        {
          type: "text",
          text: "Beyond the site: facilitated token usage sessions across the design team, wrote implementation guidelines, and educated designers on the two-tier model.",
        },
        {
          type: "image",
          src: docsWebsite,
          alt: "GetirFinans design system documentation site",
        },

        // ── Proof ──────────────────────────────────────────────
        { type: "heading", text: "Proof" },
        {
          type: "text",
          text: "The new bottom sheet, designed after the token system shipped, is the clearest proof of what the system enables. Every color decision is a semantic token reference: no hardcoded values, no one-off overrides. Light and dark are one design file with a mode toggle. That is the difference between adapting a product to dark mode and building a product that understands it.",
        },
        { type: "custom", id: "bottom-sheet" },

        // ── Results ────────────────────────────────────────────
        // RESULTS SECTION: not written yet, pending real numbers. Needed before
        // this section can ship:
        // - exact color primitive count
        // - exact semantic token count
        // - docs site total page count
        // - how many of the 20 domains completed migration
        // - whether WCAG contrast was verified systematically or ad hoc
        // - publicly stateable user number

        // ── What's Next ────────────────────────────────────────
        { type: "heading", text: "What's Next" },
        {
          type: "text",
          text: "Semantic dimensional layer: promote spacing, radius, and size primitives into semantics using the existing names. Don't redesign the ramp. Publish.",
        },
        {
          type: "text",
          text: "Component tokens: no component tier exists today. It's the layer above semantics and it isn't built yet.",
        },
        {
          type: "text",
          text: "Icon migration: PNG to SVG, killing CDN bucket sprawl and unlocking runtime theming.",
        },
        {
          type: "text",
          text: "Data visualization tokens: charts need a modeled semantic domain (ordered palettes, contrast guarantees, multi-series logic). The FX chart is the open ticket.",
        },
        {
          type: "text",
          text: "Component library: downstream of all of the above. It doesn't start before the foundation carries weight.",
        },

        // ── Reflection ─────────────────────────────────────────
        { type: "heading", text: "Reflection" },
        {
          type: "text",
          text: "What worked: sequencing color first (the layer under production pressure, the layer where errors are visible to every user, and the naming template for everything after it). Publishing the gap: the reality page and the Slack tracking list both documented the distance between design and implementation, and making the debt visible got it funded. Isolating the AI namespace early rather than redefining shared tokens under pressure. Bringing engineering in by showing them the system from their side: the token system's best argument had nothing to do with color.",
        },
        {
          type: "text",
          text: "What I'd do differently: audit color usage in context before designing anything. Elevation problems surfaced during implementation instead of before it; a screen-by-screen audit of how colors were actually used, not how they were named, would have caught them. Model charts as a semantic domain from the start rather than reusing surface colors for data. Finish the dimensional semantic layer alongside color rather than leaving primitives promoted but unmapped. The gap is defensible. It was still avoidable.",
        },

        // ── Closing ────────────────────────────────────────────
        {
          type: "text",
          text: "I rebuilt the color foundation of a live fintech product, solo, while convincing the team that the problem was never dark mode. It was the system underneath.",
        },
      ]}
    />
  );
}
