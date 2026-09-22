"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  BRANDS,
  MODES,
  SENTIMENTS,
  STATES,
  TOKENS,
  brandName,
  contrastChecks,
  resolveAll,
  toCssVars,
  tokenCount,
  type BrandId,
  type Mode,
  type SentimentId,
  type State,
  type TokenName,
} from "@/lib/brand-layers/resolve";
import PaymentTicket, { type Part } from "./PaymentTicket";
import styles from "./BrandLayers.module.css";

/* ─── Stage geometry ───
   One fixed coordinate space, 1100×540. The card, the chips and the leader
   lines all live in it, so a line is two numbers, not a DOM measurement. The
   stage scales as one piece down to 0.8; narrower than that it gives way to
   the list, because smaller would put chip labels under 11px. */
const STAGE_W = 1100;
const STAGE_H = 540;
const MIN_SCALE = 0.8;

type Side = "left" | "right" | "top" | "bottom";
type Pt = [number, number];
type ChipDef = { token: TokenName; side: Side; anchor: Pt; to: Pt };

const CHIPS: ChipDef[] = [
  { token: "icon/emphasis", side: "left", anchor: [292, 176], to: [346, 176] },
  {
    token: "icon/on-emphasis",
    side: "left",
    anchor: [292, 247],
    to: [362, 247],
  },
  { token: "content/primary", side: "top", anchor: [500, 84], to: [500, 150] },
  {
    token: "interactive/control",
    side: "right",
    anchor: [792, 168],
    to: [752, 168],
  },
  { token: "content/link", side: "right", anchor: [792, 256], to: [754, 256] },
  {
    token: "background/surface",
    side: "right",
    anchor: [792, 294],
    to: [760, 294],
  },
  {
    token: "interactive/primary",
    side: "right",
    anchor: [792, 344],
    to: [750, 344],
  },
  {
    token: "interactive/secondary",
    side: "bottom",
    anchor: [523, 436],
    to: [523, 358],
  },
  {
    token: "interactive/on-primary",
    side: "bottom",
    anchor: [677, 478],
    to: [677, 358],
  },
];

const PART_OF: Partial<Record<TokenName, Part>> = {
  "interactive/primary": "primary",
  "interactive/on-primary": "primary",
  "interactive/secondary": "secondary",
  "interactive/on-secondary": "secondary",
  "interactive/control": "control",
};

const COUNT = tokenCount();
const spaced = (t: string) => t.replace("/", " / ");
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const LAYER_LABEL = {
  global: "Token",
  state: "State",
  mode: "Mode",
  sentiment: "Sentiment",
  brand: "Brand",
  primitive: "Primitive",
} as const;

