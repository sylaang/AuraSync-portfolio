'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSunPosition } from './UseSunPosition';



const PlanetBackgroundClient = () => {
  const sunPosition = useSunPosition();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const planetRef = useRef<THREE.Group | null>(null);
  const sunRef = useRef<THREE.Group | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  // console.log(`Position du soleil : ${sunPosition.x}, ${sunPosition.y}, ${sunPosition.z}`);

  // Référence pour stocker l'angle sans déclencher de re-rendu React
  const angleRef = useRef(0);

  // Référence pour s'assurer que les modèles sont chargés
  const modelsLoadedRef = useRef(false);

  // Référence pour la caméra
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera; // Stocker la référence de la caméra

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
      sunRef.current.position.set(6, 0, 10); // Changez ces valeurs selon vos besoins

      directionalLightRef.current = new THREE.DirectionalLight(0xffddaa, 5.5);
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
      planetRef.current.position.set(7, -20, 3);
      planetRef.current.scale.set(2, 2, 2);
      scene.add(planetRef.current);

      // Marquer que les modèles sont chargés
      modelsLoadedRef.current = true;
    }, undefined, (error) => {
      console.error('Erreur lors du chargement de la planète :', error);
    });

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

        // Synchroniser la lumière directionnelle avec le soleil
        if (sunRef.current && directionalLightRef.current) {
          directionalLightRef.current.position.copy(sunRef.current.position);
        }
      }

      renderer.render(scene, camera);
    };

    // Démarrer l'animation
    animate();

    // Fonction pour gérer le défilement et ajuster la position de la caméra
    const handleScroll = () => {
      
      // Vérifie si le corps est en overscroll
      if (document.body.scrollHeight > window.innerHeight) {
        if (cameraRef.current) {
          const scrollY = window.scrollY; // Récupérer la position de défilement
    
          // Ajuste la position Y de la caméra en fonction du défilement
          cameraRef.current.position.y = 5 - scrollY * 0.01; // Ajustez le facteur pour contrôler la vitesse
    
          // Maintenez la position Z fixe
          cameraRef.current.position.z = 10;
    
          // Optionnel : Commentez la ligne suivante si vous ne voulez pas que la caméra regarde le centre
          // cameraRef.current.lookAt(0, 0, 0); // S'assurer que la caméra regarde toujours le centre
        }
      }
    };



    window.addEventListener('scroll', handleScroll);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }} />;
};

export default PlanetBackgroundClient;
