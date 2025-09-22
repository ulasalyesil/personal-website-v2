import Link from "next/link";
import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export default function ProjectCard({ title, description, img, target }) {
  return (
    <Link
      href={target}
      className="group w-full flex flex-col gap-2 p-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-md transition ease-in-out duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="h-56 sm:h-[368px] overflow-hidden p-4 bg-neutral-100 dark:bg-neutral-900 rounded-md">
        <Image
          src={img}
          alt={title}
          className="w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <h3 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="font-mono text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
      <div className="gap-2 p-2 z-20 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm hidden transition ease-in-out group-hover:block hover:bg-neutral-100 dark:hover:bg-neutral-800 absolute top-6 right-6 rounded-full">
        <ArrowTopRightIcon
          width={"20"}
          height={"20"}
          className="text-neutral-900 dark:text-neutral-100"
        />
      </div>
    </Link>
  );
}
