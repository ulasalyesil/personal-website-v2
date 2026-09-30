import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/consiligiere/customer-app.webp";
import { meta, contentBlocks } from "./content";

export const metadata: Metadata = {
  alternates: { canonical: "/consiligiere" },
  title: "Consiligiere — Ulaş Alyeşil",
  description:
    "Visual direction, landing page and both sides of a marketplace for verified professionals: the customer app and the provider tools, designed with Eylül Deniz Kızılay for an investment round.",
  openGraph: {
    title: "Consiligiere — Ulaş Alyeşil",
    description: "A marketplace for verified professionals, from brief to both sides.",
    images: [{ url: cover.src }],
  },
};

export default function ConsiligiereCase() {
  return <CaseStudyLayout {...meta} contentBlocks={contentBlocks} />;
}
