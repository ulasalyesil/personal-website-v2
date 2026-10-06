import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import cover from "@/public/images/lab/dark-mode.webp";
import { meta, contentBlocks } from "./content";
import TokenValues from "./TokenValues";

export const metadata: Metadata = {
  alternates: { canonical: "/getirfinans-design-system" },
  title: "GetirFinans Design System — Ulaş Alyeşil",
  description:
    "Token foundations, components and governance rebuilt under a live fintech app: a two-tier color system that shipped app-wide dark mode, the product's first spacing and radius tokens, contract-based components, and audits that keep Figma and code in step.",
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
      summary="Dark mode shipped across the app in two months. By September 2026, 8.5% of users had adopted it without a promotion."
      contentBlocks={contentBlocks}
      customComponents={{
        "token-values": <TokenValues />,
        "feature-area-recording": (
          <div className="flex justify-center rounded-xl bg-surface-1 px-4 py-6 sm:py-10">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster="/video/lab/feature-area-poster.jpg"
              aria-label="SwiftUI Feature Area prototype: the card stays still while its contents transition between promotions"
              className="aspect-[24/11] w-full max-w-[44rem] rounded-xl object-cover object-[center_23%]"
            >
              <source src="/video/lab/feature-area.mp4" type="video/mp4" />
            </video>
          </div>
        ),
      }}
    />
  );
}
