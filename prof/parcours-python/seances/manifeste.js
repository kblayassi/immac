/* Catalogue des séances.
 *
 * Le hub se construit à partir de ce seul fichier : il n'importe pas les
 * séances, il n'affiche que leur fiche d'identité. `nbEtapes` sert à calculer
 * l'avancement sans charger le contenu ; l'application prévient dans la console
 * si le compte ne correspond plus au fichier de la séance.
 *
 * Progression validée : 10 séances + 1 bonus, adossées aux fiches T6 / T7 / T8
 * de l'audit des savoir-faire (partie « Algorithmique et programmation »).
 *
 * Les séances sont regroupées en cinq parties de deux séances (la dernière
 * rassemble le reste). Chaque partie se clôt par un bilan : sa clé `bilan` est
 * le résumé affiché sur l'accueil, et la fiche elle-même vit dans bilans.js.
 */

/* Identité de ce parcours : lue par le moteur partagé (docs/parcours/app.js). */
export const PARCOURS = {
  cle: "parcours-python",
  titre: "Parcours Python",
  surTitre: "SNT · Seconde · Algorithmique et programmation",
  h1: "Apprendre Python, une étape à la fois",
  accroche: `Tu viens de Scratch, et c'est exactement le bon point de départ.
    Chaque séance t'explique une idée pas à pas, te fait écrire du code tout de suite,
    et vérifie ton travail à ta place. Ta progression est enregistrée automatiquement.`,
  retour: { href: "../SNT/0_Python/", libelle: "Retour au site" },
};

export const PALIERS = [
  {
    id: "p1",
    titre: "Partie 1 — Premiers programmes et variables",
    seances: ["s01", "s02"],
    bilan: "Afficher, calculer, ranger une valeur dans une variable.",
  },
  {
    id: "p2",
    titre: "Partie 2 — Dialoguer et décider",
    seances: ["s03", "s04"],
    bilan: "Demander une valeur, comparer, choisir entre plusieurs cas.",
  },
  {
    id: "p3",
    titre: "Partie 3 — Boucle bornée et boucle non bornée",
    seances: ["s05", "s06"],
    bilan: "Répéter, accumuler, s'arrêter au bon moment.",
  },
  {
    id: "p4",
    titre: "Partie 4 — Les fonctions",
    seances: ["s07", "s08"],
    bilan: "Écrire, appeler et réutiliser une fonction.",
  },
  {
    id: "p5",
    titre: "Partie 5 — Hasard, projet et boîte à outils",
    seances: ["s09", "s10", "s11"],
    bilan: "Simuler le hasard, et choisir le bon algorithme.",
  },
];

export const CATALOGUE = {
  s01: {
    numero: 1, duree: 75, nbEtapes: 25, disponible: true,
    titre: "De Scratch à Python",
    resume: "Premier programme, print(), séquence d'instructions, lire une erreur.",
  },
  s02: {
    numero: 2, duree: 75, nbEtapes: 25, disponible: true,
    titre: "Variables, types et calculs",
    resume: "Affectation, entiers, flottants, chaînes, division entière et reste.",
  },
  s03: {
    numero: 3, duree: 75, nbEtapes: 25, disponible: true,
    titre: "Dialoguer et comparer",
    resume: "input(), conversions, booléens, comparaisons, and / or / not.",
  },
  s04: {
    numero: 4, duree: 75, nbEtapes: 25, disponible: true,
    titre: "L'instruction conditionnelle",
    resume: "if, elif, else, indentation, conditions composées.",
  },
  s05: {
    numero: 5, duree: 75, nbEtapes: 25, disponible: true,
    titre: "La boucle bornée for",
    resume: "range, répéter, accumuler : somme, compteur, extremum.",
  },
  s06: {
    numero: 6, duree: 75, nbEtapes: 25, disponible: true,
    titre: "La boucle non bornée while",
    resume: "Condition d'arrêt, algorithme de seuil, balayage.",
  },
  s07: {
    numero: 7, duree: 75, nbEtapes: 25, disponible: true,
    titre: "Écrire une fonction",
    resume: "def, paramètre, appel, et la grande différence entre return et print.",
  },
  s08: {
    numero: 8, duree: 75, nbEtapes: 25, disponible: true,
    titre: "Fonctions à plusieurs arguments",
    resume: "Plusieurs paramètres ; lire, modifier et compléter une fonction.",
  },
  s09: {
    numero: 9, duree: 75, nbEtapes: 25, disponible: true,
    titre: "Hasard et simulation",
    resume: "random, expérience aléatoire, répétition, loi des grands nombres.",
  },
  s10: {
    numero: 10, duree: 75, nbEtapes: 21, disponible: true,
    titre: "Projet & bilan",
    resume: "Trois sujets au choix, trois niveaux d'exigence.",
  },
  s11: {
    numero: 11, duree: 75, nbEtapes: 20, disponible: true,
    titre: "Bonus — la boîte à outils des maths",
    resume: "Les algorithmes exigibles du programme de Seconde, rassemblés.",
  },
};
