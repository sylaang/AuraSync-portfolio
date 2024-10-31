'use client';
import React, { useEffect, useState } from 'react';
import ParticlesBackgroundClient from './components/ParticlesBackgroundClient'; // Assurez-vous que ces importations sont correctes
import PlanetServer from './components/PlanetServer';
import Logo from './components/Logo';
import PlanetBackgroundServer from './components/PlanetBackgroundServer';
import NavBar from './components/NavBar';
import Presentation from './components/Presentation';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Skills from './components/Skills';

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement, par exemple avec une durée de 2 secondes
    const timer = setTimeout(() => {
      setIsLoading(false); // Mettre à jour l'état de chargement
    }, 5000); // Remplacez par la logique de chargement de votre contenu si nécessaire

    return () => clearTimeout(timer); // Nettoyer le timer au démontage du composant
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
     <Head>
        {/* Lien vers Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      {isLoading && (
        <div className="loadpage">
          <div className="loader">
            <h1>Chargement</h1>
            <span className="loader__element"></span>
            <span className="loader__element"></span>
            <span className="loader__element"></span>
          </div>
        </div>
      )}
      < NavBar />
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
          <div id="app" style={{ minHeight: '500vh' }}>
            <PlanetBackgroundServer />
          <Presentation />
          <Skills />
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
