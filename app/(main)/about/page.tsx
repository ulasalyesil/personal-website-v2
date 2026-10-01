import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/site/PageIntro";
import AboutText from "@/components/about/AboutText";
import WorkExperience from "@/components/WorkExperience";
import { experience } from "@/data/experience";
import { EMAIL } from "@/lib/constants";
import picture from "@/public/images/picture.jpeg";
import JsonLd from "@/components/site/JsonLd";
import { profilePageJsonLd } from "@/lib/structured-data";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Ulaş Alyeşil",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <JsonLd data={profilePageJsonLd("/about")} />
      <PageIntro title="About" aside="Product designer, Istanbul" />

      <section className={styles.body} aria-label="Introduction">
        <aside className={styles.rail}>
          <div className={styles.portrait}>
            <Image
              src={picture}
              alt="Ulaş Alyeşil"
              fill
              sizes="(max-width: 900px) 60vw, 25vw"
              priority
              className={styles.photo}
            />
          </div>
          <dl className={styles.facts}>
            <div>
              <dt>Based in</dt>
              <dd>Istanbul</dd>
            </div>
            <div>
              <dt>Currently</dt>
              <dd>UI Designer, Design Systems at getirfinans</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>Remote work and relocation</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>CV</dt>
              <dd>
                <a href="/cv">/cv</a>
              </dd>
            </div>
          </dl>
        </aside>

        <div className={styles.text}>
          <AboutText />
        </div>
      </section>

      <WorkExperience items={experience} />
    </>
  );
}
