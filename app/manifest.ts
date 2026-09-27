import type { MetadataRoute } from "next";

// Icons are generated as a pair with eyluldeniz.com's: ~/Documents/work/icon-pair/generate.py
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ulaş Alyeşil",
    short_name: "ulaş",
    description: "Product designer focused on clear interfaces, useful tools, and creative technology.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
