"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import picture from "@/public/images/picture.jpeg";
import Button from "@/components/ui/Button";
import TimeZoneCard from "@/components/TimeZoneCard";
import WorkExperience from "@/components/WorkExperience";
import { experience } from "@/data/experience";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

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
  onPeek: (key: HoverKey) => void;
  peekedKey: HoverKey | null;
  link: string;
}

const HoverableWord = ({
  word,
  contentType,
  onHover,
  onLeave,
  onPeek,
  peekedKey,
  link,
}: HoverableWordProps) => (
  <Link
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    data-hover-word
    className="relative inline-block group"
    onMouseEnter={() => onHover(contentType)}
    onMouseLeave={onLeave}
    onFocus={() => onHover(contentType)}
    onBlur={onLeave}
    onClick={(e) => {
      // Touch (hover-none) devices: first tap peeks, second tap follows the
      // link. Mouse users hover first, so click-through stays native.
      if (window.matchMedia("(hover: none)").matches && peekedKey !== contentType) {
        e.preventDefault();
        onHover(contentType);
        onPeek(contentType);
      }
    }}
  >
    <span className="absolute inset-0 bg-brand rounded-md scale-x-110 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150" />
    <span className="relative z-10">{word}</span>
  </Link>
);

const paragraphs = [
  "Hey, I'm Ulaş, a designer working across product, visual systems, and interactive experiences. I split my time between Berlin and Istanbul, working on product design and self-initiated creative work.",
  "Currently at getirfinans, designing features and owning the design system for Turkey's leading service banking app.",
  "I'm interested in the overlap between design, code, and culture. Outside of product work, I produce music, experiment with generative visuals, and build interactive prototypes — often as a way to think through emotion, structure, and rhythm.",
  "I care about clarity, intention, and craft — and I'm drawn to ideas that challenge conventional patterns. Whether it's a tool, a system, or a story, I try to build things that feel both thoughtful and alive.",
];

function processText(
  text: string,
  onWordHover: (key: HoverKey) => void,
  onWordLeave: () => void,
  onWordPeek: (key: HoverKey) => void,
  peekedKey: HoverKey | null
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
          onPeek={onWordPeek}
          peekedKey={peekedKey}
        />
      );
    }
    return part;
  });
}

export default function About() {
  const [activeContentType, setActiveContentType] = useState<HoverKey | null>(null);
  const [peeked, setPeeked] = useState<HoverKey | null>(null);

  const handleWordHover = (contentType: HoverKey) => setActiveContentType(contentType);
  const handleWordLeave = () => setActiveContentType(null);
  const handleWordPeek = (contentType: HoverKey) => setPeeked(contentType);

  // While a word is peeked (touch), tapping anywhere outside a hover word
  // dismisses the card and resets the peek.
  useEffect(() => {
    if (peeked == null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target as Element | null)?.closest?.("[data-hover-word]")) {
        setPeeked(null);
        setActiveContentType(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [peeked]);

  const ContentComponent =
    activeContentType && hoverContent[activeContentType]
      ? hoverContent[activeContentType].component
      : null;

  return (
    <AnimateIn className="w-full">
      <AnimateItem>
        <div className="flex justify-between items-center my-6">
          <h2 className="text-text-secondary text-xl font-mono">about me</h2>
          <Button
            label="See Resume"
            target="_blank"
            type="secondary"
            href="https://drive.google.com/file/d/1e-gnjC4ZW6X3jsW_MZ45JaVRhC7rUONy/view?usp=sharing"
          />
        </div>
      </AnimateItem>

      <AnimateItem>
        <div className="relative">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className="text-text-primary text-2xl md:text-3xl text-pretty"
            >
              {processText(text, handleWordHover, handleWordLeave, handleWordPeek, peeked)}
            </p>
          ))}

          {ContentComponent && (
            <div className="absolute pointer-events-none z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-150">
              <ContentComponent />
            </div>
          )}
        </div>
      </AnimateItem>

      {/* <AnimateItem>
        <WorkExperience items={experience} />
      </AnimateItem> */}
    </AnimateIn>
  );
}
