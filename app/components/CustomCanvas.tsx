"use client"; // Indique que ce fichier doit être traité comme un composant client dans un environnement React

import { useEffect, useRef } from 'react'; // Importation des hooks React
import * as THREE from 'three'; // Importation de la bibliothèque Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Importation du chargeur GLTF pour charger des modèles 3D au format GLB

const CustomCanvas = () => {
  // Références pour le canevas et le modèle chargé
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const gltfRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    // Création d'une nouvelle scène Three.js
    const scene = new THREE.Scene();
    
    // Configuration de la caméra avec un champ de vision de 75 degrés
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Création du renderer WebGL avec un fond transparent
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Définition de la taille du renderer
    renderer.setPixelRatio(window.devicePixelRatio); // Ajustement du ratio de pixels pour la haute résolution

    // Ajout du renderer au canevas dans le DOM
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Ajouter des lumières à la scène
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Lumière ambiante pour éclairer uniformément
    scene.add(ambientLight); // Ajout de la lumière ambiante à la scène

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Lumière directionnelle blanche
    directionalLight.position.set(5, 5, 5).normalize(); // Position de la lumière directionnelle
    scene.add(directionalLight); // Ajout de la lumière directionnelle à la scène

    // Charger le modèle GLB
    const loader = new GLTFLoader(); // Création d'une instance du chargeur GLTF
    loader.load('/space_object_005_stone_planet.glb', (gltf) => {
      gltfRef.current = gltf.scene; // Stockage du modèle chargé dans la référence

      // Ajouter le modèle à la scène
      scene.add(gltf.scene); // Ajout du modèle 3D à la scène

      // Centrer le modèle dans la scène
      gltf.scene.position.set(0, 0, 0); // Position du modèle

      // Ajuster l'échelle : ici, 1.5 pour augmenter la taille
      gltf.scene.scale.set(1.5, 1.5, 1.5); // Modifiez les valeurs pour ajuster la taille de la planète

      // Appliquer les textures si nécessaire
      const textureLoader = new THREE.TextureLoader(); // Création d'un chargeur de textures
      const diffuseTexture = textureLoader.load('/space_object_005_stone_planet_diffuse.png'); // Texture diffuse
      const normalTexture = textureLoader.load('/space_object_005_stone_planet_normal.png'); // Texture normale
      const roughnessTexture = textureLoader.load('/space_object_005_stone_planet_roughness.png'); // Texture de rugosité

      // Parcourir tous les enfants du modèle pour appliquer les textures
      gltf.scene.traverse((child) => {
        if (child.isMesh) { // Vérifie si l'enfant est un maillage
          child.material.map = diffuseTexture; // Appliquer la texture diffuse
          child.material.normalMap = normalTexture; // Appliquer la texture normale
          child.material.roughnessMap = roughnessTexture; // Appliquer la texture de rugosité
          child.material.needsUpdate = true; // Indiquer que le matériau a été mis à jour
        }
      });
    }, undefined, (error) => {
      console.error(error); // Gestion des erreurs lors du chargement du modèle
    });

    // Positionner la caméra pour avoir une bonne vue sur le modèle
    camera.position.set(0, 5, 10); // Ajustez la position de la caméra
    camera.lookAt(0, 0, 0); // La caméra regarde le centre de la scène

    // Fonction d'animation pour rendre la scène
    const animate = () => {
      requestAnimationFrame(animate); // Demander à l'animation de s'exécuter à nouveau

      // Faire tourner la planète
      if (gltfRef.current) {
        gltfRef.current.rotation.y += 0.001; // Ajustez la vitesse de rotation
      }

      // Rendu de la scène avec la caméra actuelle
      renderer.render(scene, camera);
    };

    animate(); // Démarrer l'animation

    return () => {
      // Nettoyage lors du démontage du composant
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement); // Retirer le renderer du DOM
      }
    };
  }, []); // Le tableau vide signifie que l'effet ne s'exécute qu'une seule fois après le premier rendu

  // Retourner le div qui contiendra le canevas
  return <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default CustomCanvas; // Exporter le composant pour qu'il puisse être utilisé ailleurs
