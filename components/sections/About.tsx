"use client"

import { motion } from "framer-motion"
import { Code, Compass, Laptop, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, x: '-100%' }, // Commence à gauche, caché
    visible: (i: number) => ({
      opacity: 1,
      x: 0, // Va à la position finale
      transition: {
        delay: 0.1 * i, // Décale le délai pour chaque carte
        duration: 0.5,   // Durée de l'animation
      },
    }),
  };

  const services = [
    {
      icon: <Code className="h-12 w-12 mb-4 text-blue-500" />,
      title: "Développement web",
      description: "Créer des sites web réactifs, accessibles et performants en utilisant des technologies modernes comme React, Vue.js, et des frameworks comme Symfony. J'optimise également l'expérience utilisateur et la vitesse de chargement pour garantir une navigation fluide et agréable. Basé à Paris, je vous accompagne dans la création de sites web sur mesure en Île-de-France.",
    },
    {
      icon: <Sparkles className="h-12 w-12 mb-4 text-purple-500" />,
      title: "Conception UI/UX",
      description: "Concevoir des interfaces utilisateurs attrayantes, intuitives et adaptées aux besoins spécifiques des utilisateurs. Grâce à des méthodologies comme le design thinking et l'analyse UX, j'assure des parcours utilisateurs fluides pour maximiser l'engagement et la satisfaction. Services disponibles à Paris et en Île-de-France.",
    },
    {
      icon: <Compass className="h-12 w-12 mb-4 text-teal-500" />,
      title: "Consultation en Design UX/UI",
      description: "Conseil en optimisation de l'expérience utilisateur (UX) et conception d'interfaces (UI) adaptées aux besoins des utilisateurs. Je vous accompagne dans la création d'interfaces intuitives et fonctionnelles pour améliorer l'interaction et l'engagement des utilisateurs. Profitez de notre expertise à Paris et en Île-de-France pour transformer vos projets numériques.",
    },
    {
      icon: <Compass className="h-12 w-12 mb-4 text-teal-500" />,
      title: "Stratégie digitale",
      description: "Développer des stratégies digitales sur mesure qui renforcent la visibilité en ligne et soutiennent les objectifs business. De l'optimisation SEO à la gestion des réseaux sociaux, je conçois des solutions digitales efficaces pour un impact durable. Services disponibles en Île-de-France et à Paris.",
    },
    {
      icon: <Laptop className="h-12 w-12 mb-4 text-amber-500" />,
      title: "Développement d'applications",
      description: "Développer des applications web évolutives et performantes, adaptées aux besoins uniques de votre entreprise. Je me concentre sur la robustesse de l'architecture, la rapidité de l'exécution et une expérience utilisateur fluide pour garantir la scalabilité et la longévité de vos applications. Services disponibles à Paris et en Île-de-France.",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container px-4">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-3xl mx-auto text-center mb-16 px-4 sm:px-6 lg:px-8"
>
  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">
    À propos de moi
  </h2>
  <p className="text-lg text-muted-foreground">
  Je suis un développeur web passionné, spécialisé dans la création de sites web réactifs et performants. Mon expertise couvre les technologies modernes telles que React, Vue.js, et Symfony, et je m'assure que chaque projet est optimisé pour l'expérience utilisateur (UX) et la performance. Grâce à mon sens du design et mon approche centrée sur l'utilisateur, je transforme des défis techniques en solutions élégantes et efficaces pour des sites web conviviaux, accessibles et adaptés aux besoins des utilisateurs.

  </p>
</motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pt-8">
                  <div className="flex justify-center">{service.icon}</div>
                  <CardTitle className="mt-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}