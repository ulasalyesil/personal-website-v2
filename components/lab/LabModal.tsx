"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { LabItem } from "./data";
import { LAB_SLIDE_SPRING } from "@/lib/animations";

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

function LabMediaView({ item, mode }: { item: LabItem; mode: "desktop" | "mobile" }) {
  const pad = mode === "mobile" ? "p-4" : "p-8";
  return (
    <div className={`relative w-full h-full overflow-hidden bg-surface-1 grid place-items-center ${pad}`}>
      {item.media.video ? (
        <video
          src={item.media.video}
          poster={item.media.src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={item.media.alt}
          className="max-w-full max-h-full object-contain rounded-md border border-border-subtle"
        />
      ) : (
        <Image
          src={item.media.src}
          alt={item.media.alt}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 820px"
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-md border border-border-subtle"
          priority
        />
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
      className="bg-surface-0 border border-border-subtle rounded-xl overflow-hidden relative"
      style={{
        width: "min(1200px, calc(100vw - 64px))",
        height: "min(720px, calc(100vh - 80px))",
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

      {/* Both panes share one AnimatePresence so they always enter/exit as a
          single coordinated unit — no risk of the text and image panes
          drifting out of sync mid-cycle. */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={item.slug}
          className="grid h-full"
          style={{ gridTemplateColumns: "380px 1fr" }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={LAB_SLIDE_SPRING}
        >
          <div className="px-9 py-10 flex flex-col justify-between border-r border-border-subtle overflow-hidden">
            <div>
              <div className="font-mono uppercase tracking-wider text-text-tertiary tabular-nums" style={{ fontSize: 11, marginBottom: 24 }}>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <h2 className="text-text-primary font-medium tracking-tight text-balance m-0" style={{ fontSize: 20 }}>
                {item.title}
              </h2>
              <div className="flex gap-1.5 flex-wrap mt-2.5">
                <Pill label={item.date} />
                <Pill label={item.tag} />
                {item.wip && <Pill label="wip" />}
              </div>
              <p className="font-mono text-text-secondary text-pretty mt-7" style={{ fontSize: 13, lineHeight: 1.6 }}>
                {item.blurb}
              </p>
              {item.url && (
                <a
                  href={`https://${item.url.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-text-tertiary hover:text-text-primary transition-colors duration-150 mt-5 inline-block underline underline-offset-4"
                  style={{ fontSize: 12 }}
                >
                  open live ↗
                </a>
              )}
            </div>
            <div className="font-mono text-text-tertiary flex flex-col gap-1.5" style={{ fontSize: 11 }}>
              <div className="flex justify-between gap-3"><span>↑ ↓ · j / k</span><span>cycle</span></div>
              <div className="flex justify-between gap-3"><span>esc</span><span>close</span></div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <LabMediaView item={item} mode="desktop" />
          </div>
        </motion.div>
      </AnimatePresence>
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
        gridTemplateRows: "env(safe-area-inset-top, 44px) 52px 1fr 34px",
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

      {/* Image pane and caption pane share one AnimatePresence so they
          always cycle together, never mid-exit out of sync. */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={item.slug}
          className="grid overflow-hidden"
          style={{ gridTemplateRows: "1fr auto" }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={LAB_SLIDE_SPRING}
        >
          <div className="overflow-hidden relative">
            <LabMediaView item={item} mode="mobile" />
          </div>
          <div className="px-5 py-3 border-t border-border-subtle relative overflow-hidden">
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
              {item.wip && <Pill label="wip" />}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
