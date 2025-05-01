// /components/PlanetServer.tsx
import dynamic from 'next/dynamic'; // Chargement dynamique

// Charger le composant client sans SSR (cÃ´tÃ© client uniquement)
const PlanetClient = dynamic(() => import('./PlanetClient'), { ssr: false });

const PlanetServer = () => {
  return (
    <div>
      <PlanetClient /> {/* Rendu du composant PlanetClient cÃ´tÃ© client */}
    </div>
  );
};

export default PlanetServer;