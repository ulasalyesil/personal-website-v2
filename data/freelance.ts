import type { StaticImageData } from "next/image";
import gfAiCover from "@/public/images/getirfinans-ai/cover-device.webp";
import fsiWeb from "@/public/images/fsi/fsi_web.webp";
import consiligiereWordmarks from "@/public/images/consiligiere/wordmarks.webp";

export type FreelancePreview = {
  title: string;
  note: string;
  href: string;
  image: StaticImageData;
};

export type FreelanceService = {
  name: string;
  line: string;
  /** One project that proves the service. Live visuals has none yet. */
  preview?: FreelancePreview;
};

/**
 * Freelance is a service, not a role, so it sits outside the experience
 * list. Copy source: vault `content/pages/freelance.md`.
 */
export const FREELANCE = {
  status: "Open for projects",
  since: "2023",
  lead: "Alongside the day job, I take on a few projects at a time, for studios and early-stage teams.",
  services: [
    {
      name: "Product design",
      line: "Flows, interfaces and prototypes that behave like the real thing.",
      preview: {
        title: "GetirFinans AI",
        note: "Designed in Figma, then built in SwiftUI, because the arguments worth having need something running.",
        href: "/getirfinans-ai",
        image: gfAiCover,
      },
    },
    {
      name: "Websites",
      line: "Designed and built in Next.js or Framer, shipped to production.",
      preview: {
        title: "Full Spectrum Insights",
        note: "Web design and Framer development for an AI-focused consultancy.",
        href: "/full-spectrum-insights",
        image: fsiWeb,
      },
    },
    {
      name: "Brand identity",
      line: "Visual language, type and marks for teams starting out.",
      preview: {
        title: "Consiligiere",
        note: "Visual direction for a marketplace of verified professionals: wordmark, type and palette.",
        href: "/consiligiere",
        image: consiligiereWordmarks,
      },
    },
    {
      name: "Live visuals",
      line: "Generative visuals for concerts and LED stages.",
    },
  ] satisfies FreelanceService[],
  clients: ["Good Afternoon Creative", "Full Spectrum Insights"],
  subject: "Freelance project",
};
