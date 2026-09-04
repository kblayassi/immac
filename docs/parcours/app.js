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

/* Le moteur est partagé par plusieurs parcours (SNT, NSI). Il ne se repère donc
   pas à sa propre adresse mais à celle de la PAGE qui le charge : les séances et
   la configuration se trouvent toujours à côté de l'index.html, jamais à côté
   de ce fichier. */
const PAGE = new URL(".", document.baseURI);
const URL_WORKER = new URL("../javascripts/pyodide-worker.js", PAGE).href;
const URL_BUNDLE = new URL("../javascripts/codemirror-bundle.js", PAGE).href;

const { PARCOURS, PALIERS, CATALOGUE } =
  await import(new URL("seances/manifeste.js", PAGE).href);

/* Un parcours n'enseigne pas forcément Python : le manifeste annonce son langage,
   et le moteur choisit l'atelier correspondant. « python » reste le défaut, donc
   les parcours existants ne changent pas d'un caractère. */
const LANGAGE = PARCOURS.langage || "python";

/* Version prof : le site complet (mkdocs-prof.yml) pose ce drapeau dans la page
   avant de charger le moteur. On y prépare une séance, on ne la suit pas : le
   parcours doit donc être ouvert d'un bout à l'autre, sans avoir à réussir les
   étapes une à une pour lire la suivante. */
const PROF = window.PARCOURS_PROF === true;

/* L'analyseur HTML/CSS ne sert qu'aux parcours web : on ne le charge que là.
   Il vit à côté de ce fichier, pas à côté de la page : import.meta.url. */
let VerifWeb = null;
async function chargerVerifWeb() {
  if (!VerifWeb) VerifWeb = await import(new URL("web-verif.js", import.meta.url).href);
  return VerifWeb;
}

/* Fabrique l'archive ZIP du bouton « Télécharger mon site ». */
let Archive = null;
async function chargerArchive() {
  if (!Archive) Archive = await import(new URL("archive.js", import.meta.url).href);
  return Archive;
}

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

/* Comparaison indulgente, pour juger une réponse et non une frappe : ni la casse
   ni l'espacement ne sont l'objet des exercices. « Total :30 », « total : 30 » et
   « TOTAL:  30 » sont la même réponse.

   Un espace reste exigé entre deux caractères alphanumériques : sans cela
   « 1 2 3 » et « 123 » deviendraient identiques, et là c'est bien la réponse qui
   change — print(a, b, c) ne fait pas la même chose que print(str(a) + str(b)). */
function comparable(texte) {
  return normaliser(texte)
    .toLowerCase()
    .replace(/[ \t]+/g, " ")
    .replace(/ ?([^\p{L}\p{N} \n]) ?/gu, "$1");
}

/* …sauf quand l'espacement EST l'exercice. Une sortie attendue qui indente une
   ligne ou aligne des colonnes dessine une figure ou dresse un tableau : sapin,
   losange, cadre, table de vérité, histogramme. Là, un espace de trop est une
   faute, et la comparaison redevient exacte. Onze étapes sont dans ce cas ;
   `sortieStricte` permet de le forcer pour les autres. */
const SORTIE_MISE_EN_FORME = /^[ \t]|[ \t]{2,}/m;

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

const CLE = `${PARCOURS.cle}:v1`;

/* Forme stockée :
   { version, eleve:{nom,prenom}, seances:{ s01:{ etapes:{ e1:{reussi,essais,indices,correction} },
                                              codes:{ e1:"..." } } } } */
