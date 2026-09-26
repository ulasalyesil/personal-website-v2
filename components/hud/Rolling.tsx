"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "0123456789ABCDEF#:/-";
const DURATION = 260;

/**
 * A readout value settling the way an instrument does: the characters cycle
 * and lock in from left to right. It runs once when the value first comes
 * into view and again whenever it changes, so a reading that moves looks
 * re-measured rather than re-typed.
 *
 * The server renders the final text, so nothing garbled ever reaches a
 * crawler or a first paint. Frames are written to the text node React
 * already owns rather than through state, which keeps React's own update of
 * that node intact and costs no renders. Only ever used inside readouts,
 * which are aria-hidden: scrambled letterforms must not reach anything a
 * reader or a screen reader depends on.
 */
export default function Rolling({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    const node = el?.firstChild;
    const before = previous.current;
    previous.current = value;
    if (!el || !(node instanceof Text)) return;
    // An interrupted run may have left glyphs behind; start from the truth.
    node.nodeValue = value;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    // On first view every character settles; on a change, only the ones
    // that moved, so a ticking clock rolls its seconds and nothing else.
    const run = (from: string | null) => {
      const start = performance.now();
      const n = value.length;
      const tick = (now: number) => {
        const t = (now - start) / DURATION;
        let out = "";
        for (let i = 0; i < n; i++) {
          const ch = value[i];
          const lockAt = 0.25 + 0.75 * (i / n);
          const still = from !== null && from[i] === ch;
          out +=
            still || t >= lockAt || ch === " " || ch === "·"
              ? ch
              : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        node.nodeValue = t >= 1 ? value : out;
        frame = t < 1 ? requestAnimationFrame(tick) : 0;
      };
      frame = requestAnimationFrame(tick);
    };

    if (seen.current) {
      if (before === value) return;
      run(before !== null && before.length === value.length ? before : null);
      return () => cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      seen.current = true;
      io.disconnect();
      run(null);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