export default function BrandLayers() {
  const [brand, setBrand] = useState<BrandId>("a");
  const [mode, setMode] = useState<Mode>("light");
  const [sentiment, setSentiment] = useState<SentimentId>("proposition");
  const [forced, setForced] = useState<State>("default");
  const [live, setLive] = useState<Record<Part, State>>({
    primary: "default",
    secondary: "default",
    control: "default",
  });
  const [selected, setSelected] = useState<TokenName>("interactive/primary");

  const set = useMemo(
    () => resolveAll({ brand, mode, sentiment }),
    [brand, mode, sentiment]
  );
  const vars = useMemo(() => toCssVars(set) as CSSProperties, [set]);
  const checks = useMemo(() => contrastChecks(set), [set]);
  const failures = checks.filter((c) => !c.pass);

  const partState = (p: Part): State =>
    forced === "default" ? live[p] : forced;
  const tokenState = (t: TokenName): State => {
    const p = PART_OF[t];
    return p ? partState(p) : "default";
  };
  const states: Record<Part, State> = {
    primary: partState("primary"),
    secondary: partState("secondary"),
    control: partState("control"),
  };

  const setPart = (p: Part, s: State) =>
    setLive((prev) => (prev[p] === s ? prev : { ...prev, [p]: s }));

  // Real interaction drives the state chips when the State control is on
  // default. Hover only counts for a mouse, so a tap never leaves it stuck.
  const bind = (p: Part): React.ButtonHTMLAttributes<HTMLButtonElement> => ({
    onPointerEnter: (e) => e.pointerType === "mouse" && setPart(p, "hover"),
    onPointerLeave: () => setPart(p, "default"),
    onPointerDown: () => setPart(p, "active"),
    onPointerUp: (e) =>
      setPart(p, e.pointerType === "mouse" ? "hover" : "default"),
    onFocus: (e) =>
      e.currentTarget.matches(":focus-visible") && setPart(p, "hover"),
    onBlur: () => setPart(p, "default"),
    onKeyDown: (e) =>
      (e.key === " " || e.key === "Enter") && setPart(p, "active"),
    onKeyUp: (e) => (e.key === " " || e.key === "Enter") && setPart(p, "hover"),
  });

  // A combination can be linked: ?brand=b&mode=dark&sentiment=success&state=hover.
  // Read after mount so the server render and the first client render agree.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pick = <T extends string>(
      key: string,
      allowed: readonly T[],
      apply: (v: T) => void
    ) => {
      const v = q.get(key);
      if (v && (allowed as readonly string[]).includes(v)) apply(v as T);
    };
    pick("brand", BRANDS, setBrand);
    pick("mode", MODES, setMode);
    pick("sentiment", SENTIMENTS, setSentiment);
    pick("state", STATES, setForced);
  }, []);

  // Scale the stage to its container, inside [MIN_SCALE, 1].
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const s = entry.contentRect.width / STAGE_W;
      setScale(Math.min(1, Math.max(MIN_SCALE, s)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selectedRes = set[selected][tokenState(selected)];

  const chip = (t: TokenName, extra?: string) => {
    const st = tokenState(t);
    const r = set[t][st];
    return (
      <button
        type="button"
        className={`${styles.chip} ${extra ?? ""}`}
        aria-pressed={selected === t}
        aria-controls="trace"
        aria-label={`${t}, ${r.hex}${PART_OF[t] ? `, ${st}` : ""}. Show how it resolves`}
        onClick={() => setSelected(t)}
      >
        <span
          className={styles.swatch}
          style={{ background: r.hex }}
          aria-hidden
        />
        <span className={styles.chipName}>{spaced(t)}</span>
        <span className={styles.chipHex}>{r.hex}</span>
        {PART_OF[t] && st !== "default" && (
          <span className={styles.stateTag}>{st}</span>
        )}
      </button>
    );
  };

  return (
    <section className={styles.root} aria-label="Brand Layers">
      <div className={styles.controls}>
        <Radios
          legend="Brand"
          name="bl-brand"
          value={brand}
          options={BRANDS.map((b) => ({ value: b, label: brandName(b) }))}
          onChange={(v) => setBrand(v as BrandId)}
        />
        <Radios
          legend="Mode"
          name="bl-mode"
          value={mode}
          options={MODES.map((m) => ({ value: m, label: cap(m) }))}
          onChange={(v) => setMode(v as Mode)}
        />
        <div className={styles.field}>
          <label className={styles.legend} htmlFor="bl-sentiment">
            Sentiment
          </label>
          <select
            id="bl-sentiment"
            className={styles.select}
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value as SentimentId)}
          >
            {SENTIMENTS.map((s) => (
              <option key={s} value={s}>
                {cap(s)}
              </option>
            ))}
          </select>
        </div>
        <Radios
          legend="State"
          name="bl-state"
          value={forced}
          options={STATES.map((s) => ({ value: s, label: cap(s) }))}
          onChange={(v) => setForced(v as State)}
        />
      </div>

      <p className={styles.status} role="status">
        {brandName(brand)}, {mode}, {sentiment}
        {forced !== "default" ? `, forced ${forced}` : ""}.{" "}
        {failures.length === 0
          ? `All ${checks.length} contrast pairs pass.`
          : `${failures.length} of ${checks.length} contrast pairs fail.`}
      </p>

      <div ref={frameRef} className={styles.frame}>
        <div
          className={styles.stageBox}
          style={{ width: STAGE_W * scale, height: STAGE_H * scale }}
        >
          <div
            className={styles.stage}
            data-mode={mode}
            style={{
              ...vars,
              width: STAGE_W,
              height: STAGE_H,
              transform: `scale(${scale})`,
            }}
          >
            <div className={styles.cardSlot}>
              <PaymentTicket
                sentiment={sentiment}
                states={states}
                bind={bind}
              />
            </div>

            <svg
              className={styles.lines}
              width={STAGE_W}
              height={STAGE_H}
              viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
              aria-hidden
            >
              <defs>
                <marker
                  id="bl-arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path
                    d="M1 1l8 4-8 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </marker>
              </defs>
              {CHIPS.map((c) => (
                <g
                  key={c.token}
                  className={selected === c.token ? styles.lineOn : undefined}
                >
                  <line
                    x1={c.anchor[0]}
                    y1={c.anchor[1]}
                    x2={c.to[0]}
                    y2={c.to[1]}
                    markerEnd="url(#bl-arrow)"
                  />
                  <circle cx={c.anchor[0]} cy={c.anchor[1]} r="3.5" />
                </g>
              ))}
            </svg>

            {CHIPS.map((c) => (
              <div
                key={c.token}
                className={styles.chipSlot}
                data-side={c.side}
                style={{ left: c.anchor[0], top: c.anchor[1] }}
              >
                {chip(c.token)}
              </div>
            ))}
          </div>
        </div>

        {/* Below the stage's scale floor, the card stands alone and the chips become the list. */}
        <div className={styles.narrowCard} data-mode={mode} style={vars}>
          <PaymentTicket sentiment={sentiment} states={states} bind={bind} />
        </div>
      </div>

      <div className={styles.lower}>
        <div className={styles.trace} id="trace">
          <h2 className={styles.lowerHeading}>
            How {spaced(selected)} resolves
          </h2>
          <ol className={styles.traceList}>
            {selectedRes.trace.map((step, i) => (
              <li key={i} className={styles.traceStep} data-layer={step.layer}>
                <span className={styles.traceLayer}>
                  {LAYER_LABEL[step.layer]}
                </span>
                <span className={styles.traceText}>
                  {step.layer === "primitive" && (
                    <span
                      className={styles.swatch}
                      style={{ background: selectedRes.hex }}
                      aria-hidden
                    />
                  )}
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
          <p className={styles.note}>
            Components read the token at the top. Nothing below it is visible to
            them, so a brand, a mode or a sentiment changes the value without
            touching the component.
          </p>
        </div>

        <div className={styles.tokens}>
          <h2 className={styles.lowerHeading}>Every token on the card</h2>
          <ul className={styles.tokenList}>
            {TOKENS.map((t) => (
              <li key={t}>{chip(t, styles.rowChip)}</li>
            ))}
          </ul>
          <p className={styles.note}>
            A flat system would store {COUNT.flat.toLocaleString("en-US")}{" "}
            values for this one card across three brands, two modes, five
            sentiments and four states. The layers define {COUNT.defined}:{" "}
            {COUNT.primitives} primitives, {COUNT.brands} brand mappings,{" "}
            {COUNT.sentiments} sentiments and {COUNT.globals} global
            definitions.
          </p>
        </div>
      </div>
    </section>
  );
}

function Radios({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className={styles.field}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.segmented}>
        {options.map((o) => (
          <label key={o.value} className={styles.segment}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
