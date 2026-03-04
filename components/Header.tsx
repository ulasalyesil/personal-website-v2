"use client";

import Link from "next/link";
import Tabs from "./Tabs";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export default function Header() {
  const scrolled = useScrolled(60);

  return (
    <header className="sticky top-0 z-10 h-24 pointer-events-none">
      {/* Progressive blur layers */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-surface-0) 0%, transparent 100%)",
          opacity: 0.8,
        }}
      />

      {/* Content row */}
      <div
        className={cn(
          "relative pointer-events-auto w-full max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center",
          scrolled ? "gap-4 justify-start" : "justify-between",
        )}
      >
        <Link
          href="/"
          className="size-8 bg-brand rounded-full hover:scale-105 transition-transform duration-150 shrink-0"
          aria-label="Home"
        />
        <Tabs />
      </div>
    </header>
  );
}
