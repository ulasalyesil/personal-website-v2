/**
 * The values the HUD chrome prints.
 *
 * The rule for this file: every readout is measured, never written. The build
 * pair is parsed out of git and the token layer in `next.config.js`; the
 * ratios below are computed from the exact hex the hero paints with, so a
 * palette edit moves the number on screen without anyone remembering to.
 * Anything that cannot be measured is left out rather than invented.
 */

export const BUILD = {
  ref: process.env.NEXT_PUBLIC_BUILD_REF,
  branch: process.env.NEXT_PUBLIC_BUILD_BRANCH,
  tokens: process.env.NEXT_PUBLIC_TOKEN_COUNT,
  overrides: process.env.NEXT_PUBLIC_TOKEN_OVERRIDES,
} as const;

/** WCAG 2.x relative luminance. Expects `#rgb` or `#rrggbb`. */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contrast ratio between two hex colours, 1–21. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** `16.10:1`, the form a spec sheet uses. */
export function ratio(a: string, b: string): string {
  return `${contrast(a, b).toFixed(2)}:1`;
}

/** The WCAG grade this pair earns at body size, stated plainly. */
export function grade(a: string, b: string): "AAA" | "AA" | "FAIL" {
  const value = contrast(a, b);
  return value >= 7 ? "AAA" : value >= 4.5 ? "AA" : "FAIL";
}