function structureVide() {
  return { version: 1, eleve: { nom: "", prenom: "" }, seances: {} };
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

/* La progression s'échange par un fichier .json : c'est le seul geste qu'un élève
   puisse faire de façon fiable d'un poste à l'autre. */
function restaurer(json) {
  const lu = JSON.parse(json);
  if (!lu || typeof lu !== "object" || !lu.seances) {
    throw new Error("Ce fichier ne contient pas une progression.");
  }
  etat = { ...structureVide(), ...lu };
  ecrireEtat();
}

/* ======================================================================= Thème */

const CLE_THEME = "parcours:theme";

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

async function creerEditeur(hote, depart, onChange, langage = "python") {
  const { EditorView, EditorState, basicSetup, indentUnit, keymap, indentMore, indentLess,
          python, html, css } = await chargerCodeMirror();

  // Deux espaces en HTML/CSS, quatre en Python : ce sont les usages de chaque langage.
  const tabulation = langage === "python" ? "    " : "  ";

  const extensions = [
    basicSetup,
    EditorState.tabSize.of(tabulation.length),
    indentUnit.of(tabulation),
    keymap.of([
      { key: "Tab", run: indentMore, preventDefault: true },
      { key: "Shift-Tab", run: indentLess, preventDefault: true },
    ]),
    EditorView.updateListener.of((u) => { if (u.docChanged) onChange(u.state.doc.toString()); }),
  ];
  const coloration = { python, html, css }[langage];
  if (coloration) extensions.splice(4, 0, coloration());

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
  if (v.sortie != null) {
    const attendu = normaliser(v.sortie);
    const strict = v.sortieStricte ?? SORTIE_MISE_EN_FORME.test(attendu);
    const juste = strict ? sortie === attendu : comparable(sortie) === comparable(attendu);
    if (!juste) {
      return {
        reussi: false,
        echecs: ["La sortie de ton programme n'est pas celle attendue."],
        // La comparaison montre les deux textes tels quels : c'est la différence
        // réelle qu'il faut lire, pas celle que le jugement a bien voulu ignorer.
        comparaison: { attendu, obtenu: sortie || "(rien)" },
        brut: r,
      };
    }
  }
  for (const fragment of v.sortieContient || []) {
    if (!comparable(sortie).includes(comparable(fragment))) {
      echecs.push(`Il manque « ${fragment} » dans ce que ton programme affiche.`);
    }
  }
  // Le motif est écrit par l'enseignant : lui seul sait si un espace y compte,
  // et plusieurs motifs disent déjà \s+. La casse, elle, ne compte jamais.
  if (v.sortieRegex && !new RegExp(v.sortieRegex, v.sortieRegexOptions ?? "i").test(sortie)) {
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
  $("#barre-titre").textContent = PARCOURS.titre;
  majRetour("hub");

  const total = Object.keys(CATALOGUE).reduce((s, id) => s + totalEtapes(id), 0);
  const faites = Object.keys(CATALOGUE).reduce((s, id) => s + Math.min(nbReussies(id), totalEtapes(id)), 0);
  majJauge($("#jauge-barre"), faites, total);
  $("#compteur-barre").textContent = total ? `${Math.round((faites / total) * 100)} %` : "";

  const chapeau = elem("div", "chapeau");
  chapeau.innerHTML = `
    <div class="sur-titre">${PARCOURS.surTitre}</div>
    <h1>${PARCOURS.h1}</h1>
    <p class="accroche">${PARCOURS.accroche}</p>`;
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

/* Un seul bouton de retour, dont la destination suit la vue : on ne se retrouve
   jamais coincé dans une séance sans savoir comment en sortir. */
function majRetour(vue) {
  const lien = $("#lien-retour");
  const libelle = lien.querySelector(".libelle-retour");
  if (vue === "seance") {
    lien.href = "#/";
    libelle.textContent = "Toutes les séances";
    lien.title = "Revenir à la liste des séances";
  } else {
    lien.href = PARCOURS.retour.href;
    libelle.textContent = PARCOURS.retour.libelle;
    lien.title = PARCOURS.retour.titre || "Revenir au site du cours";
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
    def = (await import(new URL(`seances/${id}.js`, PAGE).href)).default;
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

  majRetour("seance");
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

  // Séance « projet » : on annonce à l'élève le niveau d'étayage qu'il va recevoir.
  if (def.adaptatif) {
    const niveau = niveauAide(def.id);
    const info = NIVEAUX_AIDE[niveau];
    const bandeau = elem("div", "bandeau-aide");
    bandeau.dataset.niveau = niveau;
    bandeau.innerHTML =
      `<span class="etiquette">Accompagnement : ${info.libelle}</span><p>${info.texte}</p>`;
    vue.appendChild(bandeau);
  }

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
  if (LANGAGE !== "web") Python.prechauffer();
}

/* -------------------------------------------------------- Verrous et jauges */

function rafraichirVerrous() {
  if (!seanceCourante) return;
  const { def, id } = seanceCourante;

  // Le parcours est linéaire d'un bout à l'autre : chaque étape réussie ouvre la
  // suivante, et les défis n'apparaissent qu'une fois les exercices terminés.
  // C'est ce qui garantit qu'aucune notion n'est rencontrée avant d'être vue.
  // En version prof, rien ne se verrouille : les étapes à venir sont « ouvertes »,
  // lisibles et jouables tout de suite. La première non réussie reste marquée
  // « actif », pour garder le repère de là où on en est.
  let ouvert = true;
  for (const partie of def.parties) {
    for (const etape of partie.etapes) {
      const noeud = document.getElementById(`etape-${etape.id}`);
      if (!noeud) continue;
      const s = suivi(id, etape.id);

      if (s.reussi) noeud.dataset.etat = "reussi";
      else if (ouvert) { noeud.dataset.etat = "actif"; ouvert = false; }
      else noeud.dataset.etat = PROF ? "ouvert" : "verrouille";
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
  // Le projet final décline ses consignes selon le niveau d'accompagnement.
  if (etape.variantes) etape = appliquerNiveau(etape, niveauAide(def.id));

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
  else if (etape.type === "code")        (etape.fichiers ? monterCodeWeb : monterCode)(def, etape, corps);

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

/* Le pavé de réussite ou d'échec, commun aux deux ateliers (Python et web). */
function construireVerdict(etape, s, bilan) {
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
    return boite;
  }

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
  return boite;
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
  // La correction n'existe que dans la version prof, et elle y est là d'emblée.
  // Côté élève, l'aide s'arrête aux coups de pouce : le bouton n'est pas caché,
  // il n'est pas construit — et le champ `solution` a de toute façon été retiré
  // du fichier de séance à la construction (plugins/version_eleve.py).
  if (PROF && etape.solution) {
    const btnCorr = elem("button", "bouton fantome", "Correction");
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

    if (bilan.reussi) marquerReussie(def, etape, corps);
  });

  function afficherVerdict(bilan) {
    zoneVerdict.textContent = "";
    zoneVerdict.appendChild(construireVerdict(etape, s, bilan));
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

/* ================================================== Accompagnement adaptatif

   Le projet final est le même pour tout le monde : c'est l'échafaudage autour
   qui change. Le moteur lit ce qui est déjà enregistré (réussites du premier
   coup, coups de pouce ouverts) et choisit le niveau d'étayage. L'enseignant
   peut le forcer en ajoutant ?aide=pas-a-pas à l'adresse du parcours. */

const NIVEAUX_AIDE = {
  "pas-a-pas": {
    libelle: "Pas à pas",
    texte: `Le projet est découpé en petites étapes, avec un squelette de page déjà
            commencé : tu remplis les trous. Prends ton temps, tout est indiqué.`,
  },
  "reperes": {
    libelle: "Avec repères",
    texte: `Tu as le cahier des charges et, pour chaque page, la liste des balises
            attendues. La mise en place, c'est toi qui la fais.`,
  },
  "autonome": {
    libelle: "En autonomie",
    texte: `Tu as le cahier des charges, et rien d'autre : tes trois premières séances
            montrent que tu n'en as pas besoin. Les coups de pouce restent disponibles
            si tu changes d'avis.`,
  },
};

const ORDRE_AIDE = ["pas-a-pas", "reperes", "autonome"];

/* Le profil ne regarde jamais la séance en cours : le niveau ne doit pas changer
   sous les pieds de l'élève pendant qu'il travaille. */
function niveauAide(idSeanceExclue) {
  const force = new URLSearchParams(location.search).get("aide");
  if (NIVEAUX_AIDE[force]) return force;

  let tentees = 0, premierCoup = 0, aides = 0;
  for (const [id, dossier] of Object.entries(etat.seances || {})) {
    if (id === idSeanceExclue) continue;
    for (const s of Object.values(dossier.etapes || {})) {
      if (!s.essais) continue;                 // une étape de cours ne dit rien du niveau
      tentees++;
      if (s.reussi && s.essais === 1) premierCoup++;
      aides += (s.indices || 0) + (s.correction ? 2 : 0);
    }
  }
  if (tentees < 5) return "reperes";           // trop peu de matière pour trancher

  const taux = premierCoup / tentees;
  const etayage = aides / tentees;
  if (taux >= 0.8 && etayage <= 0.25) return "autonome";
  if (taux < 0.5 || etayage >= 1) return "pas-a-pas";
  return "reperes";
}

/* Une étape peut décliner son énoncé, son code de départ et ses indices selon le
   niveau. La VALIDATION, elle, ne varie jamais : l'exigence est la même pour tous. */
function appliquerNiveau(etape, niveau) {
  if (!etape.variantes) return etape;
  // Si le niveau demandé n'est pas déclaré, on se rabat d'abord vers PLUS
  // d'accompagnement — jamais vers moins : mieux vaut trop d'aide que pas assez.
  const depart = ORDRE_AIDE.indexOf(niveau);
  const ordreDeRepli = [
    ...ORDRE_AIDE.slice(0, depart + 1).reverse(),
    ...ORDRE_AIDE.slice(depart + 1),
  ];
  for (const candidat of ordreDeRepli) {
    const variante = etape.variantes[candidat];
    if (variante) return { ...etape, ...variante, validation: etape.validation };
  }
  return etape;
}

/* ------------------------------------------------- Étape : code HTML / CSS

   Même squelette que l'atelier Python, avec trois différences :
   · plusieurs fichiers, en onglets ;
   · pas de console mais un aperçu réel, rafraîchi pendant la frappe ;
   · les liens de l'aperçu naviguent entre les pages du mini-site.

   L'aperçu est une iframe `sandbox="allow-scripts"`, donc d'origine opaque :
   la page de l'élève ne peut ni lire ni écrire quoi que ce soit du parcours. */

const APERCUS = new Map();                     // jeton d'iframe → routeur de liens

window.addEventListener("message", (ev) => {
  const message = ev.data;
  if (!message || !message.parcoursApercu) return;
  const naviguer = APERCUS.get(message.parcoursApercu);
  if (naviguer) naviguer(String(message.href || ""));
});

/* Injecté en fin d'aperçu.
   · Un lien interne ne doit pas emporter la page du parcours : on le remonte au
     parent, qui change l'aperçu de page.
   · Un lien externe, lui, s'ouvre NATIVEMENT dans un nouvel onglet. Passer par le
     parent ferait perdre le geste de l'élève, et le navigateur bloquerait alors
     l'ouverture comme une fenêtre surgissante. D'où `allow-popups` sur l'iframe. */
const SCRIPT_LIENS = `
<script>
(function () {
  function externe(href) { return /^(https?:)?\/\//i.test(href) || /^mailto:/i.test(href); }

  function preparer() {
    var liens = document.getElementsByTagName("a");
    for (var i = 0; i < liens.length; i++) {
      if (externe(liens[i].getAttribute("href") || "")) {
        liens[i].target = "_blank";
        liens[i].rel = "noopener";
      }
    }
  }
  preparer();
  document.addEventListener("DOMContentLoaded", preparer);

  document.addEventListener("click", function (ev) {
    var noeud = ev.target;
    while (noeud && noeud.nodeName !== "A") noeud = noeud.parentNode;
    if (!noeud) return;
    var href = noeud.getAttribute("href") || "";
    if (externe(href) || href.charAt(0) === "#") return;   // le navigateur s'en charge
    ev.preventDefault();
    parent.postMessage({ parcoursApercu: "@JETON@", href: href }, "*");
  }, true);
}());
<\/script>`;

function monterCodeWeb(def, etape, corps) {
  const s = suivi(def.id, etape.id);
  const dossier = dossierSeance(def.id);
  const fichiers = etape.fichiers;
  const jeton = `${def.id}-${etape.id}-${Math.random().toString(36).slice(2, 8)}`;

  /* --- les sources, reprises du brouillon si l'énoncé n'a pas bougé */
  const modele = JSON.stringify(fichiers.map((f) => [f.nom, f.depart ?? ""]));
  dossier.modeles ||= {};
  if (dossier.modeles[etape.id] !== modele) {
    delete dossier.codes[etape.id];
    dossier.modeles[etape.id] = modele;
    ecrireEtat();
  }
  /* `reprend` désigne l'étape dont il faut repartir : dans un projet en plusieurs
     temps, l'élève ne doit pas réécrire son site à chaque étape. On ne reprend
     que tant qu'il n'a rien tapé ici — sinon on écraserait son travail. */
  const heritage = () => (etape.reprend ? dossier.codes[etape.reprend] : null);

  const source = {};
  function semer() {
    const brouillon = dossier.codes[etape.id];
    const repris = brouillon ? null : heritage();
    for (const f of fichiers) {
      const garde = brouillon && typeof brouillon === "object" ? brouillon[f.nom] : null;
      const herite = repris && typeof repris === "object" ? repris[f.nom] : null;
      source[f.nom] = garde != null ? garde : (herite != null ? herite : (f.depart ?? ""));
    }
    return !!repris;
  }
  semer();
  const pages = fichiers.map((f) => f.nom).filter((n) => /\.html?$/i.test(n));
  let pageCourante = source[etape.apercu] != null ? etape.apercu : (pages[0] || fichiers[0].nom);

  /* --- squelette */
  const atelier = elem("div", "atelier atelier-web");
  const onglets = elem("div", "atelier-onglets");
  atelier.appendChild(onglets);

  const double = elem("div", "atelier-double");
  const colonneCode = elem("div", "colonne-code");
  const colonneVue = elem("div", "colonne-apercu");
  double.append(colonneCode, colonneVue);
  atelier.appendChild(double);

  const barreApercu = elem("div", "apercu-barre");
  const titreApercu = elem("span", "apercu-page", pageCourante);
  barreApercu.append(elem("span", "apercu-libelle", "Aperçu"), titreApercu);
  const cadre = document.createElement("iframe");
  cadre.className = "apercu-cadre";
  // Pas de `allow-same-origin` : la page de l'élève ne peut rien lire du parcours.
  // `allow-popups` laisse ses liens externes s'ouvrir vraiment, et l'onglet ouvert
  // sort du bac à sable pour que le site de destination fonctionne normalement.
  cadre.setAttribute("sandbox", "allow-scripts allow-popups allow-popups-to-escape-sandbox");
  cadre.setAttribute("title", "Aperçu de ta page");
  colonneVue.append(barreApercu, cadre);

  const actions = elem("div", "atelier-actions");
  const btnExec = elem("button", "bouton fantome", "▶ Rafraîchir");
  const btnValider = elem("button", "bouton vert", "✓ Valider");
  const espace = elem("span", "espace");
  const btnIndice = elem("button", "bouton fantome", "💡 Coup de pouce");
  const btnReset = elem("button", "bouton fantome icone", "↺");
  btnReset.title = "Revenir au code de départ";
  actions.append(btnExec, btnValider, espace, btnIndice, btnReset);
  if (etape.reprend) {
    const btnReprendre = elem("button", "bouton fantome", "↩ Reprendre mon site");
    btnReprendre.title = "Recopier ici le travail de l'étape précédente";
    actions.insertBefore(btnReprendre, btnIndice);
    actions.btnReprendre = btnReprendre;
  }
  if (etape.telechargeable) {
    const btnZip = elem("button", "bouton fantome", "⬇ Télécharger mon site");
    btnZip.title = "Enregistrer les fichiers de ton site dans une archive ZIP";
    actions.insertBefore(btnZip, btnIndice);
    actions.btnZip = btnZip;
  }
  // La correction n'existe que dans la version prof, et elle y est là d'emblée.
  // Côté élève, l'aide s'arrête aux coups de pouce : le bouton n'est pas caché,
  // il n'est pas construit — et le champ `solution` a de toute façon été retiré
  // du fichier de séance à la construction (plugins/version_eleve.py).
  if (PROF && etape.solution) {
    const btnCorr = elem("button", "bouton fantome", "Correction");
    actions.appendChild(btnCorr);
    atelier.dataset.avecCorrection = "1";
    actions.btnCorr = btnCorr;
  }
  atelier.appendChild(actions);

  const journal_ = elem("pre", "console");
  journal_.dataset.etat = "vide";
  journal_.textContent = "L'aperçu se met à jour tout seul pendant que tu écris.";
  atelier.appendChild(journal_);

  corps.appendChild(atelier);
  const zoneIndices = elem("div", "indices");
  const zoneVerdict = elem("div");
  corps.append(zoneIndices, zoneVerdict);

  function journal(texte, etatJournal) {
    journal_.textContent = texte;
    journal_.dataset.etat = etatJournal || "";
  }

  /* --- onglets et éditeurs */
  const hotes = {};
  const editeurs = {};
  let actif = fichiers[0].nom;

  for (const f of fichiers) {
    const hote = elem("div", "hote-editeur");
    hote.hidden = f.nom !== actif;
    hotes[f.nom] = hote;
    colonneCode.appendChild(hote);

    const onglet = elem("button", "onglet", f.nom);
    onglet.type = "button";
    onglet.dataset.actif = f.nom === actif ? "1" : "";
    onglet.addEventListener("click", () => choisirFichier(f.nom));
    onglets.appendChild(onglet);
  }

  function choisirFichier(nom) {
    actif = nom;
    for (const f of fichiers) hotes[f.nom].hidden = f.nom !== nom;
    Array.from(onglets.children).forEach((b, i) => {
      b.dataset.actif = fichiers[i].nom === nom ? "1" : "";
    });
    // Un éditeur créé dans un onglet masqué s'est mesuré à zéro : il faut le lui
    // redemander au moment où il devient visible, sinon le curseur tombe à côté.
    if (editeurs[nom]) { editeurs[nom].vue.requestMeasure(); editeurs[nom].vue.focus(); }
  }

  let prets = false;
  async function preparerEditeurs() {
    if (prets) return;
    prets = true;
    // L'étape précédente a pu être terminée depuis la construction de celle-ci.
    if (semer()) { rafraichirApercu(); journal("Ton travail de l'étape précédente a été repris.", ""); }
    for (const f of fichiers) {
      editeurs[f.nom] = await creerEditeur(hotes[f.nom], source[f.nom], (texte) => {
        source[f.nom] = texte;
        dossier.codes[etape.id] = { ...source };
        ecrireEtat();
        programmerApercu();
      }, /\.css$/i.test(f.nom) ? "css" : "html");
    }
  }

  const observateur = new IntersectionObserver((entrees, obs) => {
    if (!entrees.some((e) => e.isIntersecting)) return;
    obs.disconnect();
    preparerEditeurs();
  }, { rootMargin: "600px 0px" });
  observateur.observe(atelier);

  const attendreEditeurs = async () => { observateur.disconnect(); await preparerEditeurs(); };

  /* --- l'aperçu

     Les <link rel="stylesheet"> sont remplacés par le contenu du fichier CSS de
     l'atelier : c'est ce qui permet à l'élève d'écrire un vrai site en plusieurs
     fichiers alors que l'iframe n'en reçoit qu'un seul. */
  function assembler(nom) {
    let html = source[nom] ?? "";
    html = html.replace(/<link\b[^>]*>/gi, (balise) => {
      const trouve = /href\s*=\s*["']([^"']+)["']/i.exec(balise);
      const cible = trouve ? trouve[1].replace(/^\.\//, "") : null;
      return cible != null && source[cible] != null ? `<style>\n${source[cible]}\n</style>` : balise;
    });
    const script = SCRIPT_LIENS.replace("@JETON@", jeton);
    return /<\/body>/i.test(html) ? html.replace(/<\/body>/i, script + "</body>") : html + script;
  }

  let minuteurApercu;
  function programmerApercu() {
    clearTimeout(minuteurApercu);
    minuteurApercu = setTimeout(rafraichirApercu, 450);
  }
  function rafraichirApercu() {
    clearTimeout(minuteurApercu);
    if (source[pageCourante] == null) pageCourante = pages[0] || fichiers[0].nom;
    titreApercu.textContent = pageCourante;
    cadre.srcdoc = assembler(pageCourante);
  }

  /* N'arrivent ici que les liens internes : les externes sont partis tout seuls. */
  APERCUS.set(jeton, (href) => {
    const brut = href.trim();
    if (!brut) return;
    const cible = brut.replace(/^\.\//, "").split("#")[0];

    if (source[cible] != null && /\.html?$/i.test(cible)) {
      pageCourante = cible;
      rafraichirApercu();
      return journal(`Le lien fonctionne : tu es maintenant sur ${cible}.`, "");
    }
    // Faute classique : une adresse de site écrite sans son protocole. Le navigateur
    // la prend alors pour un nom de fichier voisin, et le lien ne mène nulle part.
    if (/^[\w-]+(\.[\w-]+)+(\/|$)/.test(brut) && !/\.html?$/i.test(cible)) {
      return journal(`« ${brut} » ressemble à une adresse de site, mais il lui manque ` +
                     `le protocole : écris https://${brut}`, "erreur");
    }
    journal(`Le lien « ${brut} » ne mène à aucune page de ton site.\n` +
            `Les pages disponibles ici sont : ${pages.join(", ")}.`, "erreur");
  });

  rafraichirApercu();

  /* --- boutons */
  function verrouiller(occupe) {
    [btnExec, btnValider, btnReset].forEach((b) => { b.disabled = occupe; });
    if (occupe) btnIndice.disabled = true; else afficherIndices();
  }

  btnExec.addEventListener("click", async () => {
    await attendreEditeurs();
    rafraichirApercu();
    journal("Aperçu rafraîchi.", "");
  });

  btnValider.addEventListener("click", async () => {
    await attendreEditeurs();
    verrouiller(true);
    zoneVerdict.textContent = "";
    journal("Vérification en cours…", "attente");

    const V = await chargerVerifWeb();
    const bilan = V.validerWeb(etape, { ...source });
    rafraichirApercu();
    verrouiller(false);

    s.essais++;
    ecrireEtat();
    journal(bilan.reussi
      ? "Ta page est conforme à la consigne."
      : "Il reste quelque chose à corriger — le détail est juste en dessous.",
      bilan.reussi ? "" : "erreur");
    zoneVerdict.appendChild(construireVerdict(etape, s, bilan));

    if (bilan.reussi) marquerReussie(def, etape, corps);
  });

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
  }

  btnIndice.addEventListener("click", () => {
    s.indices = Math.min(s.indices + 1, (etape.indices || []).length);
    ecrireEtat();
    afficherIndices();
  });
  afficherIndices();

  btnReset.addEventListener("click", async () => {
    await attendreEditeurs();
    for (const f of fichiers) editeurs[f.nom].ecrire(f.depart ?? "");
    rafraichirApercu();
    zoneVerdict.textContent = "";
    journal("Code de départ rechargé.", "vide");
  });

  if (actions.btnZip) {
    actions.btnZip.addEventListener("click", async () => {
      await attendreEditeurs();
      const { creerZip, nomDeRendu, telecharger } = await chargerArchive();
      const rendu = nomDeRendu(etat.eleve?.nom, etat.eleve?.prenom);
      if (!rendu) {
        journal("Avant de télécharger, indique ton nom et ton prénom dans le menu ☰, " +
                "en haut à droite : c'est ce qui donne son nom à l'archive.", "erreur");
        toast("Renseigne ton nom et ton prénom");
        return $("#btn-progression").click();
      }
      telecharger(creerZip({ ...source }), `${rendu}.zip`);
      journal(`Archive ${rendu}.zip téléchargée : elle contient tes ${fichiers.length} fichiers.\n` +
              "Décompresse-la, puis double-clique sur index.html : ton site s'ouvre.", "");
      toast("Site téléchargé");
    });
  }

  if (actions.btnReprendre) {
    actions.btnReprendre.addEventListener("click", async () => {
      await attendreEditeurs();
      const repris = heritage();
      if (!repris || typeof repris !== "object") {
        return journal("Rien à reprendre : l'étape précédente n'a pas encore été travaillée.", "erreur");
      }
      for (const f of fichiers) {
        if (repris[f.nom] != null) editeurs[f.nom].ecrire(repris[f.nom]);
      }
      rafraichirApercu();
      journal("Ton travail de l'étape précédente a été recopié ici.", "");
    });
  }

  if (actions.btnCorr) {
    actions.btnCorr.addEventListener("click", async () => {
      await attendreEditeurs();
      for (const f of fichiers) {
        if (etape.solution[f.nom] != null) editeurs[f.nom].ecrire(etape.solution[f.nom]);
      }
      s.correction = true;
      ecrireEtat();
      rafraichirApercu();
      journal("Correction chargée. Lis-la balise par balise, puis compare avec ce que tu avais écrit.", "vide");
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
    if ($("#champ-nom")) $("#champ-nom").value = etat.eleve?.nom || "";
    dlg.showModal();
  });

  $("#champ-prenom").addEventListener("input", (ev) => {
    etat.eleve = { ...etat.eleve, prenom: ev.target.value.slice(0, 40) };
    ecrireEtat();
  });

  // Ce champ n'existe que dans les parcours qui demandent un rendu nommé.
  if ($("#champ-nom")) {
    $("#champ-nom").addEventListener("input", (ev) => {
      etat.eleve = { ...etat.eleve, nom: ev.target.value.slice(0, 40) };
      ecrireEtat();
    });
  }

  $("#btn-telecharger").addEventListener("click", async (ev) => {
    ev.preventDefault();
    const { nomDeRendu, telecharger } = await chargerArchive();
    const rendu = nomDeRendu(etat.eleve?.nom, etat.eleve?.prenom) || "eleve";
    telecharger(new Blob([JSON.stringify(etat, null, 2)], { type: "application/json" }),
                `${PARCOURS.cle}-${rendu}.json`);
    toast("Fichier téléchargé");
  });

  $("#champ-fichier").addEventListener("change", async (ev) => {
    const fichier = ev.target.files && ev.target.files[0];
    if (!fichier) return;
    ev.target.value = "";                       // permet de redéposer le même fichier
    if (!confirm("Remplacer la progression enregistrée sur cet ordinateur par celle du fichier ?")) return;
    try {
      restaurer(await fichier.text());
      dlg.close();
      rendre();
      toast("Progression restaurée");
    } catch (e) {
      toast(e.message || "Fichier illisible");
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
