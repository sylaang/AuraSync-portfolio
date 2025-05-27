"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const PlanetClient = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const clock = new THREE.Clock();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const isHeroVisibleRef = useRef(true);
  const requestIdRef = useRef<number | undefined>();
  const dynamicLightRef = useRef<THREE.DirectionalLight | null>(null);

  const onResize = () => {
    if (canvasRef.current && cameraRef.current && rendererRef.current) {
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const initThree = (scene: THREE.Scene) => {
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current ? canvasRef.current.clientWidth / canvasRef.current.clientHeight : 1,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    if (canvasRef.current) {
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      canvasRef.current.appendChild(renderer.domElement);
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dynamicLight = new THREE.DirectionalLight(0xffaa00, 2); 
    scene.add(dynamicLight);
    dynamicLightRef.current = dynamicLight;
  };

  const updateLightPosition = () => {
    if (cameraRef.current && dynamicLightRef.current) {
      dynamicLightRef.current.position.set(cameraRef.current.position.x + 3, cameraRef.current.position.y + 2, cameraRef.current.position.z + 3);
    }
  };

  const animate = (scene: THREE.Scene) => {
    requestIdRef.current = requestAnimationFrame(() => animate(scene));

    const delta = clock.getDelta();
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (cameraRef.current) {
      const targetPosition = isHeroVisibleRef.current
        ? new THREE.Vector3(0, 2, 6)
        : new THREE.Vector3(-3.5, 1, 2);

      cameraRef.current.position.lerp(targetPosition, 0.005);
    }

    updateLightPosition();

    if (cameraRef.current && rendererRef.current) {
      rendererRef.current.render(scene, cameraRef.current);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;
    
    initThree(scene);

    const loader = new GLTFLoader();
    loader.load(
      "/earth.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        scene.add(model);
        modelRef.current = model;

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
          action.timeScale = 0.2;
          mixerRef.current = mixer;
        }


        animate(scene);
      },
      undefined,
      (error) => {
        console.error("Erreur lors du chargement du modèle:", error);
      }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Hero visible ?", entry.isIntersecting);
          setIsHeroVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    window.addEventListener("resize", onResize);

    return () => {
      if (rendererRef.current) {
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose(); // Nettoyage mémoire
      }

      window.removeEventListener("resize", onResize);

      if (heroSection) {
        observer.unobserve(heroSection);
      }

      if (requestIdRef.current !== undefined) {
        cancelAnimationFrame(requestIdRef.current);
      }

      mixerRef.current?.stopAllAction();
      mixerRef.current?.uncacheRoot(modelRef.current as THREE.Object3D);
    };
  }, []);

  useEffect(() => {
    isHeroVisibleRef.current = isHeroVisible;
  }, [isHeroVisible]);

  return (
    <div
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "-1",
        background: "transparent"
      }}
    />
  );
};

export default PlanetClient;
