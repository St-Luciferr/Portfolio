import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false, // only the hero code card uses it
});

// Runs before first paint so the stored / system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}document.documentElement.classList.add('js')})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Santosh Pandey | ML Engineer & Full Stack Developer',
    template: '%s | Santosh Pandey',
  },
  description:
    'Machine Learning Engineer passionate about Generative AI, NLP, and intelligent automation. Building real-world AI solutions with Python, Django, FastAPI, and modern ML frameworks.',
  keywords: [
    'Machine Learning Engineer',
    'Generative AI',
    'NLP Developer',
    'Full Stack Developer',
    'Python Developer',
    'Django',
    'FastAPI',
    'RAG',
    'LLM',
    'React Developer',
    'Nepal',
    'Santosh Pandey',
  ],
  authors: [{ name: 'Santosh Pandey' }],
  creator: 'Santosh Pandey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Santosh Pandey Portfolio',
    title: 'Santosh Pandey | ML Engineer & Full Stack Developer',
    description:
      'Machine Learning Engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Santosh Pandey - ML Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santosh Pandey | ML Engineer',
    description:
      'ML Engineer building AI solutions with Generative AI, NLP & automation',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Search Console (Google) and Bing Webmaster Tools ownership meta tags.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION },
    }),
  },
};

export const viewport: Viewport = {
  themeColor: '#050816',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* DNS prefetch for EmailJS (only used in Contact form) */}
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
      </head>
      <body className="font-sans bg-primary text-fg antialiased">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
