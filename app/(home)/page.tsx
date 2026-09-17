import ModeSplitHero from "@/components/home/ModeSplitHero";
import SelectedWork, { type WorkPiece } from "@/components/home/SelectedWork";
import LabFeature from "@/components/home/LabFeature";
import WorkIndex from "@/components/home/WorkIndex";
import Closing from "@/components/home/Closing";

import gfAiCover from "@/public/images/getirfinans-ai/cover.webp";
import gfDesignSystemCover from "@/public/images/lab/dark-mode.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import wisecareCover from "@/public/images/wisecare/wisecare_cover.webp";

// Status lines only restate what each study already establishes.
const pieces: WorkPiece[] = [
  {
    slug: "getirfinans-ai",
    title: "GetirFinans AI",
    line: "Helping people move from questions to useful next actions in a fintech app.",
    role: "Product design, prototyping",
    year: "2026",
    status: "Shipped on iOS, with SwiftUI prototypes",
    cover: gfAiCover,
    alt: "Three GetirFinans screens: the assistant's opening prompts, a campaign answer, and an AI answer inside search",
  },
  {
    slug: "getirfinans-design-system",
    title: "GetirFinans Design System",
    line: "App-wide dark mode, shipped through a semantic color foundation.",
    role: "Design systems",
    year: "2026",
    status: "Dark mode shipped app-wide",
    cover: gfDesignSystemCover,
    alt: "The GetirFinans home screen in light mode beside the same screen in dark mode",
  },
  {
    slug: "jotform-integrations",
    title: "Jotform | QuickBooks",
    line: "A guided flow for mapping form submissions to QuickBooks customers and invoices.",
    role: "Product design",
    year: "2023",
    status: "Launched in Jotform",
    cover: qbCover,
    alt: "Jotform's integration settings, mapping form fields to a QuickBooks invoice",
  },
  {
    slug: "wisecareai",
    title: "WiseCareAI",
    line: "Founding product design for a U.S. health-insurance platform, public site and internal tools.",
    role: "Founding product designer",
    year: "2024 to 2025",
    status: "Taken to a market-ready product",
    cover: wisecareCover,
    alt: "WiseCareAI comparing two Medicare Advantage plans, with an AI summary of which fits the member",
  },
];

export default function HomePage() {
  return (
    <>
      <ModeSplitHero />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <SelectedWork pieces={pieces} />
        <LabFeature />
        <WorkIndex />
      </main>
      <Closing />
    </>
  );
}
