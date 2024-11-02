import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-name">Hachem Mehdi</span>
          <span className="navbar-title">Développeur Web Full Stack</span>
        </div>
        <div className="navbar-right">
          <a href="#work" className="navbar-link"><span>Work</span> </a>
          <a href="#about" className="navbar-link"><span>About</span> </a>
          <a href="#contact" className="navbar-link"><span>Contact</span> </a>
        </div>
      </nav>
    );
  };
  
  export default NavBar;