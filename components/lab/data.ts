export type LabFrame = "safari" | "ios" | "none";

export type LabItem = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  frame: LabFrame;
  url?: string;
  preview: string;
  w: number;
  h: number;
  blurb: string;
  placeholder?: boolean;
};

export const LAB_ITEMS: LabItem[] = [
  {
    slug: "scroll-field",
    title: "Scroll field",
    tag: "code",
    date: "feb 2026",
    frame: "safari",
    url: "lab.ulasalyesil.com/scroll-field",
    preview: "scroll-field",
    w: 460,
    h: 300,
    blurb:
      "Cursor-reactive particle field. Drag or hover to pull points off the baseline — release and they ease back. Built as an excuse to play with spring physics without springs — just exponential decay driven off pointer distance.",
  },
  {
    slug: "wave-study",
    title: "Wave study",
    tag: "generative",
    date: "jan 2026",
    frame: "none",
    preview: "wave-study",
    w: 420,
    h: 240,
    blurb:
      "Daily-sketch 027. Layering sine with 1D Perlin noise — the classic combination, but rendered at 12fps to give the motion a deliberate, almost handmade rhythm.",
  },
  {
    slug: "time-card",
    title: "Time card",
    tag: "ui",
    date: "mar 2026",
    frame: "ios",
    preview: "time-card",
    w: 280,
    h: 380,
    blurb:
      "Mobile version of the TimeZoneCard on the homepage. Tested a 24-tick ruler with a pulsing orange indicator — looks calmer than ticking numerals and makes the relative position legible at a glance.",
  },
  {
    slug: "reader-inbox",
    title: "Reader inbox",
    tag: "ui",
    date: "dec 2025",
    frame: "ios",
    preview: "reader-inbox",
    w: 280,
    h: 380,
    blurb:
      "Exploring a reading-first inbox pattern. iOS-native grouped list, 14px corner radius, deliberate absence of previews — the idea is to force a decision before you open, not while you scan.",
  },
  {
    slug: "ease-viz",
    title: "Ease viz",
    tag: "motion",
    date: "in progress",
    frame: "safari",
    url: "lab.ulasalyesil.com/ease-viz",
    preview: "ease-viz",
    placeholder: true,
    w: 400,
    h: 260,
    blurb:
      "Visual scrubbing for the site's easing curves. Drag the head, watch the value land. Tiny, self-contained — a learning tool more than a product.",
  },
];
