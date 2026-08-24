import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/getirfinans-design-system/cover.webp";
import { meta, contentBlocks } from "./content";
import {
  TokenExplorer,
  ComponentSandbox,
  ColorGrid,
  CodeSwitcher,
  FxChartSimulator,
  BottomSheetSimulator,
  AiComponentPreview,
  DocsSitePreview,
  StatusScaleSpecimen,
  BrandFillSpecimen,
} from "./components";

export const metadata: Metadata = {
  title: "GetirFinans Design System — Ulaş Alyeşil",
  description:
    "Rebuilding the color foundation of a live fintech product: a two-tier token architecture across web, iOS, and Android, with dark mode as the forcing function.",
  openGraph: {
    title: "GetirFinans Design System — Ulaş Alyeşil",
    description:
      "A two-tier token architecture rebuilt underneath a running fintech product, across web, iOS, and Android.",
    images: [{ url: cover.src }],
  },
};

export default function GetirFinansDesignSystemCase() {
  const customComponents = {
    "palette-grid": <ColorGrid />,
    "token-explorer": <TokenExplorer />,
    "code-switcher": <CodeSwitcher />,
    "fx-chart": <FxChartSimulator />,
    "ai-components": <AiComponentPreview />,
    "bottom-sheet": <BottomSheetSimulator />,
    "component-sandbox": <ComponentSandbox />,
    "docs-site": <DocsSitePreview />,
    "status-positional": <StatusScaleSpecimen variant="positional" />,
    "status-range": <StatusScaleSpecimen variant="range" />,
    "brand-flooded": <BrandFillSpecimen variant="flooded" />,
    "brand-anchored": <BrandFillSpecimen variant="anchored" />,
  };

  return (
    <CaseStudyLayout {...meta} contentBlocks={contentBlocks} customComponents={customComponents} />
  );
}
