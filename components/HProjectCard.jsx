"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

function HProjectCard({ target, icon, title, img }) {

  return (
    <Link
      href={target}
      className="flex gap-4 overflow-clip rounded-3xl cursor-pointer bg-neutral-100 dark:bg-neutral-900  border border-neutral-200 dark:border-neutral-800 shadow-md transition ease-in-out delay-50 md:hover:shadow-xl md:hover:scale-105"
    >
      <div className="h-full items-center flex flex-col justify-center">
        <h3>{title}</h3>
        <Button label={'Visit'} type={'primary'} href={target}/>
      </div>
      <Image src={img} alt={title} />
    </Link>
  );
}

export default HProjectCard;
