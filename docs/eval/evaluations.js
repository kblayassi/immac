/* Les évaluations publiées.
 *
 * Tenu à jour par tools/evaluations/ — ne pas modifier à la main :
 *   sceller_sujet.mjs  y inscrit une épreuve quand il la publie ;
 *   console.mjs et evaluations.mjs  l'activent ou la désactivent.
 *
 * La page d'entrée (passer.html) essaie le code saisi sur chaque évaluation
 * ACTIVE jusqu'à ce que l'une s'ouvre : c'est le code qui désigne l'épreuve,
 * l'élève n'a rien à choisir. Une évaluation désactivée garde son sujet publié,
 * mais son code n'ouvre plus rien.
 *
 * Rien ici n'est secret : ces clés ne disent que l'existence d'une épreuve, et
 * le sujet correspondant reste chiffré (docs/eval/scelle.js).
 */

export const EVALUATIONS = [
  {
    "cle": "eval-blanc",
    "titre": "Évaluation à blanc",
    "niveau": "NSI Première",
    "actif": true
  },
  {
    "cle": "eval-nsi-ch1",
    "titre": "Chapitre 1 — Premiers pas en Python",
    "niveau": "NSI Première",
    "actif": false
  },
  {
    "cle": "eval-nsi-term-ch1",
    "titre": "Chapitre 1 — Listes, piles et files",
    "niveau": "NSI Terminale",
    "actif": true
  }
];
