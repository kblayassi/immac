/* Évaluations — consulter un sujet, côté professeur.
 *
 * Version prof uniquement : la construction élève retire cette page et ce
 * module (plugins/version_eleve.py).
 *
 * On entre le code d'une évaluation, et le sujet s'affiche en entier, en
 * lecture : énoncés, choix des QCM, code de départ, points. Ni chronomètre, ni
 * identité, ni fichier à rendre — et rien n'est écrit dans le navigateur. Le
 * code est essayé sur TOUTES les évaluations publiées, désactivées comprises :
 * on relit volontiers une épreuve passée.
 *
 * La page ne contient rien de secret : comme la page d'épreuve, elle déchiffre
 * dans le navigateur le sujet dont on lui donne le code (./scelle.js). Et comme
 * le sujet publié, ce qu'elle affiche ne contient aucune attente.
 *
 * Elle sert aussi à LIBÉRER UN POSTE : la page d'épreuve refuse une évaluation
 * déjà rendue depuis le même navigateur (repère `eval:rendus`). Servie depuis
 * la même origine que la page d'épreuve, celle-ci partage son stockage et peut
 * effacer ce repère — à ouvrir sur le poste concerné.
 */

import { ouvrir } from "./scelle.js";
import { EVALUATIONS } from "./evaluations.js";

const PAGE = new URL(".", document.baseURI);
const RENDUS = "eval:rendus";

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

const points = (n) => `${n} ${n > 1 ? "points" : "point"}`;

/* ======================================================================= Code */

function rendreCode() {
  const vue = $("#vue");
  vue.innerHTML = "";
  $("#barre-titre").textContent = "Consulter une évaluation";
  $("#btn-autre").hidden = true;

  const carte = elem("div", "accueil accueil-code");
  carte.innerHTML = `
    <h1>Consulter une évaluation</h1>
    <p>Entre le <strong>code</strong> d'une évaluation pour en relire le sujet :
       tel que l'élève le voit, sans chronomètre et sans fichier à rendre.
       Les évaluations désactivées s'ouvrent aussi.</p>
    <div class="champ champ-code">
      <label for="champ-code">Code de l'évaluation</label>
      <input id="champ-code" type="text" autocomplete="off" spellcheck="false"
             autocapitalize="characters" placeholder="RUBIS-LUNE-GIVRE-42">
    </div>`;

  const btn = elem("button", "bouton grand", "Ouvrir le sujet");
  btn.type = "button";
  const alerte = elem("p", "alerte");
  alerte.hidden = true;
  carte.append(btn, alerte);
  vue.appendChild(carte);
  vue.appendChild(construirePoste());

  const champ = $("#champ-code");
  champ.focus();
  champ.addEventListener("keydown", (ev) => { if (ev.key === "Enter") btn.click(); });

  btn.addEventListener("click", async () => {
    if (!champ.value.trim()) { champ.focus(); return; }
    btn.disabled = true;
    btn.textContent = "Ouverture…";
    alerte.hidden = true;

    const trouve = await chercherParCode(champ.value);

    btn.disabled = false;
    btn.textContent = "Ouvrir le sujet";
    if (!trouve) {
      alerte.textContent = "Ce code n'ouvre aucune évaluation.";
      alerte.hidden = false;
      champ.select();
      return;
    }
    rendreSujet(trouve);
  });
}

async function chercherParCode(code) {
  for (const entree of EVALUATIONS) {
    let sujet;
    try { sujet = await import(new URL(`../${entree.cle}/sujet.js`, PAGE).href); }
    catch { continue; }
    if (!sujet.SCELLE) continue;
    const questions = await ouvrir(sujet.SCELLE, code);
    if (questions) return { entree, evaluation: sujet.EVALUATION, scelle: sujet.SCELLE, questions };
  }
  return null;
}

/* ====================================================================== Sujet */

