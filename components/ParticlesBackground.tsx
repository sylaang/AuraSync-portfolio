'use client';

import { useEffect } from 'react';
// Déclare que particlesJS existe sur l'objet global 'window'
declare global {
    interface Window {
      particlesJS: (id: string, options: any) => void;
    }
  }
const ParticlesBackground = () => {
  useEffect(() => {
    const particlesJS = window.particlesJS;

    // Charger la configuration du fichier JSON depuis le répertoire public
    fetch('/particlesjs-config.json')
      .then((response) => response.json())
      .then((data) => {
        particlesJS('particles-js', data);
      });
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    ></div>
  );
};

export default ParticlesBackground;
