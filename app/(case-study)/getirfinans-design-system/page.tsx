import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/lab/dark-mode.webp";
import { meta, contentBlocks } from "./content";
import TokenValues from "./TokenValues";

export const metadata: Metadata = {
  title: "GetirFinans Design System — Ulaş Alyeşil",
  description:
    "A two-tier color token system rebuilt under a live banking app, with the documentation and engineering delivery that shipped app-wide dark mode on top of it.",
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
