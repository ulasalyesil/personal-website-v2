export type LabMedia = {
  /** Still frame — /images/lab/<slug>.webp */
  src: string;
  /** Optional muted loop — plays on hover in the grid, autoplays in the modal. */
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
    slug: "common-ground",
    title: "Common Ground",
    tag: "prototype",
    date: "sep 2026",
    summary:
      "Three people, three AIs, and a typed model of what the team knows \u2014 instead of a shared chat.",
    blurb:
      "The actual problem: put three people and three AIs on one project and the default answer is a shared chat, which flattens everything anyone believes into a transcript nobody rereads. This builds the other thing, a typed model of what the team knows, assumes, disputes and has decided, where every card carries whether a person said it, a model inferred it, or the team accepted it. Private threads stay private; moving something out of one is a deliberate act with four different destinations, and proposing it as truth opens a review instead of writing it. Disagreements sit side by side rather than getting summarized away, and the model's confidence number is shown last, under the evidence, because a number raises trust in a wrong answer even when it means nothing.",
    media: {
      src: "/images/lab/common-ground.webp",
      alt: "A private AI thread open over a shared knowledge model, offering four ways to move an insight out of the private context",
    },
    tint: "#4a4a7d",
    url: "/common-ground",
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
      video: "/video/lab/fx-chart-range.mp4",
      poster: "/video/lab/fx-chart-range-poster.jpg",
      device: "iphone",
      alt: "Two fingers dragging across an FX chart to select a date range, the band between them recoloured by direction",
    },
    tint: "#2f6f52",
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
      alt: "getirfinans home screen shown side by side in light and dark mode",
    },
    tint: "#6b4f9e",
  },
];
