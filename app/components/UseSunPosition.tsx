import { useState, useEffect } from 'react';

// Définir un type pour la position du soleil
type SunPosition = {
  x: number;
  y: number;
  z: number;
};

// Définir un type pour l'événement personnalisé
interface SunPositionUpdateEvent extends CustomEvent {
  detail: SunPosition;
}

export const useSunPosition = () => {
  const [sunPosition, setSunPosition] = useState<SunPosition>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Fonction de mise à jour de la position du soleil
    const handleUpdateSunPosition = (newPosition: SunPosition) => {
      setSunPosition(newPosition);
    };

    // Écouter les mises à jour de la position du soleil
    const handleSunPositionUpdate = (event: SunPositionUpdateEvent) => {
      handleUpdateSunPosition(event.detail);
    };

    window.addEventListener('sunPositionUpdate', handleSunPositionUpdate as EventListener);

    return () => {
      window.removeEventListener('sunPositionUpdate', handleSunPositionUpdate as EventListener);
    };
  }, []);

  return sunPosition; // Retourner la position du soleil.
};
