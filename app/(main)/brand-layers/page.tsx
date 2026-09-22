import PageIntro from "@/components/site/PageIntro";
import BrandLayers from "@/components/brand-layers/BrandLayers";

export const metadata = {
  title: "Brand Layers — Ulaş Alyeşil",
  description:
    "One component, never edited, resolving correctly under three brands, two modes, five sentiments and four interaction states. Every colour traced back through the token layers.",
};

export default function BrandLayersPage() {
  return (
    <>
      <PageIntro
        title="Brand Layers"
        aside="3 brands · 2 modes · 5 sentiments · 4 states"
        lede="One component, never edited. Switch the brand, the mode, the sentiment or the state and it resolves again from the token layers underneath. Select any token to see how it got its value."
      />
      <BrandLayers />
    </>
  );
}
