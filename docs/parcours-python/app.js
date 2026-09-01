/* Parcours Python — moteur.
 *
 * Application autonome (aucun framework) servie par MkDocs à /parcours-python/.
 * Elle réutilise deux briques déjà présentes sur le site :
 *   ../javascripts/pyodide-worker.js      exécution et validation Python
 *   ../javascripts/codemirror-bundle.js   éditeur
 *
 * Le contenu pédagogique vit entièrement dans seances/*.js : ce fichier ne sait
 * rien des notions enseignées, il sait dérouler des étapes et les valider.
 */

import { PALIERS, CATALOGUE } from "./seances/manifeste.js";

const BASE = new URL(".", import.meta.url);
const URL_WORKER = new URL("../javascripts/pyodide-worker.js", BASE).href;
const URL_BUNDLE = new URL("../javascripts/codemirror-bundle.js", BASE).href;

/* ====================================================================== Outils */

const $ = (sel, racine = document) => racine.querySelector(sel);

function elem(balise, classe, texte) {
  const n = document.createElement(balise);
  if (classe) n.className = classe;
  if (texte != null) n.textContent = texte;
  return n;
}

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

/* Comparaison de sorties : on ne veut pas qu'une espace en fin de ligne ou une
   ligne vide finale fasse échouer un élève dont le programme est juste. */
function normaliser(texte) {
  return String(texte ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n+$/, "")
    .replace(/^\n+/, "");
}

function pluriel(n, singulier, plur) {
  return `${n} ${n > 1 ? (plur || singulier + "s") : singulier}`;
}

let minuteurToast;
function toast(message) {
  const boite = $("#toast");
  boite.textContent = message;
  boite.dataset.visible = "1";
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => { boite.dataset.visible = ""; }, 2600);
}

/* ================================================================= Progression */

const CLE = "parcours-python:v1";

/* Forme stockée :
   { version, eleve:{prenom}, seances:{ s01:{ etapes:{ e1:{reussi,essais,indices,correction} },
                                              codes:{ e1:"..." } } } } */
function structureVide() {
  return { version: 1, eleve: { prenom: "" }, seances: {} };
}

let etat = lireEtat();

function lireEtat() {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return structureVide();
    const lu = JSON.parse(brut);
    if (!lu || typeof lu !== "object") return structureVide();
    return { ...structureVide(), ...lu };
  } catch {
    // Navigation privée, stockage bloqué : le parcours reste utilisable,
    // simplement il ne se souviendra de rien.
    return structureVide();
  }
}

function ecrireEtat() {
  try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch { /* stockage indisponible */ }
}

function dossierSeance(idSeance) {
  if (!etat.seances[idSeance]) etat.seances[idSeance] = { etapes: {}, codes: {} };
  const d = etat.seances[idSeance];
  d.etapes ||= {};
  d.codes ||= {};
  return d;
}

function suivi(idSeance, idEtape) {
  const d = dossierSeance(idSeance);
  if (!d.etapes[idEtape]) d.etapes[idEtape] = { reussi: false, essais: 0, indices: 0, correction: false };
  return d.etapes[idEtape];
}

function nbReussies(idSeance) {
  const d = etat.seances[idSeance];
  if (!d) return 0;
  return Object.values(d.etapes || {}).filter((e) => e.reussi).length;
}

function totalEtapes(idSeance) {
  return CATALOGUE[idSeance]?.nbEtapes || 0;
}

/* ------------------------------------------------------- Emporter sa progression */

function codeDeReprise() {
  // btoa n'accepte que du latin-1 : on passe par un encodage UTF-8 explicite.
  const octets = new TextEncoder().encode(JSON.stringify(etat));
  let binaire = "";
  for (const o of octets) binaire += String.fromCharCode(o);
  return btoa(binaire);
}

function restaurer(code) {
  const texte = code.trim();
  if (!texte) throw new Error("Le code de reprise est vide.");
  let json;
  if (texte.startsWith("{")) {
    json = texte;                                   // fichier .json déposé tel quel
  } else {
    const binaire = atob(texte.replace(/\s+/g, ""));
    const octets = Uint8Array.from(binaire, (c) => c.charCodeAt(0));
    json = new TextDecoder("utf-8").decode(octets);
  }
  const lu = JSON.parse(json);
  if (!lu || typeof lu !== "object" || !lu.seances) {
    throw new Error("Ce code ne ressemble pas à une progression.");
  }
  etat = { ...structureVide(), ...lu };
  ecrireEtat();
}

