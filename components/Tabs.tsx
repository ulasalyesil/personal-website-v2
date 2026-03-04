"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/hooks/useScrolled";
import { triggerHaptic } from "@/lib/haptics";

interface Tab {
  label: string;
  compactLabel?: string;
  href: string;
}

const tabs: Tab[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Bookmarks", compactLabel: "Saved", href: "/bookmarks" },
];

export default function Tabs() {
  const pathname = usePathname();
  const scrolled = useScrolled(60);

  return (
    <nav className="flex gap-1" role="navigation" aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);

        const displayLabel = scrolled && tab.compactLabel ? tab.compactLabel : tab.label;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            onClick={() => triggerHaptic("selection")}
            className={cn(
              "text-sm rounded-full transition-[padding,colors] duration-200",
              scrolled ? "px-2 py-1" : "px-3 py-1.5",
              isActive
                ? "bg-surface-2 text-text-primary"
                : "text-text-tertiary hover:text-text-secondary hover:bg-surface-1 mix-blend-difference",
            )}
          >
            {displayLabel}
          </Link>
        );
      })}
    </nav>
  );
}
