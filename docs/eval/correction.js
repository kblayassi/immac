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

import { creerPython, creerEditeur, executerAvecSaisies } from "../parcours/atelier.js";
import { telecharger, creerZip, nomDeRendu } from "../parcours/archive.js";
import { estUnRendu, nomAffiche, scelleIntact, duree } from "./rendu.js";
import { construireCopie, pointsRetenus, pointsProposes, criteresRetenus,
         totalRetenu, noteCalculee, noteRetenue, questionsANoter, noteComplete }
  from "./copie-corrigee.js";
import { estUnBareme, noter, alertes, ecartsDeVersion } from "./bareme.js";
import { EVALUATIONS } from "./evaluations.js";
import { correcteurConnecte, seConnecter, seDeconnecter, listerCopies, chargerCopies,
         publierCorrection, supprimerCopie } from "./supabase.js";

const URL_WORKER = new URL("../javascripts/pyodide-worker.js", document.baseURI).href;
const URL_BUNDLE = new URL("../javascripts/codemirror-bundle.js", document.baseURI).href;
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
const copies = [];          // { rendu, intact, note, alertes, retouches, distant }
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
  // Toute retouche d'une copie en ligne peut la rendre publiable, ou changer ce
  // que l'élève lit déjà : on (re)publie.
  const copie = copies.find((c) => c.rendu === rendu);
  if (copie) programmerPublication(copie);
}

/* Les quatre calculs qui appliquent les retouches vivent dans
   ./copie-corrigee.js — la copie rendue à l'élève doit porter exactement les
   mêmes nombres que cette table. On les enveloppe ici pour ne pas répéter le
   barème et les retouches à chaque appel. */
const points = (copie, q) => pointsRetenus(copie.retouches, q);
const total = (copie) => totalRetenu(copie.retouches, copie.note);
const calculee = (copie) => noteCalculee(copie.retouches, copie.note, bareme);
const finale = (copie) => noteRetenue(copie.retouches, copie.note, bareme);
const aNoter = (copie) => questionsANoter(copie.retouches, copie.note);
const complete = (copie) => noteComplete(copie.retouches, copie.note);
const enAttente = (copie) => {
  const n = aNoter(copie).length;
  return `${n} question${n > 1 ? "s" : ""} à noter à la main`;
};

/* ================================================================= Interpréteur

   Le programme d'un élève tourne ici comme il tournait chez lui : même worker,
   même version de Python. Les input() sont alimentés par les `saisies` du
   critère — personne n'est là pour taper au clavier. Une fois épuisées, on
   répond par du vide plutôt que de bloquer la correction du paquet entier.

   Un programme qui boucle sans fin est arrêté au bout de 15 s en tuant le
   worker : l'exécution suivante doit alors recharger Pyodide, et ce chargement
   se décomptait de SES 15 s. Pour peu qu'il soit lent, elle échouait à son tour,
   tuait le worker, et ainsi de suite : une seule boucle infinie (q13, 2 octobre
   2026) laissait le reste du paquet sans note. On attend donc que l'interpréteur
   soit prêt avant de lancer le chronomètre ; sur un worker chaud, c'est immédiat. */

