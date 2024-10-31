import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Skills.css';

const Skills: React.FC = () => {
    const skills = [
        "HTML, CSS, JavaScript, TypeScript, PHP, Python, C++, C#.",
        "Symfony, ReactJS, Next.js.",
        "Three.js, Bootstrap.",
        "SQL, DQL."
    ];

    // Initialiser AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div
            // Ajout de la classe content ici
            data-aos="zoom-in" // Ajouter l'animation AOS
            data-aos-duration="3000" // Durée de l'animation (en millisecondes)
            data-aos-easing="ease-in-out" // Type d easing pour l'animation
        >
            <div style={{ marginTop: '40vh'}}>

                <h1 style={{ fontSize: '4em', marginRight: '30%' }}>Langages de programmation</h1>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '0 10vw' }}>

                    {/* Liste des catégories */}
                    <ul style={{ listStyleType: 'none', padding: 0, fontSize: '2em', textAlign: 'left', marginRight: '4%' }}>
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
