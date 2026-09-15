"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { triggerHaptic } from "@/lib/haptics";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Résumé", href: "/ulas-alyesil-resume.pdf" },
  { label: "Lab", href: "/lab" },
  { label: "Collected", href: "/bookmarks" },
];

export default function SiteNavShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstNavRef = useRef<HTMLAnchorElement>(null);

  const toggle = () => {
    triggerHaptic("selection");
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
      setIsOpen(true);
    }
  };

  // A native modal supplies background inertness and focus containment.
  useEffect(() => {
    if (!isOpen) return;
    firstNavRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [pathname]);

  return (
    <div className="relative min-h-dvh" style={{ background: "#141417" }}>
      <dialog
        ref={dialogRef}
        aria-label="Main navigation"
        onClose={() => {
          setIsOpen(false);
          menuBtnRef.current?.focus();
        }}
        className="m-0 h-dvh max-h-none w-[min(280px,78vw)] border-0 bg-[#141417] p-0 text-[#fafafa] backdrop:bg-black/45"
      >
        <nav className="flex h-full flex-col px-4 py-6" aria-label="Main navigation">
        <div
          className="flex items-center gap-2.5 px-3 pb-8 font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: "0.08em", color: "#71717a" }}
        >
          <span className="size-2 rounded-full bg-brand" />
          ulaş alyeşil
        </div>
        {NAV_ITEMS.map((item, i) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              ref={i === 0 ? firstNavRef : undefined}
              onClick={() => {
                triggerHaptic("selection");
                dialogRef.current?.close();
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-brand focus-visible:-outline-offset-2",
                "hover:bg-white/5",
              )}
              style={{
                fontSize: 15,
                color: isActive ? "#fafafa" : "#a1a1aa",
              }}
            >
              <span
                className="size-1 rounded-full shrink-0"
                style={{
                  background: isActive ? "var(--color-brand)" : "currentColor",
                  opacity: isActive ? 1 : 0.35,
                }}
              />
              {item.label}
            </Link>
          );
        })}
        <div
          className="mt-auto px-3 font-mono"
          style={{ fontSize: 10, letterSpacing: "0.06em", color: "#52525b" }}
        >
          © 2026
        </div>
        <button
          type="button"
          onClick={toggle}
          className="mt-6 self-start rounded-lg px-3 py-2 text-sm text-[#a1a1aa] transition-colors duration-150 hover:bg-white/5 hover:text-[#fafafa]"
        >
          Close menu
        </button>
        </nav>
      </dialog>

      <div
        className="relative z-10 flex flex-col min-h-dvh bg-surface-0"
      >
        <header className="sticky top-0 z-30 h-16 sm:h-24 pointer-events-none">
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
          {/* MENU sits left, on the plane's leading edge — it stays on-screen
              and adjacent to the revealed nav when the plane slides right. */}
          <div className="relative pointer-events-auto w-full max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
            <Link
              href="/"
              onClick={() => triggerHaptic("selection")}
              className="size-8 bg-brand rounded-full hover:scale-105 transition-transform duration-150 shrink-0"
              aria-label="Home"
            />
            <button
              ref={menuBtnRef}
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-border-subtle bg-surface-0 text-text-primary font-mono uppercase cursor-pointer hover:border-border-default transition-colors duration-150"
              style={{ fontSize: 11, letterSpacing: "0.1em" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                {isOpen ? (
                  <path
                    d="M1.5 1.5l7 7M8.5 1.5l-7 7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M1 2.2h8M1 5h8M1 7.8h8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              Menu
            </button>
            <div className="ml-auto hidden items-center gap-4 text-sm text-text-secondary sm:flex">
              <Link href="/about" className="transition-colors duration-150 hover:text-text-primary">
                About
              </Link>
              <Link
                href="/ulas-alyesil-resume.pdf"
                target="_blank"
                className="transition-colors duration-150 hover:text-text-primary"
              >
                Résumé
              </Link>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
