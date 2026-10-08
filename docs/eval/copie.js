/* Évaluations — la copie corrigée, côté élève.
 *
 * Une page qui ne fait que lire. L'élève y entre son code de consultation —
 * la copie corrigée vient alors de Supabase (./supabase.js) — ou y dépose le
 * fichier que son professeur lui a rendu. Il voit sa copie : ses réponses, ses
 * points question par question, les annotations, la note et l'appréciation, et
 * peut la télécharger en PDF (./copie-pdf.js).
 *
 * Rien n'y est modifiable, rien n'y est enregistré. Un fichier déposé ne quitte
 * pas le navigateur ; un code n'ouvre qu'une copie déjà corrigée et publiée.
 */

import { estUneCopie } from "./copie-corrigee.js";
import { lireCopie } from "./supabase.js";
import { telechargerPdf } from "./copie-pdf.js";

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
  minuteurToast = setTimeout(() => { boite.dataset.visible = ""; }, 3000);
}

const nombre = (n) => (Math.round(n * 100) / 100).toString().replace(".", ",");
const lettre = (i) => String.fromCharCode(65 + i);

/* Les énoncés et les propositions sont du HTML, venu du sujet. La copie, elle,
   arrive d'une base où n'importe qui peut déposer : on n'en garde que les
   balises de mise en forme, sans aucun attribut sinon la classe. */
const BALISES = new Set(["P", "PRE", "CODE", "STRONG", "EM", "B", "I", "U", "UL", "OL", "LI",
  "BR", "SPAN", "SUB", "SUP", "KBD", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD",
  "H3", "H4"]);

function html(source) {
  const doc = new DOMParser().parseFromString(`<div>${source || ""}</div>`, "text/html");
  const nettoyer = (noeud) => {
    for (const n of [...noeud.childNodes]) {
      if (n.nodeType === Node.TEXT_NODE) continue;
      if (n.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "STYLE", "TEMPLATE"].includes(n.tagName)) {
        n.remove(); continue;
      }
      nettoyer(n);
      if (!BALISES.has(n.tagName)) { n.replaceWith(...n.childNodes); continue; }
      for (const a of [...n.attributes]) if (a.name !== "class") n.removeAttribute(a.name);
    }
  };
  const racine = doc.body.firstElementChild;
  nettoyer(racine);
  const fragment = document.createDocumentFragment();
  fragment.append(...racine.childNodes);
  return fragment;
}

/* ==================================================================== Lecture */

async function ouvrir(fichier) {
  if (!fichier) return;
  let objet;
  try { objet = JSON.parse(await fichier.text()); }
  catch { toast("Ce fichier n'est pas lisible"); return; }

  if (!estUneCopie(objet)) {
    // L'erreur la plus probable : le devoir rendu, au lieu de la copie corrigée.
    toast(String(objet?.format || "").startsWith("evaluation/")
      ? "Ceci est ton devoir, pas ta copie corrigée"
      : "Ce fichier n'est pas une copie corrigée");
    return;
  }
  afficher(objet);
}

/* Le code se tape comme on veut : minuscules, espaces au lieu des tirets. C'est
   la base qui le ramène à sa forme (tools/evaluations/supabase.sql). */
async function ouvrirParCode(code) {
  const alerte = $("#alerte-code");
  alerte.hidden = true;
  const bouton = $("#form-code button");
  bouton.disabled = true;
  try {
    const rep = await lireCopie(code);
    if (rep?.etat === "corrigee" && estUneCopie(rep.copie)) { afficher(rep.copie); return; }
    alerte.textContent = rep?.etat === "en-attente"
      ? "Ta copie est bien arrivée, mais elle n'est pas encore corrigée. Reviens plus tard."
      : "Ce code ne correspond à aucune copie. Vérifie-le : trois mots et un nombre.";
  } catch (e) {
    alerte.textContent = `Impossible de joindre le serveur (${e.message}). Réessaie dans un instant.`;
  } finally {
    bouton.disabled = false;
  }
  alerte.hidden = false;
}

/* La copie s'affiche à côté de l'accueil, qu'on masque : « Retour » le fait
   réapparaître tel qu'il était, code saisi compris. Afficher une copie ajoute
   une entrée à l'historique, pour que le bouton « page précédente » du
   navigateur et « ← Retour » fassent la même chose. */
