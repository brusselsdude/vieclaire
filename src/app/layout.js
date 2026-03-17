import './globals.css';
import Script from 'next/script';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

const GA_ID = 'G-QP46S5KB4R';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vie Claire — Personal Finance That Actually Makes Sense',
    template: '%s | Vie Claire',
  },
  description:
    'Master your financial life with clear, funny, and actionable personal finance education. Tools, blog posts, and calculators in English, French, and German.',
  keywords: ['personal finance', 'financial independence', 'FIRE', 'ETF investing', 'budgeting', 'compound interest', 'savings rate', 'financial freedom'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/img/og-default.png`, width: 1200, height: 630, alt: 'Vie Claire — Personal Finance' }],
  },
  twitter: { card: 'summary_large_image', site: '@vieclaire', creator: '@vieclaire' },
  alternates: {
    languages: {
      'en': `${SITE_URL}/en`,
      'fr': `${SITE_URL}/fr`,
      'de': `${SITE_URL}/de`,
      'x-default': `${SITE_URL}/en`,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#052e16" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
