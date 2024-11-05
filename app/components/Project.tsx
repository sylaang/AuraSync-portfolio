import React, { useEffect, useState } from 'react';

const Project: React.FC = () => {
  const [afficherMessageScroll, setAfficherMessageScroll] = useState(false);
  const [afficherProjectScroll, setAfficherProjectScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log('Position de défilement Y:', window.scrollY);

      // Affiche le message "scroll/zoom" lorsque scrollY atteint 3600
      if (window.scrollY >= 3600) {
        setAfficherMessageScroll(true);
      } else {
        setAfficherMessageScroll(false);
      }

      // Affiche les projets lorsque scrollY est entre 5096 et 5296
      if (window.scrollY >= 5096 && window.scrollY <= 5496) {
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
    <div style={{
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position:'relative',
      zIndex:'59'
    }}>


      {/* Affiche "scroll/zoom" si afficherMessageScroll est true */}
      {afficherMessageScroll && (
        <span className='animate-charcter' style={{
          color: 'white',
          position: 'fixed',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          scroll/zoom
        </span>
      )}
      
      {/* Affiche les projets si afficherProjectScroll est true */}
      {afficherProjectScroll && (
        <>
              <h1 style={{ textAlign: 'center', color: 'white', fontSize: '50px', position: 'fixed', top: '5vh' }}>Projets</h1>
          {/* <div style={{ background: 'white', height: '500px', width: '500px', position: 'fixed', top: '50vh', left: '5%', cursor: 'pointer' }}>
          </div>
          <div style={{ background: 'red', height: '500px', width: '500px', position: 'fixed', top: '50vh', left: '37%', cursor: 'pointer' }}>
          </div>
          <div style={{ background: 'purple', height: '500px', width: '500px', position: 'fixed', top: '50vh', right: '5%', cursor: 'pointer' }}>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Project;
