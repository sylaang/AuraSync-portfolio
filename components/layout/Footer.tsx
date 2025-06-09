import { usePrefetchOnHover } from "@/hooks/usePrefetchOnHover";
import { socialLinks } from "@/constants/socialLinks";

export default function Footer() {
  return (
    <footer className="border-t bg-background" role="contentinfo">
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
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AuraSync. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ IconComponent, label, url, rel, target }) => {
                const prefetch = usePrefetchOnHover(url);
                return (
                  <a
                    key={label}
                    href={url}
                    target={target}
                    rel={rel}
                    aria-label={label}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition"
                    onMouseEnter={prefetch}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}