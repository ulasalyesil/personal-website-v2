'use client'

import React from "react";
import { motion } from "framer-motion";
import GenesisContent from "./GenesisContent";
import CaseStudyTitle from "@/components/CaseStudyTitle";
const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Page() {
  const { initial, animate, transition } = animationConfig;

  return (
    <div className="flex flex-col gap-16 px-8 pb-8">
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
            <CaseStudyTitle title={"Genesis: Digital Revolution"} date={'January, 2021'} company={'Bahcesehir University'} role={'Designer'}/>
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
