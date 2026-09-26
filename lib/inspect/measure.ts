/**
 * The arithmetic behind inspect mode, kept free of the DOM so it can be
 * tested. The overlay hands in rects, computed style strings and class
 * lists; everything it prints comes out of here.
 *
 * Same rule as `lib/system-facts.ts`: a value is measured or it is not
 * shown. A colour that matches no token says so rather than guessing the
 * nearest one.
 */

export type Rect = { top: number; right: number; bottom: number; left: number };

export type Rgba = { r: number; g: number; b: number; a: number };

/** `rgb(23, 23, 23)`, `rgba(0 0 0 / 0.1)` and friends, as the browser
 *  serialises a computed colour. Anything else (keywords, `oklch()`) is
 *  null: the caller resolves colours through the browser first. */
export function parseRgb(value: string): Rgba | null {
  const m = value
    .trim()
    .match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i);
  if (!m) return null;
  const alpha = m[4] === undefined ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: alpha };
}

/** `#f5f5f5` or `#fff` as an opaque colour; null for anything else. */
export function parseHex(value: string): Rgba | null {
  const m = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1];
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: 1,
  };
}

/** The serialisation a browser gives an opaque computed colour, so a value
 *  from the page can be compared with one from a stylesheet as strings. */
export function toRgbString({ r, g, b }: Rgba): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export function toHex({ r, g, b }: Rgba): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

/** Paints `top` over an opaque `bottom`, the way the screen does. */
export function composite(top: Rgba, bottom: Rgba): Rgba {
  const a = top.a;
  return {
    r: top.r * a + bottom.r * (1 - a),
    g: top.g * a + bottom.g * (1 - a),
    b: top.b * a + bottom.b * (1 - a),
    a: 1,
  };
}

/**
 * Resolves a stack of backgrounds, nearest ancestor first, into the one
 * opaque colour the text actually sits on. Stops at the first opaque layer;
 * if nothing is opaque the canvas is assumed to be `fallback`.
 */
export function effectiveBackground(stack: Rgba[], fallback: Rgba): Rgba {
  const layers: Rgba[] = [];
  for (const layer of stack) {
    if (layer.a <= 0) continue;
    layers.push(layer);
    if (layer.a >= 1) break;
  }
  let base = layers.length && layers[layers.length - 1].a >= 1 ? layers.pop()! : fallback;
  for (let i = layers.length - 1; i >= 0; i--) base = composite(layers[i], base);
  return base;
}

/**
 * Distances from `inner` to the edges of `outer` when one contains the
 * other, which is what a canvas tool shows against a parent. For two boxes
 * that sit apart, only the axes with a real gap between them are returned.
 */
export function gaps(a: Rect, b: Rect): Partial<Record<"top" | "right" | "bottom" | "left", number>> {
  const contains = (o: Rect, i: Rect) =>
    i.top >= o.top && i.left >= o.left && i.bottom <= o.bottom && i.right <= o.right;

  if (contains(b, a) || contains(a, b)) {
    const [o, i] = contains(b, a) ? [b, a] : [a, b];
    return {
      top: i.top - o.top,
      right: o.right - i.right,
      bottom: o.bottom - i.bottom,
      left: i.left - o.left,
    };
  }

  const out: Partial<Record<"top" | "right" | "bottom" | "left", number>> = {};
  if (b.bottom <= a.top) out.top = a.top - b.bottom;
  if (b.top >= a.bottom) out.bottom = b.top - a.bottom;
  if (b.right <= a.left) out.left = a.left - b.right;
  if (b.left >= a.right) out.right = b.left - a.right;
  return out;
}

export type Redline = { x1: number; y1: number; x2: number; y2: number; value: number };

const mid = (a: number, b: number) => (a + b) / 2;

/**
 * The lines a canvas tool draws between two boxes, one per measured gap.
 * Against a containing box they run from the inner box's centre lines out
 * to each edge; between boxes that sit apart they run across the gap,
 * through the middle of wherever the two overlap.
 */
export function redlines(a: Rect, b: Rect): Redline[] {
  const g = gaps(a, b);
  const lines: Redline[] = [];
  const push = (x1: number, y1: number, x2: number, y2: number, value: number | undefined) => {
    if (value && value >= 1) lines.push({ x1, y1, x2, y2, value: Math.round(value) });
  };

  const inside = (o: Rect, i: Rect) =>
    i.top >= o.top && i.left >= o.left && i.bottom <= o.bottom && i.right <= o.right;
  const nested = inside(b, a) || inside(a, b);

  if (nested) {
    const [o, i] = inside(b, a) ? [b, a] : [a, b];
    const cx = mid(i.left, i.right);
    const cy = mid(i.top, i.bottom);
    push(cx, o.top, cx, i.top, g.top);
    push(cx, i.bottom, cx, o.bottom, g.bottom);
    push(o.left, cy, i.left, cy, g.left);
    push(i.right, cy, o.right, cy, g.right);
    return lines;
  }

  const overlapX = Math.max(a.left, b.left) < Math.min(a.right, b.right);
  const overlapY = Math.max(a.top, b.top) < Math.min(a.bottom, b.bottom);
  const x = overlapX ? mid(Math.max(a.left, b.left), Math.min(a.right, b.right)) : mid(a.left, a.right);
  const y = overlapY ? mid(Math.max(a.top, b.top), Math.min(a.bottom, b.bottom)) : mid(a.top, a.bottom);
  push(x, b.bottom, x, a.top, g.top);
  push(x, a.bottom, x, b.top, g.bottom);
  push(b.right, y, a.left, y, g.left);
  push(a.right, y, b.left, y, g.right);
  return lines;
}

const MODULE_CLASS = /^([A-Z][A-Za-z0-9]*)_(.+?)__[A-Za-z0-9_-]{5}$/;

/** `SelectedWork_title__Ab3xY` → `SelectedWork › title`. Null for anything
 *  that is not a CSS-module class (utilities, third-party names). */
export function componentName(classes: Iterable<string>): string | null {
  for (const c of classes) {
    const m = c.match(MODULE_CLASS);
    if (m) return `${m[1]} › ${m[2]}`;
  }
  return null;
}

/** Four computed padding values, collapsed the way CSS shorthand would. */
export function shorthand(top: number, right: number, bottom: number, left: number): string {
  const v = [top, right, bottom, left].map((n) => String(Math.round(n)));
  if (v.every((x) => x === v[0])) return v[0];
  if (v[0] === v[2] && v[1] === v[3]) return `${v[0]} ${v[1]}`;
  return v.join(" ");
}

/**
 * Value → token names, for values already resolved by the browser into the
 * same serialisation the inspected element reports. Several tokens can
 * share a value (`surface-2` and `border-subtle` are both `#e5e5e5`), so
 * every name is kept in declaration order.
 */
export function tokenIndex(
  entries: Iterable<[name: string, resolved: string]>,
): Map<string, string[]> {
  const index = new Map<string, string[]>();
  for (const [name, resolved] of entries) {
    const key = resolved.replace(/\s+/g, "");
    if (!key) continue;
    const names = index.get(key);
    if (names) names.push(name);
    else index.set(key, [name]);
  }
  return index;
}

/** The token behind a value. `prefer` names the family the property belongs
 *  to (`text` for a text colour, `surface` for a background), which is how a
 *  shared value is attributed to the role it is actually playing. */
export function lookup(
  index: Map<string, string[]>,
  value: string,
  prefer?: string,
): string | null {
  const names = index.get(value.replace(/\s+/g, ""));
  if (!names) return null;
  return (prefer && names.find((n) => n.includes(`-${prefer}`))) || names[0];
}
