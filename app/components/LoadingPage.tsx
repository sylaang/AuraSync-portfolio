import * as THREE from 'three';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const LoadingPage: React.FC = React.memo(() => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);
    const clock = useRef(new THREE.Clock()).current; 
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const initScene = (): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; controls: OrbitControls; composer: EffectComposer } => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.01, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: false });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 10, 100);
        controls.minDistance = 10;
        controls.maxDistance = 200;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        composer.addPass(bloomPass);

        return { scene, camera, renderer, controls, composer };
    };

    const loadModel = (scene: THREE.Scene, controls: OrbitControls, composer: EffectComposer, animate: (composer: EffectComposer, controls: OrbitControls) => void): void => {
        const loader = new GLTFLoader();
        loader.load(
            'space_vaisseau.glb',
            (gltf) => {
                if (gltf.scene) {
                    gltf.scene.scale.set(0.5, 0.5, 0.5);
                    gltf.scene.position.set(0, -1, 0);
                    scene.add(gltf.scene);
                    if (gltf.animations && gltf.animations.length) {
                        const mixer = new THREE.AnimationMixer(gltf.scene);
                        mixerRef.current = mixer;
                        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
                    } else {
                        console.warn('Aucune animation trouvée dans le modèle.');
                    }
                    // Retirer le setIsLoading ici pour éviter qu'il se mette à false trop tôt
                    animate(composer, controls);
                } else {
                    console.error('Le modèle GLTF est vide ou mal formé.');
                    setIsLoading(false); // Modèle mal formé, on le marque comme chargé tout de suite
                }
            },
            (xhr) => {
                if (xhr.total > 0) {
                    const percentage = (xhr.loaded / xhr.total) * 100;
                    setLoadingPercentage(Math.round(percentage)); // Mise à jour en fonction de la progression du chargement
                }
    
                // Vérifier si le chargement est terminé (quand on arrive à 100%)
                if (xhr.loaded === xhr.total && loadingPercentage !== 100) {
                    setLoadingPercentage(100); // Mettre le pourcentage à 100 une fois le modèle chargé
                    setIsLoading(false); // Marquer que le chargement est terminé
                }
            },
            (error) => {
                console.error('Une erreur est survenue lors du chargement du modèle :', error);
                setIsLoading(false); // Erreur de chargement, on le marque comme terminé
            }
        );
    };

    const animate = (composer: EffectComposer, controls: OrbitControls): void => {
        requestAnimationFrame(() => animate(composer, controls));
        const delta = clock.getDelta();
        mixerRef.current?.update(delta);
        controls.update();
        composer.render();
    };

    const handleResize = useCallback((camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, composer: EffectComposer): void => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    }, []);

    useEffect(() => {
        const { scene, camera, renderer, controls, composer } = initScene();
        loadModel(scene, controls, composer, animate);
    
        const resizeHandler = () => handleResize(camera, renderer, composer);
        window.addEventListener('resize', resizeHandler);
    
        // Mise à jour du pourcentage de chargement
        const interval = setInterval(() => {
            setLoadingPercentage(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return prev;
                }
                return Math.min(prev + 2, 100);
            });
        }, 100); // Mettre à jour toutes les 100 ms
    
        // Copier la référence de `mountRef.current` dans une variable stable
        const mountNode = mountRef.current;
    
        return () => {
            // Utiliser `mountNode` ici, qui est une référence stable
            if (mountNode) {
                mountNode.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', resizeHandler);
            renderer.dispose();
        };
    }, [handleResize]);

    return (
        <div ref={mountRef} style={{ position: 'relative', overflow: 'hidden' }}>
            {isLoading ? (
                <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}>
                    Chargement... {Math.round(loadingPercentage)}%
                </h2>
            ) : (
                // Tu peux ici afficher ton modèle ou ta scène une fois qu'il est chargé
                <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}>
                    Modèle chargé !
                </h2>
            )}
        </div>
    );
});

LoadingPage.displayName = 'LoadingPage';

export default LoadingPage;
