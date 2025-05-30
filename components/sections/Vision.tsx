"use client"

import { FC } from "react"
import { motion } from '@/lib/motion'
import { Card, CardContent } from "@/components/ui/card"

const Vision: FC = () => {
  return (
    <section id="vision" className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ma Vision du Design UX / UI : Expérience Utilisateur et Interfaces Intuitives
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Je crois en la création d'expériences numériques alliant harmonieusement design UX/UI et performance
              technique. Mon approche repose sur ces principes clés :
            </p>

            <div className="h-[380px] md:h-[320px] p-4 rounded-md border overflow-y-auto custom-scrollbar">
              <div className="space-y-8 pr-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">UX / UI Design Centré sur l’Utilisateur</h3>
                  <p className="text-muted-foreground">
                    Chaque projet commence par une compréhension approfondie des utilisateurs : leurs besoins, leurs
                    objectifs et leurs frustrations. En adoptant des approches comme le design thinking, je conçois des
                    interfaces intuitives et fonctionnelles, guidées par une architecture claire et une expérience
                    utilisateur optimale.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Optimisation de la Performance Web : Rapidité et Fluidité</h3>
                  <p className="text-muted-foreground">
                    La rapidité de chargement est cruciale pour l'expérience utilisateur. J'optimise chaque aspect de mes
                    projets pour garantir un temps de chargement ultra-rapide, même sur des connexions internet lentes,
                    tout en assurant une navigation fluide et sans accroc.
                  </p>
                  <div className="led-gradient-line"></div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibilité Numérique Inclusive pour Tous</h3>
                  <p className="text-muted-foreground">
                    L'accessibilité numérique est un droit fondamental. Je m'engage à respecter les normes WCAG (Web
                    Content Accessibility Guidelines) et à appliquer les meilleures pratiques pour offrir une expérience
                    web accessible à toutes les personnes, quels que soient leurs besoins spécifiques ou leurs handicaps.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Croissance Durable et Évolutive : Construire pour l'Avenir</h3>
                  <p className="text-muted-foreground">
                    Créer des systèmes pérennes et évolutifs est essentiel pour garantir la durabilité des projets à long
                    terme. Un code propre, une architecture claire et des pratiques de développement responsables sont les
                    clés pour construire des solutions solides et maintenables, adaptées aux évolutions futures.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-none p-1">
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-medium text-foreground">
                  Développement web sur mesure, applications web et solutions interactives pour entreprises et
                  indépendants en France
                </h2>
                <p className="text-lg text-muted-foreground">
                  En mettant l'accent sur l'UX / UI design et la création de solutions numériques accessibles et
                  performantes. Mon objectif est de mettre la technologie au service de l'humain, en garantissant une
                  expérience utilisateur fluide et des solutions parfaitement adaptées à chaque besoin.
                </p>
                <div className="mt-6">
                  <h2 className="font-semibold text-lg bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent inline-block">
                    AuraSync
                  </h2>
                  <h3 className="text-sm text-muted-foreground">
                    Développeur Web Full Stack — UX / UI, API & Stratégie Digitale
                  </h3>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Vision
