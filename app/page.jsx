"use client";

import { motion } from "framer-motion";

import Hero from "../components/Hero";
import HProjectCard from "../components/HProjectCard";
import ProjectCard from "@/components/ProjectCard";
import Section from "../components/Section";
import Footer from "../components/Footer";

import wisecareai from "../public/images/wisecare/plan_selection.png";
import fsiCover from "@/public/images/fsi/fsi_cover.png";
import qb from "@/public/images/quickbooks/integrationsList.png";
import gacWeb2 from "@/public/images/goodafternoon/gacWeb2.png";

import projectsData from "../public/data/projects.json";
import Link from "next/link";
import Image from "next/image";

const motionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.8, duration: 0.6, type: "spring", stiffness: 25 },
};

function Page() {
  return (
    <div className="text-sm md:text-base">
      <motion.div className="flex flex-col sm:p-4 sm:m-auto rounded-xl sm:w-[1200px] gap-16 mb-auto">
        <Hero />
        <motion.ol
          className="flex flex-col gap-16 rounded-xl py-4 selection:bg-slate-100 selection:text-[#017BFC]"
          {...motionProps}
        >
          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-neutral-400 px-4 pb-2 border-b border-neutral-300 dark:border-neutral-800 font-mono font-bold w-full gap-4">
              Selected Projects
            </h3>
            {/* <div className="flex flex-col sm:flex-row gap-4 w-full text-neutral-400 my-4">
              <HProjectCard
                target={"/wisecareai"}
                projectType={"Product Design"}
                title={"WiseCareAI"}
                description={
                  "An AI-powered platform helping US health insurance agents recommend the best ACA and Medicare plans faster and smarter."
                }
                buttonLabel={"See Case Study"}
                img={wisecareai}
              />
              <HProjectCard
                target={"/jotform-integrations"}
                projectType={"Product Design"}
                title={"Jotform"}
                description={
                  "Designing the QuickBooks integration and re-imagining the integrations experience."
                }
                buttonLabel={"See Case Study"}
                img={qb}
              />
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ProjectCard
                title={"WiseCareAI"}
                description={
                  "An AI-powered platform helping US health insurance agents recommend the best ACA and Medicare plans faster and smarter."
                }
                img={wisecareai}
                target={"/wisecareai"}
              />
              <ProjectCard
                title={"Full Spectrum Insights"}
                description={
                  "Redesigned and built Full Spectrum Insights's website to clearly communicate their expertise and value to industry clients."
                }
                img={fsiCover}
                target={"/full-spectrum-insights"}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <ProjectCard
                title={"Jotform"}
                description={
                  "Designing the QuickBooks integration and re-imagining the integrations experience."
                }
                img={qb}
                target={"jotform-integrations"}
              />
              <ProjectCard
                title={"Good Afternoon Creative"}
                description={
                  "Building a branded portfolio site for a Istanbul-based creative duo to showcase selected work and studio capabilities."
                }
                img={gacWeb2}
                target={"good-afternoon-creative"}
              />
            </div>
          </div>
          <Section sectionTitle={"Projects"} projects={projectsData} />
        </motion.ol>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Page;