function afficher(copie) {
  document.body.dataset.phase = "copie";
  $(".accueil").hidden = true;
  $("#copie")?.remove();
  const vue = elem("div");
  vue.id = "copie";
  $("#vue").appendChild(vue);
  if (history.state?.copie !== true) history.pushState({ copie: true }, "");

  /* Le PDF est fabriqué dans la page et téléchargé directement : pas de fenêtre
     d'impression. Le premier clic charge la bibliothèque, d'où l'attente affichée. */
  const outils = elem("div", "outils-copie");
  const pdf = elem("button", "bouton", "Télécharger en PDF");
  pdf.type = "button";
  pdf.addEventListener("click", async () => {
    pdf.disabled = true;
    pdf.textContent = "Préparation du PDF…";
    try { await telechargerPdf(copie); }
    catch (e) { toast(`PDF impossible : ${e.message}`); }
    finally { pdf.disabled = false; pdf.textContent = "Télécharger en PDF"; }
  });
  outils.appendChild(pdf);
  vue.appendChild(outils);

  // L'appréciation d'abord, sous la note : c'est ce que l'élève lit en premier.
  vue.appendChild(entete(copie));
  if (copie.appreciation?.trim()) vue.appendChild(appreciation(copie));
  for (const q of copie.questions) vue.appendChild(question(q));

  window.scrollTo({ top: 0 });
}

function entete(copie) {
  const boite = elem("header", "copie-entete");

  const gauche = elem("div");
  gauche.appendChild(elem("p", "sur-titre", copie.evaluation?.titre || "Évaluation"));
  gauche.appendChild(elem("h1", null,
    `${(copie.eleve?.nom || "").toUpperCase()} ${copie.eleve?.prenom || ""}`.trim() || "Ta copie"));
  if (copie.corrigeLe) {
    gauche.appendChild(elem("p", "discret",
      `Corrigée le ${new Date(copie.corrigeLe).toLocaleDateString("fr-FR")}`));
  }
  boite.appendChild(gauche);

  const note = elem("div", "grande-note");
  note.appendChild(elem("span", "valeur", nombre(copie.note?.valeur ?? 0)));
  note.appendChild(elem("span", "sur", `/ ${nombre(copie.note?.sur ?? 20)}`));
  boite.appendChild(note);

  return boite;
}

function question(q) {
  const boite = elem("section", "question copie-question");

  const entete = elem("header", "question-entete");
  const titres = elem("div");
  titres.appendChild(elem("h2", null, q.titre || q.id));
  entete.appendChild(titres);

  /* Le rapport points / maximum colore le bandeau : c'est ce que l'élève cherche
     en premier, autant que ce soit lisible d'un coup d'œil. */
  const points = elem("div", "points-question");
  points.dataset.part = q.max
    ? (q.points >= q.max ? "tout" : q.points > 0 ? "partie" : "rien")
    : "";
  points.textContent = `${nombre(q.points)} / ${nombre(q.max)}`;
  entete.appendChild(points);
  boite.appendChild(entete);

  const corps = elem("div", "question-corps");

  if (q.enonce?.trim()) {
    const enonce = elem("div", "enonce copie-enonce");
    enonce.appendChild(html(q.enonce));
    corps.appendChild(enonce);
  }

  const reponse = q.reponse || {};
  const qcmDetaille = q.type === "qcm" && Array.isArray(q.options) && q.options.length > 0;
  if (q.type === "code") {
    if (q.enonce?.trim()) corps.appendChild(elem("p", "etiquette-reponse", "Ton programme"));
    const pre = elem("pre", "code-eleve");
    pre.appendChild(elem("code", null, reponse.code || "(pas de réponse)"));
    corps.appendChild(pre);
  } else if (q.type === "texte") {
    corps.appendChild(elem("blockquote", "texte-eleve", reponse.texte || "(pas de réponse)"));
  } else if (qcmDetaille) {
    corps.appendChild(propositions(q, reponse));
  } else if (q.type === "qcm") {
    const choix = Array.isArray(reponse.choix) ? reponse.choix : [reponse.choix];
    corps.appendChild(elem("p", "choix-eleve", "Ta réponse : " +
      (choix.filter((i) => i != null).map((i) => String.fromCharCode(65 + i)).join(", ")
       || "aucune")));
  }

  // Pour un QCM détaillé, les couleurs des propositions disent déjà tout ; le
  // critère ne reste que si le professeur l'a revu.
  const criteres = qcmDetaille ? (q.criteres || []).filter((c) => c.retouche) : q.criteres;
  if (criteres?.length) {
    const liste = elem("ul", "criteres");
    for (const c of criteres) {
      const li = elem("li");
      li.dataset.ok = c.ok === true ? "1" : c.ok === false ? "0" : c.retouche ? "partiel" : "";
      li.appendChild(elem("span", "critere-points", `${nombre(c.points)}/${nombre(c.max)}`));
      const libelle = elem("span", null, c.libelle);
      // Le professeur a renversé l'avis automatique : l'élève doit savoir que ce
      // verdict-là est le sien, pas celui de la machine.
      if (c.retouche) libelle.appendChild(elem("span", "critere-retouche", " — revu par ton professeur"));
      li.appendChild(libelle);
      liste.appendChild(li);
    }
    corps.appendChild(liste);
  }

  if (q.annotation?.trim()) {
    const mot = elem("p", "annotation-prof");
    mot.textContent = q.annotation;
    corps.appendChild(mot);
  }

  boite.appendChild(corps);
  return boite;
}

