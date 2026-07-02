"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

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
    usage: "Soft gridlines, list items dividers, and border lines",
    lightHex: "#F3F0FE",
    lightPrimitive: "purple-light.50",
    darkHex: "#2A2342",
    darkPrimitive: "purple-dark.900",
  },
};

export function TokenExplorer() {
  const [category, setCategory] = useState("bg");
  const [concept, setConcept] = useState("surface");
  const [role, setRole] = useState("default");

  const builtKey = `${category}-${concept}-${role}`;
  const mappedToken = TOKEN_DICTIONARY[builtKey];

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 space-y-8 transition-colors">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">Token Formula Builder</h3>
        <p className="text-sm text-text-secondary">
          Combine a Category, Concept, and Role to generate a semantic token and inspect its mode values.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Category
          </label>
          <div className="flex flex-col gap-2">
            {[
              { id: "bg", label: "bg", desc: "Backgrounds & Surfaces" },
              { id: "text", label: "text", desc: "Typography & Icons" },
              { id: "border", label: "border", desc: "Borders & Lines" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCategory(item.id);
                  if (item.id === "text") {
                    setConcept("content");
                    setRole("primary");
                  } else if (item.id === "border") {
                    setConcept("input");
                    setRole("default");
                  } else {
                    setConcept("surface");
                    setRole("default");
                  }
                }}
                className={cn(
                  "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                  category === item.id
                    ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                    : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                )}
              >
                <span>{item.label}</span>
                <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Concept */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Concept
          </label>
          <div className="flex flex-col gap-2">
            {category === "bg" &&
              [
                { id: "action", label: "action", desc: "Buttons & CTAs" },
                { id: "surface", label: "surface", desc: "Cards & Sheets" },
                { id: "status", label: "status", desc: "Feedback Alerts" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setConcept(item.id);
                    setRole(item.id === "action" ? "primary" : item.id === "status" ? "success" : "default");
                  }}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    concept === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {category === "text" &&
              [
                { id: "action", label: "action", desc: "Interactive Words" },
                { id: "content", label: "content", desc: "Regular Texts" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setConcept(item.id);
                    setRole(item.id === "action" ? "primary" : "primary");
                  }}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    concept === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {category === "border" &&
              [
                { id: "input", label: "input", desc: "Boundary Frames" },
                { id: "base", label: "base", desc: "Grid & Dividers" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setConcept(item.id);
                    setRole(item.id === "input" ? "default" : "subtle");
                  }}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    concept === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Role */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Role
          </label>
          <div className="flex flex-col gap-2">
            {concept === "action" &&
              [
                { id: "primary", label: "primary", desc: "Main call to action" },
                { id: "inverse", label: "inverse", desc: "Overlay contrast color" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    role === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {concept === "surface" &&
              [
                { id: "default", label: "default", desc: "Standard flat surface" },
                { id: "subtle", label: "subtle", desc: "Elevated/offset surface" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    role === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {concept === "status" &&
              [
                { id: "success", label: "success", desc: "Positive feedback color" },
                { id: "error", label: "error", desc: "Negative alert color" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    role === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {concept === "content" &&
              [
                { id: "primary", label: "primary", desc: "Title & base text weight" },
                { id: "secondary", label: "secondary", desc: "Helper & caption weight" },
                { id: "inverse", label: "inverse", desc: "Opposite theme contrast" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    role === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {concept === "input" &&
              [
                { id: "default", label: "default", desc: "Base divider outline" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    role === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}

            {concept === "base" &&
              [
                { id: "subtle", label: "subtle", desc: "Fine separation divider" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3 text-left rounded-xl border text-sm transition-all duration-200",
                    role === item.id
                      ? "bg-brand/10 border-brand text-brand font-medium shadow-sm"
                      : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-text-secondary"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xxs opacity-70 mt-0.5">{item.desc}</span>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Result Panel */}
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 md:p-6 shadow-inner space-y-4">
        {mappedToken ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-base md:text-lg font-semibold text-brand px-3 py-1 bg-brand/5 dark:bg-brand/10 rounded-md border border-brand/20">
                {mappedToken.tokenName}
              </span>
              <span className="text-xs text-text-secondary italic flex-grow text-right">
                {mappedToken.usage}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-900">
              {/* Light Mode Value */}
              <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <div
                  className="w-10 h-10 rounded border border-neutral-200"
                  style={{ backgroundColor: mappedToken.lightHex }}
                />
                <div>
                  <div className="text-xxs uppercase tracking-wider text-text-secondary font-semibold">
                    Light Mode Value
                  </div>
                  <div className="text-sm font-semibold text-text-primary">
                    {mappedToken.lightHex}{" "}
                    <span className="font-mono text-xs font-normal text-text-secondary">
                      ({mappedToken.lightPrimitive})
                    </span>
                  </div>
                </div>
              </div>

              {/* Dark Mode Value */}
              <div className="flex items-center gap-3 p-3 bg-neutral-950 text-white rounded-lg">
                <div
                  className="w-10 h-10 rounded border border-neutral-800"
                  style={{ backgroundColor: mappedToken.darkHex }}
                />
                <div>
                  <div className="text-xxs uppercase tracking-wider text-neutral-400 font-semibold">
                    Dark Mode Value
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {mappedToken.darkHex}{" "}
                    <span className="font-mono text-xs font-normal text-neutral-400">
                      ({mappedToken.darkPrimitive})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-text-secondary text-sm">
            Combination <span className="font-mono">{builtKey}</span> is not mapped in this design system specimen. Select another role.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. INTERACTIVE COMPONENT SANDBOX
// ─────────────────────────────────────────────────────────────────────────────

export function ComponentSandbox() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [btnState, setBtnState] = useState<"default" | "pressed" | "disabled">("default");
  const [inputVal, setInputVal] = useState("");
  const [inputState, setInputState] = useState<"default" | "focus" | "success" | "error">("default");

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      {/* Top Bar / Theme Control */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <span className="text-sm font-semibold text-text-primary">Live Component Specs</span>
        <div className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-full">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
              theme === "light"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
              theme === "dark"
                ? "bg-neutral-950 text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-300 dark:hover:text-neutral-450"
            )}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {/* Render Canvas */}
      <div
        className={cn(
          "p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 transition-colors duration-300",
          theme === "light" ? "bg-white text-neutral-900" : "bg-neutral-950 text-white"
        )}
      >
        {/* Component A: Primary Action Button */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Button Component
            </span>
            <div className="flex gap-1.5 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200/50 dark:border-neutral-800">
              {(["default", "pressed", "disabled"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setBtnState(s)}
                  className={cn(
                    "px-2 py-0.5 text-xxs font-semibold rounded-md capitalize transition-colors",
                    btnState === s
                      ? theme === "light"
                        ? "bg-neutral-200 text-neutral-900"
                        : "bg-neutral-800 text-white"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-center justify-center p-8 rounded-xl border transition-all min-h-[140px]",
              theme === "light" ? "bg-neutral-50 border-neutral-200" : "bg-neutral-900/50 border-neutral-800"
            )}
          >
            <button
              disabled={btnState === "disabled"}
              onMouseDown={() => btnState !== "disabled" && setBtnState("pressed")}
              onMouseUp={() => btnState !== "disabled" && setBtnState("default")}
              className={cn(
                "h-11 px-6 text-sm font-semibold rounded-full select-none transform transition-all active:scale-[0.96]",
                btnState === "default" && "bg-[#5D3EBC] text-white hover:bg-[#482F9B] shadow-sm shadow-[#5D3EBC]/20 hover:shadow-md hover:shadow-[#5D3EBC]/30",
                btnState === "pressed" && "bg-[#482F9B] text-white scale-[0.95]",
                btnState === "disabled" && "bg-[#A99CD5] text-white/70 cursor-not-allowed opacity-60"
              )}
            >
              İşlemi Onayla
            </button>
          </div>

          <div className="space-y-1 bg-neutral-100/50 dark:bg-neutral-900/30 p-3 rounded-lg border border-neutral-200/20">
            <div className="flex justify-between text-xxs font-mono">
              <span className="text-text-secondary">bg/action/primary:</span>
              <span className="font-semibold">{btnState === "default" ? "#5D3EBC" : btnState === "pressed" ? "#482F9B" : "#A99CD5"}</span>
            </div>
            <div className="flex justify-between text-xxs font-mono">
              <span className="text-text-secondary">text/action/inverse:</span>
              <span className="font-semibold">#FFFFFF</span>
            </div>
          </div>
        </div>

        {/* Component B: Input Form Field */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Input Field
            </span>
            <div className="flex gap-1.5 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200/50 dark:border-neutral-800">
              {(["default", "focus", "success", "error"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setInputState(s)}
                  className={cn(
                    "px-2 py-0.5 text-xxs font-semibold rounded-md capitalize transition-colors",
                    inputState === s
                      ? theme === "light"
                        ? "bg-neutral-200 text-neutral-900"
                        : "bg-neutral-800 text-white"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-stretch justify-center p-6 rounded-xl border transition-all min-h-[140px] space-y-2",
              theme === "light" ? "bg-neutral-50 border-neutral-200" : "bg-neutral-900/50 border-neutral-800"
            )}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="İban numarası girin"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onFocus={() => setInputState("focus")}
                onBlur={() => setInputState("default")}
                className={cn(
                  "w-full h-11 px-4 text-sm bg-transparent rounded-lg border transition-all outline-none",
                  theme === "light" ? "text-neutral-900 placeholder:text-neutral-400" : "text-white placeholder:text-neutral-600",
                  inputState === "default" && (theme === "light" ? "border-neutral-200" : "border-neutral-800"),
                  inputState === "focus" && "border-[#5D3EBC] ring-2 ring-[#5D3EBC]/15",
                  inputState === "success" && "border-emerald-500 ring-2 ring-emerald-500/15",
                  inputState === "error" && "border-red-500 ring-2 ring-red-500/15"
                )}
              />
              {inputState === "success" && (
                <span className="absolute right-3 top-3 text-emerald-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </div>
            {inputState === "error" && (
              <span className="text-xs text-red-500 ml-1">Geçersiz IBAN formatı</span>
            )}
          </div>

          <div className="space-y-1 bg-neutral-100/50 dark:bg-neutral-900/30 p-3 rounded-lg border border-neutral-200/20">
            <div className="flex justify-between text-xxs font-mono">
              <span className="text-text-secondary">bg/input/default:</span>
              <span className="font-semibold">{theme === "light" ? "#FFFFFF" : "Transparent"}</span>
            </div>
            <div className="flex justify-between text-xxs font-mono">
              <span className="text-text-secondary">border/input/*:</span>
              <span className={cn("font-semibold", inputState === "success" && "text-emerald-500", inputState === "error" && "text-red-500")}>
                {inputState === "default" ? (theme === "light" ? "#EAEAEA" : "#2E2E2E") : inputState === "focus" ? "#5D3EBC" : inputState === "success" ? "#10B981" : "#EF4444"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. INTERACTIVE COLOR TOKEN GRID
// ─────────────────────────────────────────────────────────────────────────────

interface ColorCardProps {
  label: string;
  lightVal: string;
  lightPrim: string;
  darkVal: string;
  darkPrim: string;
  isDarkTheme: boolean;
}

function ColorCard({ label, lightVal, lightPrim, darkVal, darkPrim, isDarkTheme }: ColorCardProps) {
  const [copied, setCopied] = useState(false);
  const currentHex = isDarkTheme ? darkVal : lightVal;
  const currentPrimitive = isDarkTheme ? darkPrim : lightPrim;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentHex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      onClick={copyToClipboard}
      className={cn(
        "group relative p-3 border rounded-xl flex items-center gap-3 cursor-pointer shadow-sm active:scale-[0.98] transition-all duration-200",
        isDarkTheme
          ? "bg-neutral-900 border-neutral-800/80 hover:border-neutral-700/80 text-white"
          : "bg-white border-neutral-200/70 hover:border-neutral-300 text-neutral-900"
      )}
    >
      <div
        className="w-10 h-10 rounded-lg border border-neutral-200/20 transition-colors duration-300 shadow-inner flex-shrink-0"
        style={{ backgroundColor: currentHex }}
      />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-xxs font-semibold opacity-85 truncate">
          {label}
        </div>
        <div className="text-xs font-bold mt-0.5">{currentHex}</div>
        <div className="text-xxs font-mono text-text-secondary opacity-70 truncate mt-0.5">
          {currentPrimitive}
        </div>
      </div>
      
      {/* Hover action overlay */}
      <span className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 p-1 bg-brand/5 rounded transition-opacity">
        <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </span>

      {copied && (
        <span className="absolute inset-0 bg-brand backdrop-blur-xs flex items-center justify-center text-xs font-semibold text-white rounded-xl transition-all animate-fade-in">
          Copied Hex!
        </span>
      )}
    </div>
  );
}

export function ColorGrid() {
  const [tab, setTab] = useState<"semantics" | "primitives">("semantics");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900/30 p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Toggle tab */}
        <div className="flex p-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
          <button
            onClick={() => setTab("semantics")}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
              tab === "semantics"
                ? "bg-white dark:bg-neutral-950 text-brand shadow"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            Semantic Tokens
          </button>
          <button
            onClick={() => setTab("primitives")}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
              tab === "primitives"
                ? "bg-white dark:bg-neutral-950 text-brand shadow"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            Primitives
          </button>
        </div>

        {/* Global Palette Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-secondary font-medium">Palette Mode:</span>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={cn(
              "h-8 px-4 rounded-full text-xs font-semibold border flex items-center gap-2 shadow-sm transition-all duration-150",
              isDarkTheme
                ? "bg-neutral-950 text-white border-neutral-800 hover:bg-neutral-900"
                : "bg-white text-neutral-950 border-neutral-200 hover:bg-neutral-50"
            )}
          >
            {isDarkTheme ? (
              <>
                <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark Palette
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Light Palette
              </>
            )}
          </button>
        </div>
      </div>

      {tab === "semantics" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ColorCard label="bg/app/brand" lightVal="#5D3EBC" lightPrim="purple-dark.700" darkVal="#5D3EBC" darkPrim="purple-dark.700" isDarkTheme={isDarkTheme} />
          <ColorCard label="bg/surface/default" lightVal="#FFFFFF" lightPrim="neutral.white" darkVal="#121212" darkPrim="neutral.900" isDarkTheme={isDarkTheme} />
          <ColorCard label="bg/surface/subtle" lightVal="#FAFAFA" lightPrim="neutral.25" darkVal="#1E1E1E" darkPrim="neutral.800" isDarkTheme={isDarkTheme} />
          <ColorCard label="bg/action/primary" lightVal="#5D3EBC" lightPrim="purple-dark.700" darkVal="#5D3EBC" darkPrim="purple-dark.700" isDarkTheme={isDarkTheme} />
          <ColorCard label="bg/status/success" lightVal="#EDFDF0" lightPrim="green.50" darkVal="#0B4E1B" darkPrim="green.900" isDarkTheme={isDarkTheme} />
          <ColorCard label="bg/status/error" lightVal="#FDF2F2" lightPrim="red.50" darkVal="#661111" darkPrim="red.900" isDarkTheme={isDarkTheme} />
          <ColorCard label="bg/status/warning" lightVal="#FFF9EB" lightPrim="orange.50" darkVal="#5E3D04" darkPrim="orange.900" isDarkTheme={isDarkTheme} />
          <ColorCard label="text/content/primary" lightVal="#0E0E0E" lightPrim="neutral.1000" darkVal="#FFFFFF" darkPrim="neutral.white" isDarkTheme={isDarkTheme} />
          <ColorCard label="text/content/secondary" lightVal="#757575" lightPrim="neutral.600" darkVal="#A5A5A5" darkPrim="neutral.400" isDarkTheme={isDarkTheme} />
          <ColorCard label="text/content/inverse" lightVal="#FFFFFF" lightPrim="neutral.white" darkVal="#FFFFFF" darkPrim="neutral.white" isDarkTheme={isDarkTheme} />
          <ColorCard label="border/input/default" lightVal="#EAEAEA" lightPrim="neutral.100" darkVal="#2E2E2E" darkPrim="neutral.700" isDarkTheme={isDarkTheme} />
          <ColorCard label="border/base/subtle" lightVal="#F3F0FE" lightPrim="purple-light.50" darkVal="#2A2342" darkPrim="purple-dark.900" isDarkTheme={isDarkTheme} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ColorCard label="purple-dark.700" lightVal="#5D3EBC" lightPrim="Primary brand violet" darkVal="#5D3EBC" darkPrim="Primary brand violet" isDarkTheme={isDarkTheme} />
          <ColorCard label="purple-dark.800" lightVal="#482F9B" lightPrim="Brand violet pressed" darkVal="#482F9B" darkPrim="Brand violet pressed" isDarkTheme={isDarkTheme} />
          <ColorCard label="purple-dark.900" lightVal="#2A2342" lightPrim="Deep dark violet" darkVal="#2A2342" darkPrim="Deep dark violet" isDarkTheme={isDarkTheme} />
          <ColorCard label="purple-light.50" lightVal="#F3F0FE" lightPrim="Pale violet tint" darkVal="#F3F0FE" darkPrim="Pale violet tint" isDarkTheme={isDarkTheme} />
          <ColorCard label="neutral.white" lightVal="#FFFFFF" lightPrim="Pure white" darkVal="#FFFFFF" darkPrim="Pure white" isDarkTheme={isDarkTheme} />
          <ColorCard label="neutral.25" lightVal="#FAFAFA" lightPrim="Off-white surface shade" darkVal="#FAFAFA" darkPrim="Off-white surface shade" isDarkTheme={isDarkTheme} />
          <ColorCard label="neutral.100" lightVal="#EAEAEA" lightPrim="Light gray edge outline" darkVal="#EAEAEA" darkPrim="Light gray edge outline" isDarkTheme={isDarkTheme} />
          <ColorCard label="neutral.600" lightVal="#757575" lightPrim="Slate reading gray" darkVal="#757575" darkPrim="Slate reading gray" isDarkTheme={isDarkTheme} />
          <ColorCard label="neutral.800" lightVal="#1E1E1E" lightPrim="Elevated dark background" darkVal="#1E1E1E" darkPrim="Elevated dark background" isDarkTheme={isDarkTheme} />
          <ColorCard label="neutral.900" lightVal="#121212" lightPrim="Primary dark background" darkVal="#121212" darkPrim="Primary dark background" isDarkTheme={isDarkTheme} />
          <ColorCard label="red.500" lightVal="#E23737" lightPrim="Base failure red" darkVal="#E23737" darkPrim="Base failure red" isDarkTheme={isDarkTheme} />
          <ColorCard label="green.500" lightVal="#00B235" lightPrim="Base success green" darkVal="#00B235" darkPrim="Base success green" isDarkTheme={isDarkTheme} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DO VS DON'T CODE COMPARISON
// ─────────────────────────────────────────────────────────────────────────────

export function CodeSwitcher() {
  const [activeMode, setActiveMode] = useState<"do" | "dont">("dont");

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm bg-white dark:bg-neutral-950">
      {/* Selector Headers */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setActiveMode("dont")}
          className={cn(
            "flex-1 py-4 text-center text-sm font-semibold border-b-2 transition-all flex items-center justify-center gap-2",
            activeMode === "dont"
              ? "border-red-500 text-red-500 bg-red-50/10"
              : "border-transparent text-text-secondary hover:text-text-primary"
          )}
        >
          <span className="text-red-500 font-bold">✕</span> Don&apos;t (Legacy Hardcoded)
        </button>
        <button
          onClick={() => setActiveMode("do")}
          className={cn(
            "flex-1 py-4 text-center text-sm font-semibold border-b-2 transition-all flex items-center justify-center gap-2",
            activeMode === "do"
              ? "border-emerald-500 text-emerald-500 bg-emerald-50/10"
              : "border-transparent text-text-secondary hover:text-text-primary"
          )}
        >
          <span className="text-emerald-500 font-bold">✓</span> Do (Semantic Tokens)
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {activeMode === "dont" ? (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              **Problem:** Hardcoding color values or injecting manual conditional checks inside every layout file causes major design system debt. Adding dark mode requires a massive audit, forces duplicate styles, and breaks easily when brand colors change.
            </p>
            <pre className="p-4 bg-neutral-900 text-neutral-100 rounded-lg text-xs md:text-sm font-mono overflow-x-auto leading-relaxed border border-neutral-800">
{`// ✕ Legacy implementation - component handles theme logic
import { useColorScheme } from "@/hooks/useColorScheme";

export default function ConfirmButton() {
  const isDark = useColorScheme() === "dark";

  return (
    <button
      style={{
        backgroundColor: isDark ? "#2A2342" : "#5D3EBC",
        color: "#FFFFFF",
        borderColor: isDark ? "#5D3EBC" : "#EAEAEA",
        borderWidth: "1px",
      }}
    >
      Onayla
    </button>
  );
}`}
            </pre>
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-700 dark:text-red-400">
              <span className="text-base leading-none">⚠️</span>
              <div className="text-xs space-y-1 flex-1">
                <span className="font-semibold block">Governance Debt:</span>
                <p>Component is coupled to isDark checks. Refactoring a color (e.g. replacing Brand purple) requires changing 100+ separate style parameters across the codebase.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              **Solution:** Style components using single semantic intent classes. The component has zero awareness of dark mode or theme state; values switch dynamically at the root system level.
            </p>
            <pre className="p-4 bg-neutral-900 text-neutral-100 rounded-lg text-xs md:text-sm font-mono overflow-x-auto leading-relaxed border border-neutral-800">
{`// ✓ Refactored implementation - component is theme-agnostic
export default function ConfirmButton() {
  return (
    <button 
      className="bg-action-primary text-action-inverse border border-base-subtle"
    >
      Onayla
    </button>
  );
}`}
            </pre>
            <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-400">
              <span className="text-base leading-none">✓</span>
              <div className="text-xs space-y-1 flex-1">
                <span className="font-semibold block">Robust Theming Architecture:</span>
                <p>One source of truth. Colors are mapped once in global css variables. Component code is clean, testable, and completely decoupling design variables from rendering logic.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. INTERACTIVE LINE CHART (FX LINE CHART SIMULATOR)
// ─────────────────────────────────────────────────────────────────────────────

export function FxChartSimulator() {
  const [chartTheme, setChartTheme] = useState<"light" | "dark">("light");

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-primary">FX Exchange Chart</span>
          <span className="text-xxs text-text-secondary">Conditional Render SwiftUI / SVG Path</span>
        </div>
        <button
          onClick={() => setChartTheme(chartTheme === "light" ? "dark" : "light")}
          className={cn(
            "h-8 px-3 rounded-full text-xs font-semibold border transition-all duration-150",
            chartTheme === "dark"
              ? "bg-neutral-950 text-white border-neutral-800"
              : "bg-white text-neutral-950 border-neutral-200"
          )}
        >
          Toggle: {chartTheme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div
        className={cn(
          "p-6 md:p-8 flex flex-col items-stretch justify-center transition-colors duration-300 min-h-[220px]",
          chartTheme === "light" ? "bg-white text-neutral-900" : "bg-neutral-950 text-white"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-xs text-text-secondary block">Dolar / Türk Lirası</span>
            <span className="text-xl font-bold font-mono">USD/TRY 32.8450</span>
          </div>
          <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/10 text-emerald-500">
            +0.34%
          </span>
        </div>

        {/* SVG Drawing */}
        <div className="relative h-28 w-full">
          <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={chartTheme === "light" ? "#5D3EBC" : "#8A6CE5"}
                  stopOpacity={chartTheme === "light" ? 0.25 : 0.4}
                />
                <stop
                  offset="100%"
                  stopColor={chartTheme === "light" ? "#5D3EBC" : "#8A6CE5"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path
              d="M0,90 Q75,30 150,70 T300,20 T450,50 L500,45 L500,100 L0,100 Z"
              fill="url(#chartGlow)"
              className="transition-all duration-500"
            />
            {/* Line Path */}
            <path
              d="M0,90 Q75,30 150,70 T300,20 T450,50 L500,45"
              fill="none"
              stroke={chartTheme === "light" ? "#5D3EBC" : "#8A6CE5"}
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            {/* End glowing marker point */}
            <circle
              cx="500"
              cy="45"
              r="5"
              fill={chartTheme === "light" ? "#5D3EBC" : "#8A6CE5"}
              className="transition-all duration-500 animate-pulse"
            />
          </svg>
        </div>

        <div className="flex justify-between items-center text-xxs text-text-secondary mt-2 font-mono">
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span>15:00</span>
          <span>17:00</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. INTERACTIVE BOTTOM SHEET SIMULATOR (STANDOUT SCREEN)
// ─────────────────────────────────────────────────────────────────────────────

export function BottomSheetSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceTheme, setDeviceTheme] = useState<"light" | "dark">("light");
  const [bsState, setBsState] = useState<"idle" | "positive_tapped" | "positive_done" | "negative_expand" | "negative_done">("idle");
  const [feedbackCategory, setFeedbackCategory] = useState<string | null>(null);

  // Auto transition from positive_tapped to positive_done
  useEffect(() => {
    if (bsState === "positive_tapped") {
      const t = setTimeout(() => setBsState("positive_done"), 600);
      return () => clearTimeout(t);
    }
    if (bsState === "positive_done") {
      const t = setTimeout(() => {
        setIsOpen(false);
        setBsState("idle");
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [bsState]);

  const handleThumbsUp = () => {
    setBsState("positive_tapped");
  };

  const handleThumbsDown = () => {
    setBsState("negative_expand");
  };

  const handleFeedbackSubmit = () => {
    setBsState("negative_done");
    setTimeout(() => {
      setIsOpen(false);
      setBsState("idle");
      setFeedbackCategory(null);
    }, 2000);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm bg-neutral-900 text-white relative">
      {/* Device Header Panel */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-neutral-800">
        <span className="text-xs font-mono font-semibold tracking-wider text-neutral-400">
          Standalone App Simulator
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setDeviceTheme(deviceTheme === "light" ? "dark" : "light")}
            className="text-xxs font-bold px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900 hover:bg-neutral-800"
          >
            Switch Theme: {deviceTheme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      {/* Screen Canvas */}
      <div
        className={cn(
          "w-full aspect-[4/3] flex flex-col justify-between p-6 relative overflow-hidden transition-colors duration-300",
          deviceTheme === "light" ? "bg-[#F8F7FC] text-neutral-900" : "bg-[#09090A] text-white"
        )}
      >
        {/* Device Status Bar */}
        <div className="flex justify-between items-center text-xxs font-semibold opacity-75 font-mono mb-4">
          <span>09:41</span>
          <div className="flex gap-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Mock content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className={cn(
            "p-3 rounded-full shadow-inner",
            deviceTheme === "light" ? "bg-emerald-500/10 text-emerald-600" : "bg-emerald-500/20 text-emerald-400"
          )}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-sm">Transfer İşlemi Başarılı</h4>
            <p className="text-xs text-text-secondary mt-1">₺2.500,00 Ulaş Alyeşil hesabına gönderildi.</p>
          </div>
          
          <button
            onClick={() => {
              setIsOpen(true);
              setBsState("idle");
            }}
            className="px-5 py-2 bg-[#5D3EBC] text-white font-semibold rounded-full text-xs hover:bg-[#482F9B] transition-colors"
          >
            Trigger Rating Sheet
          </button>
        </div>

        {/* Bottom Sheet Modal Backdrop */}
        {isOpen && (
          <div
            onClick={() => {
              setIsOpen(false);
              setBsState("idle");
              setFeedbackCategory(null);
            }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xxs z-10 transition-opacity duration-300 animate-fade-in"
          />
        )}

        {/* The Sliding Bottom Sheet */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 z-20 rounded-t-[28px] p-6 pb-8 transition-transform duration-300 shadow-2xl transform border-t",
            deviceTheme === "light"
              ? "bg-white text-neutral-900 border-neutral-100"
              : "bg-[#181524] text-white border-neutral-800/50",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          {/* Drag handle indicator */}
          <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-700/80 rounded-full mx-auto mb-6" />

          {bsState === "idle" && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="space-y-2">
                <h4 className="text-base font-bold">GetirFinans&apos;ı seviyor musun?</h4>
                <p className="text-xs text-text-secondary max-w-[280px] mx-auto">
                  Dürüst görüşün bizi daha iyi yapar.
                </p>
              </div>

              <div className="flex justify-center gap-6">
                {/* Outlined Negative Button */}
                <button
                  onClick={handleThumbsDown}
                  className={cn(
                    "w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-200 active:scale-90",
                    deviceTheme === "light"
                      ? "border-[#5D3EBC] text-[#5D3EBC] bg-[#5D3EBC]/5 hover:bg-[#5D3EBC]/10"
                      : "border-[#8A6CE5] text-[#8A6CE5] bg-[#8A6CE5]/5 hover:bg-[#8A6CE5]/10"
                  )}
                >
                  👎
                </button>

                {/* Filled Positive Button */}
                <button
                  onClick={handleThumbsUp}
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-xl text-white transition-all duration-200 active:scale-90 shadow-md",
                    deviceTheme === "light"
                      ? "bg-[#5D3EBC] hover:bg-[#482F9B] shadow-[#5D3EBC]/20"
                      : "bg-[#8A6CE5] hover:bg-[#7656D4] shadow-[#8A6CE5]/20"
                  )}
                >
                  👍
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors block mx-auto pt-2"
              >
                Şimdi değil
              </button>
            </div>
          )}

          {bsState === "positive_tapped" && (
            <div className="space-y-4 py-6 text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#5D3EBC] text-white flex items-center justify-center mx-auto text-xl animate-ping">
                👍
              </div>
              <p className="text-xs font-semibold text-text-secondary animate-pulse">Launching App Store Review...</p>
            </div>
          )}

          {bsState === "positive_done" && (
            <div className="space-y-4 py-4 text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-md">
                ✓
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-sm">Teşekkürler!</h5>
                <p className="text-xs text-text-secondary">Desteğiniz için teşekkür ederiz.</p>
              </div>
            </div>
          )}

          {bsState === "negative_expand" && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1 text-center">
                <h4 className="text-sm font-bold">Görüşünü bizimle paylaş</h4>
                <p className="text-xxs text-text-secondary">Uygulamayı geliştirmemize yardımcı olun.</p>
              </div>

              {/* Multi-select category chips */}
              <div className="flex flex-wrap gap-2 justify-center py-2">
                {[
                  "Arayüz / Tasarım",
                  "Yavaşlık / Performans",
                  "Para Transferi Hatası",
                  "Müşteri Hizmetleri",
                  "Faiz Oranları",
                  "Diğer",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFeedbackCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xxs font-semibold border transition-all duration-150",
                      feedbackCategory === cat
                        ? "bg-[#5D3EBC] border-transparent text-white shadow-sm"
                        : deviceTheme === "light"
                          ? "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                          : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setBsState("idle")}
                  className={cn(
                    "flex-1 py-2.5 rounded-full text-xs font-semibold transition-colors",
                    deviceTheme === "light" ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200" : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                  )}
                >
                  Geri Dön
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackCategory}
                  className={cn(
                    "flex-1 py-2.5 rounded-full text-xs font-semibold text-white transition-all shadow-sm",
                    feedbackCategory
                      ? deviceTheme === "light"
                        ? "bg-[#5D3EBC] hover:bg-[#482F9B] shadow-[#5D3EBC]/10"
                        : "bg-[#8A6CE5] hover:bg-[#7656D4] shadow-[#8A6CE5]/10"
                      : "bg-neutral-400/50 cursor-not-allowed opacity-60"
                  )}
                >
                  Gönder
                </button>
              </div>
            </div>
          )}

          {bsState === "negative_done" && (
            <div className="space-y-4 py-4 text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-md">
                ✓
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-sm">Geri Bildiriminiz Alındı</h5>
                <p className="text-xs text-text-secondary">Katkınız için teşekkür ederiz.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. INTERACTIVE AI COMPONENTS PREVIEW
// ─────────────────────────────────────────────────────────────────────────────

export function AiComponentPreview() {
  const [aiTheme, setAiTheme] = useState<"light" | "dark">("dark");

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-primary">AI Component Spec</span>
          <span className="text-xxs text-text-secondary">Custom Isolated Token Namespace: bg/ai/*</span>
        </div>
        <button
          onClick={() => setAiTheme(aiTheme === "light" ? "dark" : "light")}
          className={cn(
            "h-8 px-3 rounded-full text-xs font-semibold border transition-all duration-150",
            aiTheme === "dark"
              ? "bg-neutral-950 text-white border-neutral-800"
              : "bg-white text-neutral-950 border-neutral-200"
          )}
        >
          Toggle: {aiTheme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div
        className={cn(
          "p-6 md:p-8 flex flex-col md:flex-row gap-6 items-stretch justify-center transition-colors duration-300",
          aiTheme === "light" ? "bg-[#F8F7FC] text-neutral-900" : "bg-[#0A0810] text-white"
        )}
      >
        {/* Card 1: AI Podcast Recommendation */}
        <div
          className={cn(
            "flex-1 p-5 rounded-2xl border flex flex-col justify-between min-h-[160px] transition-colors duration-300 shadow-sm",
            aiTheme === "light"
              ? "bg-white border-neutral-200/50"
              : "bg-[#2B2438] border-[#3B324D]/60"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xxs font-bold uppercase tracking-wider text-purple-400">
              Podcast Önerisi
            </span>
            <span className="text-xxs opacity-75 font-mono">24 dk</span>
          </div>
          
          <div className="my-4">
            <h5 className="font-bold text-sm leading-snug">Yatırım Dünyasında Yeni Eğilimler</h5>
            <p className="text-xxs text-text-secondary opacity-80 mt-1">Yapay zekanın portföy yönetimindeki yeri ve geleceği.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-[#5D3EBC] text-white flex items-center justify-center text-xs shadow-sm hover:scale-105 active:scale-95 transition-transform">
              ▶
            </button>
            <div className="flex-1 flex items-center gap-0.5">
              {[0.4, 0.7, 0.5, 0.9, 0.3, 0.6, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 h-3 bg-brand/35 rounded-full"
                  style={{ height: `${h * 16}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: AI Smart Assistant Prompt */}
        <div
          className={cn(
            "flex-1 p-5 rounded-2xl border flex flex-col justify-between min-h-[160px] transition-colors duration-300 shadow-sm",
            aiTheme === "light"
              ? "bg-white border-neutral-200/50"
              : "bg-[#2B2438] border-[#3B324D]/60"
          )}
        >
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center text-xxs font-bold">
              AI
            </div>
            <span className="text-xxs font-bold uppercase tracking-wider text-purple-400">
              Akıllı Asistan
            </span>
          </div>

          <div className="my-3 text-xs leading-relaxed">
            Kira ödemeniz için <span className="font-bold">₺12.500,00</span> transfer talimatı oluşturulsun mu?
          </div>

          <div className="flex gap-2">
            <button
              className={cn(
                "flex-1 py-1.5 rounded-lg text-xxs font-semibold border transition-all",
                aiTheme === "light"
                  ? "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
                  : "bg-[#1E1928] hover:bg-[#342D42] border-purple-900/40 text-purple-200"
              )}
            >
              Hayır
            </button>
            <button
              className={cn(
                "flex-1 py-1.5 rounded-lg text-xxs font-semibold text-white transition-all shadow-sm",
                aiTheme === "light" ? "bg-[#5D3EBC] hover:bg-[#482F9B]" : "bg-[#8A6CE5] hover:bg-[#7656D4]"
              )}
            >
              Evet, Oluştur
            </button>
          </div>
        </div>
      </div>
      
      {/* Spec details */}
      <div className="px-6 py-4 bg-neutral-100/50 dark:bg-neutral-900/30 border-t border-neutral-200/20 text-xxs font-mono space-y-1">
        <div className="flex justify-between">
          <span className="text-text-secondary">bg/ai/primary:</span>
          <span className="font-semibold">{aiTheme === "light" ? "#FFFFFF" : "#2B2438"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">bg/ai/border:</span>
          <span className="font-semibold">{aiTheme === "light" ? "#EAEAEA" : "#3B324D"}</span>
        </div>
      </div>
    </div>
  );
}
