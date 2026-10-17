/* Catalogue du parcours Python de Maths Première.
 *
 * Pour des élèves de spécialité maths peu à l'aise en Python, qui travaillent
 * SEULS, à la maison. D'où trois choix qui le distinguent des parcours NSI :
 *   - des séances plus courtes, sans partie « défis » : découverte puis
 *     application, et une séance de défis à la toute fin ;
 *   - un accompagnement plus serré : départs plus complets, prédictions avant
 *     chaque mécanisme, dernier coup de pouce très directif ;
 *   - les maths du programme comme fil rouge : images par une fonction, termes
 *     d'une suite, discriminant et racines d'un trinôme.
 *
 * Partie 1 : rappels de Seconde (le parcours SNT, en accéléré).
 * Partie 2 : la partie 1 du chapitre 4 de NSI (les listes), rendue accessible.
 *
 * Le moteur est partagé avec les autres parcours : docs/parcours/app.js.
 */

/* Identité de ce parcours : lue par le moteur partagé. */
export const PARCOURS = {
  cle: "parcours-maths-1e",
  titre: "Python — Maths Première",
  surTitre: "Spécialité mathématiques · Première",
  h1: "Python pour les maths, une étape à la fois",
  accroche: `Tu as fait du Python en Seconde, mais tout n'est pas resté ? C'est fait pour toi.
    On reprend les bases en douceur, puis on découvre les <strong>listes</strong>, avec les
    suites et le second degré comme terrain de jeu. Chaque étape vérifie ton travail, des
    coups de pouce t'attendent si tu bloques, et ta progression est enregistrée
    automatiquement.`,
  retour: { href: "../Maths_Premiere/Parcours_Python/", libelle: "Retour au site" },
};

/* Les deux premières parties se closent par un bilan : `bilan` est le résumé
   affiché sur l'accueil, la fiche elle-même vit dans bilans.js. */
export const PALIERS = [
  {
    id: "rappels",
    titre: "Partie 1 — Les rappels de Seconde",
    seances: ["s01", "s02", "s03", "s04"],
  },
  {
    id: "listes",
    titre: "Partie 2 — Les listes",
    seances: ["s05", "s06", "s07", "s08"],
  },
  {
    id: "defi",
    titre: "Partie 3 — Le défi final",
    seances: ["s09"],
  },
];

export const CATALOGUE = {
  s01: { numero: 1, nbEtapes: 20, disponible: true,
         titre: "Calculer et mémoriser",
         resume: "print(), les opérations, les variables : image d'un nombre, discriminant." },
  s02: { numero: 2, nbEtapes: 16, disponible: false,
         titre: "Décider",
         resume: "if, elif, else : le signe du discriminant et les racines d'un trinôme." },
  s03: { numero: 3, nbEtapes: 16, disponible: false,
         titre: "Répéter",
         resume: "for et while : les termes d'une suite, une somme, un seuil." },
  s04: { numero: 4, nbEtapes: 16, disponible: false,
         titre: "Les fonctions",
         resume: "def et return : f(x), u(n), delta(a, b, c)." },
  s05: { numero: 5, nbEtapes: 16, disponible: false,
         titre: "Créer une liste et lire ses éléments",
         resume: "Crochets, indices à partir de 0, len(), le dernier élément." },
  s06: { numero: 6, nbEtapes: 16, disponible: false,
         titre: "Modifier et remplir une liste",
         resume: "L[i] = …, append(), sum, min, max : la liste des termes d'une suite." },
  s07: { numero: 7, nbEtapes: 16, disponible: false,
         titre: "Parcourir une liste",
         resume: "Par élément ou par indice : moyenne, comptage, tableau de valeurs." },
  s08: { numero: 8, nbEtapes: 15, disponible: false,
         titre: "Les listes en compréhension",
         resume: "Construire et filtrer en une ligne : termes, images, diviseurs." },
  s09: { numero: 9, nbEtapes: 10, disponible: false,
         titre: "Le défi final",
         resume: "Tout ensemble : racines d'un trinôme, Fibonacci, seuils, et un sujet libre." },
};
