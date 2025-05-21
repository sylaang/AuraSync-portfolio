import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"
import { X } from "lucide-react";
import { tarifs } from "@/app/data/tarifsData";


function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLDivElement>, onClose: () => void) {
    const prevFocused = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!active || !containerRef.current) return;
        prevFocused.current = document.activeElement as HTMLElement;

        const selectors = [
            'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
            'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'
        ];
        const elems = containerRef.current.querySelectorAll<HTMLElement>(selectors.join(','));
        if (elems.length) elems[0].focus();

        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
            if (e.key !== "Tab") return;
            const first = elems[0], last = elems[elems.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        }

        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            prevFocused.current?.focus();
        };
    }, [active, containerRef, onClose]);
}

const TarifTable: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useFocusTrap(openIndex !== null, drawerRef, () => setOpenIndex(null));

    return (
        <div className="relative pb-12" role="region" aria-label="Tableau des tarifs">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Tarifs & Offres</h2>
                </motion.div>
            </div>

            {/* Grille de services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-6xl ml-7">
                {tarifs.map(({ prestation }, idx) => (
                    <div
                        key={idx}
                        onClick={() => setOpenIndex(idx)}
                        className="cursor-pointer rounded bg-white/10 hover:bg-white/20 transition-colors p-6 text-white font-semibold text-center"
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpenIndex(idx); }}
                        aria-expanded={openIndex === idx}
                        aria-controls={`tarif-details-${idx}`}
                        aria-haspopup="dialog"
                    >
                        {prestation}
                    </div>
                ))}
            </div>

            {/* Overlay */}
            {openIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpenIndex(null)}
                    aria-hidden="true"
                />
            )}

            {/* Drawer latéral */}
            <div
                ref={drawerRef}
                id={openIndex !== null ? `tarif-details-${openIndex}` : undefined}
                role="dialog"
                aria-modal={openIndex !== null}
                aria-labelledby={openIndex !== null ? `tarif-title-${openIndex}` : undefined}
                tabIndex={-1}
                className={`fixed top-0 right-0 h-full w-full sm:w-[35%] bg-gray-900 bg-opacity-95 text-white transform ${openIndex !== null ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out shadow-2xl overflow-auto z-50`}
            >
                {/* Bouton fermer */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                    <button
                        onClick={() => setOpenIndex(null)}
                        className="p-2 hover:text-red-400"
                        aria-label="Fermer le panneau des tarifs"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>

                {/* Détail des offres */}
                <div className="px-6 py-4 space-y-6">
                    {openIndex !== null && (
                        <section>
                            {/* Titre unique */}
                            <h2 id={`tarif-title-${openIndex}`} className="text-xl font-semibold mb-2">
                                {tarifs[openIndex].prestation}
                            </h2>

                            {/* Descriptions SEO */}
                            {openIndex === 0 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Un site vitrine est idéal pour présenter votre activité en ligne de manière professionnelle. Je propose des formules de 1 à 10 pages, optimisées pour le SEO, avec des fonctionnalités modernes comme un blog, un formulaire de contact ou des animations.
                                </p>
                            )}
                            {openIndex === 1 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Je conçois des sites e-commerce performants, adaptés à votre activité : boutique avec paiement en ligne, gestion des commandes, catalogue produit, espace client et fonctionnalités avancées comme les abonnements ou la livraison.
                                </p>
                            )}
                            {openIndex === 2 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Ne laissez pas votre site devenir vulnérable ou obsolète ! Avec mes formules de maintenance, je m’occupe de tout pour que votre site reste rapide, sécurisé et toujours à jour. Choisissez l’offre qui vous convient, du suivi de base aux interventions prioritaires, pour garder l’esprit tranquille et concentrer votre énergie sur votre business.
                                </p>
                            )}
                            {openIndex === 3 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Donnez un coup de boost à votre projet grâce à un accompagnement personnalisé, pensé selon vos besoins. Que ce soit pour un conseil ponctuel, un suivi régulier ou un accompagnement complet, je vous apporte mon expertise et des recommandations claires pour vous aider à faire grandir votre activité en ligne.
                                </p>
                            )}
                            {openIndex === 4 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Boostez votre visibilité avec une rédaction web optimisée SEO adaptée à vos besoins.
                                    Que ce soit une optimisation simple d’une page, un travail approfondi sur les mots-clés et la structure, ou une rédaction complète avec recherche et stratégie de liens internes, je vous aide à mieux vous positionner sur Google et à convaincre vos visiteurs.
                                </p>
                            )}
                            {openIndex === 5 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Améliorez l’expérience de vos utilisateurs grâce à des tests et un retour UX personnalisés.
                                    Que ce soit une analyse rapide pour détecter les points clés, des tests utilisateurs approfondis avec un rapport clair, ou un audit complet avec recommandations et suivi, je vous accompagne pour rendre votre site plus simple, agréable et efficace.
                                </p>
                            )}
                            {openIndex === 6 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Facilitez la collecte d’informations avec des formulaires adaptés à vos besoins.
                                    Qu’il s’agisse d’un formulaire simple pour contacter vos clients, d’un formulaire interactif avec étapes et conditions, ou d’un outil complexe intégrant calculs, quiz et connexions API, je crée des solutions sur-mesure pour optimiser vos échanges.
                                </p>
                            )}
                            {openIndex === 7 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Apportez du dynamisme et de l’élégance à votre site grâce à des animations sur-mesure.
                                    Qu’il s’agisse d’effets discrets pour rendre la navigation plus agréable ou d’animations complexes qui racontent votre histoire, je crée des expériences visuelles captivantes pour mettre en valeur votre contenu et retenir l’attention de vos visiteurs.
                                </p>
                            )}
                            {openIndex === 8 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Connectez facilement votre site aux services essentiels pour automatiser et enrichir votre activité.
                                    Que ce soit pour une simple inscription à une newsletter ou une intégration complexe avec plusieurs outils, je vous accompagne pour rendre vos processus fluides, fiables et personnalisés selon vos besoins.
                                </p>
                            )}
                            {openIndex === 9 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Donnez vie à vos idées avec une application web personnalisée qui simplifie vos processus et engage vos utilisateurs.
                                    De l’outil simple comme un calculateur à une application complète avec gestion utilisateur, je crée des solutions sur-mesure adaptées à vos besoins pour booster votre efficacité.
                                </p>
                            )}
                            {openIndex === 10 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Offrez à vos utilisateurs un espace sécurisé et intuitif, parfaitement adapté à leurs besoins.
                                    De la connexion simple au tableau de bord complet avec gestion avancée, je conçois des espaces membres sur-mesure pour faciliter l’interaction, le suivi et la gestion de votre communauté.
                                </p>
                            )}
                            {openIndex === 11 && (
                                <p className="text-sm text-white/80 mb-4">
                                    Gérez facilement votre contenu et vos données grâce à un back-office sur-mesure, adapté à vos besoins spécifiques.
                                    Du tableau de bord simple à l’interface avancée avec automatisations et contrôle des accès, je crée des outils d’administration pratiques et faciles à utiliser pour optimiser votre gestion au quotidien.
                                </p>
                            )}

                            {/* Liste des offres */}
                            <ul className="space-y-4">
                                {tarifs[openIndex].offres.map(({ detail, tarif }, i) => (
                                    <li
                                        key={i}
                                        className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-6 border-b border-white/10 pb-4"
                                    >
                                        <span className="leading-snug">{detail}</span>
                                        <span className="font-semibold sm:text-right whitespace-nowrap">{tarif}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TarifTable;