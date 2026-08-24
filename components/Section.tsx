import SectionItem from "./SectionItem";
import type { ProjectsData } from "@/types";

interface SectionProps {
  sectionTitle: string;
  projects: ProjectsData;
  /**
   * Slugs whose route-morph name is already claimed elsewhere on the page (the
   * featured grid on the home page). A `view-transition-name` must be unique
   * per document: a duplicate makes the browser skip the whole transition.
   */
  claimedSlugs?: string[];
}

export default function Section({ sectionTitle, projects, claimedSlugs = [] }: SectionProps) {
  const sortedProjects = Object.entries(projects)
    .filter(([, project]) => !project.hidden)
    .sort(
      ([, a], [, b]) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary pb-3 mb-4 border-b border-border-subtle">
        {sectionTitle}
      </h2>
      <ol className="flex flex-col">
        {sortedProjects.map(([key]) => {
          const { date, title, role, target } = projects[key];
          return (
            <SectionItem
              key={key}
              date={date}
              projectTitle={title}
              role={role}
              target={target}
              claimedSlugs={claimedSlugs}
            />
          );
        })}
      </ol>
    </section>
  );
}
