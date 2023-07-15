'use client'

import { delay, motion } from "framer-motion";

import Header from "@/components/Header"
import Section from "@/components/Section"

import projectsData from "../../public/data/projects.json";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Works() {
  return (
    <div className="flex flex-col px-4 sm:m-auto mt-12 sm:mt-32 rounded-xl sm:w-[512px] gap-16 mb-auto">
      <motion.div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        transition={animationConfig.transition}
      >
        <Header />
      </motion.div>
      <motion.div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        transition={{ duration: 0.6, type: "spring", stiffness: 25, delay: 0.4 }}
      >
        <Section sectionTitle={"Works"} projects={projectsData} />
      </motion.div>
    </div>
  );
}
