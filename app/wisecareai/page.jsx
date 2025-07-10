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
            WiseCareAI was an AI-powered platform designed to help independent health insurance agents in the U.S. make better product recommendations. I joined as the founding designer and worked closely with the CEO and CPO to launch and scale the product.
          </p>

          <h2 className={styles.h2}>My Role</h2>
          <p className={styles.p}>
            I led design across the board—from user research to UI/UX to visual identity. I also worked with developers to ensure pixel-perfect implementation and designed the marketing website. The project scope included enrollment tools, dashboards, forms, and internal systems.
          </p>

          <h2 className={styles.h2}>The Goal</h2>
          <p className={styles.p}>
            Help agents enroll clients into the best ACA or Medicare plan using a tool that simplifies plan comparison, automates workflows, and builds trust. We wanted to replace clunky legacy systems with a fast, modern, and intuitive platform powered by AI.
          </p>

          <h2 className={styles.h2}>Understanding the Agents</h2>
          <p className={styles.p}>
            Through interviews and field testing, we discovered how agents juggled multiple platforms, relied on personal notes, and often made decisions under pressure. They needed a clean, smart tool that could guide but not control their decisions.
          </p>

          <h2 className={styles.h2}>Product Structure</h2>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>
              <strong>Enrollment Agent:</strong> A fast, AI-powered interface to input client details and view best-fit plans.
            </li>
            <li className={styles.p}>
              <strong>Customer Dashboard:</strong> A management system to track all clients, enrollments, and conversations.
            </li>
            <li className={styles.p}>
              <strong>AI Needs Assessment:</strong> A guided form to capture client needs and automatically filter the best plans.
            </li>
          </ul>

          <Image
            src={dashboard}
            alt="Dashboard view"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>Challenges</h2>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>
              Many agents had low digital literacy, so the interface needed to be very clear and familiar.
            </li>
            <li className={styles.p}>
              Medicare and ACA plan data was dense and inconsistent, requiring careful UI design for filtering and comparison.
            </li>
            <li className={styles.p}>
              The tool had to perform well under pressure—most usage happened during live client calls.
            </li>
          </ul>

          <Image
            src={formUI}
            alt="Form UI"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>AI-Powered Experience</h2>
          <p className={styles.p}>
            I worked with the engineering team to design an AI-powered plan search tool. The interface allows agents to type natural questions or client attributes and returns filtered plan options. It was designed with explainability in mind, showing why a plan is recommended.
          </p>

          <Image
            src={aiSearch}
            alt="AI search"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>Brand & Visual Design</h2>
          <p className={styles.p}>
            I designed the logo, color palette, typography system, and components. We aimed for a calm, clinical aesthetic with a modern edge to build trust with both agents and clients.
          </p>

          <h2 className={styles.h2}>Impact</h2>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>Agents reduced enrollment call time by ~25%</li>
            <li className={styles.p}>Clients felt more confident about their plan choices</li>
            <li className={styles.p}>Improved agent onboarding and retention</li>
          </ul>

          <h2 className={styles.h2}>Conclusion</h2>
          <p className={styles.p}>
            WiseCareAI taught me the value of designing in complexity—from policy rules to emotional trust. As the sole designer, I had full ownership and visibility over the product lifecycle. While the product is currently paused, it remains one of the most complete and impactful design experiences in my career.
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
