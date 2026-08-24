import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import LabTeaserCard from "@/components/LabTeaserCard";
import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";

import wisecareaCover from "@/public/images/wisecare/wisecare_cover.webp";
import fsiCover from "@/public/images/fsi/fsi_cover.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import gfAiCover from "@/public/images/getirfinans-ai/cover.webp";
import type { FeaturedProject } from "@/types";

const featured: FeaturedProject[] = [
  {
    slug: "getirfinans-ai",
    title: "GetirFinans AI",
    description:
      "Designing the AI surfaces of a live banking app and verifying every interaction against a running SwiftUI build rather than a static frame.",
    cover: gfAiCover,
  },
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
