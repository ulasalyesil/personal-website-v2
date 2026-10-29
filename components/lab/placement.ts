/**
 * Where each lab item sits on the one-screen canvas.
 *
 * The canvas is a board of 16 × 9 cells filling the content column under the
 * intro, so a placement means the same thing at every desktop size.
 * Plan: vault `03-projects/personal-website/lab/2026-10-29-lab-one-screen-plan.md`.
 */
export const ARTBOARD = { cols: 16, rows: 9 } as const;

export type TileSize = "lg" | "md" | "phone";

/** Footprint in cells. md is 16:10 work, phone fits the bezel (0.49). */
export const TILE: Record<TileSize, { w: number; h: number }> = {
  lg: { w: 5, h: 3 },
  md: { w: 3, h: 2 },
  phone: { w: 2, h: 4 },
};

/** Top-left cell, 1-based, like CSS grid lines. */
export type Placement = { size: TileSize; col: number; row: number };

export type Composition = Record<string, Placement>;

/** Flagship in the middle, everything else around it (picked 2026-10-29). */
export const PLACEMENT: Composition = {
  flow: { size: "lg", col: 6, row: 4 },
  "brand-layers": { size: "md", col: 6, row: 1 },
  "elastic-type": { size: "md", col: 10, row: 1 },
  "fx-chart-range": { size: "phone", col: 2, row: 2 },
  "feature-area": { size: "phone", col: 14, row: 1 },
  campaigns: { size: "phone", col: 12, row: 6 },
  "qr-code-icons": { size: "md", col: 14, row: 6 },
  "common-ground": { size: "md", col: 1, row: 7 },
  "pre-approval-concept": { size: "md", col: 5, row: 8 },
  "dark-mode": { size: "md", col: 9, row: 8 },
};
