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
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl font-bold text-text-primary">Oops!</h1>
        <h2 className="text-xl font-medium text-text-secondary">
          Something went wrong
        </h2>
      </div>
      <p className="text-text-tertiary text-center max-w-md text-pretty">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-brand text-white rounded-full hover:bg-brand-hover transition-colors duration-150 font-medium"
      >
        Try again
      </button>
    </div>
  );
}
