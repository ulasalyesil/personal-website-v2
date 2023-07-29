'use client'

// packages
import { motion } from "framer-motion";

// components
import Hero from "../components/Hero";
import HProjectCard from "../components/HProjectCard";
import Section from "../components/Section";
import Footer from "../components/Footer";
import PlaygroundTabs from "@/components/PlaygroundTabs";

// assets
import gacWeb from "../public/images/goodafternoon/gacWeb.png";
import frey from "../public/images/frey_overview.png";
import qb from "@/public/images/quickbooks/integrationsList.png";

// data
import projectsData from "../public/data/projects.json";
import writingsData from "../public/data/writings.json";

function Page() {
  return (
    <div className="w-screen h-screen text-sm md:text-base">
      <motion.div className="flex flex-col p-4 sm:m-auto rounded-xl sm:w-[512px] gap-16 mb-auto bg-neutral-100/20 dark:bg-neutral-950">
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

          <div className="flex flex-col gap-2">
      <h3 className="text-neutral-400 pb-2 border-b border-neutral-300 dark:border-neutral-800 font-semibold">
        Latest Projects
      </h3>
      <div className="flex flex-col gap-4 w-full text-neutral-400 my-4">
        <HProjectCard
          target={"/jotform-integrations"}
          projectType={"Product Design"}
          title={"Jotform Integrations"}
          description={"Designing the QuickBooks integration and re-imagining the integrations experience."}
          buttonLabel={'See Case Study'}
          img={qb}
        />
        <HProjectCard
          target={"/good-afternoon-creative"}
          projectType={"Web Design and Development"}
          title={"Good Afternoon Creative"}
          description={"Good Afternoon Creative is a brand agency based in İstanbul"}
          buttonLabel={'See Case Study'}
          img={gacWeb}
        />
      </div>
    </div>
          <Section sectionTitle={"Projects"} projects={projectsData} />
          <Section sectionTitle={"Writings"} projects={writingsData} />
          {/* <PlaygroundTabs /> */}
        </motion.ol>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Page;
