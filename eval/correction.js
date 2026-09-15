/* Évaluations — la table de correction.
 *
 * Une page pour l'enseignant : on y dépose un barème et les rendus des élèves,
 * elle exécute les programmes, applique les critères, et rend des notes.
 *
 * Elle est publiée avec le site, et c'est sans conséquence : elle ne contient
 * aucun barème. Elle ne sait rien tant qu'on ne lui a rien donné, et ce qu'on
 * lui donne ne quitte pas le navigateur — il n'y a pas de serveur derrière.
 *
 * Ce qui est corrigé à la main est mémorisé dans ce navigateur, par évaluation
 * et par élève : fermer l'onglet au milieu d'un paquet de copies ne perd rien.
 */

import { creerPython, executerAvecSaisies } from "../parcours/atelier.js";
import { telecharger, creerZip, nomDeRendu } from "../parcours/archive.js";
import { estUnRendu, nomAffiche, scelleIntact, duree } from "./rendu.js";
import { construireCopie, pointsRetenus, totalRetenu, noteCalculee, noteRetenue }
  from "./copie-corrigee.js";
import { estUnBareme, noter, alertes } from "./bareme.js";

const URL_WORKER = new URL("../javascripts/pyodide-worker.js", document.baseURI).href;
const Python = creerPython(URL_WORKER);

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

/* ======================================================================== État */

let bareme = null;
const copies = [];          // { rendu, intact, note, alertes, retouches }
let ouverte = null;         // la copie dépliée

/* Les retouches de l'enseignant, par évaluation et par élève. Ce sont elles qui
   font foi : l'auto-correction propose, l'enseignant tranche. */
function cleRetouches() {
  return `correction:${bareme?.evaluation || "sans-bareme"}`;
}
function lireRetouches() {
  try { return JSON.parse(localStorage.getItem(cleRetouches()) || "{}"); } catch { return {}; }
}
function ecrireRetouches(tout) {
  try { localStorage.setItem(cleRetouches(), JSON.stringify(tout)); } catch { /* stockage bloqué */ }
}
function identifiant(rendu) {
  return `${(rendu.eleve?.nom || "").trim().toUpperCase()}|${(rendu.eleve?.prenom || "").trim()}`;
}
function retouchesDe(rendu) {
  return lireRetouches()[identifiant(rendu)] || { questions: {}, commentaire: "" };
}
function enregistrerRetouches(rendu, valeur) {
  const tout = lireRetouches();
  tout[identifiant(rendu)] = valeur;
  ecrireRetouches(tout);
}

/* Les quatre calculs qui appliquent les retouches vivent dans
   ./copie-corrigee.js — la copie rendue à l'élève doit porter exactement les
   mêmes nombres que cette table. On les enveloppe ici pour ne pas répéter le
   barème et les retouches à chaque appel. */
const points = (copie, q) => pointsRetenus(copie.retouches, q);
const total = (copie) => totalRetenu(copie.retouches, copie.note);
const calculee = (copie) => noteCalculee(copie.retouches, copie.note, bareme);
const finale = (copie) => noteRetenue(copie.retouches, copie.note, bareme);

/* ================================================================= Interpréteur

   Le programme d'un élève tourne ici comme il tournait chez lui : même worker,
   même version de Python. Les input() sont alimentés par les `saisies` du
   critère — personne n'est là pour taper au clavier. Une fois épuisées, on
   répond par du vide plutôt que de bloquer la correction du paquet entier. */

async function executer(code, { tests, saisies }) {
  const file = [...(saisies || [])];
  return executerAvecSaisies(Python, code, {
    tests,
    reclamerSaisie: async () => (file.length ? file.shift() : ""),
    maxSaisies: 80,
  });
}

/* ==================================================================== Dépôts */

function lireFichiers(fichiers) {
  return Promise.all([...fichiers].map(async (f) => {
    try { return { nom: f.name, objet: JSON.parse(await f.text()) }; }
    catch { return { nom: f.name, objet: null }; }
  }));
}

async function accueillir(fichiers) {
  const lus = await lireFichiers(fichiers);
  const nouveaux = [];

  for (const { nom, objet } of lus) {
    if (!objet) { toast(`${nom} n'est pas un fichier .json lisible`); continue; }

    if (estUnBareme(objet)) { poserBareme(objet); continue; }

    if (!estUnRendu(objet)) { toast(`${nom} n'est ni un rendu ni un barème`); continue; }
    nouveaux.push(objet);
  }

  if (nouveaux.length) await ajouterRendus(nouveaux);
  rendre();
}

