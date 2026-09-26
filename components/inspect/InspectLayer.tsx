"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BlockLabel, Readout, type Reading } from "@/components/hud";
import { isTyping } from "@/lib/keys";
import {
  componentName,
  composite,
  effectiveBackground,
  lookup,
  parseHex,
  parseRgb,
  redlines,
  shorthand,
  toHex,
  toRgbString,
  tokenIndex,
  type Rgba,
} from "@/lib/inspect/measure";
import { BUILD, contrast, grade } from "@/lib/system-facts";
import { CHANGE, TOGGLE } from "./InspectInvite";
import styles from "./Inspect.module.css";

/**
 * Inspect mode: hold ⌥ and the site becomes a canvas of itself. Whatever
 * is under the pointer gets a selection box, its padding hatched, its
 * distance to its parent drawn in redlines, and a spec panel naming the
 * component, the type and the tokens it resolves to. Click pins a
 * selection; hovering something else then measures the gap between them.
 *
 * Every figure is read off the live page. Tokens are found by resolving
 * each custom property through the browser and matching values, so a
 * colour that belongs to no token says `untokenized` instead of borrowing
 * the nearest name.
 *
 * Geometry is written straight to the overlay's style on animation frames,
 * as the hero and the crosshair do. React state changes only when the
 * target does, which is when the panel has something new to say.
 */

const HOLD_MS = 120;
const LINES = 4;
const UI = "[data-inspect-ui]";
const WHITE: Rgba = { r: 255, g: 255, b: 255, a: 1 };

/** Tailwind's own scale names. Real tokens, but when one shares a value with
 *  a name this site declared, the site's name is the one worth reading. */
const DEFAULT_SCALE = /^--(color-[a-z]+-\d{2,3}|text-(xs|sm|base|lg|\d?xl))$/;

function readTokens(): [string, string][] {
  const names: string[] = [];
  const seen = new Set<string>();
  const visit = (rule: CSSRule) => {
    if ("cssRules" in rule) {
      for (const child of Array.from((rule as CSSGroupingRule).cssRules)) visit(child);
    }
    if (rule instanceof CSSStyleRule && rule.selectorText.includes(":root")) {
      for (const prop of Array.from(rule.style)) {
        if (prop.startsWith("--") && !seen.has(prop)) {
          seen.add(prop);
          names.push(prop);
        }
      }
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) visit(rule);
    } catch {
      // Cross-origin sheet: its rules are not ours to read.
    }
  }
  names.sort((a, b) => Number(DEFAULT_SCALE.test(a)) - Number(DEFAULT_SCALE.test(b)));

  // Resolved through the browser, so a token and an element's computed
  // style arrive in exactly the same serialisation.
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
  document.body.appendChild(probe);
  const entries: [string, string][] = [];
  for (const name of names) {
    if (name.startsWith("--color-")) {
      probe.style.color = `var(${name})`;
      entries.push([name, getComputedStyle(probe).color]);
      probe.style.color = "";
    } else if (/^--text-[a-z0-9]+$/.test(name)) {
      probe.style.fontSize = `var(${name})`;
      entries.push([name, getComputedStyle(probe).fontSize]);
      probe.style.fontSize = "";
    }
  }
  probe.remove();
  return entries;
}

/** Custom properties set inline on the way up, such as the hero's two
 *  palettes. Closer than the global tokens, so they are consulted first. */
function localTokens(el: Element): [string, string][] {
  const out: [string, string][] = [];
  for (let n: Element | null = el; n; n = n.parentElement) {
    const style = (n as HTMLElement).style;
    if (!style) continue;
    for (const prop of Array.from(style)) {
      if (!prop.startsWith("--")) continue;
      const rgb = parseHex(style.getPropertyValue(prop));
      if (rgb) out.push([prop, toRgbString(rgb)]);
    }
  }
  return out;
}

function hexOf(value: string): string {
  const rgb = parseRgb(value);
  return rgb ? toHex(rgb).toUpperCase() : value;
}

function named(token: string | null, value: string): string {
  return token ? `${token} · ${hexOf(value)}` : `${hexOf(value)} // untokenized`;
}

