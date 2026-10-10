"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import data from "@/app/(case-study)/getirfinans-design-system/token-values.json";
import assetBreakdown from "@/public/images/getirfinans-design-system/asset-breakdown-light-dark.webp";
import { cn } from "@/lib/cn";

// A playable version of the color argument in the GetirFinans case study.
// Every swatch is a real token from the production catalog
// (token-values.json, built by scripts/extract-token-values.mjs). Every
// number on screen is counted from that file, not typed.

interface Value {
  hex: string;
  alpha: number;
}

interface Token {
  id: number;
  group: string;
  light: Value;
  dark: Value;
  fixed: boolean;
}

const LIGHT_SURFACE = "#FFFFFF";
const DARK_SURFACE = "#0E0E0E";
const PURPLE = "#5D3EBC";
const YELLOW = "#FFD300";
const STEP_MS = 5200;

const groups = data.groups as { label: string; tokens: Omit<Token, "id" | "group">[] }[];
const TOKENS: Token[] = groups.flatMap((g, gi) =>
  g.tokens.map((t, ti) => ({ ...t, id: gi * 100 + ti, group: g.label }))
);

const key = ({ hex, alpha }: Value) => `${hex}/${alpha}`;

function rgba({ hex, alpha }: Value) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

// Tokens piled by their light value, biggest pile first. This is the old
// foundation's view: a token is its color.
const PILES = (() => {
  const map = new Map<string, Token[]>();
  for (const t of TOKENS) map.set(key(t.light), [...(map.get(key(t.light)) ?? []), t]);
  return [...map.values()].sort((a, b) => b.length - a.length);
})();

// In the dark, a pile regroups by what each token became.
const byDark = (pile: Token[]) =>
  [...pile].sort((a, b) => key(a.dark).localeCompare(key(b.dark)));

const purplePile = PILES.find((p) => key(p[0].light) === `${PURPLE}/1`) ?? [];
const purpleDarkValues = new Set(purplePile.map((t) => key(t.dark))).size;
const fixedCount = TOKENS.filter((t) => t.fixed).length;
const yellows = TOKENS.filter((t) => t.light.hex === YELLOW);
const shadows = TOKENS.filter((t) => t.group === "Shadow");

type Paint = "light" | "dark" | "split";
type Layout = "piles" | "roles" | "image";
type Tone = "light" | "dark" | "site";

interface Step {
  title: string;
  note: string;
  layout: Layout;
  paint: Paint;
  tone: Tone;
  focus?: "purple" | "fixed";
  // Outline the tokens that keep one value in both modes.
  rings?: boolean;
}

const STEPS: Step[] = [
  {
    title: "Colors named by how they look",
    note: `${TOKENS.length} tokens, ${PILES.length} light values. ${purplePile.length} of them are the same purple. The name says nothing about which is which.`,
    layout: "piles",
    paint: "light",
    tone: "light",
    focus: "purple",
  },
  {
    title: "Then the lights go off",
    note: `The same ${purplePile.length} purples, in dark mode: ${purpleDarkValues} different values. A name like purple-500 cannot choose between them.`,
    layout: "piles",
    paint: "dark",
    tone: "dark",
    focus: "purple",
  },
  {
    title: "Name what a color is for",
    note: "Group by role instead: background, text, icon, border. A role keeps its meaning in both modes. Only the value underneath moves.",
    layout: "roles",
    paint: "split",
    tone: "site",
  },
  {
    title: "Keeping a value is a decision",
    note: `${fixedCount} tokens hold in both modes. All ${yellows.length} yellows. Every shadow, all ${shadows.length}.`,
    layout: "roles",
    paint: "split",
    tone: "site",
    focus: "fixed",
    rings: true,
  },
  {
    title: "Checked against the shipped app",
    note: `The TL slice takes the lighter purple, ${PURPLE} to #7C63C9. The USD yellow does not move.`,
    layout: "image",
    paint: "split",
    tone: "site",
  },
  {
    title: "One foundation, two modes",
    note: "Every color token in the shipped app. Top half light, bottom half dark. Outlined swatches keep one value.",
    layout: "roles",
    paint: "split",
    tone: "site",
    rings: true,
  },
];

