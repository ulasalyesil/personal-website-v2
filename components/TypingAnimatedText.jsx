'use client';

import { motion } from "framer-motion";
import React from "react";
import { useState, useEffect } from "react";

export default function TypingAnimatedText({ text }) {
  const [displayedText, setDisplayedText] = useState("");
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
  });

  return (
    <div>
      <motion.span
        className="h-16 max-w-[32rem] leading-normal text-muted-foreground sm:text-base sm:leading-8 dark:text-neutral-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true}}
        transition={{ duration: 2 }}
      >
        {displayedText ? displayedText : text}
      </motion.span>
      <motion.span
        className="ml-1 inline-flex h-[22px] w-[2px] animate-blink rounded-full bg-neutral-200 align-sub opacity-75 animate-pulse"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true}}
        transition={{ duration: 2 }}
      />
    </div>
  );
}