"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'aos/dist/aos.css'; // Importation du CSS dans le fichier React
import AOS from 'aos';
import './Contact.css';
import './Presentation.css';

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

        const currentRef = welcomeRef.current;

        if (currentRef) welcomeObserver.observe(currentRef);

        return () => {
            if (currentRef) welcomeObserver.unobserve(currentRef);
        };
    }, []);

   
    useEffect(() => {
        if (titleAnimationFinished && textIndex < text.length) {
            const timeout = setTimeout(() => {
                setTextIndex((prevIndex) => prevIndex + 1);
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [titleAnimationFinished, textIndex, text.length]);

    return (
        <>
            <div
                ref={welcomeRef}
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out" 
                className={`container ${isWelcomeVisible ? 'visible' : ''}`}>
                <div>
                    <h1
                        className={`title-animated ${isVisible ? 'animate' : ''}`}
                        onAnimationEnd={() => setTitleAnimationFinished(true)}
                    >
                        Bienvenue
                    </h1>
                    <div>
                        <p className='presentation-text'>
                            {text.substring(0, textIndex)}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Presentation;
