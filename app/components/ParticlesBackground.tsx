"use client";

import { useEffect } from "react";

const ParticlesBackground = () => {
  useEffect(() => {
    const initParticles = async () => {
      await import("particles.js");

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

    initParticles();
  }, []);

  return <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>;
};

export default ParticlesBackground;