/* ======================================================================= Thème */

const CLE_THEME = "parcours-python:theme";

function appliquerTheme(valeur) {
  if (valeur === "clair") document.documentElement.dataset.theme = "light";
  else if (valeur === "sombre") document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
}

function initTheme() {
  let choix = localStorage.getItem(CLE_THEME) || "auto";
  appliquerTheme(choix);
  $("#btn-theme").addEventListener("click", () => {
    choix = { auto: "clair", clair: "sombre", sombre: "auto" }[choix];
    localStorage.setItem(CLE_THEME, choix);
    appliquerTheme(choix);
    toast({ auto: "Thème : système", clair: "Thème : clair", sombre: "Thème : sombre" }[choix]);
  });
}

/* ====================================================================== Python */

/* Un seul interpréteur pour toute l'application : Pyodide pèse ~10 Mo. Chaque
   exécution repart d'un espace de noms neuf, les étapes restent indépendantes. */
const Python = (() => {
  let worker = null;
  let compteur = 0;
  const enAttente = new Map();

  function creer() {
    worker = new Worker(URL_WORKER);
    worker.onmessage = (ev) => {
      const resoudre = enAttente.get(ev.data?.id);
      if (!resoudre) return;
      enAttente.delete(ev.data.id);
      resoudre(ev.data);
    };
    worker.onerror = () => {
      for (const [id, resoudre] of enAttente) {
        resoudre({ id, ok: false, erreur: "Interpréteur Python indisponible." });
      }
      enAttente.clear();
    };
  }

  function redemarrer() {
    if (worker) worker.terminate();
    for (const [id, resoudre] of enAttente) resoudre({ id, ok: false, erreur: "Exécution interrompue." });
    enAttente.clear();
    worker = null;
  }

  function demander(charge, delaiMs = 15000) {
    if (!worker) creer();
    const id = ++compteur;
    return new Promise((resolve) => {
      let fini = false;
      const terminer = (r) => { if (!fini) { fini = true; clearTimeout(m); resolve(r); } };
      const m = setTimeout(() => {
        // Seul terminate() libère un worker bloqué dans une boucle infinie.
        redemarrer();
        terminer({
          ok: false,
          erreur: `Temps dépassé (${Math.round(delaiMs / 1000)} s).\n` +
                  "Ton programme tourne-t-il sans fin ? Vérifie la condition d'arrêt de tes boucles.",
        });
      }, delaiMs);
      enAttente.set(id, terminer);
      worker.postMessage({ id, ...charge });
    });
  }

  return {
    prechauffer: () => demander({ action: "prechauffer" }, 120000),
    executer: (code, reponses) => demander({ action: "run", code, reponses }, 15000),
    valider: (code, tests, reponses) => demander({ action: "check", code, tests, reponses }, 15000),
  };
})();

/* =================================================================== Éditeur */

let CM = null;
async function chargerCodeMirror() {
  if (!CM) CM = await import(URL_BUNDLE);
  return CM;
}

async function creerEditeur(hote, depart, onChange) {
  const { EditorView, EditorState, basicSetup, indentUnit, keymap, indentMore, indentLess, python } =
    await chargerCodeMirror();

  const extensions = [
    basicSetup,
    EditorState.tabSize.of(4),
    indentUnit.of("    "),                      // PEP 8 : 4 espaces, jamais de tabulation
    keymap.of([
      { key: "Tab", run: indentMore, preventDefault: true },
      { key: "Shift-Tab", run: indentLess, preventDefault: true },
    ]),
    EditorView.updateListener.of((u) => { if (u.docChanged) onChange(u.state.doc.toString()); }),
  ];
  if (python) extensions.splice(4, 0, python());

  const vue = new EditorView({ parent: hote, state: EditorState.create({ doc: depart, extensions }) });

  return {
    vue,
    lire: () => vue.state.doc.toString(),
    ecrire: (texte) => {
      vue.dispatch({ changes: { from: 0, to: vue.state.doc.length, insert: texte } });
      onChange(texte);
    },
  };
}

/* ================================================================= Validation */

/* Une étape de code déclare ses attentes ; l'ordre des contrôles est pensé pour
   que le message le plus utile arrive en premier :
   forme du code → exécution sans erreur → sortie produite → assertions. */
