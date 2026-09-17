"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface NavSection {
  id: string;
  title: string;
}

/**
 * Section navigation for a long case study: a compact expandable bar that
 * appears once the reader is inside the first section, and a reading-progress
 * line pinned under the page nav. The left rail of the page belongs to the
 * section labels now, so the list lives here at every width. Every part of it derives from the `section` blocks, so there is
 * no separate list to keep in sync.
 */
export default function CaseStudyNav({ sections }: { sections: NavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  /** False until the reader is actually inside a section, so the compact bar
   *  never sits above the page title. */
  const [engaged, setEngaged] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  /**
   * Section tops in document coordinates, plus the page's scrollable height.
   *
   * The scroll handler used to call `getBoundingClientRect()` on every section
   * on every frame and then set three pieces of React state, so one scroll
   * frame cost N forced layouts plus a full re-render of the nav. Measuring
   * once and comparing numbers per frame is the same answer for no layout
   * work, and unlike an IntersectionObserver it stays correct across an
   * instant jump: a section that goes from above the viewport to below it
   * never crosses a boundary, so an observer would never hear about it.
   *
   * Re-measured whenever the document resizes, which covers font swap, images
   * settling, and orientation changes.
   */
  const layout = useRef<{ tops: number[]; scrollable: number }>({
    tops: [],
    scrollable: 0,
  });
  /** Last width written to the bar, so an unchanged frame writes nothing. */
  const lastWidth = useRef(-1);

  useEffect(() => {
    function measureLayout() {
      // All reads, batched, no writes in between.
      const scrollY = window.scrollY;
      const tops = sections.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + scrollY : Infinity;
      });
      layout.current = {
        tops,
        scrollable: document.documentElement.scrollHeight - window.innerHeight,
      };
      update();
    }

    /** Pure arithmetic against the cached layout: no DOM reads. */
    function update() {
      ticking.current = false;
      const { tops, scrollable } = layout.current;
      const scrollY = window.scrollY;
      // The nav line sits 96px down, so a section counts as reached once its
      // top has passed that line. Same threshold the rect test used.
      const line = scrollY + 96;

      let current = -1;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= line) current = i;
        else break;
      }

      // Passing the same value is a no-op in React, so these are only a
      // re-render on an actual section change, not once per frame.
      setActiveId(
        current >= 0 ? sections[current].id : (sections[0]?.id ?? "")
      );
      setEngaged(current >= 0);

      const bar = progressRef.current;
      if (bar) {
        const progress =
          scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;
        // Two decimals is finer than a pixel on any real viewport. Rounding
        // first means a frame that would not move the bar writes nothing, and
        // so invalidates no style.
        const width = Math.round(progress * 10000) / 100;
        if (width !== lastWidth.current) {
          lastWidth.current = width;
          bar.style.width = `${width}%`;
        }
      }
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    }

    measureLayout();

    const ro = new ResizeObserver(measureLayout);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const activeTitle =
    sections.find((s) => s.id === activeId)?.title ?? sections[0]?.title;

  return (
    <>
      {/* Reading progress, on the bottom edge of the page nav. */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed left-0 top-[calc(3.5rem-2px)] z-40 h-0.5 bg-brand"
        style={{ width: 0 }}
      />

      {/* Fixed rather than sticky so that appearing and disappearing never
          reflows the article. */}
      <div
        className={cn(
          "fixed inset-x-0 top-14 z-20 bg-surface-0/90 backdrop-blur transition-[opacity,transform] duration-200 ease-out",
          engaged
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
        aria-hidden={!engaged}
        inert={!engaged}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-h-11 w-full items-center justify-between gap-3 border-b border-border-subtle px-[var(--gutter)] py-2.5 text-left"
        >
          <span className="truncate text-caption text-text-secondary">
            <span className="text-text-tertiary">In this study: </span>
            {activeTitle}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={cn(
              "shrink-0 text-text-tertiary transition-transform duration-150",
              open && "rotate-180"
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
          <ol className="max-h-[60vh] w-full overflow-y-auto border-b border-border-subtle bg-surface-0 px-[var(--gutter)] py-2">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center gap-3 py-2 text-caption transition-colors duration-150",
                    section.id === activeId
                      ? "text-text-primary"
                      : "text-text-secondary"
                  )}
                >
                  <span className="w-4 tabular-nums text-text-tertiary">{i + 1}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
