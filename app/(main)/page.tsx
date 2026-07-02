import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";

import wisecareaCover from "@/public/images/wisecare/wisecare_cover.webp";
import fsiCover from "@/public/images/fsi/fsi_cover.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import gfDarkCover from "@/public/images/getirfinans-dark-mode/cover.webp";
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
    slug: "getirfinans-dark-mode",
    title: "GetirFinans Dark Mode",
    description:
      "Rebuilding the color foundation of a live fintech app — a dark mode sprint that surfaced design system debt and forced the architecture to catch up.",
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
      </AnimateItem>
      <AnimateItem>
        <Section sectionTitle="All Projects" projects={projectsData} />
      </AnimateItem>
    </AnimateIn>
  );
}
