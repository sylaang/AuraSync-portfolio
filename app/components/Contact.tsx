'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact: React.FC = () => {
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const canvasRef = useRef<HTMLDivElement | null>(null); // Référence pour le canvas
    const [cameraZ, setCameraZ] = useState(0); // État pour la position Z de la caméra

    useEffect(() => {
        AOS.init();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(false);  // Supprime la classe pour réinitialiser
                        setTimeout(() => setIsVisible(true), 50);  // Réapplique la classe avec un délai pour redémarrer l'animation
                    } else {
                        setIsVisible(false); // Cache l'animation si l'élément n'est plus visible
                    }
                });
            },
            { threshold: 0.5 } // Déclenchement lorsque 50% de l'élément est visible
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            if (titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(1.5, 1.5, 3); // Position initiale de la caméra

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // 0 pour la transparence totale

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        // Charger le modèle need_some_space.glb
        const spaceLoader = new GLTFLoader();
        spaceLoader.load('/need_some_space.glb', (gltf) => {
            const spaceModel = gltf.scene;
            spaceModel.position.set(0, 0, 2); // Ajustez la position si nécessaire
            scene.add(spaceModel); // Ajoutez le modèle à la scène
        }, undefined, (error) => {
            console.error('Erreur lors du chargement de need_some_space :', error);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            camera.position.z -= 0.01; // Zoom avant
            if (camera.position.z < 0.00001) camera.position.z = 0.00001;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div>
            <div data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out"
                ref={titleRef}
                // style={{ marginTop: '100vh' }}
                className={`title-animated ${isVisible ? 'animate' : ''}`}
            >
                Contact
            </div>
            {/* Div fait un effet zoom comme si la caméra plongeait dans mon image 3D ici */}
            <div ref={canvasRef} style={{ position: 'relative', height: '100%', width: '100%' }} /> {/* Ajustez la taille du canvas */}
        </div>
    );
}

export default Contact;
