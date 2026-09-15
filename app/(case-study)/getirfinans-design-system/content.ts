import type { ContentBlock } from "@/types";
import darkModeCapture from "@/public/images/lab/dark-mode.webp";
import tokenNaming from "@/public/images/getirfinans-design-system/docs-token-naming.webp";

export const meta = {
  slug: "getirfinans-design-system",
  title: "Shipping app-wide dark mode at GetirFinans",
  date: "November 2025 — Present",
  company: "GetirFinans",
  role: "Product Design, Design Systems",
  team: "The core development team, iOS and Android",
  platforms: "iOS and Android, plus a documentation site",
  websiteUrl: "https://gf-design-system.vercel.app",
  status: "Dark mode shipped, the rest still in progress",
} as const;

export const contentBlocks: ContentBlock[] = [
  {
    type: "lead",
    text: "GetirFinans needed dark mode across the whole app. Its colors were named after how they looked, so every dark screen turned into its own argument. I rebuilt the color foundation around what each color is for, wrote the documentation, and worked with the developers until it shipped.",
  },
  {
    type: "figure",
    src: darkModeCapture,
    alt: "GetirFinans account screens in light and dark mode, shown side by side.",
    caption: "The same account and credit card screens, light and dark.",
    width: "wide",
  },
  {
    type: "section",
    id: "delivery",
    kicker: "Delivery",
    title: "Dark mode had to work everywhere",
    blocks: [
      {
        type: "text",
        text: "Two months with the core development team, finished before the standalone app went out. Every screen got light and dark, not a handful of them.",
      },
      {
        type: "text",
        text: "That is the part that shipped. The rest of the system is still being built.",
      },
    ],
  },
  {
    type: "section",
    id: "decision",
    kicker: "The decision",
    title: "Name what a color is for",
    blocks: [
      {
        type: "text",
        text: "The old foundation named colors after how they looked. That is fine with one light theme. In dark mode it meant every screen became a fresh decision: which grey is this grey now?",
      },
      {
        type: "text",
        text: "So we named roles instead: surface, content, border, action. A role keeps its meaning in both modes. Only the value underneath changes.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Design decision",
        text: "A token should say why it exists. Then designers and engineers can settle the role before they argue about the hex.",
      },
      {
        type: "text",
        text: "This was slower than picking a dark twin for every color we already had. It also stopped us re-deciding the same color every time a surface moved.",
      },
    ],
  },
  {
    type: "section",
    id: "evidence",
    kicker: "Handoff",
    title: "Other people had to be able to use it",
    blocks: [
      {
        type: "figure",
        src: tokenNaming,
        alt: "The token naming convention page on the GetirFinans design-system documentation site, showing category, concept, and role guidance.",
        caption: "The naming page from the documentation site.",
        width: "prose",
      },
      {
        type: "text",
        text: "The documentation site made the model something you could read and check. I used it in working sessions with design and engineering, so tokens were reviewed in context instead of buried in a Figma file.",
      },
    ],
  },
  {
    type: "section",
    id: "reflection",
    kicker: "What remains",
    title: "Color first, the rest unproven",
    blocks: [
      {
        type: "text",
        text: "Color was the urgent layer: the release needed it, and it shows on every screen. Spacing, sizing and components need the same proof in real work before they become rules.",
      },
      {
        type: "text",
        text: "The system only held once naming, documentation and implementation moved together. Kept apart, any one of them would have stalled the release.",
      },
    ],
  },
];
