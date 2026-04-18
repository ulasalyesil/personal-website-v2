"use client";

import type { ReactNode } from "react";

// ─── Safari (macOS) ────────────────────────────────────────────────
const SAFARI_BAR = "#f5f5f7";
const SAFARI_BORDER = "#d4d4d4";
const SAFARI_DIM = "#8e8e93";

function TrafficLights() {
  return (
    <div style={{ display: "flex", gap: 8, padding: "0 14px" }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div
          key={c}
          style={{ width: 12, height: 12, borderRadius: 9999, background: c }}
        />
      ))}
    </div>
  );
}

export function SafariWindow({
  url = "example.com",
  title,
  width = 900,
  height = 560,
  children,
}: {
  url?: string;
  title?: string;
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 24px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {/* toolbar */}
      <div
        style={{
          height: 52,
          background: SAFARI_BAR,
          borderBottom: `1px solid ${SAFARI_BORDER}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 12px",
        }}
      >
        <TrafficLights />
        {/* nav arrows */}
        <div style={{ display: "flex", gap: 6, color: SAFARI_DIM }}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M10 3l-5 5 5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* url bar */}
        <div
          style={{
            flex: 1,
            height: 28,
            borderRadius: 6,
            background: "#fff",
            border: `1px solid ${SAFARI_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "0 10px",
            fontFamily: "-apple-system, system-ui",
            fontSize: 12,
            color: "#171717",
          }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12">
            <path
              d="M5 0a3 3 0 00-3 3v2H1v7h8V5H8V3a3 3 0 00-3-3zm-2 5V3a2 2 0 114 0v2H3z"
              fill={SAFARI_DIM}
            />
          </svg>
          <span>{url}</span>
        </div>
        {/* share + tabs (decorative) */}
        <div style={{ display: "flex", gap: 8, color: SAFARI_DIM }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              border: `1px solid ${SAFARI_BORDER}`,
            }}
          />
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              border: `1px solid ${SAFARI_BORDER}`,
            }}
          />
        </div>
      </div>
      {title && (
        <div
          style={{
            height: 28,
            background: SAFARI_BAR,
            borderBottom: `1px solid ${SAFARI_BORDER}`,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            fontFamily: "-apple-system, system-ui",
            fontSize: 11,
            color: "#525252",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ flex: 1, background: "#fff", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// ─── iOS device (simplified) ──────────────────────────────────────
export function IOSDevice({
  width = 402,
  height = 820,
  children,
}: {
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 48,
        overflow: "hidden",
        position: "relative",
        background: "#F2F2F7",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)",
        fontFamily: "-apple-system, system-ui, sans-serif",
      }}
    >
      {/* dynamic island */}
      <div
        style={{
          position: "absolute",
          top: 11,
          left: "50%",
          transform: "translateX(-50%)",
          width: 126,
          height: 37,
          borderRadius: 24,
          background: "#000",
          zIndex: 50,
        }}
      />
      {/* status bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "21px 30px 0",
          zIndex: 10,
          fontFamily: '-apple-system, "SF Pro", system-ui',
          fontWeight: 590,
          fontSize: 17,
          color: "#000",
        }}
      >
        <span>9:41</span>
        <span style={{ opacity: 0 }}>•</span>
      </div>
      {/* content */}
      <div style={{ height: "100%", paddingTop: 54 }}>{children}</div>
      {/* home indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 139,
            height: 5,
            borderRadius: 100,
            background: "rgba(0,0,0,0.25)",
          }}
        />
      </div>
    </div>
  );
}
