"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { EMAIL } from "@/lib/constants";
import { NAV } from "@/lib/nav";
import { BUILD, grade, ratio } from "@/lib/system-facts";
import HudFrame from "./HudFrame";
import styles from "./ModeSplitHero.module.css";

/**
 * The hero exists twice: once resolved against the light palette, once
 * against the dark one. The dark copy sits on top and is clipped from the
 * left, so dragging the handle moves the boundary between the two modes.
 * That is the design-system work in one gesture: the same layout, the same
 * semantic token, two resolved values.
 *
 * The chrome around it reports that system rather than decorating it. Every
 * readout on screen is derived from the palette below or measured at build
 * time, so the panel cannot drift out of step with what it describes.
 */

type Mode = "light" | "dark";

/** Both resolved palettes, in one place. The CSS reads these as custom
 *  properties and the readouts compute their ratios from the same strings,
 *  so there is exactly one copy of each value on the page. */
const PALETTE = {
  light: { surface: "#ffffff", ink: "#171717", muted: "#525252", accent: "#c94200", line: "#e5e5e5" },
  dark: { surface: "#0a0a0a", ink: "#f5f5f5", muted: "#a3a3a3", accent: "#ff6b22", line: "#262626" },
} as const;

const PAD = (n: number) => String(n + 1).padStart(3, "0");

