import type { ComponentProps, ComponentType } from "react";
import type { StaticImageData } from "next/image";

// ─── Project data (from JSON files) ───────────────────────────────────────────

export interface ProjectEntry {
  date: string;
  title: string;
  role: string;
  target: string;
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

export interface TextBlock {
  type: "text";
  text: string;
}

export interface GalleryItem {
  src: StaticImageData;
  alt?: string;
}

export interface ImageBlock {
  type: "image";
  src: StaticImageData;
  alt?: string;
}

export interface GalleryBlock {
  type: "gallery";
  items: GalleryItem[];
}

export type ContentBlock = TextBlock | ImageBlock | GalleryBlock;

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
