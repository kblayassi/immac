/* Noter un rendu. Aucune interface ici : des données entrent, une note sort.
 *
 * C'est volontaire — cette moitié-là doit pouvoir être éprouvée sans navigateur
 * (tools/evaluations/verifier_bareme.mjs joue le barème sur des réponses de
 * référence, et vérifie qu'une bonne copie a tous les points et qu'une copie
 * fautive ne les a pas).
 *
 * Le jugement s'appuie sur ../parcours/comparaison.js : un barème note donc
 * exactement comme un parcours validait. Une espace en trop ne coûte rien, un
 * accent non plus, mais « 1 2 3 » n'est pas « 123 ».
 *
 * Forme d'un barème (un .json que l'enseignant garde chez lui) :
 *
 *   {
 *     "format": "bareme/v1",
 *     "evaluation": "eval-blanc",
 *     "noteSur": 20,
 *     "arrondi": 0.25,
 *     "questions": {
 *       "q1": { "titre": "…", "criteres": [ {…}, {…} ] },
 *       "q3": { "correct": 2 },
 *       "q4": { "points": 3 }
 *     }
 *   }
 *
 * Un critère de question « code » porte des points et UNE attente :
 *   sansErreur      le programme s'exécute jusqu'au bout
 *   sortie          la sortie attendue, mot pour mot (aux espaces près)
 *   sortieContient  un fragment attendu quelque part dans la sortie
 *   sortieRegex     un motif attendu dans la sortie
 *   codeContient    un motif attendu dans le programme (commentaires retirés)
 *   codeAbsent      un motif interdit dans le programme
 *   tests           des assertions Python jouées sur son espace de noms
 * et deux réglages facultatifs :
 *   saisies         les réponses à donner aux input() du programme — à déclarer
 *                   plutôt sur la question, où tous les critères en héritent
 *   sortieStricte   true pour exiger l'espacement exact (figures, colonnes)
 */

import { normaliser, comparable, motifIndulgent, sansAccents, sansCommentaires,
         codeCorrespond,
         SORTIE_MISE_EN_FORME } from "../parcours/comparaison.js";

export const FORMAT_BAREME = "bareme/v1";

export function estUnBareme(objet) {
  return !!objet && typeof objet === "object" &&
         String(objet.format || "").startsWith("bareme/") &&
         !!objet.questions;
}

/* --------------------------------------------------------------- Un critère */

/* Ce qu'un critère demande à l'interpréteur : deux critères qui veulent la même
   chose ne font pas tourner le programme deux fois. */
function besoinDExecution(c) {
  return c.sansErreur != null || c.sortie != null || c.sortieContient != null ||
         c.sortieRegex != null || c.tests != null;
}
function cleDExecution(c) {
  return JSON.stringify([c.saisies || [], c.tests || null]);
}

function jugerCritere(c, code, execution) {
  const nu = c.avecCommentaires ? code : sansCommentaires(code);

  if (c.codeContient != null) {
    return codeCorrespond(c.codeContient, nu, c.options)
      ? { ok: true }
      : { ok: false, detail: "motif attendu absent du programme" };
  }
  if (c.codeAbsent != null) {
    return codeCorrespond(c.codeAbsent, nu, c.options)
      ? { ok: false, detail: "motif interdit présent dans le programme" }
      : { ok: true };
  }

  // Tout le reste demande que le programme ait tourné.
  if (!execution) return { ok: false, detail: "programme non exécuté" };
  if (!execution.ok) return { ok: false, detail: execution.erreur || "exécution impossible" };

  if (c.sansErreur != null) {
    return execution.erreur
      ? { ok: false, detail: premiereLigne(execution.erreur) }
      : { ok: true };
  }
  // Une erreur d'exécution fait tomber tout ce qui juge la sortie : ce qui a été
  // affiché avant l'erreur ne vaut pas une réponse.
  if (execution.erreur) return { ok: false, detail: premiereLigne(execution.erreur) };

  const sortie = normaliser(execution.stdout);

  if (c.sortie != null) {
    const attendu = normaliser(c.sortie);
    const strict = c.sortieStricte ?? SORTIE_MISE_EN_FORME.test(attendu);
    const juste = strict ? sortie === attendu : comparable(sortie) === comparable(attendu);
    return juste ? { ok: true } : { ok: false, detail: `obtenu : ${apercu(sortie)}` };
  }
  if (c.sortieContient != null) {
    return comparable(sortie).includes(comparable(c.sortieContient))
      ? { ok: true }
      : { ok: false, detail: `« ${c.sortieContient} » absent de la sortie` };
  }
  if (c.sortieRegex != null) {
    const drapeaux = [...new Set("i" + (c.options ?? ""))].join("");
    return new RegExp(motifIndulgent(sansAccents(c.sortieRegex)), drapeaux).test(sansAccents(sortie))
      ? { ok: true }
      : { ok: false, detail: `obtenu : ${apercu(sortie)}` };
  }
  if (c.tests != null) {
    const resultats = execution.resultats || [];
    const rates = resultats.filter((t) => !t.ok);
    if (!resultats.length) return { ok: false, detail: "aucun test n'a pu être joué" };
    return rates.length
      ? { ok: false, detail: rates.map((t) => t.libelle).join(" · ") }
      : { ok: true };
  }

  return { ok: false, detail: "critère vide" };
}

