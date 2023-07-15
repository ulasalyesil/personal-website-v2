'use client'

import React from "react";
import ProjectCard from "./ProjectCard.jsx";

import gacLogo from "../public/images/gacLogo.svg";
import freyLogo from "../public/images/Frey_App_Icon.png";

export default function ProjectGrid() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-neutral-400 pb-2 border-b border-neutral-300 font-semibold">
        Latest Projects
      </h3>
      <div className="flex flex-col md:flex-row gap-4 w-full text-neutral-400 my-4">
        <ProjectCard
          target={"https://frey.money"}
          title={"Frey Money"}
          img={freyLogo}
        />
        <ProjectCard
          target={"https://goodafternooncreative.com"}
          title={"Good Afternoon Creative"}
          img={gacLogo}
        />
      </div>
    </div>
  );
}
