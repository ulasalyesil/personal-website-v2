import Image from "next/image";
import Button from "@/components/ui/Button";
import CaseStudyTitle from "@/components/CaseStudyTitle";
import CaseStudyNav, { type NavSection } from "@/components/CaseStudyNav";
import NextStudy from "@/components/NextStudy";
import { nextCaseStudy } from "@/data/work";
import { cn } from "@/lib/cn";
import type {
  BlockWidth,
  CaseStudyTier,
  ContentBlock,
  GalleryItem,
  LeafBlock,
  SectionBlock,
} from "@/types";
import styles from "./CaseStudyLayout.module.css";

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
  /** Optional evidence-led visual, shown between the project label and the title. */
  visualLead?: React.ReactNode;
}

/** A section bar earns its space above this much page. */
const TOC_MIN_SECTIONS = 3;

/**
 * Lanes on the page grid. Prose holds a reading column, media starts where
 * the prose starts and runs to the right edge, `full` takes the whole row.
 */
type Lane = "prose" | "wide" | "full" | "bleed";

const WIDTH_TO_LANE: Record<BlockWidth, Lane> = {
  prose: "prose",
  wide: "wide",
  bleed: "bleed",
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
  if (block.type === "heading") return "mt-12";
  if (STANDOFF.has(block.type) || STANDOFF.has(previous.type)) return "mt-10";
  return "mt-5";
}

