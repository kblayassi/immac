/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller.mjs à partir de
 * tools/evaluations/sujet-eval-blanc.mjs, qui est la source et qui n'est pas publiée.
 *
 * Les questions sont chiffrées (AES-GCM, clé dérivée du code par PBKDF2) : ce
 * fichier ne livre rien tant que le code n'est pas entré. Pour modifier le
 * sujet, on modifie la source et on rescelle — jamais ce fichier-ci.
 *
 * Scellé le 2026-10-08.
 */

export const EVALUATION = {
  "cle": "eval-blanc",
  "titre": "Évaluation à blanc — NSI Première",
  "surTitre": "NSI · Première · Entraînement",
  "niveau": "NSI Première",
  "dureeMinutes": 10,
  "retour": {
    "href": "../NSI/Evaluations/"
  },
  "consignes": "\n    <p>Cette évaluation <strong>ne compte pas</strong>. Elle sert à t'entraîner\n    avant un vrai devoir : le chronomètre, l'éditeur, la remise.</p>\n    <p>Tu peux la passer <strong>autant de fois que tu veux</strong>. Dès que tu\n    l'as rendue, elle est corrigée et tu peux lire ta correction.</p>"
};

export const SCELLE = {
  "format": "sujet-scelle/v1",
  "nbQuestions": 4,
  "points": 15,
  "sel": "mXbldbhwbIXJXt1Fc/QqNw==",
  "iv": "1fw2GtlTrb+DJAkx",
  "donnees": "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"
};
