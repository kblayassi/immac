/* Évaluations — la page de composition.
 *
 * Application autonome (aucun framework), voisine des parcours interactifs mais
 * pas leur cousine : ici, rien ne se valide, rien ne se déverrouille, rien ne
 * s'explique. Un sujet ouvert d'un bloc, un chronomètre, et un fichier à rendre.
 *
 * Elle réutilise les briques du site :
 *   ../parcours/atelier.js    interpréteur Python et éditeur
 *   ../parcours/archive.js    nom de rendu et téléchargement
 *   ../parcours/app.css       la charte
 *   ./rendu.js                le format du fichier remis
 *
 * Le sujet vit à côté de l'index.html qui charge ce moteur : sujet.js.
 * Il ne contient AUCUNE attente — pas de sortie attendue, pas de motif, pas de
 * test. Il n'y a donc rien à lire dans la page qui ressemble à un corrigé.
 * Les critères de notation sont dans le barème, que seul l'enseignant possède.
 */

import { creerPython, creerEditeur, executerAvecSaisies } from "../parcours/atelier.js";
import { nomDeRendu, telecharger } from "../parcours/archive.js";
import { FORMAT, sceller, duree } from "./rendu.js";
import { ouvrir } from "./scelle.js";
import { EVALUATIONS } from "./evaluations.js";

/* Comme pour les parcours : le moteur se repère à l'adresse de la PAGE qui le
   charge, pas à la sienne. Le sujet est toujours à côté de l'index.html. */
const PAGE = new URL(".", document.baseURI);
const URL_WORKER = new URL("../javascripts/pyodide-worker.js", PAGE).href;
const URL_BUNDLE = new URL("../javascripts/codemirror-bundle.js", PAGE).href;

/* Une seule page pour toutes les évaluations : l'élève arrive ici sans avoir
   rien à choisir, et c'est le CODE qui désigne le sujet. La page essaie le code
   sur chaque évaluation publiée (docs/eval/evaluations.js) jusqu'à ce que l'une
   s'ouvre — AES-GCM authentifie, donc un code faux échoue partout.

   Tant que rien n'est ouvert, ces trois-là sont nuls : le sujet n'existe pas
   encore du point de vue de la page. */
let EVALUATION = null;
let SCELLE = null;
let QUESTIONS = null;
let CLE = null;
let etat = null;

/* Quelle évaluation est en cours sur ce poste. Sans ce repère, un élève qui
   recharge la page se verrait redemander un code que le tableau n'affiche
   peut-être plus. Il est effacé quand l'élève quitte l'évaluation. */
const POINTEUR = "eval:encours";

/** Charge une évaluation et son état local. Rend false si le sujet est
    introuvable ou si rien n'a encore été ouvert sur ce poste. */
async function charger(cle, questionsOuvertes = null) {
  let sujet;
  try { sujet = await import(new URL(`../${cle}/sujet.js`, PAGE).href); }
  catch { return false; }

  EVALUATION = sujet.EVALUATION;
  SCELLE = sujet.SCELLE || null;
  CLE = `eval:${EVALUATION.cle}:v1`;
  etat = lireEtat();
  // Un sujet en clair (non scellé) s'ouvre sans code : c'est le cas d'un
  // brouillon qu'on se relit avant de le sceller.
  QUESTIONS = questionsOuvertes || etat.sujet || sujet.QUESTIONS || null;
  return !!QUESTIONS;
}

const Python = creerPython(URL_WORKER);

/* ====================================================================== Outils */

const $ = (sel, racine = document) => racine.querySelector(sel);

function elem(balise, classe, texte) {
  const n = document.createElement(balise);
  if (classe) n.className = classe;
  if (texte != null) n.textContent = texte;
  return n;
}

let minuteurToast;
function toast(message) {
  const boite = $("#toast");
  boite.textContent = message;
  boite.dataset.visible = "1";
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => { boite.dataset.visible = ""; }, 3200);
}

