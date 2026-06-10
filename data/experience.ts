import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "getir-finans",
    companyName: "Getir Finans",
    isCurrentEmployer: true,
    positions: [
      {
        id: "getir-product-designer",
        title: "Product Designer",
        employmentPeriod: "2025 — Present",
        employmentType: "Full-time",
        description:
          "Designing features and owning the design system for Turkey's leading service banking app. Rebuilt the color foundation and shipped dark mode via a two-tier token system.",
        skills: ["Product Design", "Design Systems", "Figma", "Dark Mode"],
      },
      {
        id: "getir-senior",
        title: "Senior Product Designer",
        employmentPeriod: "2022 — 2024",
        employmentType: "Full-time",
        description:
          "Led product design for fintech features including BNPL, virtual cards, and spending insights. Owned design system components and collaborated closely with engineering teams.",
        skills: ["Fintech", "iOS & Android", "Design Systems", "Figma"],
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
        employmentPeriod: "2024 — 2025",
        employmentType: "Full-time",
        description:
          "End-to-end product design for a US health-insurance platform. Shaped the design system, product UX across agent tools and internal ops, and brand identity. Took product from zero to launch. Integrated generative AI to augment core enrollment workflows.",
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
];
