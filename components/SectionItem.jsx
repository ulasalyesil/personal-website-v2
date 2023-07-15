'use client'

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import arrowUpRight from "../public/icons/arrow-up-right.svg";
import DescriptionHeadingText from "./DescriptionHeadingText";

export default function SectionItem({ date, projectTitle, role, target }) {
  return (
    <Link href={target} target="_blank" className="text-sm md:text-base">
      <div className="flex gap-6 cursor-pointer justify-between px-1 sm:px-3 py-2 rounded-lg hover:bg-neutral-200/50 group transition ease-in-out duration-300">
        <div className="flex gap-2 items-start">
          <div className="flex flex-col">
            <DescriptionHeadingText text={projectTitle} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, type: "spring", damping: 50, stiffness: 100, delay: 1.0 }}
              className="text-neutral-500"
            >
              {role}
            </motion.p>
          </div>
          <Image
            src={arrowUpRight}
            alt="arrow"
            width={"20"}
            height={"20"}
            className="hidden transition ease-in-out duration-300 group-hover:block"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3.5, delay: 1.0 }}
          id="date"
          className="text-neutral-500 text-align-right"
        >
          {date}
        </motion.p>
      </div>
    </Link>
  );
}