/* ======================================================================== État

   Tout vit dans le navigateur de l'élève, et rien ne part sur un serveur — il
   n'y en a pas. Chaque frappe est réenregistrée : un navigateur qui plante ou
   une page rechargée par erreur ne coûtent pas le devoir.

   `debut` est la seule valeur qui compte vraiment : elle fixe l'heure de fin.
   Elle est écrite au clic sur « Commencer », et jamais réécrite. Recharger la
   page ne rend donc pas une minute. */

function structureVide() {
  return {
    version: 1,
    cle: EVALUATION.cle,
    eleve: { nom: "", prenom: "", classe: "" },
    debut: null,
    dureeMinutes: null,        // copiée au démarrage : un sujet retouché en
    termine: null,             // cours de devoir ne rallonge pas l'épreuve
    sujet: null,               // les questions, une fois le sujet déscellé
    reponses: {},
    journal: [],
  };
}

function lireEtat() {
  try {
    const lu = JSON.parse(localStorage.getItem(CLE) || "null");
    if (!lu || typeof lu !== "object" || lu.cle !== EVALUATION.cle) return structureVide();
    return { ...structureVide(), ...lu };
  } catch {
    return structureVide();
  }
}

function ecrireEtat() {
  try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch { /* stockage bloqué */ }
}

function reponse(id) {
  if (!etat.reponses[id]) etat.reponses[id] = {};
  return etat.reponses[id];
}

const enCours = () => etat?.debut != null && !etat.termine;

/* ===================================================================== Journal

   Ce que la page enregistre est annoncé à l'élève sur l'écran d'accueil, et
   figure en clair dans le fichier qu'il rend : rien ne se passe dans son dos.

   Refabriquer un journal cohérent — horaires plausibles, exécutions avant la
   bonne réponse, aucun trou — est nettement plus difficile que de retoucher une
   réponse dans le fichier. C'est le garde-fou le plus utile des trois. */

function journal(evenement, details = {}) {
  if (etat?.debut == null) return;
  etat.journal.push({
    t: Math.round((Date.now() - etat.debut) / 1000),   // secondes depuis le début
    e: evenement,
    ...details,
  });
  // Un journal qui déborde ne sert plus personne, et le fichier doit rester léger.
  if (etat.journal.length > 3000) etat.journal.splice(0, 500);
  ecrireEtat();
}

function surveiller() {
  document.addEventListener("visibilitychange", () => {
    if (!enCours()) return;
    journal(document.hidden ? "onglet-quitte" : "onglet-revient");
  });

  /* Fermer l'onglet pendant l'épreuve n'efface rien — le travail est dans ce
     navigateur — mais l'élève ne le sait pas, et la panique coûte des minutes. */
  window.addEventListener("beforeunload", (ev) => {
    if (!enCours()) return;
    ev.preventDefault();
    ev.returnValue = "";
  });
}

/* ==================================================================== Chrono */

let minuteur = null;
let dernierAvertissement = null;

function finPrevue() {
  return etat.debut + (etat.dureeMinutes ?? EVALUATION.dureeMinutes) * 60000;
}

function resteEnSecondes() {
  return Math.max(0, Math.round((finPrevue() - Date.now()) / 1000));
}

function afficherChrono() {
  const cadran = $("#chrono");
  if (!cadran) return;
  const reste = resteEnSecondes();
  const h = Math.floor(reste / 3600);
  const m = Math.floor((reste % 3600) / 60);
  const s = reste % 60;
  cadran.textContent = h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // Deux paliers, pas davantage : un chrono qui clignote sans arrêt cesse d'alerter.
  const urgence = reste <= 60 ? "2" : reste <= 300 ? "1" : "";
  cadran.dataset.urgence = urgence;
  if (urgence && urgence !== dernierAvertissement) {
    dernierAvertissement = urgence;
    toast(reste <= 60 ? "Dernière minute : ton travail est enregistré au fur et à mesure."
                      : "Il reste 5 minutes.");
  }
}

