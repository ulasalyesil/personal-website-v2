import Pill from "./ui/Pill";
import type { CaseStudyTier } from "@/types";

interface CaseStudyTitleProps {
  title: string;
  date: string;
  company: string;
  role: string;
  status?: string;
  team?: string;
  platforms?: string;
  websiteUrl?: string;
  tier?: CaseStudyTier;
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function CaseStudyTitle({
  title,
  date,
  company,
  role,
  status,
  team,
  platforms,
  websiteUrl,
  tier = "case-study",
}: CaseStudyTitleProps) {
  // Role, timeline and team above the fold: the three things a reviewer checks
  // before deciding whether the rest is worth reading.
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
    <header className="mb-12">
      {status && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {status}
        </div>
      )}

      <h1 className="max-w-measure text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
        {title}
      </h1>

      {tier === "project" ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill label={date} />
          <Pill label={company} />
          <Pill label={role} />
        </div>
      ) : (
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border-subtle pt-6 sm:grid-cols-3 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-kicker font-mono uppercase tracking-wide text-text-tertiary">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-caption text-text-primary">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand transition-colors duration-150 hover:text-brand-hover"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
