'use client'

import Header from "@/components/Header"
import Section from "@/components/Section"

import projectsData from "../../public/data/projects.json";
export default function Works() {
  return (
    <div className="flex flex-col px-4 sm:m-auto mt-12 sm:mt-32 rounded-xl sm:w-[512px] gap-16 mb-auto">
      <Header/>
      <Section sectionTitle={"Works"} projects={projectsData} />
    </div>
  )
}
