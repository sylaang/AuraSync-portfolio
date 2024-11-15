import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';
import './Skills.css';

const Skills: React.FC = () => {
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
    
        // Copier la valeur de welcomeRef.current dans une variable locale
        const currentRef = welcomeRef.current;
    
        if (currentRef) {
            welcomeObserver.observe(currentRef);
        }
    
        return () => {
            // Utiliser la variable locale dans le nettoyage
            if (currentRef) {
                welcomeObserver.unobserve(currentRef);
            }
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
                // console.log(`Adding character: ${text.charAt(index)} at index: ${index}`); // Ajoute ce log
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
                className={`welcome-section ${isWelcomeVisible ? 'visible' : ''}`}
                data-aos="zoom-in"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
            >
                <h1 className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>
                    Langages de programmation
                </h1>
                <div className="section-container">
                    <div className="section-item">
                        <h2 className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Languages:</h2>
                        <p>{typedLanguages}</p>
                    </div>
                    <div className="section-item">
                        <h2 className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Frameworks:</h2>
                        <p>{typedFrameworks}</p>
                    </div>
                    <div className="section-item">
                        <h2 className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Bibliothèques:</h2>
                        <p>{typedBibliothèques}</p>
                    </div>
                    <div className="section-item">
                        <h2 className={`title-animated ${isWelcomeVisible ? 'animate' : ''}`}>Base de données:</h2>
                        <p>{typedBdd}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
