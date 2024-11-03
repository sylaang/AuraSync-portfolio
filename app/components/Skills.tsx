import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';
import './Skills.css';

const Presentation: React.FC = () => {
    const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(false);
    const [typedLanguages, setTypedLanguages] = useState<string>('');
    const [typedFrameworks, setTypedFrameworks] = useState<string>('');
    const [typedBibliothèques, setTypedBibliothèques] = useState<string>('');
    const [typedBdd, setTypedBdd] = useState<string>('');
    const welcomeRef = useRef<HTMLDivElement>(null);
    const [animationPlayed, setAnimationPlayed] = useState<boolean>(false); 

    const languages = "HHTML, CSS, JavaScript, TypeScript, PHP, Python, C++, C#.";
    const frameworks = "Syymfony, ReactJS, Next.js.";
    const bibliothèques = "Thhree.js, Bootstrap.";
    const bdd = "SQQL, DQL.";

    useEffect(() => {
        AOS.init();

        const welcomeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsWelcomeVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.9 }
        );

        if (welcomeRef.current) welcomeObserver.observe(welcomeRef.current);

        return () => {
            if (welcomeRef.current) welcomeObserver.unobserve(welcomeRef.current);
        };
    }, []);

    const typeWriterEffect = (
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        delay: number,
        callback?: () => void
    ) => {
        let index = 0; // Réinitialiser l'index pour chaque appel
        setText(''); // Assurez-vous que cela n'interfère pas avec l'affichage initial
    
        const interval = setInterval(() => {
            if (index < text.length) {
                console.log(`Adding character: ${text.charAt(index)} at index: ${index}`); // Ajoute ce log
                setText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, delay);
    };
    
    useEffect(() => {
        if (isWelcomeVisible && !animationPlayed) {
            const speed = 50;
            const timer = setTimeout(() => {
                setAnimationPlayed(true); // Marque que l'animation a commencé
                typeWriterEffect(languages, setTypedLanguages, speed, () => {
                    typeWriterEffect(frameworks, setTypedFrameworks, speed, () => {
                        typeWriterEffect(bibliothèques, setTypedBibliothèques, speed, () => {
                            typeWriterEffect(bdd, setTypedBdd, speed);
                        });
                    });
                });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isWelcomeVisible, animationPlayed]); // Ajoutez animationPlayed comme dépendance
    

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
                    width: '70vw',
                    backgroundColor: 'transparent',
                }}
            >
                <h1 className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>
                    Langages de programmation
                </h1>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '2em', marginRight: '10px' }} className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Languages:</h2>
                        <p style={{ fontSize: '2em'}}>{typedLanguages}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '2em', marginRight: '10px' }} className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Frameworks:</h2>
                        <p style={{ fontSize: '2em'}}>{typedFrameworks}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '2em', marginRight: '10px' }} className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Bibliothèques:</h2>
                        <p style={{ fontSize: '2em'}}>{typedBibliothèques}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '2em', marginRight: '10px' }} className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Base de données:</h2>
                        <p style={{ fontSize: '2em'}}>{typedBdd}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presentation;
