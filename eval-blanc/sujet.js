/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller_sujet.mjs à partir de
 * tools/evaluations/sujet-eval-blanc.mjs, qui est la source et qui n'est pas publiée.
 *
 * Les questions sont chiffrées (AES-GCM, clé dérivée du code par PBKDF2) : ce
 * fichier ne livre rien tant que le code n'est pas entré. Pour modifier le
 * sujet, on modifie la source et on rescelle — jamais ce fichier-ci.
 *
 * Scellé le 2026-09-18.
 */

export const EVALUATION = {
  "cle": "eval-blanc",
  "titre": "Évaluation à blanc",
  "surTitre": "Essai du dispositif",
  "niveau": "NSI Première",
  "dureeMinutes": 5,
  "consignes": "\n    <p>Cette évaluation ne compte pas. Elle sert à vérifier que tout fonctionne :\n    le chronomètre, l'éditeur, et surtout le fichier que tu remettras à la fin.</p>\n    <p>Réponds n'importe quoi si tu veux — ce qu'on regarde, c'est que le fichier\n    arrive bien jusqu'à ton professeur.</p>"
};

export const SCELLE = {
  "format": "sujet-scelle/v1",
  "nbQuestions": 4,
  "points": 15,
  "sel": "4UAdO1xv1Ls7TnLzs37VVg==",
  "iv": "rSP0z5ghT5Zzsis4",
  "donnees": "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"
};
