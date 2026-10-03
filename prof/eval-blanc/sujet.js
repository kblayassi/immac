/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller.mjs à partir de
 * tools/evaluations/sujet-eval-blanc.mjs, qui est la source et qui n'est pas publiée.
 *
 * Les questions sont chiffrées (AES-GCM, clé dérivée du code par PBKDF2) : ce
 * fichier ne livre rien tant que le code n'est pas entré. Pour modifier le
 * sujet, on modifie la source et on rescelle — jamais ce fichier-ci.
 *
 * Scellé le 2026-10-03.
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
  "sel": "TOqhDcKqLH/+alag4A+91g==",
  "iv": "V7da2xb5GbxNmfK7",
  "donnees": "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"
};
