"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { STACK_SPRING, STACK_SCALE, FADE_FAST } from "@/lib/animations";
import styles from "./SidebarStack.module.css";

const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    meta: "4 widgets · synced 2m ago",
    cards: [
      { title: "Visitors", meta: "12.4k this week", bars: [5, 9, 7, 12, 10, 16, 22] },
      { title: "Sessions", meta: "avg 3m 12s", bars: [8, 6, 10, 9, 14, 12, 18] },
      { title: "Top page", meta: "/wisecareai", bars: [4, 7, 6, 9, 8, 11, 14] },
      { title: "Bounce", meta: "31% · -4 pts", bars: [14, 12, 11, 9, 10, 7, 6] },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    meta: "3 active · 1 paused",
    cards: [
      { title: "Dark mode", meta: "shipping · w26", bars: [3, 5, 8, 9, 13, 15, 21] },
      { title: "Lab v2", meta: "in review", bars: [6, 8, 7, 11, 10, 13, 16] },
      { title: "Nav rebuild", meta: "this prototype", bars: [2, 4, 7, 8, 12, 14, 19] },
      { title: "Archive", meta: "paused · q3", bars: [10, 9, 8, 8, 7, 6, 5] },
    ],
  },
  {
    id: "notes",
    label: "Notes",
    meta: "last edited yesterday",
    cards: [
      { title: "On restraint", meta: "draft · 412 words", bars: [4, 6, 5, 8, 9, 12, 13] },
      { title: "Spring curves", meta: "published", bars: [7, 9, 8, 12, 11, 15, 17] },
      { title: "Z-stack nav", meta: "draft · 198 words", bars: [3, 4, 6, 7, 9, 10, 15] },
      { title: "Reading list", meta: "14 items", bars: [9, 8, 10, 9, 11, 12, 14] },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    meta: "workspace · personal",
    cards: [
      { title: "Appearance", meta: "system", bars: [6, 7, 7, 8, 8, 9, 12] },
      { title: "Domains", meta: "2 connected", bars: [5, 6, 8, 7, 10, 11, 13] },
      { title: "Members", meta: "just you", bars: [8, 8, 9, 10, 9, 11, 12] },
      { title: "Billing", meta: "free tier", bars: [4, 5, 5, 6, 8, 9, 11] },
    ],
  },
];

type SidebarStackProps = {
  /** Smaller type ramp + tighter spacing for thumbnail-sized renders. */
  compact?: boolean;
  /** Loop the open/close motion and disable all pointer/keyboard interaction.
      Renders no native buttons, so it is safe inside another <button>. */
  autoplay?: boolean;
  /** Holds the autoplay loop in the closed state (e.g. card not hovered). */
  paused?: boolean;
};

