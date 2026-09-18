/* Scelle un sujet : chiffre les questions pour la mise en ligne.
 *
 *   node tools/evaluations/sceller_sujet.mjs eval-blanc
 *   node tools/evaluations/sceller_sujet.mjs eval-blanc "RUBIS-LUNE-42"
 *
 * Lit  tools/evaluations/prive/sujet-<cle>.mjs   la source, en clair, hors dépôt
 * Écrit docs/<cle>/sujet.js              le sujet publié, illisible sans le code
 *
 * Sans code donné en argument, il en fabrique un — deux mots et un nombre, qui
 * se dictent à l'oral. **Note-le : il n'est écrit nulle part.** Le rejouer plus
 * tard produirait un autre chiffrement, donc un autre code ; le sujet, lui, ne
 * change pas.
 *
 * Ce qui reste en clair dans le fichier publié : la clé de l'évaluation, son
 * titre, sa durée, ses consignes générales, le nombre de questions et le total
 * des points. De quoi annoncer l'épreuve, rien pour la préparer.
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { sceller, ouvrir, fabriquerCode, normaliserCode } from "../../docs/eval/scelle.js";
import { lireManifeste, ecrireManifeste } from "./manifeste.mjs";
import { noterCode, CARNET } from "./codes.mjs";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, "..", "..");

/* Les vraies évaluations vivent dans tools/evaluations/prive/, que .gitignore
   tient hors du dépôt : celui-ci est public, et un barème versionné serait un
   barème publié. On regarde donc d'abord là, puis dans le dossier des outils —
   où seule l'évaluation à blanc, qui ne cache rien, est restée. */
const PRIVE = join(ICI, "prive");
function trouver(nom) {
  const candidat = join(PRIVE, nom);
  return existsSync(candidat) ? candidat : join(ICI, nom);
}

const VERT = "\x1b[32m", ROUGE = "\x1b[31m", GRAS = "\x1b[1m", GRIS = "\x1b[90m", NEUTRE = "\x1b[0m";

const cle = process.argv[2];
if (!cle) {
  console.error("usage : node tools/evaluations/sceller_sujet.mjs <cle> [code]");
  process.exit(2);
}
const code = process.argv[3] || fabriquerCode();

if (normaliserCode(code).length < 8) {
  console.error(`${ROUGE}Code trop court${NEUTRE} : il doit faire au moins 8 caractères ` +
                `une fois les tirets et les espaces retirés.\n` +
                `Un code court se casse hors ligne, et le sujet avec.`);
  process.exit(2);
}

/* --- la source en clair */
const source = trouver(`sujet-${cle}.mjs`);
if (!existsSync(source)) {
  console.error(`${ROUGE}Introuvable${NEUTRE} : ${source}`);
  process.exit(2);
}
const { EVALUATION, QUESTIONS } = await import(source);

/* --- le scellage, puis sa vérification immédiate : on ne publie pas un fichier
       qu'on n'a pas réussi à rouvrir. */
const scelle = await sceller(QUESTIONS, code);
const relu = await ouvrir(scelle, code);
if (JSON.stringify(relu) !== JSON.stringify(QUESTIONS)) {
  console.error(`${ROUGE}Le sujet scellé ne se rouvre pas à l'identique. Rien n'a été écrit.${NEUTRE}`);
  process.exit(1);
}
if (await ouvrir(scelle, code + "x")) {
  console.error(`${ROUGE}Un code faux ouvre le sujet. Rien n'a été écrit.${NEUTRE}`);
  process.exit(1);
}

/* --- le fichier publié */
/* La clé EST le nom du dossier : « eval-blanc » → docs/eval-blanc/. */
const dossier = join(RACINE, "docs", cle);
mkdirSync(dossier, { recursive: true });

const fichier = `/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller_sujet.mjs à partir de
 * tools/evaluations/sujet-${cle}.mjs, qui est la source et qui n'est pas publiée.
 *
 * Les questions sont chiffrées (AES-GCM, clé dérivée du code par PBKDF2) : ce
 * fichier ne livre rien tant que le code n'est pas entré. Pour modifier le
 * sujet, on modifie la source et on rescelle — jamais ce fichier-ci.
 *
 * Scellé le ${new Date().toISOString().slice(0, 10)}.
 */

export const EVALUATION = ${JSON.stringify(EVALUATION, null, 2)};

export const SCELLE = ${JSON.stringify(scelle, null, 2)};
`;

writeFileSync(join(dossier, "sujet.js"), fichier);

/* --- le manifeste : la page d'entrée doit savoir que cette évaluation existe.
       On le réécrit plutôt que de demander à l'enseignant d'y penser. Resceller
       une épreuve déjà publiée ne la réactive pas : celle qu'on avait fermée le
       reste, c'est un geste séparé (evaluations.mjs --activer). */
const EVALUATIONS = await lireManifeste();
const ancienne = EVALUATIONS.find((e) => e.cle === cle);
ecrireManifeste([
  ...EVALUATIONS.filter((e) => e.cle !== cle),
  { cle, titre: EVALUATION.titre, niveau: EVALUATION.niveau ?? null,
    actif: ancienne ? ancienne.actif : true },
]);

/* --- le carnet : le code est consigné hors dépôt, pour qu'on puisse le relire.
       Sans cela, un code égaré fermerait l'épreuve même pour son auteur. */
noterCode(cle, code);

console.log(`
${VERT}✓${NEUTRE} ${EVALUATION.titre}
  source  ${GRIS}tools/evaluations/sujet-${cle}.mjs${NEUTRE}
  publié  ${GRIS}docs/${cle}/sujet.js${NEUTRE}  (${scelle.nbQuestions} questions, ${scelle.points} points)

  ${GRAS}CODE DE L'ÉVALUATION : ${code}${NEUTRE}

  À écrire au tableau au début de l'épreuve. Il est consigné dans
  ${GRIS}${CARNET.replace(RACINE + "/", "")}${NEUTRE}, hors dépôt :
  ${GRIS}node tools/evaluations/evaluations.mjs${NEUTRE} le rappelle.
  Ce carnet ouvre toutes les épreuves — il se sauvegarde comme les sujets.
`);