function demarrerChrono() {
  clearInterval(minuteur);
  afficherChrono();
  minuteur = setInterval(() => {
    afficherChrono();
    if (resteEnSecondes() <= 0) remettre("temps");
  }, 1000);
}

/* ======================================================================= Code

   Le premier écran, et le seul avant l'heure : un champ. L'élève n'a pas à
   savoir dans quel dossier vit son devoir, ni à reconnaître son intitulé dans
   une liste — le code que son professeur écrit au tableau fait les deux. */

function rendreCode() {
  const vue = $("#vue");
  vue.innerHTML = "";
  document.body.dataset.phase = "code";
  $("#barre-titre").textContent = "";

  const carte = elem("div", "accueil accueil-code");
  carte.innerHTML = `
    <h1>Passer une évaluation</h1>
    <p>Entre le <strong>code de l'évaluation</strong>, celui que ton professeur a
       écrit au tableau. C'est lui qui ouvre le sujet : tant qu'il n'est pas
       entré, il n'y a rien à lire dans cette page.</p>
    <div class="champ champ-code">
      <label for="champ-code">Code de l'évaluation</label>
      <input id="champ-code" type="text" autocomplete="off" spellcheck="false"
             autocapitalize="characters" placeholder="RUBIS-LUNE-GIVRE-42">
    </div>
    <p class="discret">Ni les majuscules, ni les tirets, ni les espaces ne
       comptent.</p>`;

  const btn = elem("button", "bouton grand", "Ouvrir le sujet");
  btn.type = "button";
  const alerte = elem("p", "alerte");
  alerte.hidden = true;
  carte.append(btn, alerte);
  vue.appendChild(carte);

  const champ = $("#champ-code");
  champ.focus();
  champ.addEventListener("keydown", (ev) => { if (ev.key === "Enter") btn.click(); });

  btn.addEventListener("click", async () => {
    const code = champ.value;
    if (!code.trim()) { champ.focus(); return; }

    btn.disabled = true;
    btn.textContent = "Ouverture…";
    alerte.hidden = true;

    const trouve = await chercherParCode(code);

    btn.disabled = false;
    btn.textContent = "Ouvrir le sujet";
    if (!trouve) {
      alerte.textContent = "Ce code n'ouvre aucune évaluation.";
      alerte.hidden = false;
      champ.select();
      return;
    }
    // Le sujet est ouvert : il vit désormais dans ce navigateur, et l'élève ne
    // redonnera pas le code, même s'il recharge la page.
    etat.sujet = QUESTIONS;
    ecrireEtat();
    try { localStorage.setItem(POINTEUR, EVALUATION.cle); } catch { /* stockage bloqué */ }
    rendre();
  });
}

/* Essaie le code sur chaque évaluation publiée. Le déchiffrement coûte un quart
   de seconde par essai : avec les quelques épreuves ouvertes d'une année, c'est
   imperceptible — et c'est le prix d'un code qui ne se casse pas. */
async function chercherParCode(code) {
  // Une évaluation désactivée garde son sujet en ligne, scellé : on cesse
  // simplement d'essayer son code, qui n'ouvre donc plus rien.
  for (const { cle } of EVALUATIONS.filter((e) => e.actif !== false)) {
    let sujet;
    try { sujet = await import(new URL(`../${cle}/sujet.js`, PAGE).href); }
    catch { continue; }
    if (!sujet.SCELLE) continue;
    const questions = await ouvrir(sujet.SCELLE, code);
    if (questions) return charger(cle, questions);
  }
  return false;
}

/* ===================================================================== Accueil */

/* Le nombre de questions s'annonce même sujet fermé : il est resté en clair dans
   le fichier scellé, parce qu'ouvrir une épreuve sans savoir ce qui attend
   n'aide personne. */
