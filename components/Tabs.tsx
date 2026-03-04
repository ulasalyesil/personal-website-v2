"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface Tab {
  label: string;
  href: string;
}

const tabs: Tab[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Bookmarks", href: "/bookmarks" },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1" role="navigation" aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full transition-colors duration-150",
              isActive
                ? "bg-surface-2 text-text-primary"
                : "text-text-tertiary hover:text-text-secondary hover:bg-surface-1",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
