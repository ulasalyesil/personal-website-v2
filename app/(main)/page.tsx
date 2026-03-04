import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";

import wisecareaCover from "@/public/images/wisecare/wisecare_cover.webp";
import fsiCover from "@/public/images/fsi/fsi_cover.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import gacCover from "@/public/images/goodafternoon/gacWeb2.webp";
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
    slug: "good-afternoon-creative",
    title: "Good Afternoon Creative",
    description:
      "Building a branded portfolio site for an Istanbul-based creative agency to showcase their work.",
    cover: gacCover,
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
