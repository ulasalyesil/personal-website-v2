import type { ContentBlock } from "@/types";

export const meta = {
  slug: "getirfinans-design-system",
  title: "GetirFinans Design System",
  date: "2025 — Present",
  company: "GetirFinans",
  role: "Design System Lead",
  team: "Solo owner, with iOS/Android engineering and 20 domain designers",
  platforms: "Web, iOS, Android",
  websiteUrl: "https://gf-design-system.vercel.app",
  status: "Live · in active development",
} as const;

export const contentBlocks: ContentBlock[] = [
  // ── Opening ────────────────────────────────────────────────────────────────
  {
    type: "lead",
    text: "GetirFinans started as a product inside the Getir super-app: light mode only, inheriting the parent shell's conventions. The color foundation was a flat variable list named by appearance (GrayPrimary, OffWhite, DarkPurple, PalePurple, FintechGreen). No primitives, no semantics, no mode awareness. Design lived across 20 independent domain Figma files with no component sync protocol. Then leadership asked for dark mode.",
  },
  {
    type: "quote",
    text: "Most design system case studies show a system that was never load-bearing. This one was rebuilt underneath a running product, and the constraint that forced it is the same constraint that proved it worked.",
  },
  {
    type: "list",
    ordered: true,
    lead: "What this case study covers, in four deliverables:",
    items: [
      "A two-tier token architecture replacing the legacy color file",
      "Dual-mode support across web, iOS, and Android",
      "A documentation site the team actually uses",
      "A governance model and roadmap the org adopted",
    ],
  },
  { type: "custom", id: "palette-grid" },

  // ── The Legacy System ──────────────────────────────────────────────────────
  {
    type: "section",
    id: "legacy-system",
    kicker: "Where it started",
    title: "The Legacy System",
    blocks: [
      {
        type: "text",
        text: "The starting color system was a flat list: Getir-Primary, GraySecondary, PalePurple, FintechGreen. Names described visual properties, not intent. No primitive/semantic separation. No mode awareness. It worked well enough for a single-mode app living inside a larger shell.",
      },
      { type: "custom", id: "code-switcher" },
    ],
  },

  // ── System Architecture ────────────────────────────────────────────────────
  {
    type: "section",
    id: "system-architecture",
    kicker: "The foundation",
    title: "System Architecture",
    blocks: [
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
        type: "heading",
        text: "Namespace isolation",
      },
      {
        type: "text",
        text: "bg/ai/*, text/ai/*, and icon/ai/* form an isolated namespace for AI surfaces. The rationale is architectural, not aesthetic. AI surfaces were sharing semantic tokens with error and success states. In light mode the collision was invisible. In dark mode it broke.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Principle",
        text: "When two things share a token by coincidence rather than by intent, they will diverge eventually. Isolate early.",
      },
      {
        type: "heading",
        text: "The dimensional layer, honestly stated",
      },
      {
        type: "text",
        text: "Spacing (9 steps: 0/4/8/12/16/24/32/48/64), size (10 steps, including a 2-step touch target scale), radius (8 steps), and breakpoint (3 steps) primitives are built. Semantics exist for color only; the dimensional primitives haven't been promoted into the semantic collection yet.",
      },
      {
        type: "text",
        text: "This is a deliberate sequencing decision: color was the layer under production pressure and the layer where a mistake is visible to every user. Ship the semantic layer where it's load-bearing, build primitives beneath the rest, and promote them once the naming has been proven by the color layer. The color system is the template: same two-tier shape, same slash-delimited naming.",
      },
      {
        type: "heading",
        text: "Three decisions define this architecture",
      },
      {
        type: "text",
        text: "Brand invariance: bg/action/primary resolves to #5D3EBC in both modes. Brand is a mode-independent anchor. Most fintech dark modes oversaturate the brand color into large fills; here purple lives at the stroke, accent, and border layer.",
      },
      {
        type: "compare",
        panes: [
          {
            label: "Brand as surface",
            tone: "rejected",
            id: "brand-flooded",
            caption: "The same token used as a large fill. Legible, and it makes every screen a brand screen.",
          },
          {
            label: "Brand as anchor",
            tone: "shipped",
            id: "brand-anchored",
            caption: "Neutral surface, purple reserved for the action and the border it owns.",
          },
        ],
        verdict:
          "Same token, same hex, both modes. The decision was never which purple, it was how much surface purple is allowed to own. Restraint here is what keeps the accent legible when it matters.",
      },
      {
        type: "text",
        text: "Status colors range-switch, they do not invert. green.50 in light mode becomes green.900 in dark mode: same semantic role, different scale position.",
      },
      {
        type: "compare",
        panes: [
          {
            label: "Positional equivalence",
            tone: "rejected",
            id: "status-positional",
            caption: "What \u201cgive us dark mode equivalents\u201d produces: the light scale positions, unchanged, on the dark canvas.",
          },
          {
            label: "Range switch",
            tone: "shipped",
            id: "status-range",
            caption: "Same semantic roles, resolved into the 900s. Contained instead of glowing.",
          },
        ],
        verdict:
          "Both panes are the same three semantic tokens. Only the primitive they bind to changed. The left one is what a 1:1 mapping gives you, and it is why the brief had to be argued with before anything could be designed.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "The center of the argument",
        text: "Semantic equivalence across modes is not positional equivalence in a scale. This is the precise reason the original brief was wrong.",
      },
      {
        type: "text",
        text: "Keeping the legacy collection alive: deleting it would have forced a synchronized migration across 20 domains. Keeping it made migration incremental and reversible.",
      },
      { type: "custom", id: "component-sandbox" },
    ],
  },

  // ── Chapter One: Dark Mode ─────────────────────────────────────────────────
  {
    type: "section",
    id: "dark-mode",
    kicker: "Chapter one",
    title: "Dark Mode as the Forcing Function",
    blocks: [
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
      {
        type: "callout",
        variant: "principle",
        label: "Principle",
        text: "The token system's best argument had nothing to do with color. It was the one that showed engineering the system from their side.",
      },
    ],
  },

  // ── Where the Token System Ran Out ─────────────────────────────────────────
  {
    type: "section",
    id: "token-limits",
    kicker: "Boundary conditions",
    title: "Where the Token System Ran Out",
    blocks: [
      {
        type: "text",
        text: "These are boundary conditions of a token architecture, not failures.",
      },
      {
        type: "text",
        text: "FX line chart: the SVG stroke was hardcoded in markup with a Display P3 fallback. The fill gradient required a conditional SwiftUI render path (an isDark environment check, separate gradient values per mode), not a token swap. The root cause: the token system is single-value. Data visualization needs ordered palettes, contrast guarantees, and multi-series logic. Colors designed for UI surfaces were reused for data. Charts were never modeled as a semantic domain.",
      },
      {
        type: "list",
        lead: "Three more edges, each outside what tokens can reach:",
        items: [
          "Google Maps runs on a separate JSON style file the token system doesn't reach. Purple was tried on base tile geometry and explicitly removed; the final version is neutral geometry with purple reserved for overlays and markers.",
          "Lottie color management sits outside the token system entirely: parallel animation files or layer-level overrides. Android constraint: layers nested inside precomps don't support runtime color override.",
          "Liquid glass on the home action grid was evaluated and rejected: contrast failure in dark mode, and it doesn't satisfy HIG intent for static containers.",
        ],
      },
      { type: "custom", id: "fx-chart" },
      {
        type: "text",
        text: "bg/ai/primary in dark mode is #2B2438, a desaturated dark purple, not an inversion of the light value. Dark AI surfaces needed to feel contained and premium, not just dark.",
      },
      { type: "custom", id: "ai-components" },
    ],
  },

  // ── Governance ─────────────────────────────────────────────────────────────
  {
    type: "section",
    id: "governance",
    kicker: "What it exposed",
    title: "The Governance Failure Dark Mode Exposed",
    blocks: [
      {
        type: "text",
        text: "Core UI icons were exported as PNGs per domain and uploaded to separate Directus CDN buckets. No versioning, no registry, no token injection possible at runtime. Dark mode required a full parallel set of PNGs: the same icon existed across 6+ CDN locations, each needing a manual re-export.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Principle",
        text: "This was never a dark mode problem. It was a governance problem that dark mode made impossible to ignore. Every theming decision carries that tax until icons migrate to SVG.",
      },
      {
        type: "text",
        text: "A Slack tracking list (name, domain, CDN link, type, request owner, status) was the operational workaround. It documented the absence of a system, and that documentation became the business case for building one.",
      },
    ],
  },

  // ── Documentation ──────────────────────────────────────────────────────────
  {
    type: "section",
    id: "documentation",
    kicker: "Evidence, not claims",
    title: "Documentation as an Artifact of the System",
    blocks: [
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
        text: "The repo split (design system source and documentation, previously one monorepo) was a governance decision, not a technical one. The docs site consumes published token packages, so it cannot describe a token that doesn't ship.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Principle",
        text: "If documentation can drift from source, the documentation is a claim rather than evidence.",
      },
      {
        type: "text",
        text: "Beyond the site: facilitated token usage sessions across the design team, wrote implementation guidelines, and educated designers on the two-tier model.",
      },
      { type: "custom", id: "docs-site" },
    ],
  },

  // ── Proof ──────────────────────────────────────────────────────────────────
  {
    type: "section",
    id: "proof",
    kicker: "Built on the system",
    title: "Proof",
    blocks: [
      {
        type: "text",
        text: "The new bottom sheet, designed after the token system shipped, is the clearest proof of what the system enables. Every color decision is a semantic token reference: no hardcoded values, no one-off overrides. Light and dark are one design file with a mode toggle. That is the difference between adapting a product to dark mode and building a product that understands it.",
      },
      { type: "custom", id: "bottom-sheet" },
    ],
  },

  // ── Results ────────────────────────────────────────────────────────────────
  {
    type: "section",
    id: "results",
    kicker: "Counted",
    title: "Results",
    blocks: [
      {
        type: "text",
        text: "The foundation was replaced underneath a running product without a freeze, a big-bang refactor, or a rollback.",
      },
      {
        type: "metrics",
        items: [
          {
            value: "2 months",
            label: "Full migration",
            note: "Every sub-product, with the core dev team, ahead of the standalone app release",
          },
          {
            value: "20",
            label: "Domains migrated",
            note: "All of them, not a partial rollout",
          },
          { value: "3", label: "Platforms", note: "Web, iOS, Android" },
          { value: "2", label: "Modes", note: "Resolved at the semantic layer" },
          { value: "3", label: "Token collections", note: "Primitives, semantics, legacy" },
          {
            value: "30",
            label: "Dimensional primitives",
            note: "9 spacing, 10 size, 8 radius, 3 breakpoint",
          },
        ],
      },
      { type: "heading", text: "Shipped" },
      {
        type: "list",
        items: [
          "The token system is live in production across the getirfinans app, on all three platforms.",
          "The legacy color file is fully replaced. Accounts, loans, FX and cards all resolve through the semantic layer.",
          "The migration landed ahead of the standalone app release, which was the deadline that mattered.",
          "gf-design-system.vercel.app is live and in active use by design and engineering.",
        ],
      },
      { type: "heading", text: "Adoption" },
      {
        type: "list",
        items: [
          "Every sub-product is on the semantic layer. There is no domain still reading raw hex.",
          "The design team was trained on the two-tier model through facilitated token sessions.",
          "Engineering went from resisting the refactor to advocating for it, and now files token requests rather than hardcoding around them.",
        ],
      },
      { type: "heading", text: "What it changed beyond the system" },
      {
        type: "list",
        items: [
          "getirfinans.com was redesigned end to end on the new visual language.",
          "A formal token governance process exists where there was none.",
          "The SVG icon migration was approved and prioritized, which is the fix for the CDN sprawl dark mode exposed.",
          "The monorepo split into a source repo and a documentation repo, so the docs cannot describe a token that does not ship.",
          "Design system deep dives now run after each sprint.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        label: "Still being confirmed",
        text: "Exact primitive and semantic token counts, and whether contrast was verified systematically rather than per screen. Both are being checked against production before they go here, on the same standard the reality page holds itself to.",
      },
    ],
  },

  // ── What's Next ────────────────────────────────────────────────────────────
  {
    type: "section",
    id: "whats-next",
    kicker: "Roadmap",
    title: "What's Next",
    blocks: [
      {
        type: "list",
        ordered: true,
        items: [
          "Semantic dimensional layer: promote spacing, radius, and size primitives into semantics using the existing names. Don't redesign the ramp. Publish.",
          "Component tokens: no component tier exists today. It's the layer above semantics and it isn't built yet.",
          "Icon migration: PNG to SVG, killing CDN bucket sprawl and unlocking runtime theming.",
          "Data visualization tokens: charts need a modeled semantic domain (ordered palettes, contrast guarantees, multi-series logic). The FX chart is the open ticket.",
          "Component library: downstream of all of the above. It doesn't start before the foundation carries weight.",
        ],
      },
    ],
  },

  // ── Reflection ─────────────────────────────────────────────────────────────
  {
    type: "section",
    id: "reflection",
    kicker: "Retrospective",
    title: "Reflection",
    blocks: [
      { type: "heading", text: "What worked" },
      {
        type: "text",
        text: "Sequencing color first: the layer under production pressure, the layer where errors are visible to every user, and the naming template for everything after it. Publishing the gap: the reality page and the Slack tracking list both documented the distance between design and implementation, and making the debt visible got it funded. Isolating the AI namespace early rather than redefining shared tokens under pressure. Bringing engineering in by showing them the system from their side.",
      },
      { type: "heading", text: "What I'd do differently" },
      {
        type: "text",
        text: "Audit color usage in context before designing anything. Elevation problems surfaced during implementation instead of before it; a screen-by-screen audit of how colors were actually used, not how they were named, would have caught them. Model charts as a semantic domain from the start rather than reusing surface colors for data. Finish the dimensional semantic layer alongside color rather than leaving primitives promoted but unmapped. The gap is defensible. It was still avoidable.",
      },
    ],
  },

  // ── Close ──────────────────────────────────────────────────────────────────
  {
    type: "quote",
    text: "I rebuilt the color foundation of a live fintech product, solo, while convincing the team that the problem was never dark mode. It was the system underneath.",
  },
];