const STAGE_TONE: Record<Tone, string> = {
  light: "bg-[#FFFFFF] text-[#525252]",
  dark: "bg-[#0E0E0E] text-[#a3a3a3]",
  site: "bg-surface-1 text-text-secondary",
};

/* ─── Swatch ───
   Two stacked layers, light over dark. The paint mode only changes their
   heights, so light → dark → split is one CSS transition, not a remount. */
function Swatch({
  token,
  paint,
  dim,
  ring,
}: {
  token: Token;
  paint: Paint;
  dim: boolean;
  ring: boolean;
}) {
  const lightH = paint === "light" ? "100%" : paint === "dark" ? "0%" : "50%";
  const darkH = paint === "dark" ? "100%" : paint === "light" ? "0%" : "50%";
  return (
    <motion.span
      layoutId={`swatch-${token.id}`}
      // Opacity goes through framer: a layoutId element owns its inline opacity.
      animate={{ opacity: dim ? 0.2 : 1 }}
      transition={{ opacity: { duration: 0.5 } }}
      className={cn(
        "relative block size-3.5 overflow-hidden rounded-[3px] ring-1 ring-black/10 transition-shadow duration-500 sm:size-4",
        paint !== "light" && "ring-white/10",
        paint === "split" && "ring-border-default",
        ring && "ring-2 ring-text-primary"
      )}
    >
      <span
        className="absolute inset-x-0 top-0 transition-[height] duration-700 ease-[var(--motion-ease-standard)]"
        style={{
          height: lightH,
          background: `linear-gradient(${rgba(token.light)}, ${rgba(token.light)}), ${LIGHT_SURFACE}`,
        }}
      />
      <span
        className="absolute inset-x-0 bottom-0 transition-[height] duration-700 ease-[var(--motion-ease-standard)]"
        style={{
          height: darkH,
          background: `linear-gradient(${rgba(token.dark)}, ${rgba(token.dark)}), ${DARK_SURFACE}`,
        }}
      />
    </motion.span>
  );
}

