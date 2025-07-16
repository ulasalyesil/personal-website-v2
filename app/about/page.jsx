"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import otherData from "@/public/data/others.json";

import Footer from "@/components/Footer";
import picture from "../../public/images/picture.jpeg";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import MusicPlayer from "@/components/playground/musicPlayer";
import Contacts from "@/components/Contacts";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

const createAnimatedParagraph = (text, delay) => {
  const { initial, animate, transition } = animationConfig;

  return (
    <motion.p
      initial={initial}
      animate={animate}
      transition={{ ...transition, delay: 0.4 + delay }}
      className="text-neutral-900 dark:text-neutral-100 text-sm md:text-3xl"
    >
      {text}
    </motion.p>
  );
};

const content = [
  {
    text: "Hey, I’m Ulaş — a designer working across product, visual systems, and interactive experiences. I split my time between Berlin and Istanbul, collaborating on early-stage products and self-initiated creative work.",
    delay: 0.6,
  },
  {
    text: "Most recently, I was the founding designer at a health tech startup in the US, where I helped take the product from zero to launch — shaping the design system, product UX, and brand identity. Now, I’m freelancing while rebuilding my portfolio and exploring new full-time opportunities.",
    delay: 0.8,
  },
  {
    text: "I’m interested in the overlap between design, code, and culture. Outside of product work, I produce music, experiment with generative visuals, and build interactive prototypes — often as a way to think through emotion, structure, and rhythm.",
    delay: 1.0,
  },
  {
    text: "I care about clarity, intention, and craft — and I’m drawn to ideas that challenge conventional patterns. Whether it’s a tool, a system, or a story, I try to build things that feel both thoughtful and alive.",
    delay: 1.2,
  },
];


export default function About() {
  return (
    <div>
      <div className="flex flex-col mx-auto px-4 md:px-auto w-full md:w-[1200px] gap-4 text-sm md:text-base selection:bg-[#FF6100]">
        <a 
        target="blank_"
        href="https://www.linkedin.com/in/ulasalyesil"
        className="h-80 w-[512px] hover:scale-105 transition rounded-sm overflow-hidden flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 25,
            }}
          >
            <Image
              src={picture}
              priority={true}
              className="w-full object-contain"
              alt="ulaş"
            />
          </motion.div>
        </a>
        <motion.div
          className="flex justify-between w-[512px] items-center my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
            type: "spring",
            stiffness: 25,
          }}
        >
          <h2 className="text-neutral-500 dark:text-neutral-300 text-xl font-mono">
            about me
          </h2>

          <Button
            label={"See Resume"}
            target={"_blank"}
            type={"secondary"}
            href={
              "https://drive.google.com/file/d/1e-gnjC4ZW6X3jsW_MZ45JaVRhC7rUONy/view?usp=sharing"
            }
          />
        </motion.div>
        {content.map((item, index) => (
          <React.Fragment key={index}>
            {createAnimatedParagraph(item.text, item.delay)}
          </React.Fragment>
        ))}
        <div className="my-4 flex flex-col gap-2">
          <h3 className="font-semibold mt-8 dark:text-neutral-100">Reach me</h3>
          <Contacts />
        </div>
      </div>
      <Footer />
    </div>
  );
}
