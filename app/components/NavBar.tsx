import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
  function setOverflowAuto(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault(); // Empêche la redirection immédiate
    document.body.style.overflow = 'auto'; // Change l'overflow du body en auto

    // Redirige après avoir défini l'overflow
    // window.location.href = event.currentTarget.href;
}
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-name">Hachem Mehdi</span>
        <span className="navbar-title">Développeur Web Full Stack</span>
      </div>
      <div className="navbar-right">
        <a
          className="navbar-link"
          onClick={(e) => {
            setOverflowAuto(e); // Appel de la fonction pour mettre overflow à auto
            e.preventDefault();

            // Premier défilement à la position 3600
            window.scrollTo({
              top: 3599,
              behavior: 'smooth'
            });

            // Après un délai, défilement à la position 4996
            setTimeout(() => {
              window.scrollTo({
                top: 4996,
                behavior: 'smooth'
              });
            }, 1000); // Délai de 1000ms (1 seconde) avant de scroller à la position 4996
          }}
        >
          <span>Projets</span>
        </a>
        <a
          className="navbar-link"
          onClick={(e) => {
            setOverflowAuto(e); // Appel de la fonction pour mettre overflow à auto
            e.preventDefault();
            window.scrollTo({
              top: 900,   // La position verticale à laquelle vous voulez arriver
              behavior: 'smooth'  // Défilement lisse
            });
          }}
        >
          <span>A propos</span>
        </a>
        <a
          className="navbar-link"
          onClick={(e) => {
            setOverflowAuto(e); // Appel de la fonction pour mettre overflow à auto
            e.preventDefault();

            // Premier défilement à la position 3600
            window.scrollTo({
              top: 3599,
              behavior: 'smooth'
            });

            // Après un délai, défilement à la position 5600
            setTimeout(() => {
              window.scrollTo({
                top: 5600,
                behavior: 'smooth'
              });
            }, 1000); // Délai de 1000ms (1 seconde) avant de scroller à la position 5600
          }}
        >
          <span>Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;