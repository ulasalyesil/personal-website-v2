import { LAB_ITEMS } from "@/components/lab/data";
import { experience } from "@/data/experience";
import { PROFILE, SITE_URL } from "@/data/profile";
import { CASE_STUDIES } from "@/data/work";

/**
 * llms.txt (llmstxt.org): the site as a short markdown index for language
 * models and screening agents. Generated from the same data as the pages.
 * /collected is left out on purpose: it is other people's work.
 */
export function buildLlmsTxt(): string {
  const lines = [
    `# ${PROFILE.name}`,
    "",
    `> ${PROFILE.jobTitle}${PROFILE.employer ? ` at ${PROFILE.employer}` : ""}. ${PROFILE.location.label}. Open to: ${PROFILE.openTo.toLowerCase()}.`,
    "",
    `- Email: ${PROFILE.email}`,
    `- Languages: ${PROFILE.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}`,
    `- Education: ${PROFILE.education.map((e) => `${e.degree}, ${e.school}, ${e.period}`).join("; ")}`,
    `- Focus: ${PROFILE.knowsAbout.join(", ")}`,
    `- Links: ${PROFILE.sameAs.join(", ")}`,
    "",
    "## Experience",
    "",
    ...experience.flatMap((company) =>
      company.positions.map(
        (p) =>
          `- ${p.title}, ${company.companyName} (${p.employmentPeriod}${p.employmentType ? `, ${p.employmentType.toLowerCase()}` : ""})${p.description ? `: ${p.description}` : ""}`
      )
    ),
    "",
    "## Case studies",
    "",
    ...CASE_STUDIES.map(
      (c) =>
        `- [${c.title}](${SITE_URL}/${c.slug}): ${c.line} Role: ${c.role}. ${c.year}. ${c.status}.`
    ),
    "",
    "## Lab",
    "",
    ...LAB_ITEMS.map(
      (item) =>
        `- [${item.title}](${SITE_URL}/lab/${item.slug}): ${item.summary}`
    ),
    "",
    "## Pages",
    "",
    `- [CV](${SITE_URL}/cv): experience, education and languages as plain HTML`,
    `- [About](${SITE_URL}/about)`,
    `- [Work](${SITE_URL}/works)`,
    "",
  ];
  return lines.join("\n");
}
