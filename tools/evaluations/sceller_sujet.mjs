/* Scelle un sujet : chiffre les questions pour la mise en ligne.
 *
 *   node tools/evaluations/sceller_sujet.mjs eval-blanc
 *   node tools/evaluations/sceller_sujet.mjs eval-blanc "RUBIS-LUNE-42"
 *
 * Lit  tools/evaluations/prive/sujet-<cle>.mjs   la source, en clair, hors dépôt
 * Écrit docs/<cle>/sujet.js              le sujet publié, illisible sans le code
 *
 * Sans code donné en argument, il en fabrique un — trois mots et un nombre, qui
 * se dictent à l'oral. Le rejouer plus tard produirait un autre chiffrement,
 * donc un autre code ; le sujet, lui, ne change pas.
 *
 * Le travail est dans sceller.mjs : ce fichier n'est que sa façade en ligne de
 * commande. La page locale (console.mjs) appelle le même cœur.
 */

import { scellerEvaluation, ErreurDeScellage } from "./sceller.mjs";
import { CARNET } from "./codes.mjs";
import { RACINE } from "./manifeste.mjs";

const VERT = "\x1b[32m", ROUGE = "\x1b[31m", GRAS = "\x1b[1m", GRIS = "\x1b[90m", NEUTRE = "\x1b[0m";

const cle = process.argv[2];
if (!cle) {
  console.error("usage : node tools/evaluations/sceller_sujet.mjs <cle> [code]");
  process.exit(2);
}

let fait;
try {
  fait = await scellerEvaluation(cle, process.argv[3]);
} catch (erreur) {
  if (!(erreur instanceof ErreurDeScellage)) throw erreur;
  console.error(`${ROUGE}${erreur.message}${NEUTRE}`);
  process.exit(2);
}

console.log(`
${VERT}✓${NEUTRE} ${fait.titre}
  source  ${GRIS}${fait.source}${NEUTRE}
  publié  ${GRIS}${fait.publie}${NEUTRE}  (${fait.nbQuestions} questions, ${fait.points} points)

  ${GRAS}CODE DE L'ÉVALUATION : ${fait.code}${NEUTRE}
${fait.reactivee ? "" : `
  ${GRIS}Cette évaluation est désactivée : son code n'ouvrira rien tant qu'elle
  ne sera pas réactivée.${NEUTRE}
`}
  À écrire au tableau au début de l'épreuve. Il est consigné dans
  ${GRIS}${CARNET.replace(RACINE + "/", "")}${NEUTRE}, hors dépôt :
  ${GRIS}node tools/evaluations/evaluations.mjs${NEUTRE} le rappelle.
  Ce carnet ouvre toutes les épreuves — il se sauvegarde comme les sujets.
`);
