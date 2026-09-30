import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import InspectLayer from "@/components/inspect/InspectLayer";
import Keymap from "@/components/site/Keymap";
import JsonLd from "@/components/site/JsonLd";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://ulasalyesil.com"),
  title: "Ulaş Alyeşil | Product Designer",
  description:
    "Product designer focused on clear interfaces, useful tools, and creative technology.",
  appleWebApp: { capable: true, title: "ulaş", statusBarStyle: "default" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface-0 text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-50 rounded-md bg-surface-0 px-3 py-2 text-sm text-text-primary shadow-lg focus:not-sr-only focus:outline-2 focus:outline-brand"
        >
          Skip to content
        </a>
        <ErrorBoundary>{children}</ErrorBoundary>
        <InspectLayer />
        <Keymap />
        <Analytics />
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
