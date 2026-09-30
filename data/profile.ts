import { experience } from "@/data/experience";
import { EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export const SITE_URL = "https://ulasalyesil.com";

/**
 * Facts about the person, in one place, for readers that are not people:
 * structured data, llms.txt and /cv all read from here. The current title
 * and employer come from `data/experience.ts` so the two cannot drift.
 */
const current = experience.find((item) => item.isCurrentEmployer);

export const PROFILE = {
  name: "Ulaş Alyeşil",
  jobTitle: current?.positions[0].title ?? "Product Designer",
  employer: current?.companyName,
  location: { city: "Istanbul", country: "TR", label: "Istanbul, Türkiye" },
  openTo: "Remote work and relocation",
  email: EMAIL,
  url: SITE_URL,
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.dribbble,
    SOCIAL_LINKS.twitter,
  ],
  education: [
    {
      degree: "B.A. Visual Communication Design",
      school: "Bahçeşehir University",
      period: "2017 — 2022",
    },
  ],
  languages: [
    { name: "Turkish", code: "tr", level: "Native" },
    { name: "English", code: "en", level: "Fluent" },
    { name: "German", code: "de", level: "Beginner" },
  ],
  knowsAbout: [
    "Design systems",
    "Design tokens",
    "Dark mode",
    "Component contracts",
    "AI assistant UX",
    "SwiftUI prototyping",
    "React and Next.js",
    "Figma",
  ],
} as const;
