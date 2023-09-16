"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Footer from "@/components/Footer";
import picture from "../../public/images/picture.jpeg";
import Button from "@/components/ui/Button";
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
      className="text-neutral-900 text-justify dark:text-neutral-100 text-sm md:text-base"
    >
      {text}
    </motion.p>
  );
};

const content = [
  {
    text: "*It’s all by design. The choices you make. So that makes everyone design at some point. For themselves. What differentiates a designer is that they design for humans. Not themselves. This is what I try to do, design interfaces to create memorable experiences for humans.",
    delay: 0.6,
  },
  {
    text: "Hello, I’m Ulaş. Freshly graduated from Visual Communication Design of Bahcesehir University, based in Istanbul. I’m currently at Jotform as a Jr. Product Designer.",
    delay: 0.8,
  },
  {
    text: "My interest in design started some time ago, but I would like to talk about how I landed here first",
    delay: 1.0,
  },
  {
    text: "I was born in İstanbul, Turkey. I first met music, which is the biggest thing that led me to where I am today.",
    delay: 1.2,
  },
  {
    text: "Music showed me what I love; creating",
    delay: 1.4,
  },
  {
    text: "I played the guitar, drums for a long time. At some point, I discovered electronic music from god-like musicians; Daft Punk",
    delay: 1.6,
  },
  {
    text: "Amazing visuals and cinematography of Daft Punk introduced me to visual arts.",
    delay: 1.8,
  },
  {
    text: "I got a camera in my hands, I shot cover videos, I tried making small films by capturing what’s happening around me. I was around 15-16, and I loved working with visuals. Merging music and visuals excited me. Everywhere I went, I had my camera with me.",
    delay: 2.0,
  },
  {
    text: "After a couple of years, I started at Bahcesehir University, Visual Communication Design.",
    delay: 2.2,
  },
  {
    text: "There, I tried many things until I found user experience and user interface design. Now my full focus is on creating products for humans to enjoy while fulfilling my soul.",
    delay: 2.4,
  },
  {
    text: "I love technology, I love design, I love music, I love creating. I’m always looking to grow and learn.",
    delay: 2.6,
  },
];

export default function About() {
  return (
    <div>
      <div className="flex flex-col mx-auto px-4 md:px-auto w-full md:w-[512px] gap-4 text-sm md:text-base selection:bg-[#FF6100]">
        <div className="h-80 rounded-xl overflow-hidden flex flex-col justify-center">
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
        </div>
        <motion.div
          className="flex justify-between items-center my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
            type: "spring",
            stiffness: 25,
          }}
        >
          <h1 className="text-neutral-500 dark:text-neutral-300 text-2xl font-semibold">
            About Me
          </h1>

          <Button
            label={"See Resume"}
            target={"_blank"}
            type={"secondary"}
            href={
              "https://drive.google.com/file/d/1I7juvOpvtkp4Y9ZbbVneDIsW-XW-D_Jm/view?usp=drive_link"
            }
          />
        </motion.div>
        {content.map((item, index) => (
          <React.Fragment key={index}>
            {createAnimatedParagraph(item.text, item.delay)}
          </React.Fragment>
        ))}
        <h3 className="font-semibold mt-8 dark:text-neutral-100">Reach me</h3>
        <Contacts />
      </div>
      <Footer />
    </div>
  );
}
