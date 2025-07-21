"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import otherData from "@/public/data/others.json";

import Footer from "@/components/Footer";
import picture from "../../public/images/picture.jpeg";

import Button from "@/components/ui/Button";
import Contacts from "@/components/Contacts";
// Import the external TimeZoneCard component
import TimeZoneCard from "@/components/TimeZoneCard";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

// Profile Image Component
const ProfileImage = () => (
  <div className="w-48 h-48 mix-blend-difference rounded-md overflow-hidden">
    <Image
      src={picture}
      alt="Ulaş"
      className="w-full h-full object-cover"
      width={192}
      height={192}
    />
  </div>
);

// Generic Hoverable Word Component with link support
const HoverableWord = ({ word, contentType, onHover, onLeave, link }) => (
  <Link
    href={link}
    target="_blank"
    className="relative inline-block cursor-pointer group"
    onMouseEnter={() => onHover(contentType)}
    onMouseLeave={onLeave}
  >
    {/* Background DIV for hover state */}
    <div className="absolute inset-0 bg-[#FF5701] rounded-md scale-x-110 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    {/* Word content with padding */}
    <span className="relative z-10">{word}</span>
  </Link>
);

// Define hover content mapping now using external TimeZoneCard and links
const hoverContent = {
  Ulaş: {
    component: ProfileImage,
    type: "profile",
    link: "https://www.linkedin.com/in/ulasalyesil",
  },
  Berlin: {
    component: () => <TimeZoneCard city="berlin" />,
    type: "timezone",
    link: "https://en.wikipedia.org/wiki/Berlin",
  },
  Istanbul: {
    component: () => <TimeZoneCard city="istanbul" />,
    type: "timezone",
    link: "https://en.wikipedia.org/wiki/Istanbul",
  },
};

const createAnimatedParagraph = (text, delay, onWordHover, onWordLeave) => {
  const { initial, animate, transition } = animationConfig;

  // Process text to find and replace hoverable words
  const processText = (text) => {
    const words = Object.keys(hoverContent);
    const pattern = new RegExp(`(${words.join("|")})`, "gi");
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      const matchedWord = words.find(
        (word) => part.toLowerCase() === word.toLowerCase()
      );

      if (matchedWord) {
        const { link } = hoverContent[matchedWord];
        return (
          <HoverableWord
            key={index}
            word={part}
            contentType={matchedWord}
            link={link}
            onHover={onWordHover}
            onLeave={onWordLeave}
          />
        );
      }
      return part;
    });
  };

  return (
    <motion.p
      initial={initial}
      animate={animate}
      transition={{ ...transition, delay: 0.4 + delay }}
      className="text-neutral-900 dark:text-neutral-100 text-2xl md:text-3xl relative"
    >
      {processText(text)}
    </motion.p>
  );
};

const content = [
  {
    text: "Hey, I'm Ulaş — a designer working across product, visual systems, and interactive experiences. I split my time between Berlin and Istanbul, collaborating on early-stage products and self-initiated creative work.",
    delay: 0.6,
  },
  {
    text: "Most recently, I was the founding designer at a health tech startup in the US, where I helped take the product from zero to launch — shaping the design system, product UX, and brand identity. Now, I'm freelancing while rebuilding my portfolio and exploring new full-time opportunities.",
    delay: 0.8,
  },
  {
    text: "I'm interested in the overlap between design, code, and culture. Outside of product work, I produce music, experiment with generative visuals, and build interactive prototypes — often as a way to think through emotion, structure, and rhythm.",
    delay: 1.0,
  },
  {
    text: "I care about clarity, intention, and craft — and I'm drawn to ideas that challenge conventional patterns. Whether it's a tool, a system, or a story, I try to build things that feel both thoughtful and alive.",
    delay: 1.2,
  },
];

export default function About() {
  const [showContent, setShowContent] = useState(false);
  const [activeContentType, setActiveContentType] = useState(null);

  const handleWordHover = (contentType) => {
    setShowContent(true);
    setActiveContentType(contentType);
  };

  const handleWordLeave = () => {
    setShowContent(false);
    setActiveContentType(null);
  };

  // Render the appropriate content based on the active type
  const renderHoverContent = () => {
    if (!activeContentType || !hoverContent[activeContentType]) return null;
    const ContentComponent = hoverContent[activeContentType].component;
    return <ContentComponent />;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col mx-auto sm:px-4 md:px-auto w-full md:w-[1200px] gap-4 text-sm md:text-base selection:bg-[#FF6100]">
        <motion.div
          className="flex justify-between w-full items-center my-6"
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

        <div className="relative text-container">
          {content.map((item, index) => (
            <React.Fragment key={index}>
              {createAnimatedParagraph(
                item.text,
                item.delay,
                handleWordHover,
                handleWordLeave
              )}
            </React.Fragment>
          ))}

          {/* Hover Content Popup */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute pointer-events-none z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {renderHoverContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="my-4 flex flex-col gap-2">
          <h3 className="font-semibold font-mono text-neutral-500 mt-8 dark:text-neutral-100">
            Reach me
          </h3>
          <Contacts />
        </div>
      </div>
      <Footer />
    </div>
  );
}
