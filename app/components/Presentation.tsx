import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Presentation: React.FC = () => {
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(false); // État pour la section "Bienvenue"
    const [textIndex, setTextIndex] = useState(0);
    const welcomeRef = useRef<HTMLDivElement>(null); // Référence pour la section "Bienvenue"

    const text = `Je suis Mehdi Hachem, développeur web full stack.
    Passionné par la technologie, j'allie théorie et pratique pour transformer des idées en projets
    concrets et innovants. J'aime relever des défis et apporter des solutions créatives.`;

    useEffect(() => {
        AOS.init();

        const welcomeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsWelcomeVisible(entry.isIntersecting); // Met à jour selon la visibilité de "Bienvenue"
                });
            },
            { threshold: 0.9 }
        );

        if (welcomeRef.current) welcomeObserver.observe(welcomeRef.current);

        return () => {
            if (welcomeRef.current) welcomeObserver.unobserve(welcomeRef.current);
        };
    }, []);

    useEffect(() => {
        if (isWelcomeVisible && textIndex < text.length) {
            const timeout = setTimeout(() => {
                setTextIndex((prevIndex) => prevIndex + 1);
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [isWelcomeVisible, textIndex]);

    return (
        <div>
            {/* Section Bienvenue */}
            <div
                ref={welcomeRef}
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
                <div data-aos="zoom-in" data-aos-duration="3000">
                    <h1 style={{ fontSize: '4em' }}>Bienvenue</h1>
                    <div>
                        <p style={{ fontSize: '2em', whiteSpace: 'pre-wrap' }}>
                            {text.substring(0, textIndex)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presentation;
