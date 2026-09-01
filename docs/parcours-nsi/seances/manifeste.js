/* Catalogue du parcours NSI — chapitre 1 « Premiers pas en Python ».
 *
 * Reprend l'intégralité du cours et des 40 exercices du chapitre, dans le même
 * ordre, découpés en séquences courtes : chacune a sa découverte, ses exercices
 * et ses défis. Les exercices « papier » du chapitre sont devenus des QCM.
 *
 * Le moteur est partagé avec le parcours de SNT : docs/parcours/app.js.
 */

/* Identité de ce parcours : lue par le moteur partagé. */
export const PARCOURS = {
  cle: "parcours-nsi-ch1",
  titre: "NSI — Premiers pas en Python",
  surTitre: "NSI · Première · Chapitre 1",
  h1: "Premiers pas en Python, version interactive",
  accroche: `Le même chapitre que dans le cours, mais découpé en petites étapes
    qui se valident une par une. Tu écris du code dès la première minute, la page
    vérifie ton travail, et ta progression est enregistrée automatiquement.`,
  retour: { href: "../NSI/1bis_Parcours_interactif/", libelle: "Retour au site" },
};

export const PALIERS = [
  {
    id: "donnees",
    titre: "Partie 1 — Manipuler des données",
    seances: ["s01", "s02", "s03"],
  },
  {
    id: "decider",
    titre: "Partie 2 — Prendre des décisions",
    seances: ["s04", "s05", "s06", "s07"],
  },
  {
    id: "repeter",
    titre: "Partie 3 — Répéter des instructions",
    seances: ["s08", "s09", "s10"],
  },
  {
    id: "structurer",
    titre: "Partie 4 — Structurer un programme",
    seances: ["s11", "s12", "s13"],
  },
];

export const CATALOGUE = {
  s01: { numero: 1,  nbEtapes: 19, disponible: true,
         titre: "Le langage Python et les variables",
         resume: "Affectation, écrasement, incrémentation, conventions de nommage." },
  s02: { numero: 2,  nbEtapes: 0, disponible: false,
         titre: "Les types et les conversions",
         resume: "int, float, str, bool, type(), int(), str(), float(), input()." },
  s03: { numero: 3,  nbEtapes: 0, disponible: false,
         titre: "Afficher : concaténation et f-strings",
         resume: "print(), l'opérateur +, str(), et les f-strings." },
  s04: { numero: 4,  nbEtapes: 0, disponible: false,
         titre: "Comparaisons et opérateurs logiques",
         resume: "==, !=, <, >, <=, >= et les connecteurs and, or, not." },
  s05: { numero: 5,  nbEtapes: 0, disponible: false,
         titre: "La condition simple : if",
         resume: "Un test, un bloc indenté, et rien d'autre." },
  s06: { numero: 6,  nbEtapes: 0, disponible: false,
         titre: "Deux cas : if … else",
         resume: "Traiter aussi ce qui se passe quand la condition est fausse." },
  s07: { numero: 7,  nbEtapes: 0, disponible: false,
         titre: "Plusieurs cas : elif",
         resume: "Cascades exclusives, ordre des tests, if indépendants." },
  s08: { numero: 8,  nbEtapes: 0, disponible: false,
         titre: "La boucle non bornée : while",
         resume: "Condition d'arrêt, boucle infinie, drapeau, saisie contrôlée." },
  s09: { numero: 9,  nbEtapes: 0, disponible: false,
         titre: "La boucle bornée : for et range()",
         resume: "Les trois formes de range, variable de boucle, accumulation." },
  s10: { numero: 10, nbEtapes: 0, disponible: false,
         titre: "Boucles imbriquées, break et continue",
         resume: "Une boucle dans une boucle, et comment sortir plus tôt." },
  s11: { numero: 11, nbEtapes: 0, disponible: false,
         titre: "Les fonctions : définir et appeler",
         resume: "def, appel, paramètres, et pourquoi rien ne s'affiche." },
  s12: { numero: 12, nbEtapes: 0, disponible: false,
         titre: "return, procédures et composition",
         resume: "Renvoyer plutôt qu'afficher, et faire coopérer des fonctions." },
  s13: { numero: 13, nbEtapes: 0, disponible: false,
         titre: "Variables locales, globales et docstring",
         resume: "Où vit une variable, et comment documenter une fonction." },
};
