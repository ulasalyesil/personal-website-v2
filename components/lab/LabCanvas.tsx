"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LabCard from "./LabCard";
import { LAB_ITEMS, type LabItem } from "./data";

type Placed = { x: number; y: number; w: number; h: number; item: LabItem };

const MARGIN = 24;
const GUTTER = 32;
const MAX_TRIES = 600;

// Deterministic per-session seeded random so StaticRender + Hydration align.
function seedRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function scatter(
  items: LabItem[],
  W: number,
  H: number,
  rand: () => number,
): Placed[] {
  // Scale card sizes so each fits comfortably inside W×H.
  const maxW = Math.max(...items.map((i) => i.w));
  const maxH = Math.max(...items.map((i) => i.h));
  const scale = Math.min(
    1,
    (W * 0.42) / maxW,
    (H * 0.55) / maxH,
  );

  const sized = items.map((it) => ({
    ...it,
    w: Math.round(it.w * scale),
    h: Math.round(it.h * scale),
  }));

  // Safe area for floating Lab title and description (top-left)
  const SAFE_AREA = {
    x: 0,
    y: 0,
    w: 440,  // ~440px width as noted in issue
    h: 120,  // ~120px height as noted in issue
  };

  const placed: Placed[] = [];
  const order = [...sized].sort((a, b) => b.w * b.h - a.w * a.h);

  for (const it of order) {
    let ok = false;
    for (let t = 0; t < MAX_TRIES && !ok; t++) {
      const x = MARGIN + rand() * Math.max(0, W - it.w - MARGIN * 2);
      const y = MARGIN + rand() * Math.max(0, H - it.h - MARGIN * 2);
      const hit = placed.some(
        (p) =>
          x < p.x + p.w + GUTTER &&
          x + it.w + GUTTER > p.x &&
          y < p.y + p.h + GUTTER &&
          y + it.h + GUTTER > p.y,
      ) || (
        // Check collision with safe area
        x < SAFE_AREA.x + SAFE_AREA.w &&
        x + it.w > SAFE_AREA.x &&
        y < SAFE_AREA.y + SAFE_AREA.h &&
        y + it.h > SAFE_AREA.y
      );
      if (!hit) {
        placed.push({ x, y, w: it.w, h: it.h, item: it });
        ok = true;
      }
    }
    if (!ok) {
      placed.push({
        x: MARGIN,
        y: MARGIN,
        w: it.w,
        h: it.h,
        item: it,
      });
    }
  }
  return placed;
}

export default function LabCanvas({
  items,
  onOpen,
  cardRefs,
}: {
  items: LabItem[];
  onOpen: (item: LabItem, index: number) => void;
  cardRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  // Re-randomize on each page load.
  const seed = useMemo(() => Math.floor(Math.random() * 1e9), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const placed = useMemo(() => {
    if (!size) return [] as Placed[];
    return scatter(items, size.w, size.h, seedRand(seed));
  }, [items, size, seed]);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      {placed.map(({ x, y, w, h, item }, i) => (
        <div
          key={item.slug}
          className="lab-scale-in"
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: w,
            height: h,
            animationDelay: `${i * 70}ms`,
          }}
        >
          <LabCard
            item={item}
            index={LAB_ITEMS.findIndex((it) => it.slug === item.slug)}
            onOpen={onOpen}
            ref={(el) => {
              cardRefs.current[item.slug] = el;
            }}
          />
        </div>
      ))}
    </div>
  );
}
