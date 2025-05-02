export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                AuraSync
              </span>
            </h3>
            <p className="text-muted-foreground max-w-md">
              Donnons vie à vos visions numériques avec un code élégant et des solutions créatives.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-4">
            <div className="flex space-x-4">
              <a href="https://github.com/sylaang/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/mehdi-hachem-54a8672b0/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AuraSync. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
