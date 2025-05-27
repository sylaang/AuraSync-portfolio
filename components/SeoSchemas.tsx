import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const SeoSchemas = () => {
  if (!SITE_URL) {
    if (typeof window !== 'undefined') {
      console.warn('NEXT_PUBLIC_SITE_URL is not defined');
    }
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/`,
        "url": `${SITE_URL}/`,
        "name": "Développeur Web | Mon Portfolio | HACHEM Mehdi",
        "description": "Découvrez mes projets en développement web, allant de sites dynamiques à des applications interactives sur mesure.",
        "inLanguage": "fr",
        "image": `${SITE_URL}/images/og-home.png`,
        "author": {
          "@type": "Person",
          "name": "HACHEM Mehdi",
          "url": "https://www.linkedin.com/in/mehdi-hachem-54a8672b0/"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.linkedin.com/in/mehdi-hachem-54a8672b0/",
        "name": "HACHEM Mehdi",
        "url": `${SITE_URL}/`,
        "image": `${SITE_URL}/images/og-home.png`,
        "sameAs": [
          "https://github.com/sylaang",
          "https://www.linkedin.com/in/mehdi-hachem-54a8672b0/"
        ],
        "jobTitle": "Développeur Web Freelance",
        "worksFor": {
          "@type": "Organization",
          "name": "AuraSync"
        }
      },
      {
        "@type": "Organization",
        "name": "AuraSync",
        "url": `${SITE_URL}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/favicon.ico`
        },
        "sameAs": [
          "https://github.com/sylaang",
          "https://www.linkedin.com/in/mehdi-hachem-54a8672b0/"
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Création de site web sur-mesure",
        "provider": {
          "@type": "Person",
          "name": "HACHEM Mehdi",
          "url": `${SITE_URL}/`
        },
        "areaServed": {
          "@type": "Place",
          "name": "France"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": `${SITE_URL}/contact`
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default SeoSchemas;