function describe(el: Element, global: [string, string][]): Reading[] {
  // A palette declared on the way up is closer than any global token, so
  // it answers first, whatever family the global names belong to.
  const local = tokenIndex(localTokens(el));
  const globals = tokenIndex(global);
  const find = (value: string, prefer?: string) =>
    lookup(local, value) ?? lookup(globals, value, prefer);
  const cs = getComputedStyle(el);
  const box = el.getBoundingClientRect();

  let name: string | null = null;
  for (let n: Element | null = el; n && !name; n = n.parentElement) {
    name = componentName(n.classList);
  }
  const tag = el.tagName.toLowerCase();

  const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").replace(/ Variable$/, "");
  const size = Math.round(parseFloat(cs.fontSize));
  const leading = cs.lineHeight === "normal" ? "normal" : Math.round(parseFloat(cs.lineHeight));
  const sizeToken = find(cs.fontSize, "text");

  const stack: Rgba[] = [];
  for (let n: Element | null = el; n; n = n.parentElement) {
    const c = parseRgb(getComputedStyle(n).backgroundColor);
    if (c) stack.push(c);
  }
  const surface = effectiveBackground(stack, WHITE);
  const surfaceValue = toRgbString(surface);

  const readings: Reading[] = [
    { key: "component", value: name ? `${name} · ${tag}` : tag },
    { key: "size", value: `${Math.round(box.width)} × ${Math.round(box.height)}` },
    { key: "font", value: `${family} ${cs.fontWeight}` },
    {
      key: "type",
      value: `${size}/${leading} ${sizeToken ? `· ${sizeToken}` : "// untokenized"}`,
    },
    { key: "color", value: named(find(cs.color, "text"), cs.color) },
    { key: "surface", value: named(find(surfaceValue, "surface"), surfaceValue) },
    {
      key: "padding",
      value: shorthand(
        parseFloat(cs.paddingTop),
        parseFloat(cs.paddingRight),
        parseFloat(cs.paddingBottom),
        parseFloat(cs.paddingLeft),
      ),
    },
  ];

  if (/flex|grid/.test(cs.display) && cs.rowGap !== "normal") {
    const row = Math.round(parseFloat(cs.rowGap)) || 0;
    const col = Math.round(parseFloat(cs.columnGap)) || 0;
    if (row || col) readings.push({ key: "gap", value: row === col ? `${row}` : `${row} ${col}` });
  }

  const ink = parseRgb(cs.color);
  if (ink) {
    const seen = ink.a < 1 ? composite(ink, surface) : ink;
    const [fg, bg] = [toHex(seen), toHex(surface)];
    readings.push({
      key: "contrast",
      value: `${contrast(fg, bg).toFixed(2)}:1 ${grade(fg, bg)}`,
      accent: true,
    });
  }

  return readings;
}

/** The nearest ancestor that is actually a different box. Wrappers the same
 *  size as their child have no distance to report. */
function frameOf(el: Element): Element | null {
  const r = el.getBoundingClientRect();
  for (let n = el.parentElement; n; n = n.parentElement) {
    const p = n.getBoundingClientRect();
    if (p.top !== r.top || p.left !== r.left || p.right !== r.right || p.bottom !== r.bottom) {
      return n;
    }
  }
  return null;
}

function place(node: HTMLElement | null, r: DOMRect, animate: boolean) {
  if (!node) return;
  node.style.transition = animate ? "" : "none";
  node.style.transform = `translate(${r.left}px, ${r.top}px)`;
  node.style.width = `${r.width}px`;
  node.style.height = `${r.height}px`;
}

