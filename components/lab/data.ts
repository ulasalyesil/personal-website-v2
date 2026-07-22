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

export const LAB_ITEMS: LabItem[] = [];
