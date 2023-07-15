'use client'

import Link from "next/link";
import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

function ProductCard({ target, icon, title, img }) {

  return (
    <Link
      href={target}
      className="group relative overflow-hidden w-full aspect-square bg-neutral-900 p-4 rounded-3xl text-left cursor-pointer drop-shadow-md transition ease-in-out delay-50 md:hover:drop-shadow-xl md:hover:scale-105"
    >
      <Image
        src={img}
        alt={title}
        className="absolute -z-20 bg-blend-multiply w-full object-contain inset-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900 to-neutral-900/5 -z-10 overflow-hidden"></div>
      <div className="flex justify-between items-end h-full relative overflow-hidden">
        <h3 className="font-medium text-neutral-100 ">{title}</h3>
        <ArrowTopRightIcon
            width={"24"}
            height={"24"}
            className="hidden transition group-hover:block absolute top-1 right-1 rounded-full text-neutral-100"
          />
      </div>
    </Link>
  );
}

export default ProductCard;
