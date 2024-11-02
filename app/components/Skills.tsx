import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Skills.css';
import './Contact.css';


const Skills: React.FC = () => {
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    console.log("isVisible:", isVisible);
    const skills = [
        "HTML, CSS, JavaScript, TypeScript, PHP, Python, C++, C#.",
        "Symfony, ReactJS, Next.js.",
        "Three.js, Bootstrap.",
        "SQL, DQL."
    ];

    // Initialiser AOS
    useEffect(() => {
        AOS.init();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log("Entry:", entry);
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

    return (
        <div
            data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out">
            <div style={{ marginTop: '40vh'}}>

                <h1 ref={titleRef} className={`title-animated ${isVisible ? 'animate' : ''}`}>Langages de programmation</h1>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '0 10vw' }}>

                    {/* Liste des catégories */}
                    <ul className={`title-animated ${isVisible ? 'animate' : ''}`} style={{ listStyleType: 'none', padding: 0, fontSize: '2em', textAlign: 'left', marginRight: '4%' }}>
                        <li>Langages :</li>
                        <li>Frameworks :</li>
                        <li>Bibliothèques :</li>
                        <li>Bases de données :</li>
                    </ul>

                    {/* Liste des compétences avec effet aurora */}
                    <div className="content">
                        <ul style={{ listStyleType: 'none', fontSize: '2em', padding: 0, textAlign: 'left' }}>
                            {skills.map((skill, index) => (
                                <li key={index} >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                        <div className="aurora">
                            <div className="aurora__item"></div>
                            <div className="aurora__item"></div>
                            <div className="aurora__item"></div>
                            <div className="aurora__item"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