function nbQuestionsAnnonce() {
  if (QUESTIONS) return QUESTIONS.filter((q) => q.type !== "document").length;
  return SCELLE?.nbQuestions ?? "?";
}

function rendreAccueil() {
  const vue = $("#vue");
  vue.innerHTML = "";
  document.body.dataset.phase = "accueil";

  const carte = elem("div", "accueil");
  carte.innerHTML = `
    <p class="sur-titre">${EVALUATION.surTitre || ""}</p>
    <h1>${EVALUATION.titre}</h1>
    <p class="duree-annoncee"><strong>${EVALUATION.dureeMinutes} minutes</strong>
       &middot; ${nbQuestionsAnnonce()} questions</p>
    ${EVALUATION.consignes || ""}
    <div class="encadre" data-ton="attention">
      <span class="chapo">Avant de commencer</span>
      <ul>
        <li>Le chronomètre démarre au clic sur le bouton, et ne s'arrête plus :
            recharger la page ou changer d'onglet ne le remet pas à zéro.</li>
        <li>Ton travail est enregistré dans ce navigateur à chaque frappe.
            Reste sur le même ordinateur.</li>
        <li>Rien n'est corrigé pendant l'épreuve : tu peux exécuter tes programmes,
            mais la page ne dira jamais si une réponse est juste.</li>
        <li>À la fin du temps, le fichier de ton devoir est téléchargé
            automatiquement. C'est lui que tu remets.</li>
        <li>La page note l'heure de tes actions, tes exécutions, tes collages et
            tes changements d'onglet. Tout figure en clair dans le fichier rendu.</li>
      </ul>
    </div>`;

  const identite = elem("div", "identite");
  identite.innerHTML = `
    <div class="champ"><label for="champ-nom">Nom</label>
      <input id="champ-nom" type="text" autocomplete="off" placeholder="LOVELACE"></div>
    <div class="champ"><label for="champ-prenom">Prénom</label>
      <input id="champ-prenom" type="text" autocomplete="off" placeholder="Ada"></div>
    <div class="champ"><label for="champ-classe">Classe</label>
      <input id="champ-classe" type="text" autocomplete="off" placeholder="1re NSI"></div>`;
  carte.appendChild(identite);

  const btn = elem("button", "bouton grand", "Commencer l'évaluation");
  btn.type = "button";
  const alerte = elem("p", "alerte");
  alerte.hidden = true;
  carte.append(btn, alerte);
  vue.appendChild(carte);

  for (const champ of ["nom", "prenom", "classe"]) {
    const input = $(`#champ-${champ}`);
    input.value = etat.eleve?.[champ] || "";
    input.addEventListener("input", () => {
      etat.eleve = { ...etat.eleve, [champ]: input.value.slice(0, 40) };
      ecrireEtat();
    });
  }

  btn.addEventListener("click", () => {
    // Un rendu anonyme est un rendu qu'on ne peut pas noter : c'est le seul
    // moment où la page se met en travers du chemin de l'élève.
    if (!etat.eleve.nom.trim() || !etat.eleve.prenom.trim()) {
      alerte.textContent = "Indique ton nom et ton prénom avant de commencer.";
      alerte.hidden = false;
      $("#champ-nom").focus();
      return;
    }

    etat.debut = Date.now();
    etat.dureeMinutes = EVALUATION.dureeMinutes;
    etat.sujet = QUESTIONS;
    ecrireEtat();
    journal("debut");
    Python.prechauffer();          // que la première exécution ne coûte pas 20 s
    rendre();
  });
}

/* ====================================================================== Sujet */

