"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BlockLabel } from "@/components/hud";
import { isTyping } from "@/lib/keys";
import { NAV } from "@/lib/nav";
import { useRouteTransition } from "@/lib/useRouteTransition";
import styles from "./Keymap.module.css";

/**
 * The nav is printed as an index (001 Work, 002 Lab, 003 About), so the
 * index works: 1, 2 and 3 go there and 0 goes home. `?` lists every key the
 * site answers to. Keys with a modifier held, or typed into a field, are
 * left alone.
 */
const ROUTES: { key: string; href: string; label: string }[] = [
  ...NAV.map((item, i) => ({ key: String(i + 1), href: item.href, label: item.label })),
  { key: "0", href: "/", label: "Home" },
];

const OTHER = [
  { key: "⌥", label: "Inspect, while held" },
  { key: "I", label: "Inspect, on or off" },
  { key: "?", label: "This list" },
];

export default function Keymap() {
  const navigate = useRouteTransition();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping()) return;
      if (e.key === "?") {
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const route = ROUTES.find((r) => r.key === e.key);
      if (!route || e.shiftKey) return;
      setOpen(false);
      if (route.href !== pathname) navigate(route.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, pathname]);

  if (!open) return null;

  return (
    <div className={styles.scrim} onClick={() => setOpen(false)}>
      <section
        className={styles.panel}
        role="dialog"
        aria-label="Keyboard shortcuts"
        onClick={(e) => e.stopPropagation()}
      >
        <BlockLabel>Keys</BlockLabel>
        <dl className={styles.list}>
          {[...ROUTES, ...OTHER].map((row) => (
            <div key={row.key} className={styles.row}>
              <dt>
                <kbd className={styles.kbd}>{row.key}</kbd>
              </dt>
              <dd>{row.label}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