function poserBareme(objet) {
  bareme = objet;
  $("#etat-bareme").textContent =
    `${objet.titre || objet.evaluation} — ${Object.keys(objet.questions).length} questions, ` +
    `note sur ${objet.noteSur ?? "le total des points"}`;
  $("#etat-bareme").dataset.charge = "1";
  toast("Barème chargé");
  // Les copies déjà déposées attendaient peut-être ce barème.
  if (copies.length) recorrigerTout();
}

async function ajouterRendus(rendus) {
  for (const rendu of rendus) {
    if (bareme && rendu.evaluation?.cle && bareme.evaluation &&
        rendu.evaluation.cle !== bareme.evaluation) {
      toast(`${nomAffiche(rendu)} : ce rendu n'est pas celui de ce barème`);
      continue;
    }
    /* Un même élève déposé deux fois remplace sa copie : on corrige un paquet,
       pas un historique. */
    const rang = copies.findIndex((c) => identifiant(c.rendu) === identifiant(rendu));
    const copie = { rendu, intact: await scelleIntact(rendu), note: null,
                    alertes: [], retouches: retouchesDe(rendu) };
    if (rang >= 0) copies[rang] = copie; else copies.push(copie);
  }
  copies.sort((a, b) => nomAffiche(a.rendu).localeCompare(nomAffiche(b.rendu), "fr"));
  await recorrigerTout();
}

async function recorrigerTout() {
  if (!bareme) return;
  const barre = $("#avancement");
  barre.hidden = false;
  let faites = 0;

  for (const copie of copies) {
    barre.textContent = `Correction… ${++faites} / ${copies.length}`;
    copie.note = await noter(copie.rendu, bareme, executer);
    copie.alertes = alertes(copie.rendu, copie.intact);
    copie.retouches = retouchesDe(copie.rendu);
    rendre();                      // la table se remplit au fil de l'eau
  }
  barre.hidden = true;
}

/* ===================================================================== Table */

function rendre() {
  const hote = $("#table");
  hote.innerHTML = "";

  if (!copies.length) {
    $("#vide").hidden = false;
    $("#barre-outils").hidden = true;
    return;
  }
  $("#vide").hidden = true;
  $("#barre-outils").hidden = false;
  $("#compte").textContent = `${copies.length} copie${copies.length > 1 ? "s" : ""}`;

  const table = elem("table", "table-notes");
  const entete = elem("tr");
  entete.append(elem("th", null, "Élève"), elem("th", null, "Classe"));
  const questions = copies.find((c) => c.note)?.note.questions || [];
  for (const q of questions) {
    const th = elem("th", "col-question", q.titre || q.id);
    th.title = `${q.max} points`;
    entete.appendChild(th);
  }
  entete.append(elem("th", null, "Total"), elem("th", null, "Note"), elem("th", null, ""));
  table.appendChild(entete);

  for (const copie of copies) {
    table.appendChild(ligne(copie, questions));
    if (ouverte === copie) table.appendChild(detail(copie));
  }
  hote.appendChild(table);
}

function ligne(copie, questions) {
  const tr = elem("tr", "ligne-eleve");
  if (ouverte === copie) tr.dataset.ouverte = "1";

  const nom = elem("td", "cellule-nom");
  nom.appendChild(elem("strong", null, nomAffiche(copie.rendu)));
  for (const a of copie.alertes) {
    const puce = elem("span", "alerte-puce", "!");
    puce.dataset.gravite = a.gravite;
    puce.title = a.texte;
    nom.appendChild(puce);
  }
  tr.appendChild(nom);
  tr.appendChild(elem("td", null, copie.rendu.eleve?.classe || "—"));

  if (!copie.note) {
    const attente = elem("td", null, "…");
    attente.colSpan = questions.length + 3;
    tr.appendChild(attente);
    return tr;
  }

  for (const q of copie.note.questions) {
    const td = elem("td", "cellule-points");
    const retouchee = copie.retouches.questions?.[q.id] != null &&
                      copie.retouches.questions[q.id] !== "";
    td.textContent = `${arrondi(points(copie, q))} / ${q.max}`;
    if (q.manuel && !retouchee) td.dataset.arelire = "1";
    if (retouchee) td.dataset.retouchee = "1";
    tr.appendChild(td);
  }

  tr.appendChild(elem("td", "cellule-points", `${arrondi(total(copie))} / ${copie.note.max}`));
  const note = elem("td", "cellule-note", `${arrondi(finale(copie))}`);
  note.title = `sur ${bareme.noteSur ?? copie.note.max}`;
  if (copie.retouches.note != null && copie.retouches.note !== "") note.dataset.retouchee = "1";
  tr.appendChild(note);

  const actions = elem("td");
  const btn = elem("button", "bouton fantome petit", ouverte === copie ? "Fermer" : "Voir");
  btn.type = "button";
  btn.addEventListener("click", () => { ouverte = ouverte === copie ? null : copie; rendre(); });
  actions.appendChild(btn);
  tr.appendChild(actions);

  return tr;
}

