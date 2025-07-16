'use client'

import React from "react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import XIcon from "../public/icons/contactIcons/x";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 items-center pt-32 pb-80 justify-center w-full h-40 bottom-0 selection:text-neutral-100 selection:bg-[#FF6100]">
      <div className="text-neutral-500 flex  gap-2">
        <p>reach me at</p>
        <a href="https://twitter.com/ulasalyesil" target="_blank">
          {/* change to next <Image/> */}
          {/* <TwitterLogoIcon width={"24"} height={"24"} /> */}
          <XIcon  fill={'#000'}/>
        </a>
        <p>or</p>
        <a href="https://linkedin.com/in/ulasalyesil" target="_blank">
          <LinkedInLogoIcon width={"24"} height={"24"} />
        </a>
      </div>
      <p className="text-neutral-500">
        also, see my{" "}
        <a
          className="font-semibold hover:text-[#017bfc]"
          href="https://bento.me/ulas"
          target="_blank"
        >
          bento
        </a>
      </p>
      <a href="mailto:hello@ulasalyesil.com" className="text-neutral-500 font-medium hover:text-neutral-900 hover:decoration-slice">hello@ulasalyesil.com</a>
    </footer>
  );
}
