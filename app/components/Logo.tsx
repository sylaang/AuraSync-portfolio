import React, { useEffect, useState } from 'react';
import './Logo.css';

interface LogoProps {
  sunPosition: { x: number; y: number; z: number };
}

const Logo: React.FC<LogoProps> = ({ sunPosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState<string>('appear');

  useEffect(() => {
    const isSunAtStartPosition = { x: 843.660027618048, y: -228.84169696670804, z: -436.73534068073127 };
    const isSunAtEndPosition = { x: -746.0965185612918, y: -10.03075087932467, z: -588.0816142260528 };
    const tolerance = 0.1;

    const reachedStartTarget =
      Math.abs(sunPosition.x - isSunAtStartPosition.x) < tolerance &&
      Math.abs(sunPosition.y - isSunAtStartPosition.y) < tolerance &&
      Math.abs(sunPosition.z - isSunAtStartPosition.z) < tolerance;
      
    const reachedEndTarget =
      Math.abs(sunPosition.x - isSunAtEndPosition.x) < tolerance &&
      Math.abs(sunPosition.y - isSunAtEndPosition.y) < tolerance &&
      Math.abs(sunPosition.z - isSunAtEndPosition.z) < tolerance;

    if (reachedStartTarget) {
      setAnimationClass('appear');
      setIsVisible(true);
    } else if (reachedEndTarget) {
      setAnimationClass('disappear');

      // Temporisation pour permettre l'animation de disparition avant de cacher le logo
      setTimeout(() => setIsVisible(false), 1000); // Durée de l'animation de disparition
    }

    // console.log(`Position du soleil : ${sunPosition.x}, ${sunPosition.y}, ${sunPosition.z}`);
  }, [sunPosition]);

  return (
    <>
      {isVisible && (
        <div className="logo-container">
          <div className="logo">
            <img
              className={`imgLogo ${animationClass}`} // Ajout de animationClass dynamiquement
              src="/logo3.png"
              alt="Logo"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
