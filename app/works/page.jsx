'use client'

import { delay, motion } from "framer-motion";

import Header from "@/components/Header"
import Section from "@/components/Section"

import projectsData from "../../public/data/projects.json";
import otherData from "../../public/data/others.json";
import Footer from "@/components/Footer";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Works() {
  return (
    <div className="flex flex-col px-2 mt-12 rounded-xl sm:w-[512px] gap-16 mb-auto">
      <div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        transition={{ duration: 0.6, type: "spring", stiffness: 25, delay: 0.4 }}
        className="flex flex-col gap-16"
      >
        <Section sectionTitle={"Design Works"} projects={projectsData} />
        <Section sectionTitle={"Other Stuff"} projects={otherData}/>
      </div>
      <Footer />
    </div>
  );
}
