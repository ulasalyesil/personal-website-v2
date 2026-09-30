import { PROFILE, SITE_URL } from "@/data/profile";

/**
 * schema.org JSON-LD for agents that screen portfolios without reading them.
 * Everything is derived from `data/profile.ts` and the case-study props, so
 * the structured data says exactly what the pages say.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    url: PROFILE.url,
    email: `mailto:${PROFILE.email}`,
    jobTitle: PROFILE.jobTitle,
    ...(PROFILE.employer && {
      worksFor: { "@type": "Organization", name: PROFILE.employer },
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location.city,
      addressCountry: PROFILE.location.country,
    },
    alumniOf: PROFILE.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    knowsLanguage: PROFILE.languages.map((l) => l.code),
    knowsAbout: [...PROFILE.knowsAbout],
    sameAs: [...PROFILE.sameAs],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: PROFILE.name,
    author: { "@id": PERSON_ID },
  };
}

export function profilePageJsonLd(path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export interface CaseStudyFacts {
  title: string;
  slug?: string;
  company: string;
  role: string;
  date: string;
  summary?: string;
}

export function caseStudyJsonLd(facts: CaseStudyFacts): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: facts.title,
    ...(facts.slug && { url: `${SITE_URL}/${facts.slug}` }),
    ...(facts.summary && { abstract: facts.summary }),
    temporalCoverage: facts.date,
    creator: {
      "@type": "Role",
      roleName: facts.role,
      creator: { "@id": PERSON_ID },
    },
    sourceOrganization: { "@type": "Organization", name: facts.company },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** Serialized for a `<script type="application/ld+json">`, safe against `</script>` in strings. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
