"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

function ProductCard({ target, icon, title, img }) {

  return (
    <Link
      href={target}
      className="group relative w-full aspect-square p-4 overflow-clip rounded-3xl text-left cursor-pointer bg-neutral-100 dark:bg-neutral-900  border border-neutral-200 dark:border-neutral-800 shadow-md transition ease-in-out delay-50 md:hover:shadow-xl md:hover:scale-105"
    >
      <Image
        src={img}
        alt={title}
        className="absolute object-cover inset-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t rounded-lg from-neutral-100 dark:from-neutral-900  transition ease-in-out delay-50 overflow-hidden inset-0" />
      <div className="flex justify-between items-end h-full relative overflow-hidden">
        <h3 className="font-semibold text-neutral-500 dark:text-neutral-100">
          {title}
        </h3>
        <div className="p-2 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm hidden transition ease-in-out delay-50 group-hover:block hover:bg-neutral-100 dark:hover:bg-neutral-800 absolute top-[2px] right-[2px] rounded-full">
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