async function validerCode(etape, code, executerAvecSaisies) {
  const v = etape.validation || {};
  const echecs = [];

  if (!code.trim()) return { reussi: false, echecs: ["Ton éditeur est vide : écris d'abord un programme."] };

  for (const regle of v.codeContient || []) {
    if (!new RegExp(regle.motif, regle.options || "").test(code)) echecs.push(regle.message);
  }
  for (const regle of v.codeAbsent || []) {
    if (new RegExp(regle.motif, regle.options || "").test(code)) echecs.push(regle.message);
  }
  if (echecs.length) return { reussi: false, echecs };

  const r = await executerAvecSaisies(v.tests || null);
  if (!r) return null;                                   // saisie abandonnée
  if (!r.ok)    return { reussi: false, echecs: [r.erreur], brut: r };
  if (r.erreur) return { reussi: false, echecs: ["Ton programme s'est arrêté sur une erreur — le détail est dans la console."], brut: r };

  const sortie = normaliser(r.stdout);

  if (v.sortieNonVide && !sortie) {
    echecs.push("Ton programme n'affiche rien. Utilise print() pour montrer un résultat.");
  }
  if (v.sortie != null && sortie !== normaliser(v.sortie)) {
    return {
      reussi: false,
      echecs: ["La sortie de ton programme n'est pas celle attendue."],
      comparaison: { attendu: normaliser(v.sortie), obtenu: sortie || "(rien)" },
      brut: r,
    };
  }
  for (const fragment of v.sortieContient || []) {
    if (!sortie.includes(fragment)) echecs.push(`Il manque « ${fragment} » dans ce que ton programme affiche.`);
  }
  if (v.sortieRegex && !new RegExp(v.sortieRegex, v.sortieRegexOptions || "").test(sortie)) {
    echecs.push(v.sortieRegexMessage || "Ce que ton programme affiche ne correspond pas à ce qui est demandé.");
  }

  if (v.tests) {
    const rates = (r.resultats || []).filter((t) => !t.ok);
    for (const t of rates) echecs.push(t.libelle + (t.detail ? ` — ${t.detail}` : ""));
    if (!rates.length && !(r.resultats || []).length && !echecs.length) {
      echecs.push("Aucun test n'a pu être exécuté sur ton code.");
    }
  }

  return echecs.length ? { reussi: false, echecs, brut: r } : { reussi: true, brut: r };
}

/* ==================================================================== Routeur */

