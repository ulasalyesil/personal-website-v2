'use client'

import React from "react";
import Pill from "./ui/Pill";
import Header from "./Header";

export default function Article({ articleData }) {
  const { title, tags, content } = articleData;

  return (
    <div className="flex flex-col pt-8 px-4 md:px-20 gap-20 text-sm md:text-base">
      <Header />
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-5xl text-neutral-900 font-mono w-full">{title}</h1>
        <div className="flex gap-2 w-max mb-8">
          {tags.map((tag, index) => (
            <Pill key={index} label={tag} />
          ))}
        </div>
        <article className="text-neutral-900 flex flex-col gap-4 font-mono selection:bg-[#017bfc]">
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </div>
    </div>
  );
}
