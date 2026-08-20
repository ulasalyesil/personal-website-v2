import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Gallery from "./Gallery";

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

const ITEMS = [
  {
    captures: [
      {
        video: `${V}/ai-chat-entrance.mp4`,
        poster: `${I}/ai-chat-entrance.webp`,
        alt: "The assistant screen appearing",
      },
    ],
    title: "Entry",
    caption:
      "The greeting and its prompts resolve together rather than sliding in, and the mic sits inside the composer rather than beside it, so dictation and typing share one field.",
    meta: "AIChat · SwiftUI",
  },
  {
    captures: [
      {
        video: `${V}/assistant-answer.mp4`,
        poster: `${I}/assistant-answer.webp`,
        alt: "A thinking state handing over to a streamed answer with campaign cards",
      },
    ],
    title: "Thinking, then answering",
    caption:
      "The thinking label fades out and the answer's first line fades up on the same baseline, 33ms later. Nothing moves, so the transition disappears. Tapping a card sends its follow-up immediately: the tap was already the decision.",
    meta: "GFDES-2054 · GFDES-2207 · measured off the approved animation, rebuilt to ±1.8ms",
  },
  {
    captures: [
      {
        video: `${V}/voice-listening.mp4`,
        poster: `${I}/voice-listening.webp`,
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
        video: `${V}/ai-search-semantic.mp4`,
        poster: `${I}/ai-search-semantic.webp`,
        alt: "A semantic question answered with no suggestion row",
      },
      {
        video: `${V}/ai-search-destination.mp4`,
        poster: `${I}/ai-search-destination.webp`,
        alt: "A question that resolves to a destination, with a suggestion row beneath the answer",
      },
    ],
    title: "Two questions, one row apart",
    caption:
      "Left asks how something works and gets no suggestion row, because it has nowhere to go. Right names a destination and gets one. Where money moves, a loosely related guess is worse than nothing.",
    meta: "GFDES-2171 · AISearch · SwiftUI",
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
          text: "Designed in Figma, then built in SwiftUI, because the questions worth arguing about here are ones a static frame cannot answer. Everything below is a recording of the running prototype.",
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