function route() {
  const h = location.hash.replace(/^#\/?/, "").trim();
  return h && CATALOGUE[h] ? { vue: "seance", id: h } : { vue: "hub" };
}

function aller(hash) {
  if (location.hash === hash) rendre(); else location.hash = hash;
}

/* ======================================================================== Hub */

function rendreHub() {
  const vue = $("#vue");
  vue.textContent = "";
  $("#barre-titre").hidden = true;

  const total = Object.keys(CATALOGUE).reduce((s, id) => s + totalEtapes(id), 0);
  const faites = Object.keys(CATALOGUE).reduce((s, id) => s + Math.min(nbReussies(id), totalEtapes(id)), 0);
  majJauge($("#jauge-barre"), faites, total);
  $("#compteur-barre").textContent = total ? `${Math.round((faites / total) * 100)} %` : "";

  const chapeau = elem("div", "chapeau");
  chapeau.innerHTML = `
    <div class="sur-titre">SNT · Seconde · Algorithmique et programmation</div>
    <h1>Apprendre Python, une étape à la fois</h1>
    <p class="accroche">Tu viens de Scratch, et c'est exactement le bon point de départ.
    Chaque séance t'explique une idée pas à pas, te fait écrire du code tout de suite,
    et vérifie ton travail à ta place. Ta progression est enregistrée automatiquement.</p>`;
  vue.appendChild(chapeau);

  for (const palier of PALIERS) {
    const dispo = palier.seances.filter((id) => CATALOGUE[id]);
    if (!dispo.length) continue;

    vue.appendChild(elem("div", "titre-palier", palier.titre));
    const grille = elem("div", "grille-seances");

    for (const id of dispo) {
      const meta = CATALOGUE[id];
      const nb = totalEtapes(id);
      const fait = Math.min(nbReussies(id), nb);
      const etatSeance = !fait ? "neuf" : fait >= nb ? "termine" : "encours";

      const carte = elem("a", "carte-seance");
      carte.href = meta.disponible ? `#/${id}` : "#/";
      carte.dataset.etat = etatSeance;
      if (!meta.disponible) carte.setAttribute("aria-disabled", "true");

      const numero = elem("div", "numero", meta.disponible && etatSeance === "termine" ? "✓" : String(meta.numero));
      const bloc = elem("div");
      bloc.appendChild(elem("div", "titre", `Séance ${meta.numero} — ${meta.titre}`));
      bloc.appendChild(elem("div", "detail", meta.resume));
      if (meta.disponible) {
        const jauge = elem("div", "jauge");
        jauge.appendChild(document.createElement("i"));
        majJauge(jauge, fait, nb);
        bloc.appendChild(jauge);
      }

      const etatTexte = elem("div", "etat",
        !meta.disponible ? "bientôt"
        : etatSeance === "termine" ? "terminée"
        : etatSeance === "encours" ? `${fait}/${nb}`
        : `${nb} étapes`);

      carte.append(numero, bloc, etatTexte);
      grille.appendChild(carte);
    }
    vue.appendChild(grille);
  }
}

function majJauge(jauge, fait, total) {
  const pct = total ? Math.round((fait / total) * 100) : 0;
  jauge.querySelector("i").style.width = pct + "%";
  jauge.setAttribute("aria-valuenow", String(pct));
}

/* ===================================================================== Séance */

let seanceCourante = null;    // { def, id }

async function rendreSeance(id) {
  const vue = $("#vue");
  vue.textContent = "";
  vue.appendChild(elem("p", null, "Chargement de la séance…"));

  let def;
  try {
    def = (await import(`./seances/${id}.js`)).default;
  } catch (e) {
    vue.textContent = "";
    vue.appendChild(elem("p", null, "Cette séance n'est pas encore disponible."));
    return;
  }
  seanceCourante = { def, id };

  // Le rang affiché sur le rail est calculé ici : l'auteur d'une séance n'a pas
  // à renumeroter tout son fichier quand il insère une étape.
  let rang = 0;
  for (const partie of def.parties) for (const e of partie.etapes) e.rang = ++rang;
  if (rang !== totalEtapes(id)) {
    console.warn(`[parcours] ${id} : ${rang} étapes réelles, ${totalEtapes(id)} annoncées dans le manifeste.`);
  }

  $("#barre-titre").hidden = false;
  $("#barre-titre").innerHTML =
    `Séance ${def.numero} — ${echapper(def.titre)}<small>${echapper(def.sousTitre || "")}</small>`;

  vue.textContent = "";

  const chapeau = elem("div", "chapeau");
  chapeau.innerHTML = `
    <div class="sur-titre">${echapper(def.palier)}</div>
    <h1>${echapper(def.titre)}</h1>
    <p class="accroche">${def.accroche}</p>
    <div class="encadre" data-ton="astuce">
      <span class="chapo">À la fin de cette séance, tu sauras :</span>
      <ul>${def.objectifs.map((o) => `<li>${o}</li>`).join("")}</ul>
    </div>`;
  vue.appendChild(chapeau);

  for (const partie of def.parties) {
    const entete = elem("div", "partie-entete");
    entete.dataset.partie = partie.id;
    const bloc = elem("div");
    bloc.appendChild(elem("h2", null, partie.titre));
    bloc.appendChild(elem("div", "meta", partie.intention));
    entete.appendChild(bloc);
    entete.appendChild(elem("span", "etoiles", "★".repeat(partie.etoiles) + "☆".repeat(3 - partie.etoiles)));
    vue.appendChild(entete);

    const liste = elem("div", "liste-etapes");
    liste.dataset.partie = partie.id;
    for (const etape of partie.etapes) liste.appendChild(construireEtape(def, partie, etape));
    vue.appendChild(liste);
  }

  const final = elem("div", "final");
  final.id = "bloc-final";
  final.hidden = true;
  final.innerHTML = `
    <h2>Séance ${def.numero} terminée 🎉</h2>
    <p>${def.motDeLaFin || "Tu as bouclé toutes les étapes de cette séance."}</p>
    <a class="bouton" href="#/">Retour aux séances</a>`;
  vue.appendChild(final);

  rafraichirVerrous();
  Python.prechauffer();
}

/* -------------------------------------------------------- Verrous et jauges */

function rafraichirVerrous() {
  if (!seanceCourante) return;
  const { def, id } = seanceCourante;

  // Le parcours est linéaire d'un bout à l'autre : chaque étape réussie ouvre la
  // suivante, et les défis n'apparaissent qu'une fois les exercices terminés.
  // C'est ce qui garantit qu'aucune notion n'est rencontrée avant d'être vue.
  let ouvert = true;
  for (const partie of def.parties) {
    for (const etape of partie.etapes) {
      const noeud = document.getElementById(`etape-${etape.id}`);
      if (!noeud) continue;
      const s = suivi(id, etape.id);

      if (s.reussi) noeud.dataset.etat = "reussi";
      else if (!ouvert) noeud.dataset.etat = "verrouille";
      else { noeud.dataset.etat = "actif"; ouvert = false; }
    }
  }

  const total = totalEtapes(id);
  const fait = Math.min(nbReussies(id), total);
  majJauge($("#jauge-barre"), fait, total);
  $("#compteur-barre").textContent = `${fait}/${total}`;

  const final = document.getElementById("bloc-final");
  if (final) final.hidden = fait < total;
}

/* --------------------------------------------------------- Construction DOM */

const LIBELLE_TYPE = {
  cours: "Cours",
  qcm: "Question",
  prediction: "Prédiction",
  code: "À toi de coder",
};

function construireEtape(def, partie, etape) {
  const bloc = elem("div", "etape");
  bloc.id = `etape-${etape.id}`;

  const rail = elem("div", "etape-rail");
  const pastille = elem("div", "etape-pastille", etape.rang != null ? String(etape.rang) : "•");
  rail.append(pastille, elem("div", "etape-trait"));

  const corps = elem("div", "etape-corps");

  const titre = elem("div", "etape-titre");
  const type = elem("span", "pastille-type", LIBELLE_TYPE[etape.type] || etape.type);
  type.dataset.type = etape.type;
  titre.append(type, elem("h3", null, etape.titre));
  corps.appendChild(titre);

  const contenu = elem("div", "etape-contenu");
  contenu.innerHTML = etape.contenu || "";
  corps.appendChild(contenu);

  if (etape.type === "cours")            monterCours(def, etape, corps);
  else if (etape.type === "qcm")         monterQcm(def, etape, corps);
  else if (etape.type === "prediction")  monterQcm(def, etape, corps);
  else if (etape.type === "code")        monterCode(def, etape, corps);

  bloc.append(rail, corps);
  return bloc;
}

function marquerReussie(def, etape, noeudCorps) {
  const s = suivi(def.id, etape.id);
  if (!s.reussi) {
    s.reussi = true;
    ecrireEtat();
  }
  rafraichirVerrous();

  // Amener l'élève à l'étape suivante sans qu'il ait à la chercher.
  const suivante = document.querySelector('.etape[data-etat="actif"]');
  if (suivante && suivante !== noeudCorps?.parentElement) {
    setTimeout(() => suivante.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
  }
}

/* ------------------------------------------------------------- Étape : cours */

function monterCours(def, etape, corps) {
  const actions = elem("div", "atelier-actions");
  actions.style.borderTop = "0";
  actions.style.paddingLeft = "0";
  const btn = elem("button", "bouton", etape.libelleBouton || "J'ai compris →");
  actions.appendChild(btn);
  corps.appendChild(actions);

  const deja = suivi(def.id, etape.id).reussi;
  if (deja) { btn.disabled = true; btn.textContent = "✓ Lu"; }

  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.textContent = "✓ Lu";
    marquerReussie(def, etape, corps);
  });
}