const arrondi = (n) => (Math.round(n * 100) / 100).toString().replace(".", ",");

/* --------------------------------------------------------------- Une copie */

function detail(copie) {
  const tr = elem("tr", "ligne-detail");
  const td = elem("td");
  td.colSpan = (copie.note?.questions.length || 0) + 5;

  const boite = elem("div", "detail");

  const chapeau = elem("div", "detail-chapeau");
  const c = copie.rendu.chrono || {};
  chapeau.innerHTML = `
    <span>${new Date(c.debut).toLocaleString("fr-FR")}</span>
    <span>${duree(c.tempsUtiliseS)} utilisées</span>
    <span>${c.cause === "temps" ? "rendu par le chronomètre" : "rendu par l'élève"}</span>`;
  boite.appendChild(chapeau);

  if (copie.alertes.length) {
    const zone = elem("div", "alertes");
    for (const a of copie.alertes) {
      const l = elem("p", "alerte-ligne", a.texte);
      l.dataset.gravite = a.gravite;
      zone.appendChild(l);
    }
    boite.appendChild(zone);
  }

  for (const q of copie.note.questions) boite.appendChild(bloc(copie, q));

  boite.appendChild(bilan(copie));

  td.appendChild(boite);
  tr.appendChild(td);
  return tr;
}

/* Le pied d'une copie : la note globale et l'appréciation. Les deux partent dans
   le CSV et dans la copie rendue à l'élève. */
function bilan(copie) {
  const boite = elem("div", "bilan");

  const ligneNote = elem("div", "bilan-note");
  ligneNote.appendChild(elem("label", null, "Note finale"));
  const champ = elem("input");
  champ.type = "number";
  champ.min = "0";
  champ.max = String(bareme.noteSur ?? copie.note.max);
  champ.step = String(bareme.arrondi ?? 0.25);
  champ.value = copie.retouches.note ?? "";
  champ.addEventListener("input", () => {
    copie.retouches.note = champ.value;
    enregistrerRetouches(copie.rendu, copie.retouches);
    rafraichirTotaux(copie);
  });
  ligneNote.append(champ, elem("span", "sur", `/ ${bareme.noteSur ?? copie.note.max}`));
  const rappel = elem("span", "calculee");
  ligneNote.appendChild(rappel);
  boite.appendChild(ligneNote);

  /* Le champ de la note finale montre en filigrane ce que propose le barème :
     il doit donc suivre les points qu'on vient de changer plus haut. */
  boite.rafraichir = () => {
    const propose = arrondi(calculee(copie));
    champ.placeholder = propose;
    rappel.textContent = `barème : ${propose} / ${bareme.noteSur ?? copie.note.max}`;
  };
  boite.rafraichir();

  const mot = elem("div", "champ");
  mot.appendChild(elem("span", "etiquette", "Appréciation générale"));
  const zone = elem("textarea", "commentaire");
  zone.rows = 3;
  zone.placeholder = "Lue par l'élève sur sa copie corrigée.";
  zone.value = copie.retouches.commentaire || "";
  zone.addEventListener("input", () => {
    copie.retouches.commentaire = zone.value;
    enregistrerRetouches(copie.rendu, copie.retouches);
  });
  mot.appendChild(zone);
  boite.appendChild(mot);

  const actions = elem("div", "bilan-actions");
  const btn = elem("button", "bouton fantome petit", "Exporter cette copie corrigée");
  btn.type = "button";
  btn.addEventListener("click", () => {
    telecharger(new Blob([JSON.stringify(copieDe(copie), null, 2)],
                         { type: "application/json" }), nomFichierCopie(copie));
    toast("Copie exportée");
  });
  actions.appendChild(btn);
  boite.appendChild(actions);

  return boite;
}

