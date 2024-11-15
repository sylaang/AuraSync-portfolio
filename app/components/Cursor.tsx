import { useEffect } from "react";

const Cursor = () => {

  useEffect(() => {
    // Variables pour stocker les positions
    let posX = 0;
    let posY = 0;
    let targetX = 0;
    let targetY = 0;

    // Sélectionner les éléments de curseur
    const cursor = document.getElementById("cursor");
    const cursor2 = document.getElementById("cursor2");
    const cursor3 = document.getElementById("cursor3");

    // Fonction qui met à jour la position du curseur
    const moveCursor = () => {
      const distanceX = targetX - posX;
      const distanceY = targetY - posY;

      // Ajoute un effet de fluidité en déplaçant progressivement
      posX += distanceX / 6; // "6" détermine la vitesse de fluidité
      posY += distanceY / 6;

      // Met à jour les positions des curseurs
      if (cursor) {
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;
      }
      if (cursor2) {
        cursor2.style.left = `${posX}px`;
        cursor2.style.top = `${posY}px`;
      }
      if (cursor3) {
        cursor3.style.left = `${posX}px`;
        cursor3.style.top = `${posY}px`;
      }

      // Demande le prochain rafraîchissement d'animation
      requestAnimationFrame(moveCursor);
    };

    // Fonction pour capter la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Ajouter l'écouteur d'événement pour le mouvement de la souris
    document.body.addEventListener("mousemove", handleMouseMove);

    // Lancer l'animation
    requestAnimationFrame(moveCursor);

    // Clean up sur démontage du composant
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Cacher le curseur natif */}
      <style jsx>{`
        body {
          cursor: none;
        }
      `}</style>

      {/* Votre curseur personnalisé */}
      <div id="cursor" className="cursor"></div>
      <div id="cursor2" className="cursor2"></div>
      <div id="cursor3" className="cursor3"></div>
    </>
  );
};

export default Cursor;
