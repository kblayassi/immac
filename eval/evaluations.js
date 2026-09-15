/* Les évaluations publiées.
 *
 * Tenu à jour par tools/evaluations/sceller_sujet.mjs — ne pas modifier à la
 * main. La page d'entrée (passer.html) essaie le code saisi sur chacune d'elles
 * jusqu'à ce que l'une s'ouvre : c'est le code qui désigne l'évaluation, l'élève
 * n'a rien à choisir.
 *
 * Rien ici n'est secret : ces clés ne disent que l'existence d'une épreuve, et
 * le sujet correspondant reste chiffré (docs/eval/scelle.js).
 */

export const EVALUATIONS = [
  {
    "cle": "eval-blanc",
    "titre": "Évaluation à blanc"
  }
];
