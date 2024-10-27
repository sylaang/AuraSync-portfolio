// Logo.tsx
import React, { useEffect, useState } from 'react';

interface LogoProps {
  sunPosition: { x: number; y: number; z: number }; // Propriétés de position du soleil
}

const Logo: React.FC<LogoProps> = ({ sunPosition }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifiez si la position du soleil correspond à celle d'apparition du logo
    const isSunAtStartPosition =
      Math.abs(sunPosition.x - 454.71613702041384) < 0.01 &&
      Math.abs(sunPosition.y - -253.86619147583195) < 0.01 &&
      Math.abs(sunPosition.z - -834.1062490673668) < 0.01;

    // Vérifiez si la position du soleil correspond à celle de disparition du logo
    const isSunAtEndPosition =
      Math.abs(sunPosition.x - -682.073869786835) < 0.01 &&
      Math.abs(sunPosition.y - -36.12672206332601) < 0.01 &&
      Math.abs(sunPosition.z - -661.2679004412747) < 0.01;

    // Mettez à jour l'état de visibilité
    if (isSunAtStartPosition) {
      setIsVisible(true); // Montre le logo lorsque le soleil atteint la première position
    } else if (isSunAtEndPosition) {
      setIsVisible(false); // Cache le logo lorsque le soleil atteint la seconde position
    }

    // Affichez la position du soleil dans la console
    console.log(`Position du soleil : ${sunPosition.x}, ${sunPosition.y}, ${sunPosition.z}`);
  }, [sunPosition]);

  return (
    <>
      {isVisible && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          pointerEvents: 'none' // Empêche le logo d'interférer avec les événements de souris
        }}>
          <img 
            src="/logo3.png" 
            alt="Logo" 
            style={{ height: '300px', width: 'auto' }} 
          />
        </div>
      )}
    </>
  );
};

export default Logo;
