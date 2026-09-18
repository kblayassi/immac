/* Sceller un sujet : le cœur, sans affichage.
 *
 * Chiffre les questions (AES-GCM, clé dérivée du code par PBKDF2), vérifie son
 * propre travail, écrit docs/<cle>/sujet.js, tient le manifeste à jour et
 * consigne le code. Ce qui reste en clair dans le fichier publié : la clé, le
 * titre, le niveau, la durée, les consignes générales, le nombre de questions
 * et le total des points. De quoi annoncer l'épreuve, rien pour la préparer.
 *
 * Deux façades l'appellent — sceller_sujet.mjs en ligne de commande, console.mjs
 * pour la page locale. Elles n'ont que l'affichage à faire.
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

import { sceller, ouvrir, fabriquerCode, normaliserCode } from "../../docs/eval/scelle.js";
import { lireManifeste, ecrireManifeste, RACINE } from "./manifeste.mjs";
import { noterCode } from "./codes.mjs";

const ICI = dirname(fileURLToPath(import.meta.url));
const PRIVE = join(ICI, "prive");

/* Une erreur prévue — source absente, code trop court — par opposition à un
   bug. Les deux façades l'affichent comme un message, pas comme une trace. */
export class ErreurDeScellage extends Error {}

let lectures = 0;

/* Les vraies évaluations vivent dans tools/evaluations/prive/, que .gitignore
   tient hors du dépôt : celui-ci est public, et un sujet en clair versionné
   serait un sujet publié. On regarde donc d'abord là, puis dans le dossier des
   outils — où seule l'évaluation à blanc, qui ne cache rien, est restée. */
export function trouverSource(cle) {
  const candidat = join(PRIVE, `sujet-${cle}.mjs`);
  if (existsSync(candidat)) return candidat;
  const secours = join(ICI, `sujet-${cle}.mjs`);
  return existsSync(secours) ? secours : null;
}

export async function scellerEvaluation(cle, codeDemande) {
  const code = codeDemande || fabriquerCode();

  if (normaliserCode(code).length < 8) {
    throw new ErreurDeScellage(
      "Code trop court : il doit faire au moins 8 caractères une fois les tirets " +
      "et les espaces retirés. Un code court se casse hors ligne, et le sujet avec.");
  }

  const source = trouverSource(cle);
  if (!source) {
    throw new ErreurDeScellage(
      `Source introuvable : tools/evaluations/prive/sujet-${cle}.mjs. ` +
      `Sceller exige de lire le sujet en clair — il est hors dépôt, reprends-le sur la clé USB.`);
  }

  // Une adresse neuve force la relecture : une source modifiée entre deux
  // scellages d'un même processus (la console) serait sinon servie depuis le
  // cache des modules. Un compteur, pas l'heure : deux scellages dans la même
  // milliseconde auraient la même adresse.
  const { EVALUATION, QUESTIONS } = await import(pathToFileURL(source).href + `?lecture=${++lectures}`);

  /* Le scellage, puis sa vérification immédiate : on ne publie pas un fichier
     qu'on n'a pas réussi à rouvrir. */
  const scelle = await sceller(QUESTIONS, code);
  const relu = await ouvrir(scelle, code);
  if (JSON.stringify(relu) !== JSON.stringify(QUESTIONS)) {
    throw new ErreurDeScellage("Le sujet scellé ne se rouvre pas à l'identique. Rien n'a été écrit.");
  }
  if (await ouvrir(scelle, code + "x")) {
    throw new ErreurDeScellage("Un code faux ouvre le sujet. Rien n'a été écrit.");
  }

  /* Le fichier publié. La clé EST le nom du dossier : « eval-blanc » → docs/eval-blanc/. */
  const dossier = join(RACINE, "docs", cle);
  mkdirSync(dossier, { recursive: true });
  writeFileSync(join(dossier, "sujet.js"), `/* Sujet scellé — NE PAS MODIFIER À LA MAIN.
 *
 * Produit par tools/evaluations/sceller.mjs à partir de
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
`);

  /* Le manifeste : la page d'entrée doit savoir que cette évaluation existe. On
     le réécrit plutôt que de demander à l'enseignant d'y penser. Resceller une
     épreuve fermée ne la rouvre pas : c'est un geste séparé. */
  const EVALUATIONS = await lireManifeste();
  const ancienne = EVALUATIONS.find((e) => e.cle === cle);
  ecrireManifeste([
    ...EVALUATIONS.filter((e) => e.cle !== cle),
    { cle, titre: EVALUATION.titre, niveau: EVALUATION.niveau ?? null,
      actif: ancienne ? ancienne.actif : true },
  ]);

  /* Le carnet : le code est consigné hors dépôt, pour qu'on puisse le relire.
     Sans cela, un code égaré fermerait l'épreuve même pour son auteur. */
  noterCode(cle, code);

  return {
    cle, code, titre: EVALUATION.titre, niveau: EVALUATION.niveau ?? null,
    nbQuestions: scelle.nbQuestions, points: scelle.points,
    source: source.replace(RACINE + "/", ""),
    publie: `docs/${cle}/sujet.js`,
    reactivee: ancienne ? ancienne.actif : true,
  };
}
