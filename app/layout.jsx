// next
import { Inter } from "next/font/google";
import Head from "next/head";

// anayltics
import GoogleAnalytics from "@bradgarropy/next-google-analytics/";
import { Analytics } from "@vercel/analytics/react";

// styles
import "../styles/globals.css";
// component
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ulaş Alyeşil | Product Designer",
  description: "Designing for memorable feelings.", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:image" content="@public/images/preview.png"/>
        <meta property="twitter:image" content="@public/images/preview.png"/>
      </Head>
      <body className={inter.className}>
        <div className="flex flex-col m-auto items-center pt-12 sm:pt-32">
          <Header />
          <div className="bg-gradient-to-b from-neutral-100 dark:from-neutral-950 to-neutral-100/0 dark:neutral-950/0 w-screen h-24 sm:h-40 fixed top-0" />
          {children}
          <div className="bg-gradient-to-t from-neutral-100 dark:from-neutral-950 to-neutral-100/0 dark:neutral-950/0 w-screen h-32 sm:h-40 fixed bottom-0" />
        </div>
      </body>
      <Analytics />
      <GoogleAnalytics measurementId="G-QK5JQ327KP" />
    </html>
  );
}
