import ParticlesBackgroundClient from './components/ParticlesBackgroundClient';
import CustomCanvas from './components/CustomCanvas';

export default function Home() {
  return (
    <>
       <ParticlesBackgroundClient />
      <main>
      <CustomCanvas />
      </main>
    </>
  );
}