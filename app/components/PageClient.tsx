'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import ParticlesBackgroundClient from './ParticlesBackgroundClient'; 
import NavBar from './NavBar';
import Cursor from './Cursor';
import PlanetServer from './PlanetServer';
import Logo from './Logo';
import PlanetBackgroundServer from './PlanetBackgroundServer';
import Presentation from './Presentation';
import Skills from './Skills';
import Contact from './Contact';

// Chargement paresseux des composants
const LoadingPageDynamic = dynamic(() => import('./LoadingPage'), {
  ssr: false, // Désactiver le rendu côté serveur pour ce composant
});
const ProjectDynamic = dynamic(() => import('./Project'), {
  ssr: false, // Désactiver le rendu côté serveur pour ce composant
});

const PageClient: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Ajoutez le composant Cursor ici */}
      <Cursor /> 

      {isLoading && (
        <div className="loadpage">
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingPageDynamic />
          </Suspense>
        </div>
      )}

      <NavBar />
      <div className='element'>
        <ParticlesBackgroundClient />
        <div style={{ minHeight: '100vh' }}>
          <PlanetServer />
          <span className='animate-charcter' style={{ color: 'white', position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>Scroll down</span>
          <span style={{ position: 'absolute', bottom: '3%', left: '50%', transform: 'translateX(-50%)' }}></span>
        </div>
        <Logo sunPosition={{ x: 0, y: 0, z: 0 }} />
        <main>
          <div id="app">
            <PlanetBackgroundServer />
            <Presentation />
            <Skills />
            <ProjectDynamic />
            <Contact />

          </div>
        </main>
      </div>
    </>
  );
};

export default PageClient;
