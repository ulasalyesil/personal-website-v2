'use client'

import SectionItem from "./SectionItem";

function Section({
  sectionTitle,
  projects
}) {
  const style =
    "text-neutral-400 px-1 sm:px-3 pb-2 border-b border-neutral-300 font-semibold";

    const sortedProjects = Object.entries(projects).sort(
      ([, projectA], [, projecctB]) => {
        const dateA = new Date(projectA.date);
        const dateB = new Date(projecctB.date);
        return dateB - dateA;
      }
    );

  // https://www.joshuawootonn.com/vercel-tabs-component check this out

  return (
    <div className="flex flex-col gap-4">
      <h3 className={style}>{sectionTitle}</h3>
      <ol>
      {sortedProjects.map(([key, project]) => {
        const { date, title, role, target } =projects[key];
        return (
          <SectionItem 
          key={key}
          date={date}
          projectTitle={title}
          role={role}
          target={target}
          />
        );
      })}
      </ol>
    </div>
  );
}

export default Section;
