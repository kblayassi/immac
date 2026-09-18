/* La console des évaluations : une page locale pour lister, fermer, rouvrir,
 * recoder et publier les épreuves.
 *
 *   node tools/evaluations/console.mjs
 *
 * Ou, sans terminal, l'app que fabrique creer_raccourci.sh. Ouvre le navigateur
 * sur une page servie par cet ordinateur seul ; le bouton « Arrêter » de la
 * page (ou Ctrl+C) la ferme. Une seule console à la fois : relancer quand elle
 * tourne déjà rouvre simplement sa page.
 *
 * Pourquoi un petit serveur plutôt qu'une page du site : la version prof est
 * publiée, et une page publiée ne pourrait ni lire les codes sans les publier,
 * ni écrire les fichiers du dépôt. Ici, la page n'est qu'une vue : c'est Node
 * qui lit le carnet et réécrit les fichiers, avec le même code que la ligne de
 * commande (inventaire.mjs). Rien de ce dossier n'est déployé.
 *
 * Deux verrous, parce que la page affiche des codes :
 *   - le serveur n'écoute que 127.0.0.1 : aucune autre machine ne le joint ;
 *   - chaque appel porte un jeton tiré au lancement, qui n'est que dans l'adresse
 *     ouverte : une autre page du navigateur ne peut pas interroger la console.
 */

import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, unlinkSync, mkdirSync } from "node:fs";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, extname } from "node:path";

import { inventaire, niveauxDe, basculer, recoder, lireBareme, ErreurDAction } from "./inventaire.mjs";
import { RACINE, MANIFESTE } from "./manifeste.mjs";
import { CARNET, PRIVE } from "./codes.mjs";
import { etatGit, publier } from "./publier.mjs";

const ICI = dirname(fileURLToPath(import.meta.url));
const PAGES = join(ICI, "console");
const JETON = randomBytes(18).toString("base64url");
const PORT_PREFERE = 4173;
/* L'adresse de la console en cours, jeton compris : de quoi la retrouver quand
   on relance. Dans prive/, puisque le jeton ouvre les codes. */
const REPERE = join(PRIVE, ".console.json");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

/* ------------------------------------------------------------------- Les appels */

async function etat() {
  const evaluations = await inventaire();
  let git;
  try { git = await etatGit(); }
  catch { git = { disponible: false, raison: "git ne répond pas." }; }
  return {
    evaluations,
    niveaux: niveauxDe(evaluations),
    git,
    carnet: relative(RACINE, CARNET),
    manifeste: relative(RACINE, MANIFESTE),
  };
}

const ROUTES = {
  "GET /api/ping": () => ({ ok: true }),

  "GET /api/etat": () => etat(),

  "POST /api/actif": async ({ cle, actif }) => {
    const fait = await basculer(String(cle), Boolean(actif));
    return { fait, ...(await etat()) };
  },

  "POST /api/recoder": async ({ cle, code }) => {
    const propre = typeof code === "string" && code.trim() ? code.trim() : undefined;
    const fait = await recoder(String(cle), propre);
    return { fait, ...(await etat()) };
  },

  // Le barème voyage en JSON dans la réponse ; la page en fait un fichier à
  // télécharger. Un simple lien ne marcherait pas : il faut le jeton.
  "POST /api/bareme": ({ cle }) => lireBareme(String(cle)),

  "POST /api/publier": async ({ message }) => {
    const fait = await publier(typeof message === "string" ? message : "");
    return { fait, ...(await etat()) };
  },

  // Sans terminal, c'est le seul moyen de fermer la console. La réponse part
  // d'abord ; le serveur s'éteint juste après.
  "POST /api/arreter": () => {
    setTimeout(arreter, 150);
    return { ok: true };
  },
};

/* ------------------------------------------------------------------- Le serveur */

function jetonValide(requete) {
  const recu = Buffer.from(String(requete.headers["x-jeton"] || ""));
  const attendu = Buffer.from(JETON);
  return recu.length === attendu.length && timingSafeEqual(recu, attendu);
}

/* Refuser un nom d'hôte étranger coupe court au « DNS rebinding » : une page
   malveillante qui ferait pointer son propre domaine vers 127.0.0.1. */
function hoteLocal(requete) {
  const hote = String(requete.headers.host || "").replace(/:\d+$/, "");
  return hote === "127.0.0.1" || hote === "localhost";
}

function repondre(reponse, statut, corps, type = "application/json; charset=utf-8") {
  reponse.writeHead(statut, {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  });
  reponse.end(type.startsWith("application/json") ? JSON.stringify(corps) : corps);
}

function lireCorps(requete) {
  return new Promise((resoudre, rejeter) => {
    let brut = "";
    requete.on("data", (morceau) => {
      brut += morceau;
      if (brut.length > 10_000) { rejeter(new ErreurDAction("Requête trop longue.")); requete.destroy(); }
    });
    requete.on("end", () => {
      try { resoudre(brut ? JSON.parse(brut) : {}); }
      catch { rejeter(new ErreurDAction("Requête illisible.")); }
    });
  });
}

