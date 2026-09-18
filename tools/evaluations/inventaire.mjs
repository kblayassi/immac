/* L'état des évaluations publiées, et les trois gestes qui le changent.
 *
 * Sans affichage : deux façades s'en servent — evaluations.mjs en ligne de
 * commande, console.mjs pour la page locale. Un seul endroit décide donc ce
 * qu'« activer » veut dire, et les deux rendent le même verdict.
 */

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

import { lireManifeste, ecrireManifeste, lireExport, memeNiveau, RACINE } from "./manifeste.mjs";
import { lireCodes } from "./codes.mjs";
import { scellerEvaluation, trouverSource, ErreurDeScellage } from "./sceller.mjs";

export const SANS_NIVEAU = "Niveau non déclaré";

const ICI = dirname(fileURLToPath(import.meta.url));

/* Le barème d'une épreuve : dans prive/, ou à côté des outils pour l'évaluation
   à blanc, qui ne cache rien — le même ordre de recherche que pour la source. */
export function trouverBareme(cle) {
  if (!/^[a-z0-9-]+$/.test(cle)) return null;          // une clé, pas un chemin
  for (const dossier of [join(ICI, "prive"), ICI]) {
    const fichier = join(dossier, `bareme-${cle}.json`);
    if (existsSync(fichier)) return fichier;
  }
  return null;
}

/* Une action impossible à mener : épreuve inconnue, source absente. Comme
   ErreurDeScellage, cela s'affiche et ne se débogue pas. */
export class ErreurDAction extends Error {}

/* Ce que le sujet publié annonce en clair : durée, nombre de questions, points.
   Le reste est chiffré, et cet outil n'a pas à l'ouvrir. */
async function annonce(cle) {
  const fichier = join(RACINE, "docs", cle, "sujet.js");
  if (!existsSync(fichier)) return null;
  try {
    // Lu comme du texte, pour la même raison que le manifeste (voir lireExport).
    const EVALUATION = lireExport(fichier, "EVALUATION");
    const SCELLE = lireExport(fichier, "SCELLE");
    return { ...EVALUATION, nbQuestions: SCELLE?.nbQuestions, points: SCELLE?.points };
  } catch {
    return null;
  }
}

export async function inventaire(niveauDemande) {
  const carnet = lireCodes();
  const liste = [];
  for (const e of await lireManifeste()) {
    const sujet = await annonce(e.cle);
    liste.push({
      cle: e.cle,
      titre: e.titre,
      actif: e.actif,
      niveau: e.niveau ?? sujet?.niveau ?? null,
      duree: sujet?.dureeMinutes ?? null,
      nbQuestions: sujet?.nbQuestions ?? null,
      points: sujet?.points ?? null,
      code: carnet[e.cle]?.code ?? null,
      scelle: carnet[e.cle]?.scelle ?? null,
      // Sans source en clair, on ne peut pas rechiffrer : la page grise alors
      // le bouton plutôt que de laisser espérer.
      recodable: trouverSource(e.cle) !== null,
      bareme: trouverBareme(e.cle) !== null,
    });
  }
  return niveauDemande ? liste.filter((e) => memeNiveau(e.niveau, niveauDemande)) : liste;
}

/* Les niveaux présents, dans l'ordre alphabétique, ceux sans niveau à la fin. */
export function niveauxDe(liste) {
  const noms = [...new Set(liste.map((e) => e.niveau ?? SANS_NIVEAU))];
  return noms.sort((a, b) => (
    a === SANS_NIVEAU ? 1 : b === SANS_NIVEAU ? -1 : a.localeCompare(b, "fr")
  ));
}

/* Activer ou désactiver. Le sujet scellé n'est pas touché : c'est la page
   d'entrée qui cesse d'essayer le code d'une épreuve fermée. */
export async function basculer(cle, actif) {
  const liste = await lireManifeste();
  const cible = liste.find((e) => e.cle === cle);
  if (!cible) throw new ErreurDAction(`Aucune évaluation « ${cle} » dans le manifeste.`);
  const change = cible.actif !== actif;
  cible.actif = actif;
  if (change) ecrireManifeste(liste);
  return { cle, titre: cible.titre, actif, change };
}

/* Le barème, pour le déposer dans la page de correction. Seulement pour une
   épreuve du manifeste : la clé vient de la page, on ne lit rien d'autre. */
export async function lireBareme(cle) {
  const connue = (await lireManifeste()).some((e) => e.cle === cle);
  const fichier = connue ? trouverBareme(cle) : null;
  if (!fichier) throw new ErreurDAction(`Aucun barème trouvé pour « ${cle} » (bareme-${cle}.json).`);
  return { nom: basename(fichier), contenu: readFileSync(fichier, "utf8") };
}

/* Changer le code, c'est resceller : le code n'est pas un mot de passe rangé
   quelque part, c'est la clé qui chiffre le sujet. */
export async function recoder(cle, code) {
  if (!trouverSource(cle)) {
    throw new ErreurDAction(
      `Source introuvable : tools/evaluations/prive/sujet-${cle}.mjs. ` +
      `Changer le code exige de rechiffrer le sujet, donc de le relire en clair.`);
  }
  try {
    return await scellerEvaluation(cle, code);
  } catch (erreur) {
    if (erreur instanceof ErreurDeScellage) throw new ErreurDAction(erreur.message);
    throw erreur;
  }
}
