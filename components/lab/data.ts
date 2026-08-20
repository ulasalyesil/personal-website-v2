export type LabMedia = {
  /** Still frame — /images/lab/<slug>.webp */
  src: string;
  /** Optional muted loop — plays on hover in the grid, autoplays in the modal. */
  video?: string;
  alt: string;
};

export type LabItem = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  blurb: string;
  media: LabMedia;
  /** Live prototype, linked from the modal. */
  url?: string;
  wip?: boolean;
};

export const LAB_ITEMS: LabItem[] = [
  {
    slug: "fx-chart-scrub",
    title: "FX chart scrub",
    tag: "interaction",
    date: "jul 2026",
    blurb:
      "Dragging the chart moves the price, the change indicator and the date together, so the header reads as the value at your finger rather than the value now. SwiftUI gestures only expose one touch, so the chart reports raw touches from a bare UIView underneath: two fingers inspect a range instead of a point.",
    media: {
      src: "/images/lab/fx-chart-scrub.webp",
      video: "/video/lab/fx-chart-scrub.mp4",
      alt: "Scrubbing an FX chart, with the price and date updating live",
    },
  },
  {
    slug: "campaigns",
    title: "Campaigns",
    tag: "prototype",
    date: "aug 2026",
    blurb:
      "Hero carousel that zooms into the campaign it was showing, so the card you tapped is the page you land on rather than a new screen that replaces it. Artwork drives the backdrop, and the entrance choreography runs once per launch instead of on every return.",
    media: {
      src: "/images/lab/campaigns.webp",
      video: "/video/lab/campaigns.mp4",
      alt: "A campaign carousel zooming into its detail page",
    },
  },
];
