"use client";

import React from "react";
import ProjectCard from "./ProjectCard.jsx";

import gacWeb from "../public/images/gacWeb.png";
import frey from "../public/images/frey_overview.png";

export default function ProjectGrid({ title }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-neutral-400 pb-2 border-b border-neutral-300 dark:border-neutral-800 font-semibold">
        {title}
      </h3>
      <div className="flex flex-col md:flex-row gap-4 w-full text-neutral-400 my-4">
        <ProjectCard
          target={"https://frey.money"}
          title={"Frey Money"}
          img={frey}
        />
        <ProjectCard
          target={"https://goodafternooncreative.com"}
          title={"Good Afternoon Creative"}
          img={gacWeb}
        />
      </div>
    </div>
  );
}
