"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
//
// Widget *chrome* (frames, headers, controls, spec rows) is built entirely on the
// site's semantic tokens — bg-surface-*, text-text-*, border-border-* — so every
// widget adapts to the visitor's light/dark preference automatically, with no
// `dark:` variants. The GetirFinans *product* colors being showcased are inline
// hex, because those are the specimens under discussion, not the site's theme.
// ─────────────────────────────────────────────────────────────────────────────

type Mode = "light" | "dark";

// GetirFinans product palette (the colors the case study is about).
const GF = {
  // Brand fill is mode-invariant — this is one of the case study's core claims.
  brand: "#5D3EBC",
  brandPressed: "#482F9B",
  brandDisabled: "#A99CD5",
  success: "#00B235",
  error: "#E23737",
};

// Resolve the product surface palette for a given mode.
function product(mode: Mode) {
  return mode === "light"
    ? {
        canvas: "#F8F7FC",
        surface: "#FFFFFF",
        surfaceSubtle: "#FAFAFA",
        text: "#0E0E0E",
        subtext: "#757575",
        border: "#EAEAEA",
        // text/action lightens in dark; brand *fill* stays #5D3EBC.
        accentText: "#5D3EBC",
      }
    : {
        canvas: "#0E0E0E",
        surface: "#1A1A1A",
        surfaceSubtle: "#262626",
        text: "#FFFFFF",
        subtext: "#A5A5A5",
        border: "#2E2E2E",
        accentText: "#B49FE6",
      };
}

