// /components/PlanetBackgroundServer.tsx
import dynamic from 'next/dynamic'; // Chargement dynamique

// Charger le composant client sans SSR (cÃ´tÃ© client uniquement)
const PlanetBackgroundClient = dynamic(() => import('./PlanetBackgroundClient'), { ssr: false });

const PlanetBackgroundServer = () => {
  return (
    <div>
      <PlanetBackgroundClient /> {/* Rendu du composant PlanetBackgroundClient cÃ´tÃ© client */}
    </div>
  );
};

export default PlanetBackgroundServer;