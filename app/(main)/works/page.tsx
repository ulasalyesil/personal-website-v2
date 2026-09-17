import PageIntro from "@/components/site/PageIntro";
import CaseStudyList from "@/components/site/CaseStudyList";
import WorkIndex from "@/components/site/WorkIndex";
import { CASE_STUDIES } from "@/data/work";
import type { ProjectsData } from "@/types";

import projectsData from "@/public/data/projects.json";
import otherData from "@/public/data/others.json";

export const metadata = { title: "Works — Ulaş Alyeşil" };

const studyPaths = CASE_STUDIES.map((c) => `/${c.slug}`);

export default function Works() {
  const more = Object.values(projectsData as ProjectsData).filter(
    (p) => !p.hidden && !studyPaths.includes(p.target),
  ).length;

  return (
    <>
      <PageIntro
        title="Work"
        aside={`${CASE_STUDIES.length} case studies, ${more} more projects`}
        lede="Case studies first, then the rest of the work, newest first. Music and visual experiments are at the end."
      />
      <CaseStudyList studies={CASE_STUDIES} />
      <WorkIndex
        id="more-projects"
        heading="More projects"
        data={projectsData}
        exclude={studyPaths}
      />
      <WorkIndex id="elsewhere" heading="Elsewhere" data={otherData} external="host" />
    </>
  );
}
