import Section from "@/components/Section";

import projectsData from "@/public/data/projects.json";
import otherData from "@/public/data/others.json";

export default function Works() {
  return (
    <div className="flex flex-col gap-16">
      <Section sectionTitle="Design Works" projects={projectsData} />
      <Section sectionTitle="Other Stuff" projects={otherData} />
    </div>
  );
}
