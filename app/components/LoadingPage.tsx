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
                    setIsLoading(false); // Changement de l'état de chargement
                    animate(composer, controls);
                } else {
                    console.error('Le modèle GLTF est vide ou mal formé.');
                }
            },
            undefined,
            (error) => {
                console.error('Une erreur est survenue lors du chargement du modèle :', error);
                setIsLoading(false); // Changement de l'état de chargement en cas d'erreur
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

                // Mettre à jour le pourcentage de chargement
                const interval = setInterval(() => {
                    setLoadingPercentage(prev => {
                        if (prev >= 100) {
                            clearInterval(interval);
                            return prev;
                        }
                        return Math.min(prev + 2, 100); // Augmenter de 2 % à chaque intervalle
                    });
                }, 100); // Mettre à jour toutes les 100 ms

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', resizeHandler);
            renderer.dispose();
        };
    }, [handleResize]);

    return (
        <div ref={mountRef} style={{ position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}>
                Chargement... {Math.round(loadingPercentage)}%
            </h2>
        </div>
        
    );
});

export default LoadingPage;
