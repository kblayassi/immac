/* Catalogue des séances du parcours Web.
 *
 * Progression validée : 3 séances d'apprentissage (environ 1 h chacune) puis un
 * projet de 2 h. Les séances prennent la cuisine comme fil rouge ; le projet change
 * de sujet pour que l'élève transpose au lieu de recopier — un site de trois pages
 * présentant un métier (sommaire, présentation, études). Son accompagnement s'adapte
 * à ce que l'élève a réussi dans les trois premières séances.
 *
 * Adossé au thème « Le Web » du programme de SNT :
 *   · Langages HTML et CSS — distinguer contenu et présentation, étudier et
 *     modifier une page HTML simple ;
 *   · Hypertexte — insérer un lien dans une page ;
 *   · URL — décomposer l'adresse d'une page, chemin relatif et adresse complète.
 */

/* Identité de ce parcours : lue par le moteur partagé (docs/parcours/app.js).
   `langage: "web"` fait basculer l'atelier sur HTML/CSS : plusieurs fichiers en
   onglets, aperçu en direct, validation par analyse du code. */
export const PARCOURS = {
  cle: "parcours-web",
  langage: "web",
  titre: "Parcours Web",
  surTitre: "SNT · Seconde · Le Web",
  h1: "Créer une page web, une balise à la fois",
  accroche: `Tout ce que tu vois sur internet est écrit avec deux langages, et deux
    seulement : HTML pour dire ce qu'il y a dans la page, CSS pour dire à quoi elle
    ressemble. Ici tu les apprends en écrivant, avec ta page qui se dessine à côté
    de ton code, en direct. À la fin, tu auras construit de A à Z un petit site de
    trois pages présentant le métier de ton choix.`,
  retour: { href: "../SNT/3_Le_Web/", libelle: "Retour au site" },
};

export const PALIERS = [
  {
    id: "html",
    titre: "Partie 1 — HTML : ce qu'il y a dans la page",
    seances: ["s01", "s02"],
  },
  {
    id: "css",
    titre: "Partie 2 — CSS : à quoi elle ressemble",
    seances: ["s03"],
  },
  {
    id: "projet",
    titre: "Partie 3 — Le projet",
    seances: ["s04"],
  },
];

export const CATALOGUE = {
  s01: {
    numero: 1, duree: 60, nbEtapes: 22, disponible: true,
    titre: "Ta première page web",
    resume: "Balises, titres, paragraphes, retours à la ligne et squelette d'une page.",
  },
  s02: {
    numero: 2, duree: 60, nbEtapes: 22, disponible: true,
    titre: "Listes, images et liens",
    resume: "ul, ol, img, a : de quoi écrire une recette complète.",
  },
  s03: {
    numero: 3, duree: 60, nbEtapes: 24, disponible: true,
    titre: "CSS : le fond et la forme",
    resume: "Feuille de style, sélecteurs, couleurs, polices, centrage, encadrés.",
  },
  s04: {
    numero: 4, duree: 120, nbEtapes: 16, disponible: true,
    titre: "Projet — le site d'un métier",
    resume: "Quatre fichiers : sommaire, présentation, études, et la feuille de style commune.",
  },
};
