"use client"
import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Vision from '@/components/sections/Vision';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PlanetServer from '@/components/PlanetServer';
import ParticlesBackground from '../components/ParticlesBackground';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    // Force l'application du thème sombre dès le chargement de la page
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <main className="relative min-h-screen">
      <div style={{ minHeight: '100vh' }}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <title>Mon Portfolio | HACHEM Mehdi - Développeur Web</title>
        <meta name="author" content="AuraSync | HACHEM Mehdi" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:site_name" content="Portfolio AuraSync" />
        <meta name="application-name" content="Portfolio AuraSync" />
        <meta name="apple-mobile-web-app-title" content="Portfolio AuraSync" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="Découvrez mes projets en développement web, allant de sites dynamiques à des applications web interactives créées avec React, Node.js, et plus encore." />

        {/* Open Graph */}
        <meta property="og:title" content="Mon Portfolio | HACHEM Mehdi - Développeur Web" />
        <meta property="og:url" content="https://tonsite.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tonsite.com/images/auraSync-logo.png" />
        <meta property="og:image:alt" content="Logo d'AuraSync - Portfolio Développeur Web" />
        <meta http-equiv="Content-Language" content="fr_FR" />
        <meta property="og:author" content="HACHEM Mehdi" />
        <meta property="og:profile" content="https://www.linkedin.com/in/mehdi-hachem-54a8672b0/" />
        <meta property="og:description" content="Je suis HACHEM Mehdi, un développeur web passionné. Découvrez mes projets créés avec React, Node.js et d'autres technologies modernes." />


        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mon Portfolio | HACHEM Mehdi - Développeur Web" />
        <meta name="twitter:description" content="Découvrez des projets réalisés avec React, Vue.js, et Node.js. Voyez comment j'apporte des solutions web créatives et performantes." />
        <meta name="twitter:image" content="https://tonsite.com/images/preview-projets.png" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Développeur Web | Mon Portfolio | HACHEM Mehdi",
              "description": "Découvrez une sélection de mes projets en développement web, allant de sites dynamiques à des applications web interactives.",
              "url": "https://tonsite.com", // L'URL de la page d'accueil
              "image": "https://tonsite.com/images/preview-projets.png", // L'image de ton portfolio ou de ta page d'accueil
              "author": {
                "@type": "Person",
                "name": "HACHEM Mehdi"
              }
            }
          `}
        </script>

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ParticlesBackground />
        <PlanetServer />
        <Navbar />
        <Hero />
        <About />
        <Vision />
        <Skills />
        <section id="projects" aria-labelledby="projects-heading" className="py-20 md:py-28 bg-muted/50">
        <Projects />
</section>

        <Contact />
      </div>
      <Footer />
    </main>
  );
}