/* --------------------------------------------------- Étapes : QCM, prédiction */

function monterQcm(def, etape, corps) {
  if (etape.code) {
    const pre = elem("pre", "bloc-code");
    pre.appendChild(elem("code", null, etape.code));
    corps.appendChild(pre);
  }
  if (etape.question) {
    const q = elem("p");
    q.innerHTML = `<strong>${etape.question}</strong>`;
    corps.appendChild(q);
  }

  const liste = elem("div", "qcm");
  const apres = elem("div");
  apres.hidden = true;
  const deja = suivi(def.id, etape.id).reussi;

  etape.options.forEach((option, i) => {
    const btn = elem("button", "qcm-option");
    btn.type = "button";
    const puce = elem("span", "puce", String.fromCharCode(65 + i));
    const texte = elem("span");
    texte.innerHTML = option.texte;
    btn.append(puce, texte);

    btn.addEventListener("click", () => {
      const s = suivi(def.id, etape.id);
      s.essais++;
      btn.dataset.issue = option.correct ? "juste" : "faux";

      if (option.explication) {
        const exp = elem("span", "explication");
        exp.innerHTML = option.explication;
        texte.appendChild(exp);
      }

      if (option.correct) {
        liste.querySelectorAll(".qcm-option").forEach((b) => { b.disabled = true; });
        apres.hidden = false;
        ecrireEtat();
        marquerReussie(def, etape, corps);
      } else {
        btn.disabled = true;
        ecrireEtat();
      }
    });

    liste.appendChild(btn);
  });

  corps.appendChild(liste);

  if (etape.apres) {
    apres.className = "encadre";
    apres.dataset.ton = "astuce";
    apres.innerHTML = etape.apres;
    corps.appendChild(apres);
  }

  if (deja) {
    liste.querySelectorAll(".qcm-option").forEach((b, i) => {
      b.disabled = true;
      if (etape.options[i].correct) b.dataset.issue = "juste";
    });
    apres.hidden = false;
  }
}