async function executer(code, { tests, saisies }) {
  await Python.prechauffer();
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

function poserBareme(objet, { silencieux = false } = {}) {
  if (evalChoisie && objet.evaluation !== evalChoisie) {
    toast(`Ce barème est celui de « ${titreEvaluation(objet.evaluation)} », ` +
          `pas de « ${titreEvaluation(evalChoisie)} »`);
    return;
  }
  bareme = objet;
  rouvertes.delete("bareme");
  try { sessionStorage.setItem(BAREME_SESSION, JSON.stringify(objet)); } catch { /* bloqué */ }
  $("#etat-bareme").textContent =
    `${objet.titre || objet.evaluation} — ${Object.keys(objet.questions).length} questions, ` +
    `note sur ${objet.noteSur ?? "le total des points"}`;
  $("#etat-bareme").dataset.charge = "1";
  if (!silencieux) toast("Barème chargé");
  majEtapes();
  // Les copies déjà déposées attendaient peut-être ce barème.
  if (copies.length) recorrigerTout();
}

/* `distants`, en parallèle de `rendus` : pour une copie venue de Supabase, son
   identifiant et sa date de publication — de quoi y renvoyer la correction. */
async function ajouterRendus(rendus, distants = []) {
  for (const [rang0, rendu] of rendus.entries()) {
    if (bareme && rendu.evaluation?.cle && bareme.evaluation &&
        rendu.evaluation.cle !== bareme.evaluation) {
      toast(`${nomAffiche(rendu)} : ce rendu n'est pas celui de ce barème`);
      continue;
    }
    /* Un même élève déposé deux fois remplace sa copie : on corrige un paquet,
       pas un historique. */
    const rang = copies.findIndex((c) => identifiant(c.rendu) === identifiant(rendu));
    const copie = { rendu, intact: await scelleIntact(rendu), note: null,
                    alertes: [], retouches: retouchesDe(rendu), distant: distants[rang0] || null };
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
    copie.ecarts = ecartsDeVersion(copie.rendu, bareme);
    copie.alertes = [...alerteDeVersion(copie.ecarts), ...alertes(copie.rendu, copie.intact)];
    copie.retouches = retouchesDe(copie.rendu);
    rendre();                      // la table se remplit au fil de l'eau
  }
  barre.hidden = true;
  publierLesPretes();
}

/* Une copie faite sur une autre version du sujet : ses réponses sont rangées sous
   des numéros qui ne désignent plus les mêmes exercices. On le dit en tête de
   copie, et sur chaque exercice touché — ses points automatiques ne valent rien. */
function alerteDeVersion(ecarts) {
  if (!ecarts.length) return [];
  return [{
    gravite: "haute",
    texte: `Copie faite sur une autre version du sujet : ${ecarts.length} question(s) ne ` +
           `correspondent pas au barème (${ecarts.map((e) => e.id).join(", ")}). ` +
           `Leurs points automatiques ne valent rien — corrige-les à la main.`,
  }];
}

/* ===================================================================== Table */

function rendre() {
  const hote = $("#table");
  hote.innerHTML = "";

  if (!copies.length) {
    $("#zone-depot").dataset.attente = "";
    $("#etat-bareme").dataset.attente = "";
    $("#vide").hidden = false;
    $("#barre-outils").hidden = true;
    return;
  }
  $("#vide").hidden = true;
  $("#barre-outils").hidden = false;
  $("#compte").textContent = `${copies.length} copie${copies.length > 1 ? "s" : ""}`;

  /* Une colonne par question débordait de la page dès dix exercices, pour un
     détail qu'on lit mieux en dépliant la copie. La table dit l'essentiel : ce
     qui reste à corriger, le total, la note. */
  /* Sans barème, rien ne peut être noté : on le dit en tête, et les colonnes de
     la table restent floues — seuls les noms se lisent — tant qu'il manque. */
  const sansBareme = !bareme;
  $("#zone-depot").dataset.attente = sansBareme ? "1" : "";
  $("#etat-bareme").dataset.attente = sansBareme ? "1" : "";
  if (sansBareme) {
    const alerte = elem("div", "alerte-bareme");
    alerte.appendChild(elem("span", null,
      "Dépose le barème de cette évaluation pour lancer la correction."));
    const choisir = elem("button", "bouton petit", "Choisir le barème (.json)");
    choisir.type = "button";
    choisir.addEventListener("click", () => $("#champ-fichiers").click());
    alerte.appendChild(choisir);
    hote.appendChild(alerte);
  }

  const table = elem("table", "table-notes");
  if (sansBareme) table.classList.add("sans-bareme");
  const entete = elem("tr");
  entete.append(elem("th", null, "Élève"), elem("th", null, "Classe"),
                elem("th", null, "À corriger"), elem("th", null, "Total"),
                elem("th", null, "Note"), elem("th", null, "Publiée"), elem("th", null, ""));
  table.appendChild(entete);

  for (const copie of copies) {
    table.appendChild(ligne(copie));
    if (ouverte === copie) table.appendChild(detail(copie));
  }
  const cadre = elem("div", "cadre-table");
  cadre.appendChild(table);
  hote.appendChild(cadre);
}

const COLONNES = 7;

function ligne(copie) {
  const tr = elem("tr", "ligne-eleve");
  tr.dataset.cle = identifiant(copie.rendu);
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

  if (!copie.note && !bareme) {
    // Des cases factices, floutées par la feuille de style : la table garde sa
    // forme, et ce qui manque se voit.
    tr.append(elem("td", null, "à corriger"), elem("td", null, "— / —"),
              elem("td", null, "—"), cellulePubliee(copie));
    const actions = elem("td");
    const voir = elem("button", "bouton fantome petit", "Voir");
    voir.type = "button";
    voir.disabled = true;
    actions.appendChild(voir);
    tr.appendChild(actions);
    return tr;
  }
  if (!copie.note) {
    const attente = elem("td", null, "…");
    attente.colSpan = COLONNES - 2;
    tr.appendChild(attente);
    return tr;
  }

  // Ce qui reste à faire avant qu'une note existe : les réponses rédigées.
  const restantes = aNoter(copie);
  const etat = elem("td", "cellule-etat");
  if (restantes.length) {
    etat.textContent = enAttente(copie);
    etat.dataset.arelire = "1";
    etat.title = restantes.map((q) => q.titre || q.id).join(" · ");
  } else {
    etat.textContent = "✓ corrigée";
  }
  tr.appendChild(etat);

  const tot = elem("td", "cellule-points", `${arrondi(total(copie))} / ${copie.note.max}`);
  if (!complete(copie)) {
    tot.dataset.provisoire = "1";
    tot.title = "Provisoire : les réponses rédigées y comptent encore pour zéro.";
  }
  tr.appendChild(tot);

  const note = elem("td", "cellule-note");
  if (complete(copie)) {
    note.textContent = arrondi(finale(copie));
    note.title = `sur ${bareme.noteSur ?? copie.note.max}`;
    if (copie.retouches.note != null && copie.retouches.note !== "") note.dataset.retouchee = "1";
  } else {
    note.textContent = "—";
    note.title = `Pas de note tant qu'il reste ${enAttente(copie)}.`;
  }
  tr.appendChild(note);
  tr.appendChild(cellulePubliee(copie));

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
  td.colSpan = COLONNES;

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
  if (copie.distant && correcteurConnecte()) boite.appendChild(zoneSuppression(copie));

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
    const restantes = aNoter(copie);
    if (restantes.length && !complete(copie)) {
      champ.placeholder = "—";
      rappel.textContent = `en attente : ${enAttente(copie)} (${restantes.map((q) => q.titre || q.id).join(", ")})`;
      rappel.dataset.attente = "1";
    } else {
      const propose = arrondi(calculee(copie));
      champ.placeholder = propose;
      rappel.textContent = `barème : ${propose} / ${bareme.noteSur ?? copie.note.max}`;
      rappel.dataset.attente = "";
    }
    btn.disabled = !complete(copie);
    btn.title = complete(copie) ? "" : `Pas encore : il reste ${enAttente(copie)}.`;
  };
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

  boite.rafraichir();
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
  input.value = copie.retouches.questions?.[q.id] ?? "";
  /* En filigrane, ce que proposent les critères — verdicts retouchés compris.
     Un nombre tapé ici l'emporte sur eux. */
  const proposer = () => { input.placeholder = String(arrondi(pointsProposes(copie.retouches, q))); };
  proposer();
  input.addEventListener("input", () => {
    copie.retouches.questions ||= {};
    copie.retouches.questions[q.id] = input.value;
    enregistrerRetouches(copie.rendu, copie.retouches);
    rafraichirTotaux(copie);
  });
  champ.append(input, elem("span", "sur", `/ ${q.max}`));
  entete.appendChild(champ);
  boite.appendChild(entete);

  /* La réponse a été donnée à un autre exercice que celui-ci : le dire avant
     tout, les critères qui suivent ne la concernent pas. */
  const ecart = copie.ecarts?.find((e) => e.id === q.id);
  if (ecart) {
    boite.appendChild(elem("p", "ecart-version", ecart.copie
      ? `Dans la version passée par l'élève, cette question était « ${ecart.copie} » : ` +
        `sa réponse ne correspond pas aux critères ci-dessous.`
      : `Cette question n'existait pas dans la version passée par l'élève.`));
  }

  /* Les collages faits dans cet exercice, d'après le journal : quand et combien
     de caractères. Le texte collé n'est pas enregistré — c'est dans le code
     ci-dessous qu'on le cherche. Au-delà de 40 caractères, en rouge. */
  const colles = (copie.rendu.journal || []).filter((e) => e.e === "colle" && e.q === q.id && e.n > 0);
  if (colles.length) {
    const ligneColles = elem("p", "collages",
      `Collage${colles.length > 1 ? "s" : ""} : ` +
      colles.map((e) => `${e.n} car. à ${duree(e.t)}`).join(" · "));
    if (colles.some((e) => e.n > 40)) ligneColles.dataset.gros = "1";
    boite.appendChild(ligneColles);
  }

  /* La réponse de l'élève, telle quelle. C'est elle qu'on corrige — les critères
     ne sont qu'un avis. */
  const reponse = q.reponse || {};
  if (q.type === "code") {
    boite.appendChild(atelierDeCorrection(reponse.code || ""));
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
      q.vide ? "Pas de réponse : 0 point, sauf si tu en décides autrement."
             : "Réponse rédigée : à noter à la main.");
    boite.appendChild(consigne);
  }

  /* Les critères : l'avis du barème, que l'enseignant peut corriger de deux
     façons. Les boutons − et + déplacent les points d'un quart de point, entre 0
     et le maximum du critère ; un clic sur l'intitulé le déclare entièrement
     rempli ou manqué. Chaque changement se répercute sur l'exercice, le total et
     la note ; revenir à la valeur du barème efface la retouche. */
  const PAS = 0.25;
  const liste = elem("ul", "criteres criteres-bascules");

  const apresChangement = () => {
    /* Toucher un critère, c'est laisser les critères décider des points : un
       nombre tapé plus tôt dans « Points » les masquerait, on le retire. */
    if (copie.retouches.questions?.[q.id] != null && copie.retouches.questions[q.id] !== "") {
      delete copie.retouches.questions[q.id];
      input.value = "";
      toast("Points de l'exercice recalculés d'après les critères");
    }
    enregistrerRetouches(copie.rendu, copie.retouches);
    peindre();
    proposer();
    rafraichirTotaux(copie);
  };

  // Poser un verdict, ou l'effacer quand il redit ce que disait le barème.
  const poser = (rang, verdict) => {
    const auto = q.criteres[rang];
    copie.retouches.criteres ||= {};
    const verdicts = (copie.retouches.criteres[q.id] ||= {});
    const points = typeof verdict === "boolean" ? (verdict ? auto.max : 0) : verdict;
    if (points === auto.points) delete verdicts[rang]; else verdicts[rang] = verdict;
    if (!Object.keys(verdicts).length) delete copie.retouches.criteres[q.id];
    apresChangement();
  };

  const basculer = (rang) => {
    const retenu = criteresRetenus(copie.retouches, q)[rang];
    poser(rang, retenu.ok !== true);          // partiel ou manqué → rempli ; rempli → manqué
  };

  const ajuster = (rang, sens) => {
    const retenu = criteresRetenus(copie.retouches, q)[rang];
    const brut = Math.round((retenu.points + sens * PAS) / PAS) * PAS;
    poser(rang, Math.min(retenu.max, Math.max(0, brut)));
  };

  const peindre = () => {
    liste.replaceChildren();
    criteresRetenus(copie.retouches, q).forEach((critere, rang) => {
      const li = elem("li");
      li.dataset.ok = critere.ok === true ? "1" : critere.ok === false ? "0"
                    : critere.retouche ? "partiel" : "";
      if (critere.retouche) li.dataset.retouche = "1";

      const reglage = elem("span", "critere-reglage");
      const moins = elem("button", "critere-pas", "−");
      moins.type = "button";
      moins.title = "Retirer 0,25 point à ce critère";
      moins.disabled = critere.points <= 0;
      moins.addEventListener("click", () => ajuster(rang, -1));
      const plus = elem("button", "critere-pas", "+");
      plus.type = "button";
      plus.title = "Ajouter 0,25 point à ce critère";
      plus.disabled = critere.points >= critere.max;
      plus.addEventListener("click", () => ajuster(rang, +1));
      reglage.append(moins, elem("span", "critere-points", `${arrondi(critere.points)}/${critere.max}`), plus);
      li.appendChild(reglage);

      const bouton = elem("button", "critere-bascule");
      bouton.type = "button";
      const auto = q.criteres[rang];
      bouton.title = critere.retouche
        ? `Ta correction — le barème donnait ${arrondi(auto.points)}/${auto.max}. ` +
          `Clique pour déclarer ce critère ${critere.ok === true ? "manqué" : "rempli"}.`
        : `Clique pour déclarer ce critère ${critere.ok === true ? "manqué" : "rempli"}.`;
      const texte = elem("span");
      texte.textContent = critere.libelle;
      if (critere.retouche) texte.appendChild(elem("span", "critere-retouche", " — modifié par toi"));
      else if (critere.detail) texte.appendChild(elem("span", "critere-detail", ` — ${critere.detail}`));
      bouton.appendChild(texte);
      bouton.addEventListener("click", () => basculer(rang));
      li.appendChild(bouton);

      liste.appendChild(li);
    });
  };
  peindre();
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