function Piles({ step }: { step: Step }) {
  return (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-6">
      {PILES.map((pile) => {
        const isPurple = pile === purplePile;
        const cols = Math.ceil(Math.sqrt(pile.length));
        const focused = step.focus === "purple" && isPurple;
        return (
          <div key={key(pile[0].light)} className="flex flex-col items-start gap-2">
            <div
              className={cn(
                "grid gap-1 rounded-md p-1 outline-offset-4 transition-[outline-color] duration-500",
                focused ? "outline-2 outline-brand outline" : "outline-transparent"
              )}
              style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}
            >
              {(step.paint === "dark" ? byDark(pile) : pile).map((t) => (
                <Swatch
                  key={t.id}
                  token={t}
                  paint={step.paint}
                  dim={step.focus === "purple" && !isPurple}
                  ring={false}
                />
              ))}
            </div>
            {pile.length >= 6 && (
              <span
                className={cn(
                  "font-mono text-micro tracking-micro transition-opacity duration-500",
                  step.focus === "purple" && !isPurple && "opacity-30"
                )}
              >
                {pile[0].light.hex}
                {pile[0].light.alpha < 1 && ` ${pile[0].light.alpha * 100}%`} ×{pile.length}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Roles({ step }: { step: Step }) {
  return (
    <dl className="space-y-4">
      {groups.map((g) => {
        const tokens = TOKENS.filter((t) => t.group === g.label);
        return (
          <div key={g.label} className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="flex items-baseline justify-between gap-2 text-caption sm:flex-col sm:justify-start sm:gap-0">
              <span className="text-text-primary">{g.label}</span>
              <span className="font-mono text-text-tertiary">
                {tokens.filter((t) => t.fixed).length} of {tokens.length} fixed
              </span>
            </dt>
            <dd className="flex flex-wrap gap-1.5" aria-hidden>
              {tokens.map((t) => (
                <Swatch
                  key={t.id}
                  token={t}
                  paint={step.paint}
                  dim={step.focus === "fixed" && !t.fixed}
                  ring={t.fixed && !!step.rings}
                />
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function Production() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl"
    >
      <Image
        src={assetBreakdown}
        alt="The asset breakdown sheet in light and dark mode. The purple TL slice is lighter in dark mode, the yellow USD slice is unchanged."
        className="w-full rounded-md"
        sizes="(min-width: 768px) 42rem, 100vw"
        placeholder="blur"
      />
    </motion.figure>
  );
}

function TransportButton({
  label,
  onClick,
  children,
  primary,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-full px-3 font-mono text-micro tracking-micro transition-colors",
        primary
          ? "bg-text-primary text-surface-0 hover:opacity-90"
          : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
      )}
    >
      {children}
    </button>
  );
}

export default function DsStepper() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = STEPS[index];
  const last = index === STEPS.length - 1;

  // Autoplay starts only for viewers who have not asked for less motion.
  useEffect(() => {
    if (reduce === false) setPlaying(true);
  }, [reduce]);

  useEffect(() => {
    if (!playing || last) return;
    const id = window.setTimeout(() => setIndex((i) => i + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, last]);

  useEffect(() => {
    if (last) setPlaying(false);
  }, [last]);

  const clamp = (i: number) => Math.max(0, Math.min(STEPS.length - 1, i));
  const go = useCallback((i: number) => setIndex(clamp(i)), []);
  const stepBy = useCallback((d: number) => setIndex((i) => clamp(i + d)), []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") stepBy(1);
    if (e.key === "ArrowLeft") stepBy(-1);
    if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", bounce: 0.12, duration: 0.8 }}>
      <section
        aria-roledescription="stepper"
        aria-label="Rebuilding the color foundation, step by step"
        tabIndex={0}
        onKeyDown={onKey}
        className="overflow-hidden rounded-lg border border-border-subtle outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <div
          className={cn(
            "relative flex min-h-[26rem] flex-col justify-center p-5 transition-colors duration-700 sm:p-8",
            STAGE_TONE[step.tone]
          )}
        >
          <LayoutGroup>
            <AnimatePresence mode="popLayout" initial={false}>
              {step.layout === "image" ? (
                <Production key="image" />
              ) : (
                <motion.div key={step.layout} layout="position" exit={{ opacity: 0 }}>
                  {step.layout === "piles" ? <Piles step={step} /> : <Roles step={step} />}
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        <div className="grid gap-4 border-t border-border-subtle bg-surface-0 p-4 sm:grid-cols-[1fr_auto] sm:items-end sm:p-5">
          <div aria-live="polite">
            <p className="font-mono text-micro uppercase tracking-micro text-text-tertiary">
              {last ? "After" : `Step ${index + 1} of ${STEPS.length - 1}`}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mt-1 text-body font-medium text-text-primary">{step.title}</p>
                <p className="mt-1 max-w-[46ch] text-caption text-brand">{step.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1">
            <TransportButton
              label="Restart"
              onClick={() => {
                go(0);
                setPlaying(true);
              }}
            >
              ↺ Restart
            </TransportButton>
            <TransportButton label="Previous step" onClick={() => stepBy(-1)}>
              ‹
            </TransportButton>
            <TransportButton
              label={playing ? "Pause" : "Play"}
              primary
              onClick={() => {
                if (last) go(0);
                setPlaying((p) => !p || last);
              }}
            >
              {playing ? "❚❚ Pause" : "▶ Play"}
            </TransportButton>
            <TransportButton label="Next step" onClick={() => stepBy(1)}>
              ›
            </TransportButton>
          </div>

          <div className="flex gap-1 sm:col-span-2" aria-hidden>
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                onClick={() => go(i)}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-surface-2"
              >
                <span
                  key={`${i}-${index}-${playing}`}
                  className={cn(
                    "absolute inset-y-0 left-0 bg-text-primary",
                    i < index && "w-full",
                    i > index && "w-0",
                    i === index && !(playing && !last) && "w-full"
                  )}
                  style={
                    i === index && playing && !last
                      ? { animation: `ds-step-fill ${STEP_MS}ms linear forwards` }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      <style>{`@keyframes ds-step-fill { from { width: 0 } to { width: 100% } }`}</style>
    </MotionConfig>
  );
}