/* -------------------------------------------------------------- Étape : code */

function monterCode(def, etape, corps) {
  const s = suivi(def.id, etape.id);
  const dossier = dossierSeance(def.id);

  const atelier = elem("div", "atelier");
  atelier.appendChild(elem("div", "atelier-onglet", etape.nomFichier || "programme.py"));

  const hote = elem("div", "hote-editeur");
  atelier.appendChild(hote);

  const actions = elem("div", "atelier-actions");
  const btnExec = elem("button", "bouton fantome", "▶ Exécuter");
  const btnValider = elem("button", "bouton vert", "✓ Valider");
  const espace = elem("span", "espace");
  const btnIndice = elem("button", "bouton fantome", "💡 Coup de pouce");
  const btnReset = elem("button", "bouton fantome icone", "↺");
  btnReset.title = "Revenir au code de départ";
  actions.append(btnExec, btnValider, espace, btnIndice, btnReset);
  if (etape.solution) {
    const btnCorr = elem("button", "bouton fantome", "Correction");
    btnCorr.hidden = true;
    actions.appendChild(btnCorr);
    atelier.dataset.avecCorrection = "1";
    actions.btnCorr = btnCorr;
  }
  atelier.appendChild(actions);

  const console_ = elem("pre", "console");
  console_.dataset.etat = "vide";
  console_.textContent = "Clique sur « Exécuter » pour lancer ton programme.";
  atelier.appendChild(console_);

  corps.appendChild(atelier);

  const zoneIndices = elem("div", "indices");
  corps.appendChild(zoneIndices);
  const zoneVerdict = elem("div");
  corps.appendChild(zoneVerdict);

  /* --- éditeur (créé à l'approche de l'écran : Pyodide et CodeMirror coûtent cher) */
  let editeur = null;
  const modele = etape.depart ?? "";
  dossier.modeles ||= {};
  if (dossier.modeles[etape.id] !== modele) {
    // L'énoncé a changé côté enseignant : le brouillon d'avant n'a plus de sens.
    delete dossier.codes[etape.id];
    dossier.modeles[etape.id] = modele;
    ecrireEtat();
  }
  const depart = dossier.codes[etape.id] ?? modele;

  const observateur = new IntersectionObserver(async (entrees, obs) => {
    if (!entrees.some((e) => e.isIntersecting)) return;
    obs.disconnect();
    editeur = await creerEditeur(hote, depart, (texte) => {
      dossier.codes[etape.id] = texte;
      ecrireEtat();
    });
  }, { rootMargin: "600px 0px" });
  observateur.observe(atelier);

  const attendreEditeur = async () => {
    if (!editeur) {
      observateur.disconnect();
      editeur = await creerEditeur(hote, depart, (texte) => {
        dossier.codes[etape.id] = texte;
        ecrireEtat();
      });
    }
    return editeur;
  };

  /* --- console */
  function ecrire(texte, etatConsole) {
    console_.textContent = texte;
    console_.dataset.etat = etatConsole || "";
    console_.scrollTop = console_.scrollHeight;
  }

  /* input() : le worker ne peut pas se mettre en pause pour attendre le clavier
     (SharedArrayBuffer indisponible sur GitHub Pages). Il rend la main, on
     réclame la saisie ici, puis le programme est rejoué avec les réponses. */
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

  const MAX_SAISIES = 60;

  /* Lance le programme, en redemandant le worker à chaque saisie réclamée.
     `tests` non nul → validation par assertions dans le même espace de noms. */
  async function lancer(code, tests) {
    const reponses = [];
    for (;;) {
      const r = tests ? await Python.valider(code, tests, reponses)
                      : await Python.executer(code, reponses);
      if (!r.ok) return r;

      if (r.besoin_entree) {
        if (reponses.length >= MAX_SAISIES) {
          return { ok: false, erreur: `Trop de saisies demandées (${MAX_SAISIES}). ` +
                                      "input() serait-il dans une boucle sans fin ?" };
        }
        ecrire(r.stdout || "", "saisie");
        reponses.push(await reclamerSaisie());
        continue;
      }
      return r;
    }
  }

  function verrouiller(actif) {
    [btnExec, btnValider, btnReset].forEach((b) => { b.disabled = actif; });
    // btnIndice a sa propre règle : il reste éteint quand tous les indices sont lus.
    if (actif) btnIndice.disabled = true; else afficherIndices();
  }

  btnExec.addEventListener("click", async () => {
    const ed = await attendreEditeur();
    verrouiller(true);
    zoneVerdict.textContent = "";
    ecrire("Démarrage de Python…", "attente");
    const r = await lancer(ed.lire(), null);
    verrouiller(false);
    if (!r.ok)         return ecrire(r.erreur, "erreur");
    if (r.erreur)      return ecrire((r.stdout || "") + r.erreur, "erreur");
    ecrire(r.stdout || "Programme terminé sans rien afficher.\n\nUtilise print() pour voir un résultat.",
           r.stdout ? "" : "vide");
  });

  btnValider.addEventListener("click", async () => {
    const ed = await attendreEditeur();
    verrouiller(true);
    zoneVerdict.textContent = "";
    ecrire("Vérification en cours…", "attente");

    const code = ed.lire();
    const bilan = await validerCode(etape, code, (tests) => lancer(code, tests));
    verrouiller(false);
    if (!bilan) return;

    const r = bilan.brut;
    if (r && r.ok && !r.erreur) {
      ecrire(r.stdout || "(ton programme n'a rien affiché)", r.stdout ? "" : "vide");
    } else if (r && !r.ok) {
      ecrire(r.erreur, "erreur");
    } else if (r && r.erreur) {
      ecrire((r.stdout || "") + r.erreur, "erreur");
    }

    s.essais++;
    ecrireEtat();
    afficherVerdict(bilan);

    if (bilan.reussi) {
      marquerReussie(def, etape, corps);
    } else if (etape.solution && (s.essais >= 3 || s.indices >= (etape.indices || []).length)) {
      // La correction n'apparaît qu'après un vrai effort.
      if (actions.btnCorr) actions.btnCorr.hidden = false;
    }
  });

  function afficherVerdict(bilan) {
    zoneVerdict.textContent = "";
    const boite = elem("div", "verdict");
    boite.dataset.issue = bilan.reussi ? "reussi" : "rate";

    const entete = elem("div", "entete");
    entete.textContent = bilan.reussi
      ? (etape.felicitation || "C'est juste ! 🎉")
      : "Pas encore.";
    boite.appendChild(entete);

    if (bilan.reussi) {
      if (etape.apres) {
        const suite = elem("div");
        suite.innerHTML = etape.apres;
        boite.appendChild(suite);
      }
    } else {
      const liste = elem("ul");
      for (const e of bilan.echecs) liste.appendChild(elem("li", null, e));
      boite.appendChild(liste);

      if (bilan.comparaison) {
        const comp = elem("div", "comparaison");
        for (const [libelle, valeur] of [["Attendu", bilan.comparaison.attendu],
                                         ["Ton programme affiche", bilan.comparaison.obtenu]]) {
          const c = elem("div");
          c.appendChild(elem("div", "libelle", libelle));
          c.appendChild(elem("pre", null, valeur));
          comp.appendChild(c);
        }
        boite.appendChild(comp);
      }

      if (s.essais >= 2 && (etape.indices || []).length > s.indices) {
        const relance = elem("p");
        relance.style.marginTop = ".6em";
        relance.style.marginBottom = "0";
        relance.innerHTML = "Bloqué ? Le bouton <strong>💡 Coup de pouce</strong> est là pour ça.";
        boite.appendChild(relance);
      }
    }
    zoneVerdict.appendChild(boite);
  }

  /* --- coups de pouce, révélés un par un */
  function afficherIndices() {
    zoneIndices.textContent = "";
    const indices = etape.indices || [];
    for (let i = 0; i < Math.min(s.indices, indices.length); i++) {
      const boite = elem("div", "indice");
      boite.innerHTML = `<span class="rang">Coup de pouce ${i + 1}</span>${indices[i]}`;
      zoneIndices.appendChild(boite);
    }
    const reste = indices.length - s.indices;
    btnIndice.hidden = indices.length === 0;
    btnIndice.textContent = reste > 0 ? `💡 Coup de pouce (${reste})` : "💡 Plus d'indice";
    btnIndice.disabled = reste <= 0;
    if (etape.solution && s.indices >= indices.length && actions.btnCorr) actions.btnCorr.hidden = false;
  }

  btnIndice.addEventListener("click", () => {
    s.indices = Math.min(s.indices + 1, (etape.indices || []).length);
    ecrireEtat();
    afficherIndices();
  });
  afficherIndices();

  btnReset.addEventListener("click", async () => {
    const ed = await attendreEditeur();
    ed.ecrire(etape.depart ?? "");
    ecrire("Code de départ rechargé.", "vide");
    zoneVerdict.textContent = "";
  });

  if (actions.btnCorr) {
    actions.btnCorr.addEventListener("click", async () => {
      const ed = await attendreEditeur();
      ed.ecrire(etape.solution);
      s.correction = true;
      ecrireEtat();
      ecrire("Correction chargée. Lis-la ligne à ligne, puis exécute-la.", "vide");
      toast("Correction chargée dans l'éditeur");
    });
  }

  if (s.reussi) {
    const rappel = elem("div", "verdict");
    rappel.dataset.issue = "reussi";
    rappel.innerHTML = `<div class="entete">✓ Étape déjà réussie</div>`;
    zoneVerdict.appendChild(rappel);
  }
}

