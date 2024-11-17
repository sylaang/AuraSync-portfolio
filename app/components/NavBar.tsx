import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
  function setOverflowAuto(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    document.body.style.overflow = 'auto';


}
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-name">Mehdi HACHEM</span>
        <span className="navbar-title">Développeur Web Full Stack</span>
      </div>
      <div className="navbar-right">
            <a
              className="navbar-link"
              onClick={(e) => {
                setOverflowAuto(e);
                e.preventDefault();
                window.scrollTo({
                  top: 900,
                  behavior: 'smooth'
                });
              }}
            >
              <span>A propos</span>
            </a>
        <a
          className="navbar-link"
          onClick={(e) => {
            setOverflowAuto(e);
            e.preventDefault();

            
            window.scrollTo({
              top: 3599,
              behavior: 'smooth'
            });

            setTimeout(() => {
              window.scrollTo({
                top: 4996,
                behavior: 'smooth'
              });
            }, 1000);
          }}
        >
          <span>Projets</span>
        </a>
        <a
          className="navbar-link"
          onClick={(e) => {
            setOverflowAuto(e);
            e.preventDefault();

           
            window.scrollTo({
              top: 3599,
              behavior: 'smooth'
            });

           
            setTimeout(() => {
              window.scrollTo({
                top: 5600,
                behavior: 'smooth'
              });
            }, 1000);
          }}
        >
          <span>Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;