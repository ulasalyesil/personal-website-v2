"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import Image from "next/image";
import dynamic from "next/dynamic";

import picture from "@/public/images/picture.jpeg";
import Button from "@/components/ui/Button";
import WorkExperience from "@/components/WorkExperience";
import { experience } from "@/data/experience";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

// TimeZoneCard pulls in luxon, and it only ever renders when the reader hovers
// "Berlin" or "Istanbul". Statically imported it put luxon on the initial
// /about bundle for a card most visitors never open. Deferring it keeps luxon,
// and with it the timezone correctness plans/README chose not to trade away.
const TimeZoneCard = dynamic(() => import("@/components/TimeZoneCard"), {
  ssr: false,
  loading: () => <div className="w-contain h-32" aria-hidden="true" />,
});

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

/** A compact preview for terms whose payoff is the destination, not an image. */
const LinkPeek = ({
  title,
  note,
  host,
}: {
  title: string;
  note: string;
  host: string;
}) => (
  <div className="w-64 rounded-xl border border-border-default bg-surface-1 p-4 shadow-lg">
    <div className="text-sm font-medium text-text-primary">{title}</div>
    <p className="mt-1 text-xs leading-relaxed text-text-secondary">{note}</p>
    <div className="mt-2.5 font-mono text-[11px] text-text-tertiary">
      {host}
    </div>
  </div>
);

type HoverKey =
  | "Ulaş"
  | "Berlin"
  | "Istanbul"
  | "getirfinans"
  | "design system"
  | "AI assistant"
  | "music"
  | "generative visuals"
  | "interactive prototypes";

type Tint = "amber" | "blue" | "green" | "violet" | "none";

interface HoverContentItem {
  component: React.ComponentType;
  link: string;
  /** Marked terms are discoverable without hovering. Names stay unmarked:
   *  they read as names, and a highlighted name looks like a mistake. */
  tint: Tint;
}

const hoverContent: Record<HoverKey, HoverContentItem> = {
  Ulaş: {
    component: ProfileImage,
    link: "https://www.linkedin.com/in/ulasalyesil",
    tint: "none",
  },
  Berlin: {
    component: () => <TimeZoneCard city="berlin" />,
    link: "https://en.wikipedia.org/wiki/Berlin",
    tint: "none",
  },
  Istanbul: {
    component: () => <TimeZoneCard city="istanbul" />,
    link: "https://en.wikipedia.org/wiki/Istanbul",
    tint: "none",
  },
  getirfinans: {
    component: () => (
      <LinkPeek
        title="getirfinans"
        note="Turkey's leading service banking app, and the product every system decision below had to survive."
        host="getirfinans.com"
      />
    ),
    link: "https://www.getirfinans.com",
    tint: "violet",
  },
  "design system": {
    component: () => (
      <LinkPeek
        title="The design system"
        note="A two-tier token architecture rebuilt underneath a live product, across web, iOS and Android."
        host="Case study"
      />
    ),
    link: "/getirfinans-design-system",
    tint: "amber",
  },
  "AI assistant": {
    component: () => (
      <LinkPeek
        title="The AI assistant"
        note="Designed in Figma, then built in SwiftUI, because the arguments worth having need something running."
        host="Case study"
      />
    ),
    link: "/getirfinans-ai",
    tint: "blue",
  },
  music: {
    component: () => (
      <LinkPeek title="Locura" note="Released 2020." host="music.apple.com" />
    ),
    link: "https://music.apple.com/tr/album/locura/1523904240?i=1523904488",
    tint: "green",
  },
  "generative visuals": {
    component: () => (
      <LinkPeek
        title="isthisevendesign_ua"
        note="Visual experiments, mostly TouchDesigner, mostly unfinished on purpose."
        host="instagram.com"
      />
    ),
    link: "https://www.instagram.com/isthisevendesign_ua/",
    tint: "violet",
  },
  "interactive prototypes": {
    component: () => (
      <LinkPeek
        title="Lab"
        note="Small things built to answer a question that a static frame could not."
        host="/lab"
      />
    ),
    link: "/lab",
    tint: "amber",
  },
};

