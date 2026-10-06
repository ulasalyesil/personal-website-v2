export type LabMedia = {
  /** Still frame — /images/lab/<slug>.webp */
  src: string;
  width: number;
  height: number;
  /** Optional muted loop — plays on hover in the grid, plays on request in the detail page. */
  video?: string;
  /** Poster for the video's resting state. */
  poster?: string;
  /**
   * Set when `video` is a raw phone screen recording, so it renders inside
   * the device bezel instead of as a flat frame.
   */
  device?: "iphone";
  alt: string;
};

export type LabItem = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  /** One line for the index. The full blurb is for the detail view. */
  summary: string;
  blurb: string;
  media: LabMedia;
  /** Colour field behind the media, drawn from the work itself. */
  tint: string;
  /** Live prototype. Present means the thing actually runs. */
  url?: string;
  wip?: boolean;
};

export const LAB_ITEMS: LabItem[] = [
  {
    slug: "elastic-type",
    title: "Elastic type",
    tag: "interaction",
    date: "sep 2026",
    summary: "A React recreation of ElevenLabs' elastic text selector.",
    blurb:
      "Recreation of ElevenLabs' elastic text selector, built in React. Drag the list to browse, then release to snap to a word. The text bends with the gesture and straightens as it settles. Supports clicking, keyboard selection, and reduced motion. Original interaction by ElevenLabs.",
    media: {
      src: "/images/lab/elastic-type.png",
      width: 816,
      height: 694,
      alt: "An elastic vertical list of words on warm paper, with Elastic selected between vermilion brackets",
    },
    tint: "#c36a50",
    url: "/elastic-type",
  },
  {
    slug: "brand-layers",
    title: "Brand Layers",
    tag: "system",
    date: "sep 2026",
    summary: "A brand as a layer of decisions, not a copy of the system.",
    blurb:
      "One payment ticket, unchanged across three brands, two modes and five payment states. Switch the controls to see how each layer resolves the same component. Brand gives it a voice; semantic tokens preserve its meaning, so an overdue payment still reads as overdue in every brand.",
    media: {
      src: "/images/lab/brand-layers.webp",
      width: 1600,
      height: 1000,
      video: "/video/lab/brand-layers.mp4",
      poster: "/video/lab/brand-layers-poster.jpg",
      alt: "A payment ticket with token labels wired to each part, re-resolving across three brands, light and dark, and five payment states",
    },
    tint: "#4a3f7a",
    url: "/brand-layers",
  },
  {
    slug: "common-ground",
    title: "Common Ground",
    tag: "prototype",
    date: "sep 2026",
    summary:
      "Three people, three AIs, and a typed model of what the team knows \u2014 instead of a shared chat.",
    blurb:
      "A shared model of what a team knows, assumes, disputes and has decided. Private AI threads stay private. Moving an insight into the shared model is deliberate, and proposing it as truth opens a review. Disagreements remain visible beside each other.",
    media: {
      src: "/images/lab/common-ground.webp",
      width: 1600,
      height: 1000,
      alt: "A private AI thread open over a shared knowledge model, offering four ways to move an insight out of the private context",
    },
    tint: "#4a4a7d",
    url: "/common-ground",
  },
  {
    slug: "pre-approval-concept",
    title: "Pre-approval concept",
    tag: "concept",
    date: "sep 2026",
    summary:
      "Concept work, not shipped: the pre-approved limit screen with a Liquid Glass button and a soft 3D illustration.",
    blurb:
      "Concept work, not shipped. A pre-approved limit screen exploring a Liquid Glass button, a soft 3D illustration built for light and dark, and an offer badge attached to the card’s edge.",
    media: {
      src: "/images/lab/getirfinansli-ol-concept.webp",
      width: 3200,
      height: 2000,
      alt: "Concept screens for a pre-approved limit, light mode beside dark: a soft 3D illustration of a checked document, gold and a lira coin, an offer card with a badge on its edge, and a Liquid Glass continue button",
    },
    tint: "#7849f7",
  },
  {
    slug: "fx-chart-range",
    title: "FX chart range",
    tag: "interaction",
    date: "jul 2026",
    summary:
      "Two fingers select a date range on a chart SwiftUI will only let you touch once.",
    blurb:
      "The actual problem: two fingers on the chart should select a range, not a point, and SwiftUI gestures only ever expose one touch. A bare UIView underneath reports raw multi-touch instead, so the chart owns the gesture, recolors the band by direction, and swaps the hero to a two-date delta while the rest of the screen is locked from scrolling out from under it.",
    media: {
      src: "/images/lab/fx-chart-range.webp",
      width: 1600,
      height: 1000,
      video: "/video/lab/fx-chart-range.mp4",
      poster: "/video/lab/fx-chart-range-poster.jpg",
      device: "iphone",
      alt: "Two fingers dragging across an FX chart to select a date range, the band between them recoloured by direction",
    },
    tint: "#2f6f52",
  },
  {
    slug: "feature-area",
    title: "Feature Area",
    tag: "interaction",
    date: "aug 2026",
    summary:
      "A carousel card that stays still while only its contents move, rebuilt from a spec measured off a screen recording.",
    blurb:
      "A carousel rebuilt from motion measured frame by frame off a reference recording. The card stays still: text slides one card width while the illustration cross-dissolves in place. A swipe can take over mid-transition, and any frame can be frozen to check against the spec.",
    media: {
      src: "/images/lab/feature-area.webp",
      width: 1600,
      height: 1000,
      video: "/video/lab/feature-area.mp4",
      poster: "/video/lab/feature-area-poster.jpg",
      device: "iphone",
      alt: "A feature promotion card whose text slides one card width while the illustration cross-dissolves in place, with a live readout of the transition below",
    },
    tint: "#5d3ebc",
  },
  {
    slug: "campaigns",
    title: "Campaigns",
    tag: "prototype",
    date: "aug 2026",
    summary:
      "A carousel that zooms into the campaign it was showing, so the card you tapped is the page.",
    blurb:
      "Hero carousel that zooms into the campaign it was showing, so the card you tapped is the page you land on rather than a new screen that replaces it. Artwork drives the backdrop, and the entrance choreography runs once per launch instead of on every return.",
    media: {
      src: "/images/lab/campaigns.webp",
      width: 1600,
      height: 1000,
      video: "/video/lab/campaigns.mp4",
      poster: "/video/lab/campaigns-poster.jpg",
      device: "iphone",
      alt: "A campaign carousel zooming into the detail page for the card that was tapped",
    },
    tint: "#b5782a",
  },
  {
    slug: "dark-mode",
    title: "Dark mode",
    tag: "system",
    date: "feb 2026",
    summary:
      "A live fintech app\u2019s colour foundation rebuilt so modes resolve at the semantic layer, not by inverting hex.",
    blurb:
      "Rebuilt the color foundation of a live fintech app as a two-tier token system, primitives carrying values, semantics carrying intent, so modes resolve at the semantic layer instead of a 1:1 hex inversion. Brand purple stays a fixed anchor across both modes, status colors range-switch instead of inverting, same screen, one design file.",
    media: {
      src: "/images/lab/dark-mode.webp",
      width: 1600,
      height: 1000,
      alt: "getirfinans home screen shown side by side in light and dark mode",
    },
    tint: "#6b4f9e",
  },
];
