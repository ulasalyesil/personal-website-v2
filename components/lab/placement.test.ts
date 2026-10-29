import { describe, expect, it } from "vitest";
import { LAB_ITEMS } from "./data";
import { ARTBOARD, PLACEMENT as composition, TILE } from "./placement";

describe("lab placement", () => {
  it("places every lab item, and nothing else", () => {
    expect(Object.keys(composition).sort()).toEqual(LAB_ITEMS.map((i) => i.slug).sort());
  });

  it("keeps every tile on the artboard", () => {
    for (const [slug, p] of Object.entries(composition)) {
      const { w, h } = TILE[p.size];
      expect(p.col, slug).toBeGreaterThanOrEqual(1);
      expect(p.row, slug).toBeGreaterThanOrEqual(1);
      expect(p.col + w - 1, slug).toBeLessThanOrEqual(ARTBOARD.cols);
      expect(p.row + h - 1, slug).toBeLessThanOrEqual(ARTBOARD.rows);
    }
  });

  it("never overlaps two tiles", () => {
    const taken = new Map<string, string>();
    for (const [slug, p] of Object.entries(composition)) {
      const { w, h } = TILE[p.size];
      for (let c = p.col; c < p.col + w; c++) {
        for (let r = p.row; r < p.row + h; r++) {
          const cell = `${c},${r}`;
          expect(taken.get(cell), `${slug} lands on ${taken.get(cell)} at ${cell}`).toBeUndefined();
          taken.set(cell, slug);
        }
      }
    }
  });

  it("leaves air: covers 45 to 70% of the board", () => {
    const covered = Object.values(composition).reduce(
      (sum, p) => sum + TILE[p.size].w * TILE[p.size].h,
      0,
    );
    const ratio = covered / (ARTBOARD.cols * ARTBOARD.rows);
    expect(ratio).toBeGreaterThanOrEqual(0.45);
    expect(ratio).toBeLessThanOrEqual(0.7);
  });

  it("gives phone recordings, and only them, a phone tile", () => {
    for (const item of LAB_ITEMS) {
      expect(composition[item.slug].size === "phone", item.slug).toBe(item.media.device === "iphone");
    }
  });
});
