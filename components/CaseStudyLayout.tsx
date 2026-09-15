import Image from "next/image";
import Button from "@/components/ui/Button";
import CaseStudyTitle from "@/components/CaseStudyTitle";
import CaseStudyNav, { type NavSection } from "@/components/CaseStudyNav";
import { cn } from "@/lib/cn";
import type {
  BlockWidth,
  CaseStudyTier,
  ContentBlock,
  GalleryItem,
  LeafBlock,
  SectionBlock,
} from "@/types";

interface CaseStudyLayoutProps {
  title: string;
  date: string;
  company: string;
  role: string;
  contentBlocks: ContentBlock[];
  websiteUrl?: string;
  slug?: string;
  status?: string;
  /** Who else was involved. Shown in the header grid on case studies. */
  team?: string;
  /** Where the work shipped. Shown in the header grid on case studies. */
  platforms?: string;
  tier?: CaseStudyTier;
  customComponents?: Record<string, React.ReactNode>;
}

/** A table of contents earns its space above this much page. */
const TOC_MIN_SECTIONS = 5;
const TOC_MIN_WORDS = 1200;

const NEXT_STUDIES: Record<string, { title: string; href: string; description: string }> = {
  "getirfinans-ai": {
    title: "Shipping app-wide dark mode at GetirFinans",
    href: "/getirfinans-design-system",
    description: "See the system work that supported the banking product.",
  },
  "getirfinans-design-system": {
    title: "Jotform | QuickBooks Integration",
    href: "/jotform-integrations",
    description: "See a workflow design case built with research and engineering.",
  },
  "jotform-integrations": {
    title: "WiseCareAI",
    href: "/wisecareai",
    description: "See founding product design for a market-ready health-insurance platform.",
  },
  wisecareai: {
    title: "GetirFinans AI",
    href: "/getirfinans-ai",
    description: "Return to current banking product work.",
  },
};

const LANE: Record<BlockWidth, string> = {
  prose: "max-w-measure",
  wide: "w-full",
  bleed: "relative left-1/2 w-screen max-w-none -translate-x-1/2",
};

const CALLOUT_STYLE = {
  principle: "border-brand/30 bg-brand/[0.06]",
  note: "border-border-subtle bg-surface-1",
  constraint: "border-border-default bg-surface-1",
} as const;

function isSection(block: ContentBlock): block is SectionBlock {
  return block.type === "section";
}

type TopLevelGroup =
  | { kind: "section"; section: SectionBlock }
  | { kind: "run"; blocks: LeafBlock[] };

/**
 * Sections stay as they are; consecutive loose blocks collapse into one run so
 * the spacing rules see their real neighbours. Pages that never adopt sections
 * (the short project pages) render as a single run and behave exactly as before.
 */
function groupTopLevel(blocks: ContentBlock[]): TopLevelGroup[] {
  const groups: TopLevelGroup[] = [];
  for (const block of blocks) {
    if (isSection(block)) {
      groups.push({ kind: "section", section: block });
      continue;
    }
    const last = groups[groups.length - 1];
    if (last?.kind === "run") last.blocks.push(block);
    else groups.push({ kind: "run", blocks: [block] });
  }
  return groups;
}

/** Words of prose on the page, used only to decide whether a TOC is warranted. */
function countWords(blocks: ContentBlock[]): number {
  return blocks.reduce((total, block) => {
    if (isSection(block)) return total + countWords(block.blocks);
    if (
      block.type === "text" ||
      block.type === "lead" ||
      block.type === "quote" ||
      block.type === "callout"
    ) {
      return total + block.text.split(/\s+/).length;
    }
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.type === "compare") {
      const prose = [block.verdict, ...block.panes.map((p) => p.text)].filter(Boolean).join(" ");
      return total + (prose ? prose.split(/\s+/).length : 0);
    }
    return total;
  }, 0);
}

/**
 * Vertical rhythm. Three intervals, not one: paragraphs sit close, media and
 * asides stand off, subsections open a gap. A single repeated value gives every
 * block equal weight, which is what makes a long page unreadable.
 */
const STANDOFF = new Set([
  "compare",
  "figure",
  "image",
  "gallery",
  "metrics",
  "custom",
  "callout",
  "quote",
  "list",
]);

function spacing(previous: LeafBlock | undefined, block: LeafBlock): string {
  if (!previous) return "";
  if (block.type === "heading") return "mt-10";
  if (STANDOFF.has(block.type) || STANDOFF.has(previous.type)) return "mt-8";
  return "mt-5";
}

