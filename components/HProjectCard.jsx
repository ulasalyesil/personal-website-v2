"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

function HProjectCard({ target, description, title, img }) {

  return (
    <Link
      href={target}
      className="relative group flex gap-4 h-56 overflow-hidden p-4 rounded-3xl cursor-pointer bg-neutral-100 dark:bg-neutral-900  border border-neutral-200 dark:border-neutral-800 shadow-md transition ease-in-out delay-50 md:hover:shadow-xl md:hover:scale-105"
    >
      <div className="absolute bottom-0 left-0 w-full h-full -z-10 bg-gradient-to-t rounded-lg from-neutral-100 dark:from-neutral-900  transition ease-in-out delay-50 overflow-hidden inset-0" />
      <div className="h-full items-start gap-4 flex flex-col justify-center w-1/2">
        <h3 className="text-neutral-900 font-bold text-lg">{title}</h3>
        <p>{description}</p>
        <Button label={'Visit Website'} type={'secondary'} href={target}/>
      </div>
      <Image src={img} alt={title} className="absolute object-contain w-1/2 group-hover:scale-150 transition ease-in-out origin-top-left duration-300 -right-4"/>
    </Link>
  );
}

export default HProjectCard;
