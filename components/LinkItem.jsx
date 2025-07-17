'use client'
import Link from "next/link";
import TypingAnimatedText from "./TypingAnimatedText";

export default function LinkItem({ target, title, image, description }) {
    return (
      <Link
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="pr-3 flex gap-4 items-center rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition duration-300"
      >
        <div
          id="image"
          className="aspect-square p-1 m-3 bg-neutral-100/50 dark:bg-neutral-300 border border-neutral-300/50 h-12 w-12 flex items-center justify-center rounded-md"
        >
          {image}
        </div>
        <div id="content" className="py-3 w-full">
          <TypingAnimatedText text={title} className="text-neutral-900 dark:text-neutral-100 font-semibold text-sm"/>
          <p id="description" className="text-neutral-500 text-sm font-mono">
            {description}
          </p>
        </div>
      </Link>
    );
  }
  