import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "getirfinans",
    companyName: "getirfinans",
    isCurrentEmployer: true,
    positions: [
      {
        id: "getir-product-designer",
        title: "UI Designer, Design Systems",
        employmentPeriod: "November 2025 — Present",
        employmentType: "Full-time",
        description:
          "Own the design system for Turkey's leading fintech app: rebuilt the color foundation and shipped dark mode via a two-tier token system. Designed the AI assistant end to end, conversation UI, thinking states, and motion.",
        skills: ["Product Design", "Design Systems", "AI/UX", "Figma", "Dark Mode"],
      },
    ],
  },
  {
    id: "wisecare",
    companyName: "WiseCareAI",
    isCurrentEmployer: false,
    positions: [
      {
        id: "wisecare-founding-designer",
        title: "Founding Product Designer",
        employmentPeriod: "May 2024 — August 2025",
        employmentType: "Full-time",
        description:
          "End-to-end product design for a U.S. health-insurance platform: brand identity, visual language, marketing site, onboarding, and core flows, taken from zero to a market-ready product. Integrated generative AI to support adaptable forms and recommendations.",
        skills: ["Product Design", "Design Systems", "Figma", "AI/UX", "User Research"],
      },
    ],
  },
  {
    id: "freelance",
    companyName: "Freelance",
    positions: [
      {
        id: "freelance-designer",
        title: "Product Designer & Developer",
        employmentPeriod: "2023 — Present",
        employmentType: "Freelance",
        description:
          "Working with early-stage startups and creative agencies on product design, web development, and brand identity. Clients include Good Afternoon Creative and Full Spectrum Insights.",
        skills: ["Product Design", "Web Development", "Next.js", "Brand Identity"],
      },
    ],
  },
  {
    id: "peaka",
    companyName: "Peaka",
    isCurrentEmployer: false,
    positions: [
      {
        id: "peaka-product-designer",
        title: "Product Designer",
        employmentPeriod: "September 2023 — May 2024",
        employmentType: "Full-time",
        description:
          "Redesigned core workflows on a data-integration platform to reduce task friction, validated through usability testing. Led UX research that shaped major product decisions. Co-built a scalable design system with engineering.",
        skills: ["Product Design", "UX Research", "Design Systems", "Figma"],
      },
    ],
  },
  {
    id: "jotform",
    companyName: "Jotform",
    isCurrentEmployer: false,
    positions: [
      {
        id: "jotform-product-designer",
        title: "Product Designer",
        employmentPeriod: "2022 — 2023",
        employmentType: "Full-time",
        description:
          "Designed accessible, responsive interfaces for a global user base in the millions. Designed a QuickBooks integration automating invoice and customer creation from form submissions. Streamlined design-to-development handoff.",
        skills: ["Product Design", "Accessibility", "Figma"],
      },
    ],
  },
];
