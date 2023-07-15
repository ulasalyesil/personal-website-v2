'use client'

import Link from "next/link";

function Button({ type, label, href, target }) {
  const states = {
    primary:
      "h-8 flex items-center text-neutral-100 text-xs md:text-base bg-neutral-700 hover:bg-neutral-900 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-neutral-600 dark:hover:bg-neutral-500 dark:focus:ring-neutral-800 transition ease-in-out",
    secondary:
      "h-8 flex items-center text-neutral-500 text-xs md:text-base rounded-lg border border-neutral-300 text-sm font-medium px-4 py-2 hover:text-neutral-700 hover:bg-neutral-100 focus:z-10 dark:text-neutral-500 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-800 transition ease-in-out",
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
