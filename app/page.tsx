import ParticlesBackgroundClient from './components/ParticlesBackgroundClient';
import PlanetServer from './components/PlanetServer';

export default function Home() {
  return (
    <>
       <ParticlesBackgroundClient />
      <main>
      <PlanetServer />
      </main>
    </>
  );
}