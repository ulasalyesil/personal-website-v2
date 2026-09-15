"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LabGrid from "./LabGrid";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = useIsMobile();
  const total = LAB_ITEMS.length;

  const cycle = useCallback(
    (dir: "next" | "prev") => {
      if (total === 0) return;
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <section>
      {/* The intro copy was doing the work of a headline at the size of a
          caption. Promoted, so the page has something to anchor the eye. */}
      <div className="mb-12 flex items-baseline justify-between gap-6">
        <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
          Lab
        </span>
        <span className="font-mono text-xs tabular-nums text-text-tertiary">
          {LAB_ITEMS.length} entries
        </span>
      </div>
      <h1 className="text-section max-w-[24ch] font-medium text-text-primary text-balance">
        Interaction studies and prototypes, built to answer the questions a
        static frame can&apos;t.
      </h1>
      <p className="text-lead mt-3 mb-14 max-w-[52ch] text-text-tertiary text-pretty">
        Some shipped, some didn&apos;t. One of them runs right here.
      </p>

      <LabGrid items={LAB_ITEMS} onOpen={open} />

      <dialog
        ref={dialogRef}
        aria-label={item ? `${item.title} lab detail` : "Lab detail"}
        onClose={() => {
          setSelected(null);
          try { history.pushState({}, "", "/lab"); } catch {}
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/45"
      >
        {item && (
          <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="grid h-full place-items-center">
            <div className={isMobile ? "h-full w-full" : "lab-modal-enter"}>
              <LabModal
                item={item}
                index={selected!}
                total={total}
                isMobile={isMobile}
                direction={direction}
                onPrevious={() => cycle("prev")}
                onNext={() => cycle("next")}
                onClose={close}
              />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