function bloc(copie, q) {
  const boite = elem("section", "question-corrigee");

  const entete = elem("header");
  entete.appendChild(elem("h3", null, q.titre || q.id));
  const champ = elem("div", "note-manuelle");
  champ.appendChild(elem("label", null, "Points"));
  const input = elem("input");
  input.type = "number";
  input.min = "0";
  input.max = String(q.max);
  input.step = "0.25";
  input.placeholder = String(arrondi(q.points));
  input.value = copie.retouches.questions?.[q.id] ?? "";
  input.addEventListener("input", () => {
    copie.retouches.questions ||= {};
    copie.retouches.questions[q.id] = input.value;
    enregistrerRetouches(copie.rendu, copie.retouches);
    rafraichirTotaux(copie);
  });
  champ.append(input, elem("span", "sur", `/ ${q.max}`));
  entete.appendChild(champ);
  boite.appendChild(entete);

  /* La réponse de l'élève, telle quelle. C'est elle qu'on corrige — les critères
     ne sont qu'un avis. */
  const reponse = q.reponse || {};
  if (q.type === "code") {
    const pre = elem("pre", "code-eleve");
    pre.appendChild(elem("code", null, reponse.code || "(rien)"));
    boite.appendChild(pre);
  } else if (q.type === "texte") {
    boite.appendChild(elem("blockquote", "texte-eleve", reponse.texte || "(rien)"));
  } else if (q.type === "qcm") {
    const choix = Array.isArray(reponse.choix) ? reponse.choix : [reponse.choix];
    boite.appendChild(elem("p", "choix-eleve",
      "Réponse : " + (choix.filter((i) => i != null)
        .map((i) => String.fromCharCode(65 + i)).join(", ") || "aucune")));
  }

  /* Une question rédigée n'a aucun critère : le barème ne prétend pas la juger.
     Plutôt qu'une liste vide, on dit ce qu'on attend de l'enseignant. */
  if (!q.criteres?.length) {
    const consigne = elem("p", "a-noter",
      q.vide ? "Pas de réponse — à noter à la main."
             : "Réponse rédigée : à noter à la main.");
    boite.appendChild(consigne);
  }

  const liste = elem("ul", "criteres");
  for (const critere of q.criteres || []) {
    const li = elem("li");
    li.dataset.ok = critere.ok === true ? "1" : critere.ok === false ? "0" : "";
    li.appendChild(elem("span", "critere-points", `${arrondi(critere.points)}/${critere.max}`));
    const texte = elem("span");
    texte.textContent = critere.libelle;
    if (critere.detail) texte.appendChild(elem("span", "critere-detail", ` — ${critere.detail}`));
    li.appendChild(texte);
    liste.appendChild(li);
  }
  boite.appendChild(liste);

  /* L'annotation de l'exercice. C'est elle qui fait la différence entre une note
     et une correction : l'élève doit lire pourquoi il a perdu ces points-là. */
  const annotation = elem("input", "annotation");
  annotation.type = "text";
  annotation.placeholder = "Annotation pour l'élève (facultative)";
  annotation.value = copie.retouches.annotations?.[q.id] || "";
  annotation.addEventListener("input", () => {
    copie.retouches.annotations ||= {};
    copie.retouches.annotations[q.id] = annotation.value;
    enregistrerRetouches(copie.rendu, copie.retouches);
  });
  boite.appendChild(annotation);

  return boite;
}

/* Changer les points d'un exercice change le total, la note, et le filigrane du
   champ de note finale. Rien de tout cela ne doit replier la copie ouverte : on
   redessine la ligne de l'élève et le pied de sa copie, pas la table. */
function rafraichirTotaux(copie) {
  const tr = $(`.ligne-eleve[data-ouverte="1"]`);
  if (tr) {
    const neuve = ligne(copie, copie.note.questions);
    neuve.dataset.ouverte = "1";
    tr.replaceWith(neuve);
  }
  const bilan = $(".ligne-detail .bilan");
  if (bilan?.rafraichir) bilan.rafraichir();
}

/* ============================================================ Copie corrigée

   Ce que l'élève reçoit en retour, et qu'il ouvrira dans eval/copie.html.
   Le fichier est fabriqué par ./copie-corrigee.js : ici on ne fait que lui
   tendre les quatre morceaux qu'il assemble. */
