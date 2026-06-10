import type { LabItem } from "./data";

export type Placed = { x: number; y: number; w: number; h: number; item: LabItem };

const MARGIN = 24;
const GUTTER = 32;
const MAX_TRIES = 600;

// Deterministic per-session seeded random so StaticRender + Hydration align.
export function seedRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export type Rect = { x: number; y: number; w: number; h: number };

export function overlaps(a: Rect, b: Rect, gutter = 0) {
  return (
    a.x < b.x + b.w + gutter &&
    a.x + a.w + gutter > b.x &&
    a.y < b.y + b.h + gutter &&
    a.y + a.h + gutter > b.y
  );
}

// Attempts scatter at a given scale. Returns null if any card can't be placed
// without overlapping another card or an obstacle — caller retries at a
// smaller scale.
export function scatterAt(
  items: LabItem[],
  W: number,
  H: number,
  scale: number,
  rand: () => number,
  obstacles: Rect[],
): Placed[] | null {
  const sized = items.map((it) => ({
    item: it,
    w: Math.round(it.w * scale),
    h: Math.round(it.h * scale),
  }));

  const placed: Placed[] = [];
  // Biggest first — they're the hardest to fit.
  const order = [...sized].sort((a, b) => b.w * b.h - a.w * a.h);

  for (const s of order) {
    let pos: Rect | null = null;
    for (let t = 0; t < MAX_TRIES && !pos; t++) {
      const cand: Rect = {
        x: MARGIN + rand() * Math.max(0, W - s.w - MARGIN * 2),
        y: MARGIN + rand() * Math.max(0, H - s.h - MARGIN * 2),
        w: s.w,
        h: s.h,
      };
      const hitCard = placed.some((p) => overlaps(cand, p, GUTTER));
      const hitObs = obstacles.some((r) => overlaps(cand, r, GUTTER / 2));
      if (!hitCard && !hitObs) pos = cand;
    }
    // Deterministic grid-scan fallback, bottom-right → top-left, so if
    // rejection sampling got unlucky we still find a non-overlapping cell.
    if (!pos) pos = gridScan(s, W, H, placed, obstacles);
    if (!pos) return null;
    placed.push({ ...pos, item: s.item });
  }
  return placed;
}

function gridScan(
  s: { w: number; h: number },
  W: number,
  H: number,
  placed: Placed[],
  obstacles: Rect[],
): Rect | null {
  const step = 16;
  for (let y = H - s.h - MARGIN; y >= MARGIN; y -= step) {
    for (let x = W - s.w - MARGIN; x >= MARGIN; x -= step) {
      const cand: Rect = { x, y, w: s.w, h: s.h };
      const hitCard = placed.some((p) => overlaps(cand, p, GUTTER));
      const hitObs = obstacles.some((r) => overlaps(cand, r, GUTTER / 2));
      if (!hitCard && !hitObs) return cand;
    }
  }
  return null;
}

export function scatter(
  items: LabItem[],
  W: number,
  H: number,
  rand: () => number,
  obstacles: Rect[] = [],
): Placed[] {
  const maxW = Math.max(...items.map((i) => i.w));
  const maxH = Math.max(...items.map((i) => i.h));
  let scale = Math.min(1, (W * 0.38) / maxW, (H * 0.5) / maxH);
  // Retry at progressively smaller scales until everything fits cleanly.
  for (let i = 0; i < 8; i++) {
    const out = scatterAt(items, W, H, scale, rand, obstacles);
    if (out) return out;
    scale *= 0.9;
  }
  // Extreme degenerate case (tiny canvas): accept last attempt even if lossy.
  return scatterAt(items, W, H, scale, rand, obstacles) ?? [];
}
