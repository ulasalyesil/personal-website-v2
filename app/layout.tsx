import GoogleAnalytics from "@bradgarropy/next-google-analytics/";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  metadataBase: new URL("https://ulasalyesil.com"),
  title: "Ulaş Alyeşil | Product Designer",
  description:
    "Product designer focused on clear interfaces, useful tools, and creative technology.",
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
  // Without this guard an unset id still rendered the tag, which fetched 87KB
  // of gtag.js from googletagmanager.com for a measurement id of "" and left a
  // 404 in the console on every page.
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
        <Analytics />
        {gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
      </body>
    </html>
  );
}
