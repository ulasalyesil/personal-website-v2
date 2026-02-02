"use client";

import { motion } from "framer-motion";

import Hero from "../components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { fadeInUp, withDelay } from "@/lib/animations";

import projectsData from "../public/data/projects.json";

const motionProps = withDelay(fadeInUp, 0.8);


function Page() {
  return (
    <div className="text-sm md:text-base">
      <motion.div className="flex flex-col sm:p-4 sm:m-auto rounded-xl sm:w-[1200px] gap-16 mb-auto">
        <Hero />
        <motion.ol
          className="flex flex-col gap-16 rounded-xl py-4 selection:bg-slate-100 selection:text-[#017BFC]"
          {...motionProps}
        >
          <SelectedProjects />
          <Section sectionTitle={"Projects"} projects={projectsData} />
        </motion.ol>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Page;
