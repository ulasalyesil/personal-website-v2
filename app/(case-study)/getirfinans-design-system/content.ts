import type { ContentBlock } from "@/types";
import darkModeCapture from "@/public/images/lab/dark-mode.webp";
import tokenNaming from "@/public/images/getirfinans-design-system/docs-token-naming.webp";
import buttonModes from "@/public/images/getirfinans-design-system/button-light-dark.webp";
import checkboxModes from "@/public/images/getirfinans-design-system/checkbox-light-dark.webp";
import findeksModes from "@/public/images/getirfinans-design-system/findeks-light-dark.webp";
import appointmentModes from "@/public/images/getirfinans-design-system/appointment-light-dark.webp";
import assetBreakdownModes from "@/public/images/getirfinans-design-system/asset-breakdown-light-dark.webp";

export const meta = {
  slug: "getirfinans-design-system",
  title: "Shipping app-wide dark mode at GetirFinans",
  date: "November 2025 — Present",
  company: "GetirFinans",
  role: "Product Design, Design Systems",
  team: "The core development team, iOS and Android",
  platforms: "iOS and Android, plus a documentation site",
  status: "Dark mode shipped, the rest still in progress",
} as const;

export const contentBlocks: ContentBlock[] = [
  {
    type: "lead",
    text: "GetirFinans needed dark mode across the whole app. Its colors were named after how they looked, which said nothing about what each one should become in the dark. I rebuilt the color foundation around what each color is for, wrote the documentation, and worked with the developers until it shipped.",
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
        type: "figure",
        src: findeksModes,
        alt: "The Findeks reports screen in light mode on the left and dark mode on the right, with a credit score gauge and a row of past reports.",
        caption: "Findeks reports, light and dark.",
        width: "wide",
      },
      {
        type: "figure",
        src: appointmentModes,
        alt: "An appointment confirmation screen in light mode on the left and dark mode on the right, with a yellow date pill under the message.",
        caption:
          "An appointment confirmation. The yellow date pill is the same in both modes.",
        width: "wide",
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
        type: "figure",
        src: buttonModes,
        alt: "Production buttons in light mode on the left and dark mode on the right: a filled purple primary button, an outlined secondary button, and a disabled primary button.",
        caption:
          "Buttons from the production component library, light and dark. The primary purple stays. The outline and the disabled state change.",
        width: "wide",
      },
      {
        type: "figure",
        src: checkboxModes,
        alt: "Production checkboxes in light mode on the left and dark mode on the right, in four states: unchecked, checked, checked and disabled, unchecked and disabled.",
        caption:
          "Checkboxes from the same library, in four states. The checked purple gets lighter in dark mode.",
        width: "wide",
      },
      {
        type: "text",
        text: "In light mode the primary button and the checked box use the same purple. They are different roles, so dark mode treats them differently.",
      },
      {
        type: "text",
        text: "That purple appears in 23 tokens. In dark mode they resolve to six different values, and only five keep the purple. All six yellow tokens hold, and so does every shadow. Keeping a value is a decision too.",
      },
      {
        type: "figure",
        src: assetBreakdownModes,
        alt: "An asset breakdown sheet with a ring chart, in light mode on the left and dark mode on the right. The purple TL segment is lighter in dark mode, the yellow USD segment is unchanged.",
        caption:
          "The asset breakdown sheet. The TL slice takes the lighter purple in dark mode. The USD yellow does not change.",
        width: "wide",
      },
      {
        type: "custom",
        id: "token-values",
        caption:
          "Every color token in the shipped app, read from the production color catalog. Outlined swatches keep one value in both modes.",
        width: "wide",
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
        type: "list",
        lead: "Every token name has three parts:",
        items: [
          "Category: the property that changes, such as background or text.",
          "Concept: where that property is used, such as a surface or an action.",
          "Role: its place in the hierarchy, so a team can agree on intent before picking a value.",
        ],
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
        text: "Naming, documentation and implementation moved together, and dark mode shipped with all three in place.",
      },
    ],
  },
];
