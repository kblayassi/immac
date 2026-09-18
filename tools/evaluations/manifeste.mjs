/* Le manifeste des évaluations publiées : lecture et écriture.
 *
 * Deux outils y touchent — sceller_sujet.mjs quand il publie une épreuve,
 * evaluations.mjs quand on l'active ou la désactive. Le fichier étant du
 * JavaScript avec un en-tête rédigé, mieux vaut un seul endroit qui sache le
 * réécrire qu'une chaîne recopiée dans les deux.
 *
 * Une entrée : { cle, titre, niveau, actif }. Rien n'y est secret — ces champs
 * ne disent que l'existence d'une épreuve, le sujet reste chiffré.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ICI = dirname(fileURLToPath(import.meta.url));
export const RACINE = join(ICI, "..", "..");
export const MANIFESTE = join(RACINE, "docs", "eval", "evaluations.js");

const EN_TETE = `/* Les évaluations publiées.
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

`;

/* Le sujet publié d'une évaluation existe-t-il encore ? Le manifeste ne doit pas
   envoyer la page d'entrée chercher un fichier supprimé. */
export function sujetPublie(cle) {
  return existsSync(join(RACINE, "docs", cle, "sujet.js"));
}

/* Lire la valeur d'un `export const NOM = …;` écrit par ces outils.

   Pas d'import : Node garde en cache chaque module importé, et pour relire un
   fichier modifié il faudrait changer son adresse à chaque fois — deux lectures
   dans la même milliseconde rendraient l'ancienne version, et la console, qui
   tourne longtemps, accumulerait une copie par lecture. Or ces valeurs sont
   écrites par JSON.stringify : c'est du JSON, qui se relit comme tel. Le « ;
   suivi d'un saut de ligne » ne peut pas apparaître dans une chaîne JSON, où
   les sauts de ligne sont échappés : c'est donc bien la fin de l'instruction. */
export function lireExport(fichier, nom) {
  return extraireExport(readFileSync(fichier, "utf8"), nom);
}

/* La même lecture sur un texte déjà en main — celui d'une version commitée,
   par exemple, pour savoir ce qui a changé depuis. */
export function extraireExport(texte, nom) {
  const marque = `export const ${nom} = `;
  const debut = texte.indexOf(marque);
  if (debut < 0) return undefined;
  const fin = texte.indexOf(";\n", debut);
  return JSON.parse(texte.slice(debut + marque.length, fin < 0 ? undefined : fin));
}

export async function lireManifeste() {
  const EVALUATIONS = lireExport(MANIFESTE, "EVALUATIONS") ?? [];
  // `actif` a été ajouté après coup : une entrée qui ne le porte pas est active.
  return EVALUATIONS.map((e) => ({ actif: true, ...e }));
}

export function ecrireManifeste(liste) {
  const propre = liste
    .filter((e) => sujetPublie(e.cle))
    .sort((a, b) => a.cle.localeCompare(b.cle, "fr"))
    .map(({ cle, titre, niveau, actif }) => ({ cle, titre, niveau, actif }));
  writeFileSync(MANIFESTE, EN_TETE + `export const EVALUATIONS = ${JSON.stringify(propre, null, 2)};\n`);
  return propre;
}

/* Comparer « NSI Première », « nsi-premiere » et « NSI premiere » comme un même
   niveau : c'est un argument tapé à la main, pas un identifiant. */
export function memeNiveau(a, b) {
  const nu = (t) => String(t ?? "").normalize("NFD").replace(/\p{M}/gu, "")
                      .toLowerCase().replace(/[^a-z0-9]/g, "");
  return nu(a) === nu(b);
}
