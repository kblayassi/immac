/* Catalogue du parcours NSI Terminale — chapitre 1 « Listes, piles et files ».
 *
 * Couvre la rubrique « Structures de données » du programme de terminale, moins
 * la programmation objet : tout y est écrit avec des fonctions. Le chapitre
 * consacré aux classes reprendra les mêmes structures pour les réécrire en objet.
 *
 * Volume visé : environ 12 h de travail élève, découverte, exercices et défis
 * compris. Le moteur est celui des trois autres parcours : docs/parcours/app.js.
 */

/* Identité de ce parcours : lue par le moteur partagé. */
export const PARCOURS = {
  cle: "parcours-nsi-term-ch1",
  titre: "NSI — Listes, piles et files",
  surTitre: "NSI · Terminale · Chapitre 1",
  h1: "Listes, piles et files, version interactive",
  accroche: `Une structure de données, ce n'est pas du code : c'est d'abord un
    <strong>contrat</strong>. Tu vas apprendre à décrire ce qu'une structure sait faire,
    puis à l'écrire toi-même — plusieurs fois, de plusieurs façons — et enfin à choisir
    celle qui convient à un problème donné.`,
  retour: { href: "../NSI_Terminale/1_Listes_piles_et_files/Parcours_interactif/", libelle: "Retour au site" },
};

export const PALIERS = [
  {
    id: "specifier",
    titre: "Partie 1 — Spécifier avant de programmer",
    seances: ["s01", "s02"],
  },
  {
    id: "lineaires",
    titre: "Partie 2 — Les deux structures linéaires",
    seances: ["s03", "s04"],
  },
  {
    id: "implementations",
    titre: "Partie 3 — Plusieurs implémentations",
    seances: ["s05", "s06"],
  },
  {
    id: "choisir",
    titre: "Partie 4 — Choisir et appliquer",
    seances: ["s07", "s08"],
  },
];

export const CATALOGUE = {
  s01: { numero: 1, nbEtapes: 21, disponible: true,
         titre: "Interface et implémentation",
         resume: "Le contrat d'une structure, et pourquoi il ne dit jamais comment elle est faite." },
  s02: { numero: 2, nbEtapes: 23, disponible: true,
         titre: "Les listes, un type abstrait",
         resume: "vide, est_vide, cons, car, cdr — et la liste comme tête suivie d'une queue." },
  s03: { numero: 3, nbEtapes: 23, disponible: true,
         titre: "Les piles : dernier arrivé, premier servi",
         resume: "LIFO, empiler, depiler, parenthésage, Ctrl+Z — et trois implémentations." },
  s04: { numero: 4, nbEtapes: 23, disponible: true,
         titre: "Les files : premier arrivé, premier servi",
         resume: "FIFO, enfiler, defiler, files de priorité — et pourquoi un tableau ne suffit pas." },
  s05: { numero: 5, nbEtapes: 23, disponible: true,
         titre: "La même file, trois fois",
         resume: "Par tableau, par tableau circulaire, par deux piles : même interface, trois coûts." },
  s06: { numero: 6, nbEtapes: 23, disponible: true,
         titre: "Les listes chaînées",
         resume: "Des maillons reliés un à un, et ce que le chaînage rend enfin gratuit." },
  s07: { numero: 7, nbEtapes: 23, disponible: true,
         titre: "Choisir la bonne structure",
         resume: "Liste ou dictionnaire ? Tableau ou chaînage ? La recherche tranche." },
  s08: { numero: 8, nbEtapes: 23, disponible: true,
         titre: "Piles et files au travail",
         resume: "Parenthèses, notation polonaise inverse, tri crêpes, file d'attente." },
};
