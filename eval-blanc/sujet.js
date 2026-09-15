/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller_sujet.mjs à partir de
 * tools/evaluations/sujet-eval-blanc.mjs, qui est la source et qui n'est pas publiée.
 *
 * Les questions sont chiffrées (AES-GCM, clé dérivée du code par PBKDF2) : ce
 * fichier ne livre rien tant que le code n'est pas entré. Pour modifier le
 * sujet, on modifie la source et on rescelle — jamais ce fichier-ci.
 *
 * Scellé le 2026-09-11.
 */

export const EVALUATION = {
  "cle": "eval-blanc",
  "titre": "Évaluation à blanc",
  "surTitre": "Essai du dispositif",
  "dureeMinutes": 5,
  "consignes": "\n    <p>Cette évaluation ne compte pas. Elle sert à vérifier que tout fonctionne :\n    le chronomètre, l'éditeur, et surtout le fichier que tu remettras à la fin.</p>\n    <p>Réponds n'importe quoi si tu veux — ce qu'on regarde, c'est que le fichier\n    arrive bien jusqu'à ton professeur.</p>"
};

export const SCELLE = {
  "format": "sujet-scelle/v1",
  "nbQuestions": 4,
  "points": 15,
  "sel": "Vg3zdnttVaRk5UQvNLrihw==",
  "iv": "GbGCxobRp9uX+iog",
  "donnees": "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"
};
