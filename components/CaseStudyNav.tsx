"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface NavSection {
  id: string;
  title: string;
}

/**
 * Section navigation for a long case study: a sticky rail at xl and up, a
 * compact expandable bar below that, and a reading-progress line pinned under
 * the page nav. Every part of it derives from the `section` blocks, so there is
 * no separate list to keep in sync.
 */
export default function CaseStudyNav({ sections }: { sections: NavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  /** False until the reader is actually inside a section, so the compact bar
   *  never sits above the page title. */
  const [engaged, setEngaged] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function measure() {
      ticking.current = false;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);

      // The active section is the last one whose heading has passed the nav.
      let current = sections[0]?.id ?? "";
      let reached = false;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 96) {
          current = section.id;
          reached = true;
        }
      }
      setActiveId(current);
      setEngaged(reached);
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const activeTitle = sections.find((s) => s.id === activeId)?.title ?? sections[0]?.title;

  return (
    <>
      {/* Reading progress, on the bottom edge of the page nav. */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-[calc(3.5rem-2px)] z-20 h-0.5 bg-brand"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Compact section bar, below xl. Fixed rather than sticky so that
          appearing and disappearing never reflows the article. */}
      <div
        className={cn(
          "fixed inset-x-0 top-14 z-10 bg-surface-0/90 backdrop-blur transition-[opacity,transform] duration-200 ease-out xl:hidden",
          engaged
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        aria-hidden={!engaged}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 text-left sm:px-6"
        >
          <span className="truncate text-caption text-text-secondary">{activeTitle}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={cn(
              "shrink-0 text-text-tertiary transition-transform duration-150",
              open && "rotate-180",
            )}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {open && (
          <ol className="mx-auto max-h-[60vh] w-full max-w-6xl overflow-y-auto border-b border-border-subtle bg-surface-0 px-4 py-2 sm:px-6">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex gap-3 py-2 text-caption transition-colors duration-150",
                    section.id === activeId ? "text-text-primary" : "text-text-secondary",
                  )}
                >
                  <span className="font-mono tabular-nums text-text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Sticky rail, xl and up. */}
      <nav aria-label="Sections" className="hidden xl:block">
        <ol className="sticky top-24 space-y-2.5">
          {sections.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "flex gap-2.5 text-caption leading-snug transition-colors duration-150",
                  section.id === activeId
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary",
                )}
              >
                <span
                  className={cn(
                    "font-mono tabular-nums",
                    section.id === activeId ? "text-brand" : "text-text-tertiary",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-balance">{section.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
