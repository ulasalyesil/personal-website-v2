import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Gallery, { Screen, type Item } from "./Gallery";

export const metadata: Metadata = {
  title: "GetirFinans AI — Ulaş Alyeşil",
  description:
    "Designing answers and useful next actions in a fintech app, across shipped iOS captures and SwiftUI prototypes.",
  openGraph: {
    title: "GetirFinans AI — Ulaş Alyeşil",
    description: "Product decisions for answers, next actions, and recovery in a fintech app.",
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
    title: "Thinking and answering",
    caption:
      "The recording shows the assistant thinking, then presenting a streamed answer with campaign cards. The treatment is still being evaluated as the wider conversation experience develops.",
    meta: "SwiftUI prototype · July 2026",
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
    title: "Prompts alongside search results",
    caption:
      "Typing a topic surfaces related questions inline among search results, rather than moving people into a separate mode.",
    meta: "Shipped iOS capture · GetirFinans 2.55 · dark mode",
  },
];

export default function GetirFinansAICase() {
  return (
    <CaseStudyLayout
      slug="getirfinans-ai"
      title="Designing answers and next actions in a fintech app"
      date="2026 — Present"
      company="GetirFinans"
      role="Product Design, Prototyping"
      team="Product and iOS engineering"
      platforms="iOS"
      status="Assistant streaming shipped · related work under evaluation"
      summary="Suggested prompts account for 31% of assistant messages. The share of closes before a question fell from 46.6% in June to 34.0% in September."
      visualLead={
        // The blueprint film: one screen, five decisions drawn as guides and
        // dimensions, rebuilt from the SwiftUI prototype code rather than
        // recorded. It carries the cover's transition name so the home card
        // still morphs into it.
        <figure>
          <Screen
            capture={{
              video: `${V}/blueprint.mp4`,
              poster: `${I}/blueprint-poster.jpg`,
              alt: "Blueprint film of the assistant screen: the composer as the listening surface, the 200-character cap, routing on curated nouns, the thinking-to-answer handoff, and the measured stream timing.",
              frame: "detail",
              w: 1920,
              h: 1080,
            }}
            priority
            viewTransitionName="project-getirfinans-ai-cover"
          />
          <figcaption className="px-4 py-3 text-caption text-text-tertiary">
            Five decisions on one screen, rebuilt from the prototype code.
            Blueprint format after{" "}
            <a href="https://github.com/moguzbulbul/blueprint-animation" className="underline underline-offset-2">
              Oğuz
            </a>
            .
          </figcaption>
        </figure>
      }
      customComponents={{
        searchGallery: <Gallery items={ITEMS.slice(4, 6)} withTransition={false} />,
        openingGallery: <Gallery items={ITEMS.slice(0, 1)} withTransition={false} />,
        thinkingGallery: <Gallery items={ITEMS.slice(1, 2)} withTransition={false} />,
        composerGallery: <Gallery items={ITEMS.slice(2, 4)} withTransition={false} />,
      }}
      contentBlocks={[
        {
          type: "text",
          text: "This work focused on the assistant, its composer, and what happens when a question arrives in search rather than a chat.",
        },
        {
          type: "section",
          id: "opening",
          kicker: "Opening context",
          title: "Continue from the task at hand",
          blocks: [
            {
              type: "text",
              text: "The assistant opens from the deposit calculator, so it continues a task rather than becoming a separate destination. The composer holds typing and dictation together in one place.",
            },
            { type: "custom", id: "openingGallery" },
          ],
        },
        {
          type: "section",
          id: "next-action",
          kicker: "Decision one",
          title: "When should an answer offer a next action?",
          blocks: [
            {
              type: "text",
              text: "A whole-string search match returned no result for some questions; matching individual words could suggest the wrong destination. “How do I pay my credit-card debt?” matched “kredi” into “kart” and suggested linking or unlinking an account to a card instead of paying card debt. The prototype moved to curated destination matching, with no route when an explanatory answer has no useful next step.",
            },
            {
              type: "callout",
              variant: "note",
              label: "Prototype validation",
              text: "Eleven queries were checked against the prototype code to validate the routing rule.",
            },
            { type: "custom", id: "searchGallery" },
          ],
        },
        {
          type: "section",
          id: "handoff",
          kicker: "Interaction study",
          title: "Thinking and answering",
          blocks: [
            {
              type: "text",
              text: "The assistant has distinct thinking and answering states. This recording captures the transition into a streamed answer and the campaign cards that follow it.",
            },
            { type: "custom", id: "thinkingGallery" },
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
              text: "Dictation and typing share a composer, so a person does not have to learn a second place to compose. At the input boundary, the field preserves the draft and gives a local response.",
            },
            {
              type: "text",
              text: "Mic use doubled in the two months after launch, from 1.4% to 2.9% of chat users, and about 4% of chat opens tap it.",
            },
            { type: "custom", id: "composerGallery" },
          ],
        },
        {
          type: "section",
          id: "next",
          kicker: "Delivery and next evidence",
          title: "What shipped, and what to measure next",
          blocks: [
            {
              type: "text",
              text: "Assistant streaming is shipped. Prompt suggestions carry 31% of every message sent, steady over three months. People who close the assistant before asking anything fell from 46.6% of closes in June to 34.0% in September.",
            },
            {
              type: "text",
              text: "The same data points at the next job. As the median wait grew from 3.7 to 6.4 seconds, closes during the wait rose from 0.5% to 3.6%. That is the case for a composer that stays live while the assistant works, with a Stop in the send slot. The deposit calculator entry is the other gap: 38% of those opens send a message, against 63% overall.",
            },
            {
              type: "text",
              text: "Dictation completion and inline search routing are not instrumented yet. They are the next evidence to collect.",
            },
          ],
        },
      ]}
    />
  );
}
