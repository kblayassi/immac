/* Le carnet des codes d'évaluation.
 *
 * Jusqu'ici le code n'était écrit nulle part : sceller_sujet.mjs l'affichait une
 * fois, à charge pour l'enseignant de le noter. C'était le plus sûr, et le plus
 * fragile — un code perdu ferme l'épreuve pour tout le monde, y compris pour
 * celui qui l'a créée.
 *
 * Il est donc consigné ici, dans tools/evaluations/prive/codes.json, que
 * .gitignore tient hors du dépôt au même titre que les sujets en clair et les
 * barèmes. Ce fichier ouvre toutes les épreuves publiées : il vaut exactement
 * ce que valent les sujets, et se sauvegarde sur la clé USB avec eux.
 *
 * Il n'est jamais lu par le site : seuls les outils en ligne de commande y
 * touchent, et rien de ce qu'il contient ne part vers docs/.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ICI = dirname(fileURLToPath(import.meta.url));
export const PRIVE = join(ICI, "prive");
export const CARNET = join(PRIVE, "codes.json");

export function lireCodes() {
  if (!existsSync(CARNET)) return {};
  try {
    return JSON.parse(readFileSync(CARNET, "utf8"));
  } catch {
    // Un carnet illisible ne doit pas empêcher de sceller : on le signale et on
    // repart d'une page blanche, quitte à redemander les codes manquants.
    console.error(`⚠ ${CARNET} est illisible — il sera réécrit.`);
    return {};
  }
}

export function noterCode(cle, code) {
  const carnet = lireCodes();
  carnet[cle] = { code, scelle: new Date().toISOString().slice(0, 10) };
  mkdirSync(PRIVE, { recursive: true });
  writeFileSync(CARNET, JSON.stringify(carnet, null, 2) + "\n");
  return carnet[cle];
}

export function oublierCode(cle) {
  const carnet = lireCodes();
  if (!(cle in carnet)) return false;
  delete carnet[cle];
  writeFileSync(CARNET, JSON.stringify(carnet, null, 2) + "\n");
  return true;
}
