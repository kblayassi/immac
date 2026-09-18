/* Les évaluations publiées : les lister, les fermer, les rouvrir, changer leur code.
 *
 *   node tools/evaluations/evaluations.mjs                    toutes, par niveau
 *   node tools/evaluations/evaluations.mjs nsi-premiere       un seul niveau
 *   node tools/evaluations/evaluations.mjs --desactiver dhc-1
 *   node tools/evaluations/evaluations.mjs --activer dhc-1
 *   node tools/evaluations/evaluations.mjs --recoder dhc-1 [NOUVEAU-CODE]
 *
 * Pourquoi un outil en ligne de commande et non une page du site : le site est
 * statique, et la version prof est publiée elle aussi. Une page ne pourrait ni
 * retenir les codes sans les publier, ni changer quoi que ce soit pour les
 * élèves — toute modification est une réécriture de fichier, donc un commit.
 *
 * Désactiver ne touche pas au sujet scellé : l'épreuve reste en ligne, mais la
 * page d'entrée cesse d'essayer son code, qui n'ouvre donc plus rien. C'est
 * réversible, et c'est ce qu'on veut entre deux classes ou après l'épreuve.
 *
 * ⚠ Rien n'est effectif tant que ce n'est pas commité ET déployé : ce sont les
 * fichiers du site que l'on modifie ici, pas un réglage en ligne.
 */

import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, relative } from "node:path";

import { lireManifeste, ecrireManifeste, memeNiveau, RACINE, MANIFESTE } from "./manifeste.mjs";
import { lireCodes, CARNET } from "./codes.mjs";

const ICI = dirname(fileURLToPath(import.meta.url));
const VERT = "\x1b[32m", ROUGE = "\x1b[31m", GRAS = "\x1b[1m", GRIS = "\x1b[90m", NEUTRE = "\x1b[0m";

const chemin = (p) => relative(RACINE, p);

/* Ce que le sujet publié annonce en clair : durée, nombre de questions, points.
   Le reste est chiffré, et cet outil n'a pas à l'ouvrir. */
async function annonce(cle) {
  const fichier = join(RACINE, "docs", cle, "sujet.js");
  if (!existsSync(fichier)) return null;
  try {
    const { EVALUATION, SCELLE } = await import(pathToFileURL(fichier).href);
    return { ...EVALUATION, nbQuestions: SCELLE?.nbQuestions, points: SCELLE?.points };
  } catch {
    return null;
  }
}

async function inventaire() {
  const carnet = lireCodes();
  const liste = [];
  for (const e of await lireManifeste()) {
    const sujet = await annonce(e.cle);
    liste.push({
      ...e,
      niveau: e.niveau ?? sujet?.niveau ?? null,
      duree: sujet?.dureeMinutes ?? null,
      nbQuestions: sujet?.nbQuestions ?? null,
      points: sujet?.points ?? null,
      code: carnet[e.cle]?.code ?? null,
      scelle: carnet[e.cle]?.scelle ?? null,
    });
  }
  return liste;
}

/* ------------------------------------------------------------------- Affichage */

function lister(liste, niveauDemande) {
  if (niveauDemande) liste = liste.filter((e) => memeNiveau(e.niveau, niveauDemande));
  if (!liste.length) {
    console.log(niveauDemande
      ? `\n  Aucune évaluation publiée pour « ${niveauDemande} ».\n`
      : `\n  Aucune évaluation publiée.\n`);
    return;
  }

  const largeurCle = Math.max(...liste.map((e) => e.cle.length));
  const largeurTitre = Math.max(...liste.map((e) => e.titre.length));

  // Sans niveau déclaré, une épreuve n'est pas perdue : elle est rangée à part.
  const niveaux = [...new Set(liste.map((e) => e.niveau ?? "Niveau non déclaré"))]
    .sort((a, b) => a.localeCompare(b, "fr"));

  for (const niveau of niveaux) {
    const siennes = liste.filter((e) => (e.niveau ?? "Niveau non déclaré") === niveau);
    const actives = siennes.filter((e) => e.actif).length;
    const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;
    console.log(`\n  ${GRAS}${niveau}${NEUTRE} ${GRIS}— ${pluriel(siennes.length, "publiée")}, ` +
                `${pluriel(actives, "active")}${NEUTRE}\n`);
    for (const e of siennes) {
      const puce = e.actif ? `${VERT}●${NEUTRE}` : `${GRIS}○${NEUTRE}`;
      const code = e.code
        ? (e.actif ? `${GRAS}${e.code}${NEUTRE}` : `${GRIS}${e.code}${NEUTRE}`)
        : `${ROUGE}code inconnu${NEUTRE}`;
      const etat = e.actif ? "" : `  ${GRIS}(désactivée)${NEUTRE}`;
      console.log(`  ${puce} ${e.cle.padEnd(largeurCle)}  ${e.titre.padEnd(largeurTitre)}  ${code}${etat}`);
      const details = [
        e.duree != null ? `${e.duree} min` : null,
        e.nbQuestions != null ? pluriel(e.nbQuestions, "question") : null,
        e.points != null ? pluriel(e.points, "point") : null,
        e.scelle ? `scellée le ${e.scelle}` : null,
      ].filter(Boolean).join(" · ");
      if (details) console.log(`    ${" ".repeat(largeurCle)}  ${GRIS}${details}${NEUTRE}`);
    }
  }

  if (liste.some((e) => !e.code)) {
    console.log(`\n  ${ROUGE}Code inconnu${NEUTRE} : épreuve scellée avant que le carnet existe.`);
    console.log(`  ${GRIS}--recoder lui en donne un nouveau, que le carnet retiendra.${NEUTRE}`);
  }
  console.log(`\n  ${GRIS}carnet : ${chemin(CARNET)} (hors dépôt)${NEUTRE}\n`);
}

