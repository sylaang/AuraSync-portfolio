import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import SeoSchemas from '@/components/SeoSchemas';


const inter = Inter({ subsets: ['latin'] })
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not defined in .env");
}


export const metadata: Metadata = {
  title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
  description:
    "Découvrez mes projets en développement web, allant de sites dynamiques à des applications web interactives créées avec React, Node.js, et plus encore.",
  authors: [{ name: 'AuraSync | HACHEM Mehdi', url: 'https://www.linkedin.com/in/mehdi-hachem-54a8672b0/' }],
  creator: 'AuraSync',
  applicationName: 'Portfolio AuraSync',
  appleWebApp: {
    capable: true,
    title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
    description:
      " Boostez votre activité avec un site web sur-mesure, moderne et performant. Je suis HACHEM Mehdi, développeur web, prêt à transformer vos idées en solutions digitales innovantes et adaptées. ",
    url: `${SITE_URL}/`,
    siteName: 'AuraSync',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og-home.png`,
        width: 1200,
        height: 630,
        alt: "Portfolio de HACHEM Mehdi - Développeur Web et fondateur de AuraSync",
      },
    ],
  },
  metadataBase: new URL(SITE_URL),
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
    description:
      "Découvrez des projets réalisés avec React, Vue.js, et Node.js. Voyez comment j'apporte des solutions web créatives et performantes.",
    images: [`${SITE_URL}/images/og-home.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />

        <meta name="google-site-verification" content="tkuceJZzEh_7T6m7uqrtjHBkrwYzXKVvhv-hUSbrb8E" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Portfolio | AuraSync - HACHEM Mehdi - Développeur Web" />
        <meta property="og:description" content="Boostez votre activité avec un site web sur-mesure, moderne et performant. Je suis HACHEM Mehdi, développeur web, prêt à transformer vos idées en solutions digitales innovantes et adaptées." />
        <meta property="og:image" content={`${SITE_URL}/images/og-home.png`} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AuraSync" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | AuraSync - HACHEM Mehdi - Développeur Web" />
        <meta name="twitter:description" content="Découvrez des projets réalisés avec React, Vue.js, et Node.js. Voyez comment j'apporte des solutions web créatives et performantes." />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-home.png`} />

        <SeoSchemas />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
