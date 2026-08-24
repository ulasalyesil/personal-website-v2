import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Gallery, { type Item } from "./Gallery";

export const metadata: Metadata = {
  title: "GetirFinans AI — Ulaş Alyeşil",
  description:
    "AI surfaces for a live banking app: the assistant, its composer, and search. Designed in Figma, built in SwiftUI, captured off the running prototype.",
  openGraph: {
    title: "GetirFinans AI — Ulaş Alyeşil",
    description: "AI surfaces for a live banking app, designed and then built in SwiftUI.",
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
    title: "Entry",
    caption:
      "The assistant opens from wherever you already are, here the deposit calculator, so it arrives as a continuation rather than a destination. The greeting and its four prompts resolve together instead of sliding in one at a time, and the mic sits inside the composer rather than beside it, so dictation and typing share one field.",
    meta: "getirfinans 2.55, dark mode",
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
    title: "Thinking, then answering",
    caption:
      "The thinking label fades out and the answer's first line fades up on the same baseline, 33ms later. Nothing moves, so the transition disappears. Tapping a card sends its follow-up immediately: the tap was already the decision.",
    meta: "Measured off the approved animation, rebuilt to ±1.8ms",
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
    title: "Listening",
    caption:
      "The pill itself becomes the listening surface, so transcription lands in the field it will send from. Stop turns into send the moment you actually speak, making it one tap instead of two.",
    meta: "AIChat · tr-TR speech recognition",
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
    title: "The edge of the field",
    caption:
      "It grows to five lines, then stops at 200 grapheme clusters rather than 200 characters, so an emoji costs one. Overflow shakes 5pt through three decaying cycles and fires a warning haptic.",
    meta: "AIChat · SwiftUI",
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
    title: "Answering inside search",
    caption:
      "A question that search cannot match against a product still gets answered, in place, without a handoff. The route into the assistant sits under the answer rather than instead of it: you only need the conversation if the answer did not finish the job.",
    meta: "getirfinans 2.55, dark mode",
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
    title: "Prompts where the results are",
    caption:
      "Typing a topic surfaces the assistant's prompts inline among the results, not above them and not as a separate mode. Every prompt is a question this topic actually raises, so the row reads as part of the result set rather than as an advertisement for a feature.",
    meta: "getirfinans 2.55, dark mode",
  },
];

export default function GetirFinansAICase() {
  return (
    <CaseStudyLayout
      slug="getirfinans-ai"
      title="GetirFinans AI"
      date="2026 — Present"
      company="GetirFinans"
      role="Product Design, Prototyping"
      status="Ongoing"
      customComponents={{ gallery: <Gallery items={ITEMS} /> }}
      contentBlocks={[
        {
          type: "text",
          text: "AI surfaces for a banking app used by millions: the assistant, the composer it is typed into, and what happens when a question arrives in search instead of a chat.",
        },
        {
          type: "text",
          text: "Designed in Figma, then built in SwiftUI, because the questions worth arguing about here are ones a static frame cannot answer. Everything below is a recording of something running: the prototype where it is still a prototype, the shipped app where it shipped.",
        },
        { type: "custom", id: "gallery" },
        {
          type: "text",
          text: "Fifteen prototypes now live in the catalog the team installs over TestFlight. The frame is the proposal; the running thing is the evidence.",
        },
      ]}
    />
  );
}
