"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
  category: string
}

export default function Skills() {
  const skills: Skill[] = [
    { name: "JavaScript", level: 95, category: "Langages" },
    { name: "TypeScript", level: 95, category: "Langages" },
    { name: "HTML/CSS", level: 95, category: "Langages" },
    { name: "React", level: 95, category: "Frontend" },
    { name: "Bootstrap", level: 95, category: "Frontend" },
    { name: "Next.js", level: 95, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "Three.js", level: 95, category: "Frontend" },
    { name: "Node.js", level: 95, category: "Backend" },
    { name: "Express", level: 95, category: "Backend" },
    { name: "Symfony", level: 95, category: "Backend" },
    { name: "Python", level: 95, category: "Langages" },
    { name: "C++/C#", level: 95, category: "Langages" },
    { name: "PostgreSQL", level: 95, category: "Base de données" },
    { name: "MongoDB", level: 95, category: "Base de données" },
    { name: "MySQL", level: 95, category: "Base de données" },
    { name: "AWS", level: 95, category: "DevOps" },
    { name: "Docker", level: 95, category: "DevOps" }
  ]

  // Grouper les compétences par catégorie
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Obtenir les catégories dans l'ordre souhaité
  const categories = ["Langages", "Frontend", "Backend", "Base de données", "DevOps"]

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Mes compétences</h2>
          <p className="text-lg text-muted-foreground">
            Développeur web freelance basé à Paris, j’accompagne entreprises et agences en Île-de-France et à distance dans la création de sites et d’applications web performants, responsives et orientés utilisateur.
            Spécialisé en développement full stack, je maîtrise des technologies modernes comme JavaScript, TypeScript, React, Next.js, Node.js et Symfony, ainsi que l’intégration de bases de données (PostgreSQL, MongoDB) et d’outils DevOps (Docker, AWS).
            Mon approche centrée sur l’expérience utilisateur (UX) et la performance garantit des interfaces intuitives, accessibles et adaptées à tous les supports.
            Je conçois des solutions digitales robustes, évolutives et optimisées pour le référencement naturel (SEO), en phase avec vos objectifs business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ml-12">
          {categories.map((category, categoryIndex) => (
            groupedSkills[category] && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              >
                <h3 className="text-xl font-semibold mb-6">{category}</h3>
                <div className="space-y-6">
                  {groupedSkills[category].map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 * skillIndex + 0.2
                      }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground ml-2 flex-grow text-center">{skill.level}%</span>
                      </div>
                      <div className="relative h-1 w-3/5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-600 transition-all led-effect"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
