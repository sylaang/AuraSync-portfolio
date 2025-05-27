"use client"
import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Vision from '@/components/sections/Vision';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import TarifsTable from '@/components/sections/TarifsTable';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PlanetServer from '@/components/PlanetServer';
import ParticlesBackground from '../components/ParticlesBackground';
import Head from 'next/head';
import AOSProvider from '@/components/common/AOSInit';

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
  <>
    <AOSProvider />
    <main className="relative min-h-screen max-w-full">
      <div className="min-h-screen">
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Développeur Web | Mon Portfolio | HACHEM Mehdi",
              "description": "Découvrez une sélection de mes projets en développement web, allant de sites dynamiques à des applications web interactives.",
              "url": "https://aurasync-sooty.vercel.app/",
              "image": "https://tonsite.com/images/preview-projets.png",
              "author": {
                "@type": "Person",
                "name": "HACHEM Mehdi"
              }
            }
          ` }} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ParticlesBackground />
        <PlanetServer />
        <Navbar />
        <Hero />
        <About />
        <Vision />
        <Skills />
        <TarifsTable />
        <section id="projects" className="py-20 md:py-28 bg-muted/50">
          <Projects />
        </section>
        <Contact />
      </div>
      <Footer />
    </main>
  </>
  );
}
