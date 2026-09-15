import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import LabTeaserCard from "@/components/LabTeaserCard";
import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";

import wisecareaCover from "@/public/images/wisecare/wisecare_cover.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import gfAiCover from "@/public/images/getirfinans-ai/cover.webp";
import gfDesignSystemCover from "@/public/images/lab/dark-mode.webp";
import type { FeaturedProject } from "@/types";

const featured: FeaturedProject[] = [
  {
    slug: "getirfinans-ai",
    title: "GetirFinans AI",
    description:
      "Helping people move from questions to useful next actions in a banking app.",
    cover: gfAiCover,
  },
  {
    slug: "getirfinans-design-system",
    title: "GetirFinans Design System",
    description:
      "Shipping app-wide dark mode through a semantic color foundation, documentation, and delivery with engineering.",
    cover: gfDesignSystemCover,
  },
  {
    slug: "jotform-integrations",
    title: "Jotform | QuickBooks",
    description:
      "A guided integration flow for mapping form submissions to QuickBooks customers and invoices.",
    cover: qbCover,
  },
  {
    slug: "wisecareai",
    title: "WiseCareAI",
    description:
      "Founding product design for a market-ready U.S. health-insurance platform, across its public and internal tools.",
    cover: wisecareaCover,
  },
];

export default function HomePage() {
  return (
    <AnimateIn className="flex flex-col gap-12 sm:gap-14">
      <AnimateItem>
        <Hero />
      </AnimateItem>
      <AnimateItem index={1}>
        <ProjectGrid projects={featured} />
        {/* mt-4 matches the grid's gap-4 so the card reads as its last row. */}
        <div className="mt-4">
          <LabTeaserCard />
        </div>
      </AnimateItem>
      <AnimateItem index={2}>
        <Section
          sectionTitle="All Projects"
          projects={projectsData}
          claimedSlugs={featured.map((p) => p.slug)}
        />
      </AnimateItem>
    </AnimateIn>
  );
}
