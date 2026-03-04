"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { triggerHaptic } from "@/lib/haptics";

const tabs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Saved", href: "/bookmarks" },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Main navigation"
    >
      <div
        className="m-3 flex items-center gap-1 px-2 py-2 rounded-full border border-border-subtle/60"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background:
            "color-mix(in srgb, var(--color-surface-0) 85%, transparent)",
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => triggerHaptic("selection")}
              className={cn(
                "text-sm px-3 py-1.5 rounded-full transition-colors duration-150",
                isActive
                  ? "bg-surface-2 text-text-primary"
                  : "text-text-tertiary",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
