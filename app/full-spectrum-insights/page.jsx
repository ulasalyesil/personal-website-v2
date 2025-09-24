"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import fsiCover from "@/public/images/fsi/fsi_cover.png";
import fsiWeb from "@/public/images/fsi/fsi_web.png";

export default function FullSpectrumInsightsCase() {
  return (
    <CaseStudyLayout
      title="Full Spectrum Insights"
      date="June, 2025"
      company="Full Spectrum Insights"
      role="Web Design, Framer Dev"
      websiteUrl="https://fullspectruminsights.com"
      contentBlocks={[
        {
          type: "text",
          text: "FSI is a consultancy pivoting toward AI-assisted insight workflows. The goal was to make AI tangible without hype: clear problems, concrete demos, measured outcomes.",
        },
        {
          type: "image",
          src: fsiCover,
          alt: "Full Spectrum Insights homepage cover",
        },
        {
          type: "text",
          text: "I led end-to-end design and development of the site. Defined information architecture, wrote the narrative, designed the UI, and implemented a responsive, performance-focused build using Next.js.",
        },
        {
          type: "text",
          text: "AI positioning. We framed AI as draft-first assistance, not magic. Outputs appear as editable drafts with rationale and a clear path to commit or revert.",
        },
        {
          type: "text",
          text: "Interaction principles applied. Keep stable anchors while the canvas streams results. Show compact reasoning in plain language with optional detail. Enable fast correction that preserves state.",
        },
        {
          type: "text",
          text: "Patterns codified for reuse. Preview then commit. Rationale card with expandable trace. Low to high agency toggle between guided inputs and free-form intent. Anchor layout that keeps header, navigation, and progress fixed while results update.",
        },
        {
          type: "image",
          src: fsiWeb,
          alt: "Full Spectrum Insights full-page screenshot",
        },
        {
          type: "text",
          text: "Outcome. A credible AI-forward presence with a modular component system and an interaction playbook FSI can extend into productized demos and client work.",
        },
      ]}
    />
  );
}
