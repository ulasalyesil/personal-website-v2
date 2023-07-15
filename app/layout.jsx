import '../styles/globals.css'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@bradgarropy/next-google-analytics/';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ulaş Alyeşil',
  description: 'Product Designer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>

      <GoogleAnalytics measurementId="G-QK5JQ327KP" />
    </html>
  );
}
