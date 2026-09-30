import { describe, expect, it } from "vitest";
import { landing, LAST, pose, resist } from "./physics";

describe("ribbon interaction boundaries", () => {
  it("resists overscroll continuously and keeps it within one row", () => {
    expect(resist(0)).toBe(0);
    expect(resist(LAST)).toBe(LAST);
    expect(resist(-0.001)).toBeCloseTo(0, 2);
    expect(resist(-100)).toBeGreaterThan(-1);
    expect(resist(LAST + 100)).toBeLessThan(LAST + 1);
  });
  it("caps flick travel and never lands outside the available words", () => {
    expect(landing(4, 100)).toBe(6);
    expect(landing(4, -100)).toBe(2);
    expect(landing(-0.8, -20)).toBe(0);
    expect(landing(LAST + 0.8, 20)).toBe(LAST);
    expect(landing(3.2, 0)).toBe(3);
  });
  it("keeps the selected word anchored and upright at any bend", () => {
    for (const bend of [-130, 0, 130]) {
      const result = pose(0, bend, 68);
      expect(result.x).toBeCloseTo(0);
      expect(result.rotation).toBeCloseTo(0);
      expect(result.scale).toBe(1);
      expect(result.opacity).toBe(1);
    }
  });
});
