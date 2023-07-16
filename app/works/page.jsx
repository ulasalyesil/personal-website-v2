"use client";

import Section from "@/components/Section";

import projectsData from "../../public/data/projects.json";
import otherData from "../../public/data/others.json";
import Footer from "@/components/Footer";

export default function Works() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col px-2 mt-4 rounded-xl sm:w-[512px] gap-16 mb-auto">
        <div className="flex flex-col gap-16">
          <Section sectionTitle={"Design Works"} projects={projectsData} />
          <Section sectionTitle={"Other Stuff"} projects={otherData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
