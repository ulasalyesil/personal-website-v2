"use client";

import { useEffect, useState } from "react";

const BRAND = "var(--color-brand)";

type PreviewProps = { active?: boolean; compact?: boolean };

export function PreviewScrollField({ active, compact }: PreviewProps) {
  const [mx, setMx] = useState(0.5);
  const [my, setMy] = useState(0.5);
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setAuto((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const cursorX = active ? 0.5 + Math.sin(auto * 0.9) * 0.28 : mx;
  const cursorY = active ? 0.5 + Math.cos(auto * 0.7) * 0.22 : my;

  const cols = compact ? 10 : 16;
  const rows = compact ? 7 : 11;
  const dots: {
    i: string;
    cx: number;
    cy: number;
    dx: number;
    dy: number;
    d: number;
    pull: number;
  }[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cx = i / (cols - 1);
      const cy = j / (rows - 1);
      const dx = cx - cursorX;
      const dy = cy - cursorY;
      const d = Math.sqrt(dx * dx + dy * dy);
      const pull = Math.max(0, 0.32 - d) * (compact ? 30 : 50);
      dots.push({ i: `${i}-${j}`, cx, cy, dx, dy, d, pull });
    }
  }

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMx((e.clientX - r.left) / r.width);
        setMy((e.clientY - r.top) / r.height);
      }}
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--color-surface-1)",
        overflow: "hidden",
      }}
    >
      {dots.map((dt) => (
        <div
          key={dt.i}
          style={{
            position: "absolute",
            left: `${dt.cx * 100}%`,
            top: `${dt.cy * 100}%`,
            width: compact ? 3 : 5,
            height: compact ? 3 : 5,
            borderRadius: 9999,
            background: dt.d < 0.18 ? BRAND : "var(--color-text-tertiary)",
            transform: `translate(-50%,-50%) translate(${-dt.dx * dt.pull}px, ${-dt.dy * dt.pull}px)`,
            opacity: 0.85,
            transition: active ? "none" : "transform 120ms ease-out",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: `${cursorX * 100}%`,
          top: `${cursorY * 100}%`,
          width: compact ? 8 : 12,
          height: compact ? 8 : 12,
          borderRadius: 9999,
          background: BRAND,
          transform: "translate(-50%,-50%)",
          boxShadow: `0 0 0 ${compact ? 3 : 5}px color-mix(in srgb, var(--color-brand) 18%, transparent)`,
        }}
      />
    </div>
  );
}

export function PreviewWaveStudy({ active, compact }: PreviewProps) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const N = 60;
  const noise = (i: number) =>
    Math.sin(i * 0.9 + t * 0.6) * 0.5 + Math.sin(i * 2.1 + t * 1.2) * 0.25;

  const build = (amp: number, phase: number, yBase: number) =>
    Array.from({ length: N }, (_, i) => {
      const x = (i / (N - 1)) * 400;
      const y =
        yBase +
        Math.sin((i / N) * Math.PI * 2 + t + phase) * amp +
        noise(i) * 15;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--color-surface-1)",
        padding: compact ? 12 : 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!compact && (
        <div
          style={{
            fontFamily: "var(--font-mono, 'Geist Mono Variable')",
            color: "var(--color-text-tertiary)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          generative / daily sketch 027
        </div>
      )}
      <div style={{ flex: 1, marginTop: compact ? 0 : 12 }}>
        <svg
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path d={build(18, 1.2, 130)} stroke="var(--color-text-tertiary)" strokeWidth="1" fill="none" />
          <path d={build(30, 0, 100)} stroke={BRAND} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
}

export function PreviewTimeCard({ active, compact }: PreviewProps) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [active]);

  const hour = now.getHours() + now.getMinutes() / 60;
  const pct = hour / 24;
  const hh = now.getHours() % 12 || 12;
  const mm = now.getMinutes();
  const ampm = now.getHours() >= 12 ? "pm" : "am";
  const display = `${String(hh).padStart(2, " ")}:${String(mm).padStart(2, "0")} ${ampm}`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--color-surface-0)",
        padding: compact ? "20px 16px" : "60px 28px 28px",
        fontFamily: "var(--font-mono, 'Geist Mono Variable')",
        color: "var(--color-text-primary)",
      }}
    >
      <div style={{ fontSize: compact ? 9 : 13, color: "var(--color-text-tertiary)" }}>berlin, de</div>
      <div
        style={{
          fontSize: compact ? 22 : 42,
          letterSpacing: "-0.02em",
          marginTop: compact ? 2 : 6,
        }}
      >
        {display}
      </div>
      <div
        style={{
          height: 1,
          background: "var(--color-border-subtle)",
          margin: `${compact ? 12 : 28}px 0 ${compact ? 8 : 20}px`,
        }}
      />
      <div style={{ position: "relative", display: "flex", gap: 2 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: i % 6 === 0 ? (compact ? 10 : 16) : compact ? 6 : 10,
              background: "var(--color-text-tertiary)",
              opacity: i % 6 === 0 ? 0.8 : 0.3,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: `${pct * 100}%`,
            top: compact ? 14 : 22,
            width: compact ? 6 : 10,
            height: compact ? 6 : 10,
            borderRadius: 9999,
            background: BRAND,
            transform: "translate(-50%, 0)",
            boxShadow: `0 0 0 ${compact ? 2 : 3}px color-mix(in srgb, var(--color-brand) 18%, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export function PreviewReaderInbox({ compact }: PreviewProps) {
  const items = [
    { t: "First sketch", m: "01 min read" },
    { t: "Notes from today", m: "02 min read" },
    { t: "Tone tests", m: "03 min read" },
    { t: "On restraint", m: "04 min read" },
  ];
  const list = compact ? items.slice(0, 3) : items;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--color-surface-2)",
        padding: compact ? "16px 10px" : "56px 16px 24px",
        fontFamily: "-apple-system, system-ui",
      }}
    >
      <div
        style={{
          fontSize: compact ? 18 : 30,
          fontWeight: 700,
          color: "var(--color-text-primary)",
          padding: compact ? "0 4px 10px" : "0 4px 14px",
        }}
      >
        Inbox
      </div>
      <div
        style={{
          background: "var(--color-surface-0)",
          borderRadius: compact ? 10 : 14,
          overflow: "hidden",
        }}
      >
        {list.map((it, i) => (
          <div
            key={i}
            style={{
              padding: compact ? "8px 10px" : "14px 16px",
              borderBottom: i < list.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: compact ? 11 : 15, color: "var(--color-text-primary)" }}>{it.t}</div>
              <div
                style={{
                  fontSize: compact ? 8 : 12,
                  color: "var(--color-text-tertiary)",
                  marginTop: 2,
                }}
              >
                {it.m}
              </div>
            </div>
            <div style={{ fontSize: compact ? 10 : 14, color: "var(--color-text-tertiary)" }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PreviewEaseViz({ active, compact }: PreviewProps) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const loop = (n: number) => {
      setT(((n - start) / 1400) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const N = 60;
  const path = Array.from({ length: N }, (_, i) => {
    const x = i / (N - 1);
    const y = ease(x);
    return `${i === 0 ? "M" : "L"}${(x * 200).toFixed(1)} ${((1 - y) * 120 + 12).toFixed(1)}`;
  }).join(" ");

  const headX = t * 200;
  const headY = (1 - ease(t)) * 120 + 12;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--color-surface-0)",
        padding: compact ? 10 : 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!compact && (
        <div
          style={{
            fontFamily: "var(--font-mono, 'Geist Mono Variable')",
            fontSize: 10,
            color: "var(--color-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          easeout · cubic-bezier(0, 0, 0.2, 1)
        </div>
      )}
      <svg
        viewBox="0 0 200 144"
        preserveAspectRatio="none"
        style={{ width: "100%", flex: 1, marginTop: compact ? 0 : 8 }}
      >
        <line x1="0" y1="132" x2="200" y2="132" stroke="var(--color-border-subtle)" strokeWidth="0.5" />
        <line x1="0" y1="12" x2="0" y2="132" stroke="var(--color-border-subtle)" strokeWidth="0.5" />
        <path d={path} stroke={BRAND} strokeWidth="2" fill="none" />
        <circle cx={headX} cy={headY} r="4" fill={BRAND} />
      </svg>
    </div>
  );
}

export const LAB_PREVIEWS: Record<
  string,
  (props: PreviewProps) => React.ReactElement
> = {
  "scroll-field": PreviewScrollField,
  "wave-study": PreviewWaveStudy,
  "time-card": PreviewTimeCard,
  "reader-inbox": PreviewReaderInbox,
  "ease-viz": PreviewEaseViz,
};
