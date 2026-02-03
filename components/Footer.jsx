'use client'

import React from "react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import XIcon from "../public/icons/contactIcons/x";
import { SOCIAL_LINKS, EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 items-center pt-32 pb-80 justify-center w-full h-40 bottom-0 selection:text-neutral-100 selection:bg-brand-selection">
      <div className="text-neutral-500 flex  gap-2">
        <p>reach me at</p>
        <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
          <XIcon fill="#000" />
        </a>
        <p>or</p>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInLogoIcon width="24" height="24" />
        </a>
      </div>
      <p className="text-neutral-500">
        also, see my{" "}
        <a
          className="font-semibold hover:text-[#017bfc]"
          href={SOCIAL_LINKS.bento}
          target="_blank"
          rel="noopener noreferrer"
        >
          bento
        </a>
      </p>
      <a href={SOCIAL_LINKS.email} className="text-neutral-500 font-medium hover:text-neutral-900 hover:decoration-slice">{EMAIL}</a>
    </footer>
  );
}

