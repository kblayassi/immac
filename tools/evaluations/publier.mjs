/* Publier les changements de la console : commit, puis push.
 *
 * Tout ce que la console change se résume à deux sortes de fichiers — le
 * manifeste et les sujets scellés. Publier, c'est committer ceux-là et eux
 * seuls, puis pousser. Le reste du dépôt n'est jamais embarqué : une retouche
 * de parcours en cours reste où elle est, ni ajoutée ni committée.
 *
 * Deux garde-fous, parce que ce bouton écrit sur un dépôt public :
 *   - on ne publie que depuis `main`, suivi par `origin/main`, et l'on pousse
 *     explicitement `origin main` — jamais un autre remote, jamais une autre
 *     branche (le dépôt garde un ancien remote, « ancien-immacespalion ») ;
 *   - git ne peut rien demander au clavier (GIT_TERMINAL_PROMPT=0) : lancé
 *     depuis l'app, sans terminal, une demande de mot de passe figerait tout.
 *     Mieux vaut un échec qui s'explique.
 */

import { execFileSync, execFile } from "node:child_process";
import { promisify } from "node:util";

import { lireManifeste, extraireExport, RACINE } from "./manifeste.mjs";
import { ErreurDAction } from "./inventaire.mjs";

const executer = promisify(execFile);
const ENV = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
const BRANCHE = "main";
const REMOTE = "origin";
const SUIVIS = ["docs/eval/evaluations.js", "docs/*/sujet.js"];

