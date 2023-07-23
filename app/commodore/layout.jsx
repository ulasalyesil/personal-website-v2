import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@bradgarropy/next-google-analytics/';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ulaş Alyeşil | Commodore Case Study',
  description: 'Designing for memorable feelings.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col m-auto items-center pt-12 sm:pt-32">
          <Header />
          {children}
        </div>
      </body>
      <Analytics />
      <GoogleAnalytics measurementId="G-QK5JQ327KP" />
    </html>
  );
}
