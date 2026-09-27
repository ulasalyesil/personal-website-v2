import type { ContentBlock } from "@/types";
import customerApp from "@/public/images/consiligiere/customer-app.webp";
import wordmarks from "@/public/images/consiligiere/wordmarks.webp";
import landingIterations from "@/public/images/consiligiere/landing-iterations.webp";
import typeSerif from "@/public/images/consiligiere/type-instrument-serif.webp";
import extendedPalette from "@/public/images/consiligiere/extended-palette.webp";
import providerProfile from "@/public/images/consiligiere/provider-profile.webp";
import serviceFilters from "@/public/images/consiligiere/service-filters.webp";
import providerMobile from "@/public/images/consiligiere/provider-dashboard-mobile.webp";
import providerWeb from "@/public/images/consiligiere/provider-dashboard-web.webp";
import landingFinal from "@/public/images/consiligiere/landing-final.webp";

export const meta = {
  slug: "consiligiere",
  title: "A marketplace for verified professionals, from brief to both sides",
  date: "December 2025 — January 2026",
  company: "Consiligiere (freelance)",
  role: "Product Design, Visual Direction",
  team: "With Eylül (eyluldeniz.com), for the founder",
  platforms: "Landing page, customer app (iOS), provider app (iOS and web)",
  status: "Investor concept, not launched",
} as const;

export const contentBlocks: ContentBlock[] = [
  {
    type: "lead",
    text: "Consiligiere connects people with verified lawyers, notaries, tax advisors, architects and surveyors, then keeps the whole job on one platform: booking, the video call, documents and payment. The founder needed the product to exist visually before an investment round. Eylül and I set the visual direction, designed the landing page, and designed both sides of the app: the customer looking for help and the professional running a practice. We worked together on every phase, from concept to execution.",
  },
  {
    type: "figure",
    src: customerApp,
    alt: "Four customer app screens: two versions of the home page, search results, and a provider profile with a date and time picker.",
    caption: "The customer app: home, search results, and a provider profile you can book from.",
    width: "wide",
  },
  {
    type: "section",
    id: "brief",
    kicker: "The brief",
    title: "A spec for a look, not a product",
    blocks: [
      {
        type: "text",
        text: "The brief came as an AI-generated PRD. It named the palette (deep navy and antique gold) and the typefaces (Cinzel and Playfair), and said “Clean Luxury”. We treated it as input, not as a spec, and tested it before building on it.",
      },
      {
        type: "figure",
        src: wordmarks,
        alt: "The Consiligiere wordmark set three ways: in Cinzel capitals, in a condensed serif above a sample heading and button, and in a geometric sans.",
        caption: "The name set in Cinzel, in a condensed serif, and in a sans.",
        width: "wide",
      },
    ],
  },
  {
    type: "section",
    id: "exploration",
    kicker: "Exploration",
    title: "More than twenty landing pages to find the product",
    blocks: [
      {
        type: "text",
        text: "The first direction moved away from the PRD on purpose: warm cream instead of white, and one earthy color per profession, so a person looking for a property valuation could look for terracotta instead of reading labels. Gradients and a lighter “super-app” version followed.",
      },
      {
        type: "figure",
        src: landingIterations,
        alt: "Four landing page concepts side by side: a cream page with one colored card per profession, an orange and blue gradient version, a light blue version with 3D renders, and the final navy version with isometric objects.",
        caption: "Four of the landing concepts, earliest on the left.",
        width: "wide",
      },
      {
        type: "text",
        text: "Then we reworked the palette around who the product is for and how it needs to be seen: a serious place for legal and financial work. That brought navy back, and the professions are now told apart by object instead of color: scales, keys, a compass, a magnifying glass.",
      },
    ],
  },
  {
    type: "section",
    id: "system",
    kicker: "The system",
    title: "Keep the authority, fix the type",
    blocks: [
      {
        type: "text",
        text: "Cinzel reads like an inscription, and its character set is limited, which breaks down in a product with long names and mixed languages. Instrument Serif keeps the editorial tone and holds up on screen. Inter Display carries everything that has to be read quickly.",
      },
      {
        type: "figure",
        src: typeSerif,
        alt: "A slide describing Instrument Serif as the display typeface, with a large specimen and its rationale.",
        caption: "The serif decision, as it went to the founder.",
        width: "wide",
      },
      {
        type: "figure",
        src: extendedPalette,
        alt: "The extended palette: six scales from light to dark for deep navy, antique gold, ivory white, silver gray, graphite gray and emerald green.",
        caption: "The PRD named three colors. A product needs scales.",
        width: "wide",
      },
    ],
  },
  {
    type: "section",
    id: "customer-app",
    kicker: "Customer app",
    title: "Book from the profile, not after it",
    blocks: [
      {
        type: "text",
        text: "A profile answers the question a person actually has, can I talk to this lawyer this week, so dates and times sit on the profile itself and the only action is Request Appointment.",
      },
      {
        type: "figure",
        src: providerProfile,
        alt: "A provider profile for a corporate law partner, with a verified badge, a short bio, a row of dates and a row of time slots above a Request Appointment button.",
        caption: "A provider profile. Booking happens on the same screen.",
        width: "wide",
      },
      {
        type: "figure",
        src: serviceFilters,
        alt: "A service page for Finance and Legal with a filter sheet: price range, availability, free initial consultation and minimum rating.",
        caption: "Filters built from what people ask first: price, availability, a free first call, rating.",
        width: "wide",
      },
    ],
  },
  {
    type: "section",
    id: "provider-side",
    kicker: "Provider side",
    title: "Give professionals a reason to stay",
    blocks: [
      {
        type: "text",
        text: "A marketplace like this fails when client and professional meet once and move off the platform. So the provider side is a place to run the practice: pending revenue, mandates waiting for a signature, court deadlines due today.",
      },
      {
        type: "figure",
        src: providerMobile,
        alt: "The provider dashboard on iPhone: pending revenue, active mandates with urgent actions, three quick actions and a row of case cards with statuses.",
        caption: "The provider app on iPhone.",
        width: "wide",
      },
      {
        type: "figure",
        src: providerWeb,
        alt: "The provider dashboard on the web: pending revenue and active mandates in a navy panel, quick actions, and a table of active cases with status and fee.",
        caption: "The same dashboard on the web, where the table can show fees and payment state.",
        width: "wide",
      },
      {
        type: "callout",
        variant: "principle",
        label: "Design decision",
        text: "The provider dashboard is the argument against disintermediation. If the platform is where the practice runs, there is no reason to leave it.",
      },
      {
        type: "figure",
        src: landingFinal,
        alt: "The final landing page hero: Hire Verified Professionals in Minutes, Not Weeks, above a search bar for profession, postcode and video call.",
        caption: "The landing page that went into the pitch.",
        width: "wide",
      },
    ],
  },
];