function rendreSujet() {
  const vue = $("#vue");
  vue.innerHTML = "";
  document.body.dataset.phase = "composition";
  $("#barre-titre").textContent = EVALUATION.titre;
  $("#identite-barre").textContent =
    `${(etat.eleve.nom || "").toUpperCase()} ${etat.eleve.prenom || ""}`.trim();
  $("#btn-rendre").hidden = false;
  $("#cadre-chrono").hidden = false;

  vue.appendChild(construireSommaire());

  const numerotees = QUESTIONS.filter((q) => q.type !== "document");
  for (const question of QUESTIONS) {
    vue.appendChild(construireQuestion(question, numerotees.indexOf(question) + 1));
  }

  /* Rendre avant l'heure se demande depuis deux endroits — la barre, toujours
     visible, et le bas du sujet, là où l'élève arrive quand il a fini. */
  const demanderRemise = () => {
    if (!confirm("Rendre ton devoir maintenant ? Tu ne pourras plus le modifier.")) return;
    remettre("eleve");
  };
  $("#btn-rendre").onclick = demanderRemise;

  const pied = elem("div", "pied-sujet");
  const btn = elem("button", "bouton grand", "Terminer et rendre mon devoir");
  btn.type = "button";
  btn.addEventListener("click", demanderRemise);
  pied.appendChild(btn);
  vue.appendChild(pied);

  demarrerChrono();
  majSommaire();
}

/* Le sommaire sert à naviguer, et à voir d'un coup d'œil ce qui reste blanc.
   Ce n'est pas une correction : il dit « tu as écrit quelque chose », jamais
   « c'est juste ». */
function construireSommaire() {
  const nav = elem("nav", "sommaire");
  nav.appendChild(elem("span", "sommaire-titre", "Questions"));
  let numero = 0;
  for (const q of QUESTIONS) {
    if (q.type === "document") continue;
    numero++;
    const lien = elem("a", "puce-question", String(numero));
    lien.href = `#${q.id}`;
    lien.dataset.pour = q.id;
    lien.title = q.titre || `Question ${numero}`;
    nav.appendChild(lien);
  }
  return nav;
}

function aRepondu(q) {
  const r = etat.reponses[q.id];
  if (!r) return false;
  if (q.type === "code") return (r.code ?? "").trim() !== "" &&
                                (r.code ?? "").trim() !== (q.depart ?? "").trim();
  if (q.type === "qcm") return Array.isArray(r.choix) ? r.choix.length > 0 : r.choix != null;
  if (q.type === "texte") return (r.texte ?? "").trim() !== "";
  return false;
}

function majSommaire() {
  for (const q of QUESTIONS) {
    const puce = document.querySelector(`.puce-question[data-pour="${q.id}"]`);
    if (puce) puce.dataset.remplie = aRepondu(q) ? "1" : "";
  }
}

const LIBELLE_TYPE = { code: "Programme", qcm: "Choix multiple", texte: "Réponse rédigée" };

function construireQuestion(q, numero) {
  const bloc = elem("section", "question");
  bloc.id = q.id;

  if (q.type === "document") {
    bloc.dataset.document = "1";
    const corps = elem("div", "question-corps");
    if (q.titre) corps.appendChild(elem("h2", null, q.titre));
    const contenu = elem("div");
    contenu.innerHTML = q.contenu || "";
    corps.appendChild(contenu);
    bloc.appendChild(corps);
    return bloc;
  }

  const entete = elem("header", "question-entete");
  entete.appendChild(elem("span", "question-numero", String(numero)));
  const titres = elem("div");
  titres.appendChild(elem("h2", null, q.titre || `Question ${numero}`));
  const meta = elem("p", "question-meta");
  meta.textContent = [LIBELLE_TYPE[q.type], q.points != null
    ? `${q.points} ${q.points > 1 ? "points" : "point"}` : null].filter(Boolean).join(" · ");
  titres.appendChild(meta);
  entete.appendChild(titres);
  bloc.appendChild(entete);

  const corps = elem("div", "question-corps");
  const enonce = elem("div", "enonce");
  enonce.innerHTML = q.enonce || "";
  corps.appendChild(enonce);

  if (q.type === "code") monterCode(q, corps);
  if (q.type === "qcm") monterQcm(q, corps);
  if (q.type === "texte") monterTexte(q, corps);

  bloc.appendChild(corps);
  return bloc;
}

