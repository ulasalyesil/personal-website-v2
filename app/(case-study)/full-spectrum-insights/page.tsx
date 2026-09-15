import CaseStudyLayout from "@/components/CaseStudyLayout";
import fsiCover from "@/public/images/fsi/fsi_cover.webp";
import fsiWeb from "@/public/images/fsi/fsi_web.webp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Spectrum Insights — Ulaş Alyeşil",
  description:
    "Web design and Framer development for an AI-focused consultancy.",
  openGraph: {
    title: "Full Spectrum Insights — Ulaş Alyeşil",
    description: "Web design and Framer development for an AI-focused consultancy.",
    images: [{ url: fsiCover.src }],
  },
};

export default function FullSpectrumInsightsCase() {
  return (
    <CaseStudyLayout
      tier="project"
      slug="full-spectrum-insights"
      title="Full Spectrum Insights"
      date="June, 2025"
      company="Full Spectrum Insights"
      role="Web Design, Framer Dev"
      websiteUrl="https://fullspectruminsights.com"
      contentBlocks={[
        {
          type: "text",
          text: "FSI is a consultancy exploring AI-assisted insight workflows. The site needed to explain the offering through clear problems and concrete examples.",
        },
        {
          type: "image",
          src: fsiCover,
          alt: "Full Spectrum Insights homepage cover",
        },
        {
          type: "text",
          text: "I defined the information architecture, wrote the narrative, designed the interface, and built the responsive site in Framer.",
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
          text: "Outcome. A clear, modular public presence that FSI can extend as its consulting and demonstration work evolves.",
        },
      ]}
    />
  );
}
