export const WORDS = [
  "Still",
  "Quiet",
  "Gentle",
  "Fluid",
  "Elastic",
  "Restless",
  "Electric",
  "Wild",
  "Free",
] as const;
export const LAST = WORDS.length - 1;
export const INITIAL = 4;
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/** Rubber-band the ends, without losing the pointer's uncompressed position. */
export function resist(value: number) {
  if (value < 0) return -1 + 1 / (1 - value * 0.32);
  if (value > LAST) return LAST + 1 - 1 / (1 + (value - LAST) * 0.32);
  return value;
}

/** Short projection keeps a flick useful without skipping the whole list. */
export function landing(position: number, velocity: number) {
  return clamp(
    Math.round(position + clamp(velocity * 0.13, -1.6, 1.6)),
    0,
    LAST
  );
}

export function pose(distance: number, bend: number, rowHeight: number) {
  const falloff = Math.exp(-(distance * distance) / 5);
  return {
    x: bend * (1 - falloff),
    rotation:
      (Math.atan((bend * 2 * distance * falloff) / (5 * rowHeight)) * 180) /
      Math.PI,
    scale: 1 - Math.min(Math.abs(distance) * 0.055, 0.24),
    opacity: Math.max(0.16, 1 - Math.abs(distance) * 0.2),
  };
}
