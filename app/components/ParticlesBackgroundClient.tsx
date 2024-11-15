"use client";

import { useEffect } from "react";

const ParticlesBackgroundClient = () => {
  useEffect(() => {
    // Charger le script particles.js depuis un CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";  // URL du CDN
    script.async = true;
    script.onload = () => {
      // Initialiser particles.js après que le script soit chargé
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 529,
            density: {
              enable: true,
              value_area: 400.85,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#ffffff",
            },
            polygon: {
              nb_sides: 3,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 0.7,
            random: true,
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.8,
            random: true,
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 80,
              size: 1.4,
              duration: 0.73,
              opacity: 8,
              speed: 3,
            },
          },
        },
        retina_detect: false,
      });
    };

    document.body.appendChild(script);  // Ajouter le script au body

    return () => {
      // Nettoyage du script lorsque le composant est démonté
      document.body.removeChild(script);
    };
  }, []);

  return <div id="particles-js"></div>;
};

export default ParticlesBackgroundClient;
