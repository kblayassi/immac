/* Évaluations — la copie corrigée, côté élève.
 *
 * Une page qui ne fait que lire. L'élève y dépose le fichier que son professeur
 * lui a rendu, et voit sa copie : ses réponses, ses points question par question,
 * les annotations, la note et l'appréciation.
 *
 * Rien n'y est modifiable, rien n'y est enregistré, rien n'en sort. Le fichier
 * ne quitte pas le navigateur — il est lu, affiché, et oublié dès qu'on ferme
 * l'onglet.
 */

import { estUneCopie } from "./copie-corrigee.js";

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

function afficher(copie) {
  document.body.dataset.phase = "copie";
  const vue = $("#vue");
  vue.innerHTML = "";

  vue.appendChild(entete(copie));
  for (const q of copie.questions) vue.appendChild(question(q));
  if (copie.appreciation?.trim()) vue.appendChild(appreciation(copie));

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

  const reponse = q.reponse || {};
  if (q.type === "code") {
    const pre = elem("pre", "code-eleve");
    pre.appendChild(elem("code", null, reponse.code || "(pas de réponse)"));
    corps.appendChild(pre);
  } else if (q.type === "texte") {
    corps.appendChild(elem("blockquote", "texte-eleve", reponse.texte || "(pas de réponse)"));
  } else if (q.type === "qcm") {
    const choix = Array.isArray(reponse.choix) ? reponse.choix : [reponse.choix];
    corps.appendChild(elem("p", "choix-eleve", "Ta réponse : " +
      (choix.filter((i) => i != null).map((i) => String.fromCharCode(65 + i)).join(", ")
       || "aucune")));
  }

  if (q.criteres?.length) {
    const liste = elem("ul", "criteres");
    for (const c of q.criteres) {
      const li = elem("li");
      li.dataset.ok = c.ok === true ? "1" : c.ok === false ? "0" : "";
      li.appendChild(elem("span", "critere-points", `${nombre(c.points)}/${nombre(c.max)}`));
      li.appendChild(elem("span", null, c.libelle));
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

initTheme();
initDepot();
