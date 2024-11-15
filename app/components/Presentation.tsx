"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'aos/dist/aos.css'; // Importation du CSS dans le fichier React
import AOS from 'aos';
import './Contact.css';

const Presentation: React.FC = () => {
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const welcomeRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [titleAnimationFinished, setTitleAnimationFinished] = useState(false);

    const text = `Je suis Mehdi Hachem, développeur web full stack.
    Passionné par la technologie, j'allie théorie et pratique pour transformer des idées en projets
    concrets et innovants. J'aime relever des défis et apporter des solutions créatives.`;

    // Observer pour rendre la section visible lorsque l'utilisateur défile
    useEffect(() => {
        AOS.init();  // Initialisation d'AOS

        const welcomeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsWelcomeVisible(true);
                        setIsVisible(true);
                    } else {
                        setIsWelcomeVisible(false);
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.9 }
        );

        const currentRef = welcomeRef.current; // Copie la valeur du ref dans une variable locale

        if (currentRef) welcomeObserver.observe(currentRef);

        return () => {
            if (currentRef) welcomeObserver.unobserve(currentRef); // Cleanup de l'observer
        };
    }, []); // On garde cette liste de dépendances vide car l'observer ne dépend que du cycle de vie du composant

    // Animer le texte avec un index qui avance
    useEffect(() => {
        if (titleAnimationFinished && textIndex < text.length) {
            const timeout = setTimeout(() => {
                setTextIndex((prevIndex) => prevIndex + 1);
            }, 10); // Vitesse d'apparition du texte
            return () => clearTimeout(timeout);
        }
    }, [titleAnimationFinished, textIndex, text.length]); // Ajoutez `text.length` dans les dépendances

    return (
        <div>
            {/* Section Bienvenue */}
            <div
                ref={welcomeRef}
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
                style={{
                    opacity: isWelcomeVisible ? 1 : 0,
                    transform: isWelcomeVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    marginTop: '20vh',
                    height: '50vh',
                    width: '50vw',
                    backgroundColor: 'transparent',
                }}
            >
                <div>
                    <h1
                        className={`title-animated ${isVisible ? 'animate' : ''}`}
                        onAnimationEnd={() => setTitleAnimationFinished(true)} // Déclenche la fin de l'animation
                    >
                        Bienvenue
                    </h1>
                    <div>
                        <p style={{ fontSize: '2em', textAlign: 'start', marginLeft: '10%' }}>
                            {text.substring(0, textIndex)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presentation;