/* Le programme de l'élève dans un vrai éditeur, qu'on peut exécuter — et
   modifier pour tester une hypothèse (« et s'il avait écrit <= ? »). Ces
   modifications ne touchent ni la copie ni la note : c'est un bac à sable, et
   « Rétablir » rend le code tel que l'élève l'a remis. */
function atelierDeCorrection(code) {
  const atelier = elem("div", "atelier atelier-correction");
  const onglet = elem("div", "atelier-onglet", code ? "Programme de l'élève" : "Aucune réponse");
  atelier.appendChild(onglet);
  const hote = elem("div", "hote-editeur");
  atelier.appendChild(hote);

  const actions = elem("div", "atelier-actions");
  const btnExec = elem("button", "bouton fantome", "▶ Exécuter");
  btnExec.type = "button";
  const btnRetablir = elem("button", "bouton fantome", "Rétablir le code de l'élève");
  btnRetablir.type = "button";
  btnRetablir.hidden = true;
  actions.append(btnExec, btnRetablir, elem("span", "espace"),
                 elem("span", "discret", "Modifier sert à tester : la copie et la note ne changent pas."));
  atelier.appendChild(actions);

  const console_ = elem("pre", "console");
  console_.dataset.etat = "vide";
  console_.textContent = "Clique sur « Exécuter » pour lancer le programme.";
  atelier.appendChild(console_);

  const editeur = creerEditeur(hote, code, (texte) => {
    const modifie = texte !== code;
    btnRetablir.hidden = !modifie;
    onglet.textContent = modifie ? "Programme de l'élève — modifié pour essai"
                                 : (code ? "Programme de l'élève" : "Aucune réponse");
    onglet.dataset.modifie = modifie ? "1" : "";
  }, URL_BUNDLE);

  const ecrire = (texte, etat) => {
    console_.textContent = texte;
    console_.dataset.etat = etat || "";
    console_.scrollTop = console_.scrollHeight;
  };

  // Un input() de l'élève attend une réponse : c'est l'enseignant qui la tape.
  const reclamerSaisie = () => new Promise((resolve) => {
    const champ = document.createElement("input");
    champ.type = "text";
    champ.className = "saisie";
    champ.autocomplete = "off";
    champ.spellcheck = false;
    champ.setAttribute("aria-label", "Réponse attendue par le programme");
    console_.appendChild(champ);
    champ.focus();
    champ.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter") return;
      ev.preventDefault();
      champ.replaceWith(document.createTextNode(champ.value + "\n"));
      resolve(champ.value);
    });
  });

  btnExec.addEventListener("click", async () => {
    const ed = await editeur;
    btnExec.disabled = true;
    ecrire("Exécution…", "attente");
    const res = await executerAvecSaisies(Python, ed.lire(), {
      reclamerSaisie,
      afficher: (sortie) => ecrire(sortie, "saisie"),
    });
    btnExec.disabled = false;
    if (!res.ok) { ecrire(res.erreur || "Exécution impossible.", "erreur"); return; }
    if (res.erreur) { ecrire((res.stdout || "") + "\n" + res.erreur, "erreur"); return; }
    ecrire(res.stdout || "(le programme n'affiche rien)", res.stdout ? "" : "vide");
  });

  btnRetablir.addEventListener("click", async () => (await editeur).ecrire(code));

  return atelier;
}

