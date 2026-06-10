import { describe, it, expect } from "vitest";
import { scatter, scatterAt, seedRand, overlaps, type Placed, type Rect } from "./scatter";
import type { LabItem } from "./data";

// Local factory instead of LAB_ITEMS so tests stay stable when real items change.
const item = (slug: string, w: number, h: number): LabItem => ({
  slug,
  title: slug,
  tag: "code",
  date: "",
  frame: "none" as const,
  preview: slug,
  w,
  h,
  blurb: "",
});

// Sized like the real LAB_ITEMS (280–460 × 240–380).
const standardItems = [
  item("a", 460, 300),
  item("b", 420, 240),
  item("c", 280, 380),
  item("d", 280, 380),
  item("e", 400, 260),
];

const W = 1200;
const H = 800;

const inBounds = (p: Placed) => p.x >= 0 && p.y >= 0 && p.x + p.w <= W && p.y + p.h <= H;

describe("seedRand", () => {
  it("produces values in [0, 1)", () => {
    const rand = seedRand(7);
    for (let i = 0; i < 1000; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("overlaps", () => {
  const a: Rect = { x: 0, y: 0, w: 10, h: 10 };

  it("touching rects do not overlap at gutter 0", () => {
    const touching: Rect = { x: 10, y: 0, w: 10, h: 10 };
    expect(overlaps(a, touching, 0)).toBe(false);
  });

  it("touching rects overlap at gutter 1", () => {
    const touching: Rect = { x: 10, y: 0, w: 10, h: 10 };
    expect(overlaps(a, touching, 1)).toBe(true);
  });

  it("fully disjoint rects do not overlap", () => {
    const far: Rect = { x: 100, y: 100, w: 10, h: 10 };
    expect(overlaps(a, far, 0)).toBe(false);
  });

  it("fully contained rect overlaps", () => {
    const inner: Rect = { x: 2, y: 2, w: 4, h: 4 };
    expect(overlaps(a, inner, 0)).toBe(true);
  });
});

describe("scatter", () => {
  it("is deterministic for a given seed", () => {
    const first = scatter(standardItems, W, H, seedRand(42), []);
    const second = scatter(standardItems, W, H, seedRand(42), []);
    expect(second).toEqual(first);
  });

  it("differs for a different seed", () => {
    const a = scatter(standardItems, W, H, seedRand(42), []);
    const b = scatter(standardItems, W, H, seedRand(43), []);
    expect(JSON.stringify(b)).not.toBe(JSON.stringify(a));
  });

  it("places items with no pairwise overlaps", () => {
    const placed = scatter(standardItems, W, H, seedRand(42), []);
    expect(placed.length).toBe(standardItems.length);
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        expect(overlaps(placed[i], placed[j], 0)).toBe(false);
      }
    }
  });

  it("places every item in bounds", () => {
    const placed = scatter(standardItems, W, H, seedRand(42), []);
    for (const p of placed) {
      expect(inBounds(p)).toBe(true);
    }
  });

  it("avoids obstacles", () => {
    // Mirrors the real safe-area title block.
    const obstacle: Rect = { x: 0, y: 0, w: 420, h: 80 };
    const placed = scatter(standardItems, W, H, seedRand(42), [obstacle]);
    expect(placed.length).toBe(standardItems.length);
    for (const p of placed) {
      expect(overlaps(p, obstacle, 0)).toBe(false);
    }
  });

  it("never throws on a degenerate canvas", () => {
    const placed = scatter(standardItems, 60, 60, seedRand(1), []);
    expect(Array.isArray(placed)).toBe(true);
  });
});

describe("scatterAt", () => {
  it("returns null when items cannot fit at scale 1 on a tiny canvas", () => {
    const out = scatterAt(standardItems, 100, 100, 1, seedRand(5), []);
    expect(out).toBeNull();
  });
});