/* ------------------------------------------------------------------ Programme */

function monterCode(q, corps) {
  const r = reponse(q.id);

  const atelier = elem("div", "atelier");
  atelier.appendChild(elem("div", "atelier-onglet", q.nomFichier || "programme.py"));
  const hote = elem("div", "hote-editeur");
  atelier.appendChild(hote);

  const actions = elem("div", "atelier-actions");
  const btnExec = elem("button", "bouton fantome", "▶ Exécuter");
  btnExec.type = "button";
  /* Pas de bouton « Valider », pas de coup de pouce, pas de correction : c'est
     toute la différence avec un parcours. L'élève exécute pour voir ce que fait
     son programme, il décide seul s'il est juste. */
  actions.appendChild(btnExec);
  atelier.appendChild(actions);

  const console_ = elem("pre", "console");
  console_.dataset.etat = "vide";
  console_.textContent = "Clique sur « Exécuter » pour lancer ton programme.";
  atelier.appendChild(console_);
  corps.appendChild(atelier);

  /* Le code de départ ne remplace jamais un brouillon existant : au rechargement,
     l'élève retrouve ce qu'il avait écrit. */
  const depart = r.code ?? q.depart ?? "";
  let editeur = null;

  const monter = async () => {
    if (editeur) return editeur;
    editeur = await creerEditeur(hote, depart, (texte) => {
      r.code = texte;
      ecrireEtat();
      majSommaire();
    }, URL_BUNDLE);
    return editeur;
  };

  /* Pyodide et CodeMirror coûtent cher : on ne monte l'éditeur qu'à l'approche
     de l'écran. Le sujet entier est ouvert, il peut contenir dix ateliers. */
  const observateur = new IntersectionObserver((entrees, obs) => {
    if (!entrees.some((e) => e.isIntersecting)) return;
    obs.disconnect();
    monter();
  }, { rootMargin: "600px 0px" });
  observateur.observe(atelier);

  hote.addEventListener("paste", (ev) => {
    const colle = ev.clipboardData?.getData("text") || "";
    journal("colle", { q: q.id, n: colle.length });
  });

  function ecrire(texte, etatConsole) {
    console_.textContent = texte;
    console_.dataset.etat = etatConsole || "";
    console_.scrollTop = console_.scrollHeight;
  }

  function reclamerSaisie() {
    return new Promise((resolve) => {
      const champ = document.createElement("input");
      champ.type = "text";
      champ.className = "saisie";
      champ.autocomplete = "off";
      champ.spellcheck = false;
      champ.setAttribute("aria-label", "Réponse attendue par le programme");
      console_.appendChild(champ);
      console_.scrollTop = console_.scrollHeight;
      champ.focus();
      champ.addEventListener("keydown", (ev) => {
        if (ev.key !== "Enter") return;
        ev.preventDefault();
        const valeur = champ.value;
        champ.replaceWith(document.createTextNode(valeur + "\n"));
        resolve(valeur);
      });
    });
  }

  btnExec.addEventListener("click", async () => {
    const ed = await monter();
    btnExec.disabled = true;
    ecrire("Exécution…", "attente");
    journal("execute", { q: q.id });

    const res = await executerAvecSaisies(Python, ed.lire(), {
      reclamerSaisie,
      afficher: (sortie) => ecrire(sortie, "saisie"),
    });
    btnExec.disabled = false;

    if (!res.ok) { ecrire(res.erreur || "Exécution impossible.", "erreur"); return; }
    if (res.erreur) { ecrire((res.stdout || "") + "\n" + res.erreur, "erreur"); return; }
    ecrire(res.stdout || "(ton programme n'affiche rien)", res.stdout ? "" : "vide");
  });
}

/* ------------------------------------------------------------------------ QCM */