const premiereLigne = (t) => String(t).split("\n").filter(Boolean).pop() || String(t);
const apercu = (t) => {
  const plat = String(t).replace(/\n/g, " ⏎ ");
  return plat.length > 70 ? plat.slice(0, 70) + "…" : (plat || "(rien)");
};

/* -------------------------------------------------------------- Une question */

async function noterCode(q, regle, executer) {
  const code = q.reponse?.code ?? "";
  /* Les saisies se déclarent une fois pour la question : un programme qui lit
     des `input()` les lit pour tous les critères, et exiger de les répéter sur
     chacun ne produisait que des oublis — un critère sans saisies s'exécutait
     sans entrée et échouait sur une erreur qui n'était pas celle de l'élève.
     Un critère garde le droit de les redéfinir, pour un second jeu de valeurs. */
  const criteres = (regle.criteres || []).map((c) => (
    regle.saisies && !c.saisies ? { ...c, saisies: regle.saisies } : c
  ));
  const max = criteres.reduce((s, c) => s + (c.points || 0), 0);

  if (!code.trim()) {
    return {
      max, points: 0,
      criteres: criteres.map((c) => ({
        libelle: libelleDe(c), max: c.points || 0, points: 0, ok: false, detail: "pas de réponse",
      })),
    };
  }

  /* Un seul passage de l'interpréteur par jeu (saisies, tests) : dix critères
     sur la même exécution ne coûtent qu'une exécution. */
  const executions = new Map();
  for (const c of criteres) {
    if (!besoinDExecution(c)) continue;
    const cle = cleDExecution(c);
    if (executions.has(cle)) continue;
    executions.set(cle, await executer(code, { tests: c.tests || null, saisies: c.saisies || [] }));
  }

  const detail = criteres.map((c) => {
    const verdict = jugerCritere(c, code, besoinDExecution(c) ? executions.get(cleDExecution(c)) : null);
    return {
      libelle: libelleDe(c),
      max: c.points || 0,
      points: verdict.ok ? (c.points || 0) : 0,
      ok: verdict.ok,
      detail: verdict.detail || null,
    };
  });

  return { max, points: detail.reduce((s, d) => s + d.points, 0), criteres: detail };
}

function libelleDe(c) {
  if (c.libelle) return c.libelle;
  if (c.sansErreur != null) return "Le programme s'exécute sans erreur";
  if (c.sortie != null) return "La sortie est celle attendue";
  if (c.sortieContient != null) return `La sortie contient « ${c.sortieContient} »`;
  if (c.sortieRegex != null) return "La sortie a la forme attendue";
  if (c.codeContient != null) return "Le programme emploie ce qui est demandé";
  if (c.codeAbsent != null) return "Le programme évite ce qui est interdit";
  if (c.tests != null) return "Les tests passent";
  return "Critère";
}

function noterQcm(q, regle) {
  const max = regle.points || 0;
  const choix = q.reponse?.choix;
  const attendu = regle.correct;
  const multiple = Array.isArray(attendu);

  if (choix == null || (multiple && (!Array.isArray(choix) || choix.length === 0))) {
    return { max, points: 0, criteres: [{ libelle: "Réponse", max, points: 0, ok: false, detail: "pas de réponse" }] };
  }

  if (!multiple) {
    const ok = choix === attendu;
    return { max, points: ok ? max : 0,
             criteres: [{ libelle: `Réponse ${lettre(attendu)} attendue`, max, points: ok ? max : 0,
                          ok, detail: ok ? null : `répondu ${lettre(choix)}` }] };
  }

  const coches = new Set(choix);
  const bons = attendu.filter((i) => coches.has(i)).length;
  const faux = choix.filter((i) => !attendu.includes(i)).length;

  /* Sans « partiel », une case fausse coûte toute la question : c'est la règle
     la plus courante en QCM, et la plus simple à annoncer aux élèves. */
  const points = regle.partiel
    ? Math.max(0, Math.round((max * (bons - faux) / attendu.length) * 100) / 100)
    : (bons === attendu.length && faux === 0 ? max : 0);

  return { max, points,
           criteres: [{ libelle: `Réponses ${attendu.map(lettre).join(", ")} attendues`,
                        max, points, ok: points === max,
                        detail: `${bons} bonne(s), ${faux} en trop` }] };
}