function laneOf(block: LeafBlock): Lane {
  switch (block.type) {
    case "figure":
      return WIDTH_TO_LANE[block.width ?? "wide"];
    case "custom":
      return WIDTH_TO_LANE[block.width ?? "wide"];
    case "image":
    case "gallery":
    case "metrics":
    case "compare":
      return "wide";
    default:
      return "prose";
  }
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
  visualLead,
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
    sections.length >= TOC_MIN_SECTIONS;
  const next = slug ? nextCaseStudy(slug) : undefined;

  function renderLeaf(block: LeafBlock, key: number, index: number) {
    const isHero = Boolean(slug) && index === heroKey && !visualLead;

    switch (block.type) {
      case "heading":
        return (
          <h3
            key={key}
            className="max-w-measure text-subsection font-semibold tracking-tight text-text-primary text-balance"
          >
            {block.text}
          </h3>
        );

      case "lead":
        return (
          <p
            key={key}
            className="max-w-[40rem] text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.4] tracking-[-0.01em] text-text-primary text-pretty"
          >
            {block.text}
          </p>
        );

      case "text":
        return (
          <p key={key} className="max-w-measure text-pretty">
            {block.text}
          </p>
        );

      case "list":
        return (
          <div key={key} className="max-w-measure">
            {block.lead && <p className="mb-3 text-pretty">{block.lead}</p>}
            {block.ordered ? (
              <ol className="space-y-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-pretty">
                    <span className="w-5 shrink-0 text-caption tabular-nums leading-[1.9] text-text-tertiary">
                      {i + 1}
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
                      className="mt-[0.7em] h-px w-3 shrink-0 bg-text-tertiary"
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
        const bleed = block.type === "figure" && block.width === "bleed";
        const caption = block.type === "figure" ? block.caption : undefined;
        const screen = block.type === "figure" && block.radius === "screen";
        return (
          <figure key={key}>
            <div
              className={cn(
                "overflow-hidden bg-surface-1",
                bleed ? "rounded-none" : "rounded-xl",
                // Device screens round at about 3.6% of their width; 4% covers the anti-aliased edge.
                screen && "rounded-[4%/6.4%]",
              )}
              style={
                slug && index === heroKey
                  ? { viewTransitionName: `project-${slug}-cover` }
                  : undefined
              }
            >
              <Image
                src={block.src}
                alt={block.alt || ""}
                className="w-full"
                sizes={isHero ? "100vw" : "(max-width: 1024px) 100vw, 75vw"}
                priority={isHero}
              />
            </div>
            {caption && (
              <figcaption className="mt-3 max-w-measure text-caption text-text-tertiary">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case "gallery":
        return (
          <figure key={key}>
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
                <div key={i} className="relative overflow-hidden rounded-xl bg-surface-1 after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_var(--color-image-outline)]">
                  <Image
                    src={img.src}
                    alt={img.alt || ""}
                    className="w-full"
                    sizes="(max-width: 640px) 50vw, 40vw"
                  />
                </div>
              ))}
            </div>
            {block.caption && (
              <figcaption className="mt-3 max-w-measure text-caption text-text-tertiary">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case "metrics":
        return (
          <dl
            key={key}
            className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-border-default pt-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {block.items.map((metric, i) => (
              // Label first for assistive tech; the value reads first on screen.
              <div key={i} className="flex flex-col">
                <dt className="order-2 mt-3 text-body text-text-secondary">{metric.label}</dt>
                <dd className="order-1 text-[clamp(2.5rem,4.5vw,4rem)] font-[480] leading-none tracking-[-0.04em] tabular-nums text-text-primary">
                  {metric.value}
                </dd>
                {metric.note && (
                  <dd className="order-3 mt-1 text-caption text-text-tertiary">{metric.note}</dd>
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
              "max-w-measure rounded-xl border p-5",
              CALLOUT_STYLE[block.variant ?? "principle"],
            )}
          >
            {block.label && (
              <p className="mb-1.5 text-caption font-medium text-text-secondary">
                {block.label}
              </p>
            )}
            <p className="text-pretty text-text-primary">{block.text}</p>
          </aside>
        );

      case "quote":
        return (
          <blockquote key={key} className="max-w-[40rem]">
            <p className="text-[clamp(1.375rem,2.4vw,2rem)] font-[480] leading-[1.25] tracking-[-0.02em] text-pretty text-text-primary">
              {block.text}
            </p>
            {block.attribution && (
              <footer className="mt-3 text-caption text-text-tertiary">{block.attribution}</footer>
            )}
          </blockquote>
        );

      case "compare":
        return (
          <figure key={key}>
            <div className="grid gap-6 sm:grid-cols-2">
              {block.panes.map((pane, i) => (
                <div key={i} className="flex min-w-0 flex-col gap-3">
                  <p className="flex items-center gap-2 text-caption font-medium text-text-secondary">
                    {pane.tone && pane.tone !== "neutral" && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[0.75rem] leading-5",
                          pane.tone === "shipped"
                            ? "bg-brand/10 text-brand"
                            : "bg-surface-2 text-text-tertiary",
                        )}
                      >
                        {pane.tone === "shipped" ? "Shipped" : "Rejected"}
                      </span>
                    )}
                    {pane.label}
                  </p>

                  {pane.src && (
                    <div className="relative overflow-hidden rounded-xl bg-surface-1 after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_var(--color-image-outline)]">
                      <Image
                        src={pane.src}
                        alt={pane.alt || ""}
                        className="w-full"
                        sizes="(max-width: 640px) 100vw, 40vw"
                      />
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
              <figcaption className="mt-6 max-w-measure border-l-2 border-brand pl-4 text-pretty">
                {block.verdict}
              </figcaption>
            )}
          </figure>
        );

      case "custom":
        return (
          <figure key={key}>
            {customComponents?.[block.id]}
            {block.caption && (
              <figcaption className="mt-3 max-w-measure text-caption text-text-tertiary">
                {block.caption}
              </figcaption>
            )}
          </figure>
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
      const index = flatIndex;
      const node = renderLeaf(block, i, index);
      if (!node) return null;
      const lane: Lane = Boolean(slug) && index === heroKey && !visualLead ? "full" : laneOf(block);
      return (
        <div key={i} className={cn(styles[lane], spacing(blocks[i - 1], block))}>
          {node}
        </div>
      );
    });
  }

  return (
    <>
      {showToc && <CaseStudyNav sections={sections} />}

      <article className={styles.article}>
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
          visual={visualLead}
        />

        <div className={cn(styles.grid, "text-body text-text-primary")}>
          {groupTopLevel(contentBlocks).map((group, i) =>
            group.kind === "section" ? (
              <section
                key={i}
                id={group.section.id}
                className={cn(
                  styles.section,
                  "scroll-mt-28",
                  i > 0 && (tier === "project" ? "mt-20" : "mt-28 border-t border-border-subtle pt-10"),
                )}
              >
                {group.section.kicker && (
                  <p
                    className={cn(
                      styles.kicker,
                      "font-mono text-micro uppercase tracking-micro text-text-tertiary",
                    )}
                  >
                    {group.section.kicker}
                  </p>
                )}
                {/* The `#` is the marker the rest of the site navigates by,
                    and here it doubles as what it already was: the anchor. */}
                <h2
                  className={cn(
                    styles.sectionTitle,
                    "mb-8 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-text-primary text-balance",
                  )}
                >
                  <a
                    href={`#${group.section.id}`}
                    className="group/anchor rounded-sm hover:text-brand"
                  >
                    <span
                      aria-hidden
                      className="mr-2 font-mono text-[0.5em] font-normal text-text-tertiary group-hover/anchor:text-brand"
                    >
                      #
                    </span>
                    {group.section.title}
                  </a>
                </h2>
                {renderLeaves(group.section.blocks)}
              </section>
            ) : (
              <div key={i} className={cn(styles.section, i > 0 && "mt-10")}>
                {renderLeaves(group.blocks)}
              </div>
            ),
          )}

          {websiteUrl && tier === "project" && (
            <div className={cn(styles.prose, "mt-12")}>
              <Button label="Visit website" href={websiteUrl} type="primary" target="_blank" />
            </div>
          )}
        </div>

        {next && next.slug !== slug && <NextStudy study={next} />}
      </article>
    </>
  );
}
