"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  index: number
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  liveUrl,
  githubUrl,
  index,
}: ProjectCardProps) {
  return (
    <motion.div role="listitem"
      aria-labelledby={`project-title-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <article className="h-full">
        <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative h-48 sm:h-60 overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${title} - image`}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <div className="flex gap-2">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background/80 hover:bg-background p-2 rounded-full transition-colors"
                    aria-label={`View ${title} GitHub repository`}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
{liveUrl && (
  <button
    onClick={() => window.open(liveUrl, "_blank")}
    className="bg-black text-white py-2 px-4 rounded-full relative overflow-hidden group"
    aria-label={`Visit ${title} live site`}
  >
    Voir le site web
    <span className="absolute inset-0 w-full h-full rounded-full border-2 border-transparent group-hover:animate-border-light"></span>
  </button>
)}
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h3 id={`project-title-${index}`} className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </article>
    </motion.div>
  )
}