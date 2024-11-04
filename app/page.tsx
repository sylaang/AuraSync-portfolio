'use client';
import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import ParticlesBackgroundClient from './components/ParticlesBackgroundClient'; 
import NavBar from './components/NavBar';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Project from './components/Project';

// Chargement paresseux des composants
const LoadingPage = dynamic(() => import('./components/LoadingPage'), {
  ssr: false, // Désactiver le rendu côté serveur pour ce composant
});
const PlanetServer = dynamic(() => import('./components/PlanetServer'));
const Logo = dynamic(() => import('./components/Logo'));
const PlanetBackgroundServer = dynamic(() => import('./components/PlanetBackgroundServer'));
const Presentation = dynamic(() => import('./components/Presentation'));
const Skills = dynamic(() => import('./components/Skills'));

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 17000); // Réduire le temps de chargement à 2 secondes pour le test

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      {/* {isLoading && (
        <div className="loadpage">
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingPage />
          </Suspense>
        </div>
      )} */}
      <NavBar />
      <div className='element'>
        <ParticlesBackgroundClient />
        <div style={{ minHeight: '100vh' }}>
          <PlanetServer />
          <span className='animate-charcter' style={{ color: 'white', position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center'}}>Scroll down</span>
          <span style={{ position: 'absolute', bottom: '3%', left: '50%', transform: 'translateX(-50%)' }}>
            <FontAwesomeIcon icon={faChevronDown} style={{ color: 'white', fontSize: '1em' }} />
          </span>
        </div>
        <Logo sunPosition={{ x: 0, y: 0, z: 0 }} />
        <main>
          <div id="app">
            <PlanetBackgroundServer />
            <Presentation />
            <Skills />
            <Project />
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