export default function SidebarStack({
  compact = false,
  autoplay = false,
  paused = false,
}: SidebarStackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [section, setSection] = useState(0);
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const interactive = !autoplay;
  const sidebarWidth = compact ? 92 : 200;

  // Autoplay: simplified open/close loop, no pointer interaction.
  useEffect(() => {
    if (!autoplay || paused) return;
    setIsOpen(true);
    const id = setInterval(() => setIsOpen((v) => !v), 1500);
    return () => {
      clearInterval(id);
      setIsOpen(false);
    };
  }, [autoplay, paused]);

  // Esc closes the sidebar. Capture phase so the demo handles it before any
  // host overlay's own Escape handler (e.g. the lab modal) sees the event.
  useEffect(() => {
    if (!interactive || !isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // stopImmediatePropagation: the host overlay (lab modal) also listens
        // for Escape on window — same target, so stopPropagation isn't enough.
        e.stopImmediatePropagation();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [interactive, isOpen]);

  // One mousemove listener on the grid drives every card's spotlight vars.
  const onGridMove = (e: React.MouseEvent) => {
    const grid = gridRef.current;
    if (!grid) return;
    for (const card of grid.querySelectorAll<HTMLElement>("[data-spot]")) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
    }
  };

  // Reduced motion: skip the slide/scale entirely — instant state change.
  const spring = reduceMotion ? { duration: 0 } : STACK_SPRING;
  const fade = reduceMotion ? { duration: 0 } : FADE_FAST;

  const current = SECTIONS[section];

  const selectSection = (i: number) => {
    setSection(i);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.root}
      data-compact={compact || undefined}
      data-autoplay={autoplay || undefined}
    >
      {/* Base layer (z-0): sidebar. Fixed palette — the theme toggle below
          never reaches it because the theme attribute lives on the content
          layer only. */}
      <nav
        className={styles.sidebar}
        aria-label="Demo navigation"
        aria-hidden={!isOpen}
      >
        <div className={styles.brand}>
          <span className={styles.brandDot} />
          {!compact && <span>stack.os</span>}
        </div>
        {SECTIONS.map((s, i) =>
          interactive ? (
            <button
              key={s.id}
              type="button"
              className={styles.navItem}
              data-active={i === section}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => selectSection(i)}
            >
              <span className={styles.navTick} />
              {s.label}
            </button>
          ) : (
            <div key={s.id} className={styles.navItem} data-active={i === section}>
              <span className={styles.navTick} />
              {s.label}
            </div>
          ),
        )}
        <div className={styles.sidebarFoot}>v0.3 · lab</div>
      </nav>

      {/* Top layer (z-10): content plane. Slides + scales away on a spring. */}
      <motion.div
        className={styles.content}
        data-theme={theme}
        initial={false}
        animate={{ x: isOpen ? sidebarWidth : 0, scale: isOpen ? STACK_SCALE : 1 }}
        transition={spring}
      >
        <header className={styles.header}>
          {interactive ? (
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <MenuGlyph open={isOpen} compact={compact} />
              MENU
            </button>
          ) : (
            <div className={styles.menuBtn}>
              <MenuGlyph open={isOpen} compact={compact} />
              MENU
            </div>
          )}
          <span className={styles.crumb}>{current.label}</span>
          {interactive ? (
            <button
              type="button"
              className={styles.themeBtn}
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              aria-pressed={theme === "dark"}
            >
              <ThemeGlyph dark={theme === "dark"} compact={compact} />
            </button>
          ) : (
            <div className={styles.themeBtn}>
              <ThemeGlyph dark={theme === "dark"} compact={compact} />
            </div>
          )}
        </header>

        <div className={styles.body}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}
            >
              <h3 className={styles.sectionTitle}>{current.label}</h3>
              <p className={styles.sectionMeta}>{current.meta}</p>
              <div className={styles.grid} ref={gridRef} onMouseMove={onGridMove}>
                {current.cards.map((c) => (
                  <div key={c.title} className={styles.card} data-spot>
                    <div className={styles.cardTitle}>{c.title}</div>
                    <div className={styles.cardMeta}>{c.meta}</div>
                    <div className={styles.cardSpark} aria-hidden>
                      {c.bars.map((h, j) => (
                        <i key={j} style={{ height: `${(h / 22) * 100}%` }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function MenuGlyph({ open, compact }: { open: boolean; compact: boolean }) {
  const s = compact ? 7 : 10;
  return (
    <svg width={s} height={s} viewBox="0 0 10 10" aria-hidden>
      {open ? (
        <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ) : (
        <path d="M1 2.2h8M1 5h8M1 7.8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </svg>
  );
}

function ThemeGlyph({ dark, compact }: { dark: boolean; compact: boolean }) {
  const s = compact ? 8 : 13;
  return (
    <svg width={s} height={s} viewBox="0 0 14 14" aria-hidden>
      {dark ? (
        <path
          d="M11.5 8.6A5 5 0 015.4 2.5a5 5 0 106.1 6.1z"
          fill="currentColor"
        />
      ) : (
        <>
          <circle cx="7" cy="7" r="3" fill="currentColor" />
          <path
            d="M7 .8v1.7M7 11.5v1.7M.8 7h1.7M11.5 7h1.7M2.6 2.6l1.2 1.2M10.2 10.2l1.2 1.2M11.4 2.6l-1.2 1.2M3.8 10.2l-1.2 1.2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