const TINT: Record<Tint, string> = {
  amber: "bg-mark-amber",
  blue: "bg-mark-blue",
  green: "bg-mark-green",
  violet: "bg-mark-violet",
  none: "",
};

interface HoverableWordProps {
  word: string;
  contentType: HoverKey;
  onHover: (key: HoverKey) => void;
  onLeave: () => void;
  onPeek: (key: HoverKey) => void;
  peekedKey: HoverKey | null;
  link: string;
  tint: Tint;
}

const HoverableWord = ({
  word,
  contentType,
  onHover,
  onLeave,
  onPeek,
  peekedKey,
  link,
  tint,
}: HoverableWordProps) => (
  <Link
    href={link}
    target={link.startsWith("http") ? "_blank" : undefined}
    rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
    data-hover-word
    className="relative inline-block group"
    onMouseEnter={() => onHover(contentType)}
    onMouseLeave={onLeave}
    onFocus={() => onHover(contentType)}
    onBlur={onLeave}
    onClick={(e) => {
      // Touch (hover-none) devices: first tap peeks, second tap follows the
      // link. Mouse users hover first, so click-through stays native.
      if (
        window.matchMedia("(hover: none)").matches &&
        peekedKey !== contentType
      ) {
        e.preventDefault();
        onHover(contentType);
        onPeek(contentType);
      }
    }}
  >
    {/* The resting mark: visible, so the term reads as something to try. */}
    <span
      className={cn(
        "absolute inset-0 scale-x-105 rounded-md transition-opacity duration-150",
        TINT[tint],
        tint !== "none" && "group-hover:opacity-0 group-focus-visible:opacity-0"
      )}
    />
    {/* The hover mark, in brand. */}
    <span className="absolute inset-0 scale-x-110 rounded-md bg-brand opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
    <span className="relative z-10">{word}</span>
  </Link>
);

const paragraphs = [
  "I’m a product designer in Istanbul, open to remote work and relocation. I work with product and engineering teams to turn complex financial journeys into clear, testable interfaces.",
  "At getirfinans, I design banking and AI experiences and lead design-system work. The current migration paired a semantic color foundation with the core development team, so dark mode could ship across the app ahead of its standalone release.",
  "My process moves between product decisions and working prototypes. I use Figma to make the system legible, then SwiftUI or React to test the states that a static frame cannot explain.",
  "Outside product work, I make music and generative visuals. The same attention to pacing, clarity, and feedback carries into the interfaces I ship.",
];

function processText(
  text: string,
  onWordHover: (key: HoverKey) => void,
  onWordLeave: () => void,
  onWordPeek: (key: HoverKey) => void,
  peekedKey: HoverKey | null
): React.ReactNode[] {
  const words = (Object.keys(hoverContent) as HoverKey[]).sort(
    (a, b) => b.length - a.length
  );
  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const matchedWord = words.find(
      (word) => part.toLowerCase() === word.toLowerCase()
    );

    if (matchedWord) {
      return (
        <HoverableWord
          key={index}
          word={part}
          contentType={matchedWord}
          link={hoverContent[matchedWord].link}
          tint={hoverContent[matchedWord].tint}
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
  const [activeContentType, setActiveContentType] = useState<HoverKey | null>(
    null
  );
  const [peeked, setPeeked] = useState<HoverKey | null>(null);

  const handleWordHover = (contentType: HoverKey) =>
    setActiveContentType(contentType);
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
          <h1 className="text-text-secondary text-xl font-mono text-balance">About</h1>
          <Button
            label="See Resume"
            target="_blank"
            type="secondary"
            href="/ulas-alyesil-resume.pdf"
          />
        </div>
      </AnimateItem>

      <AnimateItem index={1}>
        <div className="relative">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className="text-text-primary text-2xl md:text-3xl text-pretty"
            >
              {processText(
                text,
                handleWordHover,
                handleWordLeave,
                handleWordPeek,
                peeked
              )}
            </p>
          ))}

          {ContentComponent && (
            <div className="absolute pointer-events-none z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-150">
              <ContentComponent />
            </div>
          )}
        </div>
      </AnimateItem>

      <AnimateItem index={2}>
        <WorkExperience items={experience} />
      </AnimateItem>
    </AnimateIn>
  );
}
