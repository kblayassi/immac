/* Catalogue du parcours NSI — chapitre 4 « Listes et chaînes de caractères ».
 *
 * Reprend l'intégralité du cours, des 26 exercices et des 3 TP du chapitre,
 * dans le même ordre, découpés en séquences courtes : chacune a sa découverte,
 * ses exercices et ses défis. Les exercices « papier » sont devenus des QCM et
 * des prédictions ; les TP sont placés là où le cours en a besoin.
 *
 * Le moteur est partagé avec les autres parcours : docs/parcours/app.js.
 */

/* Identité de ce parcours : lue par le moteur partagé. */
export const PARCOURS = {
  cle: "parcours-nsi-ch4",
  titre: "NSI — Listes et chaînes de caractères",
  surTitre: "NSI · Première · Chapitre 4",
  h1: "Listes et chaînes de caractères, version interactive",
  accroche: `Le même chapitre que dans le cours, mais découpé en petites étapes
    qui se valident une par une. Tu ranges, parcours et transformes des collections
    de valeurs dès la première minute, la page vérifie ton travail, et ta progression
    est enregistrée automatiquement.`,
  retour: { href: "../NSI/4_Listes_et_chaines_de_caracteres/Parcours_interactif/", libelle: "Retour au site" },
};

/* Chaque partie se clôt par un bilan : `bilan` est le résumé affiché sur
   l'accueil, la fiche elle-même vit dans bilans.js. */
export const PALIERS = [
  {
    id: "listes",
    titre: "Partie 1 — Les listes",
    seances: ["s01", "s02", "s03", "s04"],
    bilan: "Créer, lire, modifier, parcourir, construire en compréhension.",
  },
  {
    id: "memoire",
    titre: "Partie 2 — Matrices et mémoire",
    seances: ["s05", "s06"],
    bilan: "Matrices, adresses, alias, et comment copier vraiment.",
  },
  {
    id: "algorithmes",
    titre: "Partie 3 — Premiers algorithmes",
    seances: ["s07", "s08", "s09", "s10"],
    bilan: "Du pseudo-code à Python : rechercher, compter, record, moyenne.",
  },
  {
    id: "chaines",
    titre: "Partie 4 — Les chaînes de caractères",
    seances: ["s11", "s12"],
    bilan: "Indexer, construire, découper et chiffrer une chaîne.",
  },
];

export const CATALOGUE = {
  s01: { numero: 1,  nbEtapes: 20, disponible: true,
         titre: "Créer une liste et lire ses éléments",
         resume: "Crochets, indices à partir de 0, len(), indices négatifs, IndexError." },
  s02: { numero: 2,  nbEtapes: 21, disponible: true,
         titre: "Modifier une liste",
         resume: "L[i] = …, append(), et les fonctions len, sum, min, max, in." },
  s03: { numero: 3,  nbEtapes: 20, disponible: true,
         titre: "Parcourir une liste",
         resume: "Par élément ou par indice, et le schéma de l'accumulateur." },
  s04: { numero: 4,  nbEtapes: 19, disponible: true,
         titre: "Les listes en compréhension",
         resume: "Construire, transformer et filtrer une liste en une ligne." },
  s05: { numero: 5,  nbEtapes: 22, disponible: true,
         titre: "Les matrices",
         resume: "Listes de listes, M[i][j], dimensions, doubles boucles." },
  s06: { numero: 6,  nbEtapes: 21, disponible: true,
         titre: "Ce qui se passe en mémoire",
         resume: "Adresses, alias, == contre is, et comment copier vraiment." },
  s07: { numero: 7,  nbEtapes: 17, disponible: true,
         titre: "De l'algorithme au programme",
         resume: "Organigramme, pseudo-code, puis Python : l'algorithme d'Euclide." },
  s08: { numero: 8,  nbEtapes: 21, disponible: true,
         titre: "Parcours total, parcours partiel",
         resume: "Compter, rechercher une occurrence, et savoir quand s'arrêter." },
  s09: { numero: 9,  nbEtapes: 19, disponible: true,
         titre: "Où se trouve la valeur ?",
         resume: "Indice de la première occurrence, liste de toutes les occurrences." },
  s10: { numero: 10, nbEtapes: 19, disponible: true,
         titre: "Extremum et moyenne",
         resume: "Chercher un record, sa position, et calculer une moyenne." },
  s11: { numero: 11, nbEtapes: 22, disponible: true,
         titre: "Une chaîne est une séquence",
         resume: "Indexation, immuabilité, concaténation et répétition." },
  s12: { numero: 12, nbEtapes: 20, disponible: true,
         titre: "Parcourir et découper une chaîne",
         resume: "Parcours, sous-chaînes, tranches, et le chiffre de César." },
};