function monterQcm(q, corps) {
  const r = reponse(q.id);
  const multiple = q.multiple === true;
  if (multiple && !Array.isArray(r.choix)) r.choix = [];

  const liste = elem("div", "qcm");
  if (multiple) liste.appendChild(elem("p", "qcm-consigne", "Plusieurs réponses possibles."));

  /* Un seul endroit décide de l'apparence, à partir de l'état : les deux modes
     de sélection ne se répartissent pas la peinture entre eux. */
  function repeindre() {
    liste.querySelectorAll(".qcm-option").forEach((b, j) => {
      b.dataset.choisi = (multiple ? r.choix.includes(j) : r.choix === j) ? "1" : "";
    });
  }

  q.options.forEach((option, i) => {
    const btn = elem("button", "qcm-option");
    btn.type = "button";
    btn.appendChild(elem("span", "puce", String.fromCharCode(65 + i)));
    const texte = elem("span");
    texte.innerHTML = option.texte;
    btn.appendChild(texte);

    btn.addEventListener("click", () => {
      /* Aucun verdict : on marque le choix, on ne le juge pas. Et l'élève peut
         revenir sur sa réponse autant qu'il veut jusqu'à la remise — un second
         clic sur la même case l'efface. */
      if (multiple) {
        r.choix = r.choix.includes(i) ? r.choix.filter((n) => n !== i)
                                      : [...r.choix, i].sort((a, b) => a - b);
      } else {
        r.choix = r.choix === i ? null : i;
      }
      ecrireEtat();
      journal("reponse", { q: q.id });
      repeindre();
      majSommaire();
    });

    liste.appendChild(btn);
  });

  repeindre();

  corps.appendChild(liste);
}

/* -------------------------------------------------------------- Texte rédigé */

function monterTexte(q, corps) {
  const r = reponse(q.id);
  const zone = elem("textarea", "reponse-texte");
  zone.rows = q.lignes || 4;
  zone.placeholder = q.placeholder || "Ta réponse…";
  zone.spellcheck = true;
  zone.value = r.texte ?? "";
  zone.addEventListener("input", () => {
    r.texte = zone.value;
    ecrireEtat();
    majSommaire();
  });
  zone.addEventListener("paste", (ev) => {
    journal("colle", { q: q.id, n: (ev.clipboardData?.getData("text") || "").length });
  });
  corps.appendChild(zone);
}

/* ===================================================================== Remise */

/* Construit le fichier, le fait descendre, et ferme l'épreuve.
   `cause` vaut "temps" (le chronomètre) ou "eleve" (il a cliqué). */
let remiseEnCours = false;

async function remettre(cause) {
  if (remiseEnCours) return;
  remiseEnCours = true;
  clearInterval(minuteur);

  if (!etat.termine) {
    journal("rendu", { cause });
    etat.termine = { a: Date.now(), cause };
    ecrireEtat();
  }

  const fichier = await construireRendu();
  ouvrirRemise(fichier, cause);

  /* Le téléchargement d'office : il part sans clic, donc certains navigateurs
     peuvent le retenir. C'est précisément pourquoi la fenêtre qui suit propose
     le bouton — l'élève n'est jamais coincé avec un devoir qu'il ne peut pas
     sortir de la page. */
  try { descendre(fichier); } catch { /* la fenêtre prend le relais */ }
}

async function construireRendu() {
  const brut = {
    format: FORMAT,
    evaluation: {
      cle: EVALUATION.cle,
      titre: EVALUATION.titre,
      dureeMinutes: etat.dureeMinutes ?? EVALUATION.dureeMinutes,
      /* Le rendu se décrit lui-même : l'ordre et l'intitulé des questions y
         figurent, pour qu'il reste lisible dans dix ans sans le sujet. */
      questions: QUESTIONS.filter((q) => q.type !== "document")
        .map((q) => ({ id: q.id, type: q.type, titre: q.titre || null })),
    },
    eleve: { ...etat.eleve },
    chrono: {
      debut: new Date(etat.debut).toISOString(),
      fin: new Date(etat.termine.a).toISOString(),
      cause: etat.termine.cause,
      tempsUtiliseS: Math.round((etat.termine.a - etat.debut) / 1000),
    },
    reponses: etat.reponses,
    journal: etat.journal,
  };
  return sceller(brut);
}

