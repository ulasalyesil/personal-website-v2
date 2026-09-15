import type { ContentBlock } from "@/types";
import darkModeCapture from "@/public/images/lab/dark-mode.webp";
import tokenNaming from "@/public/images/getirfinans-design-system/docs-token-naming.webp";

export const meta = {
  slug: "getirfinans-design-system",
  title: "Shipping app-wide dark mode at GetirFinans",
  date: "November 2025 — Present",
  company: "GetirFinans",
  role: "Product Design, Design Systems",
  team: "Partnered with the core development team and iOS/Android engineers",
  platforms: "iOS and Android, with a documentation site",
  websiteUrl: "https://gf-design-system.vercel.app",
  status: "Dark mode shipped · system in active development",
} as const;

export const contentBlocks: ContentBlock[] = [
  {
    type: "lead",
    text: "A standalone GetirFinans app needed dark mode, but its inherited color foundation described appearance rather than purpose. I owned the product-side system work: defining semantic roles, documenting their use, and working with the core development team to make the migration practical for the release.",
  },
  {
    type: "figure",
    src: darkModeCapture,
    alt: "GetirFinans account screens in light and dark mode, shown side by side.",
    caption: "Shipped product capture: the same account and credit-card surfaces in light and dark mode.",
    width: "wide",
  },
  {
    type: "section",
    id: "delivery",
    kicker: "Delivery",
    title: "Dark mode had to work across the app",
    blocks: [
      {
        type: "text",
        text: "The work supported the standalone app release. The implementation window was two months, completed with the core development team ahead of that release. The result was an app-wide light and dark experience, rather than a set of isolated screen treatments.",
      },
      {
        type: "text",
        text: "I separate that delivery window from the longer system work. The migration is the shipped scope; adoption and further system layers remain active work.",
      },
    ],
  },
  {
    type: "section",
    id: "decision",
    kicker: "The consequential decision",
    title: "Name intent, not a color",
    blocks: [
      {
        type: "text",
        text: "The previous foundation contained color values with visual names. That was fast for a single light mode, but it made every dark-mode choice a local exception. We moved the decision into semantic roles such as surface, content, border, and action: a role keeps its meaning while its light and dark values change.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Design decision",
        text: "A token is useful when it explains why a value exists. That gave designers and engineers a shared way to discuss the role before choosing a value.",
      },
      {
        type: "text",
        text: "This was more work than supplying dark equivalents for each existing color, but it reduced the need to reinterpret a color every time a surface changed. It also made the foundation usable for the components that followed.",
      },
    ],
  },
  {
    type: "section",
    id: "evidence",
    kicker: "Evidence and handoff",
    title: "Make the system usable by other people",
    blocks: [
      {
        type: "figure",
        src: tokenNaming,
        alt: "The token naming convention page on the GetirFinans design-system documentation site, showing category, concept, and role guidance.",
        caption: "A real documentation page used to explain the naming convention and its component examples.",
        width: "prose",
      },
      {
        type: "text",
        text: "The documentation site and implementation guidance made the semantic model inspectable during handoff. I used them in working sessions with design and engineering so token references could be reviewed in context, not treated as a private Figma cleanup.",
      },
      {
        type: "text",
        text: "The interactive bottom-sheet example below is an illustration of the semantic approach. It demonstrates the behavior of the reconstructed example, not production code or a token export.",
      },
      { type: "custom", id: "bottom-sheet" },
    ],
  },
  {
    type: "section",
    id: "reflection",
    kicker: "What remains",
    title: "A foundation, not a finish line",
    blocks: [
      {
        type: "text",
        text: "Color was the urgent layer because it was required for the release and visible in every product surface. Dimensional and component layers need the same proof in real product work before they become system rules.",
      },
      {
        type: "text",
        text: "The main lesson was collaborative: the system became viable when the naming, documentation, and implementation path were considered together. Treating them as one delivery made it possible to change the foundation while keeping the release moving.",
      },
    ],
  },
];
