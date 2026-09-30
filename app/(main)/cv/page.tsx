import type { Metadata } from "next";
import PageIntro from "@/components/site/PageIntro";
import JsonLd from "@/components/site/JsonLd";
import { experience } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { CASE_STUDIES } from "@/data/work";
import { profilePageJsonLd } from "@/lib/structured-data";
import styles from "./cv.module.css";

const DESCRIPTION = `${PROFILE.name}: ${PROFILE.jobTitle}${PROFILE.employer ? ` at ${PROFILE.employer}` : ""}, ${PROFILE.location.label}. Experience, education, languages and selected work.`;

export const metadata: Metadata = {
  title: "CV — Ulaş Alyeşil",
  description: DESCRIPTION,
  alternates: { canonical: "/cv" },
};

/**
 * The CV as plain, semantic HTML. Built for readers that parse rather than
 * look: every fact sits in a labelled field, nothing depends on layout to be
 * understood, and all of it comes from the same data the rest of the site uses.
 */
export default function CvPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd("/cv")} />
      <PageIntro title="CV" aside={PROFILE.name} />

      <article className={styles.cv}>
        <section aria-labelledby="cv-profile">
          <h2 id="cv-profile">Profile</h2>
          <dl className={styles.facts}>
            <dt>Name</dt>
            <dd>{PROFILE.name}</dd>
            <dt>Current role</dt>
            <dd>
              {PROFILE.jobTitle}
              {PROFILE.employer && <>, {PROFILE.employer}</>}
            </dd>
            <dt>Location</dt>
            <dd>{PROFILE.location.label}</dd>
            <dt>Open to</dt>
            <dd>{PROFILE.openTo}</dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </dd>
            <dt>Links</dt>
            <dd>
              <ul className={styles.inline}>
                {PROFILE.sameAs.map((url) => (
                  <li key={url}>
                    <a href={url}>{url.replace(/^https:\/\/(www\.)?/, "")}</a>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </section>

        <section aria-labelledby="cv-experience">
          <h2 id="cv-experience">Experience</h2>
          <ol className={styles.entries}>
            {experience.flatMap((company) =>
              company.positions.map((position) => (
                <li key={position.id}>
                  <h3>
                    {position.title}, {company.companyName}
                  </h3>
                  <dl className={styles.facts}>
                    <dt>Period</dt>
                    <dd>{position.employmentPeriod}</dd>
                    {position.employmentType && (
                      <>
                        <dt>Type</dt>
                        <dd>{position.employmentType}</dd>
                      </>
                    )}
                    {position.skills && (
                      <>
                        <dt>Skills</dt>
                        <dd>{position.skills.join(", ")}</dd>
                      </>
                    )}
                  </dl>
                  {position.description && <p>{position.description}</p>}
                </li>
              ))
            )}
          </ol>
        </section>

        <section aria-labelledby="cv-work">
          <h2 id="cv-work">Selected work</h2>
          <ol className={styles.entries}>
            {CASE_STUDIES.map((study) => (
              <li key={study.slug}>
                <h3>
                  <a href={`/${study.slug}`}>{study.title}</a>
                </h3>
                <dl className={styles.facts}>
                  <dt>Role</dt>
                  <dd>{study.role}</dd>
                  <dt>Year</dt>
                  <dd>{study.year}</dd>
                  <dt>Status</dt>
                  <dd>{study.status}</dd>
                </dl>
                <p>{study.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="cv-education">
          <h2 id="cv-education">Education</h2>
          <ol className={styles.entries}>
            {PROFILE.education.map((e) => (
              <li key={e.school}>
                <h3>
                  {e.degree}, {e.school}
                </h3>
                <dl className={styles.facts}>
                  <dt>Period</dt>
                  <dd>{e.period}</dd>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="cv-languages">
          <h2 id="cv-languages">Languages</h2>
          <dl className={styles.facts}>
            {PROFILE.languages.map((l) => (
              <div key={l.code} className={styles.pair}>
                <dt>{l.name}</dt>
                <dd>{l.level}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cv-skills">
          <h2 id="cv-skills">Focus</h2>
          <p>{PROFILE.knowsAbout.join(", ")}</p>
        </section>
      </article>
    </>
  );
}
