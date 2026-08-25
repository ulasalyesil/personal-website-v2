import type { CSSProperties, ReactNode } from "react";

/**
 * Page entry animation: a 12px rise, staggered across the direct children.
 *
 * This used to be framer-motion `variants` with a `hidden` state of
 * `{ opacity: 0, y: 12 }`. framer-motion serializes that initial variant into
 * the server-rendered HTML, so every page using it shipped its whole content
 * at `opacity: 0` and only became visible once the bundle had downloaded and
 * React had hydrated. Measured on 2026-08-25: FCP 0.9s, LCP 5.5s, TBT 4ms, on
 * pages whose content was already in the HTML the whole time.
 *
 * The CSS version runs at first paint, needs no JavaScript, and keeps the same
 * motion: same distance, same 350ms ease-out, same 80ms stagger. Both of these
 * are server components now, which also drops a `"use client"` boundary from
 * the four page trees that use them.
 *
 * `AnimateItem` takes its stagger position from `index` rather than counting
 * children, so callers stay explicit and a conditionally rendered item cannot
 * silently shift the rest of the sequence.
 */

interface AnimateInProps {
  children: ReactNode;
  className?: string;
}

export default function AnimateIn({ children, className }: AnimateInProps) {
  return <div className={className}>{children}</div>;
}

interface AnimateItemProps {
  children: ReactNode;
  className?: string;
  /** Stagger position. Defaults to 0, i.e. no delay. */
  index?: number;
}

export function AnimateItem({
  children,
  className,
  index = 0,
}: AnimateItemProps) {
  return (
    <div
      className={className ? `enter-item ${className}` : "enter-item"}
      style={{ "--enter-index": index } as CSSProperties}
    >
      {children}
    </div>
  );
}
