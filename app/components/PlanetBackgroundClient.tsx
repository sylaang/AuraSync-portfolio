'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSunPosition } from './UseSunPosition';

const PlanetBackgroundClient = () => {
  // const sunPosition = useSunPosition();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const earthMixerRef = useRef<THREE.AnimationMixer | null>(null); // Ref pour le mixer
  const earthRef = useRef<THREE.Group | null>(null);
  const stationMixerRef = useRef<THREE.AnimationMixer | null>(null); // Ref pour le mixer
  const phoneRef = useRef<THREE.Group | null>(null);
  const remoteRef = useRef<THREE.Group | null>(null);
  const monitorRef = useRef<THREE.Group | null>(null);
  const stationRef = useRef<THREE.Group | null>(null);
  const nebularRef = useRef<THREE.Group | null>(null);
  const sunRef = useRef<THREE.Group | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const modelsLoadedRef = useRef(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Ref pour le renderer
  const textureLoader = new THREE.TextureLoader();



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
      `/sun.glb?nocache=${Date.now()}`,
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
      `/earth.glb?nocache=${Date.now()}`,
      (gltf) => {
        earthRef.current = gltf.scene;
        earthRef.current.position.set(7, -20, 3);
        earthRef.current.scale.set(1, 1, 1);
        scene.add(earthRef.current);

        // Vérifiez que planetRef est bien défini avant d'utiliser AnimationMixer
        if (earthRef.current && gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(earthRef.current);
          earthMixerRef.current = mixer;

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
            // console.log('Animation de la planète démarrée.');
            action.timeScale = 0.2; // Changez cette valeur pour ajuster la vitesse
          });
        } else {
          // console.warn('Aucune animation trouvée pour le modèle earth');
        }
        // console.log('Earth Ref:', earthRef.current);
        // console.log('Earth Mixer Ref:', earthMixerRef.current);
        // console.log('Animations:', gltf.animations);
        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement de la planète :', error);
      }
    );

    const additionalLoader = new GLTFLoader();
    additionalLoader.load(
      `/need_some_space.glb?nocache=${Date.now()}`,
      (gltf) => {
        nebularRef.current = gltf.scene;
        nebularRef.current.position.set(-6, -38.5, 10); // Position initiale du modèle
        nebularRef.current.scale.set(4, 4, 4); // Échelle du modèle
        scene.add(nebularRef.current);
        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modèle need_some_space :', error);
      }
    );

    const stationLoader = new GLTFLoader();
    stationLoader.load(
      '/space_station.glb',
      (gltf) => {
        stationRef.current = gltf.scene;
        stationRef.current.position.set(0, -75, -180);
        stationRef.current.scale.set(1.5, 1.5, 1.5);
        scene.add(stationRef.current);

        // Vérifiez s'il y a des animations
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(stationRef.current);
          stationMixerRef.current = mixer;

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        } else {
          console.warn('Aucune animation trouvée pour le modèle space_station');
        }

        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modèle space_station :', error);
      }
    );




    const phoneLoader = new GLTFLoader();
    phoneLoader.load('/phone.glb', (gltf) => {
      phoneRef.current = gltf.scene;
    
      if (phoneRef.current) {
        // Position et échelle de base
        phoneRef.current.position.set(400, -73.5, -78);
        phoneRef.current.scale.set(1, 1, 1);
        scene.add(phoneRef.current);
    
        phoneRef.current.rotation.x = THREE.MathUtils.degToRad(-25); // Incliner vers l'avant
        phoneRef.current.rotation.y = THREE.MathUtils.degToRad(-5); // Incliner vers la droite
    
        // Charger et appliquer la texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/ddinteriorshomePhone.png', (texture) => {
          texture.repeat.set(1, 1); // Ajuste la répétition (pour un étirement ou un rétrécissement)
          texture.offset.set(0.1, 0.1); // Décalage de la texture pour un meilleur cadrage
          if (phoneRef.current) {
            phoneRef.current.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                  map: texture, // Appliquer la texture chargée
                  color: new THREE.Color(1, 1, 1), // Couleur de base
                  roughness: 0.5, // Valeur de rugosité
                  emissive: new THREE.Color(0xffffff), // Couleur émissive
                  emissiveIntensity: 0.000000001, // Intensité émissive
                  transparent: false, // Pas de transparence
                });
                child.material.needsUpdate = true; // Mettre à jour le matériau
              }
            });
          }
        });
    
        // Position cible et vitesse de l'animation
        let targetPosition = 400; // Position cible pour l'animation
        const speed = 0.05; // Vitesse de l'animation
    
        // Ajouter un écouteur pour le défilement de la page
        window.addEventListener('scroll', () => {
          if (phoneRef.current) {
            if (window.scrollY >= 4300) {
              targetPosition = 2; // Nouvelle position cible
            } else {
              targetPosition = 400; // Position par défaut
            }
          }
        });
    
        // Animation progressive de la position
        const animatePosition = () => {
          if (phoneRef.current) {
            // Interpolation progressive vers la position cible
            phoneRef.current.position.x += (targetPosition - phoneRef.current.position.x) * speed;
          }
          requestAnimationFrame(animatePosition);
        };
    
        animatePosition(); // Démarre l'animation
      }
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modèle phone :', error);
    });

    
    const remoteLoader = new GLTFLoader();
    remoteLoader.load('/AppleTV_Remote_modelOnly.glb', (gltf) => {
      remoteRef.current = gltf.scene;
    
      if (remoteRef.current) {
        // Position et échelle de base
        remoteRef.current.position.set(400, -70.5, -70);
        remoteRef.current.scale.set(1, 1, 1);
        scene.add(remoteRef.current);
    
        remoteRef.current.rotation.x = THREE.MathUtils.degToRad(0); // Incliner vers l'avant
        remoteRef.current.rotation.y = THREE.MathUtils.degToRad(20); // Incliner vers la droite
    
        // Parcours du modèle pour explorer les objets
        remoteRef.current.traverse((child) => {
          if (child.name === 'button' && child instanceof THREE.Mesh) {  // Cible uniquement l'objet nommé 'button' et vérifie s'il est un Mesh
            console.log("Objet 'button' trouvé :", child);
        
            // Appliquer un matériau émissif rouge sur le bouton
            child.material = new THREE.MeshStandardMaterial({
              color: 0x00008b, // Vert lumineux
              roughness: 0.5,
              emissive: new THREE.Color(0x00ff00), // Émissif vert
              emissiveIntensity: 2, // Intensité émissive pour plus de luminosité
            });
        
            // Assurer que le matériau soit mis à jour
            child.material.needsUpdate = true;
        
            // Créer une lumière ponctuelle pour l'objet 'button'
            const buttonLight = new THREE.PointLight(0x00008b, 5, 1); // Couleur rouge, intensité et portée
            buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Placer la lumière à l'emplacement du bouton
            scene.add(buttonLight); // Ajouter la lumière à la scène
        
            // Animation de pulsation pour la lumière
            const animateLight = () => {
              const time = Date.now() * 0.005; // Récupère l'heure pour une animation fluide
              buttonLight.intensity = 5 + Math.sin(time) * 3; // Pulsation de l'intensité
              buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Assure que la lumière suit le bouton
              requestAnimationFrame(animateLight); // Boucle d'animation
            };
        
            animateLight(); // Démarre l'animation
          }
          if (child.name === 'button003' && child instanceof THREE.Mesh) {  // Cible uniquement l'objet nommé 'button' et vérifie s'il est un Mesh
            console.log("Objet 'button' trouvé :", child);
        
            // Appliquer un matériau émissif rouge sur le bouton
            child.material = new THREE.MeshStandardMaterial({
              color: 0x00ff00, // Vert lumineux
              roughness: 0.5,
              emissive: new THREE.Color(0x00ff00), // Émissif vert
              emissiveIntensity: 2, // Intensité émissive pour plus de luminosité
            });
        
            // Assurer que le matériau soit mis à jour
            child.material.needsUpdate = true;
        
            // Créer une lumière ponctuelle pour l'objet 'button'
            const buttonLight = new THREE.PointLight(0x00ff00, 5, 1); // Couleur rouge, intensité et portée
            buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Placer la lumière à l'emplacement du bouton
            scene.add(buttonLight); // Ajouter la lumière à la scène
        
            // Animation de pulsation pour la lumière
            const animateLight = () => {
              const time = Date.now() * 0.005; // Récupère l'heure pour une animation fluide
              buttonLight.intensity = 5 + Math.sin(time) * 3; // Pulsation de l'intensité
              buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Assure que la lumière suit le bouton
              requestAnimationFrame(animateLight); // Boucle d'animation
            };
        
            animateLight(); // Démarre l'animation
          }
        });
        
        
    
        // Position cible et vitesse de l'animation
        let targetPosition = 400; // Position cible pour l'animation
        const speed = 0.05; // Vitesse de l'animation
    
        // Ajouter un écouteur pour le défilement de la page
        window.addEventListener('scroll', () => {
          if (remoteRef.current) {
            if (window.scrollY >= 4300) {
              targetPosition = 5; // Nouvelle position cible
            } else {
              targetPosition = 400; // Position par défaut
            }
          }
        });
    
        // Animation progressive de la position
        const animatePosition = () => {
          if (remoteRef.current) {
            remoteRef.current.position.x += (targetPosition - remoteRef.current.position.x) * speed;
          }
          requestAnimationFrame(animatePosition);
        };
    
        animatePosition(); // Démarre l'animation
      }
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modèle phone :', error);
    });
    



    
    const monitorLoader = new GLTFLoader();
    monitorLoader.load('/ultrawide_monitor.glb', (gltf) => {
      monitorRef.current = gltf.scene;
    
      if (monitorRef.current) {
        // Position et échelle de base
        monitorRef.current.position.set(-400, -130.5, -200);
        monitorRef.current.scale.set(2, 2, 2);
        monitorRef.current.rotation.x = THREE.MathUtils.degToRad(160);
        monitorRef.current.rotation.y = THREE.MathUtils.degToRad(180);
        scene.add(monitorRef.current);
    
        // Charger et appliquer la texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/ddinteriorshomeMonitor.png', (texture) => {
          if (monitorRef.current) {
            monitorRef.current.traverse((child) => {
              if (child instanceof THREE.Mesh && child.name.includes("Screen")) {
                child.material = new THREE.MeshBasicMaterial({
                  map: texture,
                });
                child.material.needsUpdate = true;
              }
            });
          }
        });
    
        // Position cible et vitesse de l'animation
        let targetPosition = -400; // Position cible pour l'animation
        const speed = 0.03; // Vitesse de l'animation
    
        // Ajouter un écouteur pour le défilement de la page
        window.addEventListener('scroll', () => {
          if (monitorRef.current) {
            if (window.scrollY >= 4300) {
              targetPosition = 0; // Nouvelle position cible
            } else {
              targetPosition = -400; // Position par défaut
            }
          }
        });
    
        // Animation progressive de la position
        const animatePosition = () => {
          if (monitorRef.current) {
            // Interpolation progressive vers la position cible
            monitorRef.current.position.x += (targetPosition - monitorRef.current.position.x) * speed;
          }
          requestAnimationFrame(animatePosition);
        };
    
        animatePosition(); // Démarre l'animation
      }
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modèle monitor :', error);
    });





   






    const clock = new THREE.Clock();
    let animationId: number; // Variable pour stocker l'identifiant d'animation
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta(); // Délai entre les frames pour l'animation

      if (modelsLoadedRef.current) {
        if (sunRef.current) {
          sunRef.current.rotation.z += 0.005;
        }

        // Mise à jour du mixer pour jouer les animations
        if (stationMixerRef.current) {
          stationMixerRef.current.update(delta);
        }

        if (earthMixerRef.current) {
          earthMixerRef.current.update(delta);
        }

        if (sunRef.current && directionalLightRef.current) {
          directionalLightRef.current.position.copy(sunRef.current.position);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId); // Annuler l'animation avec l'identifiant
      // Nettoyage des éléments
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }

      // Dispose du renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null; // Nettoyez la référence
      }

      // Dispose des lumières
      directionalLightRef.current = null;
      ambientLight.dispose();

      // Dispose des groupes de scène
      if (sunRef.current) {
        scene.remove(sunRef.current);
        sunRef.current = null;
      }
      if (earthRef.current) {
        scene.remove(earthRef.current);
        earthRef.current = null;
      }
      if (stationRef.current) {
        scene.remove(stationRef.current);
        stationRef.current = null;
      }
      if (nebularRef.current) {
        scene.remove(nebularRef.current);
        nebularRef.current = null;
      }

      // Arrêtez l'animation
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
  const maxScrollY = 3600; // Limite de défilement maximale
  const initialCameraZ = 10; // Position Z initiale de la caméra
  const zoomFactor = 0.005; // Facteur de zoom pour un zoom plus lent
  const maxZoomDistance = 10; // Distance de zoom maximale (ajustez selon vos besoins)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Vérifier si l'utilisateur essaie de défiler vers le bas
      if (scrollY >= maxScrollY) {
        // Rester à maxScrollY sans retour en arrière
        // window.scrollTo(0, maxScrollY); 

        // Calculer le montant de zoom basé sur la position de défilement
        const zoomAmount = Math.min((scrollY - maxScrollY) * zoomFactor, maxZoomDistance);
        if (cameraRef.current) {
          // Appliquer le zoom progressif
          cameraRef.current.position.z = initialCameraZ - zoomAmount; // Zoomer vers l'image

          // Ajustez le FOV pour un effet de zoom
          cameraRef.current.fov = 50 - (zoomAmount * 5); // Ajuster le FOV pour un effet de zoom plus doux
          cameraRef.current.updateProjectionMatrix(); // Mettre à jour la matrice de projection
        }
      } else {
        targetY = 5 - scrollY * 0.01; // Calculer la nouvelle position de la caméra
      }

      // console.log('Position de défilement Y:', scrollY); // Ajout de console.log ici
    };

    const updateCameraPosition = () => {
      if (cameraRef.current) {
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
      }
      requestAnimationFrame(updateCameraPosition);
    };

    // Écoutez l'événement de défilement
    window.addEventListener('scroll', handleScroll);
    updateCameraPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex:'58' }} />;
};

export default PlanetBackgroundClient;
