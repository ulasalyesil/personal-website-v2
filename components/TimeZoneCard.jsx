"use client";

import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const CITY_MAP = {
  berlin: { zone: "Europe/Berlin", label: "Berlin, DE" },
  istanbul: { zone: "Europe/Istanbul", label: "Istanbul, TR" },
};

export default function TimeZoneCard({ city = "berlin" }) {
  const key = city.toLowerCase();
  const { zone, label } = CITY_MAP[key] || CITY_MAP["berlin"];

  const [now, setNow] = useState(DateTime.now().setZone(zone));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now().setZone(zone));
    }, 1000);
    return () => clearInterval(interval);
  }, [zone]);

  const formattedTime = now.toFormat("h:mm a").toLowerCase();
  const formattedDate = now.toFormat("dd LLL").toLowerCase();
  const gmtOffset = `GMT${now.offset >= 0 ? "+" : ""}${now.offset / 60}`;

  const hour = now.hour + now.minute / 60;
  const markerPosition = (hour / 24) * 100;

  return (
    <div className="w-contain h-32 rounded-md border border-border-default bg-surface-1 text-text-primary p-4 shadow-md flex flex-col justify-between font-mono">
      <div className="flex justify-between text-xs tracking-tight">
        <span className="lowercase">{label}</span>
        <span className="tabular-nums">{gmtOffset}</span>
        <span>{formattedDate}</span>
      </div>

      <div className="text-xl lowercase tabular-nums">{formattedTime}</div>

      <div className="relative mt-2 w-3xs h-6">
        <div className="absolute inset-x-0 top-0 flex h-6 justify-between">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="h-2 w-px bg-text-tertiary"
              style={{ opacity: i % 6 === 0 ? 1 : 0.4 }}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-4 justify-between text-xs text-text-tertiary tabular-nums">
          <span>12</span>
          <span>6</span>
          <span>12</span>
          <span>6</span>
          <span>12</span>
        </div>

        <div
          className="absolute bottom-0"
          style={{
            left: `${markerPosition}%`,
            transform: "translateX(-50%)",
            width: "1px",
            height: "56px",
            backgroundColor: "var(--color-text-tertiary)",
          }}
        >
          <div className="absolute bottom-full left-1/2 size-2 bg-brand rounded-full -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
