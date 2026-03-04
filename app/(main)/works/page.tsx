import Section from "@/components/Section";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import projectsData from "@/public/data/projects.json";
import otherData from "@/public/data/others.json";

export default function Works() {
  return (
    <AnimateIn className="flex flex-col gap-16">
      <AnimateItem>
        <Section sectionTitle="Design Works" projects={projectsData} />
      </AnimateItem>
      <AnimateItem>
        <Section sectionTitle="Other Stuff" projects={otherData} />
      </AnimateItem>
    </AnimateIn>
  );
}
