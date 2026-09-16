#!/usr/bin/env node
// Build the data behind the design-system study's token figure.
//
//   node scripts/extract-token-values.mjs <path to Colors.xcassets/tokens>
//
// Reads the shipped color catalog, where every semantic token is a colorset
// holding a light value and a dark value. Writes only what the figure draws:
// each token's two values, grouped by category. Token names are dropped on
// purpose. The catalog is private product code and this repo is public.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2];
if (!root) {
  console.error(
    "usage: node scripts/extract-token-values.mjs <tokens directory>"
  );
  process.exit(1);
}

const OUT = "app/(case-study)/getirfinans-design-system/token-values.json";

// Catalog folder -> label on the page, in the order the figure shows them.
const GROUPS = [
  ["bg", "Background"],
  ["icon", "Icon"],
  ["text", "Text"],
  ["border", "Border"],
  ["gradients", "Gradient"],
  ["chart", "Chart"],
  ["shadows", "Shadow"],
];

function channel(value) {
  return value.startsWith("0x")
    ? parseInt(value, 16)
    : Math.round(parseFloat(value) * 255);
}

function toValue(entry) {
  const c = entry.color.components;
  const hex = [c.red, c.green, c.blue].map((v) =>
    channel(v).toString(16).padStart(2, "0")
  );
  return {
    hex: `#${hex.join("").toUpperCase()}`,
    alpha: Math.round(parseFloat(c.alpha) * 100) / 100,
  };
}

function colorsets(dir) {
  return readdirSync(dir)
    .sort()
    .flatMap((name) => {
      const path = join(dir, name);
      if (!statSync(path).isDirectory()) return [];
      return name.endsWith(".colorset") ? [path] : colorsets(path);
    });
}

const groups = GROUPS.map(([folder, label]) => {
  const tokens = colorsets(join(root, folder)).map((path) => {
    const { colors } = JSON.parse(
      readFileSync(join(path, "Contents.json"), "utf8")
    );
    const isDark = (e) => e.appearances?.some((a) => a.value === "dark");
    const light = toValue(colors.find((e) => !e.appearances));
    const darkEntry = colors.find(isDark);
    const dark = darkEntry ? toValue(darkEntry) : light;
    const fixed = light.hex === dark.hex && light.alpha === dark.alpha;
    return { light, dark, fixed };
  });
  // Tokens that move first, anchors last, so the fixed ones read as a group.
  tokens.sort((a, b) => Number(a.fixed) - Number(b.fixed));
  return { label, tokens };
});

writeFileSync(OUT, JSON.stringify({ groups }, null, 2) + "\n");

const all = groups.flatMap((g) => g.tokens);
console.log(
  `${all.length} tokens, ${all.filter((t) => t.fixed).length} fixed -> ${OUT}`
);
for (const g of groups) {
  console.log(
    `  ${g.label.padEnd(11)} ${g.tokens.length} / ${g.tokens.filter((t) => t.fixed).length}`
  );
}
