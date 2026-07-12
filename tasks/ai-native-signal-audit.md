# AI-Native Signal Audit

Date: 2026-07-10
Question asked: does the site communicate that Ulaş is AI-native (uses AI heavily/skillfully
in his own workflow) without explicitly saying "AI-native" — buried in the workflow, but
visible?

## Verdict

**There's currently nothing to bury.** This isn't a "make it subtler" problem, it's a
"there's no there there" problem. The signal isn't buried-but-visible — it's absent.

## 1. Explicit "AI-native" / "AI native" mentions

None found anywhere in the codebase. Grepped all `.tsx`/`.ts`/`.json` for `ai[- ]native`,
zero hits. Nothing to walk back — good.

## 2. What AI-related content exists (and why it doesn't count)

No specific AI tool names appear anywhere: no Claude, Claude Code, Cursor (the IDE — the one
"Cursor" grep hit in `components/lab/data.ts:42` is a mouse-cursor reference), ChatGPT,
Copilot, Figma AI, "vibe coding," or "prompt engineering" as a personal skill.

What exists instead is AI described as **a feature within client work** — i.e. "I designed
AI products," not "I build with AI":

- `app/(main)/page.tsx:19` — WiseCareAI blurb: "combining product design with generative AI
  to adapt forms and recommendations in real time" (describes the product)
- `app/(main)/page.tsx:27` — FSI blurb: "consultancy website showcasing AI-assisted business
  insights" (describes the client's business)
- `app/(case-study)/full-spectrum-insights/page.tsx:9,29,42` — "AI-assisted insight
  workflows," "framed AI as draft-first assistance, not magic" (client positioning work)
- `app/(case-study)/wisecareai/content.ts:24,37,42-108` — "Generative UI/AI... to augment
  core workflows," "Preview → Refine → Commit," "Rationale Card," "generative canvas" (UX
  patterns designed for an AI feature, not the designer's own tooling)
- `data/experience.ts:37-38` — WiseCareAI role: "Integrated generative AI to augment core
  enrollment workflows," skill tag `"AI/UX"`
- `app/(case-study)/getirfinans-design-system/page.tsx:79,143` +
  `components.tsx:1260-1381` — `bg/ai/*` token namespace, "AI Component Spec," "AI Podcast
  Recommendation" (design tokens for AI surfaces in the product)

Adjacent but AI-silent solo/speed claims:
- `getirfinans-design-system/page.tsx:241` — "I rebuilt the color foundation... solo"
- `jotform-integrations/page.tsx:41` — "I was the sole designer on this project"
- `data/experience.ts:59` — freelance entry lists "Next.js," "Web Development" as skills,
  implying he codes, but no AI-tooling connection

## 3. Pages/sections with zero AI-workflow signal

- `components/Hero.tsx` (homepage hero) — no AI mention
- `app/(main)/about/page.tsx` — full About copy, no AI mention whatsoever (mentions
  "generative visuals" but in an art context, not tooling)
- `app/layout.tsx` site metadata — "Product designer focused on clear interfaces, useful
  tools, and creative technology." No AI mention.
- `app/(main)/lab/page.tsx` metadata + `components/LabTeaserCard.tsx` — "generative
  sketches" reads as generative art, not AI-tool workflow
- `components/lab/data.ts` — all 6 lab item blurbs, zero AI references
- Case studies with zero AI signal at all: Commodore, Genesis, Jotform, Good Afternoon
  Creative
- `public/data/projects.json`, `others.json` — pure metadata, nothing descriptive
- `app/(main)/works/page.tsx`, `bookmarks/page.tsx` — no signal

## Where real signal could live (pending: is it true?)

Not proposing copy yet — these are candidate locations only, contingent on confirming what's
actually true about the workflow:

1. **Lab section** — already framed as low-stakes sketches/experiments. Natural place for a
   blurb that names *how* something was built (e.g. built in an afternoon with an LLM
   pair-programming it), if that's accurate for any lab piece.
2. **About page** — currently silent on tooling entirely; people expect a line here about how
   someone works.
3. **Case study "How it shipped" / process sections** — GetirFinans and Jotform already have
   solo-build framing; a single concrete sentence about build process could slot in if true.

## Next step

Confirm with Ulaş which of these are real (did he use Claude Code / Cursor / an LLM
meaningfully on specific Lab pieces or case studies) before writing any copy. Don't invent
workflow claims.
