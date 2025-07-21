"use client";

import { DateTime } from "luxon";
import { useEffect, useState } from "react";

// Mapping from city prop to IANA timezone and display label
const CITY_MAP = {
  berlin: { zone: "Europe/Berlin", label: "Berlin, DE" },
  istanbul: { zone: "Europe/Istanbul", label: "Istanbul, TR" },
  // add more cities here
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
    <div
      className="
        w-contain
        h-32
        rounded-md
        border border-neutral-200 dark:border-neutral-800
        bg-neutral-100 dark:bg-neutral-800
        text-neutral-800 dark:text-neutral-100
        p-4
        shadow-md
        flex flex-col justify-between
        font-mono
      "
    >
      {/* Top Row */}
      <div className="flex justify-between text-xs tracking-tight">
        <span className="lowercase">{label}</span>

        <div className="relative flex items-center justify-center text-xs text-center">
          <span>{gmtOffset}</span>

          {/* GMT Marker: single gradient line */}
          <div
            className="absolute"
            style={{
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              height: "96px",
              background:
                "linear-gradient(to top, theme('colors-neutral-400'), transparent)",
            }}
          />
        </div>

        <span>{formattedDate}</span>
      </div>

      {/* Time */}
      <div className="text-xl lowercase">{formattedTime}</div>

      {/* Ruler */}
      <div className="relative mt-2 w-3xs h-6">
        {/* Tick marks every 15 minutes */}
        <div className="absolute inset-x-0 top-0 flex h-6 justify-between">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="h-2 w-px bg-neutral-400 dark:bg-neutral-600"
              style={{ opacity: i % 6 === 0 ? 1 : 0.4 }}
            />
          ))}
        </div>

        {/* Time labels */}
        <div className="absolute inset-x-0 bottom-0 flex h-4 justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>12</span>
          <span>6</span>
          <span>12</span>
          <span>6</span>
          <span>12</span>
        </div>

        {/* Current Time Marker: gradient line + dot */}
        <div
          className="absolute"
          style={{
            bottom: 0,
            left: `${markerPosition}%`,
            transform: "translateX(-50%)",
            width: "1px",
            height: "56px",
            background: "linear-gradient(to bottom, #171717, transparent)",
          }}
        >
          <div className="absolute bottom-full left-1/2 w-2 h-2 bg-[#FF5701] rounded-full transform -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
