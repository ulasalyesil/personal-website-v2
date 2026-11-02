"use client";

import { useLayoutEffect, useState } from "react";
import styles from "./Lab.module.css";

type View = "canvas" | "index";

/** The view lives on <html> so the page's CSS picks it before first paint. */
function apply(view: View) {
  if (view === "index") document.documentElement.dataset.labView = "index";
  else delete document.documentElement.dataset.labView;
}

/**
 * Sets the attribute on a hard load, before React exists, so a linked
 * `?view=index` does not flash the canvas first.
 */
export const LAB_VIEW_SCRIPT = `if(new URLSearchParams(location.search).get("view")==="index")document.documentElement.dataset.labView="index"`;

/**
 * Canvas or Index, desktop only. Both views stay rendered and CSS shows one,
 * so switching is instant and the hidden canvas pauses its own loops. The
 * choice is in the URL, so it can be linked.
 */
export default function LabViewToggle() {
  const [view, setView] = useState<View>("canvas");

  useLayoutEffect(() => {
    const initial: View =
      new URLSearchParams(window.location.search).get("view") === "index" ? "index" : "canvas";
    apply(initial);
    setView(initial);
    return () => apply("canvas");
  }, []);

  const choose = (next: View) => {
    apply(next);
    setView(next);
    const params = new URLSearchParams(window.location.search);
    if (next === "index") params.set("view", "index");
    else params.delete("view");
    const search = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}`,
    );
  };

  return (
    <div className={styles.toggle} role="group" aria-label="View">
      {(["canvas", "index"] as const).map((option) => (
        <button
          key={option}
          type="button"
          className={styles.toggleOption}
          aria-pressed={view === option}
          onClick={() => choose(option)}
        >
          <span className={styles.toggleBracket} aria-hidden>
            [
          </span>
          {option}
          <span className={styles.toggleBracket} aria-hidden>
            ]
          </span>
        </button>
      ))}
    </div>
  );
}
