'use client'

import arrowUpRight from "../public/icons/arrow-up-right.svg";
import Link from "next/link";
import Image from "next/image";

export default function SectionItem({ date, projectTitle, role, target }) {
  return (
    <Link href={target} target="_blank" className="text-sm md:text-base">
      <div className="flex gap-6 cursor-pointer justify-between px-1 sm:px-3 py-2 rounded-lg hover:bg-neutral-200/50 group transition ease-in-out duration-300">
        <div className="flex gap-2 items-start">
          <div className="flex flex-col">
            <h3 className="text-neutral-900 font-semibold">{projectTitle}</h3>
            <p className="text-neutral-500">{role}</p>
          </div>
          <Image src={arrowUpRight} alt="arrow" width={'20'} height={'20'} className="hidden transition ease-in-out duration-300 group-hover:block"/>
        </div>
        <p id="date" className="text-neutral-500 text-align-right">
          {date}
        </p>
      </div>
    </Link>
  );
}
