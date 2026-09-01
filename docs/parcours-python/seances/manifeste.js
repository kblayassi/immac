/* Catalogue des séances.
 *
 * Le hub se construit à partir de ce seul fichier : il n'importe pas les
 * séances, il n'affiche que leur fiche d'identité. `nbEtapes` sert à calculer
 * l'avancement sans charger le contenu ; l'application prévient dans la console
 * si le compte ne correspond plus au fichier de la séance.
 *
 * Progression validée : 10 séances + 1 bonus, adossées aux fiches T6 / T7 / T8
 * de l'audit des savoir-faire (partie « Algorithmique et programmation »).
 */

export const PALIERS = [
  {
    id: "t6",
    titre: "Partie 1 — Variables, affectation, instruction conditionnelle",
    seances: ["s01", "s02", "s03", "s04"],
  },
  {
    id: "t7",
    titre: "Partie 2 — Boucle bornée et boucle non bornée",
    seances: ["s05", "s06"],
  },
  {
    id: "t8",
    titre: "Partie 3 — Fonctions et aléatoire",
    seances: ["s07", "s08", "s09"],
  },
  {
    id: "fin",
    titre: "Partie 4 — Pour finir",
    seances: ["s10", "s11"],
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
