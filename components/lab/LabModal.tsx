"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LabItem } from "./data";
import { LAB_SLIDE_SPRING } from "@/lib/animations";

function slideVariants(direction: 1 | -1, reducedMotion: boolean) {
  return {
    enter: { y: reducedMotion ? 0 : direction * 40, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: reducedMotion ? 0 : direction * -40, opacity: 0 },
  };
}

const TAG_LABEL: Record<string, string> = {
  prototype: "Prototype",
  interaction: "Interaction study",
  system: "System",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Meta({ item }: { item: LabItem }) {
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem] text-text-tertiary">
      <span>{TAG_LABEL[item.tag] ?? capitalize(item.tag)}</span>
      <span>{item.wip ? "In progress" : capitalize(item.date)}</span>
    </p>
  );
}

/** Internal prototypes are paths on this site; external ones get a scheme. */
function liveHref(url: string): string {
  return url.startsWith("/") ? url : `https://${url.replace(/^https?:\/\//, "")}`;
}

function TryLive({ item }: { item: LabItem }) {
  if (!item.url) return null;
  return (
    <a
      href={liveHref(item.url)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-brand px-4 text-[0.9375rem] font-[550] text-white transition-transform duration-150 active:scale-[0.97] dark:text-[#0a0a0a]"
    >
      Try the prototype
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

const NAV_BUTTON =
  "inline-flex min-h-11 items-center rounded-full border border-border-default px-4 text-[0.9375rem] text-text-primary transition-[background-color,transform] duration-150 hover:bg-surface-1 active:scale-[0.97]";

const ICON_BUTTON =
  "grid size-11 place-items-center rounded-full border border-border-default bg-surface-0 text-lg text-text-primary transition-[background-color,transform] duration-150 hover:bg-surface-1 active:scale-[0.97]";

function LabMediaView({ item, mode }: { item: LabItem; mode: "desktop" | "mobile" }) {
  const reducedMotion = useReducedMotion();
  const pad = mode === "mobile" ? "p-4" : "p-8";
  return (
    <div className={`relative w-full h-full overflow-hidden bg-surface-1 grid place-items-center ${pad}`}>
      <span className="absolute left-4 top-4 z-10 rounded-full bg-surface-0/90 px-2.5 text-[0.8125rem] leading-6 text-text-secondary">
        {item.media.video ? "Recording" : "Screenshot"}
      </span>
      {item.media.video ? (
        <video
          src={item.media.video}
          poster={item.media.src}
          autoPlay={!reducedMotion}
          controls
          muted
          loop
          playsInline
          aria-label={item.media.alt}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      ) : (
        <Image
          src={item.media.src}
          alt={item.media.alt}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 820px"
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
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
  onPrevious,
  onNext,
  onClose,
}: {
  item: LabItem;
  index: number;
  total: number;
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const variants = slideVariants(direction, Boolean(reducedMotion));
  return (
    <div
      className="bg-surface-0 border border-border-subtle rounded-2xl overflow-hidden relative"
      style={{
        width: "min(1200px, calc(100vw - 64px))",
        height: "min(720px, calc(100vh - 80px))",
        boxShadow: "0 40px 80px rgba(0,0,0,0.12)",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className={`absolute top-4 right-4 z-10 cursor-pointer ${ICON_BUTTON}`}
      >
        ×
      </button>

      {/* Both panes share one AnimatePresence so they always enter/exit as a
          single coordinated unit — no risk of the text and image panes
          drifting out of sync mid-cycle. */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={item.slug}
          className="grid h-full min-h-0"
          style={{ gridTemplateColumns: "400px 1fr" }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={reducedMotion ? { duration: 0 } : LAB_SLIDE_SPRING}
        >
          <div className="px-9 py-10 flex flex-col justify-between gap-6 border-r border-border-subtle min-h-0 overflow-y-auto overscroll-contain">
            <div>
              <p className="mb-6 text-[0.9375rem] tabular-nums text-text-tertiary">
                {index + 1} of {total}
              </p>
              <h2 className="m-0 text-[2.5rem] font-[560] leading-[0.98] tracking-[-0.04em] text-text-primary text-balance">
                {item.title}
              </h2>
              <div className="mt-3">
                <Meta item={item} />
              </div>
              <p className="mt-6 text-[1rem] leading-[1.6] text-text-secondary text-pretty">
                {item.blurb}
              </p>
              <div className="mt-6 flex">
                <TryLive item={item} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button type="button" onClick={onPrevious} className={NAV_BUTTON}>
                  Previous
                </button>
                <button type="button" onClick={onNext} className={NAV_BUTTON}>
                  Next
                </button>
              </div>
              <p className="text-[0.8125rem] text-text-tertiary">Esc closes</p>
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
  onPrevious,
  onNext,
  onClose,
}: {
  item: LabItem;
  index: number;
  total: number;
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const variants = slideVariants(direction, Boolean(reducedMotion));
  return (
    <div
      className="fixed inset-0 z-[100] bg-surface-0 grid"
      style={{
        gridTemplateRows: "env(safe-area-inset-top, 0px) 60px minmax(0, 1fr) max(24px, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div />
      <div className="flex items-center justify-between px-4 border-b border-border-subtle">
        <button
          onClick={onClose}
          aria-label="Back"
          className={ICON_BUTTON}
        >
          ←
        </button>
        <p className="text-[0.9375rem] tabular-nums text-text-tertiary">
          {index + 1} of {total}
        </p>
        <button
          onClick={onClose}
          aria-label="Close"
          className={ICON_BUTTON}
        >
          ×
        </button>
      </div>

      {/* Image pane and caption pane share one AnimatePresence so they
          always cycle together, never mid-exit out of sync. */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={item.slug}
          className="grid min-h-0 overflow-y-auto overscroll-contain"
          style={{ gridTemplateRows: "minmax(120px, 1fr) auto" }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={reducedMotion ? { duration: 0 } : LAB_SLIDE_SPRING}
        >
          <div className="overflow-hidden relative">
            <LabMediaView item={item} mode="mobile" />
          </div>
          <div className="px-5 py-4 border-t border-border-subtle relative overflow-hidden">
            <h2 className="text-[1.75rem] font-[560] leading-none tracking-[-0.035em] text-text-primary">
              {item.title}
            </h2>
            <div className="mt-2">
              <Meta item={item} />
            </div>
            <p className="mt-3 max-h-[28vh] overflow-y-auto text-[0.9375rem] leading-[1.55] text-text-secondary text-pretty">
              {item.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TryLive item={item} />
              <div className="flex gap-2">
                <button type="button" onClick={onPrevious} className={NAV_BUTTON}>Previous</button>
                <button type="button" onClick={onNext} className={NAV_BUTTON}>Next</button>
              </div>
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
  onPrevious,
  onNext,
  onClose,
}: {
  item: LabItem;
  index: number;
  total: number;
  isMobile: boolean;
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return isMobile ? (
    <MobileModal item={item} index={index} total={total} direction={direction} onPrevious={onPrevious} onNext={onNext} onClose={onClose} />
  ) : (
    <DesktopModal item={item} index={index} total={total} direction={direction} onPrevious={onPrevious} onNext={onNext} onClose={onClose} />
  );
}
