import styles from "./CaseStudyTitle.module.css";

interface CaseStudyTitleProps {
  title: string;
  date: string;
  company: string;
  role: string;
  status?: string;
  summary?: string;
  team?: string;
  platforms?: string;
  websiteUrl?: string;
  /** Pairs the title with the card or row it was opened from, for the route morph. */
  slug?: string;
  /** Evidence shown after the title and project facts. */
  visual?: React.ReactNode;
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * The title and observed result establish the claim before the visual.
 * The facts row gives the reviewer role, timeline and team context.
 */
export default function CaseStudyTitle({
  title,
  date,
  company,
  role,
  status,
  summary,
  team,
  platforms,
  websiteUrl,
  slug,
  visual,
}: CaseStudyTitleProps) {
  const facts: { label: string; value: string; href?: string }[] = [
    { label: "Role", value: role },
    { label: "Timeline", value: date },
  ];
  if (!title.toLowerCase().includes(company.toLowerCase())) {
    facts.push({ label: "Company", value: company });
  }
  if (team) facts.push({ label: "Team", value: team });
  if (platforms) facts.push({ label: "Platforms", value: platforms });
  if (websiteUrl) facts.push({ label: "Live", value: hostname(websiteUrl), href: websiteUrl });

  return (
    <header className={styles.header}>
      <p className={styles.label}>
        <span className={styles.company}>{company}</span>
        {status && <span className={styles.status}>{status}</span>}
      </p>

      <h1
        className={styles.title}
        style={slug ? { viewTransitionName: `project-${slug}-title` } : undefined}
      >
        {title}
      </h1>

      {summary && <p className={styles.summary}>{summary}</p>}

      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>
              {fact.href ? (
                <a href={fact.href} target="_blank" rel="noopener noreferrer">
                  {fact.value}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      {visual && <div className={styles.visual}>{visual}</div>}
    </header>
  );
}
