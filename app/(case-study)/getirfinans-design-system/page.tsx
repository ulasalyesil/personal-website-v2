import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/lab/dark-mode.webp";
import { meta, contentBlocks } from "./content";
import TokenValues from "./TokenValues";

export const metadata: Metadata = {
  title: "GetirFinans Design System — Ulaş Alyeşil",
  description:
    "Token foundations, components and governance rebuilt under a live banking app: a two-tier color system that shipped app-wide dark mode, the product's first spacing and radius tokens, contract-based components, and audits that keep Figma and code in step.",
  openGraph: {
    title: "GetirFinans Design System — Ulaş Alyeşil",
    description:
      "A shipped dark-mode migration, and the system work that made it possible.",
    images: [{ url: cover.src }],
  },
};

export default function GetirFinansDesignSystemCase() {
  return (
    <CaseStudyLayout
      {...meta}
      contentBlocks={contentBlocks}
      customComponents={{ "token-values": <TokenValues /> }}
    />
  );
}
