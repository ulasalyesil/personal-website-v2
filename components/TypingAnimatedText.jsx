'use client';

import { motion } from "framer-motion";
import React from "react";
import { useState, useEffect } from "react";

export default function TypingAnimatedText({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= text.length) return;

    const typingEffect = setInterval(() => {
      setDisplayedText((prevState) => prevState + text.charAt(i));
      setI((prevI) => prevI + 1);
    }, 50);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i, text]);

  return (
    <div>
      <motion.span
        className="h-16 max-w-[32rem] leading-normal font-medium text-muted-foreground sm:text-base sm:leading-8 dark:text-neutral-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true}}
        transition={{ duration: 2 }}
      >
        {displayedText ? displayedText : text}
      </motion.span>
      <motion.span
        className="ml-1 inline-flex h-[22px] w-[2px] animate-blink rounded-full bg-neutral-200 dark:bg-neutral-800 align-sub opacity-75 animate-pulse"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true}}
        transition={{ duration: 2 }}
      />
    </div>
  );
}