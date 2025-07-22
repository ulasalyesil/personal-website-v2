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
      role="Product Designer"
      websiteUrl="https://www.wisecare.ai"
      contentBlocks={[
        {
          type: "text",
          text: "WiseCareAI was an AI-powered platform for the U.S. health insurance market. I joined as the founding designer and worked across multiple products — from agent tools and enrollment flows to a public-facing website and a unified design system.",
        },
        { type: "image", src: cover, alt: "WiseCareAI homepage cover" },
        {
          type: "text",
          text: "I led end-to-end product design across 5+ tools: agent-facing apps, internal dashboards, and the marketing website. My responsibilities included UX strategy, UI design, prototyping, developer handoff, and system-wide consistency. I worked closely with the CEO, CPO, and engineers.",
        },
        { type: "text", text: "Product Ecosystem:" },
        {
          type: "text",
          text: "• Enrollment Agent (ACA): A guided form tool for individual clients enrolling in Affordable Care Act plans.",
        },
        {
          type: "text",
          text: "• Medicare Agent Tool: A quoting assistant designed for agents handling elderly clients over the phone.",
        },
        {
          type: "text",
          text: "• Internal Dashboard: A CRM for support staff to track enrollments and manage leads.",
        },
        {
          type: "text",
          text: "• Marketing Website: A responsive public site aimed at trust-building and lead conversion.",
        },
        {
          type: "text",
          text: "• Design System: Tokens, components, documentation, and handoff for scalability.",
        },
        {
          type: "image",
          src: form,
          alt: "Test Image",
        },
        { type: "text", text: "Challenges:" },
        {
          type: "text",
          text: "• Designing for both low-tech agents and fast-paced workflows under pressure.",
        },
        {
          type: "text",
          text: "• Navigating U.S. health policy complexities (ACA vs. Medicare).",
        },
        {
          type: "text",
          text: "• Building a shared design system that worked across internal and external tools.",
        },
        {
          type: "text",
          text: "We implemented a step-by-step wizard for ACA enrollment, with real-time validation and contextual help at each stage.",
        },
        { type: "image", src: init, alt: "ACA enrollment wizard screen" },
        {
          type: "text",
          text: "Agents and clients could compare multiple plans side-by-side, filtering by cost, coverage, and special eligibility.",
        },
        {
          type: "gallery",
          items: [
            { src: plans, alt: "Plan comparison step 1" },
            { src: plans2, alt: "Plan comparison step 2" },
          ],
        },
        {
          type: "text",
          text: "The final selection screen highlights recommended plans with clear callouts based on client needs.",
        },
        { type: "image", src: wizard, alt: "Plan selection wizard overview" },
        {
          type: "text",
          text: "In both the ACA and Medicare flows, I designed search and assessment tools powered by an AI backend. Agents could input free-form needs or use guided steps, and the system returned plan recommendations with transparent logic.",
        },
        {
          type: "gallery",
          items: [
            { src: aiFound, alt: "AI Found screen" },
            { src: aiThinking, alt: "AI Thinking screen" },
          ],
        },
        {
          type: "text",
          text: "I designed and built a clean, responsive marketing site to explain our value proposition and convert new leads.",
        },
        { type: "image", src: marketing, alt: "Marketing landing page" },
        { type: "text", text: "Impact:" },
        { type: "text", text: "• 25% faster enrollment times across agents" },
        { type: "text", text: "• Improved quote accuracy and user confidence" },
        {
          type: "text",
          text: "• Better onboarding and training outcomes for new hires",
        },
        {
          type: "text",
          text: "WiseCareAI gave me full-stack product design ownership in a complex and highly regulated domain. I designed for multiple personas, aligned with business goals, and helped shape a platform that blended logic, speed, and trust. While the product is paused, it remains one of my most complete design contributions to date.",
        },
      ]}
    />
  );
}