function rendreSujet({ entree, evaluation, scelle, questions }) {
  const vue = $("#vue");
  vue.innerHTML = "";
  $("#barre-titre").textContent = evaluation.titre;
  const autre = $("#btn-autre");
  autre.hidden = false;
  autre.onclick = rendreCode;

  const numerotees = questions.filter((q) => q.type !== "document");
  const total = scelle.points ?? numerotees.reduce((s, q) => s + (q.points || 0), 0);

  const entete = elem("header", "copie-entete");
  const titres = elem("div");
  titres.appendChild(elem("p", "sur-titre", [evaluation.niveau || entree.niveau, evaluation.surTitre]
    .filter(Boolean).join(" · ")));
  titres.appendChild(elem("h1", null, evaluation.titre));
  titres.appendChild(elem("p", "discret",
    `${evaluation.dureeMinutes} minutes · ${numerotees.length} questions · ${points(total)}` +
    (entree.actif === false ? " · désactivée : son code n'ouvre plus rien côté élève" : "")));
  entete.appendChild(titres);
  vue.appendChild(entete);

  if (evaluation.consignes) {
    const consignes = elem("div", "question");
    consignes.dataset.document = "1";
    const corps = elem("div", "question-corps");
    corps.appendChild(elem("h2", null, "Consignes affichées à l'élève"));
    const contenu = elem("div");
    contenu.innerHTML = evaluation.consignes;
    corps.appendChild(contenu);
    consignes.appendChild(corps);
    vue.appendChild(consignes);
  }

  for (const q of questions) {
    vue.appendChild(construireQuestion(q, numerotees.indexOf(q) + 1));
  }
  window.scrollTo(0, 0);
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
  titres.appendChild(elem("p", "question-meta",
    [LIBELLE_TYPE[q.type], q.points != null ? points(q.points) : null, `id ${q.id}`]
      .filter(Boolean).join(" · ")));
  entete.appendChild(titres);
  bloc.appendChild(entete);

  const corps = elem("div", "question-corps");
  const enonce = elem("div", "enonce");
  enonce.innerHTML = q.enonce || "";
  corps.appendChild(enonce);

  if (q.type === "code") {
    corps.appendChild(elem("p", "discret", `Code de départ — ${q.nomFichier || "programme.py"}`));
    corps.appendChild(elem("pre", "code-eleve", q.depart?.trim() ? q.depart : "(éditeur vide)"));
  }

  if (q.type === "qcm") {
    const liste = elem("div", "qcm");
    if (q.multiple === true) liste.appendChild(elem("p", "qcm-consigne", "Plusieurs réponses possibles."));
    q.options.forEach((option, i) => {
      const ligne = elem("div", "qcm-option");
      ligne.appendChild(elem("span", "puce", String.fromCharCode(65 + i)));
      const texte = elem("span");
      texte.innerHTML = option.texte;
      ligne.appendChild(texte);
      liste.appendChild(ligne);
    });
    corps.appendChild(liste);
  }

  if (q.type === "texte") {
    const zone = elem("textarea", "reponse-texte");
    zone.rows = q.lignes || 4;
    zone.placeholder = q.placeholder || "Ta réponse…";
    zone.disabled = true;
    corps.appendChild(zone);
  }

  bloc.appendChild(corps);
  return bloc;
}

/* ========================================================== Libérer ce poste */

function lireRendus() {
  try {
    const lu = JSON.parse(localStorage.getItem(RENDUS) || "{}");
    return lu && typeof lu === "object" ? lu : {};
  } catch {
    return {};
  }
}

function construirePoste() {
  const cadre = elem("div", "accueil");
  cadre.appendChild(elem("h2", null, "Libérer ce poste"));
  cadre.appendChild(elem("p", "discret",
    "Une évaluation ne se passe qu'une fois par navigateur. Pour qu'un autre élève " +
    "la passe sur ce poste, ou pour refaire un essai, efface sa trace ici. " +
    "À faire depuis le navigateur concerné."));

  const liste = elem("div");
  cadre.appendChild(liste);

  const remplir = () => {
    liste.innerHTML = "";
    const rendus = lireRendus();
    const cles = Object.keys(rendus);
    if (!cles.length) {
      liste.appendChild(elem("p", null, "Aucune évaluation rendue depuis ce navigateur."));
      return;
    }
    for (const cle of cles) {
      const r = rendus[cle] || {};
      const titre = EVALUATIONS.find((e) => e.cle === cle)?.titre || cle;
      const quand = r.a ? new Date(r.a).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "?";
      const qui = `${(r.nom || "").toUpperCase()} ${r.prenom || ""}`.trim() || "élève inconnu";

      const ligne = elem("div", "ligne-poste");
      ligne.appendChild(elem("span", null, `${titre} — ${qui}, le ${quand}`));
      const btn = elem("button", "bouton fantome petit", "Effacer");
      btn.type = "button";
      btn.addEventListener("click", () => {
        if (!confirm(`Effacer la trace de « ${titre} » ? Ce poste pourra la repasser.`)) return;
        const courant = lireRendus();
        delete courant[cle];
        try { localStorage.setItem(RENDUS, JSON.stringify(courant)); } catch { /* stockage bloqué */ }
        toast("Poste libéré pour cette évaluation");
        remplir();
      });
      ligne.appendChild(btn);
      liste.appendChild(ligne);
    }
  };
  remplir();
  return cadre;
}

/* ======================================================================= Boot */

function initTheme() {
  const choix = localStorage.getItem("parcours:theme") || "auto";
  if (choix !== "auto") document.documentElement.dataset.theme = choix;
}

initTheme();
rendreCode();