function nomFichier() {
  const rendu = nomDeRendu(etat.eleve?.nom, etat.eleve?.prenom) || "eleve";
  return `${EVALUATION.cle}-${rendu}.json`;
}

function descendre(rendu) {
  telecharger(new Blob([JSON.stringify(rendu, null, 2)], { type: "application/json" }),
              nomFichier());
}

function ouvrirRemise(rendu, cause) {
  document.body.dataset.phase = "termine";
  $("#btn-rendre").hidden = true;
  $("#cadre-chrono").hidden = true;

  const dlg = $("#panneau-remise");
  $("#remise-titre").textContent = cause === "temps" ? "Temps écoulé" : "Devoir rendu";
  $("#remise-texte").innerHTML = `
    <p>Ton devoir est clos. Le fichier <code>${nomFichier()}</code> a été
       téléchargé — c'est lui que tu remets à ton professeur.</p>
    <p class="discret">Temps utilisé :
       ${duree((etat.termine.a - etat.debut) / 1000)}.</p>`;

  const btn = $("#btn-retelecharger");
  btn.onclick = () => { descendre(rendu); toast("Fichier téléchargé"); };

  /* Quitter efface le devoir de cet ordinateur. C'est voulu : en salle, le poste
     sert au groupe suivant, et le brouillon d'un élève n'a rien à y faire. D'où
     la question posée franchement — le fichier est la seule chose qui reste. */
  const sortie = $("#btn-quitter");
  if (sortie) {
    sortie.onclick = () => {
      if (!confirm("As-tu bien récupéré ton fichier ?\n\n" +
                   "Quitter effacera ton devoir de cet ordinateur.")) return;
      try {
        localStorage.removeItem(CLE);
        localStorage.removeItem(POINTEUR);
      } catch { /* stockage bloqué */ }
      // `replace` : le bouton « page précédente » ne doit pas ramener au sujet.
      window.location.replace(EVALUATION.retour?.href || "../NSI/Evaluations/");
    };
  }

  /* showModal() rend le reste de la page inerte : c'est le verrou. Il n'y a pas
     de bouton pour fermer cette fenêtre, et la touche Échap est refusée. */
  dlg.addEventListener("cancel", (ev) => ev.preventDefault());
  if (!dlg.open) dlg.showModal();
}

/* ======================================================================= Boot */

function rendre() {
  if (etat.debut == null) { rendreAccueil(); return; }
  rendreSujet();
  /* Rouvrir la page après la remise, ou après l'heure : le sujet s'affiche en
     lecture, et la fenêtre de remise revient par-dessus. */
  if (etat.termine || resteEnSecondes() <= 0) remettre(etat.termine?.cause || "temps");
}

/* Le thème suit le même réglage que les parcours : un élève qui a mis le site
   en sombre ne doit pas recevoir une page blanche en pleine figure. */
function initTheme() {
  const choix = localStorage.getItem("parcours:theme") || "auto";
  if (choix !== "auto") document.documentElement.dataset.theme = choix;
}

/* Au chargement : ou bien une évaluation est déjà ouverte sur ce poste — on la
   reprend là où elle en était, sans redemander le code — ou bien on demande le
   code. C'est tout le parcours de l'élève. */
async function demarrer() {
  initTheme();
  surveiller();

  let encours = null;
  try { encours = localStorage.getItem(POINTEUR); } catch { /* stockage bloqué */ }
  if (encours && await charger(encours)) { rendre(); return; }

  rendreCode();
}

demarrer();
