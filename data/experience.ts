import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
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
    id: "getir-finans",
    companyName: "Getir Finans",
    positions: [
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
    id: "freelance",
    companyName: "Freelance",
    isCurrentEmployer: true,
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
