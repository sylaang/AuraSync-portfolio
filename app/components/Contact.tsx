import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Contact: React.FC = () => {
    const [afficherProjectScroll, setAfficherProjectScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            console.log('Position de défilement Y:', window.scrollY);

            // Affiche les projets lorsque scrollY est entre 5096 et 5296
            if (window.scrollY >= 5600) {
                setAfficherProjectScroll(true);
            } else {
                setAfficherProjectScroll(false);
            }

            // Bloque temporairement le défilement lorsque scrollY est supérieur ou égal à 5096
            // if (window.scrollY >= 5096) {
            //   document.body.style.overflow = 'hidden';
            // }
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoyage lors du démontage
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            style={{
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: '59',
            }}
        >
            {/* Affiche les projets si afficherProjectScroll est true */}
            {afficherProjectScroll && (
                <>
                    <div
                        style={{
                            background: 'black',
                            height: '150vh',
                            width: '100%',
                            position: 'absolute',
                            top: '330vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                        }}
                    >
                        <h1
                            style={{
                                color: 'white',
                                fontSize: '50px',
                                marginBottom: '20px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Contact
                        </h1>

                        <div
                            style={{
                                color: 'white',
                                fontSize: '18px',
                                marginTop: '30px',
                                textAlign: 'center',
                            }}
                        >
                            <p>
                                <a
                                    href="https://www.linkedin.com/in/mehdi-hachem-54a8672b0/"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center', // Aligne verticalement l'icône et le texte
                                    }}
                                >
                                    <Image
                                        src="/icone/linkedin.png"
                                        alt="LinkedIn"
                                        width={25}
                                        height={25}
                                        style={{ marginRight: '10px' }}
                                    />
                                    LinkedIn
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://github.com/sylaang/"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center', // Aligne verticalement l'icône et le texte
                                    }}
                                >
                                    <Image
                                        src="/icone/github.png"
                                        alt="GitHub"
                                        width={25}
                                        height={25}
                                        style={{ marginRight: '10px' }}
                                    />
                                    GitHub
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:mehdi.hachem.syl@gmail.com"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center', // Aligne verticalement l'icône et le texte
                                    }}
                                >
                                    <Image
                                        src="/icone/email.png"
                                        alt="Email"
                                        width={25}
                                        height={25}
                                        style={{ marginRight: '10px' }}
                                    />
                                    mehdi.hachem.syl@gmail.com
                                </a>
                            </p>
                            <p
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center', // Aligne verticalement l'icône et le texte
                                }}
                            >
                                <Image
                                    src="/icone/telephone.png"
                                    alt="Téléphone"
                                    width={25}
                                    height={25}
                                    style={{ marginRight: '10px' }}
                                />
                                07 78 35 68 35
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Contact;
