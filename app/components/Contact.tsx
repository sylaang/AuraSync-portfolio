import React, { useEffect, useState } from 'react';

const Contact: React.FC = () => {
    const [afficherMessageScroll, setAfficherMessageScroll] = useState(false);
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
            zIndex: '59'
        }}>


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
                            zIndex: 1
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
                                        alignItems: 'center',  // Aligne verticalement l'icône et le texte
                                    }}
                                >
                                    <img
                                        src="/icone/linkedin.png"
                                        alt="LinkedIn"
                                        style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    />
                                    LinkedIn
                                </a>
                            </p>
                            <p>
                                <a href="https://github.com/sylaang/"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',  // Aligne verticalement l'icône et le texte
                                    }}
                                    >
                                         <img
                                        src="/icone/github.png"
                                        alt="LinkedIn"
                                        style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    />
                                    GitHub
                                </a>
                            </p>
                            <p>
                                <a href="mailto:mehdi.hachem.syl@gmail.com"
                                     style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',  // Aligne verticalement l'icône et le texte
                                    }}
                                    >
                                          <img
                                        src="/icone/email.png"
                                        alt="LinkedIn"
                                        style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    />
                                    mehdi.hachem.syl@gmail.com
                                </a>
                            </p>
                            <p  style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',  // Aligne verticalement l'icône et le texte
                                    }}
                                    >
                                         <img
                                        src="/icone/telephone.png"
                                        alt="LinkedIn"
                                        style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    />
                                0777777777
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Contact;