const lettre = (i) => (typeof i === "number" ? String.fromCharCode(65 + i) : "—");

/* Une réponse rédigée ne se corrige pas toute seule, et faire semblant est pire
   que s'abstenir : chercher un mot-clé dans une phrase d'élève donne des points
   à qui a recopié le vocabulaire sans comprendre, et les refuse à qui a dit la
   même chose avec ses mots. Le barème se contente donc de déclarer le maximum ;
   les points, c'est l'enseignant qui les met. */
function noterTexte(q, regle) {
  return {
    max: regle.points || 0,
    points: 0,
    manuel: true,
    criteres: [],
    vide: !(q.reponse?.texte || "").trim(),
  };
}

/* ------------------------------------------------------------------- Un rendu */

/**
 * @param rendu     l'objet lu dans le .json d'un élève
 * @param bareme    l'objet lu dans le .json du barème
 * @param executer  (code, {tests, saisies}) → { ok, stdout, erreur, resultats }
 */
export async function noter(rendu, bareme, executer) {
  const questions = [];

  for (const decrite of rendu.evaluation?.questions || []) {
    const regle = bareme.questions?.[decrite.id];
    const q = { ...decrite, reponse: rendu.reponses?.[decrite.id] || null };

    if (!regle) {
      // Le barème ne parle pas de cette question : on l'affiche sans la noter,
      // plutôt que de la compter zéro et de fausser la note en silence.
      questions.push({ ...q, max: 0, points: 0, manuel: true, absentDuBareme: true,
                       titre: regle?.titre || decrite.titre,
                       criteres: [{ libelle: "Aucun critère dans le barème", max: 0, points: 0, ok: null }] });
      continue;
    }

    let note;
    if (decrite.type === "code") note = await noterCode(q, regle, executer);
    else if (decrite.type === "qcm") note = noterQcm(q, regle);
    else if (decrite.type === "texte") note = noterTexte(q, regle);
    else note = { max: regle.points || 0, points: 0, manuel: true, criteres: [] };

    questions.push({ ...q, titre: regle.titre || decrite.titre, ...note });
  }

  const max = questions.reduce((s, q) => s + q.max, 0);
  const total = questions.reduce((s, q) => s + q.points, 0);

  return { questions, total, max, ...surVingt(total, max, bareme) };
}

function surVingt(total, max, bareme) {
  const noteSur = bareme.noteSur ?? max;
  if (!max) return { noteSur, note: 0 };
  const pas = bareme.arrondi ?? 0.25;
  const brute = (total / max) * noteSur;
  return { noteSur, note: Math.round(brute / pas) * pas };
}

/* ----------------------------------------------------------------- Alertes

   Ce que le journal et l'empreinte disent d'un rendu. Aucune de ces lignes
   n'accuse qui que ce soit : elles signalent ce qu'un correcteur voudrait
   regarder de plus près. Un élève qui ouvre sa messagerie et un élève qui
   cherche la réponse produisent le même événement. */

export function alertes(rendu, intact) {
  const liste = [];

  if (intact === false) {
    liste.push({ gravite: "haute", texte: "Fichier modifié après la remise (empreinte invalide)." });
  } else if (intact === null) {
    liste.push({ gravite: "basse", texte: "Empreinte non vérifiable." });
  }

  const journal = rendu.journal || [];
  const sorties = journal.filter((e) => e.e === "onglet-quitte");
  if (sorties.length) {
    const total = sorties.reduce((s, sortie) => {
      const retour = journal.find((e) => e.e === "onglet-revient" && e.t >= sortie.t);
      return s + (retour ? retour.t - sortie.t : 0);
    }, 0);
    liste.push({
      gravite: sorties.length > 3 || total > 120 ? "haute" : "basse",
      texte: `${sorties.length} sortie(s) de l'onglet, ${Math.round(total)} s hors de la page.`,
    });
  }

  const colles = journal.filter((e) => e.e === "colle" && (e.n || 0) > 40);
  if (colles.length) {
    liste.push({
      gravite: "haute",
      texte: `${colles.length} collage(s) de plus de 40 caractères.`,
    });
  }

  const chrono = rendu.chrono;
  if (chrono?.cause === "eleve" && chrono.tempsUtiliseS != null) {
    const impartiS = (rendu.evaluation?.dureeMinutes || 0) * 60;
    if (impartiS && chrono.tempsUtiliseS < impartiS * 0.25) {
      liste.push({ gravite: "basse", texte: "Devoir rendu très tôt." });
    }
  }

  return liste;
}
