'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { useSunPosition } from './UseSunPosition';

const PlanetBackgroundClient = () => {
  // const sunPosition = useSunPosition();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const earthMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const phoneRef = useRef<THREE.Group | null>(null);
  const remoteRef = useRef<THREE.Group | null>(null);
  const monitorRef = useRef<THREE.Group | null>(null);
  const stationRef = useRef<THREE.Group | null>(null);
  const stationMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const blackHoleRef = useRef<THREE.Group | null>(null);
  const blackHoleMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const nebularRef = useRef<THREE.Group | null>(null);
  const sunRef = useRef<THREE.Group | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const modelsLoadedRef = useRef(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const textureLoader = new THREE.TextureLoader();
  // const [phoneTexture, setPhoneTexture] = useState('/ddinteriorshomePhone.png');



  useEffect(() => {
    // Création de la scène
    const scene = new THREE.Scene();

    const isMobile = window.innerWidth < 768;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isSafariMobile = isMobile && isSafari;
    const fov = window.innerWidth < 768 ? 75 : 50;
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Initialiser le renderer avec un antialias activé uniquement pour les écrans larges (desktops)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768 // Désactiver l'antialias pour les mobiles pour améliorer les performances
    });

    // Redimensionner le renderer selon la taille de la fenêtre
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Limiter le `pixelRatio` à 2 pour éviter une charge graphique trop élevée sur les mobiles
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Ajouter le canvas du renderer dans le conteneur DOM s'il n'est pas déjà présent
    if (canvasRef.current && !canvasRef.current.contains(renderer.domElement)) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Ajouter une lumière ambiante pour éclairer toute la scène
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // === Chargement du modèle 3D du Soleil ===
    const sunLoader = new GLTFLoader();
    sunLoader.load(
      `/sun.glb?nocache=${Date.now()}`, // Utiliser `nocache` pour éviter la mise en cache pendant le développement
      (gltf) => {
        sunRef.current = gltf.scene;

        // Ajuster l'échelle du modèle
        sunRef.current.scale.set(0.1, 0.1, 0.1);
        scene.add(sunRef.current);

        // Position initiale du Soleil
        sunRef.current.position.set(6, 0, 10);

        // Ajouter une lumière directionnelle pour simuler la lumière du Soleil
        directionalLightRef.current = new THREE.DirectionalLight(0xffddaa, 5.5);
        scene.add(directionalLightRef.current);

        // Indiquer que le modèle est chargé
        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => console.error('Erreur lors du chargement du Soleil :', error)
    );

    const loader = new GLTFLoader();
    const modelPath = isMobile ? `/earthMobile.glb?nocache=${Date.now()}` : `/earth.glb?nocache=${Date.now()}`;
    loader.load(
      modelPath,
      (gltf) => {
        earthRef.current = gltf.scene;

        if (isSafariMobile) {
          // Configuration spécifique pour Safari Mobile
          earthRef.current.position.set(4, -22, 5);
          earthRef.current.scale.set(0.7, 0.7, 0.7);
        } else if (isMobile) {
          // Configuration pour les autres mobiles
          earthRef.current.position.set(3, -20, 3);
          earthRef.current.scale.set(0.8, 0.8, 0.8);
        } else {
          // Configuration pour desktop
          earthRef.current.position.set(7, -20, 3);
          earthRef.current.scale.set(1, 1, 1);
        }

        scene.add(earthRef.current);

        // Ajout d'une animation si le modèle comporte des animations
        if (earthRef.current && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(earthRef.current);
          earthMixerRef.current = mixer;

          // Lecture des animations du modèle
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();

            // Réduire la vitesse de l'animation pour une meilleure apparence
            action.timeScale = 0.2;
          });
        }

        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => console.error('Erreur lors du chargement de la Terre :', error)
    );

    const additionalLoader = new GLTFLoader();
    additionalLoader.load(
      `/need_some_space.glb?nocache=${Date.now()}`,
      (gltf) => {
        nebularRef.current = gltf.scene;

        // Position et échelle du modèle supplémentaire
        nebularRef.current.position.set(-6, -38.5, 10);
        nebularRef.current.scale.set(4, 4, 4);
        scene.add(nebularRef.current);
        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => console.error('Erreur lors du chargement du modèle need_some_space :', error)
    );

    const stationLoader = new GLTFLoader();
    stationLoader.load(
      '/space_station.glb',
      (gltf) => {
        stationRef.current = gltf.scene;
        stationRef.current.position.set(20, -440, -800);

        stationRef.current.scale.set(2.5, 2.5, 2.5);
        scene.add(stationRef.current);

        // VÃ©rifiez s'il y a des animations
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(stationRef.current);
          stationMixerRef.current = mixer;

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        } else {
          console.warn('Aucune animation trouvÃ©e pour le modÃ¨le space_station');
        }

        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modÃ¨le space_station :', error);
      }
    );



    let currentTextureIndex = 0;
    const texturesMonitor = [
      '/pictures/ddinteriorshomeMonitor.png',
      '/pictures/phillipePopieulMonitor.png',
    ];
    const texturesPhone = [
      '/pictures/ddinteriorshomePhone.png',
      '/pictures/phillipePopieulPhone.png',
    ];
    const phoneLoader = new GLTFLoader();
    phoneLoader.load('/phone.glb', (gltf) => {
      phoneRef.current = gltf.scene;

      if (phoneRef.current) {
        // Position et Ã©chelle de base
        phoneRef.current.position.set(400, -73.5, -78);
        phoneRef.current.scale.set(3, 3, 3);
        scene.add(phoneRef.current);

        phoneRef.current.rotation.x = THREE.MathUtils.degToRad(-25); // Incliner vers l'avant
        phoneRef.current.rotation.y = THREE.MathUtils.degToRad(-5); // Incliner vers la droite

        // Charger et appliquer la texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(texturesPhone[currentTextureIndex], (texture) => {
          texture.repeat.set(1, 1); // Ajuste la rÃ©pÃ©tition (pour un Ã©tirement ou un rÃ©trÃ©cissement)
          texture.offset.set(0.1, 0.1); // DÃ©calage de la texture pour un meilleur cadrage
          if (phoneRef.current) {
            phoneRef.current.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                  map: texture, // Appliquer la texture chargÃ©e
                  color: new THREE.Color(1, 1, 1), // Couleur de base
                  roughness: 0.5, // Valeur de rugositÃ©
                  emissive: new THREE.Color(0xffffff), // Couleur Ã©missive
                  emissiveIntensity: 0.000000001, // IntensitÃ© Ã©missive
                  transparent: false, // Pas de transparence
                });
                child.material.needsUpdate = true; // Mettre Ã  jour le matÃ©riau
              }
            });
          }
        });

        // Position cible et vitesse de l'animation
        let targetPosition = 400; // Position cible pour l'animation
        const speed = 0.05; // Vitesse de l'animation

        // Ajouter un Ã©couteur pour le dÃ©filement de la page
        window.addEventListener('scroll', () => {
          if (phoneRef.current) {
            if (window.scrollY >= 4300 && window.scrollY <= 5400) {
              targetPosition = 2; // Nouvelle position cible
            } else {
              targetPosition = 400; // Position par dÃ©faut
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

        animatePosition(); // DÃ©marre l'animation
      }
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modÃ¨le phone :', error);
    });



    const remoteLoader = new GLTFLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    remoteLoader.load('/AppleTV_Remote_modelOnly.glb', (gltf) => {
      remoteRef.current = gltf.scene;

      if (remoteRef.current) {
        // Position et Ã©chelle de base
        remoteRef.current.position.set(400, -70.5, -70);
        remoteRef.current.scale.set(1, 1, 1);
        scene.add(remoteRef.current);

        remoteRef.current.rotation.x = THREE.MathUtils.degToRad(0); // Incliner vers l'avant
        remoteRef.current.rotation.y = THREE.MathUtils.degToRad(20); // Incliner vers la droite

        // Parcours du modÃ¨le pour explorer les objets
        remoteRef.current.traverse((child) => {
          if (child.name === 'button' && child instanceof THREE.Mesh) {  // Cible uniquement l'objet nommÃ© 'button' et vÃ©rifie s'il est un Mesh
            // console.log("Objet 'button' trouvÃ© :", child);

            // Appliquer un matÃ©riau Ã©missif rouge sur le bouton
            child.material = new THREE.MeshStandardMaterial({
              // color: 0x00008b, // Vert lumineux
              roughness: 0.5,
              // emissive: new THREE.Color(0x00ff00), // Ã‰missif vert
              emissiveIntensity: 2, // IntensitÃ© Ã©missive pour plus de luminositÃ©
            });

            // Assurer que le matÃ©riau soit mis Ã  jour
            child.material.needsUpdate = true;

            // CrÃ©er une lumiÃ¨re ponctuelle pour l'objet 'button'
            const buttonLight = new THREE.PointLight(0x00008b, 5, 1); // Couleur rouge, intensitÃ© et portÃ©e
            buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Placer la lumiÃ¨re Ã  l'emplacement du bouton
            scene.add(buttonLight); // Ajouter la lumiÃ¨re Ã  la scÃ¨ne

            // Animation de pulsation pour la lumiÃ¨re
            const animateLight = () => {
              const time = Date.now() * 0.005; // RÃ©cupÃ¨re l'heure pour une animation fluide
              buttonLight.intensity = 5 + Math.sin(time) * 3; // Pulsation de l'intensitÃ©
              buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Assure que la lumiÃ¨re suit le bouton
              requestAnimationFrame(animateLight); // Boucle d'animation
            };

            animateLight(); // DÃ©marre l'animation
          }
          if (child.name === 'button003' && child instanceof THREE.Mesh) {  // Cible uniquement l'objet nommÃ© 'button003' et vÃ©rifie s'il est un Mesh
            // console.log("Objet 'button003' trouvÃ© :", child);

            // Appliquer un matÃ©riau Ã©missif rouge sur le bouton
            child.material = new THREE.MeshStandardMaterial({
              color: 0x00ff00, // Vert lumineux
              roughness: 0.5,
              emissive: new THREE.Color(0x00ff00), // Ã‰missif vert
              emissiveIntensity: 2, // IntensitÃ© Ã©missive pour plus de luminositÃ©
            });

            // Assurer que le matÃ©riau soit mis Ã  jour
            child.material.needsUpdate = true;

            child.userData.onClick = () => {
              // console.log('Changing phone texture...');
              currentTextureIndex = (currentTextureIndex + 1) % texturesPhone.length; // Passe Ã  l'image suivante dans le tableau

              textureLoader.load(texturesPhone[currentTextureIndex], (texture) => {
                // VÃ©rifier si phoneRef.current existe avant d'accÃ©der Ã  son contenu
                if (phoneRef.current) {
                  phoneRef.current.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                      child.material.map = texture;
                      child.material.needsUpdate = true;
                    }
                  });
                }
              });
              textureLoader.load(texturesMonitor[currentTextureIndex], (texture) => {

                if (monitorRef.current) {
                  monitorRef.current.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                      child.material.map = texture;
                      child.material.needsUpdate = true;
                    }
                  });
                }
              });

            };


            // CrÃ©er une lumiÃ¨re ponctuelle pour l'objet 'button003'
            const buttonLight = new THREE.PointLight(0x00ff00, 5, 1); // Couleur verte, intensitÃ© et portÃ©e
            buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Placer la lumiÃ¨re Ã  l'emplacement du bouton
            scene.add(buttonLight); // Ajouter la lumiÃ¨re Ã  la scÃ¨ne

            // Animation de pulsation pour la lumiÃ¨re
            const animateLight = () => {
              const time = Date.now() * 0.005; // RÃ©cupÃ¨re l'heure pour une animation fluide
              buttonLight.intensity = 5 + Math.sin(time) * 3; // Pulsation de l'intensitÃ©
              buttonLight.position.copy(child.getWorldPosition(new THREE.Vector3())); // Assure que la lumiÃ¨re suit le bouton
              requestAnimationFrame(animateLight); // Boucle d'animation
            };

            animateLight(); // DÃ©marre l'animation
          }
        });

        // Position cible et vitesse de l'animation
        let targetPosition = 400; // Position cible pour l'animation
        const speed = 0.05; // Vitesse de l'animation

        // Ajouter un Ã©couteur pour le dÃ©filement de la page
        window.addEventListener('scroll', () => {
          if (remoteRef.current) {
            if (window.scrollY >= 4300 && window.scrollY <= 5400) {
              targetPosition = 5; // Nouvelle position cible
            } else {
              targetPosition = 400; // Position par dÃ©faut
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

        animatePosition(); // DÃ©marre l'animation
      }
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modÃ¨le phone :', error);
    });

    // DÃ©claration de la fonction handleClick
    const handleClick = (event: MouseEvent) => {
      // Calculer la position de la souris dans l'espace normalisÃ© (-1 Ã  +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // CrÃ©er un rayon depuis la camÃ©ra vers la position de la souris
      raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld); // Origine du rayon depuis la camÃ©ra
      raycaster.ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(raycaster.ray.origin).normalize(); // Direction du rayon

      // VÃ©rifier les objets intersectÃ©s dans la scÃ¨ne
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const child = intersects[i].object;
        if (child.name === 'button003' && child instanceof THREE.Mesh) {
          // ExÃ©cuter l'action dÃ©finie dans userData
          if (child.userData.onClick) {
            child.userData.onClick(); // ExÃ©cution de l'action du bouton
          }
        }
      }
    };

    // Ajouter l'Ã©couteur d'Ã©vÃ©nements pour le clic
    window.addEventListener('click', handleClick);





    const monitorLoader = new GLTFLoader();
    monitorLoader.load('/ultrawide_monitor.glb', (gltf) => {
      monitorRef.current = gltf.scene;

      if (monitorRef.current) {
        // Position et Ã©chelle de base
        monitorRef.current.position.set(-400, -130.5, -200);
        monitorRef.current.scale.set(4, 4, 4);
        monitorRef.current.rotation.x = THREE.MathUtils.degToRad(160);
        monitorRef.current.rotation.y = THREE.MathUtils.degToRad(180);
        scene.add(monitorRef.current);

        // Charger et appliquer la texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(texturesMonitor[currentTextureIndex], (texture) => {
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

        // Ajouter un Ã©couteur pour le dÃ©filement de la page
        window.addEventListener('scroll', () => {
          if (monitorRef.current) {
            if (window.scrollY >= 4300 && window.scrollY <= 5400) {
              targetPosition = 0; // Nouvelle position cible
            } else {
              targetPosition = -400; // Position par dÃ©faut
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

        animatePosition(); // DÃ©marre l'animation
      }
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modÃ¨le monitor :', error);
    });






    const blackHoleLoader = new GLTFLoader();
    blackHoleLoader.load(
      `/blackhole.glb?nocache=${Date.now()}`,

      (gltf) => {
        blackHoleRef.current = gltf.scene;
        blackHoleRef.current.position.set(0, -480, -900);
        blackHoleRef.current.scale.set(8, 8, 8);
        blackHoleRef.current.rotation.x = THREE.MathUtils.degToRad(77);

        scene.add(blackHoleRef.current);

        // VÃ©rifiez s'il y a des animations
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(blackHoleRef.current);
          blackHoleMixerRef.current = mixer;

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        } else {
          console.warn('Aucune animation trouvÃ©e pour le modÃ¨le black_hole');
        }

        modelsLoadedRef.current = true;
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modÃ¨le black_hole :', error);
      }
    );













    const clock = new THREE.Clock();
    let animationId: number; // Variable pour stocker l'identifiant d'animation
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta(); // DÃ©lai entre les frames pour l'animation

      if (modelsLoadedRef.current) {
        if (sunRef.current) {
          sunRef.current.rotation.z += 0.005;
        }

        // Mise Ã  jour du mixer pour jouer les animations
        if (stationMixerRef.current) {
          stationMixerRef.current.update(delta);
        }

        if (earthMixerRef.current) {
          earthMixerRef.current.update(delta);
        }

        if (sunRef.current && directionalLightRef.current) {
          directionalLightRef.current.position.copy(sunRef.current.position);
        }

        if (blackHoleMixerRef.current) {
          blackHoleMixerRef.current.update(delta);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId); // Annuler l'animation avec l'identifiant
      // Nettoyage des Ã©lÃ©ments
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }


      // Dispose du renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null; // Nettoyez la rÃ©fÃ©rence
      }

      // Dispose des lumiÃ¨res
      directionalLightRef.current = null;
      ambientLight.dispose();

      // Dispose des groupes de scÃ¨ne
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

      // ArrÃªtez l'animation
    };


  }, []);

  // Gestion du redimensionnement de la fenÃªtre
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        // Mise à jour de la taille du renderer
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);

        // Mise à jour de l'aspect ratio de la caméra
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    // Écouteur d'événement pour le redimensionnement
    window.addEventListener('resize', handleResize);

    // Nettoyage : retirer l'écouteur lors du démontage
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du dÃ©filement avec interpolation
  let targetY = 5;
  const maxScrollY = 3600;
  const initialCameraZ = 10;
  const zoomFactor = 0.005;
  const maxZoomDistance = 10;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // VÃ©rifier si l'utilisateur essaie de dÃ©filer vers le bas
      if (scrollY >= maxScrollY) {
        // Rester Ã  maxScrollY sans retour en arriÃ¨re
        // window.scrollTo(0, maxScrollY); 

        // Calculer le montant de zoom basÃ© sur la position de dÃ©filement
        const zoomAmount = Math.min((scrollY - maxScrollY) * zoomFactor, maxZoomDistance);
        if (cameraRef.current) {
          // Appliquer le zoom progressif
          cameraRef.current.position.z = initialCameraZ - zoomAmount; // Zoomer vers l'image

          // Ajustez le FOV pour un effet de zoom
          cameraRef.current.fov = 50 - (zoomAmount * 5); // Ajuster le FOV pour un effet de zoom plus doux
          cameraRef.current.updateProjectionMatrix(); // Mettre Ã  jour la matrice de projection
        }
      } else {
        targetY = 5 - scrollY * 0.01; // Calculer la nouvelle position de la camÃ©ra
      }

      // console.log('Position de dÃ©filement Y:', scrollY); // Ajout de console.log ici
    };

    const updateCameraPosition = () => {
      if (cameraRef.current) {
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
      }
      requestAnimationFrame(updateCameraPosition);
    };

    // Ã‰coutez l'Ã©vÃ©nement de dÃ©filement
    window.addEventListener('scroll', handleScroll);
    updateCameraPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: '58' }} />;
};

export default PlanetBackgroundClient;