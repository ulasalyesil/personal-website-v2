"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import picture from "@/public/images/picture.jpeg";
import Button from "@/components/ui/Button";
import TimeZoneCard from "@/components/TimeZoneCard";

const ProfileImage = () => (
  <div className="size-48 rounded-md overflow-hidden">
    <Image
      src={picture}
      alt="Ulaş"
      className="size-full object-cover"
      width={192}
      height={192}
    />
  </div>
);

type HoverKey = "Ulaş" | "Berlin" | "Istanbul";

interface HoverContentItem {
  component: React.ComponentType;
  link: string;
}

const hoverContent: Record<HoverKey, HoverContentItem> = {
  Ulaş: {
    component: ProfileImage,
    link: "https://www.linkedin.com/in/ulasalyesil",
  },
  Berlin: {
    component: () => <TimeZoneCard city="berlin" />,
    link: "https://en.wikipedia.org/wiki/Berlin",
  },
  Istanbul: {
    component: () => <TimeZoneCard city="istanbul" />,
    link: "https://en.wikipedia.org/wiki/Istanbul",
  },
};

interface HoverableWordProps {
  word: string;
  contentType: HoverKey;
  onHover: (key: HoverKey) => void;
  onLeave: () => void;
  link: string;
}

const HoverableWord = ({ word, contentType, onHover, onLeave, link }: HoverableWordProps) => (
  <Link
    href={link}
    target="_blank"
    className="relative inline-block group"
    onMouseEnter={() => onHover(contentType)}
    onMouseLeave={onLeave}
  >
    <span className="absolute inset-0 bg-brand rounded-md scale-x-110 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
    <span className="relative z-10">{word}</span>
  </Link>
);

const paragraphs = [
  "Hey, I'm Ulaş — a designer working across product, visual systems, and interactive experiences. I split my time between Berlin and Istanbul, collaborating on early-stage products and self-initiated creative work.",
  "Most recently, I was the founding designer at a health tech startup in the US, where I helped take the product from zero to launch — shaping the design system, product UX, and brand identity. Now, I'm freelancing while rebuilding my portfolio and exploring new full-time opportunities.",
  "I'm interested in the overlap between design, code, and culture. Outside of product work, I produce music, experiment with generative visuals, and build interactive prototypes — often as a way to think through emotion, structure, and rhythm.",
  "I care about clarity, intention, and craft — and I'm drawn to ideas that challenge conventional patterns. Whether it's a tool, a system, or a story, I try to build things that feel both thoughtful and alive.",
];

function processText(
  text: string,
  onWordHover: (key: HoverKey) => void,
  onWordLeave: () => void
): React.ReactNode[] {
  const words = Object.keys(hoverContent) as HoverKey[];
  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const matchedWord = words.find(
      (word) => part.toLowerCase() === word.toLowerCase(),
    );

    if (matchedWord) {
      return (
        <HoverableWord
          key={index}
          word={part}
          contentType={matchedWord}
          link={hoverContent[matchedWord].link}
          onHover={onWordHover}
          onLeave={onWordLeave}
        />
      );
    }
    return part;
  });
}

export default function About() {
  const [activeContentType, setActiveContentType] = useState<HoverKey | null>(null);

  const handleWordHover = (contentType: HoverKey) => setActiveContentType(contentType);
  const handleWordLeave = () => setActiveContentType(null);

  const ContentComponent =
    activeContentType && hoverContent[activeContentType]
      ? hoverContent[activeContentType].component
      : null;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center my-6">
        <h2 className="text-text-secondary text-xl font-mono">about me</h2>
        <Button
          label="See Resume"
          target="_blank"
          type="secondary"
          href="https://drive.google.com/file/d/1e-gnjC4ZW6X3jsW_MZ45JaVRhC7rUONy/view?usp=sharing"
        />
      </div>

      <div className="relative">
        {paragraphs.map((text, index) => (
          <p
            key={index}
            className="text-text-primary text-2xl md:text-3xl text-pretty"
          >
            {processText(text, handleWordHover, handleWordLeave)}
          </p>
        ))}

        {ContentComponent && (
          <div className="absolute pointer-events-none z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-150">
            <ContentComponent />
          </div>
        )}
      </div>
    </div>
  );
}
