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
  const modelsLoadedRef = useRef(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Ref pour le renderer

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer; // Stocker le renderer dans la référence

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const sunLoader = new GLTFLoader();
    sunLoader.load(
      '/sun.glb',
      (gltf) => {
        sunRef.current = gltf.scene;
        sunRef.current.scale.set(0.1, 0.1, 0.1);
        scene.add(sunRef.current);
        sunRef.current.position.set(6, 0, 10);

        directionalLightRef.current = new THREE.DirectionalLight(0xffddaa, 5.5);
        scene.add(directionalLightRef.current);
        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du soleil :', error);
      }
    );

    const loader = new GLTFLoader();
    loader.load(
      '/space_object_005_stone_planet.glb',
      (gltf) => {
        planetRef.current = gltf.scene;
        planetRef.current.position.set(7, -20, 3);
        planetRef.current.scale.set(2, 2, 2);
        scene.add(planetRef.current);
        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement de la planète :', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelsLoadedRef.current) {
        if (planetRef.current) {
          planetRef.current.rotation.y += 0.001;
        }
        if (sunRef.current) {
          sunRef.current.rotation.z += 0.005;
        }

        if (sunRef.current && directionalLightRef.current) {
          directionalLightRef.current.position.copy(sunRef.current.position);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du défilement avec interpolation
  let targetY = 5;
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      targetY = 5 - scrollY * 0.01;
    };

    const updateCameraPosition = () => {
      if (cameraRef.current) {
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
      }
      requestAnimationFrame(updateCameraPosition);
    };

    window.addEventListener('scroll', handleScroll);
    updateCameraPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }} />;
};

export default PlanetBackgroundClient;
