import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import LabTeaserCard from "@/components/LabTeaserCard";
import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";

import wisecareaCover from "@/public/images/wisecare/wisecare_cover.webp";
import fsiCover from "@/public/images/fsi/fsi_cover.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import gfDarkCover from "@/public/images/getirfinans-design-system/cover.webp";
import type { FeaturedProject } from "@/types";

const featured: FeaturedProject[] = [
  {
    slug: "wisecareai",
    title: "WiseCareAI",
    description:
      "Health insurance platform combining product design with generative AI to adapt forms and recommendations in real time.",
    cover: wisecareaCover,
  },
  {
    slug: "full-spectrum-insights",
    title: "Full Spectrum Insights",
    description:
      "A consultancy website showcasing AI-assisted business insights through practical demos and clear outcomes.",
    cover: fsiCover,
  },
  {
    slug: "jotform-integrations",
    title: "Jotform",
    description:
      "Designing a seamless QuickBooks integration that automates invoice and customer creation from form submissions.",
    cover: qbCover,
  },
  {
    slug: "getirfinans-design-system",
    title: "GetirFinans Design System",
    description:
      "Rebuilding the color foundation of a live fintech app: a two-tier token system shipped under a running product, and the governance work that made it stick.",
    cover: gfDarkCover,
  },
];

export default function HomePage() {
  return (
    <AnimateIn className="flex flex-col gap-16">
      <AnimateItem>
        <Hero />
      </AnimateItem>
      <AnimateItem>
        <ProjectGrid projects={featured} />
        {/* mt-4 matches the grid's gap-4 so the card reads as its last row. */}
        <div className="mt-4">
          <LabTeaserCard />
        </div>
      </AnimateItem>
      <AnimateItem>
        <Section sectionTitle="All Projects" projects={projectsData} />
      </AnimateItem>
    </AnimateIn>
  );
}
