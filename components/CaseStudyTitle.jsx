import React from "react";
import { motion } from "framer-motion";

import Pill from "./ui/Pill";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function CaseStudyTitle({ title, date, company, role }) {
  const { initial, animate, transition } = animationConfig;
  return (
    <div className="flex flex-col gap-4 mb-10 max-w-[512px]">
      <motion.h1
        initial={initial}
        animate={animate}
        transition={transition}
        className="text-2xl md:text-5xl text-neutral-900 dark:text-neutral-100 font-semibold tracking-tighter w-full sticky"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="flex gap-2"
      >
        <Pill label={date} />
        <Pill label={company} />
        <Pill label={role} />
      </motion.div>
    </div>
  );
}
