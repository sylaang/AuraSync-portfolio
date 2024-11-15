import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Charger la page côté client
const PageClient = dynamic(() => import('./components/PageClient'), {
  ssr: false, // Désactiver le rendu côté serveur pour ce composant
});

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>

      {/* Charger la partie client de la page */}
      <PageClient />
    </>
  );
};

export default Page;