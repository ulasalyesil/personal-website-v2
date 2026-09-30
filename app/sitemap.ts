import type { MetadataRoute } from "next";
import { LAB_ITEMS } from "@/components/lab/data";

const BASE = "https://ulasalyesil.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/works",
    "/collected",
    "/lab",
    "/brand-layers",
    "/elastic-type",
    "/cv",
    // Static prototype served from public/ by a rewrite in next.config.js.
    "/common-ground",
  ];
  const caseStudies = [
    "/commodore",
    "/consiligiere",
    "/full-spectrum-insights",
    "/genesis",
    "/getirfinans-ai",
    "/getirfinans-design-system",
    "/good-afternoon-creative",
    "/jotform-integrations",
    "/wisecareai",
  ];
  const labItems = LAB_ITEMS.map((it) => `/lab/${it.slug}`);
  return [...staticRoutes, ...caseStudies, ...labItems].map((path) => ({
    url: `${BASE}${path}`,
  }));
}
