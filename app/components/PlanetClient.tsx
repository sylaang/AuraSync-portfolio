"use client"; // Indique que ce fichier doit être traité comme un composant client (React).

import { useEffect, useRef, useState } from 'react'; // Import des hooks React nécessaires.
import * as THREE from 'three'; // Import de la bibliothèque Three.js pour la création de graphiques 3D.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import du chargeur GLTF pour charger des modèles 3D.
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'; // Import pour la composition d'effets visuels.
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'; // Import pour le rendu de scène.
  import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'; // Import pour l'effet de lueur (bloom).
import Logo from './Logo'; // Import du composant Logo pour l'affichage du logo.

const PlanetClient = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const planetRef = useRef<THREE.Group | null>(null);
  const sunRef = useRef<THREE.Group | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const [sunPosition, setSunPosition] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const isWheelUsedRef = useRef(false);
  const angleRef = useRef(0);
  const modelsLoadedRef = useRef(false);
  const isPausedRef = useRef(false); // État pour vérifier si le soleil est en pause
  const hasScrolledRef = useRef(false); // Nouveau drapeau pour contrôler le défilement
  const sunPositionVector = new THREE.Vector3();
  const directionalLightPositionVector = new THREE.Vector3();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      1.4,
      0.85
    );
    composer.addPass(bloomPass);

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const sunLoader = new GLTFLoader();
    sunLoader.load('/sun.glb', (gltf) => {
      sunRef.current = gltf.scene;
      sunRef.current.scale.set(3, 3, 3);
      scene.add(sunRef.current);

      const sunnyLight = new THREE.AmbientLight(0xffddaa, 10);
      sunRef.current.add(sunnyLight);

      directionalLightRef.current = new THREE.DirectionalLight(0xffddaa, 5.5);
      scene.add(directionalLightRef.current);

      modelsLoadedRef.current = true;
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du soleil :', error);
    });

    const loader = new GLTFLoader();
    loader.load('/space_object_005_stone_planet.glb', (gltf) => {
      planetRef.current = gltf.scene;
      planetRef.current.position.set(0, 0, 0);
      planetRef.current.scale.set(1.5, 1.5, 1.5);
      scene.add(planetRef.current);

      modelsLoadedRef.current = true;
    }, undefined, (error) => {
      console.error('Erreur lors du chargement de la planète :', error);
    });

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        isPausedRef.current = false; // Le soleil reprend son mouvement
        isWheelUsedRef.current = true; // Indique que la molette a été utilisée
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelsLoadedRef.current) {
        if (planetRef.current) {
          planetRef.current.rotation.y -= 0.001; // Rotation de la planète
        }

        if (sunRef.current) {
          // Si le soleil n'est pas en pause, continuez à le faire tourner
          if (!isPausedRef.current) {
            sunRef.current.rotation.z += 0.005;

            const radius = 950;
            const x = radius * Math.cos(angleRef.current + Math.PI / 5);
            const z = radius * Math.sin(angleRef.current + Math.PI / 5);
            const y = Math.sin(angleRef.current) * 256;

            sunPositionVector.set(x, y, z);
            sunRef.current.position.copy(sunPositionVector);
            setSunPosition({ x, y, z });

            // Cible et tolérance
            const targetPosition = { x: 571.2257063020214, y: -255.96388992494303, z: -759.0791740390174 };
            const secondTargetPosition = { x: -877.5570477604809, y: 59.67405581827602, z: -363.859351846162 };
            const tolerance = 0.1;

            const reachedTarget =
              Math.abs(sunRef.current.position.x - targetPosition.x) < tolerance &&
              Math.abs(sunRef.current.position.y - targetPosition.y) < tolerance &&
              Math.abs(sunRef.current.position.z - targetPosition.z) < tolerance;

            const reachedSecondTarget =
              Math.abs(sunRef.current.position.x - secondTargetPosition.x) < tolerance &&
              Math.abs(sunRef.current.position.y - secondTargetPosition.y) < tolerance &&
              Math.abs(sunRef.current.position.z - secondTargetPosition.z) < tolerance;

            if (reachedTarget) {
              isPausedRef.current = true; // Arrêtez le mouvement du soleil
              sunRef.current.rotation.z = 0; // Arrêtez la rotation du soleil
            }
            const smoothScrollTo = (targetY: number, duration: number) => {
              const startY = window.scrollY; // Position actuelle de la scrollbar
              const distance = targetY - startY; // Distance à parcourir
              let startTime: number | null = null;
            
              const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const elapsed = currentTime - startTime; // Temps écoulé depuis le début
            
                // Calculez le progress pour déterminer la fraction du déplacement
                const progress = Math.min(elapsed / duration, 1);
                const easing = 0.5 - Math.cos(progress * Math.PI) / 2; // Fonction d'assouplissement (ease-in-out)
            
                window.scrollTo(0, startY + distance * easing); // Appliquez le décalage
            
                if (elapsed < duration) {
                  requestAnimationFrame(animation); // Continuez l'animation
                }
              };
            
              requestAnimationFrame(animation);
            };
            if (reachedSecondTarget && !hasScrolledRef.current && window.scrollY <= 900) {
              document.body.style.overflow = 'scroll';
              smoothScrollTo(900, 2000); // Défilement vers 900 en 4000 ms
              hasScrolledRef.current = true; // Empêcher les défilements futurs
            }
          }
          // console.log('Position de la scrollbar:', window.scrollY);

          // Logic pour reprendre le mouvement en douceur
          if (isWheelUsedRef.current) {
            isPausedRef.current = false; // Reprenez le mouvement du soleil
            isWheelUsedRef.current = false; // Réinitialisez le flag de molette
            angleRef.current -= 0.0028; // Ajustez ici pour contrôler la vitesse de mouvement
          } else if (!isPausedRef.current) {
            angleRef.current -= 0.0028; // Ajustez ici pour la vitesse de rotation
          }

          // Mise à jour de la lumière directionnelle
          if (directionalLightRef.current) {
            directionalLightPositionVector.copy(sunRef.current.position);
            directionalLightRef.current.position.copy(directionalLightPositionVector);
          }
        }
      }

      composer.render();
    };

    // Ajouter l'écouteur d'événements pour la molette
    window.addEventListener('wheel', handleWheel);

    animate();

    // Code de nettoyage lors du démontage du composant
    document.body.style.overflow = 'hidden';

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      // Retirer l'écouteur d'événements lors du démontage du composant
      window.removeEventListener('wheel', handleWheel);
      // Réinitialiser l'overflow du corps
      document.body.style.overflow = '';
    };

  }, []); // Aucune dépendance car nous ne devons pas re-exécuter l'effet.

  return (
    <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',zIndex:'56' }}>
      <Logo sunPosition={sunPosition} />
    </div>
  );
};

export default PlanetClient;
