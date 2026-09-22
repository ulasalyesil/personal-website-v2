/**
 * Colour math for the Brand Layers lab: OKLCH in, sRGB hex out, and WCAG
 * contrast between two hex values.
 *
 * Ramps are authored in OKLCH because its lightness is perceptual: equal
 * steps look equal, and hue holds when lightness changes. The site's own
 * tokens are hex, so everything leaves this module as hex.
 */

type RGB = [number, number, number];

function oklchToLinearSrgb(l: number, c: number, hDeg: number): RGB {
  const h = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;

  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
}

const inGamut = (rgb: RGB) => rgb.every((v) => v >= -1e-4 && v <= 1 + 1e-4);

function encode(v: number): number {
  const x = Math.min(1, Math.max(0, v));
  return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
}

const toHex = (rgb: RGB) =>
  "#" +
  rgb
    .map((v) =>
      Math.round(encode(v) * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("");

/**
 * OKLCH to hex. Out-of-gamut colours keep their lightness and hue and lose
 * chroma until they fit, which is what a ramp needs: a step may get less
 * vivid, but it never gets lighter, darker, or drifts toward another hue.
 */
export function oklchToHex(l: number, c: number, h: number): string {
  let lo = 0;
  let hi = c;
  if (inGamut(oklchToLinearSrgb(l, c, h)))
    return toHex(oklchToLinearSrgb(l, c, h));
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToLinearSrgb(l, mid, h))) lo = mid;
    else hi = mid;
  }
  return toHex(oklchToLinearSrgb(l, lo, h));
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio, 1 to 21. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