/* -------------------------------------------------------------------- Actions */

async function basculer(cle, actif) {
  const liste = await lireManifeste();
  const cible = liste.find((e) => e.cle === cle);
  if (!cible) {
    console.error(`${ROUGE}Inconnue${NEUTRE} : aucune évaluation « ${cle} » dans le manifeste.`);
    process.exit(2);
  }
  if (cible.actif === actif) {
    console.log(`  ${cible.titre} est déjà ${actif ? "active" : "désactivée"}. Rien à faire.`);
    return;
  }
  cible.actif = actif;
  ecrireManifeste(liste);
  console.log(`\n${VERT}✓${NEUTRE} ${cible.titre} ${GRAS}${actif ? "réactivée" : "désactivée"}${NEUTRE}`);
  console.log(`  ${GRIS}${chemin(MANIFESTE)} réécrit${NEUTRE}`);
  console.log(actif
    ? `  Son code rouvrira l'épreuve dès le déploiement.`
    : `  Son code n'ouvrira plus rien dès le déploiement. Le sujet reste en ligne, scellé.`);
  console.log(`\n  ${GRAS}À committer et pousser pour que cela prenne effet.${NEUTRE}\n`);
}

/* Changer le code, c'est resceller : le code n'est pas un mot de passe rangé
   quelque part, c'est la clé qui chiffre le sujet. On repasse donc par l'outil
   de scellage, qui relit la source en clair et vérifie sa publication. */
function recoder(cle, code) {
  const source = [join(ICI, "prive", `sujet-${cle}.mjs`), join(ICI, `sujet-${cle}.mjs`)]
    .find(existsSync);
  if (!source) {
    console.error(`${ROUGE}Source introuvable${NEUTRE} : tools/evaluations/prive/sujet-${cle}.mjs`);
    console.error(`Changer le code exige de rechiffrer le sujet, donc de le relire en clair.`);
    console.error(`${GRIS}La source est hors dépôt : reprends-la sur la clé USB.${NEUTRE}`);
    process.exit(2);
  }
  execFileSync("node", [join(ICI, "sceller_sujet.mjs"), cle, ...(code ? [code] : [])],
               { stdio: "inherit" });
  console.log(`  ${GRAS}À committer et pousser : l'ancien code ouvre encore l'épreuve en ligne.${NEUTRE}\n`);
}

/* ----------------------------------------------------------------------- Entrée */

const args = process.argv.slice(2);
const drapeau = args.find((a) => a.startsWith("--"));

if (drapeau === "--desactiver" || drapeau === "--activer") {
  const cle = args.find((a) => !a.startsWith("--"));
  if (!cle) {
    console.error(`usage : node tools/evaluations/evaluations.mjs ${drapeau} <cle>`);
    process.exit(2);
  }
  await basculer(cle, drapeau === "--activer");
} else if (drapeau === "--recoder") {
  const [cle, code] = args.filter((a) => !a.startsWith("--"));
  if (!cle) {
    console.error(`usage : node tools/evaluations/evaluations.mjs --recoder <cle> [code]`);
    process.exit(2);
  }
  recoder(cle, code);
} else if (drapeau) {
  console.error(`${ROUGE}Option inconnue${NEUTRE} : ${drapeau}`);
  console.error(`Connues : --activer, --desactiver, --recoder.`);
  process.exit(2);
} else {
  lister(await inventaire(), args[0]);
}
