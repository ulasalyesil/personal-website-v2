import type { StaticImageData } from "next/image";

import gfAiCover from "@/public/images/getirfinans-ai/cover.webp";
import gfDesignSystemCover from "@/public/images/lab/dark-mode.webp";
import qbCover from "@/public/images/quickbooks/qb_cover.webp";
import wisecareCover from "@/public/images/wisecare/wisecare_cover.webp";

export type CaseStudy = {
  slug: string;
  title: string;
  line: string;
  role: string;
  year: string;
  status: string;
  cover: StaticImageData;
  alt: string;
};

/**
 * The four studies the site leads with, in reading order. Home, Work and the
 * next-study footer all read from here, so a title or cover changes once.
 * Status lines only restate what each study already establishes.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "getirfinans-ai",
    title: "GetirFinans AI",
    line: "Helping people move from questions to useful next actions in a fintech app.",
    role: "Product design, prototyping",
    year: "2026",
    status: "Shipped on iOS, with SwiftUI prototypes",
    cover: gfAiCover,
    alt: "Three GetirFinans screens: the assistant's opening prompts, a campaign answer, and an AI answer inside search",
  },
  {
    slug: "getirfinans-design-system",
    title: "GetirFinans Design System",
    line: "A semantic color foundation, proven by shipping app-wide dark mode.",
    role: "Design systems",
    year: "2026",
    status: "Dark mode shipped app-wide",
    cover: gfDesignSystemCover,
    alt: "The GetirFinans home screen in light mode beside the same screen in dark mode",
  },
  {
    slug: "jotform-integrations",
    title: "Jotform | QuickBooks",
    line: "A guided flow for mapping form submissions to QuickBooks customers and invoices.",
    role: "Product design",
    year: "2023",
    status: "Launched in Jotform",
    cover: qbCover,
    alt: "Jotform's integration settings, mapping form fields to a QuickBooks invoice",
  },
  {
    slug: "wisecareai",
    title: "WiseCareAI",
    line: "Founding product design for a U.S. health-insurance platform, public site and internal tools.",
    role: "Founding product designer",
    year: "2024 to 2025",
    status: "Taken to a market-ready product",
    cover: wisecareCover,
    alt: "WiseCareAI comparing two Medicare Advantage plans, with an AI summary of which fits the member",
  },
];

/** The study after this one, wrapping at the end. Other pages lead to the first. */
export function nextCaseStudy(slug: string): CaseStudy {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}
