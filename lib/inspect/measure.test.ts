import { describe, expect, it } from "vitest";
import {
  componentName,
  composite,
  effectiveBackground,
  gaps,
  lookup,
  parseHex,
  parseRgb,
  redlines,
  shorthand,
  toHex,
  toRgbString,
  tokenIndex,
} from "./measure";

const WHITE = { r: 255, g: 255, b: 255, a: 1 };

describe("colour", () => {
  it("parses both computed-colour serialisations", () => {
    expect(parseRgb("rgb(23, 23, 23)")).toEqual({ r: 23, g: 23, b: 23, a: 1 });
    expect(parseRgb("rgba(0, 0, 0, 0.1)")).toEqual({ r: 0, g: 0, b: 0, a: 0.1 });
    expect(parseRgb("rgb(0 0 0 / 50%)")).toEqual({ r: 0, g: 0, b: 0, a: 0.5 });
    expect(parseRgb("oklch(0.5 0.1 20)")).toBeNull();
  });

  it("reads stylesheet hex into the computed serialisation", () => {
    expect(toRgbString(parseHex("#f5f5f5")!)).toBe("rgb(245, 245, 245)");
    expect(toRgbString(parseHex("#fff")!)).toBe("rgb(255, 255, 255)");
    expect(parseHex("var(--x)")).toBeNull();
  });

  it("round-trips to hex", () => {
    expect(toHex({ r: 201, g: 66, b: 0, a: 1 })).toBe("#c94200");
  });

  it("composites a translucent layer over an opaque one", () => {
    expect(toHex(composite({ r: 0, g: 0, b: 0, a: 0.5 }, WHITE))).toBe("#808080");
  });
});

describe("effectiveBackground", () => {
  it("skips transparent layers and stops at the first opaque one", () => {
    const stack = [
      { r: 0, g: 0, b: 0, a: 0 },
      { r: 10, g: 10, b: 10, a: 1 },
      WHITE,
    ];
    expect(toHex(effectiveBackground(stack, WHITE))).toBe("#0a0a0a");
  });

  it("composites translucent layers onto what is beneath them", () => {
    const stack = [{ r: 0, g: 0, b: 0, a: 0.5 }, WHITE];
    expect(toHex(effectiveBackground(stack, WHITE))).toBe("#808080");
  });

  it("falls back to the canvas when nothing is painted", () => {
    expect(effectiveBackground([], WHITE)).toEqual(WHITE);
  });
});

describe("gaps", () => {
  const parent = { top: 0, left: 0, right: 400, bottom: 300 };

  it("measures a child against the parent it sits in, either way round", () => {
    const child = { top: 24, left: 32, right: 368, bottom: 276 };
    const expected = { top: 24, right: 32, bottom: 24, left: 32 };
    expect(gaps(child, parent)).toEqual(expected);
    expect(gaps(parent, child)).toEqual(expected);
  });

  it("measures only the real gaps between boxes that sit apart", () => {
    const a = { top: 0, left: 0, right: 100, bottom: 50 };
    const below = { top: 74, left: 0, right: 100, bottom: 120 };
    expect(gaps(a, below)).toEqual({ bottom: 24 });
    const diagonal = { top: 80, left: 140, right: 200, bottom: 120 };
    expect(gaps(a, diagonal)).toEqual({ bottom: 30, right: 40 });
  });
});

describe("redlines", () => {
  it("runs from a nested box's centre lines out to each parent edge", () => {
    const parent = { top: 0, left: 0, right: 400, bottom: 300 };
    const child = { top: 24, left: 32, right: 368, bottom: 276 };
    expect(redlines(child, parent)).toEqual([
      { x1: 200, y1: 0, x2: 200, y2: 24, value: 24 },
      { x1: 200, y1: 276, x2: 200, y2: 300, value: 24 },
      { x1: 0, y1: 150, x2: 32, y2: 150, value: 32 },
      { x1: 368, y1: 150, x2: 400, y2: 150, value: 32 },
    ]);
  });

  it("crosses the gap between separate boxes through their overlap", () => {
    const a = { top: 0, left: 0, right: 100, bottom: 50 };
    const below = { top: 74, left: 50, right: 200, bottom: 120 };
    expect(redlines(a, below)).toEqual([{ x1: 75, y1: 50, x2: 75, y2: 74, value: 24 }]);
  });

  it("draws nothing for edges that touch", () => {
    const a = { top: 0, left: 0, right: 100, bottom: 50 };
    expect(redlines(a, { ...a })).toEqual([]);
  });
});

describe("componentName", () => {
  it("reads the file and local name out of a module class", () => {
    expect(componentName(["SelectedWork_title__Ab3xY"])).toBe("SelectedWork › title");
  });

  it("copes with hashes that start with or contain an underscore", () => {
    expect(componentName(["ModeSplitHero_nav___t8Rb"])).toBe("ModeSplitHero › nav");
    expect(componentName(["Hud_corner__e_M2g"])).toBe("Hud › corner");
  });

  it("ignores utility classes", () => {
    expect(componentName(["bg-surface-0", "text-text-primary"])).toBeNull();
  });
});

describe("shorthand", () => {
  it("collapses like CSS shorthand", () => {
    expect(shorthand(8, 8, 8, 8)).toBe("8");
    expect(shorthand(24, 32, 24, 32)).toBe("24 32");
    expect(shorthand(1, 2, 3, 4)).toBe("1 2 3 4");
  });
});

describe("tokens", () => {
  const index = tokenIndex([
    ["--color-surface-2", "rgb(229, 229, 229)"],
    ["--color-border-subtle", "rgb(229, 229, 229)"],
    ["--color-text-primary", "rgb(23, 23, 23)"],
  ]);

  it("finds the token behind a resolved value, whitespace-insensitively", () => {
    expect(lookup(index, "rgb(23,23,23)")).toBe("--color-text-primary");
  });

  it("attributes a shared value to the role the property plays", () => {
    expect(lookup(index, "rgb(229, 229, 229)", "border")).toBe("--color-border-subtle");
    expect(lookup(index, "rgb(229, 229, 229)", "surface")).toBe("--color-surface-2");
    expect(lookup(index, "rgb(229, 229, 229)")).toBe("--color-surface-2");
  });

  it("returns null rather than the nearest token", () => {
    expect(lookup(index, "rgb(24, 23, 23)")).toBeNull();
  });
});
