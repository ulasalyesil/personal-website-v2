import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { Metadata } from "next";
import { wisecareai, cover } from "./content";

export const metadata: Metadata = {
  title: "WiseCareAI — Ulaş Alyeşil",
  description:
    "End-to-end product design for a US health-insurance platform: design system, agent tools, and AI-augmented enrollment workflows.",
  openGraph: {
    title: "WiseCareAI — Ulaş Alyeşil",
    description: "End-to-end product design for a US health-insurance platform.",
    images: [{ url: cover.src }],
  },
};

export default function WiseCareAICase() {
  return <CaseStudyLayout {...wisecareai} />;
}
