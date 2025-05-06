"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/common/ProjectCard"

export default function Projects() {
  const projects = [
    {
      title: "Boutique en ligne de parfums",
      description: "Un site de e-commerce élégant et moderne dédié à la vente de parfums, offrant une expérience de navigation fluide et une sélection de fragrances haut de gamme.",
      imageUrl: "/images/projects/Essence.png",
      tags: ["E-commerce","Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion", "Zod", "React Hook Form", "Supabase", ],
      liveUrl: "https://aurasync-parfums.vercel.app",
      githubUrl: "https://github.com/sylaang/aurasync-parfums",
    },
    {
      title: "Site d'architecture",
      description:
      "Un site vitrine moderne pour un cabinet d'architecture, avec design responsive, galerie d'images, et navigation fluide.", 
      imageUrl: "/images/projects/ArchiStudio.png",
      tags: ["Vitrine","Next.js", "React", "TypeScript", "tailwindcss", "Radix UI", "framer-motion"],
      liveUrl: "https://architect-web-coral.vercel.app/",
      githubUrl: "https://github.com/sylaang/aurasync-architect-web",
    },
    {
      title: "Tableau de bord financier interactif",
      description:
      "Un tableau de bord interactif permettant de suivre les dépenses, revenus, et profits, tout en offrant des prévisions financières. Il inclut un back-end avec Python/Django pour gérer les données via des APIs RESTful, et un front-end dynamique. Des visualisations graphiques interactives pour une analyse en temps réel.",
      imageUrl: "/images/projects/dash-finance.png",
      tags: ["Python", "Django", "Next.js", "React", "TypeScript", "D3.js"],
      liveUrl: "https://aurasync-dashboard-finance.vercel.app",  
      githubUrl: "https://github.com/sylaang/aurasync-dashboard-Finance",
    },
    {
      title: "Suivi de Fitness",
      description:
        "Une application complète de suivi de fitness avec des plans d'entraînement, des métriques de progression et des fonctionnalités sociales.",
      imageUrl: "https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Vue.js", "TypeScript", "Django", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Explorateur Culinaire",
      description:
        "Une plateforme de découverte de recettes avec des recommandations basées sur l'IA en fonction des préférences des utilisateurs et des restrictions alimentaires.",
      imageUrl: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "TypeScript", "Supabase", "Node.js"],
      liveUrl: "https://aurasync-recette-hub.vercel.app/",
      githubUrl: "https://github.com/sylaang/aurasync-RecetteHub",
    },
    {
      title: "Hub SmartHome",
      description:
        "Un système de contrôle central pour les appareils IoT avec des règles d'automatisation, un suivi énergétique et des commandes vocales.",
      imageUrl: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Angular", "Node.js", "MQTT", "InfluxDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Projets en vedette</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez une sélection de mes travaux récents mettant en avant mon expertise technique et mon approche créative.
          </p>
        </motion.div>

        <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Intéressé par d'autres projets ? Découvrez mon{" "}
            <a
              href="https://github.com/sylaang/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir plus de projets sur mon profil GitHub"
              className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              profil GitHub
            </a>{" "}
            pour plus de projets et de contributions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