/* Toutes les propositions : en vert les bonnes réponses, en rouge celles que
   l'élève a cochées à tort. Ses choix portent la mention « ta réponse ». */
function propositions(q, reponse) {
  const coches = new Set((Array.isArray(reponse.choix) ? reponse.choix : [reponse.choix])
    .filter((i) => typeof i === "number"));
  const bonnes = new Set(Array.isArray(q.correct) ? q.correct
    : typeof q.correct === "number" ? [q.correct] : []);

  const bloc = elem("div");
  if (!coches.size) bloc.appendChild(elem("p", "qcm-consigne", "Tu n'as pas répondu."));
  const liste = elem("div", "qcm qcm-corrige");
  q.options.forEach((texte, i) => {
    const option = elem("div", "qcm-option");
    if (bonnes.has(i)) option.dataset.issue = "juste";
    else if (coches.has(i)) option.dataset.issue = "faux";
    option.appendChild(elem("span", "puce", lettre(i)));
    const contenu = elem("span", "qcm-texte");
    contenu.appendChild(html(texte));
    option.appendChild(contenu);
    if (coches.has(i)) option.appendChild(elem("span", "ta-reponse", "ta réponse"));
    liste.appendChild(option);
  });
  bloc.appendChild(liste);
  return bloc;
}

function appreciation(copie) {
  const boite = elem("section", "appreciation");
  boite.appendChild(elem("h2", null, "Appréciation"));
  boite.appendChild(elem("p", null, copie.appreciation));
  return boite;
}

/* ===================================================================== Dépôt */

function initDepot() {
  const zone = $("#zone-depot");
  const champ = $("#champ-fichier");

  champ.addEventListener("change", (ev) => {
    const fichier = ev.target.files && ev.target.files[0];
    ev.target.value = "";
    ouvrir(fichier);
  });

  for (const evenement of ["dragenter", "dragover"]) {
    document.addEventListener(evenement, (ev) => {
      if (![...(ev.dataTransfer?.types || [])].includes("Files")) return;
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "copy";
      zone.dataset.survol = "1";
    });
  }
  document.addEventListener("dragleave", (ev) => { if (!ev.relatedTarget) zone.dataset.survol = ""; });
  document.addEventListener("drop", (ev) => {
    if (![...(ev.dataTransfer?.types || [])].includes("Files")) return;
    ev.preventDefault();
    zone.dataset.survol = "";
    ouvrir(ev.dataTransfer.files[0]);
  });
}

function initTheme() {
  const choix = localStorage.getItem("parcours:theme") || "auto";
  if (choix !== "auto") document.documentElement.dataset.theme = choix;
}

function fermerCopie() {
  $("#copie")?.remove();
  $(".accueil").hidden = false;
  document.body.dataset.phase = "";
  window.scrollTo({ top: 0 });
}

/* « ← Retour » : depuis une copie, revenir au code ; depuis l'accueil, à la
   page d'où l'on vient — ou au site, si l'on est arrivé directement ici. */
$("#btn-retour").addEventListener("click", (ev) => {
  ev.preventDefault();
  if ($("#copie")) { history.back(); return; }
  const depuisLeSite = document.referrer && new URL(document.referrer).origin === location.origin;
  if (depuisLeSite && history.length > 1) history.back();
  else location.href = $("#btn-retour").href;
});
window.addEventListener("popstate", () => { if ($("#copie")) fermerCopie(); });

initTheme();
initDepot();
$("#form-code").addEventListener("submit", (ev) => {
  ev.preventDefault();
  ouvrirParCode($("#champ-code").value);
});
