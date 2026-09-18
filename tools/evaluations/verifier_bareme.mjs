/* Banc d'essai des barèmes.
 *
 *   node tools/evaluations/verifier_bareme.mjs             tous les barèmes
 *   node tools/evaluations/verifier_bareme.mjs eval-blanc  un seul
 *
 * Un barème est du code : il décide de notes. Celui-ci le joue sur des copies
 * de référence — une parfaite, et autant de fautives qu'on veut — et vérifie
 * que chacune obtient exactement la note annoncée. Le jour où un critère est
 * réécrit, c'est ce banc qui dit s'il note toujours la même chose.
 *
 * Il contrôle aussi la cohérence entre le sujet publié et le barème : chaque
 * question notée existe dans le sujet, et les points annoncés à l'élève sont
 * ceux que le barème distribue. Un élève qui lit « 6 points » doit pouvoir en
 * obtenir six.
 *
 * Il fabrique la copie corrigée de chaque cas et vérifie qu'elle porte les mêmes
 * nombres que la table de correction : une note affichée au professeur et une
 * note lue par l'élève qui divergeraient seraient pires qu'un bug.
 *
 * Et surtout il vérifie que **le sujet publié ne livre rien** : pas de questions
 * en clair, un scellé à jour de la source. C'est le contrôle le plus important
 * du lot — celui qui se remarquerait le plus tard, et le plus mal.
 *
 * Les programmes tournent dans le Python de la machine (executeur.py), pas dans
 * Pyodide : c'est une approximation assumée, suffisante pour du code de lycée.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { noter } from "../../docs/eval/bareme.js";
import { construireCopie, estUneCopie, noteRetenue, totalRetenu }
  from "../../docs/eval/copie-corrigee.js";
import { ouvrir } from "../../docs/eval/scelle.js";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, "..", "..");
const EXECUTEUR = join(ICI, "executeur.py");

const VERT = "\x1b[32m", ROUGE = "\x1b[31m", GRIS = "\x1b[90m", NEUTRE = "\x1b[0m";

/* ------------------------------------------------------------- Interpréteur */

function executer(code, { tests, saisies }) {
  const r = spawnSync("python3", [EXECUTEUR], {
    input: JSON.stringify({ code, tests, saisies }),
    encoding: "utf8",
    timeout: 15000,
  });
  if (r.error || r.status !== 0) {
    return { ok: false, erreur: r.error?.message || r.stderr || "exécution impossible" };
  }
  try { return JSON.parse(r.stdout); }
  catch { return { ok: false, erreur: "réponse illisible de l'exécuteur" }; }
}

/* Les vraies évaluations vivent dans tools/evaluations/prive/, que .gitignore
   tient hors du dépôt : celui-ci est public, et un barème versionné serait un
   barème publié. On regarde donc d'abord là, puis dans le dossier des outils —
   où seule l'évaluation à blanc, qui ne cache rien, est restée. */
const PRIVE = join(ICI, "prive");
function trouver(nom) {
  const candidat = join(PRIVE, nom);
  return existsSync(candidat) ? candidat : join(ICI, nom);
}

const notablesDe = (questions) => questions.filter((q) => q.type !== "document");

/* ------------------------------------------------------------------ Un essai */

