import type { ContentBlock } from "@/types";
import cover from "@/public/images/wisecare/cover.webp";
import aiFound from "@/public/images/wisecare/ai_found.webp";
import aiThinking from "@/public/images/wisecare/ai_thinking.webp";
import form from "@/public/images/wisecare/form.webp";
import init from "@/public/images/wisecare/init.webp";
import marketing from "@/public/images/wisecare/marketing.webp";
import plans from "@/public/images/wisecare/plan_selection.webp";
import plans2 from "@/public/images/wisecare/plans.webp";
import wizard from "@/public/images/wisecare/wizard.webp";

export { cover };

export const wisecareai = {
  slug: "wisecareai",
  title: "WiseCareAI",
  date: "May 2024 — August 2025",
  company: "WiseCareAI",
  role: "Founding Product Designer",
  websiteUrl: "https://www.wisecare.ai",
  team: "Founding team",
  platforms: "Agent tools, internal operations, and public web",
  status: "Market-ready product · not launched",
  contentBlocks: [
    {
      type: "text",
      text: "WiseCareAI is a health-insurance platform for the U.S. market. As founding product designer, I shaped the product language, information architecture, core flows, and shared system across agent tools, internal operations, and the public site. Generative UI/AI supported core workflows rather than replacing them.",
    },
    { type: "image", src: cover, alt: "WiseCareAI overview cover" },

    {
      type: "list",
      lead: "Product scope:",
      items: [
        "ACA Enrollment (Agent): guided quoting/enrollment with dynamic form blocks.",
        "Medicare Quoting (Phone): quick compare with rationale for seniors.",
        "Internal Ops (CRM): timeline/status insights from notes and events.",
        "Marketing Site: clear story and trust signals in a regulated domain.",
        "Design System: tokens, components, patterns (including generative states).",
      ],
    },

    {
      type: "list",
      lead: "My contribution:",
      items: [
        "Information architecture and navigation across tools.",
        "Wireframes → hi-fi UI → prototypes; dev handoff.",
        "Design system definition and maintenance.",
        "AI feature integration: prompts/guardrails/UX for explainability and edits.",
      ],
    },

    { type: "image", src: form, alt: "Dynamic form block example" },

    {
      type: "list",
      lead: "Where AI/Generative fits (as augmentation):",
      items: [
        "Adaptive steps/fields when case context changes.",
        "Free-form intent or guided inputs—both converge to the same editable draft.",
        "Rationale overlays: why a plan is suggested (cost, coverage fit, eligibility).",
        "Recovery loops: quick fixes to model mistakes without losing progress.",
      ],
    },

    {
      type: "list",
      lead: "Key design challenges:",
      items: [
        "Stability vs plasticity: keep anchors while the work area adapts.",
        "Trust without overload: show a one-glance rationale; expand for trace.",
        "Preview vs commit: drafts first; explicit, reversible writes.",
        "Policy complexity: ACA/Medicare rules without exposing regulation-speak.",
      ],
    },

    {
      type: "text",
      text: "Pattern: Anchor Layout — persistent navigation/header/progress; only the canvas mutates. Reduces disorientation while supporting flexible steps.",
    },
    {
      type: "image",
      src: init,
      alt: "Enrollment flow with stable anchors",
    },

    {
      type: "text",
      text: "Pattern: Preview → Refine → Commit — AI creates drafts (plans/forms/messages). Agents adjust inline chips (filters/constraints) before any system write.",
    },
    {
      type: "gallery",
      items: [
        { src: plans, alt: "Plan compare draft" },
        { src: plans2, alt: "Plan refine and commit" },
      ],
    },

    {
      type: "text",
      text: "Explainability surface: compact rationale (cost, fit, eligibility) with tap-to-expand trace to sources and constraints.",
    },
    { type: "image", src: wizard, alt: "Explainable selection wizard" },

    {
      type: "text",
      text: "Interaction modes: free-form need statements or guided steps. Users can switch modes any time; both routes land on the same draft.",
    },
    {
      type: "gallery",
      items: [
        { src: aiFound, alt: "AI result with rationale chips" },
        { src: aiThinking, alt: "Agent thinking / drafting state" },
      ],
    },

    {
      type: "text",
      text: "System behavior (with engineering): prompt scaffolds, eligibility guardrails, deterministic anchors, streaming feedback, error classes mapped to recovery UI.",
    },

    {
      type: "list",
      lead: "Patterns distilled:",
      items: [
        "Correction Loop — inline edits update the draft and current context.",
        "Anchor Layout — stable shell; generative canvas.",
        "Preview-First — drafts by default; explicit commit.",
        "Rationale Card — concise “why”, expandable trace.",
        "Low↔High Agency Toggle — guided steps or free-form intent.",
        "Memory Notes — lightweight notes the agent and system can reference.",
      ],
    },

    {
      type: "text",
      text: "Delivery stage: the product was brought to a market-ready state, but it was not launched. This page describes the designed and delivered capability, not measured customer outcomes or a completed acquisition.",
    },

    {
      type: "text",
      text: "Marketing: straightforward, credible narrative; visuals aligned with product explainability and regulation sensitivity.",
    },
    { type: "image", src: marketing, alt: "Public marketing site" },

    {
      type: "text",
      text: "The resulting product gave the team a consistent foundation for agent workflows, internal operations, and public-facing communication, with drafts and review states where generative assistance was involved.",
    },
  ] satisfies ContentBlock[],
};
