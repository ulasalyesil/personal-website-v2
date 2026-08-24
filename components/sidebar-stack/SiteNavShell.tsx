"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { triggerHaptic } from "@/lib/haptics";
import { STACK_SPRING, STACK_SCALE } from "@/lib/animations";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Lab", href: "/lab" },
  { label: "Collected", href: "/bookmarks" },
];

export default function SiteNavShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarW, setSidebarW] = useState(280);
  const [originY, setOriginY] = useState(0);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstNavRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  // The translate distance must match the rendered sidebar width
  // (min(280px, 78vw) on small screens).
  useEffect(() => {
    const measure = () => setSidebarW(sidebarRef.current?.offsetWidth ?? 280);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const toggle = () => {
    triggerHaptic("selection");
    if (!isOpen) {
      // The plane is document-tall; scale around the center of what's on
      // screen, not the element, or the motion drifts with scroll position.
      setOriginY(window.scrollY + window.innerHeight / 2);
    }
    setIsOpen((v) => !v);
  };

  // Esc closes; body scroll locks while open (the lab modal's conventions).
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Close when the route changes (covers back/forward, not just link clicks).
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Focus follows the menu: into the nav on open, back to the toggle on close.
  useEffect(() => {
    if (isOpen) {
      firstNavRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      menuBtnRef.current?.focus();
      wasOpen.current = false;
    }
  }, [isOpen]);

  const spring = reduceMotion ? { duration: 0 } : STACK_SPRING;

  return (
    <div className="relative min-h-dvh" style={{ background: "#141417" }}>
      {/* Base layer: the navigation. Fixed palette, beneath the page plane. */}
      <nav
        ref={sidebarRef}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        className="fixed inset-y-0 left-0 flex flex-col py-6 px-4"
        style={{ width: "min(280px, 78vw)" }}
      >
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
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                triggerHaptic("selection");
                setIsOpen(false);
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
      </nav>

      {/* Top layer: the page plane. Springs aside to reveal the nav. */}
      <motion.div
        className="relative z-10 flex flex-col min-h-dvh bg-surface-0"
        initial={false}
        animate={{
          x: isOpen ? sidebarW : 0,
          scale: isOpen ? STACK_SCALE : 1,
          borderRadius: isOpen ? 16 : 0,
        }}
        transition={spring}
        style={{
          // originX/originY is framer's native origin API — a raw
          // transformOrigin string would fight its transform pipeline.
          originX: 0.5,
          originY: `${originY}px`,
          boxShadow: "0 18px 60px rgba(0,0,0,0.4)",
          overflow: isOpen ? "clip" : undefined,
        }}
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
          </div>
        </header>

        {children}

        {/* While open, the pushed-aside page acts as the scrim. The header sits
            above this overlay so Menu and the brand dot stay clickable. */}
        {isOpen && (
          <div
            className="absolute inset-0 z-20"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
        )}
      </motion.div>
    </div>
  );
}
