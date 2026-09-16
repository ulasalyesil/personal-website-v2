import data from "./token-values.json";
import { cn } from "@/lib/cn";

// Every semantic color token in the shipped app, drawn from the production
// catalog by scripts/extract-token-values.mjs. Nothing here is retyped.

interface Value {
  hex: string;
  alpha: number;
}

interface Token {
  light: Value;
  dark: Value;
  fixed: boolean;
}

// The app's default surfaces, so a translucent token shows as it lands on screen.
const LIGHT_SURFACE = "#FFFFFF";
const DARK_SURFACE = "#0E0E0E";

function paint({ hex, alpha }: Value, surface: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const color = `rgb(${r} ${g} ${b} / ${alpha})`;
  return `linear-gradient(${color}, ${color}), ${surface}`;
}

function Swatch({ token, className }: { token: Token; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-4 flex-col overflow-hidden rounded-[3px] ring-1 ring-border-default",
        token.fixed && "ring-2 ring-text-primary",
        className
      )}
    >
      <span
        className="flex-1"
        style={{ background: paint(token.light, LIGHT_SURFACE) }}
      />
      <span
        className="flex-1"
        style={{ background: paint(token.dark, DARK_SURFACE) }}
      />
    </span>
  );
}

const SAMPLE_MOVING: Token = {
  light: { hex: "#FFFFFF", alpha: 1 },
  dark: { hex: "#0E0E0E", alpha: 1 },
  fixed: false,
};
const SAMPLE_FIXED: Token = {
  light: { hex: "#5D3EBC", alpha: 1 },
  dark: { hex: "#5D3EBC", alpha: 1 },
  fixed: true,
};

export default function TokenValues() {
  const groups = data.groups as { label: string; tokens: Token[] }[];
  const all = groups.flatMap((g) => g.tokens);
  const fixed = all.filter((t) => t.fixed).length;

  return (
    <div className="rounded-lg bg-surface-1 p-5 sm:p-6">
      <p className="font-mono text-caption text-text-secondary">
        {all.length} tokens, {fixed} fixed
      </p>

      <dl className="mt-5 space-y-4">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
          >
            <dt className="flex items-baseline justify-between gap-2 text-caption sm:flex-col sm:justify-start sm:gap-0">
              <span className="text-text-primary">{group.label}</span>
              <span className="font-mono text-text-tertiary">
                {group.tokens.filter((t) => t.fixed).length} of{" "}
                {group.tokens.length} fixed
              </span>
            </dt>
            <dd className="flex flex-wrap gap-1.5" aria-hidden>
              {group.tokens.map((token, i) => (
                <Swatch key={i} token={token} />
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-subtle pt-4 text-caption text-text-secondary"
        aria-hidden
      >
        <span className="flex items-center gap-2">
          <Swatch token={SAMPLE_MOVING} />
          Light value above, dark value below
        </span>
        <span className="flex items-center gap-2">
          <Swatch token={SAMPLE_FIXED} />
          Same value in both modes
        </span>
      </div>
    </div>
  );
}
