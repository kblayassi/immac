/* Catalogue du parcours NSI — chapitre 6 « Types construits ».
 *
 * Reprend l'intégralité du cours, des 30 exercices et des 3 TP du chapitre,
 * dans le même ordre, découpés en séquences courtes : chacune a sa découverte,
 * ses exercices et ses défis. Les exercices « papier » sont devenus des QCM et
 * des prédictions ; les TP sont placés là où le cours en a besoin.
 *
 * Plan validé par Kévin le 25/11/2026 (« c'est parfait ») :
 *   Partie 1 — Les p-uplets          s01 s02 s03   TP1, ex. 1 à 12
 *   Partie 2 — Les dictionnaires     s04 s05 s06 s07   TP2, TP3, ex. 13 à 26, 29, 30
 *   Partie 3 — Organiser des données s08 s09       ex. 22, 27, 28
 *
 * Le moteur est partagé avec les autres parcours : docs/parcours/app.js.
 */

/* Identité de ce parcours : lue par le moteur partagé. */
export const PARCOURS = {
  cle: "parcours-nsi-ch6",
  titre: "NSI — Types construits",
  surTitre: "NSI · Première · Chapitre 6",
  h1: "Types construits, version interactive",
  accroche: `Le même chapitre que dans le cours, mais découpé en petites étapes
    qui se valident une par une. Tu regroupes des valeurs en p-uplets, tu les
    retrouves par leur nom dans des dictionnaires, la page vérifie ton travail, et
    ta progression est enregistrée automatiquement.`,
  retour: { href: "../NSI/6_Types_construits/Parcours_interactif/", libelle: "Retour au site" },
};

/* Chaque partie se clôt par un bilan : `bilan` est le résumé affiché sur
   l'accueil, la fiche elle-même vit dans bilans.js. */
export const PALIERS = [
  {
    id: "puplets",
    titre: "Partie 1 — Les p-uplets",
    seances: ["s01", "s02", "s03"],
    bilan: "Créer, lire, remplacer, renvoyer et déballer un p-uplet.",
  },
  {
    id: "dictionnaires",
    titre: "Partie 2 — Les dictionnaires",
    seances: ["s04", "s05", "s06", "s07"],
    bilan: "Lire sans risque, modifier, parcourir, compter des occurrences.",
  },
  {
    id: "organiser",
    titre: "Partie 3 — Organiser des données",
    seances: ["s08", "s09"],
    bilan: "Tables, dossiers, et le choix de la bonne structure.",
  },
];

export const CATALOGUE = {
  s01: { numero: 1, nbEtapes: 20, disponible: true,
         titre: "Créer et lire un p-uplet",
         resume: "Parenthèses et virgules, indices, len(), in, + et *." },
  s02: { numero: 2, nbEtapes: 20, disponible: true,
         titre: "Un p-uplet ne se modifie pas",
         resume: "Immuabilité, TypeError, nouveaux objets, list() et tuple()." },
  s03: { numero: 3, nbEtapes: 18, disponible: true,
         titre: "Renvoyer plusieurs valeurs",
         resume: "return a, b, le déballage, l'échange en une ligne." },
  s04: { numero: 4, nbEtapes: 21, disponible: true,
         titre: "Créer et lire un dictionnaire",
         resume: "Clés et valeurs, KeyError, in sur les clés, get()." },
  s05: { numero: 5, nbEtapes: 17, disponible: true,
         titre: "Modifier un dictionnaire",
         resume: "Ajouter, modifier, supprimer avec del, des clés uniques." },
  s06: { numero: 6, nbEtapes: 18, disponible: true,
         titre: "Parcourir un dictionnaire",
         resume: "keys(), values() et items()." },
  s07: { numero: 7, nbEtapes: 15, disponible: true,
         titre: "Construire au fil d'un parcours",
         resume: "Tester la clé, puis incrémenter ou créer : compter des occurrences." },
  s08: { numero: 8, nbEtapes: 16, disponible: true,
         titre: "Des structures imbriquées",
         resume: "Dictionnaires de dictionnaires, listes d'enregistrements, p-uplets comme clés." },
  s09: { numero: 9, nbEtapes: 13, disponible: true,
         titre: "Choisir la bonne structure",
         resume: "P-uplet, tableau ou dictionnaire : décider, puis programmer." },
};
