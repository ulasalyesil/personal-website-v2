import type { ComponentProps, ComponentType } from "react";
import type { StaticImageData } from "next/image";

// ─── Project data (from JSON files) ───────────────────────────────────────────

export interface ProjectEntry {
  date: string;
  title: string;
  role: string;
  target: string;
  /** Excluded from the Works listing without deleting the entry or its case study page. */
  hidden?: boolean;
}

export type ProjectsData = Record<string, ProjectEntry>;

// ─── Featured project (home page) ─────────────────────────────────────────────

export interface FeaturedProject {
  slug: string;
  title: string;
  description: string;
  cover: StaticImageData;
}

// ─── Case study content blocks ─────────────────────────────────────────────────

/**
 * Which lane a block occupies inside the case study container.
 * - `prose`  capped at the reading measure (~65ch). Text and anything read.
 * - `wide`   the full container. Media, widgets, metric grids.
 * - `bleed`  edge to edge. Reserved for whole-field visuals.
 */
export type BlockWidth = "prose" | "wide" | "bleed";

/** Subsection heading, rendered as h3 inside a section. */
export interface HeadingBlock {
  type: "heading";
  text: string;
}

/** Opening paragraph, set one step up. One per case study. */
export interface LeadBlock {
  type: "lead";
  text: string;
}

export interface TextBlock {
  type: "text";
  text: string;
}

export interface ListBlock {
  type: "list";
  items: string[];
  /** Numbered when true. Use for sequences, not for sets. */
  ordered?: boolean;
  /** Optional lead-in line above the list. */
  lead?: string;
}

export interface GalleryItem {
  src: StaticImageData;
  alt?: string;
}

/** @deprecated Use `figure`, which adds a caption and a lane. Kept so existing pages render. */
export interface ImageBlock {
  type: "image";
  src: StaticImageData;
  alt?: string;
}

export interface FigureBlock {
  type: "figure";
  src: StaticImageData;
  alt?: string;
  /** What the reader should notice. This is what a scanner reads instead of the paragraph. */
  caption?: string;
  width?: BlockWidth;
  /**
   * `screen` for a capture cut from a device screen, whose own rounded corners
   * leave dark pixels behind. The radius is a percentage so it scales with the image.
   */
  radius?: "screen";
}

export interface GalleryBlock {
  type: "gallery";
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  caption?: string;
}

/** Counted results. Values only, no adjectives. */
export interface MetricsBlock {
  type: "metrics";
  items: { value: string; label: string; note?: string }[];
}

/** One claim, boxed. Closes a section with its transferable principle. */
export interface CalloutBlock {
  type: "callout";
  text: string;
  variant?: "principle" | "note" | "constraint";
  label?: string;
}

/** Pull quote. For the thesis and the closing line. */
export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface CustomBlock {
  type: "custom";
  id: string;
  width?: BlockWidth;
  caption?: string;
}

/**
 * One side of a comparison. Supply exactly one of `src`, `id` or `text` as the
 * pane's content. `tone` marks which side lost, so the reader does not have to
 * infer the verdict from the caption.
 */
export interface ComparePane {
  /** Name the position, not the medium: "Positional equivalence", not "Option A". */
  label: string;
  tone?: "rejected" | "shipped" | "neutral";
  src?: StaticImageData;
  alt?: string;
  /** Key into `customComponents`, for specimens that have to be rendered. */
  id?: string;
  text?: string;
  caption?: string;
}

/**
 * Two options side by side, with the reasoning that picked one. This is the
 * block that lets a case study show an exploration rather than assert that it
 * happened: what was tried, what shipped, and why the difference mattered.
 */
export interface CompareBlock {
  type: "compare";
  panes: [ComparePane, ComparePane];
  /** The argument that decided it. */
  verdict?: string;
}

/** Any block that can live inside a section. */
export type LeafBlock =
  | HeadingBlock
  | LeadBlock
  | TextBlock
  | ListBlock
  | ImageBlock
  | FigureBlock
  | GalleryBlock
  | MetricsBlock
  | CalloutBlock
  | QuoteBlock
  | CompareBlock
  | CustomBlock;

/**
 * One level of nesting, and the only one. Sections are what make a long page
 * addressable: anchors, the table of contents, reading progress and the
 * section rhythm all derive from this block and nothing else.
 */
export interface SectionBlock {
  type: "section";
  /** Stable anchor id. Slug of the title unless there is a reason to differ. */
  id: string;
  title: string;
  /** Short label above the title. */
  kicker?: string;
  blocks: LeafBlock[];
}

export type ContentBlock = LeafBlock | SectionBlock;

/**
 * `case-study` makes an argument and supports it. `project` shows a shipped
 * thing well: images lead, copy captions them, no table of contents.
 */
export type CaseStudyTier = "case-study" | "project";

// ─── Work experience ───────────────────────────────────────────────────────────

export interface ExperiencePositionItem {
  id: string;
  title: string;
  employmentPeriod: string;
  employmentType?: string;
  description?: string;
  icon?: ComponentType<ComponentProps<"svg">>;
  skills?: string[];
  isExpanded?: boolean;
}

export interface ExperienceItem {
  id: string;
  companyName: string;
  companyLogo?: string;
  positions: ExperiencePositionItem[];
  isCurrentEmployer?: boolean;
}
