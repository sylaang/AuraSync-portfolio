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
  const isPausedRef = useRef(false);
  const hasScrolledRef = useRef(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
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
      console.error('Erreur lors du chargement de la planete :', error);
    });

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    const canvasElement = canvasRef.current; // Capture la référence

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        isPausedRef.current = false;
        isWheelUsedRef.current = true;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelsLoadedRef.current) {
        if (planetRef.current) {
          planetRef.current.rotation.y -= 0.001;
        }

        if (sunRef.current) {
          if (!isPausedRef.current) {
            sunRef.current.rotation.z += 0.005;

            const radius = 950;
            const x = radius * Math.cos(angleRef.current + Math.PI / 5);
            const z = radius * Math.sin(angleRef.current + Math.PI / 5);
            const y = Math.sin(angleRef.current) * 256;

            sunPositionVector.set(x, y, z);
            sunRef.current.position.copy(sunPositionVector);
            setSunPosition({ x, y, z });

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
              console.log('Soleil atteint la position cible');
              isPausedRef.current = true;
              sunRef.current.rotation.z = 0;
              setButtonVisible(true);
            } else {
              setButtonVisible(false);
            }
            const smoothScrollTo = (targetY: number, duration: number) => {
              const startY = window.scrollY;
              const distance = targetY - startY;
              let startTime: number | null = null;
            
              const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const elapsed = currentTime - startTime;
            
                const progress = Math.min(elapsed / duration, 1);
                const easing = 0.5 - Math.cos(progress * Math.PI) / 2;
            
                window.scrollTo(0, startY + distance * easing);
            
                if (elapsed < duration) {
                  requestAnimationFrame(animation);
                }
              };
            
              requestAnimationFrame(animation);
            };
            if (reachedSecondTarget && !hasScrolledRef.current && window.scrollY <= 900) {
              document.body.style.overflow = 'scroll';
              smoothScrollTo(900, 2000);
              hasScrolledRef.current = true;
            }
          }

          if (isWheelUsedRef.current) {
            isPausedRef.current = false; 
            isWheelUsedRef.current = false; 
            angleRef.current -= 0.0028; 
          } else if (!isPausedRef.current) {
            angleRef.current -= 0.0028; 
          }

          if (directionalLightRef.current) {
            directionalLightPositionVector.copy(sunRef.current.position);
            directionalLightRef.current.position.copy(directionalLightPositionVector);
          }
        }
      }

      composer.render();
    };
    if (canvasRef.current) {
      canvasElement?.addEventListener('wheel', handleWheel);
    }

    animate();

    document.body.style.overflow = 'hidden';

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
        canvasElement?.removeEventListener('wheel', handleWheel);
      }
      document.body.style.overflow = '';
    };

  }, []);

  const handleResumeSun = () => {
    isPausedRef.current = false;
    setButtonVisible(false);
    isWheelUsedRef.current = true;
  };

  return (
    <div>
      <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: '56' }}>
        <Logo sunPosition={sunPosition} />
      </div>

      
      {isButtonVisible && (
        <button className='animate-charcter'
        style={{
          position: 'absolute', // Position fixe pour qu'il reste visible à l'écran
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)', // Centrer le bouton horizontalement
          zIndex: 57, // Pour s'assurer qu'il est au-dessus de tout autre élément
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fond sombre pour contraste
          color: 'white',
          padding: '15px 30px', // Augmenter la taille du bouton
          fontSize: '18px', // Plus grand pour mobile
          cursor: 'none',
          border: 'none',
        }}
          onClick={handleResumeSun}
        >
          Continuer
        </button>
      )}
    </div>
  );
};

export default PlanetClient;