async function verifier(cle) {
  const bareme = JSON.parse(readFileSync(trouver(`bareme-${cle}.json`), "utf8"));
  const controle = JSON.parse(readFileSync(trouver(`controle-${cle}.json`), "utf8"));
  const { EVALUATION, QUESTIONS } = await import(trouver(`sujet-${cle}.mjs`));

  console.log(`\n${EVALUATION.titre} ${GRIS}(${cle})${NEUTRE}`);
  let fautes = 0;

  /* --- le sujet publié ne doit rien livrer */
  const publie = join(RACINE, "docs", cle, "sujet.js");
  if (!existsSync(publie)) {
    console.log(`  ${ROUGE}✗${NEUTRE} aucun sujet publié — lance sceller_sujet.mjs`);
    fautes++;
  } else {
    const { QUESTIONS: enClair, SCELLE } = await import(publie);
    if (enClair) {
      console.log(`  ${ROUGE}✗${NEUTRE} le sujet publié contient les questions EN CLAIR`);
      fautes++;
    } else if (!SCELLE) {
      console.log(`  ${ROUGE}✗${NEUTRE} le sujet publié n'a ni questions ni scellé`);
      fautes++;
    } else if (SCELLE.nbQuestions !== notablesDe(QUESTIONS).length) {
      // Le scellé date d'avant la dernière retouche de la source.
      console.log(`  ${ROUGE}✗${NEUTRE} le scellé annonce ${SCELLE.nbQuestions} questions, ` +
                  `la source en a ${notablesDe(QUESTIONS).length} — rescelle le sujet`);
      fautes++;
    } else if (await ouvrir(SCELLE, "MAUVAIS-CODE-42")) {
      console.log(`  ${ROUGE}✗${NEUTRE} un code faux ouvre le sujet publié`);
      fautes++;
    }
  }

  /* --- cohérence du sujet et du barème */
  const notables = notablesDe(QUESTIONS);
  for (const q of notables) {
    const regle = bareme.questions[q.id];
    if (!regle) {
      console.log(`  ${ROUGE}✗${NEUTRE} ${q.id} : aucun critère dans le barème`);
      fautes++;
      continue;
    }
    const max = regle.criteres
      ? regle.criteres.reduce((s, c) => s + (c.points || 0), 0)
      : (regle.points || 0);
    if (q.points != null && q.points !== max) {
      console.log(`  ${ROUGE}✗${NEUTRE} ${q.id} : le sujet annonce ${q.points} points, ` +
                  `le barème en distribue ${max}`);
      fautes++;
    }
  }
  for (const id of Object.keys(bareme.questions)) {
    if (!notables.some((q) => q.id === id)) {
      console.log(`  ${ROUGE}✗${NEUTRE} ${id} : noté par le barème, absent du sujet`);
      fautes++;
    }
  }

  /* --- les copies de référence */
  for (const cas of controle.cas) {
    const rendu = {
      format: "evaluation/v1",
      evaluation: {
        cle: EVALUATION.cle,
        dureeMinutes: EVALUATION.dureeMinutes,
        questions: notables.map((q) => ({ id: q.id, type: q.type, titre: q.titre })),
      },
      eleve: { nom: "ESSAI", prenom: cas.nom },
      reponses: cas.reponses,
      journal: [],
    };

    const note = await noter(rendu, bareme, executer);
    const obtenu = Math.round(note.total * 100) / 100;

    /* La copie que l'élève recevra, fabriquée sans aucune retouche : elle doit
       porter exactement la note du barème, et être relisible par copie.html. */
    const copie = construireCopie({ rendu, note, retouches: {}, bareme });
    const attendueSurVingt = noteRetenue({}, note, bareme);
    /* …et avec des verdicts retouchés : l'enseignant renverse chaque critère.
       La copie rendue doit alors porter, question par question, les points
       que la table affiche — c'est le contrat de copie-corrigee.js. */
    const renverses = { criteres: {} };
    for (const q of note.questions) {
      if (q.criteres?.length) {
        renverses.criteres[q.id] = Object.fromEntries(q.criteres.map((c, i) => [i, c.ok !== true]));
      }
    }
    const copieRetouchee = construireCopie({ rendu, note, retouches: renverses, bareme });
    const totalRenverse = totalRetenu(renverses, note);
    const retoucheJuste =
      copieRetouchee.note.total === totalRenverse &&
      copieRetouchee.note.valeur === noteRetenue(renverses, note, bareme) &&
      copieRetouchee.questions.every((q) =>
        q.points === q.criteres.reduce((s, c) => s + c.points, 0) || !q.criteres.length);

    const copieJuste = estUneCopie(copie) &&
      copie.note.valeur === attendueSurVingt &&
      copie.note.total === obtenu &&
      copie.questions.length === note.questions.length &&
      retoucheJuste;

    if (obtenu === cas.attendu && copieJuste) {
      console.log(`  ${VERT}✓${NEUTRE} ${cas.nom.padEnd(34)} ${obtenu} / ${note.max}` +
                  `${GRIS}  →  ${attendueSurVingt} / ${bareme.noteSur ?? note.max}${NEUTRE}`);
    } else if (obtenu === cas.attendu) {
      fautes++;
      console.log(`  ${ROUGE}✗${NEUTRE} ${cas.nom.padEnd(34)} ` +
                  `la copie corrigée ne porte pas les mêmes nombres que la table`);
    } else {
      fautes++;
      console.log(`  ${ROUGE}✗${NEUTRE} ${cas.nom.padEnd(34)} ` +
                  `${obtenu} / ${note.max} — attendu ${cas.attendu}`);
      // Le détail ne s'affiche qu'en cas d'écart : c'est là qu'il sert.
      for (const q of note.questions) {
        for (const c of q.criteres || []) {
          if (c.ok === true) continue;
          console.log(`      ${GRIS}${q.id} · ${c.libelle}${c.detail ? ` — ${c.detail}` : ""}${NEUTRE}`);
        }
      }
    }
  }

  return fautes;
}

/* --------------------------------------------------------------------- Main */

const demandes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [...new Set([
      ...(existsSync(PRIVE) ? readdirSync(PRIVE) : []),
      ...readdirSync(ICI),
    ])].filter((f) => f.startsWith("controle-") && f.endsWith(".json"))
       .map((f) => f.slice("controle-".length, -".json".length))
       .sort();

let total = 0;
for (const cle of demandes) total += await verifier(cle);

console.log(total
  ? `\n${ROUGE}${total} écart(s)${NEUTRE}\n`
  : `\n${VERT}✓ barèmes vérifiés${NEUTRE}\n`);
process.exit(total ? 1 : 0);