const copieDe = (copie) => construireCopie({
  rendu: copie.rendu, note: copie.note, retouches: copie.retouches, bareme,
});

function nomFichierCopie(copie) {
  const nom = nomDeRendu(copie.rendu.eleve?.nom, copie.rendu.eleve?.prenom) || "eleve";
  return `copie-${bareme.evaluation || "evaluation"}-${nom}.json`;
}

/* Trente copies font trente téléchargements : le navigateur les refuserait.
   Une archive, et le paquet part d'un bloc — prête à être déposée sur l'ENT. */
function exporterCopies() {
  if (!bareme) { toast("Dépose d'abord le barème"); return; }
  const fichiers = {};
  for (const copie of copies) {
    if (!copie.note) continue;
    fichiers[nomFichierCopie(copie)] = JSON.stringify(copieDe(copie), null, 2);
  }
  if (!Object.keys(fichiers).length) { toast("Aucune copie corrigée à exporter"); return; }
  telecharger(creerZip(fichiers), `copies-corrigees-${bareme.evaluation || "evaluation"}.zip`);
  toast(`${Object.keys(fichiers).length} copies exportées`);
}

/* ==================================================================== Export */

function exporterCsv() {
  // Des copies peuvent avoir été déposées avant le barème : il n'y a alors
  // aucune note à exporter, et rien qui dise sur combien elles seraient notées.
  if (!bareme) { toast("Dépose d'abord le barème"); return; }
  const questions = copies.find((c) => c.note)?.note.questions || [];
  const lignes = [
    ["Nom", "Prénom", "Classe", ...questions.map((q) => q.titre || q.id),
     "Total", `Note sur ${bareme.noteSur ?? ""}`, "Appréciation"],
  ];
  for (const copie of copies) {
    if (!copie.note) continue;
    lignes.push([
      copie.rendu.eleve?.nom || "",
      copie.rendu.eleve?.prenom || "",
      copie.rendu.eleve?.classe || "",
      ...copie.note.questions.map((q) => arrondi(points(copie, q))),
      arrondi(total(copie)),
      arrondi(finale(copie)),
      (copie.retouches.commentaire || "").replace(/\s+/g, " "),
    ]);
  }

  /* Point-virgule et BOM : c'est ce qu'attend un tableur français, et sans le
     BOM les accents arrivent en charabia dans Excel. */
  const csv = "﻿" + lignes
    .map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";"))
    .join("\r\n");

  telecharger(new Blob([csv], { type: "text/csv;charset=utf-8" }),
              `notes-${bareme.evaluation || "evaluation"}.csv`);
  toast("Notes exportées");
}

/* ====================================================================== Boot */

function initDepots() {
  const zone = $("#zone-depot");
  const champ = $("#champ-fichiers");

  champ.addEventListener("change", (ev) => {
    /* Copier la liste AVANT de vider le champ : `files` est une vue vivante sur
       la sélection, et la remettre à zéro — ce qui permet de redéposer le même
       fichier — la viderait aussi. Le glisser-déposer, lui, n'a jamais eu ce
       problème : sa FileList ne dépend d'aucun champ. */
    const fichiers = [...ev.target.files];
    ev.target.value = "";
    accueillir(fichiers);
  });

  for (const evenement of ["dragenter", "dragover"]) {
    document.addEventListener(evenement, (ev) => {
      if (![...(ev.dataTransfer?.types || [])].includes("Files")) return;
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "copy";
      zone.dataset.survol = "1";
    });
  }
  document.addEventListener("dragleave", (ev) => {
    if (!ev.relatedTarget) zone.dataset.survol = "";
  });
  document.addEventListener("drop", (ev) => {
    if (![...(ev.dataTransfer?.types || [])].includes("Files")) return;
    ev.preventDefault();
    zone.dataset.survol = "";
    accueillir(ev.dataTransfer.files);
  });
}

$("#btn-csv").addEventListener("click", exporterCsv);
$("#btn-copies").addEventListener("click", exporterCopies);
$("#btn-vider").addEventListener("click", () => {
  if (!confirm("Retirer toutes les copies de cette page ? Les notes corrigées à la main sont conservées.")) return;
  copies.length = 0;
  ouverte = null;
  rendre();
});

initDepots();
rendre();
Python.prechauffer();
