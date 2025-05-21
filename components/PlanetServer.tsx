import dynamic from 'next/dynamic';


const PlanetClient = dynamic(() => import('./PlanetClient'), { ssr: false });

const PlanetServer = () => {
  return (
    <div>
      <PlanetClient />
    </div>
  );
};

export default PlanetServer;