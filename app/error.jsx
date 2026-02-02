"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">
          Oops!
        </h1>
        <h2 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">
          Something went wrong
        </h2>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-md">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#FF5701] text-white rounded-full hover:bg-[#e64e00] transition-colors font-medium"
      >
        Try again
      </button>
    </div>
  );
}
