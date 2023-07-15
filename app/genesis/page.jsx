'use client'

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Pill from "@/components/ui/Pill";
import GenesisContent from "./GenesisContent";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Page() {
  const { initial, animate, transition } = animationConfig;

  return (
    <div className="flex flex-col gap-16 px-8 pb-8">
      <div className="max-w-[512px] w-full mx-auto">
      </div>

      <div className="flex flex-col items-center gap-16 text-sm">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="md:max-w-[512px] top-6 md:overflow-y-auto"
        >
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
          >
            <div className="flex flex-col gap-4 mb-10">
              <motion.h1
                initial={initial}
                animate={animate}
                transition={transition}
                className="text-2xl md:text-5xl text-neutral-900 dark:text-neutral-100 font-semibold tracking-tighter w-full"
              >
                Genesis: Digital Revolution
              </motion.h1>
              <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                className="flex gap-2"
              >
                <Pill label={"01.01.21"} />
                <Pill label={"Bahcesehir Uni"} />
                <Pill label={"Designer"} />
              </motion.div>
            </div>
            <motion.div
              initial={initial}
              animate={animate}
              transition={transition}
            >
              <GenesisContent />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex flex-col overflow-y-auto"
        >
          <motion.img
            initial={initial}
            animate={animate}
            transition={transition}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/92919d137194763.62068fcd39b86.jpg"
            alt="genesis-1"
            className="w-full rounded-md mb-4"
          />
          <motion.img
            initial={initial}
            animate={animate}
            transition={transition}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/48ae1b137194763.62068fcd38dcd.jpg"
            alt="genesis-2"
            className="w-full rounded-md mb-4"
          />
          <motion.img
            initial={initial}
            animate={animate}
            transition={transition}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/86033a137194763.62068fcd3937f.jpg"
            alt="genesis-3"
            className="w-full rounded-md mb-4"
          />
          <motion.img
            initial={initial}
            animate={animate}
            transition={transition}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/62d151137194763.62068fcd3c72e.jpg"
            alt="genesis-4"
            className="w-full rounded-md"
          />
        </motion.div>
      </div>
    </div>
  );
}
