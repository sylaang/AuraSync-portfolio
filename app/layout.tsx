import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
  description:
    "Découvrez mes projets en développement web, allant de sites dynamiques à des applications web interactives créées avec React, Node.js, et plus encore.",
  authors: [{ name: 'AuraSync | HACHEM Mehdi', url: 'https://www.linkedin.com/in/mehdi-hachem-54a8672b0/' }],
  creator: 'AuraSync',
  applicationName: 'Portfolio AuraSync',
  appleWebApp: {
    capable: true,
    title: 'Portfolio AuraSync',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
    description:
      "Je suis HACHEM Mehdi, un développeur web passionné. Découvrez mes projets créés avec React, Node.js et d'autres technologies modernes.",
    url: 'https://tonsite.com',
    siteName: 'Portfolio AuraSync',
    type: 'website',
    images: [
      {
        url: 'https://tonsite.com/images/auraSync-logo.png',
        width: 1200,
        height: 630,
        alt: "Logo d'AuraSync - Portfolio Développeur Web",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | AuraSync - HACHEM Mehdi - Développeur Web',
    description:
      "Découvrez des projets réalisés avec React, Vue.js, et Node.js. Voyez comment j'apporte des solutions web créatives et performantes.",
    images: ['https://tonsite.com/images/preview-projets.png'],
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
        {/* Ajouter particles.js depuis un CDN */}
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
