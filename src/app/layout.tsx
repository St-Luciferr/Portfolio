import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Only load weights actually used
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Reduce layout shift
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pandeysantosh.com.np'),
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
    url: 'https://pandeysantosh.com.np',
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
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
    <html lang="en" className={poppins.variable}>
      <head>
        {/* DNS prefetch for EmailJS (only used in Contact form) */}
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
      </head>
      <body className="font-poppins bg-primary antialiased">{children}</body>
    </html>
  );
}
