import { describe, expect, it } from "vitest";
import { contrast, oklchToHex } from "./color";
import {
  BRANDS,
  MODES,
  SENTIMENTS,
  STATES,
  TOKENS,
  contrastChecks,
  resolveAll,
  resolveToken,
  tokenCount,
} from "./resolve";

const combos = BRANDS.flatMap((brand) =>
  MODES.flatMap((mode) =>
    SENTIMENTS.map((sentiment) => ({ brand, mode, sentiment }))
  )
);

describe("color", () => {
  it("maps OKLCH extremes to white and black", () => {
    expect(oklchToHex(1, 0, 0)).toBe("#ffffff");
    expect(oklchToHex(0, 0, 0)).toBe("#000000");
  });

  it("computes WCAG contrast", () => {
    expect(contrast("#ffffff", "#000000")).toBeCloseTo(21, 5);
    expect(contrast("#777777", "#777777")).toBe(1);
  });
});

describe("resolver", () => {
  it("resolves every token in all 120 combinations with no missing reference", () => {
    expect(combos.length * STATES.length).toBe(120);
    for (const combo of combos) {
      for (const state of STATES) {
        for (const t of TOKENS) {
          expect(resolveToken(t, combo, state).hex).toMatch(/^#[0-9a-f]{6}$/);
        }
      }
    }
  });

  it("changes proposition with the brand and keeps status hues shared", () => {
    const a = { brand: "a", mode: "light" } as const;
    const c = { brand: "c", mode: "light" } as const;
    const t = "interactive/primary";
    expect(
      resolveToken(t, { ...a, sentiment: "proposition" }, "default").hex
    ).not.toBe(
      resolveToken(t, { ...c, sentiment: "proposition" }, "default").hex
    );
    expect(resolveToken(t, { ...a, sentiment: "success" }, "default").hex).toBe(
      resolveToken(t, { ...c, sentiment: "success" }, "default").hex
    );
  });

  it("ends every trace on the primitive it resolved to", () => {
    const r = resolveToken(
      "interactive/primary",
      { brand: "b", mode: "dark", sentiment: "proposition" },
      "hover"
    );
    expect(r.trace[0]).toEqual({
      layer: "global",
      text: "interactive/primary",
    });
    expect(r.trace.at(-1)?.text).toBe(`${r.primitive} = ${r.hex}`);
    expect(r.primitive).toBe("teal-200");
  });
});

describe("contrast", () => {
  it("clears WCAG for every rendered pair in every combination", () => {
    const failures = combos.flatMap((combo) =>
      contrastChecks(resolveAll(combo))
        .filter((c) => !c.pass)
        .map(
          (c) =>
            `${combo.brand}/${combo.mode}/${combo.sentiment} ${c.fg} on ${c.bg} [${c.state}] ${c.ratio.toFixed(2)} < ${c.min}`
        )
    );
    expect(failures).toEqual([]);
  });
});

describe("count", () => {
  it("defines far fewer values than a flat system would store", () => {
    const { flat, defined } = tokenCount();
    expect(flat).toBeGreaterThan(defined * 3);
  });
});
