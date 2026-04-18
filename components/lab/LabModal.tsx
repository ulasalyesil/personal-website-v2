"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LabItem } from "./data";
import { LAB_PREVIEWS } from "./previews";
import { IOSDevice, SafariWindow } from "./frames";

const SLIDE_TRANSITION = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

function slideVariants(direction: 1 | -1) {
  return {
    enter: { y: direction * 40, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: direction * -40, opacity: 0 },
  };
}

function Pill({ label }: { label: string }) {
  return (
    <span className="h-6 inline-flex items-center px-2.5 border border-border-default rounded-full font-mono tabular-nums text-text-tertiary" style={{ fontSize: 11 }}>
      {label}
    </span>
  );
}

function ProtoFrame({ item, mode }: { item: LabItem; mode: "desktop" | "mobile" }) {
  const Preview = LAB_PREVIEWS[item.preview];
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const hasFrame = item.frame !== "none";
  const frameW = item.frame === "ios" ? 402 : 900;
  const frameH = item.frame === "ios" ? 820 : 560;

  useLayoutEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const r = ref.current!.getBoundingClientRect();
      const pad = mode === "mobile" ? 16 : 32;
      if (!hasFrame) {
        setScale(1);
        return;
      }
      const s = Math.min(
        (r.width - pad * 2) / frameW,
        (r.height - pad * 2) / frameH,
      );
      setScale(Math.max(0.2, Math.min(1, s)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [frameW, frameH, mode, hasFrame]);

  const inner = (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {Preview && <Preview active compact={false} />}
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden bg-surface-1"
    >
      {hasFrame ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: frameW,
            height: frameH,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {item.frame === "ios" ? (
            <IOSDevice width={frameW} height={frameH}>
              {inner}
            </IOSDevice>
          ) : (
            <SafariWindow
              url={item.url || "lab.ulasalyesil.com"}
              title={item.title}
              width={frameW}
              height={frameH}
            >
              {inner}
            </SafariWindow>
          )}
        </div>
      ) : (
        <div className="absolute inset-8 rounded-md overflow-hidden border border-border-subtle bg-white">
          {inner}
        </div>
      )}
    </div>
  );
}

function DesktopModal({
  item,
  index,
  total,
  direction,
  onClose,
}: {
  item: LabItem;
  index: number;
  total: number;
  direction: 1 | -1;
  onClose: () => void;
}) {
  const variants = slideVariants(direction);
  return (
    <div
      className="bg-surface-0 border border-border-subtle rounded-xl overflow-hidden relative grid"
      style={{
        width: "min(1200px, calc(100vw - 64px))",
        height: "min(720px, calc(100vh - 80px))",
        gridTemplateColumns: "380px 1fr",
        boxShadow: "0 40px 80px rgba(0,0,0,0.12)",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 w-8 h-8 grid place-items-center rounded-full bg-surface-0 border border-border-subtle text-text-primary cursor-pointer"
      >
        ×
      </button>

      <div className="px-9 py-10 flex flex-col justify-between border-r border-border-subtle overflow-hidden relative">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={item.slug}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
          >
            <div className="font-mono uppercase tracking-wider text-text-tertiary tabular-nums" style={{ fontSize: 11, marginBottom: 24 }}>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <h2 className="text-text-primary font-medium tracking-tight text-balance m-0" style={{ fontSize: 20 }}>
              {item.title}
            </h2>
            <div className="flex gap-1.5 flex-wrap mt-2.5">
              <Pill label={item.date} />
              <Pill label={item.tag} />
              {item.frame !== "none" && <Pill label={item.frame} />}
            </div>
            <p className="font-mono text-text-secondary text-pretty mt-7" style={{ fontSize: 13, lineHeight: 1.6 }}>
              {item.blurb}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="font-mono text-text-tertiary flex flex-col gap-1.5" style={{ fontSize: 11 }}>
          <div className="flex justify-between gap-3"><span>↑ ↓ · j / k</span><span>cycle</span></div>
          <div className="flex justify-between gap-3"><span>esc</span><span>close</span></div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={item.slug}
            className="absolute inset-0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
          >
            <ProtoFrame item={item} mode="desktop" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileModal({
  item,
  index,
  total,
  direction,
  onClose,
}: {
  item: LabItem;
  index: number;
  total: number;
  direction: 1 | -1;
  onClose: () => void;
}) {
  const variants = slideVariants(direction);
  return (
    <div
      className="fixed inset-0 z-[100] bg-surface-0 grid"
      style={{
        gridTemplateRows: "env(safe-area-inset-top, 44px) 52px 1fr auto 34px",
      }}
    >
      <div />
      <div className="flex items-center justify-between px-4 border-b border-border-subtle">
        <button
          onClick={onClose}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-border-subtle bg-surface-0 text-text-primary grid place-items-center"
        >
          ←
        </button>
        <div className="font-mono text-text-tertiary tabular-nums" style={{ fontSize: 12 }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full border border-border-subtle bg-surface-0 text-text-primary grid place-items-center"
        >
          ×
        </button>
      </div>
      <div className="overflow-hidden relative">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={item.slug}
            className="absolute inset-0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
          >
            <ProtoFrame item={item} mode="mobile" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="px-5 py-3 border-t border-border-subtle relative overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={item.slug}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
          >
            <div className="flex justify-between items-baseline gap-3">
              <div className="font-medium text-text-primary tracking-tight" style={{ fontSize: 16 }}>
                {item.title}
              </div>
              <div className="font-mono text-text-tertiary" style={{ fontSize: 11 }}>
                {item.date}
              </div>
            </div>
            <p className="font-mono text-text-secondary mt-2 text-pretty" style={{ fontSize: 12, lineHeight: 1.55 }}>
              {item.blurb}
            </p>
            <div className="flex gap-1.5 mt-3">
              <Pill label={item.tag} />
              {item.frame !== "none" && <Pill label={item.frame} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid place-items-center">
        <div className="w-[134px] h-[5px] rounded-full bg-black/25" />
      </div>
    </div>
  );
}

export default function LabModal({
  item,
  index,
  total,
  isMobile,
  direction,
  onClose,
}: {
  item: LabItem;
  index: number;
  total: number;
  isMobile: boolean;
  direction: 1 | -1;
  onClose: () => void;
}) {
  return isMobile ? (
    <MobileModal item={item} index={index} total={total} direction={direction} onClose={onClose} />
  ) : (
    <DesktopModal item={item} index={index} total={total} direction={direction} onClose={onClose} />
  );
}
