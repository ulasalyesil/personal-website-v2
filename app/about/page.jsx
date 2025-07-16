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
      className="text-neutral-900 dark:text-neutral-100 text-sm md:text-base"
    >
      {text}
    </motion.p>
  );
};

const content = [
  {
    text: "Hello, I'm Ulaş, a dedicated product designer from Istanbul, graduated with a degree in Visual Communication Design from Bahcesehir University. My design journey began at Jotform as a Jr. Product Designer, where I learned a lot, met inspiring people, and crafted memorable designs. Now, as a Product Designer at Peaka, I'm focused on creating intuitive interfaces that enhance human experiences.",
    delay: 0.6,
  },
  {
    text: "My creative spark was ignited by music at a young age, as I explored the rhythmic realms through guitar and drums. The enchanting world of electronic music, especially the works of Daft Punk, drew me in further. Their incredible visuals introduced me to the fascinating world of visual arts, which led me to experiment with filmmaking and photography during my teenage years. Everywhere I went, my camera accompanied me, capturing the rhythm of life unfolding around me.",
    delay: 0.8,
  },
  {
    text: "These adventures in music and visuals eventually steered me towards user experience and user interface design during my university years. Now, my heart and soul are devoted to crafting products that not only resonate with users but also fulfill my creative aspirations.",
    delay: 1.0,
  },
  {
    text: "Beyond the design domain, you can catch me strumming a tune or exploring the latest in technology, always eager to learn and grow. I cherish the power of design as a medium for fostering memorable human interactions and am on a continual quest to blend aesthetics with functionality in every design I craft.",
    delay: 1.2,
  }
];

export default function About() {
  return (
    <div>
      <div className="flex flex-col mx-auto px-4 md:px-auto w-full md:w-[1200px] gap-4 text-sm md:text-base selection:bg-[#FF6100]">
        <div className="h-80 w-[512px] rounded-xl overflow-hidden flex flex-col justify-center">
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
        <div className="my-4 flex flex-col gap-2">
          <h3 className="font-semibold mt-8 dark:text-neutral-100">Reach me</h3>
          <Contacts />
        </div>
      </div>
      <Footer />
    </div>
  );
}
