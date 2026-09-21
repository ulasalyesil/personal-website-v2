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
  title: "Rebuilding GetirFinans's design system around intent",
  date: "November 2025 — Present",
  company: "GetirFinans",
  role: "Product Design, Design Systems",
  team: "The core development team, iOS and Android",
  platforms: "iOS and Android, plus a documentation site",
  status: "Dark mode shipped; spacing, radius and size published; type still open",
} as const;

export const contentBlocks: ContentBlock[] = [
  {
    type: "lead",
    text: "GetirFinans needed dark mode across the whole app. Its colors were named after how they looked, which said nothing about what each one should become in the dark. I rebuilt the color foundation around what each color is for, wrote the documentation, and worked with the developers until it shipped. Then the same approach went into spacing, into components, and into the checks that keep Figma and the code in step.",
  },
  {
    type: "figure",
    src: darkModeCapture,
    alt: "GetirFinans account screens in light and dark mode, shown side by side.",
    caption: "The same account and credit card screens, light and dark.",
    width: "wide",
    radius: "screen",
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
    id: "beyond-color",
    kicker: "Beyond color",
    title: "Spacing had to be supplied, not synced",
    blocks: [
      {
        type: "text",
        text: "Production had four radii, two border widths and one spacing value. Everything else was a number typed inline. There was no ladder to reconcile with, so the spacing, radius and size tokens we published are the first the product has had.",
      },
      {
        type: "text",
        text: "Each one is scoped to the properties it may bind to. A gap token only appears where Figma offers a gap, a radius token only on corners. The primitives underneath stay unpublished, so a designer can reach a role but never a raw number.",
      },
    ],
  },
  {
    type: "section",
    id: "components",
    kicker: "Components",
    title: "A component is a contract",
    blocks: [
      {
        type: "text",
        text: "Feature Area promotes features people already have but haven't found. It is three components: an illustration, a content block, and the master that composes them. The content block only exposes valid combinations, three entries at most with the active one inside the range, so a designer cannot build a state the app cannot show.",
      },
      {
        type: "text",
        text: "Its motion never lived in Figma. I measured the reference recording frame by frame, marked every value as measured or chosen, and checked it against a SwiftUI prototype before engineering picked it up. It corrected a transition the app had shipped wrong.",
      },
      {
        type: "list",
        lead: "Two rules came out of the component work:",
        items: [
          "Fix it at the source. The page indicator only worked on purple, so designers repainted it screen by screen. It now has a color variant for purple, gray and light surfaces, driven by tokens.",
          "Extend, never detach. When a kit component needs content it doesn't expose, use its slots and swap its hidden instances. A detached copy stops receiving the kit's updates, once for every place it was pasted.",
        ],
      },
    ],
  },
  {
    type: "section",
    id: "governance",
    kicker: "Governance",
    title: "Measure the drift before arguing about it",
    blocks: [
      {
        type: "text",
        text: "I read the production iOS component package against the Figma library: 165 components and 252 color sets. All 102 color primitives matched exactly, and 126 of 134 semantics. That made the call simple. Production is the record, and the eight differences became a list with one decision each, not a rewrite.",
      },
      {
        type: "text",
        text: "The same habit went into the library. A script walked every component through the Figma Plugin API and counted bindings that skipped the semantic layer: 3,177, most of them color. The button sets went first, 288 bindings rebound with no visual change.",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Design decision",
        text: "Count the drift before deciding what to do about it. A number turns a standing argument into a list of choices.",
      },
    ],
  },
  {
    type: "section",
    id: "reflection",
    kicker: "What remains",
    title: "Type is still forked",
    blocks: [
      {
        type: "text",
        text: "Production's type ladder and ours share four sizes. Adopting production's would regress every screen already drawn against ours; keeping ours needs someone on the engineering side to own the migration. That call is still open.",
      },
      {
        type: "text",
        text: "So is the icon rebuild: 447 icons audited and a naming convention written, not yet applied.",
      },
    ],
  },
];
