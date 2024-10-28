'use client';
import React, { useEffect, useState } from 'react';
import ParticlesBackgroundClient from './components/ParticlesBackgroundClient'; // Assurez-vous que ces importations sont correctes
import PlanetServer from './components/PlanetServer';
import Logo from './components/Logo';
import PlanetBackgroundServer from './components/PlanetBackgroundServer';
import NavBar from './components/NavBar';

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement, par exemple avec une durée de 2 secondes
    const timer = setTimeout(() => {
      setIsLoading(false); // Mettre à jour l'état de chargement
    }, 5000); // Remplacez par la logique de chargement de votre contenu si nécessaire

    return () => clearTimeout(timer); // Nettoyer le timer au démontage du composant
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loadpage">
          <h1>Chargement...</h1>
        </div>
      )}
      <div className='element'>
        < NavBar />
        <ParticlesBackgroundClient />
        <div style={{ minHeight: '100vh' }}>
          <PlanetServer />
        </div>
        <Logo sunPosition={{ x: 0, y: 0, z: 0 }} />
        <main>
        <div id="app" style={{ minHeight: '500vh' }}>
          <PlanetBackgroundServer />
        </div>
        </main>
      </div>
    </>
  );
};

export default Page;
