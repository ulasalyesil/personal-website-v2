"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/wisecare/cover.png";
import aiFound from "@/public/images/wisecare/ai_found.png";
import aiThinking from "@/public/images/wisecare/ai_thinking.png";
import form from "@/public/images/wisecare/form.png";
import init from "@/public/images/wisecare/init.png";
import marketing from "@/public/images/wisecare/marketing.png";
import plans from "@/public/images/wisecare/plan_selection.png";
import plans2 from "@/public/images/wisecare/plans.png";
import wizard from "@/public/images/wisecare/wizard.png";

export default function WiseCareAICase() {
  return (
    <CaseStudyLayout
      title="WiseCareAI"
      date="2024 — 2025"
      company="WiseCareAI"
      role="Founding Product Designer"
      websiteUrl="https://www.wisecare.ai"
      contentBlocks={[
        {
          type: "text",
          text: "WiseCareAI is a health-insurance platform for the U.S. market. My work was end-to-end product design: research, IA, flows, interaction design, and a shared design system across agent tools, internal ops, and the public site. Generative UI/AI was integrated to augment core workflows—not define them.",
        },
        { type: "image", src: cover, alt: "WiseCareAI overview cover" },

        { type: "text", text: "Product scope:" },
        {
          type: "text",
          text: "ACA Enrollment (Agent): guided quoting/enrollment with dynamic form blocks.\nMedicare Quoting (Phone): quick compare with rationale for seniors.\nInternal Ops (CRM): timeline/status insights from notes and events.\nMarketing Site: clear story and trust signals in a regulated domain.\nDesign System: tokens, components, patterns (including generative states).",
        },

        { type: "text", text: "Responsibilities:" },
        {
          type: "text",
          text: "User interviews and task flows (agents, support, end clients).\nInformation architecture and navigation across tools.\nWireframes → hi-fi UI → prototypes; dev handoff.\nDesign system definition and maintenance.\nAI feature integration: prompts/guardrails/UX for explainability and edits.",
        },

        { type: "image", src: form, alt: "Dynamic form block example" },

        { type: "text", text: "Where AI/Generative fits (as augmentation):" },
        {
          type: "text",
          text: "Adaptive steps/fields when case context changes.\nFree-form intent or guided inputs—both converge to the same editable draft.\nRationale overlays: why a plan is suggested (cost, coverage fit, eligibility).\nRecovery loops: quick fixes to model mistakes without losing progress.",
        },

        { type: "text", text: "Key design challenges:" },
        {
          type: "text",
          text: "Stability vs plasticity: keep anchors while the work area adapts.\nTrust without overload: show a one-glance rationale; expand for trace.\nPreview vs commit: drafts first; explicit, reversible writes.\nPolicy complexity: ACA/Medicare rules without exposing regulation-speak.",
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

        { type: "text", text: "Patterns distilled:" },
        {
          type: "text",
          text: "Correction Loop — inline edits update the draft and current context.\nAnchor Layout — stable shell; generative canvas.\nPreview-First — drafts by default; explicit commit.\nRationale Card — concise “why”, expandable trace.\nLow↔High Agency Toggle — guided steps or free-form intent.\nMemory Notes — lightweight notes the agent and system can reference.",
        },

        { type: "text", text: "Impact (early signals):" },
        {
          type: "text",
          text: "≈25% faster enrollment time in agent tests.\nFewer back-and-forths due to visible rationale and editable constraints.\nLower recovery cost by treating AI output as drafts, not decisions.",
        },

        {
          type: "text",
          text: "Marketing: straightforward, credible narrative; visuals aligned with product explainability and regulation sensitivity.",
        },
        { type: "image", src: marketing, alt: "Public marketing site" },

        {
          type: "text",
          text: "Outcome: a coherent multi-tool product with a design system that embeds generative capabilities where they help most, while keeping control, speed, and trust.",
        },
      ]}
    />
  );
}