/* Changer les points d'un exercice change le total, la note, et le filigrane du
   champ de note finale. Rien de tout cela ne doit replier la copie ouverte : on
   redessine la ligne de l'élève et le pied de sa copie, pas la table. */
function rafraichirTotaux(copie) {
  const tr = $(`.ligne-eleve[data-ouverte="1"]`);
  if (tr) {
    const neuve = ligne(copie);
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
  /* Une copie dont une réponse rédigée attend encore ses points porterait une
     note fausse : elle reste ici, tant qu'elle n'est pas finie. */
  const fichiers = {};
  let incompletes = 0;
  for (const copie of copies) {
    if (!copie.note) continue;
    if (!complete(copie)) { incompletes++; continue; }
    fichiers[nomFichierCopie(copie)] = JSON.stringify(copieDe(copie), null, 2);
  }
  const reste = incompletes ? ` — ${incompletes} non exportée${incompletes > 1 ? "s" : ""} : réponse rédigée à noter` : "";
  if (!Object.keys(fichiers).length) { toast(`Aucune copie complète à exporter${reste}`); return; }
  telecharger(creerZip(fichiers), `copies-corrigees-${bareme.evaluation || "evaluation"}.zip`);
  toast(`${Object.keys(fichiers).length} copies exportées${reste}`);
}

/* ============================================================ Les étapes

   Quatre étapes, dans l'ordre : connexion, évaluation, classe, barème. Chacune
   est « faite » (repliée en une ligne de résumé, avec un bouton Changer),
   « active » (dépliée) ou « en attente » de la précédente (grisée).

   Les copies en ligne vivent dans Supabase ; une classe se charge dans la table
   comme un paquet de fichiers déposés. Le barème, lui, ne part jamais en ligne :
   on le dépose ici. Il est gardé pour la session de l'onglet (sessionStorage),
   et OUBLIÉ dès qu'on change d'évaluation. */

let sommaire = [];          // une ligne par copie en ligne, sans son contenu
let evalChoisie = null;     // clé de l'évaluation en cours
let classeChoisie = null;
const rouvertes = new Set();   // étapes faites que l'enseignant a rouvertes (« Changer »)

const SELECTION = "correction:selection";
const BAREME_SESSION = "correction:bareme";

function titreEvaluation(cle) {
  return EVALUATIONS.find((e) => e.cle === cle)?.titre || cle;
}
function niveauEvaluation(cle) {
  return EVALUATIONS.find((e) => e.cle === cle)?.niveau || "";
}
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;

function garderSelection() {
  try { sessionStorage.setItem(SELECTION, JSON.stringify({ evalChoisie, classeChoisie })); } catch { /* bloqué */ }
}
function lireSession(cle) {
  try { return JSON.parse(sessionStorage.getItem(cle) || "null"); } catch { return null; }
}

function etape(id, etat, resume) {
  const li = $(`#etape-${id}`);
  li.dataset.etat = etat;
  const r = li.querySelector(".pas-resume");
  if (resume != null) r.textContent = resume;
}

function majEtapes() {
  const qui = correcteurConnecte();

  // 1. Connexion
  etape("connexion", qui ? "faite" : "active", qui ? `Connecté : ${qui}` : "Pour lire les copies en ligne.");
  $("#btn-deconnexion").hidden = !qui;

  // 2. Évaluation
  if (!qui) {
    etape("evaluation", "attente", "Après la connexion.");
  } else if (evalChoisie && !rouvertes.has("evaluation")) {
    const n = sommaire.filter((l) => l.evaluation === evalChoisie).length;
    etape("evaluation", "faite", `${titreEvaluation(evalChoisie)} — ${pluriel(n, "copie")}`);
  } else {
    etape("evaluation", "active", sommaire.length ? "Choisis l'évaluation à corriger."
                                                  : "Aucune copie en ligne pour l'instant.");
  }
  $("#btn-actualiser").hidden = !qui;
  $("#btn-changer-evaluation").hidden = !(qui && evalChoisie && !rouvertes.has("evaluation"));

  // 3. Classe
  if (!qui || !evalChoisie) {
    etape("classe", "attente", "Après le choix de l'évaluation.");
  } else if (classeChoisie && !rouvertes.has("classe")) {
    const n = sommaire.filter((l) => l.evaluation === evalChoisie && l.classe === classeChoisie).length;
    etape("classe", "faite", `${classeChoisie} — ${pluriel(n, "copie")}`);
  } else {
    etape("classe", "active", "Choisis la classe : ses copies se chargent dans la table.");
  }
  $("#btn-changer-classe").hidden = !(classeChoisie && !rouvertes.has("classe"));

  // 4. Barème — attendu seulement une fois la classe choisie, sauf sans connexion
  //    (copies reçues en fichier).
  const attendu = evalChoisie ? `bareme-${evalChoisie}.json` : "bareme-….json";
  $("#consigne-bareme").innerHTML =
    `Dépose le barème <code>${attendu}</code>${evalChoisie ? ` de « ${titreEvaluation(evalChoisie)} »` : ""}. ` +
    `La Console des évaluations le télécharge (bouton « Barème (JSON) ») ; il reste dans ce navigateur.`;
  if (bareme && !rouvertes.has("bareme")) {
    etape("bareme", "faite", null);
  } else if (qui && !classeChoisie && !copies.length) {
    etape("bareme", "attente", "Après le choix de la classe.");
  } else {
    etape("bareme", "active", bareme ? null : "Aucun barème chargé");
  }
  $("#btn-changer-bareme").hidden = !(bareme && !rouvertes.has("bareme"));

  majListes();
}

function majListes() {
  // Les évaluations, de la plus récemment rendue à la plus ancienne (le sommaire
  // arrive trié par date de dépôt décroissante).
  const hoteE = $("#liste-evaluations");
  hoteE.innerHTML = "";
  for (const cle of [...new Set(sommaire.map((l) => l.evaluation))]) {
    const leurs = sommaire.filter((l) => l.evaluation === cle);
    const classes = new Set(leurs.map((l) => l.classe)).size;
    const publiees = leurs.filter((l) => l.corrigee_le).length;
    hoteE.appendChild(carteChoix(
      titreEvaluation(cle),
      [niveauEvaluation(cle), pluriel(leurs.length, "copie"), pluriel(classes, "classe"),
       pluriel(publiees, "publiée")].filter(Boolean).join(" · "),
      cle === evalChoisie,
      () => choisirEvaluation(cle)));
  }

  const hoteC = $("#liste-classes");
  hoteC.innerHTML = "";
  const lignes = sommaire.filter((l) => l.evaluation === evalChoisie);
  for (const classe of [...new Set(lignes.map((l) => l.classe))].sort((a, b) => a.localeCompare(b, "fr"))) {
    const leurs = lignes.filter((l) => l.classe === classe);
    const publiees = leurs.filter((l) => l.corrigee_le).length;
    hoteC.appendChild(carteChoix(
      classe, `${pluriel(leurs.length, "copie")} · ${pluriel(publiees, "publiée")}`,
      classe === classeChoisie,
      () => choisirClasse(classe)));
  }
}

function carteChoix(titre, detail, choisie, action) {
  const btn = elem("button", "carte-choix");
  btn.type = "button";
  if (choisie) btn.dataset.choisie = "1";
  btn.appendChild(elem("strong", null, titre));
  btn.appendChild(elem("span", null, detail));
  btn.addEventListener("click", action);
  return btn;
}

async function actualiserSommaire() {
  if (!correcteurConnecte()) { sommaire = []; majEtapes(); return; }
  try {
    sommaire = await listerCopies();
  } catch (e) {
    if (e.statut === 401) await deconnecter();
    toast(`Copies en ligne : ${e.message}`);
    return;
  }
  // Une évaluation dont toutes les copies ont disparu (purge, suppression).
  if (evalChoisie && !sommaire.some((l) => l.evaluation === evalChoisie) && !copies.length) {
    evalChoisie = classeChoisie = null;
    garderSelection();
  }
  majEtapes();
}

/* Changer d'évaluation vide la table et OUBLIE le barème : il ne vaut que pour
   l'évaluation qu'il note. */
function choisirEvaluation(cle) {
  rouvertes.delete("evaluation");
  if (cle !== evalChoisie) {
    evalChoisie = cle;
    classeChoisie = null;
    oublierBareme();
    copies.length = 0;
    ouverte = null;
    rendre();
    garderSelection();
  }
  majEtapes();
  // Une seule classe : inutile de la faire choisir.
  const classes = [...new Set(sommaire.filter((l) => l.evaluation === cle).map((l) => l.classe))];
  if (!classeChoisie && classes.length === 1) choisirClasse(classes[0]);
}

async function choisirClasse(classe) {
  rouvertes.delete("classe");
  classeChoisie = classe;
  garderSelection();
  majEtapes();
  let lignes;
  try { lignes = await chargerCopies(evalChoisie, classe); }
  catch (e) {
    if (e.statut === 401) await deconnecter();
    toast(`Chargement impossible : ${e.message}`);
    return;
  }
  // Une classe remplace la table : on corrige un paquet à la fois.
  copies.length = 0;
  ouverte = null;
  await ajouterRendus(lignes.map((l) => l.rendu),
                      lignes.map((l) => ({ id: l.id, code: l.code, corrigee_le: l.corrigee_le })));
  rendre();
  majEtapes();
  toast(`${classe} : ${pluriel(lignes.length, "copie")} chargée${lignes.length > 1 ? "s" : ""}` +
        (bareme ? "" : " — dépose maintenant le barème"));
}

function oublierBareme() {
  bareme = null;
  try { sessionStorage.removeItem(BAREME_SESSION); } catch { /* bloqué */ }
  $("#etat-bareme").textContent = "Aucun barème chargé";
  $("#etat-bareme").dataset.charge = "";
}

async function deconnecter() {
  await seDeconnecter();
  // Les copies en ligne ne restent pas affichées après la déconnexion.
  sommaire = [];
  evalChoisie = classeChoisie = null;
  garderSelection();
  if (copies.some((c) => c.distant)) {
    copies.length = 0;
    ouverte = null;
    oublierBareme();
    rendre();
  }
  rouvertes.clear();
  majEtapes();
}

/* Publication automatique. Une copie en ligne part chez l'élève dès qu'elle
   est prête : barème appliqué, plus aucune réponse rédigée à noter, et une
   appréciation générale écrite. Chaque retouche ultérieure la republie — ce
   que l'élève lit est toujours l'état présent de la correction.

   On attend que la frappe se pose (quelques secondes) avant d'envoyer, pour ne
   pas publier une appréciation à moitié écrite à chaque lettre. */
const DELAI_PUBLICATION = 2500;

const prete = (copie) => !!(copie.distant && bareme && copie.note && complete(copie) &&
                            (copie.retouches.commentaire || "").trim());

function programmerPublication(copie, delai = DELAI_PUBLICATION) {
  if (!copie.distant) return;
  clearTimeout(copie.distant.minuteur);
  copie.distant.minuteur = null;
  if (!prete(copie)) { majPubliee(copie); return; }
  copie.distant.etat = "attente";
  majPubliee(copie);
  copie.distant.minuteur = setTimeout(() => publier(copie), delai);
}

async function publier(copie) {
  copie.distant.minuteur = null;
  if (!prete(copie)) { copie.distant.etat = null; majPubliee(copie); return; }
  copie.distant.etat = "envoi";
  majPubliee(copie);
  try {
    await publierCorrection(copie.distant.id, copieDe(copie));
    copie.distant.corrigee_le = new Date().toISOString();
    copie.distant.etat = null;
    copie.distant.erreur = null;
    const l = sommaire.find((x) => x.id === copie.distant.id);
    if (l) { l.corrigee_le = copie.distant.corrigee_le; majListes(); }
  } catch (e) {
    copie.distant.etat = "echec";
    copie.distant.erreur = e.message;
    if (e.statut === 401) { toast(e.message); await deconnecter(); }
  }
  majPubliee(copie);
}

/* Les copies publiées avant ce jour ne montrent ni les énoncés ni les
   propositions des QCM. Un barème qui les porte (téléchargé depuis la console)
   les republie, une fois : la copie de l'élève se complète d'elle-même. */
const ENONCES_DEPUIS = Date.parse("2026-10-09T00:00:00+02:00");
const sansEnonces = (copie) => !!bareme?.sujet &&
  Date.parse(copie.distant.corrigee_le) < ENONCES_DEPUIS;

/* Après un chargement, une reconnexion ou le dépôt du barème : publier ce qui
   est prêt et ne l'a pas encore été (ou a échoué, ou date d'avant les énoncés). */
function publierLesPretes() {
  if (!correcteurConnecte()) return;
  for (const copie of copies) {
    if (prete(copie) && (!copie.distant.corrigee_le || copie.distant.etat === "echec" ||
                         sansEnonces(copie))) {
      programmerPublication(copie, 0);
    }
  }
}

function cellulePubliee(copie) {
  const td = elem("td", "cellule-publiee");
  const d = copie.distant;
  if (!d) {
    td.textContent = "—";
    td.title = "Copie déposée en fichier : elle n'est pas en ligne.";
    return td;
  }
  if (d.etat === "attente" || d.etat === "envoi") {
    td.textContent = "…";
    td.title = "Publication en cours";
  } else if (d.etat === "echec") {
    td.textContent = "⚠";
    td.dataset.etat = "echec";
    td.title = `Publication impossible : ${d.erreur || "erreur"}. Elle sera retentée à la prochaine retouche.`;
  } else if (d.corrigee_le) {
    td.textContent = "✓";
    td.dataset.etat = "oui";
    td.title = `Publiée le ${new Date(d.corrigee_le).toLocaleString("fr-FR")}. ` +
               "Chaque retouche met à jour ce que l'élève lit.";
  } else {
    td.textContent = "✗";
    td.dataset.etat = "non";
    td.title = !copie.note ? "En attente du barème"
      : !complete(copie) ? `Pas encore : il reste ${enAttente(copie)}`
      : "Pas encore : il manque l'appréciation générale";
  }
  return td;
}

/* Ne redessiner que la cellule : redessiner la table ferait perdre le curseur
   dans l'appréciation qu'on est en train d'écrire. */
function majPubliee(copie) {
  const tr = document.querySelector(`.ligne-eleve[data-cle="${CSS.escape(identifiant(copie.rendu))}"]`);
  const ancienne = tr?.querySelector(".cellule-publiee");
  if (ancienne) ancienne.replaceWith(cellulePubliee(copie));
}

function zoneSuppression(copie) {
  const zone = elem("div", "zone-suppression");
  zone.appendChild(elem("span", "discret", `Code de consultation : ${copie.distant.code || "—"}`));
  const btn = elem("button", "bouton fantome petit", "Supprimer cette copie en ligne");
  btn.type = "button";
  btn.addEventListener("click", async () => {
    if (!confirm(`Supprimer définitivement la copie en ligne de ${nomAffiche(copie.rendu)} ?\n\n` +
                 "L'élève ne pourra plus la consulter. Cette action est irréversible.")) return;
    try { await supprimerCopie(copie.distant.id); }
    catch (e) { toast(`Suppression impossible : ${e.message}`); return; }
    copies.splice(copies.indexOf(copie), 1);
    ouverte = null;
    rendre();
    actualiserSommaire();
    toast("Copie supprimée");
  });
  zone.appendChild(btn);
  return zone;
}

async function initEtapes() {
  $("#form-connexion").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const bouton = $("#form-connexion button");
    bouton.disabled = true;
    try {
      await seConnecter($("#champ-email").value.trim(), $("#champ-mdp").value);
    } catch (e) {
      toast(e.statut === 400 ? "Adresse ou mot de passe incorrect" : `Connexion impossible : ${e.message}`);
      return;
    } finally {
      bouton.disabled = false;
    }
    $("#champ-mdp").value = "";
    await actualiserSommaire();
    publierLesPretes();
  });
  $("#btn-deconnexion").addEventListener("click", deconnecter);
  $("#btn-actualiser").addEventListener("click", actualiserSommaire);
  for (const id of ["evaluation", "classe", "bareme"]) {
    $(`#btn-changer-${id}`).addEventListener("click", () => { rouvertes.add(id); majEtapes(); });
  }

  /* Fermer l'onglet pendant qu'une publication attend la fin de la frappe : on
     prévient, sinon la dernière retouche ne partirait jamais. */
  window.addEventListener("beforeunload", (ev) => {
    if (copies.some((c) => c.distant?.minuteur || c.distant?.etat === "envoi")) {
      ev.preventDefault();
      ev.returnValue = "";
    }
  });

  /* Recharger la page ramène là où l'on en était : évaluation, classe, et le
     barème s'il est celui de cette évaluation. */
  const baremeGarde = lireSession(BAREME_SESSION);
  const selection = lireSession(SELECTION);
  majEtapes();
  if (correcteurConnecte()) {
    await actualiserSommaire();
    if (selection?.evalChoisie && sommaire.some((l) => l.evaluation === selection.evalChoisie)) {
      choisirEvaluation(selection.evalChoisie);
      if (selection.classeChoisie && selection.classeChoisie !== classeChoisie &&
          sommaire.some((l) => l.evaluation === evalChoisie && l.classe === selection.classeChoisie)) {
        await choisirClasse(selection.classeChoisie);
      }
    }
  }
  if (baremeGarde && estUnBareme(baremeGarde) && (!evalChoisie || baremeGarde.evaluation === evalChoisie)) {
    poserBareme(baremeGarde, { silencieux: true });
  }
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
      // Pas de note tant qu'une réponse rédigée attend : une case vide ne se
      // recopie pas par erreur dans un bulletin, un chiffre faux si.
      complete(copie) ? arrondi(finale(copie)) : "",
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
  const sansNote = copies.filter((c) => c.note && !complete(c)).length;
  toast(sansNote ? `Notes exportées — ${sansNote} sans note : réponse rédigée à noter`
                 : "Notes exportées");
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
initEtapes();
Python.prechauffer();
