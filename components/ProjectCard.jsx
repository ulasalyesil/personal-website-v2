"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

function ProductCard({ target, icon, title, img }) {
  return (
    <Link
      href={target}
      className="group relative overflow-hidden w-full aspect-square bg-neutral-100 dark:bg-neutral-900  p-4 rounded-3xl text-left cursor-pointer drop-shadow-md transition ease-in-out delay-50  md:hover:drop-shadow-xl md:hover:scale-105"
    >
      <Image
        src={img}
        alt={title}
        className="absolute -z-20 bg-blend-multiply w-full object-contain inset-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-neutral-100 dark:from-neutral-900 to-neutral-900/5 -z-10 overflow-hidden md:hover:scale-105 transition ease-in-out delay-50"></div>
      <div className="flex justify-between items-end h-full relative overflow-hidden">
        <h3 className="font-semibold text-neutral-500 dark:text-neutral-100">
          {title}
        </h3>
        <div className="p-2 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm hidden transition ease-in-out delay-50 group-hover:block absolute top-[2px] right-[2px] rounded-full">
          <ArrowTopRightIcon
            width={"20"}
            height={"20"}
            className=" text-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
