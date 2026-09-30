import { describe, expect, it } from "vitest";
import { experience } from "../data/experience";
import { PROFILE } from "../data/profile";
import { buildLlmsTxt } from "./llms";
import {
  caseStudyJsonLd,
  personJsonLd,
  serializeJsonLd,
} from "./structured-data";

describe("profile", () => {
  it("takes the current title and employer from the experience list", () => {
    const current = experience.find((e) => e.isCurrentEmployer)!;
    expect(PROFILE.jobTitle).toBe(current.positions[0].title);
    expect(PROFILE.employer).toBe(current.companyName);
  });
});

describe("structured data", () => {
  it("describes the person with the facts screeners look for", () => {
    const person = personJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person.jobTitle).toBe(PROFILE.jobTitle);
    expect(person.knowsLanguage).toContain("en");
    expect(person.alumniOf).toHaveLength(1);
  });

  it("links a case study back to the person", () => {
    const work = caseStudyJsonLd({
      title: "T",
      slug: "t",
      company: "C",
      role: "R",
      date: "2026",
    });
    expect(work.url).toBe("https://ulasalyesil.com/t");
    expect(JSON.stringify(work)).toContain("/#person");
  });

  it("cannot close its own script tag", () => {
    expect(serializeJsonLd({ x: "</script><script>" })).not.toContain(
      "</script>"
    );
  });
});

describe("llms.txt", () => {
  const text = buildLlmsTxt();

  it("opens with the name and the current role", () => {
    expect(text.startsWith(`# ${PROFILE.name}\n`)).toBe(true);
    expect(text).toContain(PROFILE.jobTitle);
  });

  it("lists case studies and the CV, and leaves out /collected", () => {
    expect(text).toContain("## Case studies");
    expect(text).toContain("/cv");
    expect(text).not.toContain("/collected");
  });

  it("never calls the employer a banking app", () => {
    expect(text.toLowerCase()).not.toContain("banking app");
  });
});
