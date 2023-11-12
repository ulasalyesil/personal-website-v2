'use client'

import { motion } from "framer-motion";

import SectionItem from "./SectionItem";

function Section({
  sectionTitle,
  projects
}) {
  const style =
    "text-neutral-400 px-4 pb-2 border-b border-neutral-300 dark:border-neutral-800 font-semibold";

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
      <motion.h3 
      className={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 25, delay: 0.8 }}
      >
        {sectionTitle}
        </motion.h3>
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
