"use client";

import Link from "next/link";
import { isPlainClick, useRouteTransition } from "@/lib/useRouteTransition";

/**
 * Leaving a case study runs the same morph that opened it, in reverse. An
 * entrance that has no matching exit is the thing that makes a transition feel
 * decorative rather than spatial.
 */
export default function BackLink({ href = "/", label = "Back" }: { href?: string; label?: string }) {
  const navigate = useRouteTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (!isPlainClick(e)) return;
        e.preventDefault();
        navigate(href);
      }}
      className="flex items-center gap-2 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M10 12L6 8l4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Link>
  );
}
