import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Gallery, { type Item } from "./Gallery";

export const metadata: Metadata = {
  title: "GetirFinans AI — Ulaş Alyeşil",
  description:
    "Designing answers and useful next actions in a banking app, across shipped iOS captures and SwiftUI prototypes.",
  openGraph: {
    title: "GetirFinans AI — Ulaş Alyeşil",
    description: "Product decisions for answers, next actions, and recovery in a banking app.",
    images: [{ url: "/images/getirfinans-ai/cover.webp" }],
  },
};

const V = "/video/getirfinans-ai";
const I = "/images/getirfinans-ai";

const ITEMS: Item[] = [
  {
    captures: [
      {
        video: `${V}/ai-chat-entrance.mp4`,
        poster: `${I}/ai-chat-entrance.webp`,
        alt: "The assistant opening from the deposit calculator, its greeting and prompts resolving",
        frame: "detail",
        w: 600,
        h: 590,
      },
    ],
    title: "Continue from the task at hand",
    caption:
      "The assistant opens from the deposit calculator, so it continues a task rather than becoming a separate destination. The composer holds typing and dictation together in one place.",
    meta: "Shipped iOS capture · GetirFinans 2.55 · dark mode",
  },
  {
    captures: [
      {
        video: `${V}/assistant-answer.mp4`,
        poster: `${I}/assistant-answer.webp`,
        frame: "detail",
        w: 600,
        h: 520,
        alt: "A thinking state handing over to a streamed answer with campaign cards",
      },
    ],
    title: "One handoff from waiting to reading",
    caption:
      "The selected prototype removes the thinking state before the answer begins. A sequential handoff lets one reading state end before the next starts, instead of asking people to track both at once.",
    meta: "SwiftUI prototype · approved direction, July 2026",
  },
  {
    captures: [
      {
        video: `${V}/voice-listening.mp4`,
        poster: `${I}/voice-listening.webp`,
        frame: "detail",
        w: 600,
        h: 210,
        alt: "The composer in its listening state",
      },
    ],
    title: "Keep the composer recognizable",
    caption:
      "The field becomes the listening state, preserving where a future transcription will appear. This recording shows listening, not a completed dictation result.",
    meta: "SwiftUI prototype · tr-TR speech recognition",
  },
  {
    captures: [
      {
        video: `${V}/char-limit.mp4`,
        poster: `${I}/char-limit.webp`,
        frame: "detail",
        w: 600,
        h: 290,
        alt: "The composer growing line by line, then refusing more text",
      },
    ],
    title: "Make the input limit recoverable",
    caption:
      "The field grows to five lines, then stops at 200 grapheme clusters. The boundary keeps the existing text in place and gives a local response, rather than discarding what a person has composed.",
    meta: "SwiftUI prototype · composer boundary",
  },
  {
    captures: [
      {
        video: `${V}/ai-search-answer.mp4`,
        poster: `${I}/ai-search-answer.webp`,
        alt: "A question answered inside search, with a route into the assistant beneath it",
        frame: "detail",
        w: 600,
        h: 650,
      },
    ],
    title: "Answer first, route only when useful",
    caption:
      "A question that search cannot match to a product can still receive an answer in place. The route into the assistant remains available when the answer does not finish the task.",
    meta: "Shipped iOS capture · GetirFinans 2.55 · dark mode",
  },
  {
    captures: [
      {
        video: `${V}/ai-search-suggestions.mp4`,
        poster: `${I}/ai-search-suggestions.webp`,
        alt: "Assistant prompts resolving inline among search results",
        frame: "detail",
        w: 600,
        h: 760,
      },
    ],
    title: "Only show a destination when it fits",
    caption:
      "Assistant prompts live with search results when a curated destination is relevant. The row is omitted for explanatory answers that do not have a useful destination.",
    meta: "SwiftUI prototype · search routing rule",
  },
];

export default function GetirFinansAICase() {
  return (
    <CaseStudyLayout
      slug="getirfinans-ai"
      title="Designing answers and next actions in a banking app"
      date="2026 — Present"
      company="GetirFinans"
      role="Product Design, Prototyping"
      team="Product and iOS engineering"
      platforms="Shipped iOS captures and SwiftUI prototypes"
      status="Assistant streaming shipped · related work under evaluation"
      customComponents={{ gallery: <Gallery items={ITEMS} /> }}
      contentBlocks={[
        {
          type: "text",
          text: "This work focused on the assistant, its composer, and what happens when a question arrives in search rather than a chat. Each artifact is labeled as a shipped iOS capture or a SwiftUI prototype, so the delivery stage stays clear.",
        },
        {
          type: "section",
          id: "next-action",
          kicker: "Decision one",
          title: "When should an answer offer a next action?",
          blocks: [
            {
              type: "text",
              text: "A whole-string search match returned no result for some questions; matching individual words could suggest the wrong destination. I moved to curated destination matching and omitted the suggestion row when an explanatory answer did not have a useful next step.",
            },
            {
              type: "callout",
              variant: "note",
              label: "Prototype validation",
              text: "Eleven queries were checked against the prototype code. This tested the routing rule, not whether every financial intent is safely routed or whether people prefer the suggestion.",
            },
          ],
        },
        {
          type: "section",
          id: "handoff",
          kicker: "Decision two",
          title: "How should waiting hand over to reading?",
          blocks: [
            {
              type: "text",
              text: "The rejected concurrent treatment left a thinking label and answer competing for attention. The selected sequential handoff removes the waiting state before the answer begins. The product direction was approved in July; the implementation timing is secondary to the reading decision.",
            },
          ],
        },
        {
          type: "section",
          id: "composer",
          kicker: "Decision three",
          title: "What happens when composing gets difficult?",
          blocks: [
            {
              type: "text",
              text: "Dictation and typing share a composer, so a person does not have to learn a second place to compose. At the input boundary, the field preserves the draft and gives a local response. These are interface decisions under prototype evaluation, not evidence of completion or usage outcomes.",
            },
          ],
        },
        { type: "custom", id: "gallery" },
        {
          type: "section",
          id: "next",
          kicker: "Delivery and next evidence",
          title: "What shipped, and what to measure next",
          blocks: [
            {
              type: "text",
              text: "Assistant streaming is shipped. Suggestion impressions, inline search routing, and dictation completion are not yet instrumented, so this page does not claim an outcome for them. The next useful evidence is whether people see, choose, and complete the actions these states offer.",
            },
          ],
        },
      ]}
    />
  );
}
