import GoogleAnalytics from "@bradgarropy/next-google-analytics/";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "Ulaş Alyeşil | Product Designer",
  description: "Product designer focused on clear interfaces, useful tools, and creative technology.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface-0 text-text-primary antialiased">
        <ErrorBoundary>{children}</ErrorBoundary>
        <Analytics />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
      </body>
    </html>
  );
}