/** Outer widget frame. */
function Widget({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-subtle bg-surface-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Widget header bar: label, optional mono subtitle, optional right-aligned control. */
function WidgetHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-5 py-4">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-text-primary">{title}</div>
        {subtitle && (
          <div className="mt-0.5 truncate font-mono text-[11px] text-text-tertiary">
            {subtitle}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Generic segmented control — one consistent toggle for every widget. */
function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-0.5 rounded-full border border-border-subtle bg-surface-2 p-0.5"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150",
              active
                ? "bg-surface-0 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const SunIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.36-6.36l-.7.7M6.34 17.66l-.7.7m12.72 0l-.7-.7M6.34 6.34l-.7-.7M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const MoonIcon = () => (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

/** Light/dark palette switch, shared by every widget that renders a product canvas. */
function PaletteToggle({ value, onChange }: { value: Mode; onChange: (m: Mode) => void }) {
  return (
    <Segmented<Mode>
      ariaLabel="Palette mode"
      value={value}
      onChange={onChange}
      options={[
        { value: "light", label: <><SunIcon /> Light</> },
        { value: "dark", label: <><MoonIcon /> Dark</> },
      ]}
    />
  );
}

/** Mono "token: value" spec row. */
function SpecRow({
  token,
  value,
  valueClassName,
}: {
  token: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
      <span className="text-text-tertiary">{token}</span>
      <span className={cn("font-medium text-text-secondary", valueClassName)}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. TOKEN FORMULA EXPLORER
// ─────────────────────────────────────────────────────────────────────────────

interface TokenMapEntry {
  tokenName: string;
  usage: string;
  lightHex: string;
  lightPrimitive: string;
  darkHex: string;
  darkPrimitive: string;
}

const TOKEN_DICTIONARY: Record<string, TokenMapEntry> = {
  "bg-action-primary": {
    tokenName: "bg/action/primary",
    usage: "Primary brand action buttons & active CTAs",
    lightHex: "#5D3EBC",
    lightPrimitive: "purple-dark.700",
    darkHex: "#5D3EBC",
    darkPrimitive: "purple-dark.700",
  },
  "bg-surface-default": {
    tokenName: "bg/surface/default",
    usage: "Default page background and main card surfaces",
    lightHex: "#FFFFFF",
    lightPrimitive: "neutral.white",
    darkHex: "#121212",
    darkPrimitive: "neutral.900",
  },
  "bg-surface-subtle": {
    tokenName: "bg/surface/subtle",
    usage: "Secondary surfaces & offset layout sections",
    lightHex: "#FAFAFA",
    lightPrimitive: "neutral.25",
    darkHex: "#1E1E1E",
    darkPrimitive: "neutral.800",
  },
  "bg-status-success": {
    tokenName: "bg/status/success",
    usage: "Positive feedback alerts and transaction success banners",
    lightHex: "#EDFDF0",
    lightPrimitive: "green.50",
    darkHex: "#0B4E1B",
    darkPrimitive: "green.900",
  },
  "bg-status-error": {
    tokenName: "bg/status/error",
    usage: "Error alerts, critical issues, and failure banners",
    lightHex: "#FDF2F2",
    lightPrimitive: "red.50",
    darkHex: "#661111",
    darkPrimitive: "red.900",
  },
  "text-action-primary": {
    tokenName: "text/action/primary",
    usage: "Interactive text links and text on secondary buttons",
    lightHex: "#5D3EBC",
    lightPrimitive: "purple-dark.700",
    darkHex: "#B49FE6",
    darkPrimitive: "purple-light.300",
  },
  "text-content-primary": {
    tokenName: "text/content/primary",
    usage: "Primary readable titles and body copy",
    lightHex: "#0E0E0E",
    lightPrimitive: "neutral.1000",
    darkHex: "#FFFFFF",
    darkPrimitive: "neutral.white",
  },
  "text-content-secondary": {
    tokenName: "text/content/secondary",
    usage: "Secondary descriptions, helper text, and subtitles",
    lightHex: "#757575",
    lightPrimitive: "neutral.600",
    darkHex: "#A5A5A5",
    darkPrimitive: "neutral.400",
  },
  "text-content-inverse": {
    tokenName: "text/content/inverse",
    usage: "Typography overlaying primary brand colors (e.g. button labels)",
    lightHex: "#FFFFFF",
    lightPrimitive: "neutral.white",
    darkHex: "#FFFFFF",
    darkPrimitive: "neutral.white",
  },
  "border-input-default": {
    tokenName: "border/input/default",
    usage: "Default boundary borders for inputs and dropdowns",
    lightHex: "#EAEAEA",
    lightPrimitive: "neutral.100",
    darkHex: "#2E2E2E",
    darkPrimitive: "neutral.700",
  },
  "border-base-subtle": {
    tokenName: "border/base/subtle",
    usage: "Soft gridlines, list item dividers, and border lines",
    lightHex: "#F3F0FE",
    lightPrimitive: "purple-light.50",
    darkHex: "#2A2342",
    darkPrimitive: "purple-dark.900",
  },
};

const CATEGORIES = [
  { id: "bg", desc: "Backgrounds & Surfaces" },
  { id: "text", desc: "Typography & Icons" },
  { id: "border", desc: "Borders & Lines" },
] as const;

const CONCEPTS: Record<string, { id: string; desc: string }[]> = {
  bg: [
    { id: "action", desc: "Buttons & CTAs" },
    { id: "surface", desc: "Cards & Sheets" },
    { id: "status", desc: "Feedback Alerts" },
  ],
  text: [
    { id: "action", desc: "Interactive Words" },
    { id: "content", desc: "Regular Text" },
  ],
  border: [
    { id: "input", desc: "Boundary Frames" },
    { id: "base", desc: "Grid & Dividers" },
  ],
};

const ROLES: Record<string, { id: string; desc: string }[]> = {
  action: [
    { id: "primary", desc: "Main call to action" },
    { id: "inverse", desc: "Overlay contrast color" },
  ],
  surface: [
    { id: "default", desc: "Standard flat surface" },
    { id: "subtle", desc: "Elevated / offset surface" },
  ],
  status: [
    { id: "success", desc: "Positive feedback color" },
    { id: "error", desc: "Negative alert color" },
  ],
  content: [
    { id: "primary", desc: "Title & base text weight" },
    { id: "secondary", desc: "Helper & caption weight" },
    { id: "inverse", desc: "Opposite theme contrast" },
  ],
  input: [{ id: "default", desc: "Base divider outline" }],
  base: [{ id: "subtle", desc: "Fine separation divider" }],
};

function OptionButton({
  label,
  desc,
  active,
  onClick,
}: {
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start rounded-lg border p-3 text-left transition-colors duration-150",
        active
          ? "border-brand/40 bg-brand/10 text-brand"
          : "border-border-subtle bg-surface-0 text-text-secondary hover:border-border-default hover:text-text-primary",
      )}
    >
      <span className="font-mono text-sm font-medium">{label}</span>
      <span className="mt-0.5 text-[11px] opacity-70">{desc}</span>
    </button>
  );
}

export function TokenExplorer() {
  const [category, setCategory] = useState("bg");
  const [concept, setConcept] = useState("surface");
  const [role, setRole] = useState("default");

  const builtKey = `${category}-${concept}-${role}`;
  const mappedToken = TOKEN_DICTIONARY[builtKey];

  const pickCategory = (id: string) => {
    setCategory(id);
    const firstConcept = CONCEPTS[id][0];
    setConcept(firstConcept.id);
    setRole(ROLES[firstConcept.id][0].id);
  };
  const pickConcept = (id: string) => {
    setConcept(id);
    setRole(ROLES[id][0].id);
  };

  return (
    <Widget>
      <WidgetHeader
        title="Token Formula Builder"
        subtitle="{category}/{concept}/{role}"
      />
      <div className="space-y-6 p-5 md:p-6">
        <p className="text-sm text-text-secondary">
          Combine a category, concept, and role to build a semantic token, then
          inspect how it resolves in each mode.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Category */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              Category
            </div>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((item) => (
                <OptionButton
                  key={item.id}
                  label={item.id}
                  desc={item.desc}
                  active={category === item.id}
                  onClick={() => pickCategory(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Concept */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              Concept
            </div>
            <div className="flex flex-col gap-2">
              {CONCEPTS[category].map((item) => (
                <OptionButton
                  key={item.id}
                  label={item.id}
                  desc={item.desc}
                  active={concept === item.id}
                  onClick={() => pickConcept(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              Role
            </div>
            <div className="flex flex-col gap-2">
              {(ROLES[concept] ?? []).map((item) => (
                <OptionButton
                  key={item.id}
                  label={item.id}
                  desc={item.desc}
                  active={role === item.id}
                  onClick={() => setRole(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-border-subtle bg-surface-0 p-5">
          {mappedToken ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-md border border-brand/20 bg-brand/10 px-2.5 py-1 font-mono text-sm font-semibold text-brand">
                  {mappedToken.tokenName}
                </span>
                <span className="text-xs text-text-tertiary">{mappedToken.usage}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-border-subtle pt-4 sm:grid-cols-2">
                {/* Light resolution */}
                <div className="flex items-center gap-3 rounded-lg border border-border-subtle p-3">
                  <div
                    className="h-10 w-10 shrink-0 rounded-md border border-black/10"
                    style={{ backgroundColor: mappedToken.lightHex }}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                      Light
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      {mappedToken.lightHex}
                    </div>
                    <div className="truncate font-mono text-[11px] text-text-tertiary">
                      {mappedToken.lightPrimitive}
                    </div>
                  </div>
                </div>

                {/* Dark resolution */}
                <div className="flex items-center gap-3 rounded-lg border border-border-subtle p-3">
                  <div
                    className="h-10 w-10 shrink-0 rounded-md border border-white/10"
                    style={{ backgroundColor: mappedToken.darkHex }}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                      Dark
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      {mappedToken.darkHex}
                    </div>
                    <div className="truncate font-mono text-[11px] text-text-tertiary">
                      {mappedToken.darkPrimitive}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-text-tertiary">
              <span className="font-mono">{builtKey}</span> isn&apos;t mapped in this
              specimen. Pick another combination.
            </div>
          )}
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. LIVE COMPONENT SPECS (button + input states)
// ─────────────────────────────────────────────────────────────────────────────

export function ComponentSandbox() {
  const [mode, setMode] = useState<Mode>("light");
  const [btnState, setBtnState] = useState<"default" | "pressed" | "disabled">("default");
  const [inputVal, setInputVal] = useState("");
  const [inputState, setInputState] = useState<"default" | "focus" | "success" | "error">("default");

  const p = product(mode);
  const btnBg =
    btnState === "default" ? GF.brand : btnState === "pressed" ? GF.brandPressed : GF.brandDisabled;

  const inputBorder =
    inputState === "focus"
      ? GF.brand
      : inputState === "success"
        ? GF.success
        : inputState === "error"
          ? GF.error
          : p.border;

  return (
    <Widget>
      <WidgetHeader
        title="Live Component Specs"
        subtitle="button + input · semantic states"
        action={<PaletteToggle value={mode} onChange={setMode} />}
      />

      {/* Product canvas */}
      <div
        className="grid grid-cols-1 gap-8 p-5 transition-colors duration-300 md:grid-cols-2 md:p-8"
        style={{ backgroundColor: p.canvas, color: p.text }}
      >
        {/* Button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: p.subtext }}>
              Button
            </span>
            <Segmented
              ariaLabel="Button state"
              value={btnState}
              onChange={setBtnState}
              options={[
                { value: "default", label: "Default" },
                { value: "pressed", label: "Pressed" },
                { value: "disabled", label: "Disabled" },
              ]}
            />
          </div>

          <div
            className="flex min-h-[128px] items-center justify-center rounded-xl border"
            style={{ backgroundColor: p.surfaceSubtle, borderColor: p.border }}
          >
            <button
              type="button"
              disabled={btnState === "disabled"}
              onMouseDown={() => btnState !== "disabled" && setBtnState("pressed")}
              onMouseUp={() => btnState !== "disabled" && setBtnState("default")}
              className={cn(
                "h-11 select-none rounded-full px-6 text-sm font-semibold text-white transition-transform duration-150",
                btnState === "pressed" && "scale-[0.96]",
                btnState === "disabled" ? "cursor-not-allowed opacity-60" : "active:scale-[0.96]",
              )}
              style={{ backgroundColor: btnBg }}
            >
              İşlemi Onayla
            </button>
          </div>

          <div className="space-y-1.5 rounded-lg border border-border-subtle bg-surface-0 p-3">
            <SpecRow token="bg/action/primary" value={btnBg.toUpperCase()} />
            <SpecRow token="text/action/inverse" value="#FFFFFF" />
          </div>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: p.subtext }}>
              Input
            </span>
            <Segmented
              ariaLabel="Input state"
              value={inputState}
              onChange={setInputState}
              options={[
                { value: "default", label: "Default" },
                { value: "focus", label: "Focus" },
                { value: "success", label: "Success" },
                { value: "error", label: "Error" },
              ]}
            />
          </div>

          <div
            className="flex min-h-[128px] flex-col justify-center gap-2 rounded-xl border p-6"
            style={{ backgroundColor: p.surfaceSubtle, borderColor: p.border }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="IBAN numarası girin"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onFocus={() => setInputState("focus")}
                onBlur={() => setInputState("default")}
                className="h-11 w-full rounded-lg border bg-transparent px-4 text-sm outline-none transition-shadow"
                style={{
                  color: p.text,
                  borderColor: inputBorder,
                  boxShadow:
                    inputState === "default" ? "none" : `0 0 0 3px ${inputBorder}26`,
                }}
              />
              {inputState === "success" && (
                <span className="absolute right-3 top-3" style={{ color: GF.success }}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </div>
            {inputState === "error" && (
              <span className="ml-1 text-xs" style={{ color: GF.error }}>
                Geçersiz IBAN formatı
              </span>
            )}
          </div>

          <div className="space-y-1.5 rounded-lg border border-border-subtle bg-surface-0 p-3">
            <SpecRow token="bg/input/default" value={mode === "light" ? "#FFFFFF" : "transparent"} />
            <SpecRow
              token="border/input/*"
              value={inputBorder.toUpperCase()}
              valueClassName={
                inputState === "success"
                  ? "text-[color:#00B235]"
                  : inputState === "error"
                    ? "text-[color:#E23737]"
                    : undefined
              }
            />
          </div>
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. COLOR TOKEN GRID
// ─────────────────────────────────────────────────────────────────────────────

interface ColorEntry {
  label: string;
  lightVal: string;
  lightPrim: string;
  darkVal: string;
  darkPrim: string;
}

const SEMANTIC_COLORS: ColorEntry[] = [
  { label: "bg/app/brand", lightVal: "#5D3EBC", lightPrim: "purple-dark.700", darkVal: "#5D3EBC", darkPrim: "purple-dark.700" },
  { label: "bg/surface/default", lightVal: "#FFFFFF", lightPrim: "neutral.white", darkVal: "#121212", darkPrim: "neutral.900" },
  { label: "bg/surface/subtle", lightVal: "#FAFAFA", lightPrim: "neutral.25", darkVal: "#1E1E1E", darkPrim: "neutral.800" },
  { label: "bg/action/primary", lightVal: "#5D3EBC", lightPrim: "purple-dark.700", darkVal: "#5D3EBC", darkPrim: "purple-dark.700" },
  { label: "bg/status/success", lightVal: "#EDFDF0", lightPrim: "green.50", darkVal: "#0B4E1B", darkPrim: "green.900" },
  { label: "bg/status/error", lightVal: "#FDF2F2", lightPrim: "red.50", darkVal: "#661111", darkPrim: "red.900" },
  { label: "bg/status/warning", lightVal: "#FFF9EB", lightPrim: "orange.50", darkVal: "#5E3D04", darkPrim: "orange.900" },
  { label: "text/content/primary", lightVal: "#0E0E0E", lightPrim: "neutral.1000", darkVal: "#FFFFFF", darkPrim: "neutral.white" },
  { label: "text/content/secondary", lightVal: "#757575", lightPrim: "neutral.600", darkVal: "#A5A5A5", darkPrim: "neutral.400" },
  { label: "text/content/inverse", lightVal: "#FFFFFF", lightPrim: "neutral.white", darkVal: "#FFFFFF", darkPrim: "neutral.white" },
  { label: "border/input/default", lightVal: "#EAEAEA", lightPrim: "neutral.100", darkVal: "#2E2E2E", darkPrim: "neutral.700" },
  { label: "border/base/subtle", lightVal: "#F3F0FE", lightPrim: "purple-light.50", darkVal: "#2A2342", darkPrim: "purple-dark.900" },
];

const PRIMITIVE_COLORS: ColorEntry[] = [
  { label: "purple-dark.700", lightVal: "#5D3EBC", lightPrim: "Primary brand violet", darkVal: "#5D3EBC", darkPrim: "Primary brand violet" },
  { label: "purple-dark.800", lightVal: "#482F9B", lightPrim: "Brand violet pressed", darkVal: "#482F9B", darkPrim: "Brand violet pressed" },
  { label: "purple-dark.900", lightVal: "#2A2342", lightPrim: "Deep dark violet", darkVal: "#2A2342", darkPrim: "Deep dark violet" },
  { label: "purple-light.50", lightVal: "#F3F0FE", lightPrim: "Pale violet tint", darkVal: "#F3F0FE", darkPrim: "Pale violet tint" },
  { label: "neutral.white", lightVal: "#FFFFFF", lightPrim: "Pure white", darkVal: "#FFFFFF", darkPrim: "Pure white" },
  { label: "neutral.25", lightVal: "#FAFAFA", lightPrim: "Off-white surface", darkVal: "#FAFAFA", darkPrim: "Off-white surface" },
  { label: "neutral.100", lightVal: "#EAEAEA", lightPrim: "Light gray edge", darkVal: "#EAEAEA", darkPrim: "Light gray edge" },
  { label: "neutral.600", lightVal: "#757575", lightPrim: "Slate reading gray", darkVal: "#757575", darkPrim: "Slate reading gray" },
  { label: "neutral.800", lightVal: "#1E1E1E", lightPrim: "Elevated dark bg", darkVal: "#1E1E1E", darkPrim: "Elevated dark bg" },
  { label: "neutral.900", lightVal: "#121212", lightPrim: "Primary dark bg", darkVal: "#121212", darkPrim: "Primary dark bg" },
  { label: "red.500", lightVal: "#E23737", lightPrim: "Base failure red", darkVal: "#E23737", darkPrim: "Base failure red" },
  { label: "green.500", lightVal: "#00B235", lightPrim: "Base success green", darkVal: "#00B235", darkPrim: "Base success green" },
];

function ColorCard({ entry, mode }: { entry: ColorEntry; mode: Mode }) {
  const [copied, setCopied] = useState(false);
  const hex = mode === "dark" ? entry.darkVal : entry.lightVal;
  const prim = mode === "dark" ? entry.darkPrim : entry.lightPrim;

  const copy = () => {
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border-subtle bg-surface-0 p-3 text-left transition-colors duration-150 hover:border-border-default active:scale-[0.99]"
    >
      <div
        className="h-9 w-9 shrink-0 rounded-lg border border-black/10 dark:border-white/10"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0 flex-1">
        <div className="truncate font-mono text-[11px] font-medium text-text-primary">{entry.label}</div>
        <div className="text-xs font-semibold text-text-secondary">{hex}</div>
        <div className="truncate font-mono text-[11px] text-text-tertiary">{prim}</div>
      </div>
      {copied && (
        <span className="absolute inset-0 flex items-center justify-center bg-brand text-xs font-semibold text-white">
          Copied
        </span>
      )}
    </button>
  );
}

export function ColorGrid() {
  const [tab, setTab] = useState<"semantics" | "primitives">("semantics");
  const [mode, setMode] = useState<Mode>("light");
  const entries = tab === "semantics" ? SEMANTIC_COLORS : PRIMITIVE_COLORS;

  return (
    <Widget>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
        <Segmented
          ariaLabel="Token layer"
          value={tab}
          onChange={setTab}
          options={[
            { value: "semantics", label: "Semantic" },
            { value: "primitives", label: "Primitive" },
          ]}
        />
        <PaletteToggle value={mode} onChange={setMode} />
      </div>
      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <ColorCard key={entry.label} entry={entry} mode={mode} />
        ))}
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DO vs DON'T CODE COMPARISON
// ─────────────────────────────────────────────────────────────────────────────

const DONT_CODE = `// ✕ Legacy — the component owns theme logic
import { useColorScheme } from "@/hooks/useColorScheme";

export function ConfirmButton() {
  const isDark = useColorScheme() === "dark";
  return (
    <button
      style={{
        backgroundColor: isDark ? "#2A2342" : "#5D3EBC",
        color: "#FFFFFF",
        borderColor: isDark ? "#5D3EBC" : "#EAEAEA",
      }}
    >
      Onayla
    </button>
  );
}`;

const DO_CODE = `// ✓ Refactored — the component is theme-agnostic
export function ConfirmButton() {
  return (
    <button className="bg-action-primary text-action-inverse border border-base-subtle">
      Onayla
    </button>
  );
}`;

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-0 p-4 font-mono text-xs leading-relaxed text-text-secondary [font-variant-ligatures:none] md:text-[13px]">
      {code}
    </pre>
  );
}

export function CodeSwitcher() {
  const [mode, setMode] = useState<"dont" | "do">("dont");
  const isDo = mode === "do";
  const accent = isDo ? GF.success : GF.error;

  return (
    <Widget>
      <div className="flex border-b border-border-subtle">
        {(["dont", "do"] as const).map((m) => {
          const active = mode === m;
          const isDoTab = m === "do";
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 border-b-2 py-3.5 text-sm font-semibold transition-colors",
                active
                  ? "text-text-primary"
                  : "border-transparent text-text-tertiary hover:text-text-secondary",
              )}
              style={active ? { borderBottomColor: isDoTab ? GF.success : GF.error } : undefined}
            >
              <span style={{ color: isDoTab ? GF.success : GF.error }}>{isDoTab ? "✓" : "✕"}</span>
              {isDoTab ? "Do — Semantic tokens" : "Don't — Hardcoded"}
            </button>
          );
        })}
      </div>

      <div className="space-y-4 p-5 md:p-6">
        <p className="text-sm text-text-secondary">
          {isDo
            ? "Style components with single semantic-intent classes. The component has zero awareness of theme state — values resolve at the system root."
            : "Hardcoding values and branching on isDark inside every layout file is how design-system debt compounds. Dark mode becomes an audit, styles duplicate, and a brand change touches hundreds of call sites."}
        </p>

        <CodeBlock code={isDo ? DO_CODE : DONT_CODE} />

        <div
          className="flex items-start gap-3 rounded-lg border p-4 text-xs"
          style={{ backgroundColor: `${accent}14`, borderColor: `${accent}4D`, color: accent }}
        >
          <span className="leading-none">{isDo ? "✓" : "⚠"}</span>
          <p className="flex-1">
            <span className="font-semibold">{isDo ? "One source of truth. " : "Governance debt. "}</span>
            <span className="text-text-secondary">
              {isDo
                ? "Colors map once in root variables; component code stays clean, testable, and fully decoupled from rendering logic."
                : "A single color change (say, replacing brand purple) means editing every conditional style across the codebase."}
            </span>
          </p>
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. FX LINE CHART — where the token system runs out
// ─────────────────────────────────────────────────────────────────────────────

export function FxChartSimulator() {
  const [mode, setMode] = useState<Mode>("light");
  const p = product(mode);
  const stroke = mode === "light" ? "#5D3EBC" : "#8A6CE5";

  return (
    <Widget>
      <WidgetHeader
        title="FX Exchange Chart"
        subtitle="conditional render · SwiftUI / SVG path"
        action={<PaletteToggle value={mode} onChange={setMode} />}
      />

      <div
        className="min-h-[220px] p-5 transition-colors duration-300 md:p-8"
        style={{ backgroundColor: p.canvas, color: p.text }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="block text-xs" style={{ color: p.subtext }}>
              Dolar / Türk Lirası
            </span>
            <span className="font-mono text-xl font-bold">USD/TRY 32.8450</span>
          </div>
          <span
            className="rounded px-2 py-0.5 text-xs font-bold"
            style={{ backgroundColor: `${GF.success}1A`, color: GF.success }}
          >
            +0.34%
          </span>
        </div>

        <div className="relative h-28 w-full">
          <svg className="h-full w-full" viewBox="0 0 500 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fxGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={mode === "light" ? 0.25 : 0.4} />
                <stop offset="100%" stopColor={stroke} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,90 Q75,30 150,70 T300,20 T450,50 L500,45 L500,100 L0,100 Z"
              fill="url(#fxGlow)"
              className="transition-all duration-500"
            />
            <path
              d="M0,90 Q75,30 150,70 T300,20 T450,50 L500,45"
              fill="none"
              stroke={stroke}
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <circle cx="500" cy="45" r="5" fill={stroke} className="transition-all duration-500" />
          </svg>
        </div>

        <div className="mt-2 flex justify-between font-mono text-[11px]" style={{ color: p.subtext }}>
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span>15:00</span>
          <span>17:00</span>
        </div>
      </div>

      <div className="space-y-1.5 border-t border-border-subtle px-5 py-4">
        <SpecRow token="stroke" value={`${stroke.toUpperCase()} · hardcoded in markup`} />
        <SpecRow token="fill" value="conditional gradient · not a token swap" />
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. BOTTOM SHEET SIMULATOR — the standalone app
// ─────────────────────────────────────────────────────────────────────────────

export function BottomSheetSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("light");
  const [bsState, setBsState] = useState<
    "idle" | "positive_tapped" | "positive_done" | "negative_expand" | "negative_done"
  >("idle");
  const [feedbackCategory, setFeedbackCategory] = useState<string | null>(null);

  const p = product(mode);
  const sheetBg = mode === "light" ? "#FFFFFF" : "#181524";

  useEffect(() => {
    if (bsState === "positive_tapped") {
      const t = setTimeout(() => setBsState("positive_done"), 700);
      return () => clearTimeout(t);
    }
    if (bsState === "positive_done") {
      const t = setTimeout(() => {
        setIsOpen(false);
        setBsState("idle");
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [bsState]);

  const close = () => {
    setIsOpen(false);
    setBsState("idle");
    setFeedbackCategory(null);
  };

  const submitNegative = () => {
    setBsState("negative_done");
    setTimeout(close, 1800);
  };

  return (
    <Widget>
      <WidgetHeader
        title="Standalone App"
        subtitle="rating sheet · every color a semantic token"
        action={<PaletteToggle value={mode} onChange={setMode} />}
      />

      {/* Device screen */}
      <div
        className="relative flex aspect-[4/3] w-full flex-col overflow-hidden p-6 transition-colors duration-300"
        style={{ backgroundColor: p.canvas, color: p.text }}
      >
        {/* Status bar */}
        <div className="mb-4 flex items-center justify-between font-mono text-[11px] font-semibold opacity-70">
          <span>09:41</span>
          <div className="flex gap-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center">
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: `${GF.success}1A`, color: GF.success }}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold">Transfer İşlemi Başarılı</h4>
            <p className="mt-1 text-xs" style={{ color: p.subtext }}>
              ₺2.500,00 Ulaş Alyeşil hesabına gönderildi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setBsState("idle");
            }}
            className="rounded-full px-5 py-2 text-xs font-semibold text-white transition-transform active:scale-95"
            style={{ backgroundColor: GF.brand }}
          >
            Trigger Rating Sheet
          </button>
        </div>

        {/* Backdrop */}
        {isOpen && (
          <div
            onClick={close}
            className="animate-fade-in absolute inset-0 z-10 bg-black/40 backdrop-blur-sm"
          />
        )}

        {/* Sheet */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 rounded-t-[28px] border-t p-6 pb-8 shadow-2xl transition-transform duration-300"
          style={{
            backgroundColor: sheetBg,
            borderColor: p.border,
            color: p.text,
            transform: isOpen ? "translateY(0)" : "translateY(100%)",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            className="mx-auto mb-6 h-1 w-10 rounded-full"
            style={{ backgroundColor: p.border }}
          />

          {bsState === "idle" && (
            <div className="animate-fade-in space-y-6 text-center">
              <div className="space-y-2">
                <h4 className="text-base font-bold">GetirFinans&apos;ı seviyor musun?</h4>
                <p className="mx-auto max-w-[280px] text-xs" style={{ color: p.subtext }}>
                  Dürüst görüşün bizi daha iyi yapar.
                </p>
              </div>
              <div className="flex justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setBsState("negative_expand")}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl transition-transform active:scale-90"
                  style={{ borderColor: p.accentText, color: p.accentText, backgroundColor: `${GF.brand}0D` }}
                >
                  👎
                </button>
                <button
                  type="button"
                  onClick={() => setBsState("positive_tapped")}
                  className="flex h-14 w-14 items-center justify-center rounded-full text-xl text-white transition-transform active:scale-90"
                  style={{ backgroundColor: GF.brand }}
                >
                  👍
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mx-auto block pt-1 text-xs font-semibold"
                style={{ color: p.subtext }}
              >
                Şimdi değil
              </button>
            </div>
          )}

          {bsState === "positive_tapped" && (
            <div className="animate-fade-in space-y-4 py-6 text-center">
              <div
                className="mx-auto flex h-12 w-12 animate-ping items-center justify-center rounded-full text-xl text-white"
                style={{ backgroundColor: GF.brand }}
              >
                👍
              </div>
              <p className="text-xs font-semibold" style={{ color: p.subtext }}>
                App Store değerlendirmesi açılıyor…
              </p>
            </div>
          )}

          {bsState === "positive_done" && (
            <div className="animate-fade-in space-y-3 py-4 text-center">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
                style={{ backgroundColor: GF.success }}
              >
                ✓
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold">Teşekkürler!</h5>
                <p className="text-xs" style={{ color: p.subtext }}>
                  Desteğiniz için teşekkür ederiz.
                </p>
              </div>
            </div>
          )}

          {bsState === "negative_expand" && (
            <div className="animate-fade-in space-y-5">
              <div className="space-y-1 text-center">
                <h4 className="text-sm font-bold">Görüşünü bizimle paylaş</h4>
                <p className="text-[11px]" style={{ color: p.subtext }}>
                  Uygulamayı geliştirmemize yardımcı olun.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 py-2">
                {[
                  "Arayüz / Tasarım",
                  "Performans",
                  "Transfer Hatası",
                  "Müşteri Hizmetleri",
                  "Faiz Oranları",
                  "Diğer",
                ].map((cat) => {
                  const selected = feedbackCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFeedbackCategory(cat)}
                      className="rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors"
                      style={
                        selected
                          ? { backgroundColor: GF.brand, borderColor: "transparent", color: "#FFFFFF" }
                          : { backgroundColor: p.surfaceSubtle, borderColor: p.border, color: p.subtext }
                      }
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setBsState("idle")}
                  className="flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors"
                  style={{ backgroundColor: p.surfaceSubtle, color: p.subtext }}
                >
                  Geri Dön
                </button>
                <button
                  type="button"
                  onClick={submitNegative}
                  disabled={!feedbackCategory}
                  className={cn(
                    "flex-1 rounded-full py-2.5 text-xs font-semibold text-white transition-opacity",
                    !feedbackCategory && "cursor-not-allowed opacity-50",
                  )}
                  style={{ backgroundColor: GF.brand }}
                >
                  Gönder
                </button>
              </div>
            </div>
          )}

          {bsState === "negative_done" && (
            <div className="animate-fade-in space-y-3 py-4 text-center">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
                style={{ backgroundColor: GF.success }}
              >
                ✓
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold">Geri Bildiriminiz Alındı</h5>
                <p className="text-xs" style={{ color: p.subtext }}>
                  Katkınız için teşekkür ederiz.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. AI COMPONENTS PREVIEW — the isolated bg/ai/* namespace
// ─────────────────────────────────────────────────────────────────────────────

export function AiComponentPreview() {
  const [mode, setMode] = useState<Mode>("dark");
  const p = product(mode);
  // The whole point of the isolated namespace: dark AI surfaces are a contained,
  // desaturated purple — not an inversion of the light value.
  const aiCanvas = mode === "light" ? "#F8F7FC" : "#0A0810";
  const aiCard = mode === "light" ? "#FFFFFF" : "#2B2438";
  const aiBorder = mode === "light" ? "#EAEAEA" : "#3B324D";
  const aiLabel = mode === "light" ? "#5D3EBC" : "#B49FE6";

  return (
    <Widget>
      <WidgetHeader
        title="AI Component Spec"
        subtitle="isolated namespace · bg/ai/*"
        action={<PaletteToggle value={mode} onChange={setMode} />}
      />

      <div
        className="flex flex-col gap-4 p-5 transition-colors duration-300 md:flex-row md:p-8"
        style={{ backgroundColor: aiCanvas, color: p.text }}
      >
        {/* Podcast card */}
        <div
          className="flex min-h-[160px] flex-1 flex-col justify-between rounded-2xl border p-5"
          style={{ backgroundColor: aiCard, borderColor: aiBorder }}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: aiLabel }}>
              Podcast Önerisi
            </span>
            <span className="font-mono text-[11px]" style={{ color: p.subtext }}>
              24 dk
            </span>
          </div>
          <div className="my-4">
            <h5 className="text-sm font-bold leading-snug">Yatırım Dünyasında Yeni Eğilimler</h5>
            <p className="mt-1 text-[11px]" style={{ color: p.subtext }}>
              Yapay zekânın portföy yönetimindeki yeri ve geleceği.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-white transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: GF.brand }}
            >
              ▶
            </button>
            <div className="flex flex-1 items-center gap-0.5">
              {[0.4, 0.7, 0.5, 0.9, 0.3, 0.6, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-full"
                  style={{ height: `${h * 16}px`, backgroundColor: `${GF.brand}59` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Assistant card */}
        <div
          className="flex min-h-[160px] flex-1 flex-col justify-between rounded-2xl border p-5"
          style={{ backgroundColor: aiCard, borderColor: aiBorder }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: GF.brand }}
            >
              AI
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: aiLabel }}>
              Akıllı Asistan
            </span>
          </div>
          <div className="my-3 text-xs leading-relaxed">
            Kira ödemeniz için <span className="font-bold">₺12.500,00</span> transfer talimatı
            oluşturulsun mu?
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg border py-1.5 text-[11px] font-semibold transition-colors"
              style={{ backgroundColor: p.surfaceSubtle, borderColor: aiBorder, color: p.subtext }}
            >
              Hayır
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg py-1.5 text-[11px] font-semibold text-white transition-colors"
              style={{ backgroundColor: GF.brand }}
            >
              Evet, Oluştur
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 border-t border-border-subtle px-5 py-4">
        <SpecRow token="bg/ai/primary" value={mode === "light" ? "#FFFFFF" : "#2B2438"} />
        <SpecRow token="bg/ai/border" value={mode === "light" ? "#EAEAEA" : "#3B324D"} />
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. DOCS SITE PREVIEW — replaces the low-res documentation screenshot
// ─────────────────────────────────────────────────────────────────────────────

const DOC_PAGES = [
  { id: "introduction", label: "Introduction" },
  { id: "primitives", label: "Primitives" },
  { id: "semantics", label: "Semantics" },
  { id: "reality", label: "Reality" },
  { id: "dark-mode", label: "Dark Mode" },
  { id: "overlay", label: "Overlay" },
  { id: "gradients", label: "Gradients" },
];

const DOC_CONTENT: Record<string, { title: string; body: string; swatches?: string[] }> = {
  introduction: {
    title: "Color",
    body: "A two-tier token system: primitives carry values, semantics carry intent. This is the source of truth the product and docs both consume.",
  },
  primitives: {
    title: "Primitives",
    body: "Raw palette scales — purple-dark.700, neutral.900, green.500. No meaning, just values.",
    swatches: ["#5D3EBC", "#482F9B", "#2A2342", "#121212", "#00B235", "#E23737"],
  },
  semantics: {
    title: "Semantics",
    body: "{property}/{context}/{variant}. bg/surface/default, text/content/primary, border/input/default — what a color does, not how it looks.",
    swatches: ["#FFFFFF", "#FAFAFA", "#0E0E0E", "#757575", "#EAEAEA"],
  },
  reality: {
    title: "Reality",
    body: "The gap between the system as designed and as shipped in production right now. Most systems hide this page. Publishing it is what made migration tractable.",
  },
  "dark-mode": {
    title: "Dark Mode",
    body: "Canvas #0E0E0E, surfaces at #1A1A1A / #262626. Status colors range-switch to the 900 range — they do not invert.",
    swatches: ["#0E0E0E", "#1A1A1A", "#262626", "#0B4E1B", "#661111"],
  },
  overlay: {
    title: "Overlay",
    body: "Scrims and elevated materials resolved at the semantic layer, so depth stays consistent across both modes.",
  },
  gradients: {
    title: "Gradients",
    body: "Brand and data gradients defined once, referenced everywhere. The FX chart is the open edge case the token model doesn't fully cover yet.",
    swatches: ["#5D3EBC", "#8A6CE5", "#2B2438"],
  },
};

export function DocsSitePreview() {
  const [page, setPage] = useState("semantics");
  const content = DOC_CONTENT[page];

  return (
    <Widget>
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
        </div>
        <div className="flex-1 truncate rounded-md border border-border-subtle bg-surface-0 px-3 py-1 text-center font-mono text-[11px] text-text-tertiary">
          gf-design-system.vercel.app/color/{page}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <nav className="flex gap-1 overflow-x-auto border-b border-border-subtle p-3 sm:w-48 sm:flex-col sm:border-b-0 sm:border-r">
          <div className="hidden px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary sm:block">
            Color
          </div>
          {DOC_PAGES.map((d) => {
            const active = d.id === page;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setPage(d.id)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors",
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
                )}
              >
                {d.label}
              </button>
            );
          })}
        </nav>

        {/* Page body */}
        <div className="min-h-[220px] flex-1 p-6 md:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            Color / {content.title}
          </div>
          <h4 className="mt-2 text-xl font-semibold text-text-primary">{content.title}</h4>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-secondary">
            {content.body}
          </p>
          {content.swatches && (
            <div className="mt-5 flex flex-wrap gap-2">
              {content.swatches.map((s) => (
                <div key={s} className="overflow-hidden rounded-lg border border-border-subtle">
                  <div className="h-12 w-16" style={{ backgroundColor: s }} />
                  <div className="bg-surface-0 px-1.5 py-1 text-center font-mono text-[10px] text-text-tertiary">
                    {s}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. RESULTS — IN PROGRESS (honest WIP state, not an empty section)
// ─────────────────────────────────────────────────────────────────────────────

const PENDING_METRICS = [
  "Exact primitive + semantic token counts",
  "Docs site total page count",
  "Domains migrated off the legacy collection (of 20)",
  "Whether WCAG contrast was verified systematically",
  "A publicly stateable active-user number",
];

export function ResultsInProgress() {
  return (
    <Widget className="bg-surface-1">
      <div className="flex items-center gap-2.5 border-b border-border-subtle px-5 py-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
        </span>
        <span className="text-sm font-semibold text-text-primary">Results — being finalized</span>
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <p className="max-w-prose text-sm text-text-secondary">
          This is a live system, still migrating. Rather than publish soft numbers, the
          hard metrics are being confirmed against production before they go here — the
          same &ldquo;evidence, not claims&rdquo; standard the docs site holds itself to.
        </p>
        <ul className="space-y-2">
          {PENDING_METRICS.map((m) => (
            <li key={m} className="flex items-center gap-3 text-sm text-text-secondary">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-border-default" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}
