import PageIntro from "@/components/site/PageIntro";
import DsStepper from "@/components/ds-stepper/DsStepper";

// Prototype. Unlinked and not indexed until it earns a place in the case study.
export const metadata = {
  title: "Color foundation, step by step — Ulaş Alyeşil",
  robots: { index: false, follow: false },
};

export default function DsStepperPage() {
  return (
    <>
      <PageIntro
        title="Color foundation"
        aside="Prototype · GetirFinans design system"
        lede="The color decision from the GetirFinans case study, played step by step. Every swatch is a token from the shipped app's color catalog."
      />
      <div className="px-[var(--gutter)] pb-16">
        <div className="mx-auto max-w-5xl">
          <DsStepper />
        </div>
      </div>
    </>
  );
}