export default function CaseStudyLayout({
  title,
  date,
  company,
  role,
  contentBlocks,
  websiteUrl,
  slug,
  status,
  team,
  platforms,
  tier = "case-study",
  customComponents,
}: CaseStudyLayoutProps) {
  // The hero image keeps the view transition that carries it in from the grid.
  const heroKey = (() => {
    const flat = contentBlocks.flatMap((block) => (isSection(block) ? block.blocks : [block]));
    const first = flat.find((block) => block.type === "image" || block.type === "figure");
    return first ? flat.indexOf(first) : -1;
  })();

  const sections: NavSection[] = contentBlocks
    .filter(isSection)
    .map(({ id, title: sectionTitle }) => ({ id, title: sectionTitle }));

  const showToc =
    tier === "case-study" &&
    sections.length >= TOC_MIN_SECTIONS &&
    countWords(contentBlocks) >= TOC_MIN_WORDS;
  const nextStudy = slug ? NEXT_STUDIES[slug] : undefined;

  function renderLeaf(block: LeafBlock, key: number, index: number) {
    switch (block.type) {
      case "heading":
        return (
          <h3
            key={key}
            className={cn(LANE.prose, "text-subsection font-semibold tracking-tight text-text-primary text-balance")}
          >
            {block.text}
          </h3>
        );

      case "lead":
        return (
          <p key={key} className={cn(LANE.prose, "text-lead text-text-primary text-pretty")}>
            {block.text}
          </p>
        );

      case "text":
        return (
          <p key={key} className={cn(LANE.prose, "text-pretty")}>
            {block.text}
          </p>
        );

      case "list":
        return (
          <div key={key} className={LANE.prose}>
            {block.lead && <p className="mb-3 text-pretty">{block.lead}</p>}
            {block.ordered ? (
              <ol className="space-y-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-pretty">
                    <span className="shrink-0 font-mono text-caption tabular-nums leading-[1.7] text-text-tertiary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="space-y-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-pretty">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-text-tertiary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "image":
      case "figure": {
        const width = block.type === "figure" ? (block.width ?? "wide") : "wide";
        const caption = block.type === "figure" ? block.caption : undefined;
        return (
          <figure key={key} className={LANE[width]}>
            <div
              className={cn(
                "overflow-hidden bg-surface-1",
                width === "bleed" ? "rounded-none" : "rounded-lg",
              )}
              style={
                slug && index === heroKey
                  ? { viewTransitionName: `project-${slug}-cover` }
                  : undefined
              }
            >
              <Image src={block.src} alt={block.alt || ""} className="w-full" />
            </div>
            {caption && (
              <figcaption className={cn(LANE.prose, "mt-3 text-caption text-text-tertiary")}>
                {caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case "gallery":
        return (
          <figure key={key} className="w-full">
            <div
              className={cn(
                "grid gap-3",
                block.columns === 3
                  ? "grid-cols-2 sm:grid-cols-3"
                  : block.columns === 4
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-2",
              )}
            >
              {block.items.map((img: GalleryItem, i: number) => (
                <div key={i} className="overflow-hidden rounded-lg bg-surface-1">
                  <Image src={img.src} alt={img.alt || ""} className="w-full" />
                </div>
              ))}
            </div>
            {block.caption && (
              <figcaption className={cn(LANE.prose, "mt-3 text-caption text-text-tertiary")}>
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case "metrics":
        return (
          <dl
            key={key}
            className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3"
          >
            {block.items.map((metric, i) => (
              <div key={i} className="bg-surface-0 p-5">
                <dt className="text-kicker font-mono uppercase tracking-wide text-text-tertiary">
                  {metric.label}
                </dt>
                <dd className="mt-2 text-section font-semibold tracking-tight tabular-nums text-text-primary">
                  {metric.value}
                </dd>
                {metric.note && (
                  <dd className="mt-1.5 text-caption text-text-tertiary">{metric.note}</dd>
                )}
              </div>
            ))}
          </dl>
        );

      case "callout":
        return (
          <aside
            key={key}
            className={cn(
              LANE.prose,
              "rounded-lg border p-5",
              CALLOUT_STYLE[block.variant ?? "principle"],
            )}
          >
            {block.label && (
              <p className="mb-2 text-kicker font-mono uppercase tracking-wide text-text-tertiary">
                {block.label}
              </p>
            )}
            <p className="text-pretty text-text-primary">{block.text}</p>
          </aside>
        );

      case "quote":
        return (
          <blockquote key={key} className={cn(LANE.prose, "border-l-2 border-brand pl-5")}>
            <p className="text-lead text-pretty text-text-primary">{block.text}</p>
            {block.attribution && (
              <footer className="mt-2 text-caption text-text-tertiary">{block.attribution}</footer>
            )}
          </blockquote>
        );

      case "compare":
        return (
          <figure key={key} className="w-full">
            <div className="grid gap-4 sm:grid-cols-2">
              {block.panes.map((pane, i) => (
                <div key={i} className="flex min-w-0 flex-col gap-3">
                  <p className="flex items-center gap-2 text-kicker font-mono uppercase tracking-wide text-text-tertiary">
                    {pane.tone && pane.tone !== "neutral" && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "leading-none",
                          pane.tone === "shipped" ? "text-brand" : "text-text-tertiary",
                        )}
                      >
                        {pane.tone === "shipped" ? "✓" : "✕"}
                      </span>
                    )}
                    {pane.label}
                  </p>

                  {pane.src && (
                    <div className="overflow-hidden rounded-lg bg-surface-1">
                      <Image src={pane.src} alt={pane.alt || ""} className="w-full" />
                    </div>
                  )}
                  {pane.id && <div>{customComponents?.[pane.id]}</div>}
                  {pane.text && <p className="text-pretty">{pane.text}</p>}

                  {pane.caption && (
                    <p className="text-caption text-text-tertiary">{pane.caption}</p>
                  )}
                </div>
              ))}
            </div>
            {block.verdict && (
              <figcaption className={cn(LANE.prose, "mt-5 border-l-2 border-brand pl-4 text-pretty")}>
                {block.verdict}
              </figcaption>
            )}
          </figure>
        );

      case "custom":
        return (
          <div key={key} className={LANE[block.width ?? "wide"]}>
            {customComponents?.[block.id]}
          </div>
        );

      default:
        return null;
    }
  }

  /** Flat index across sections, so the hero image keeps a stable identity. */
  let flatIndex = -1;
  function renderLeaves(blocks: LeafBlock[]) {
    return blocks.map((block, i) => {
      flatIndex += 1;
      const node = renderLeaf(block, i, flatIndex);
      if (!node) return null;
      const gap = spacing(blocks[i - 1], block);
      return gap ? (
        <div key={i} className={gap}>
          {node}
        </div>
      ) : (
        node
      );
    });
  }

  return (
    <div className={cn(showToc && "xl:grid xl:grid-cols-[11rem_minmax(0,1fr)] xl:gap-10")}>
      {showToc && <CaseStudyNav sections={sections} />}

      <article className="min-w-0">
        <CaseStudyTitle
          title={title}
          date={date}
          company={company}
          role={role}
          status={status}
          slug={slug}
          team={team}
          platforms={platforms}
          websiteUrl={websiteUrl}
          tier={tier}
        />

        <div className="mt-12 text-body text-text-primary">
          {groupTopLevel(contentBlocks).map((group, i) =>
            group.kind === "section" ? (
              <section
                key={i}
                id={group.section.id}
                className={cn(
                  "scroll-mt-28",
                  i > 0 &&
                    (tier === "project" ? "mt-16" : "mt-24 border-t border-border-subtle pt-10"),
                )}
              >
                <header className={cn(LANE.prose, "mb-6")}>
                  {group.section.kicker && (
                    <p className="mb-2 text-kicker font-mono uppercase tracking-wide text-text-tertiary">
                      {group.section.kicker}
                    </p>
                  )}
                  <h2 className="text-section font-semibold tracking-tight text-text-primary text-balance">
                    <a
                      href={`#${group.section.id}`}
                      className="transition-colors duration-150 hover:text-brand"
                    >
                      {group.section.title}
                    </a>
                  </h2>
                </header>
                {renderLeaves(group.section.blocks)}
              </section>
            ) : (
              <div key={i} className={i > 0 ? "mt-8" : undefined}>
                {renderLeaves(group.blocks)}
              </div>
            ),
          )}

          {websiteUrl && tier === "project" && (
            <div className="pt-10">
              <Button label="Visit Website" href={websiteUrl} type="primary" target="_blank" />
            </div>
          )}

          {nextStudy && (
            <footer className="mt-20 border-t border-border-subtle pt-8">
              <p className="text-kicker font-mono uppercase tracking-wide text-text-tertiary">
                Next case study
              </p>
              <h2 className="mt-2 text-section font-semibold text-balance text-text-primary">
                {nextStudy.title}
              </h2>
              <p className="mt-2 max-w-measure text-pretty text-text-secondary">
                {nextStudy.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button label="Read next study" href={nextStudy.href} type="primary" />
                <Button label="View résumé" href="/ulas-alyesil-resume.pdf" target="_blank" type="secondary" />
                <Button label="Contact" href="mailto:hello@ulasalyesil.com" type="secondary" />
              </div>
            </footer>
          )}
        </div>
      </article>
    </div>
  );
}