const serveur = createServer(async (requete, reponse) => {
  if (!hoteLocal(requete)) return repondre(reponse, 403, { erreur: "Hôte refusé." });

  const url = new URL(requete.url, "http://127.0.0.1");

  if (url.pathname.startsWith("/api/")) {
    if (!jetonValide(requete)) return repondre(reponse, 403, { erreur: "Jeton absent ou périmé : relance la console." });
    const route = ROUTES[`${requete.method} ${url.pathname}`];
    if (!route) return repondre(reponse, 404, { erreur: "Appel inconnu." });
    try {
      const corps = requete.method === "POST" ? await lireCorps(requete) : {};
      return repondre(reponse, 200, await route(corps));
    } catch (erreur) {
      if (erreur instanceof ErreurDAction) return repondre(reponse, 400, { erreur: erreur.message });
      console.error(erreur);
      return repondre(reponse, 500, { erreur: "Erreur inattendue — le détail est dans le terminal, "
                                                + "ou dans ~/Library/Logs/console-evaluations.log si la console vient de l'app." });
    }
  }

  // Les fichiers de la page. Un nom simple, sans dossier : rien ne sort de console/.
  const nom = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  if (!/^[\w.-]+$/.test(nom) || !TYPES[extname(nom)]) return repondre(reponse, 404, "Introuvable", "text/plain");
  const fichier = join(PAGES, nom);
  if (!existsSync(fichier)) return repondre(reponse, 404, "Introuvable", "text/plain");
  return repondre(reponse, 200, readFileSync(fichier), TYPES[extname(nom)]);
});

/* ------------------------------------------------------------------- Une seule console */

function oublierRepere() {
  try {
    const repere = JSON.parse(readFileSync(REPERE, "utf8"));
    if (repere.pid === process.pid) unlinkSync(REPERE);
  } catch { /* déjà parti */ }
}

function arreter() {
  oublierRepere();
  serveur.close();
  process.exit(0);
}

process.on("SIGINT", arreter);
process.on("SIGTERM", arreter);

function ouvrirNavigateur(adresse) {
  if (process.platform === "darwin") execFile("open", [adresse]);
  else if (process.platform === "win32") execFile("cmd", ["/c", "start", "", adresse]);
  else execFile("xdg-open", [adresse], () => {});
}

/* Une console tourne-t-elle déjà ? On ne se fie pas au seul fichier repère —
   il survit à un arrêt brutal — mais on interroge la console qu'il désigne. */
async function consoleExistante() {
  let repere;
  try { repere = JSON.parse(readFileSync(REPERE, "utf8")); } catch { return null; }
  try {
    const url = new URL(repere.adresse);
    const reponse = await fetch(`${url.origin}/api/ping`, {
      headers: { "X-Jeton": url.hash.slice(1) },
      signal: AbortSignal.timeout(1500),
    });
    return reponse.ok ? repere.adresse : null;
  } catch {
    return null;
  }
}

/* Annoncer la console, une fois qu'elle écoute. Enregistré une seule fois, à
   part de ecouter() : passé en rappel à listen(), il resterait accroché après
   l'échec sur le port préféré, et la seconde tentative l'appellerait deux fois —
   deux annonces, deux onglets ouverts. */
serveur.once("listening", () => {
  const adresse = `http://127.0.0.1:${serveur.address().port}/#${JETON}`;
  mkdirSync(PRIVE, { recursive: true });
  writeFileSync(REPERE, JSON.stringify({ pid: process.pid, adresse }) + "\n", { mode: 0o600 });
  console.log(`\n  \x1b[1mConsole des évaluations\x1b[0m`);
  console.log(`  \x1b[90m${adresse}\x1b[0m`);
  console.log(`\n  Ouverte dans le navigateur. Bouton « Arrêter » ou Ctrl+C pour la fermer.\n`);
  // Le jeton voyage dans le fragment (#…) : il n'est jamais envoyé au serveur
  // dans une requête de page, ni conservé dans un en-tête Referer.
  // CONSOLE_SANS_NAVIGATEUR=1 : pour les essais, ou une machine sans écran.
  if (!process.env.CONSOLE_SANS_NAVIGATEUR) ouvrirNavigateur(adresse);
});

function ecouter(port) {
  const echec = (erreur) => {
    // Le port préféré est pris (une autre console ?) : on laisse le système choisir.
    if (erreur.code === "EADDRINUSE" && port !== 0) return ecouter(0);
    throw erreur;
  };
  serveur.once("error", echec);
  // Une fois à l'écoute, cet écouteur n'a plus d'objet : une erreur ultérieure
  // ne doit pas relancer une écoute.
  serveur.once("listening", () => serveur.off("error", echec));
  serveur.listen(port, "127.0.0.1");
}

const deja = await consoleExistante();
if (deja) {
  console.log(`\n  La console tourne déjà : sa page est rouverte.\n`);
  if (!process.env.CONSOLE_SANS_NAVIGATEUR) ouvrirNavigateur(deja);
} else {
  ecouter(PORT_PREFERE);
}
