"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import CaseStudyTitle from "@/components/CaseStudyTitle";
import Button from "@/components/ui/Button";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

// Replace these with your actual images
import wisecare_cover from "@/public/images/wisecare/cover.png";
import dashboard from "@/public/images/wisecare/dashboard.png";
import formUI from "@/public/images/wisecare/form.png";
import aiSearch from "@/public/images/wisecare/aiSearch.png";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Page() {
  const { initial, animate, transition } = animationConfig;

  const styles = {
    h2: "text-xl dark:text-neutral-100 font-bold w-full mt-4 sm:max-w-[512px]",
    p: "text-neutral-900 dark:text-neutral-100 text-base flex flex-col gap-4 sm:max-w-[512px]",
  };

  return (
    <div className="flex flex-col gap-16 sm:px-8 py-8 items-center justify-center">
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="top-6 flex flex-col items-center"
      >
        <CaseStudyTitle
          title={"WiseCareAI Platform"}
          date={"May, 2024 — March, 2025"}
          company={"WiseCareAI"}
          role={"Product Designer"}
          className="max-w-[512px]"
        />
        <Image
          src={wisecare_cover}
          alt="WiseCareAI cover"
          className="my-6 rounded-lg shadow-xl w-full"
        />
        <motion.article
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex flex-col gap-4 items-center"
        >
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            WiseCareAI was an AI-powered platform for the U.S. health insurance market. I joined as the founding designer and worked across multiple products — from agent tools and enrollment flows to a public-facing website and design system.
          </p>

          <h2 className={styles.h2}>My Role</h2>
          <p className={styles.p}>
            I led end-to-end product design across 5+ tools: agent-facing apps, internal dashboards, and the marketing website. My responsibilities included UX strategy, UI design, prototyping, developer handoff, and system-wide consistency. I worked closely with the CEO, CPO, and engineers.
          </p>

          <h2 className={styles.h2}>Product Ecosystem</h2>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>
              <strong>Enrollment Agent (ACA):</strong> A guided form tool for individual clients enrolling in Affordable Care Act plans.
            </li>
            <li className={styles.p}>
              <strong>Medicare Agent Tool:</strong> A quoting assistant designed for agents handling elderly clients over the phone.
            </li>
            <li className={styles.p}>
              <strong>Internal Dashboard:</strong> A CRM for support staff to track enrollments and manage leads.
            </li>
            <li className={styles.p}>
              <strong>Marketing Website:</strong> A responsive public site aimed at trust-building and lead conversion.
            </li>
            <li className={styles.p}>
              <strong>Design System:</strong> Tokens, components, documentation, and handoff for scalability.
            </li>
          </ul>

          <Image
            src={dashboard}
            alt="Agent Dashboard"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>Challenges</h2>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>
              Designing for both low-tech agents and fast-paced workflows under pressure.
            </li>
            <li className={styles.p}>
              Navigating U.S. health policy complexities (ACA vs. Medicare).
            </li>
            <li className={styles.p}>
              Building a shared design system that worked across internal and external tools.
            </li>
          </ul>

          <Image
            src={formUI}
            alt="ACA Enrollment Flow"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>AI-Powered Tools</h2>
          <p className={styles.p}>
            In both the ACA and Medicare flows, I designed search and assessment tools powered by an AI backend. Agents could input free-form needs or use guided steps, and the system returned plan recommendations with transparent logic.
          </p>

          <Image
            src={aiSearch}
            alt="AI Search Assistant"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>Impact</h2>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>25% faster enrollment times across agents</li>
            <li className={styles.p}>Improved quote accuracy and user confidence</li>
            <li className={styles.p}>Better onboarding and training outcomes for new hires</li>
          </ul>

          <h2 className={styles.h2}>Conclusion</h2>
          <p className={styles.p}>
            WiseCareAI gave me full-stack product design ownership in a complex and highly regulated domain. I designed for multiple personas, aligned with business goals, and helped shape a platform that blended logic, speed, and trust. While the product is paused, it remains one of my most complete design contributions to date.
          </p>

          <div className="flex justify-start w-full sm:max-w-[512px] my-6 gap-4">
            <Button label={"Go Home"} href={"/"} type={"secondary"} />
          </div>
        </motion.article>
        <Contacts />
      </motion.div>
      <Footer />
    </div>
  );
}
