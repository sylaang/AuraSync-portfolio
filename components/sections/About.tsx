"use client"

import { motion } from '@/lib/motion'
import { useRef } from "react"
import { Code, Compass, Laptop, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { services } from "@/app/data/aboutData"
import Image from "next/image"

export default function About() {
  const progressRef = useRef<HTMLDivElement>(null)

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image
                src="/about/photoProfil.png"
                alt="Hachem Mehdi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">
              À propos de moi
            </h2>
            <p className="text-lg text-muted-foreground">
              Je suis un développeur web passionné, spécialisé dans la création de sites web réactifs et performants. Mon expertise couvre les technologies modernes telles que React, Vue.js, et Symfony, et je m'assure que chaque projet est optimisé pour l'expérience utilisateur (UX) et la performance. Grâce à mon sens du design et mon approche centrée sur l'utilisateur, je transforme des défis techniques en solutions élégantes et efficaces pour des sites web conviviaux, accessibles et adaptés aux besoins des utilisateurs.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full relative mt-16"
        >
          <Swiper
            aria-label="Liste des services proposés"
            modules={[Autoplay]}
            spaceBetween={20}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onAutoplayTimeLeft={(swiper, time, progress) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${100 - progress * 100}%`
              }
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {services.map((service, i) => (
              <SwiperSlide key={service.title} role="article" tabIndex={0}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="w-full h-[350px] flex flex-col border-none shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="text-center pt-8">
                      <div className="flex justify-center">{service.icon}</div>
                      <h3 className="mt-2 text-xl font-semibold">{service.title}</h3>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-center">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <div className="container px-4 mt-4">
        <div className="mx-auto w-full max-w-sm">
          <div
            ref={progressRef}
            className="h-1 rounded transition-all duration-300 ease-linear 
                 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 
                 shadow-[0_0_10px_rgba(0,255,255,0.7),0_0_20px_rgba(255,0,255,0.5)]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  )
}