import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/lab/dark-mode.webp";
import { meta, contentBlocks } from "./content";
import { BottomSheetSimulator } from "./components";

export const metadata: Metadata = {
  title: "GetirFinans Design System — Ulaş Alyeşil",
  description:
    "Shipping app-wide dark mode at GetirFinans through a semantic color foundation, documentation, and delivery with engineering.",
  openGraph: {
    title: "GetirFinans Design System — Ulaş Alyeşil",
    description:
      "A shipped dark-mode migration, and the system work that made it possible.",
    images: [{ url: cover.src }],
  },
};

export default function GetirFinansDesignSystemCase() {
  const customComponents = {
    "bottom-sheet": <BottomSheetSimulator />,
  };

  return (
    <CaseStudyLayout {...meta} contentBlocks={contentBlocks} customComponents={customComponents} />
  );
}
