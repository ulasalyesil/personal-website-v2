import source from "./tokens.json";
import { contrast, oklchToHex } from "./color";

export type BrandId = keyof typeof source.brand;
export type Mode = "light" | "dark";
export type SentimentId = keyof typeof source.sentiment;
export type State = "default" | "hover" | "active" | "disabled";
export type TokenName = keyof typeof source.global;

export const BRANDS = Object.keys(source.brand) as BrandId[];
export const MODES: Mode[] = ["light", "dark"];
export const SENTIMENTS = Object.keys(source.sentiment) as SentimentId[];
export const STATES: State[] = ["default", "hover", "active", "disabled"];
export const TOKENS = Object.keys(source.global) as TokenName[];

export const brandName = (b: BrandId) => source.brand[b].name;

type Ref = { ramp?: string; step: number };
type ModeDef = Ref | Record<State, Ref>;

const isStateful = (def: ModeDef): def is Record<State, Ref> =>
  "default" in def;

export const statefulTokens = TOKENS.filter((t) =>
  isStateful(source.global[t].light as ModeDef)
);

/** One primitive step as hex. Cached: the same 110 values back every combination. */
const primitiveCache = new Map<string, string>();
export function primitive(ramp: string, step: number): string {
  const key = `${ramp}-${step}`;
  const hit = primitiveCache.get(key);
  if (hit) return hit;
  const hue =
    source.primitives.hues[ramp as keyof typeof source.primitives.hues];
  const s =
    source.primitives.steps[
      String(step) as keyof typeof source.primitives.steps
    ];
  if (!hue || !s) throw new Error(`No primitive ${key}`);
  const hex = oklchToHex(s.l, hue.c * s.c, hue.h);
  primitiveCache.set(key, hex);
  return hex;
}

export type TraceStep = {
  layer: "global" | "state" | "mode" | "sentiment" | "brand" | "primitive";
  text: string;
};

export type Resolved = { hex: string; primitive: string; trace: TraceStep[] };

export type Combo = { brand: BrandId; mode: Mode; sentiment: SentimentId };

/** Follow a ramp reference through the brand layer, recording where it went. */
function rampFor(ref: string, brand: BrandId, trace: TraceStep[]): string {
  const m = ref.match(/^\{brand\.(accent|neutral)\}$/);
  if (!m) return ref;
  const role = m[1] as "accent" | "neutral";
  const ramp = source.brand[brand][role];
  trace.push({ layer: "brand", text: `${brandName(brand)} ${role} → ${ramp}` });
  return ramp;
}

export function resolveToken(
  token: TokenName,
  combo: Combo,
  state: State
): Resolved {
  const { brand, mode, sentiment } = combo;
  const def = source.global[token][mode] as ModeDef;
  const trace: TraceStep[] = [{ layer: "global", text: token }];

  let ref: Ref;
  if (isStateful(def)) {
    ref = def[state];
    trace.push({
      layer: "state",
      text: `${mode} · ${state} → step ${ref.step}`,
    });
  } else {
    ref = def;
    trace.push({ layer: "mode", text: `${mode} → step ${ref.step}` });
  }

  let ramp: string;
  if (ref.ramp && !ref.ramp.startsWith("{")) {
    // A fixed ramp bypasses sentiment on purpose: disabled reads the same in every theme.
    ramp = ref.ramp;
    trace.push({ layer: "sentiment", text: `bypassed, fixed ramp ${ramp}` });
  } else if (ref.ramp) {
    ramp = rampFor(ref.ramp, brand, trace);
  } else {
    const sRef = source.sentiment[sentiment].ramp;
    trace.push({ layer: "sentiment", text: `${sentiment} → ${sRef}` });
    const before = trace.length;
    ramp = rampFor(sRef, brand, trace);
    if (trace.length === before) {
      trace.push({
        layer: "brand",
        text: "shared status hue, the same for every brand",
      });
    }
  }

  const hex = primitive(ramp, ref.step);
  const name = `${ramp}-${ref.step}`;
  trace.push({ layer: "primitive", text: `${name} = ${hex}` });
  return { hex, primitive: name, trace };
}

export type ResolvedSet = Record<TokenName, Record<State, Resolved>>;

/** Every token in every state for one combination: what the stage renders from. */
export function resolveAll(combo: Combo): ResolvedSet {
  const out = {} as ResolvedSet;
  for (const t of TOKENS) {
    out[t] = {} as Record<State, Resolved>;
    for (const s of STATES) out[t][s] = resolveToken(t, combo, s);
  }
  return out;
}

export const cssVar = (t: TokenName, s: State) =>
  `--bl-${t.replace("/", "-")}-${s}`;

export function toCssVars(set: ResolvedSet): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const t of TOKENS)
    for (const s of STATES) vars[cssVar(t, s)] = set[t][s].hex;
  return vars;
}

export type ContrastCheck = {
  fg: TokenName;
  bg: TokenName;
  min: number;
  ratio: number;
  pass: boolean;
  state: State;
};

/**
 * The pairs that actually render on the card, with the WCAG threshold each
 * one owes: 4.5:1 for text (the status word sits on the emphasis panel), 3:1
 * for icons and for the primary control's boundary. Disabled controls are exempt under WCAG, so they are not checked.
 */
const PAIRS: {
  fg: TokenName;
  bg: TokenName;
  min: number;
  stateful: boolean;
}[] = [
  {
    fg: "content/primary",
    bg: "background/surface",
    min: 4.5,
    stateful: false,
  },
  { fg: "content/link", bg: "background/surface", min: 4.5, stateful: false },
  { fg: "icon/on-emphasis", bg: "icon/emphasis", min: 4.5, stateful: false },
  {
    fg: "interactive/on-primary",
    bg: "interactive/primary",
    min: 4.5,
    stateful: true,
  },
  {
    fg: "interactive/on-secondary",
    bg: "interactive/secondary",
    min: 4.5,
    stateful: true,
  },
  { fg: "content/primary", bg: "interactive/control", min: 3, stateful: true },
  {
    fg: "interactive/primary",
    bg: "background/surface",
    min: 3,
    stateful: true,
  },
];

export function contrastChecks(set: ResolvedSet): ContrastCheck[] {
  const out: ContrastCheck[] = [];
  for (const p of PAIRS) {
    const states: State[] = p.stateful
      ? ["default", "hover", "active"]
      : ["default"];
    for (const state of states) {
      const ratio = contrast(set[p.fg][state].hex, set[p.bg][state].hex);
      out.push({
        fg: p.fg,
        bg: p.bg,
        min: p.min,
        ratio,
        pass: ratio >= p.min,
        state,
      });
    }
  }
  return out;
}

/**
 * What the layers save. `flat` is how many values a system with no layers
 * would store: one per token per brand, mode, sentiment and (for interactive
 * tokens) state. `defined` is how many definitions this file actually holds.
 */
export function tokenCount() {
  const combos = BRANDS.length * MODES.length * SENTIMENTS.length;
  const flat = TOKENS.reduce(
    (n, t) => n + combos * (statefulTokens.includes(t) ? STATES.length : 1),
    0
  );
  const primitives =
    Object.keys(source.primitives.hues).length *
    Object.keys(source.primitives.steps).length;
  const brands = BRANDS.length * 2;
  const sentiments = SENTIMENTS.length;
  const globals = TOKENS.reduce(
    (n, t) =>
      n + MODES.length * (statefulTokens.includes(t) ? STATES.length : 1),
    0
  );
  return {
    flat,
    defined: primitives + brands + sentiments + globals,
    primitives,
    brands,
    sentiments,
    globals,
  };
}
