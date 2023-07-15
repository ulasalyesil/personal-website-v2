'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LinkItem from "@/components/LinkItem";
import Header from "@/components/Header";

// icons
import { NotionLogoIcon } from "@radix-ui/react-icons";
import Cosmos from "../../public/icons/contactIcons/cosmos";

export default function Bookmarks() {

  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, type: "spring", stiffness: 25 },
  };

  return (
    <div className="flex flex-col mx-auto mt-16 sm:mt-32 px-4 max-w-[512px] gap-16">
      <motion.div
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
      ><Header /></motion.div>
      <div className="flex flex-col gap-16">
        <ol>
          <motion.li
          initial={animationConfig.initial}
          animate={animationConfig.animate}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 25}}
          >
            <LinkItem
              target={
                "https://ulasalyesil.notion.site/Design-Resources-33f5823050a34db0946a836c603b6544?pvs=4"
              }
              title={"Design Resources | Notion"}
              description={"Collecting anything related to design here"}
              image={<NotionLogoIcon width={"24"} height={"24"} />}
            />
          </motion.li>
          <motion.li
          initial={animationConfig.initial}
          animate={animationConfig.animate}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 25}}
          >
            <LinkItem
              target={"https://www.cosmos.so/ulasalyesil/_objects"}
              title={"_objects | Cosmos"}
              description={"Collecting objects in Cosmos"}
              image={
                  <Cosmos/>
              }
            />
          </motion.li>
        </ol>
      </div>
    </div>
  );
}
