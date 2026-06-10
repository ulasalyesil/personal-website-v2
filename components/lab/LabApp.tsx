"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LabCanvas from "./LabCanvas";
import LabModal from "./LabModal";
import { LAB_ITEMS, type LabItem } from "./data";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const onR = () => setM(window.innerWidth <= 768);
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return m;
}

export default function LabApp({ initialSlug }: { initialSlug?: string }) {
  const initialIndex = initialSlug
    ? LAB_ITEMS.findIndex((it) => it.slug === initialSlug)
    : -1;
  const [selected, setSelected] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [direction, setDirection] = useState<1 | -1>(1);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const total = LAB_ITEMS.length;

  const cycle = useCallback(
    (dir: "next" | "prev") => {
      setDirection(dir === "next" ? 1 : -1);
      setSelected((curr) => {
        if (curr == null) return curr;
        return (curr + (dir === "next" ? 1 : -1) + total) % total;
      });
    },
    [total],
  );

  const close = useCallback(() => {
    setSelected(null);
    try {
      history.pushState({}, "", "/lab");
    } catch {}
  }, []);

  const open = useCallback((_: LabItem, index: number) => {
    setSelected(index);
    try {
      history.pushState({}, "", `/lab/${LAB_ITEMS[index].slug}`);
    } catch {}
  }, []);

  // URL ↔ state sync on back/forward
  useEffect(() => {
    const handler = () => {
      const m = window.location.pathname.match(/^\/lab\/([^\/]+)$/);
      if (m) {
        const idx = LAB_ITEMS.findIndex((it) => it.slug === m[1]);
        setSelected(idx >= 0 ? idx : null);
      } else {
        setSelected(null);
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Update URL when cycling between items
  useEffect(() => {
    if (selected == null) return;
    try {
      history.replaceState({}, "", `/lab/${LAB_ITEMS[selected].slug}`);
    } catch {}
  }, [selected]);

  // Body scroll lock + keyboard/wheel/swipe cycling.
  // Keyed on isOpen (not selected) so wheelLock/wheelAccum survive cycling.
  const isOpen = selected != null;
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    let wheelLock = false;
    let wheelAccum = 0;
    let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;
    let wheelLockTimer: ReturnType<typeof setTimeout> | null = null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (["ArrowDown", "ArrowRight", "j"].includes(e.key)) {
        e.preventDefault();
        cycle("next");
      } else if (["ArrowUp", "ArrowLeft", "k"].includes(e.key)) {
        e.preventDefault();
        cycle("prev");
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (wheelLock) return;
      // Prefer the larger axis so sideways trackpad swipes cycle too.
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      wheelAccum += delta;
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        wheelAccum = 0;
      }, 160);
      if (Math.abs(wheelAccum) > 24) {
        wheelLock = true;
        cycle(wheelAccum > 0 ? "next" : "prev");
        wheelAccum = 0;
        wheelLockTimer = setTimeout(() => {
          wheelLock = false;
        }, 380);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      if (wheelLockTimer) clearTimeout(wheelLockTimer);
    };
  }, [isOpen, cycle, close]);

  const touchRef = useRef({ x: 0, y: 0, t: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, t: performance.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    const dy = t.clientY - touchRef.current.y;
    const dx = t.clientX - touchRef.current.x;
    const dt = performance.now() - touchRef.current.t;
    if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) && dt < 600) {
      if (dy > 0 && Math.abs(dy) > 120 && dt < 300) close();
      else cycle(dy < 0 ? "next" : "prev");
    }
  };

  const item = selected != null ? LAB_ITEMS[selected] : null;

  return (
    <div className="relative w-full h-full">
      {/* Floating title — echoes existing section-heading treatment */}
      <div ref={titleRef} className="absolute left-4 sm:left-6 top-4 z-[5] max-w-[420px] pointer-events-none">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-tertiary m-0">
          Lab
        </h2>
        <p className="text-text-secondary m-0 mt-1.5 text-pretty" style={{ fontSize: 15, lineHeight: 1.45 }}>
          a quiet dumping ground for experiments — scraps, sketches, and
          half-finished ideas that wouldn&apos;t fit anywhere else.
        </p>
      </div>

      <LabCanvas items={LAB_ITEMS} onOpen={open} cardRefs={cardRefs} safeAreaRef={titleRef} />

      {item && (
        <>
          <div
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-[95] lab-scrim"
            style={{
              background: "rgba(10,10,10,0.45)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-[96] grid place-items-center pointer-events-none"
          >
            <div className="pointer-events-auto lab-modal-enter">
              <LabModal
                item={item}
                index={selected!}
                total={total}
                isMobile={isMobile}
                direction={direction}
                onClose={close}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
