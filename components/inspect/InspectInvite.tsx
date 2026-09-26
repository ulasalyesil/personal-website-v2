"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./Inspect.module.css";

/** Fired by an invite, heard by the layer. */
export const TOGGLE = "inspect:toggle";
/** Fired by the layer whenever inspect turns on or off. */
export const CHANGE = "inspect:change";

/**
 * The visible way in. Inspect mode is a keyboard gesture, and a gesture
 * nobody is told about does not exist, so the hero says it out loud: the
 * key to hold, printed as a key. The cap lights while the mode is on,
 * whichever way it was entered, so pressing ⌥ answers itself on screen.
 *
 * Fine pointers only, like the mode. On touch it renders nothing rather
 * than an instruction nobody can follow.
 */
export default function InspectInvite({ className }: { className?: string }) {
  const [fine, setFine] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setFine(true);
    const sync = (e: Event) => setOn((e as CustomEvent<{ active: boolean }>).detail.active);
    window.addEventListener(CHANGE, sync);
    return () => window.removeEventListener(CHANGE, sync);
  }, []);

  if (!fine) return null;

  return (
    <button
      type="button"
      className={cn(styles.invite, className)}
      data-inspect-ui
      data-inspect-invite
      aria-pressed={on}
      aria-keyshortcuts="Alt I"
      onClick={() => window.dispatchEvent(new Event(TOGGLE))}
    >
      <kbd className={styles.cap} data-on={on || undefined} aria-hidden>
        ⌥
      </kbd>
      Hold to inspect this page
    </button>
  );
}
