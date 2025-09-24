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
          text: "WiseCareAI explored a generative interface for the U.S. health insurance market. Instead of fixed screens, an AI agent assembled tasks, forms, and explanations on the fly. My job: design the human↔agent interaction so a dynamic UI still feels stable, legible, and trustworthy.",
        },
        { type: "image", src: cover, alt: "WiseCareAI overview cover" },
        {
          type: "text",
          text: "What made it different:",
        },
        {
          type: "text",
          text: "Generative UI — steps, fields, and summaries adapted to the case context.\nDual-agency — agents could drive via free-form intent or guided flows.\nExplainability — every recommendation shipped with compact reasoning and source references.\nCorrection loops — fast ways to fix AI mistakes without losing progress.",
        },

        { type: "text", text: "Scope and modules:" },
        {
          type: "text",
          text: "ACA Enrollment (Agent): intent-in → dynamic form blocks → policy suggestions.\nMedicare Quoting (Phone): low-UI, high-voice notes → quick compare with rationale.\nInternal Ops (CRM): status insights generated from case timelines and notes.\nMarketing Site: clear narrative for a regulated, trust-sensitive domain.\nDesign System: tokens, components, patterns for generative states.",
        },

        { type: "image", src: form, alt: "Dynamic form block example" },

        { type: "text", text: "AI UX challenges:" },
        {
          type: "text",
          text: "Stability vs. plasticity: how to keep anchors while UI morphs.\nTrust without overload: show “why” in one glance, expand on demand.\nPreview vs. commit: safe sandboxes before actions that affect coverage.\nRecovery from wrong answers: quick edits that teach the model and keep flow.\nPolicy complexity: ACA vs. Medicare rules without exposing raw regulation-speak.",
        },

        {
          type: "text",
          text: "Pattern: Anchor Layout. Navigation, case header, and progress stayed fixed; only a work area mutated. This lowered disorientation while allowing the agent to reshape steps.",
        },
        {
          type: "image",
          src: init,
          alt: "Enrollment flow with stable anchors",
        },

        {
          type: "text",
          text: "Pattern: Preview → Refine → Commit. The agent produced drafts (plans, forms, messages). Agents edited inline chips (filters, constraints) before any system write.",
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
          text: "Explainability surface: each recommendation carried a compact rationale (cost, coverage fit, eligibility) with a tap-to-expand trace to sources and constraints.",
        },
        { type: "image", src: wizard, alt: "Explainable selection wizard" },

        {
          type: "text",
          text: "Agent interaction modes: free-form need statements or guided inputs. Both routes converged to the same editable draft so users could switch modes without penalty.",
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
          text: "System behavior design (with engineering): prompt scaffolds, guardrails for eligibility, deterministic UI anchors, streaming “thinking” feedback, and error classes mapped to recovery UI.",
        },

        {
          type: "text",
          text: "Design patterns distilled from the work:",
        },
        {
          type: "text",
          text: "Correction Loop: inline edits that update the draft and the model’s current context.\nAnchor Layout: persistent header, navigation, and progress; only the canvas is generative.\nPreview-First: AI outputs enter as drafts; commit is explicit and reversible.\nRationale Card: concise why-this pick with expandable trace.\nLow to High Agency Toggle: switch between guided steps and free-form intent.\nMemory Notes: lightweight case notes the agent can reference, always visible.",
        },

        { type: "text", text: "Impact (early signals):" },
        {
          type: "text",
          text: "Approximately 25% faster enrollment time in agent tests.\nFewer back-and-forths due to visible rationale and editable constraints.\nLower error recovery cost by treating AI output as drafts instead of decisions.",
        },

        {
          type: "text",
          text: "Marketing site: simple, credible story for a sensitive category; aligned visuals with the product’s explainability stance.",
        },
        { type: "image", src: marketing, alt: "Public marketing site" },

        {
          type: "text",
          text: "My role: define the AI interaction model, design the pattern system for generative screens, prototype flows end-to-end, and collaborate on prompt and guardrail design with engineers and leadership.",
        },
        {
          type: "text",
          text: "Outcome: a coherent pattern language for a generative insurance workflow that balances speed with control and keeps trust intact.",
        },
      ]}
    />
  );
}