function git(...args) {
  return execFileSync("git", args, { cwd: RACINE, encoding: "utf8", env: ENV,
                                     stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function gitOuRien(...args) {
  try { return git(...args); } catch { return null; }
}

function lignes(texte) {
  return (texte || "").split("\n").filter(Boolean);
}

/* Les fichiers de la console qui diffèrent du dernier commit. `-uall` pour
   qu'une évaluation toute neuve apparaisse par son sujet.js, et non comme un
   dossier entier. */
function fichiersEnAttente() {
  // Pas de trim ici : l'espace de tête fait partie de la colonne d'état (« M… »).
  const brut = execFileSync("git", ["status", "--porcelain", "--untracked-files=all", "--", ...SUIVIS],
                            { cwd: RACINE, encoding: "utf8", env: ENV });
  return lignes(brut).map((l) => l.slice(3));
}

/* ------------------------------------------------------------------ Le message */

/* Ce qui a changé, dit comme les autres messages du dépôt : un verbe au présent,
   l'épreuve nommée. On compare le manifeste à sa version commitée. */
async function messagePropose(fichiers) {
  const texteAvant = gitOuRien("show", `HEAD:docs/eval/evaluations.js`);
  let avant = [];
  try { avant = (texteAvant && extraireExport(texteAvant + "\n", "EVALUATIONS")) || []; } catch { avant = []; }
  const apres = await lireManifeste();
  const actif = (e) => e.actif !== false;

  const changements = [];
  for (const e of apres) {
    const a = avant.find((x) => x.cle === e.cle);
    if (!a) { changements.push(`Publie « ${e.titre} »`); continue; }
    if (actif(a) !== actif(e)) changements.push(`${actif(e) ? "Réactive" : "Désactive"} « ${e.titre} »`);
    if (fichiers.includes(`docs/${e.cle}/sujet.js`)) changements.push(`Change le code de « ${e.titre} »`);
  }
  for (const a of avant) {
    if (!apres.some((e) => e.cle === a.cle)) changements.push(`Retire « ${a.titre} »`);
  }

  if (!changements.length) return "Met à jour les évaluations";
  if (changements.length === 1) return changements[0];
  return `Met à jour les évaluations\n\n${changements.map((c) => `- ${c}`).join("\n")}`;
}

/* ------------------------------------------------------------------ L'état */

/* Tout ce que le dialogue « Publier » doit montrer avant qu'on clique. */
export async function etatGit() {
  const branche = gitOuRien("branch", "--show-current");
  if (branche === null) return { disponible: false, raison: "Ce dossier n'est pas un dépôt git." };

  const amont = gitOuRien("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}");
  const fichiers = fichiersEnAttente();
  const tous = lignes(execFileSync("git", ["status", "--porcelain"], { cwd: RACINE, encoding: "utf8", env: ENV }));
  const aEnvoyer = amont ? lignes(gitOuRien("log", "--format=%h %s", `${amont}..HEAD`)) : [];

  let raison = null;
  if (branche !== BRANCHE) {
    raison = branche
      ? `Tu es sur la branche « ${branche} » : la console ne publie que depuis « ${BRANCHE} ».`
      : `Aucune branche active (HEAD détachée) : la console ne publie que depuis « ${BRANCHE} ».`;
  } else if (amont !== `${REMOTE}/${BRANCHE}`) {
    raison = `« ${BRANCHE} » ne suit pas « ${REMOTE}/${BRANCHE} » : la console ne sait pas où publier.`;
  } else if (gitOuRien("rev-parse", "-q", "--verify", "MERGE_HEAD") || gitOuRien("rev-parse", "-q", "--verify", "REBASE_HEAD")) {
    raison = "Une fusion ou un rebase est en cours : termine-le dans le terminal d'abord.";
  }

  // L'adresse web du dépôt, pour suivre la reconstruction du site.
  const url = gitOuRien("remote", "get-url", REMOTE) || "";
  const web = url.replace(/^git@github\.com:/, "https://github.com/").replace(/\.git$/, "");

  return {
    disponible: true,
    publiable: !raison && (fichiers.length > 0 || aEnvoyer.length > 0),
    raison,
    branche,
    fichiers,
    autresModifs: Math.max(0, tous.length - fichiers.length),
    aEnvoyer,
    message: fichiers.length ? await messagePropose(fichiers) : null,
    actions: web.startsWith("https://github.com/") ? `${web}/actions` : null,
  };
}

/* ------------------------------------------------------------------ Publier */

/* Traduire les refus les plus courants de git push en phrases qui disent quoi faire. */
function expliquerEchecPush(sortie) {
  if (/rejected|fetch first|non-fast-forward/i.test(sortie)) {
    return "Le dépôt en ligne contient des commits que cet ordinateur n'a pas (faits " +
           "depuis une autre machine ?). Récupère-les d'abord dans le terminal — " +
           "git pull --rebase — puis publie à nouveau.";
  }
  if (/terminal prompts disabled|could not read Username|Authentication failed|403/i.test(sortie)) {
    return "GitHub refuse l'identification. Fais une fois git push dans le terminal pour " +
           "que le trousseau retienne tes identifiants, puis réessaie.";
  }
  if (/Could not resolve host|unable to access|Failed to connect|timed out/i.test(sortie)) {
    return "Impossible de joindre GitHub : vérifie la connexion, puis réessaie.";
  }
  return `git push a échoué :\n${sortie.trim()}`;
}

export async function publier(message) {
  const etat = await etatGit();
  if (!etat.disponible) throw new ErreurDAction(etat.raison);
  if (etat.raison) throw new ErreurDAction(etat.raison);

  let commit = null;
  if (etat.fichiers.length) {
    const texte = String(message || "").trim() || etat.message;
    try {
      git("add", "--", ...etat.fichiers);
      // Les chemins après `--` limitent le commit à ces fichiers, même si
      // d'autres étaient déjà indexés : ils le restent, sans partir avec.
      git("commit", "-m", texte, "--", ...etat.fichiers);
    } catch (erreur) {
      throw new ErreurDAction(`Le commit a échoué :\n${String(erreur.stderr || erreur.message).trim()}`);
    }
    commit = git("log", "-1", "--format=%h %s");
  } else if (!etat.aEnvoyer.length) {
    throw new ErreurDAction("Rien à publier : tout est déjà en ligne.");
  }

  const envoyes = lignes(gitOuRien("log", "--format=%h %s", `${REMOTE}/${BRANCHE}..HEAD`));
  try {
    await executer("git", ["push", REMOTE, BRANCHE], { cwd: RACINE, env: ENV, timeout: 90_000 });
  } catch (erreur) {
    const explication = expliquerEchecPush(String(erreur.stderr || erreur.message));
    // Le commit, lui, est fait : le dire, pour qu'un second clic ne semble pas
    // en refaire un. Il ne reste qu'à pousser.
    throw new ErreurDAction(commit
      ? `Le commit est fait (${commit}), mais l'envoi a échoué.\n\n${explication}`
      : explication);
  }

  return { commit, envoyes, actions: etat.actions };
}
