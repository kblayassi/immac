/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller.mjs à partir de
 * tools/evaluations/sujet-eval-blanc-snt.mjs, qui est la source et qui n'est pas publiée.
 *
 * Les questions sont chiffrées (AES-GCM, clé dérivée du code par PBKDF2) : ce
 * fichier ne livre rien tant que le code n'est pas entré. Pour modifier le
 * sujet, on modifie la source et on rescelle — jamais ce fichier-ci.
 *
 * Scellé le 2026-10-08.
 */

export const EVALUATION = {
  "cle": "eval-blanc-snt",
  "titre": "Évaluation à blanc — SNT",
  "surTitre": "SNT · Seconde · Entraînement",
  "niveau": "SNT Seconde",
  "dureeMinutes": 10,
  "retour": {
    "href": "../SNT/Evaluations/"
  },
  "consignes": "\n    <p>Cette évaluation <strong>ne compte pas</strong>. Elle sert à t'entraîner\n    avant un vrai devoir : le chronomètre, l'éditeur, la remise.</p>\n    <p>Tu peux la passer <strong>autant de fois que tu veux</strong>. Dès que tu\n    l'as rendue, elle est corrigée et tu peux lire ta correction.</p>"
};

export const SCELLE = {
  "format": "sujet-scelle/v1",
  "nbQuestions": 5,
  "points": 8,
  "sel": "hnx9vaCQeJseVH30nhvbXg==",
  "iv": "cysymmGmahg7hM4X",
  "donnees": "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"
};
