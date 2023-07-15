import '../styles/globals.css'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@bradgarropy/next-google-analytics/';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ulaş Alyeşil | Product Designer',
  description: 'Designing for memorable feelings.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div className="bg-gradient-to-b from-neutral-100 dark:from-neutral-950 to-neutral-100/0 dark:neutral-950/0 w-screen h-40 fixed top-0" />
          {children}
          <div className="bg-gradient-to-t from-neutral-100 dark:from-neutral-950 to-neutral-100/0 dark:neutral-950/0 w-screen h-40 fixed bottom-0" />
        </div>
      </body>

      <GoogleAnalytics measurementId="G-QK5JQ327KP" />
    </html>
  );
}
