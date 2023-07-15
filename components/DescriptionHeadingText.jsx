'use client';

import { motion } from "framer-motion";
import React from "react";
import { useState, useEffect } from "react";

export default function DescriptionHeadingText() {
  const text = "I design interfaces to create memorable feelings for humans.";
  const [displayedText, setDisplayedText] = React.useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, 50);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i]);

  return (
    <div>
      <motion.span
        className="h-16 max-w-[32rem] leading-normal text-muted-foreground sm:text-base sm:leading-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {displayedText ? displayedText : "I design interfaces to create memorable feelings for humans."}
      </motion.span>
      <motion.span
        className="ml-1 inline-flex h-[22px] w-[2px] animate-blink rounded-full bg-current align-sub opacity-75"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}