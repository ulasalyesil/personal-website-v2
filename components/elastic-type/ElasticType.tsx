"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { clamp, INITIAL, landing, LAST, pose, resist, WORDS } from "./physics";
import styles from "./ElasticType.module.css";

export default function ElasticType() {
  const [selected, setSelected] = useState(INITIAL);
  const [dragging, setDragging] = useState(false);
  const [reduced, setReduced] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLSpanElement | null)[]>([]);
  const model = useRef({
    position: INITIAL as number,
    velocity: 0,
    target: INITIAL as number,
    bend: 0,
    bendVelocity: 0,
    rowHeight: 68,
    reduced: false,
    frame: 0,
    time: 0,
  });
  const drag = useRef<{
    id: number;
    y: number;
    x: number;
    origin: number;
    lastY: number;
    lastTime: number;
    velocity: number;
    moved: boolean;
    bend: number;
  } | null>(null);
  const wake = useRef<() => void>(() => {});

  useEffect(() => {
    const m = model.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = control.current!;
    const render = () => {
      const nearest = clamp(Math.round(m.position), 0, LAST);
      rows.current.forEach((row, index) => {
        if (!row) return;
        const distance = index - m.position;
        const p = pose(distance, m.reduced ? 0 : m.bend, m.rowHeight);
        row.style.transform = `translate3d(${p.x}px, ${distance * m.rowHeight}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`;
        row.style.opacity = String(p.opacity);
        row.dataset.active = String(index === nearest);
      });
    };
    const frame = (time: number) => {
      const dt = Math.min((time - (m.time || time - 16)) / 1000, 0.032);
      m.time = time;
      const pointer = drag.current;
      if (!pointer) {
        if (m.reduced) {
          m.position = m.target;
          m.velocity = 0;
        } else {
          // Substeps keep the spring stable even after a slow browser frame.
          const steps = Math.ceil(dt / 0.008);
          for (let step = 0; step < steps; step++) {
            const h = dt / steps;
            m.velocity += ((m.target - m.position) * 240 - m.velocity * 27) * h;
            m.position += m.velocity * h;
          }
        }
      }
      const recent = pointer && time - pointer.lastTime < 80;
      const desiredBend = m.reduced
        ? 0
        : pointer
          ? pointer.bend + (recent ? clamp(-pointer.velocity * 7, -65, 65) : 0)
          : 0;
      const steps = Math.ceil(dt / 0.008);
      for (let step = 0; step < steps; step++) {
        const h = dt / steps;
        m.bendVelocity +=
          ((desiredBend - m.bend) * 170 - m.bendVelocity * 19) * h;
        m.bend += m.bendVelocity * h;
      }
      render();
      const atRest =
        !pointer &&
        Math.abs(m.position - m.target) < 0.0005 &&
        Math.abs(m.velocity) < 0.005 &&
        Math.abs(m.bend) < 0.03 &&
        Math.abs(m.bendVelocity) < 0.03;
      if (atRest) {
        m.position = m.target;
        m.velocity = m.bend = m.bendVelocity = 0;
        render();
        m.frame = 0;
        m.time = 0;
      } else m.frame = requestAnimationFrame(frame);
    };
    wake.current = () => {
      if (!m.frame) m.frame = requestAnimationFrame(frame);
    };
    const resize = () => {
      m.rowHeight = element.clientWidth < 420 ? 58 : 68;
      render();
    };
    const preferences = () => {
      m.reduced = media.matches;
      setReduced(media.matches);
      if (m.reduced) m.bend = m.bendVelocity = 0;
      wake.current();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    media.addEventListener("change", preferences);
    preferences();
    resize();
    return () => {
      cancelAnimationFrame(m.frame);
      m.frame = 0;
      observer.disconnect();
      media.removeEventListener("change", preferences);
      wake.current = () => {};
    };
  }, []);

  function choose(index: number) {
    const next = clamp(index, 0, LAST);
    model.current.target = next;
    setSelected(next);
    wake.current();
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || drag.current) return;
    const m = model.current;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      y: event.clientY,
      x: event.clientX,
      origin: m.position,
      lastY: event.clientY,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
      bend: 0,
    };
    m.velocity = 0;
    setDragging(true);
    wake.current();
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const pointer = drag.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const now = performance.now();
    const delta = Math.max(now - pointer.lastTime, 8) / 1000;
    const m = model.current;
    const velocity = -(event.clientY - pointer.lastY) / m.rowHeight / delta;
    pointer.velocity = clamp(
      pointer.velocity * 0.35 + velocity * 0.65,
      -22,
      22
    );
    pointer.lastY = event.clientY;
    pointer.lastTime = now;
    pointer.moved ||=
      Math.hypot(event.clientY - pointer.y, event.clientX - pointer.x) > 5;
    pointer.bend = clamp((event.clientX - pointer.x) * 0.6, -65, 65);
    m.position = resist(
      pointer.origin - (event.clientY - pointer.y) / m.rowHeight
    );
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const pointer = drag.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const m = model.current;
    let next: number;
    if (cancelled) next = selected;
    else if (!pointer.moved) {
      const row = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-word]");
      next = row ? Number(row.dataset.word) : Math.round(m.position);
    } else {
      const velocity =
        performance.now() - pointer.lastTime > 100 ? 0 : pointer.velocity;
      next = landing(m.position, m.reduced ? 0 : velocity);
      m.velocity = m.reduced ? 0 : clamp(velocity, -12, 12);
    }
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    choose(next);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (drag.current) return;
    const actions: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: LAST,
    };
    if (!(event.key in actions)) return;
    event.preventDefault();
    event.stopPropagation();
    choose(actions[event.key]);
  }

  return (
    <article className={styles.page}>
      <header className={styles.heading}>
        <div>
          <Link className={styles.back} href="/lab">
            ← Lab
          </Link>
          <h1>Elastic type</h1>
        </div>
        <p>
          A React recreation of
          <br />
          ElevenLabs&apos; text selector.
        </p>
      </header>
      <section
        className={styles.sheet}
        aria-label="Elastic type interaction study"
      >
        <div className={styles.caption}>
          <span>Interaction recreation</span>
          <span>001</span>
        </div>
        <div className={styles.stage}>
          <div className={styles.anchor} aria-hidden="true">
            <span>[</span>
            <span>]</span>
          </div>
          <div
            ref={control}
            className={styles.control}
            role="listbox"
            tabIndex={0}
            aria-label="Choose a word"
            aria-describedby="elastic-instructions"
            aria-activedescendant={`elastic-word-${selected}`}
            data-dragging={dragging}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => finish(event)}
            onPointerCancel={(event) => finish(event, true)}
            onLostPointerCapture={(event) => finish(event, true)}
            onKeyDown={onKeyDown}
          >
            {WORDS.map((word, index) => (
              <span
                key={word}
                ref={(element) => {
                  rows.current[index] = element;
                }}
                id={`elastic-word-${index}`}
                role="option"
                aria-selected={selected === index}
                data-word={index}
                data-active={index === INITIAL}
                className={styles.word}
                style={{
                  transform: `translate3d(0, ${(index - INITIAL) * 68}px, 0) scale(${pose(index - INITIAL, 0, 68).scale})`,
                  opacity: pose(index - INITIAL, 0, 68).opacity,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        <footer className={styles.sheetFooter}>
          <span className={styles.counter}>
            {String(selected + 1).padStart(2, "0")}
            <span> / 09</span>
          </span>
          <p id="elastic-instructions">
            Drag to select. Release to snap.<span>Or use ↑ ↓</span>
          </p>
          <div className={styles.buttons}>
            <button
              aria-label="Previous word"
              disabled={selected === 0}
              onClick={() => choose(selected - 1)}
            >
              ↑
            </button>
            <button
              aria-label="Next word"
              disabled={selected === LAST}
              onClick={() => choose(selected + 1)}
            >
              ↓
            </button>
          </div>
        </footer>
      </section>
      <footer className={styles.notes}>
        <p>Original interaction by ElevenLabs.</p>
        <span>{reduced ? "Reduced motion" : "React · Pointer + keyboard"}</span>
      </footer>
    </article>
  );
}
