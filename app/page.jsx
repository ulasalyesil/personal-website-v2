'use client'

import { motion } from "framer-motion";


import Hero from "../components/Hero";
import ProjectGrid from "../components/ProjectGrid";
import Section from "../components/Section";
import Footer from "../components/Footer";

import projectsData from "../public/data/projects.json";
import writingsData from "../public/data/writings.json";

function Page() {
  return (
    <div className="w-screen h-screen text-sm md:text-base">
      <motion.div className="flex flex-col px-4 sm:m-auto mt-12 sm:mt-32 rounded-xl sm:w-[512px] gap-16 mb-auto">
        <Hero />
        <motion.ol
          className="flex flex-col gap-16 rounded-xl py-4 selection:bg-slate-100 selection:text-[#017BFC]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            type: "spring",
            stiffness: 25,
          }}
        >
          <ProjectGrid />
          <Section sectionTitle={"Projects"} projects={projectsData} />
          <Section sectionTitle={"Writings"} projects={writingsData} />
        </motion.ol>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Page;
