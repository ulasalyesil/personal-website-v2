"use client";

import Link from "next/link";

function Button({ type, label, href, target }) {
  const states = {
    primary:
      "h-8 flex items-center text-neutral-100  md:text-base bg-neutral-700 hover:bg-neutral-900 font-medium rounded-xs text-sm px-4 py-2 text-center dark:bg-neutral-700 dark:hover:bg-neutral-500 dark:focus:ring-neutral-800 transition ease-in-out",
      primaryLong:
      "h-8 flex items-center text-neutral-100  md:text-base bg-neutral-700 hover:bg-neutral-900 w-full font-medium rounded-xs text-sm px-4 py-2 text-center dark:bg-neutral-700 dark:hover:bg-neutral-500 dark:focus:ring-neutral-800 transition ease-in-out",
    secondary:
      "h-8 flex items-center text-neutral-500 bg-neutral-200 dark:bg-neutral-900 dark:border border-neutral-700 text-xs md:text-base rounded-xs text-sm font-medium px-4 py-2 hover:text-neutral-700 hover:bg-neutral-100 focus:z-10 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/50 transition ease-in-out",
  };

  return (
    <Link href={href} target={target}>
      <button
        data-modal-hide="defaultModal"
        type="button"
        className={states[type]}
      >
        {label}
      </button>
    </Link>
  );
}

export default Button;
