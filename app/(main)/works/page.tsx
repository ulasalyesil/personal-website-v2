import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";
import otherData from "@/public/data/others.json";

export const metadata = { title: "Works — Ulaş Alyeşil" };

export default function Works() {
  return (
    <AnimateIn className="flex flex-col gap-16">
      <AnimateItem>
        <h1 className="mb-8 text-2xl font-semibold text-text-primary text-balance">Works</h1>
        <Section sectionTitle="Design work" projects={projectsData} />
      </AnimateItem>
      <AnimateItem index={1}>
        <Section sectionTitle="Other Stuff" projects={otherData} />
      </AnimateItem>
    </AnimateIn>
  );
}