const HeroLayer = memo(function HeroLayer({ mode, focusedHref }: { mode: Mode; focusedHref?: string }) {
  const isOverlay = mode === "dark";
  // Only the light copy is real content. The dark copy is a picture of it:
  // hidden from assistive tech, not focusable, and clicks fall through to
  // the identical light layout underneath.
  const Name = isOverlay ? "p" : "h1";
  const p = PALETTE[mode];

  return (
    <div
      className={styles.layer}
      data-mode={mode}
      aria-hidden={isOverlay || undefined}
      inert={isOverlay || undefined}
    >
      <HudFrame />

      <header className={styles.header}>
        <div className={styles.identity}>
          <Name className={styles.name}>Ulaş Alyeşil</Name>
          <span className={styles.role}>Product designer · Istanbul</span>
        </div>
        <nav aria-label={isOverlay ? undefined : "Primary"}>
          <ul className={styles.nav}>
            {NAV.map((item, i) => (
              <li key={item.href}>
                <a className={styles.navLink} href={item.href} data-focus-visible={(isOverlay && focusedHref === item.href) || undefined}>
                  <span className={styles.navIndex} aria-hidden>{PAD(i)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className={styles.body}>
        {/* Not a console: a spec sheet for the half of the screen it sits on.
            Hidden from assistive tech because the same facts read as noise in
            a linear pass, and none of them are needed to use the page. */}
        <dl className={styles.telemetry} aria-hidden>
          <div>
            <dt>mode</dt>
            <dd>{mode}</dd>
          </div>
          <div>
            <dt>surface-0</dt>
            <dd>{p.surface.toUpperCase()}</dd>
          </div>
          <div>
            <dt>text-primary</dt>
            <dd>{p.ink.toUpperCase()}</dd>
          </div>
          <div>
            <dt>contrast</dt>
            <dd>
              {ratio(p.ink, p.surface)} <mark className={styles.pass}>{grade(p.ink, p.surface)}</mark>
            </dd>
          </div>
          {BUILD.tokens ? (
            <div>
              <dt>tokens</dt>
              <dd>
                {BUILD.tokens}
                {BUILD.overrides ? ` · ${BUILD.overrides} dark` : ""}
              </dd>
            </div>
          ) : null}
          {BUILD.ref ? (
            <div>
              <dt>build</dt>
              <dd>
                {BUILD.branch} @ {BUILD.ref}
              </dd>
            </div>
          ) : null}
        </dl>

        <p className={styles.statement}>
          I design products and prototype how they behave.
        </p>
      </div>

      <div className={styles.foot}>
        <p className={styles.now}>
          Most recently fintech and AI at GetirFinans, before that health
          insurance at WiseCareAI and integrations at Jotform. I prototype the
          states a static frame can&apos;t explain.
        </p>
        <a className={styles.cta} href={`mailto:${EMAIL}`} data-focus-visible={(isOverlay && focusedHref === `mailto:${EMAIL}`) || undefined}>
          <span aria-hidden>[</span>Get in touch<span aria-hidden>]</span>
        </a>
      </div>
    </div>
  );
});

const START = 100;
const REST = 52;
/** Half the grip plus a little air, in px. */
const GRIP_INSET = 28;
const LABEL_ROOM = 180;

export default function ModeSplitHero() {
  const [focusedHref, setFocusedHref] = useState<string>();
  const rootRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const pos = useRef(START);
  const intro = useRef<number | null>(null);

  // Written straight to the two elements that change. A CSS variable on the
  // section would restyle every descendant of both layers on each frame.
  const apply = useCallback((next: number) => {
    // The grip keeps its whole body on screen, so the far ends stop just
    // short of the edges. The intro starts off-screen on purpose.
    const width = rootRef.current?.clientWidth || 1;
    const inset = (GRIP_INSET / width) * 100;
    const p =
      next >= START && intro.current !== null
        ? START
        : Math.min(100 - inset, Math.max(inset, next));
    pos.current = p;
    if (overlayRef.current) {
      overlayRef.current.style.clipPath = `inset(0 0 0 ${p}%)`;
    }
    const h = handleRef.current;
    if (h) {
      h.style.left = `${p}%`;
      h.setAttribute("aria-valuenow", String(Math.round(p)));
      h.setAttribute("aria-valuetext", `${Math.round(100 - p)}% dark`);
      // A token label needs ~180px beside the grip before it runs off.
      const px = (p / 100) * width;
      h.dataset.edge =
        px < LABEL_ROOM ? "start" : width - px < LABEL_ROOM ? "end" : "";
    }
  }, []);

  const stopIntro = useCallback(() => {
    if (intro.current !== null) cancelAnimationFrame(intro.current);
    intro.current = null;
  }, []);

  useEffect(() => {
    const handle = handleRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    handle?.setAttribute("data-ready", "");

    if (reduced) {
      apply(50);
      return;
    }

    // One sweep, once: the dark mode arriving from the right edge.
    const delay = 350;
    const duration = 1100;
    const from = START;
    let t0 = 0;
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now: number) => {
      if (!t0) t0 = now + delay;
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      apply(from + (REST - from) * easeInOut(t));
      intro.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    intro.current = requestAnimationFrame(step);
    return stopIntro;
  }, [apply, stopIntro]);

  const fromPointer = (clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    apply(((clientX - rect.left) / rect.width) * 100);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;
    stopIntro();
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.dragging = "";
    fromPointer(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    fromPointer(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    delete e.currentTarget.dataset.dragging;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const stepSize = e.shiftKey ? 10 : 2;
    const moves: Record<string, number> = {
      ArrowLeft: pos.current - stepSize,
      ArrowDown: pos.current - stepSize,
      ArrowRight: pos.current + stepSize,
      ArrowUp: pos.current + stepSize,
      Home: 0,
      End: 100,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    stopIntro();
    apply(moves[e.key]);
  };

  return (
    <section ref={rootRef} className={styles.hero} aria-label="Introduction"
      style={{
        "--light-surface": PALETTE.light.surface,
        "--light-ink": PALETTE.light.ink,
        "--light-muted": PALETTE.light.muted,
        "--light-accent": PALETTE.light.accent,
        "--light-line": PALETTE.light.line,
        "--dark-surface": PALETTE.dark.surface,
        "--dark-ink": PALETTE.dark.ink,
        "--dark-muted": PALETTE.dark.muted,
        "--dark-accent": PALETTE.dark.accent,
        "--dark-line": PALETTE.dark.line,
      } as React.CSSProperties}
      onFocusCapture={(event) => {
        const target = event.target;
        setFocusedHref(target instanceof HTMLAnchorElement && target.matches(":focus-visible") ? target.getAttribute("href") ?? undefined : undefined);
      }}
      onBlurCapture={() => setFocusedHref(undefined)}
    >
      <HeroLayer mode="light" />
      <div
        ref={overlayRef}
        className={styles.overlay}
        style={{ clipPath: `inset(0 0 0 ${START}%)` }}
      >
        <HeroLayer mode="dark" focusedHref={focusedHref} />
      </div>

      <div
        ref={handleRef}
        className={styles.handle}
        style={{ left: `${START}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Light and dark mode boundary"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={START}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span className={styles.rule} aria-hidden />
        <span className={styles.readout} aria-hidden>
          <span className={styles.token} data-side="light">
            surface-0 <b>{PALETTE.light.surface.toUpperCase()}</b>{" "}
            {ratio(PALETTE.light.ink, PALETTE.light.surface)}
          </span>
          <span className={styles.grip}>
            <svg viewBox="0 0 20 20" width="20" height="20">
              <path d="M8 5 3 10l5 5M12 5l5 5-5 5" />
            </svg>
          </span>
          <span className={styles.token} data-side="dark">
            surface-0 <b>{PALETTE.dark.surface.toUpperCase()}</b>{" "}
            {ratio(PALETTE.dark.ink, PALETTE.dark.surface)}
          </span>
        </span>
      </div>
    </section>
  );
}
