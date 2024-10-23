"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const PlanetClient = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const planetRef = useRef<THREE.Group | null>(null);
  const sunRef = useRef<THREE.Group | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Référence pour stocker l'angle sans déclencher de re-rendu React
  const angleRef = useRef(0);
  
  // Référence pour s'assurer que les modèles sont chargés
  const modelsLoadedRef = useRef(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }
  
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Charger le modèle du soleil
    const sunLoader = new GLTFLoader();
    sunLoader.load('/sun.glb', (gltf) => {
      sunRef.current = gltf.scene;
      sunRef.current.scale.set(0.1, 0.1, 0.1);
      scene.add(sunRef.current);
  
      directionalLightRef.current = new THREE.DirectionalLight(0xffffff, 5.5);
      scene.add(directionalLightRef.current);
      
      // Marquer que les modèles sont chargés
      modelsLoadedRef.current = true;
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du soleil :', error);
    });
  
    // Charger le modèle de la planète
    const loader = new GLTFLoader();
    loader.load('/space_object_005_stone_planet.glb', (gltf) => {
      planetRef.current = gltf.scene;
      planetRef.current.position.set(0, 0, 0);
      planetRef.current.scale.set(1.5, 1.5, 1.5);
      scene.add(planetRef.current);
      
      // Marquer que les modèles sont chargés
      modelsLoadedRef.current = true;
    }, undefined, (error) => {
      console.error('Erreur lors du chargement de la planète :', error);
    });
  
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  
    const animate = () => {
      requestAnimationFrame(animate);

      // Assurez-vous que les modèles sont chargés avant d'animer
      if (modelsLoadedRef.current) {
        // Animation de la planète
        if (planetRef.current) {
          planetRef.current.rotation.y += 0.001; // Rotation de la planète
        }
        if (sunRef.current) {
          sunRef.current.rotation.z += 0.005; // Rotation de la planète
        }
        // Rotation du soleil autour de la planète (sud-ouest à nord-est)
        if (sunRef.current) {
          const radius = 5;
          // Utilisation de Math.cos et Math.sin pour le mouvement en diagonale
          const x = radius * Math.cos(angleRef.current + Math.PI / 4); // Ajuster l'angle pour le mouvement diagonal
          const z = radius * Math.sin(angleRef.current + Math.PI / 4); // Ajuster l'angle pour le mouvement diagonal
          const y = Math.sin(angleRef.current) * 2; // Montée et descente du soleil

          sunRef.current.position.set(x, y, z); // Positionner le soleil
        }

        // Synchroniser la lumière directionnelle avec le soleil
        if (sunRef.current && directionalLightRef.current) {
          directionalLightRef.current.position.copy(sunRef.current.position);
        }
      }

      renderer.render(scene, camera);
    };
  
    // Démarrer l'animation
    animate();

    // Fonction pour gérer le défilement et ajuster l'angle
    const handleScroll = (event: WheelEvent) => {
      const scrollSpeed = 0.001; // Vitesse de rotation plus fluide
      angleRef.current += event.deltaY * scrollSpeed; // Ajustement de l'angle sans redéclencher useEffect
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default PlanetClient;
