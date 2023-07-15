'use client'

import React from "react";
import { TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 items-center pt-32 pb-40 justify-center w-full h-40 bottom-0 selection:text-neutral-100 selection:bg-[#FF6100]">
      <div className="text-neutral-500 flex  gap-2">
        <p>Reach me at</p>
        <a href="https://twitter.com/ulasalyesil" target="_blank">
          {/* change to next <Image/> */}
          <TwitterLogoIcon width={"24"} height={"24"} />
        </a>
        <p>or</p>
        <a href="https://linkedin.com/in/ulasalyesil" target="_blank">
          <LinkedInLogoIcon width={"24"} height={"24"} />
        </a>
      </div>
      <p className="text-neutral-500">
        Also, see my{" "}
        <a
          className="font-semibold hover:text-[#017bfc]"
          href="https://bento.me/ulas"
          target="_blank"
        >
          Bento
        </a>
      </p>
    </footer>
  );
}
