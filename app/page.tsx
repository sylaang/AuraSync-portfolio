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
import { LazyMotionWrapper } from "@/lib/motion"

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <AOSProvider />
      <div className="cursor"></div>
      <div className="cursor2"></div>
<LazyMotionWrapper>
      <main className="relative min-h-screen max-w-full">
        <div className="min-h-screen">
          <Head>
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
      </LazyMotionWrapper>
    </>
  );
}
