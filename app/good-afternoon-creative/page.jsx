'use client'

import gacWeb from "@/public/images/goodafternoon/gacWeb.png";
import banner from "@/public/images/goodafternoon/banner.png";
import Pill from "@/components/ui/Pill";
import gacContent from "./gacContent.json";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Page() {
  const { initial, animate, transition } = animationConfig;

  return (
    <div className="flex flex-col gap-16 px-8 py-8">
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
            <div className="flex flex-col gap-4 mb-10">
              <motion.h1
                initial={initial}
                animate={animate}
                transition={transition}
                className="text-2xl md:text-5xl text-neutral-900 dark:text-neutral-100 font-semibold tracking-tighter w-full sticky"
              >
                Good Afternoon Creative
              </motion.h1>
              <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                className="flex gap-2"
              >
                <Pill label={"April, 2023"} />
                <Pill label={"Freelance"} />
                <Pill label={"Web Design and Development"} />
              </motion.div>
            </div>
            <Image
              src={banner}
              alt="good afternoon"
              className="my-6 rounded-lg shadow-xl"
            />
            <motion.div
              initial={initial}
              animate={animate}
              transition={transition}
            >
              {/* Good Afternoon Creative Content */}
              <div className="text-neutral-900 dark:text-neutral-100 text-base flex flex-col gap-4">
                {gacContent.paragraphs.map((content, index) => (
                  <div key={index}>{content}</div>
                ))}
              </div>
              <div className="flex justify-start w-full my-6">
                <Button
                  label={"Visit Website"}
                  href={"https://goodafternooncreative.com"}
                  target={'_blank'}
                  type={"primary"}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          alt="Good Afternoon Creative landing page"
          className="mb-4"
        >
          <Image src={gacWeb} className="w-full rounded-2xl" alt="logo" />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
