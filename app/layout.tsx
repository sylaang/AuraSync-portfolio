import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AuraSync | Portfolio du développeur web',
  description:
    "Portfolio professionnel d'AuraSync, un développeur web spécialisé dans la création d'expériences numériques belles et fonctionnelles.",
}

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
