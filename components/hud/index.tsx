import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Hud.module.css";

const CORNERS = ["tl", "tr", "bl", "br"] as const;
const TICKS = ["top", "right", "bottom", "left"] as const;

/**
 * Corner brackets over the nearest positioned ancestor.
 *
 * `frame` insets them, for a panel. `select` clamps them to the corners of
 * a thing, which is what a canvas tool draws around a selection — the whole
 * reason this reads as an instrument and not as a border.
 *
 * Ornament, so it is hidden from assistive tech: eight empty corners
 * announced in a linear pass are noise, and they carry nothing the text
 * does not already say.
 */
export function Marks({
  kind = "frame",
  ticks = false,
  className,
}: {
  kind?: "frame" | "select";
  ticks?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(styles.marks, className)} data-kind={kind} aria-hidden>
      {CORNERS.map((at) => (
        <span key={at} className={styles.corner} data-at={at} />
      ))}
      {ticks &&
        TICKS.map((at) => <span key={at} className={styles.tick} data-at={at} />)}
    </div>
  );
}

/**
 * The float label pinned to a selection. Takes a fact about the thing it
 * sits on — a ratio, a count, a state — never a caption in the prose sense.
 */
export function Caption({
  at = "top",
  children,
  className,
}: {
  at?: "top" | "bottom";
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(styles.caption, className)} data-at={at} aria-hidden>
      {children}
    </span>
  );
}

export type Reading = {
  key: string;
  value: ReactNode;
  /** Draws the value in the accent, for the one reading that is a verdict. */
  accent?: boolean;
};

/**
 * `LABEL [value]` pairs. The brackets are the tell: they mark a value as
 * something the page measured rather than something someone typed. Which
 * means nothing decorative belongs in here — if a row cannot be derived,
 * it should not be a reading.
 */
export function Readout({
  items,
  layout = "row",
  className,
  hidden = true,
}: {
  items: Reading[];
  layout?: "row" | "stack";
  className?: string;
  /** Readouts restate what the page already says, so they default to
   *  aria-hidden. Pass false when a reading is the only place a fact
   *  appears. */
  hidden?: boolean;
}) {
  return (
    <dl
      className={cn(styles.readout, className)}
      data-layout={layout}
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <div key={item.key} className={styles.pair}>
          <dt className={styles.key}>{item.key}</dt>
          <dd className={cn(styles.value, item.accent && styles.accent)}>
            <span className={styles.bracket}>[</span>
            {item.value}
            <span className={styles.bracket}>]</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A console heading: the name, and the dashed rule that runs under it. */
export function BlockLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(styles.blockLabel, className)}>
      <span>{children}</span>
      <span className={styles.blockRule} aria-hidden />
    </div>
  );
}

/** A block caret. The only thing on the page that moves by itself. */
export function Cursor() {
  return <span className={styles.cursor} aria-hidden />;
}
