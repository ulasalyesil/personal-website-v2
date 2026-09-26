"use client";

import { useEffect, useState } from "react";
import { Readout, type Reading } from "@/components/hud";

const ZONE = "Europe/Istanbul";

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/** Minutes east of UTC for a zone at a given instant. */
function offset(zone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "longOffset",
  })
    .formatToParts(at)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = parts?.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!m) return 0;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0));
}

function span(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}H${String(m).padStart(2, "0")}` : `${h}H`;
}

/**
 * The time where the work happens, and how far that is from the reader.
 * A reading like any other in the footer: it is measured every second, and
 * the difference is only printed when there is one. Renders nothing on the
 * server, where there is no reader and no honest second to print.
 */
export default function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const diff = offset(ZONE, now) + now.getTimezoneOffset();
  const items: Reading[] = [{ key: "istanbul", value: `${clock.format(now)} TRT` }];
  if (diff !== 0) {
    items.push({
      key: "from you",
      value: `${span(Math.abs(diff))} ${diff > 0 ? "ahead" : "behind"}`,
    });
  }

  return <Readout items={items} />;
}
