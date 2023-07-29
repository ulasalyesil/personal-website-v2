'use client'

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import CommodoreContent from "./CommodoreContent.json";
import CaseStudyTitle from "@/components/CaseStudyTitle";

// images
import commodore1 from "../../public/images/commodoreImages/commodore1.jpg";
import commodore2 from "../../public/images/commodoreImages/commodore2.jpg";
import commodore3 from "../../public/images/commodoreImages/commodore3.jpg";
import commodore4 from "../../public/images/commodoreImages/commodore4.jpg";
import commodoreLanding from "../../public/images/commodoreImages/commodoreLanding.png";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Commodore() {
  const { initial, animate, transition } = animationConfig;

  return (
    <div className="flex flex-col gap-16 px-8 pb-8">
      <div className="flex flex-col gap-16 text-sm items-center">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="md:max-w-[512px] top-6"
        >
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
          >
            <CaseStudyTitle title={"Commodore Z Glass"} date={'June, 2022'} company={'Bahcesehir University'} role={'Designer'}/>
            <motion.div
              initial={initial}
              animate={animate}
              transition={transition}
            >
              {/* CommodoreContent */}
              <div className="text-neutral-900 dark:text-neutral-100 text-base flex flex-col gap-4">
                {CommodoreContent.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex flex-col overflow-y-auto"
        >
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            alt="commodore landing page"
            className="mb-4"
          >
            <Image src={commodoreLanding} className="w-full rounded-2xl" alt="logo"/>
          </motion.div>

          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            alt="commodore posters"
            className="w-full rounded-md mb-4"
          >
            <Image src={commodore3} alt="logo"/>
          </motion.div>

          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            alt="commodore posters"
            className="w-full rounded-md mb-4"
          >
            <Image src={commodore4} alt="logo"/>
          </motion.div>
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            alt="commodore posters"
            className="w-full rounded-md mb-4"
          >
            <Image src={commodore1} alt="logo"/>
          </motion.div>
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            alt="commodore posters"
            className="w-full rounded-md mb-4"
          >
            <Image src={commodore2} alt="logo"/>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
