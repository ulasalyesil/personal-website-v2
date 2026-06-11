import type { MetadataRoute } from "next";
import { LAB_ITEMS } from "@/components/lab/data";

const BASE = "https://ulasalyesil.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/works", "/bookmarks", "/lab"];
  const caseStudies = [
    "/commodore",
    "/full-spectrum-insights",
    "/genesis",
    "/getirfinans-dark-mode",
    "/good-afternoon-creative",
    "/jotform-integrations",
    "/wisecareai",
  ];
  const labItems = LAB_ITEMS.map((it) => `/lab/${it.slug}`);
  return [...staticRoutes, ...caseStudies, ...labItems].map((path) => ({
    url: `${BASE}${path}`,
  }));
}
