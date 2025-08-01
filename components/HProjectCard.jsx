"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

function HProjectCard({
  target,
  description,
  title,
  projectType,
  img,
  buttonLabel,
}) {
  return (
    <Link
      href={target}
      className="relative group flex gap-4 h-40 sm:h-56 w-full overflow-hidden p-4 rounded-sm  border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 transition ease-in-out delay-50 md:hover:shadow-xl md:hover:scale-105"
    >
      <div className="absolute bottom-0 left-0 w-full h-full -z-10 bg-gradient-to-t transition ease-in-out delay-50 overflow-hidden inset-0" />
      <div className="h-full items-start gap-2 flex flex-col justify-center w-1/2">
        <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-sm sm:text-lg">
          {title}
        </h3>
        <div className="p-2 z-20 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm hidden transition ease-in-out  group-hover:block hover:bg-neutral-100 dark:hover:bg-neutral-800 absolute top-4 right-4 rounded-full">
          <ArrowTopRightIcon
            width={"20"}
            height={"20"}
            className=" text-neutral-900 dark:text-neutral-100"
          />
        </div>
        <p className="text-xs text-neutral-500 sm:text-sm">{description}</p>
        <div className="my-2 hidden sm:block">
          <Button label={buttonLabel} type={"secondary"} href={target} />
        </div>
      </div>
      <Image
        src={img}
        alt={title}
        className="object-contain w-1/2 group-hover:scale-150 transition duration-500 ease-out origin-top-left -right-4"
      />
    </Link>
  );
}

export default HProjectCard;
