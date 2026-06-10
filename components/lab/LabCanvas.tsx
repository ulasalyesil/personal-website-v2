"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import LabCard from "./LabCard";
import type { LabItem } from "./data";
import { scatter, seedRand, type Placed, type Rect } from "./scatter";

export default function LabCanvas({
  items,
  onOpen,
  cardRefs,
  safeAreaRef,
}: {
  items: LabItem[];
  onOpen: (item: LabItem, index: number) => void;
  cardRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  safeAreaRef?: React.RefObject<HTMLElement | null>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [safeRect, setSafeRect] = useState<Rect | null>(null);
  // Re-randomize on each page load.
  const seed = useMemo(() => Math.floor(Math.random() * 1e9), []);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
      const safeEl = safeAreaRef?.current;
      if (safeEl) {
        const canvasBox = el.getBoundingClientRect();
        const safeBox = safeEl.getBoundingClientRect();
        setSafeRect({
          x: safeBox.left - canvasBox.left,
          y: safeBox.top - canvasBox.top,
          w: safeBox.width,
          h: safeBox.height,
        });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (safeAreaRef?.current) ro.observe(safeAreaRef.current);
    return () => ro.disconnect();
  }, [safeAreaRef]);

  const placed = useMemo(() => {
    if (!size) return [] as Placed[];
    const obstacles: Rect[] = safeRect
      ? [
          {
            x: Math.max(0, safeRect.x - 8),
            y: Math.max(0, safeRect.y - 8),
            w: safeRect.w + 16,
            h: safeRect.h + 16,
          },
        ]
      : [];
    return scatter(items, size.w, size.h, seedRand(seed), obstacles);
  }, [items, size, seed, safeRect]);

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
            index={items.indexOf(item)}
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