/* ============================================== Panneau « Ma progression » */

function initPanneau() {
  const dlg = $("#panneau-progression");

  $("#btn-progression").addEventListener("click", () => {
    const total = Object.keys(CATALOGUE).reduce((s, id) => s + totalEtapes(id), 0);
    const faites = Object.keys(CATALOGUE).reduce((s, id) => s + Math.min(nbReussies(id), totalEtapes(id)), 0);
    $("#resume-progression").textContent =
      `${pluriel(faites, "étape validée", "étapes validées")} sur ${total}.`;
    $("#champ-prenom").value = etat.eleve?.prenom || "";
    $("#champ-code").value = "";
    dlg.showModal();
  });

  $("#champ-prenom").addEventListener("input", (ev) => {
    etat.eleve = { ...etat.eleve, prenom: ev.target.value.slice(0, 40) };
    ecrireEtat();
  });

  $("#btn-copier").addEventListener("click", async (ev) => {
    ev.preventDefault();
    const code = codeDeReprise();
    try {
      await navigator.clipboard.writeText(code);
      toast("Code de reprise copié");
    } catch {
      $("#champ-code").value = code;
      $("#champ-code").select();
      toast("Copie automatique refusée : sélectionne et copie le texte");
    }
  });

  $("#btn-telecharger").addEventListener("click", (ev) => {
    ev.preventDefault();
    const nom = (etat.eleve?.prenom || "eleve").normalize("NFD").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
    const lien = document.createElement("a");
    lien.href = URL.createObjectURL(new Blob([JSON.stringify(etat, null, 2)], { type: "application/json" }));
    lien.download = `progression-python-${nom}.json`;
    lien.click();
    setTimeout(() => URL.revokeObjectURL(lien.href), 5000);
    toast("Fichier téléchargé");
  });

  $("#btn-restaurer").addEventListener("click", (ev) => {
    ev.preventDefault();
    try {
      restaurer($("#champ-code").value);
      dlg.close();
      rendre();
      toast("Progression restaurée");
    } catch (e) {
      toast(e.message || "Code de reprise illisible");
    }
  });

  $("#btn-fermer-progression").addEventListener("click", (ev) => { ev.preventDefault(); dlg.close(); });
}

/* ======================================================================= Boot */

/* Le `user-select: none` de la feuille de style suffit à la souris ; ces deux
   garde-fous couvrent la sélection au clavier et le glisser-déposer. */
function interdireLaCopie() {
  const dansUneFigure = (noeud) => {
    const element = noeud && (noeud.nodeType === 1 ? noeud : noeud.parentElement);
    return !!(element && element.closest && element.closest(".sans-copie"));
  };

  document.addEventListener("copy", (ev) => {
    const selection = document.getSelection();
    if (!selection || selection.isCollapsed) return;
    if (dansUneFigure(selection.anchorNode) || dansUneFigure(selection.focusNode)) {
      ev.preventDefault();
      toast("Cette figure est à recopier à la main.");
    }
  });

  document.addEventListener("dragstart", (ev) => {
    if (dansUneFigure(ev.target)) ev.preventDefault();
  });
}

function rendre() {
  const r = route();
  if (r.vue === "seance") rendreSeance(r.id);
  else { seanceCourante = null; rendreHub(); }
  window.scrollTo({ top: 0 });
}

initTheme();
initPanneau();
interdireLaCopie();
window.addEventListener("hashchange", rendre);
rendre();
