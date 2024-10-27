"use client"; // Indique que ce fichier doit être traité comme un composant client (React).

import { useEffect, useRef, useState } from 'react'; // Import des hooks React nécessaires.
import * as THREE from 'three'; // Import de la bibliothèque Three.js pour la création de graphiques 3D.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import du chargeur GLTF pour charger des modèles 3D.
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'; // Import pour la composition d'effets visuels.
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'; // Import pour le rendu de scène.
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'; // Import pour l'effet de lueur (bloom).
import Logo from './Logo'; // Import du composant Logo pour l'affichage du logo.

const PlanetClient = () => {
  // Références pour les éléments de la scène
  const canvasRef = useRef<HTMLDivElement | null>(null); // Référence pour le conteneur du canevas.
  const planetRef = useRef<THREE.Group | null>(null); // Référence pour le modèle de la planète.
  const sunRef = useRef<THREE.Group | null>(null); // Référence pour le modèle du soleil.
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null); // Référence pour la lumière directionnelle.
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0, z: 0 }); // État pour stocker la position du soleil.

  const angleRef = useRef(0); // Référence pour stocker l'angle de rotation.
  const modelsLoadedRef = useRef(false); // Référence pour vérifier si les modèles sont chargés.


  useEffect(() => {
    // Créer une nouvelle scène Three.js.
    const scene = new THREE.Scene();
    scene.background = null; // Définir l'arrière-plan de la scène sur null.

    // Créer une caméra perspective.
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Créer un rendu WebGL avec un fond transparent.
    renderer.setSize(window.innerWidth, window.innerHeight); // Définir la taille du rendu.
    renderer.setPixelRatio(window.devicePixelRatio); // Ajuster le rapport de pixels pour le rendu.

    // Composer pour ajouter des effets visuels.
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera); // Passer la scène et la caméra au rendu.
    composer.addPass(renderPass); // Ajouter le rendu de base à la composition.

    // Créer un effet de lueur.
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), // Dimensions de la scène.
      1.5, // Force de l'effet de lueur.
      1.4, // Flou de l'effet de lueur.
      0.85 // Seuil de l'effet de lueur.
    );
    composer.addPass(bloomPass); // Ajouter l'effet de lueur à la composition.

    // Vérifier si le conteneur du canevas est présent et ajouter le rendu au DOM.
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement); // Ajouter l'élément du rendu au canevas.
    }

    // Créer une lumière ambiante pour la scène.
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Couleur de la lumière ambiante.
    scene.add(ambientLight); // Ajouter la lumière ambiante à la scène.

    // Charger le modèle du soleil.
    const sunLoader = new GLTFLoader(); // Initialiser le chargeur GLTF.
    sunLoader.load('/sun.glb', (gltf) => {
      sunRef.current = gltf.scene; // Stocker le modèle du soleil.
      sunRef.current.scale.set(3, 3, 3); // Échelle du soleil.
      scene.add(sunRef.current); // Ajouter le soleil à la scène.

      const sunnyLight = new THREE.AmbientLight(0xffddaa, 10); // Créer une lumière ambiante pour le soleil.
      sunRef.current.add(sunnyLight); // Ajouter la lumière ambiante au soleil.

      directionalLightRef.current = new THREE.DirectionalLight(0xffddaa, 5.5); // Créer une lumière directionnelle pour simuler la lumière du soleil.
      scene.add(directionalLightRef.current); // Ajouter la lumière directionnelle à la scène.

      modelsLoadedRef.current = true; // Indiquer que les modèles sont chargés.
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du soleil :', error); // Gérer les erreurs de chargement.
    });

    // Charger le modèle de la planète.
    const loader = new GLTFLoader(); // Initialiser un autre chargeur GLTF.
    loader.load('/space_object_005_stone_planet.glb', (gltf) => {
      planetRef.current = gltf.scene; // Stocker le modèle de la planète.
      planetRef.current.position.set(0, 0, 0); // Positionner la planète.
      planetRef.current.scale.set(1.5, 1.5, 1.5); // Échelle de la planète.
      scene.add(planetRef.current); // Ajouter la planète à la scène.

      modelsLoadedRef.current = true; // Indiquer que les modèles sont chargés.
    }, undefined, (error) => {
      console.error('Erreur lors du chargement de la planète :', error); // Gérer les erreurs de chargement.
    });

    // Positionner la caméra.
    camera.position.set(0, 5, 10); // Définir la position de la caméra.
    camera.lookAt(0, 0, 0); // Faire en sorte que la caméra regarde le centre de la scène.

    // Fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate); // Appeler la fonction d'animation à chaque frame.

      if (modelsLoadedRef.current) { // Vérifier si les modèles sont chargés.
        if (planetRef.current) {
          planetRef.current.rotation.y += 0.001; // Faire tourner la planète.
        }
        if (sunRef.current) {
          sunRef.current.rotation.z += 0.005; // Faire tourner le soleil.
        }

        if (sunRef.current) {
          const radius = 950; // Définir le rayon du mouvement du soleil.
          const x = radius * Math.cos(angleRef.current + Math.PI / 5); // Calculer la position x du soleil.
          const z = radius * Math.sin(angleRef.current + Math.PI / 5); // Calculer la position z du soleil.
          const y = Math.sin(angleRef.current) * 256; // Calculer la position y du soleil.

          sunRef.current.position.set(x, y, z); // Définir la position du soleil.
          setSunPosition({ x, y, z }); // Mettre à jour l'état de la position du soleil.
          window.dispatchEvent(new CustomEvent('sunPositionUpdate', { detail: { x, y, z } }));
          // console.log(sunRef.current.position);
        }

        // Mettre à jour la position de la lumière directionnelle pour suivre le soleil.
        if (sunRef.current && directionalLightRef.current) {
          directionalLightRef.current.position.copy(sunRef.current.position); // Copier la position du soleil à la lumière directionnelle.
        }
      }

      composer.render(); // Rendre la scène avec les effets visuels.
    };


    animate(); // Démarrer l'animation.

    // Gérer le défilement de la souris.

    // Créez une variable pour suivre si le défilement est désactivé
    let isScrollingDisabled = false;

    document.body.style.overflow = 'hidden';
    const handleScroll = (event: WheelEvent) => {
      const scrollSpeed = 0.001; // Définir la vitesse de défilement.
      angleRef.current -= event.deltaY * scrollSpeed; // Modifier l'angle en fonction du défilement de la souris.
      const posY = -898.7128817066788;
      const posX = 209.4789404324893;
      const posZ = 307.9206979962166;
      
      if (window.scrollY < 2) {
        // Désactiver le défilement
        document.body.style.overflow = 'hidden';
      
        if (sunRef.current) {
          // Condition pour débloquer le défilement
          if (
            Math.abs(sunRef.current.position.x + 924.9638360244014) < 0.01 &&
            Math.abs(sunRef.current.position.y - 193.74143879882993) < 0.01 &&
            Math.abs(sunRef.current.position.z - 216.6607995162584) < 0.01
          ) {
            // Réactiver le défilement
            document.body.style.overflow = 'auto';
            isScrollingDisabled = false; // Mettre à jour l'état
          }
      
          // Vérifiez si le soleil est à une position spécifique
          if (
      Math.abs(sunRef.current.position.x - posY) < 0.01 &&
      Math.abs(sunRef.current.position.y - posX) < 0.01 &&
      Math.abs(sunRef.current.position.z - posZ) < 0.01
    ) {
            // Si le défilement est désactivé, ne rien faire
            if (isScrollingDisabled) {
              return true; // Sortir de la fonction
            }
          }
        }
      } else {
        // Si on n'est pas en haut de la page, réactiver le défilement
        document.body.style.overflow = 'auto';
        isScrollingDisabled = false; // Permettre le défilement
      }

    };

    // Rendre les événements comme auparavant
    window.addEventListener('wheel', handleScroll); // Ajouter l'écouteur d'événements pour le défilement.

    // Fonction de nettoyage lors de la destruction du composant.
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement); // Retirer l'élément du rendu du canevas.
      }
      window.removeEventListener('wheel', handleScroll); // Retirer l'écouteur d'événements pour le défilement.
    };

  }, []); // Le tableau vide [] indique que cet effet ne doit s'exécuter qu'une fois lors du montage.

  return (
    <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Logo sunPosition={sunPosition} /> {/* Rendre le composant Logo avec la position du soleil */}
    </div>
  );
};

export default PlanetClient; // Exporter le composant PlanetClient pour qu'il puisse être utilisé ailleurs.
