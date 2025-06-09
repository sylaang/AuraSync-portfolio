"use client"

import { motion } from '@/lib/motion'
import ProjectCard from "@/components/common/ProjectCard"
import { projects } from "@/app/data/projectsData"
import { usePrefetchOnHover } from "@/hooks/usePrefetchOnHover"

export default function Projects() {
  const prefetchGitHub = usePrefetchOnHover("https://github.com/sylaang/")

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
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Projets en vedette
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez une sélection de mes travaux récents mettant en avant mon expertise technique et mon approche créative.
          </p>
        </motion.div>

        <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const prefetchLive = usePrefetchOnHover(project.liveUrl)
            const prefetchGitHub = usePrefetchOnHover(project.githubUrl)
            const uniqueId = project.title.toLowerCase().replace(/\s+/g, '-')

            return (
              <ProjectCard
                key={`${project.title}-${project.githubUrl}`}
                {...project}
                index={projects.indexOf(project)}
                onLiveHover={prefetchLive}
                onGithubHover={prefetchGitHub}
              />
            )
          })}
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
              aria-label="Voir plus de projets sur mon profil GitHub (nouvel onglet)"
              className="text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current transition-colors"
              onMouseEnter={prefetchGitHub}
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