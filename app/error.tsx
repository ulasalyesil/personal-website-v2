"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="px-[var(--gutter)] py-[clamp(4rem,12vw,9rem)]">
      <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-[560] leading-[0.85] tracking-[-0.06em] text-text-primary">
        Oops!
      </h1>
      <h2 className="mt-8 text-[clamp(1.5rem,3vw,2.5rem)] font-[560] tracking-[-0.03em] text-text-primary">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-[1.0625rem] text-text-secondary text-pretty">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brand px-5 text-[0.9375rem] font-[550] text-white transition-[background-color,transform] duration-150 hover:bg-brand-hover active:scale-[0.97] dark:text-[#0a0a0a]"
      >
        Try again
      </button>
    </div>
  );
}
