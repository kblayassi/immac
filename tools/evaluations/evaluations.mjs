/* Les évaluations publiées, en ligne de commande.
 *
 *   node tools/evaluations/evaluations.mjs                    toutes, par niveau
 *   node tools/evaluations/evaluations.mjs nsi-premiere       un seul niveau
 *   node tools/evaluations/evaluations.mjs --desactiver dhc-1
 *   node tools/evaluations/evaluations.mjs --activer dhc-1
 *   node tools/evaluations/evaluations.mjs --recoder dhc-1 [NOUVEAU-CODE]
 *
 * La même chose avec une interface : node tools/evaluations/console.mjs.
 * Les deux ne sont que des façades sur inventaire.mjs.
 *
 * Désactiver ne touche pas au sujet scellé : l'épreuve reste en ligne, mais la
 * page d'entrée cesse d'essayer son code, qui n'ouvre donc plus rien. C'est
 * réversible, et c'est ce qu'on veut entre deux classes ou après l'épreuve.
 *
 * ⚠ Rien n'est effectif tant que ce n'est pas commité ET déployé : ce sont les
 * fichiers du site que l'on modifie ici, pas un réglage en ligne.
 */

import { relative } from "node:path";

import { inventaire, niveauxDe, basculer, recoder, ErreurDAction, SANS_NIVEAU } from "./inventaire.mjs";
import { RACINE, MANIFESTE } from "./manifeste.mjs";
import { CARNET } from "./codes.mjs";

const VERT = "\x1b[32m", ROUGE = "\x1b[31m", GRAS = "\x1b[1m", GRIS = "\x1b[90m", NEUTRE = "\x1b[0m";

const chemin = (p) => relative(RACINE, p);
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;

/* ------------------------------------------------------------------- Affichage */

function lister(liste, niveauDemande) {
  if (!liste.length) {
    console.log(niveauDemande
      ? `\n  Aucune évaluation publiée pour « ${niveauDemande} ».\n`
      : `\n  Aucune évaluation publiée.\n`);
    return;
  }

  const largeurCle = Math.max(...liste.map((e) => e.cle.length));
  const largeurTitre = Math.max(...liste.map((e) => e.titre.length));

  for (const niveau of niveauxDe(liste)) {
    const siennes = liste.filter((e) => (e.niveau ?? SANS_NIVEAU) === niveau);
    const actives = siennes.filter((e) => e.actif).length;
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

/* ----------------------------------------------------------------------- Entrée */

const args = process.argv.slice(2);
const drapeau = args.find((a) => a.startsWith("--"));
const positionnels = args.filter((a) => !a.startsWith("--"));

try {
  if (drapeau === "--desactiver" || drapeau === "--activer") {
    const [cle] = positionnels;
    if (!cle) {
      console.error(`usage : node tools/evaluations/evaluations.mjs ${drapeau} <cle>`);
      process.exit(2);
    }
    const fait = await basculer(cle, drapeau === "--activer");
    if (!fait.change) {
      console.log(`  ${fait.titre} est déjà ${fait.actif ? "active" : "désactivée"}. Rien à faire.`);
    } else {
      console.log(`\n${VERT}✓${NEUTRE} ${fait.titre} ${GRAS}${fait.actif ? "réactivée" : "désactivée"}${NEUTRE}`);
      console.log(`  ${GRIS}${chemin(MANIFESTE)} réécrit${NEUTRE}`);
      console.log(fait.actif
        ? `  Son code rouvrira l'épreuve dès le déploiement.`
        : `  Son code n'ouvrira plus rien dès le déploiement. Le sujet reste en ligne, scellé.`);
      console.log(`\n  ${GRAS}À committer et pousser pour que cela prenne effet.${NEUTRE}\n`);
    }
  } else if (drapeau === "--recoder") {
    const [cle, code] = positionnels;
    if (!cle) {
      console.error(`usage : node tools/evaluations/evaluations.mjs --recoder <cle> [code]`);
      process.exit(2);
    }
    const fait = await recoder(cle, code);
    console.log(`\n${VERT}✓${NEUTRE} ${fait.titre} rescellée`);
    console.log(`  ${GRIS}${fait.publie} réécrit${NEUTRE}\n`);
    console.log(`  ${GRAS}NOUVEAU CODE : ${fait.code}${NEUTRE}\n`);
    console.log(`  ${GRAS}À committer et pousser : l'ancien code ouvre encore l'épreuve en ligne.${NEUTRE}\n`);
  } else if (drapeau) {
    console.error(`${ROUGE}Option inconnue${NEUTRE} : ${drapeau}`);
    console.error(`Connues : --activer, --desactiver, --recoder.`);
    process.exit(2);
  } else {
    lister(await inventaire(positionnels[0]), positionnels[0]);
  }
} catch (erreur) {
  if (!(erreur instanceof ErreurDAction)) throw erreur;
  console.error(`${ROUGE}${erreur.message}${NEUTRE}`);
  process.exit(2);
}