export default function InspectLayer() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [latched, setLatched] = useState(false);
  const [spec, setSpec] = useState<Reading[] | null>(null);

  const chipRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLSpanElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const activeRef = useRef(false);
  const latchedRef = useRef(false);
  const hovered = useRef<Element | null>(null);
  const pinned = useRef<Element | null>(null);
  const tokens = useRef<[string, string][] | null>(null);
  const pointer = useRef({ x: -1, y: -1 });
  const frame = useRef(0);
  const fresh = useRef(true);

  const draw = useCallback((animate: boolean) => {
    const box = boxRef.current;
    const el = hovered.current;
    if (!box) return;

    if (!el) {
      box.removeAttribute("data-on");
    } else {
      const r = el.getBoundingClientRect();
      place(box, r, animate && !fresh.current);
      fresh.current = false;
      box.setAttribute("data-on", "");
      const cs = getComputedStyle(el);
      if (padRef.current) padRef.current.style.padding = cs.padding;
      if (sizeRef.current) {
        sizeRef.current.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
      }
    }

    const pin = pinRef.current;
    if (pin) {
      if (pinned.current) {
        place(pin, pinned.current.getBoundingClientRect(), false);
        pin.setAttribute("data-on", "");
      } else {
        pin.removeAttribute("data-on");
      }
    }

    // Against the pinned selection when there is one, as a canvas tool
    // measures between two picks; otherwise against the parent frame.
    let lines: ReturnType<typeof redlines> = [];
    if (el) {
      const other =
        pinned.current && pinned.current !== el ? pinned.current : frameOf(el);
      if (other) {
        const a = el.getBoundingClientRect();
        const b = other.getBoundingClientRect();
        lines = redlines(a, b);
      }
    }
    for (let i = 0; i < LINES; i++) {
      const line = lineRefs.current[i];
      const label = labelRefs.current[i];
      const l = lines[i];
      if (!line || !label) continue;
      if (!l) {
        line.removeAttribute("data-on");
        label.removeAttribute("data-on");
        continue;
      }
      const horizontal = l.y1 === l.y2;
      const x = Math.min(l.x1, l.x2);
      const y = Math.min(l.y1, l.y2);
      line.style.transform = `translate(${x}px, ${y}px)`;
      line.style.width = horizontal ? `${Math.abs(l.x2 - l.x1)}px` : "1px";
      line.style.height = horizontal ? "1px" : `${Math.abs(l.y2 - l.y1)}px`;
      line.setAttribute("data-on", "");
      label.textContent = String(l.value);
      label.style.transform = `translate(${(l.x1 + l.x2) / 2}px, ${(l.y1 + l.y2) / 2}px) translate(-50%, -50%)`;
      label.setAttribute("data-on", "");
    }
  }, []);

  const pick = useCallback(() => {
    const { x, y } = pointer.current;
    if (x < 0) return null;
    const el = document.elementFromPoint(x, y);
    if (!el || el === document.documentElement || el.closest(UI)) return null;
    return el;
  }, []);

  const update = useCallback(() => {
    frame.current = 0;
    if (!activeRef.current) return;
    // The panel keeps to the half of the screen the pointer is not in, so
    // it never sits on what is being inspected. The dead band in the middle
    // stops it flipping back and forth over a centred element.
    const root = rootRef.current;
    const x = pointer.current.x / window.innerWidth;
    if (root && x > 0.6) root.dataset.panel = "left";
    if (root && x < 0.4) delete root.dataset.panel;
    const next = pick();
    if (next !== hovered.current) {
      hovered.current = next;
      setSpec(next ? describe(next, tokens.current ?? []) : null);
      draw(true);
    } else {
      draw(false);
    }
  }, [draw, pick]);

  const schedule = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(update);
  }, [update]);

  const turn = useCallback(
    (on: boolean, latch = false) => {
      activeRef.current = on;
      latchedRef.current = on && latch;
      setActive(on);
      setLatched(on && latch);
      window.dispatchEvent(new CustomEvent(CHANGE, { detail: { active: on } }));
      if (on) {
        tokens.current ??= readTokens();
        fresh.current = true;
        hovered.current = null;
        schedule();
      } else {
        hovered.current = null;
        pinned.current = null;
        setSpec(null);
        draw(false);
      }
    },
    [draw, schedule],
  );

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setMounted(true);

    const w = window as Window & { __inspectHello?: boolean };
    if (!w.__inspectHello) {
      w.__inspectHello = true;
      // The one deliberate log: a note for whoever opens devtools.
      // eslint-disable-next-line no-console
      console.info(
        `%cULAŞ ALYEŞİL${BUILD.ref ? `  BUILD [${BUILD.branch} @ ${BUILD.ref}]` : ""}\n%cHold ⌥ or press I to inspect this page. Press ? for keys.`,
        "font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.08em;color:#c94200",
        "font-family:ui-monospace,monospace;font-size:11px;color:inherit",
      );
    }

    let hold = 0;
    const cancelHold = () => {
      clearTimeout(hold);
      hold = 0;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        if (e.repeat || activeRef.current || isTyping()) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        cancelHold();
        hold = window.setTimeout(() => turn(true), HOLD_MS);
        return;
      }
      // Any other key while ⌥ is still arming means a shortcut, not a hold.
      cancelHold();

      if (e.key === "Escape" && activeRef.current) {
        if (pinned.current) {
          pinned.current = null;
          draw(false);
        } else {
          turn(false);
        }
        return;
      }
      if ((e.key === "i" || e.key === "I") && !e.altKey && !e.ctrlKey && !e.metaKey) {
        if (isTyping()) return;
        turn(!latchedRef.current, true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key !== "Alt") return;
      cancelHold();
      if (activeRef.current && !latchedRef.current) turn(false);
    };

    const onBlur = () => {
      cancelHold();
      if (activeRef.current && !latchedRef.current) turn(false);
    };
    const onVisibility = () => {
      if (document.hidden) onBlur();
    };

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      if (activeRef.current) schedule();
    };
    // The chip steps aside while an invite is on screen, since that already
    // says the same thing louder, and at the very end of the page, where the
    // footer's colophon sits in the same corner.
    const onScroll = () => {
      if (activeRef.current) schedule();
      const end =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 96;
      const invited = Array.from(document.querySelectorAll("[data-inspect-invite]")).some(
        (n) => {
          const r = n.getBoundingClientRect();
          return r.bottom > 0 && r.top < window.innerHeight;
        },
      );
      chipRef.current?.toggleAttribute("data-away", (end || invited) && !activeRef.current);
    };
    const onToggle = () => turn(!latchedRef.current, true);

    // While inspecting, a click selects instead of acting. Captured at the
    // document so links, the hero handle and ⌥-click-to-download all yield.
    const swallow = (e: Event) => {
      if (!activeRef.current) return;
      if ((e.target as Element | null)?.closest?.(UI)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    const onClick = (e: MouseEvent) => {
      if (!activeRef.current) return;
      if ((e.target as Element | null)?.closest?.(UI)) return;
      e.preventDefault();
      e.stopPropagation();
      pinned.current = pinned.current === hovered.current ? null : hovered.current;
      draw(false);
    };

    // A colour scheme change moves every token value.
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      tokens.current = null;
      if (activeRef.current) tokens.current = readTokens();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("pointerdown", swallow, true);
    document.addEventListener("mousedown", swallow, true);
    document.addEventListener("click", onClick, true);
    scheme.addEventListener("change", onScheme);
    window.addEventListener(TOGGLE, onToggle);
    // The invite mounts in the same commit; place the chip once it has.
    const settle = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(settle);
      window.removeEventListener(TOGGLE, onToggle);
      cancelHold();
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointerdown", swallow, true);
      document.removeEventListener("mousedown", swallow, true);
      document.removeEventListener("click", onClick, true);
      scheme.removeEventListener("change", onScheme);
    };
  }, [draw, schedule, turn]);

  if (!mounted) return null;

  return createPortal(
    <>
      <button
        ref={chipRef}
        type="button"
        className={styles.chip}
        data-inspect-ui
        aria-pressed={active}
        aria-keyshortcuts="I"
        onClick={() => turn(!latchedRef.current, true)}
      >
        <span aria-hidden>[</span>
        <span className={styles.key} aria-hidden>
          ⌥
        </span>
        Inspect
        <span aria-hidden>]</span>
      </button>

      <div
        ref={rootRef}
        className={styles.root}
        data-active={active || undefined}
        aria-hidden
      >
        <div className={styles.dim} />
        <div className={styles.sweep} />

        <p className={styles.status}>
          Inspect <span className={styles.bracket}>[</span>
          {latched ? "latched" : "hold"}
          <span className={styles.bracket}>]</span>
          <span className={styles.hint}>· click to pin · esc to exit</span>
        </p>

        <div ref={pinRef} className={styles.pin} />

        <div ref={boxRef} className={styles.box}>
          <div ref={padRef} className={styles.pad} />
          <span className={styles.corner} data-at="tl" />
          <span className={styles.corner} data-at="tr" />
          <span className={styles.corner} data-at="bl" />
          <span className={styles.corner} data-at="br" />
          <span ref={sizeRef} className={styles.size} />
        </div>

        {Array.from({ length: LINES }, (_, i) => (
          <span
            key={`l${i}`}
            ref={(n) => {
              lineRefs.current[i] = n;
            }}
            className={styles.line}
          />
        ))}
        {Array.from({ length: LINES }, (_, i) => (
          <span
            key={`v${i}`}
            ref={(n) => {
              labelRefs.current[i] = n;
            }}
            className={styles.measure}
          />
        ))}

        {spec && (
          <aside className={styles.panel} data-inspect-ui>
            <BlockLabel>Inspect</BlockLabel>
            <Readout items={spec} layout="stack" />
          </aside>
        )}
      </div>
    </>,
    document.body,
  );
}
