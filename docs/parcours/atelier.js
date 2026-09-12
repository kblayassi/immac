/* L'atelier : un interpréteur Python et un éditeur de code.
 *
 * Les deux applications du site s'en servent — les parcours interactifs
 * (docs/parcours/app.js) et les évaluations (docs/eval/eleve.js).
 * Ni l'une ni l'autre ne doit connaître le protocole du worker ni le montage
 * de CodeMirror : elles demandent un atelier et l'utilisent.
 *
 * Les adresses des deux ressources sont passées en paramètre, parce qu'elles se
 * calculent depuis la PAGE qui ouvre l'atelier, jamais depuis ce fichier-ci.
 */

/* ====================================================================== Python */

/* Un seul interpréteur pour toute l'application : Pyodide pèse ~10 Mo. Chaque
   exécution repart d'un espace de noms neuf, les étapes restent indépendantes. */
export function creerPython(urlWorker) {
  let worker = null;
  let compteur = 0;
  const enAttente = new Map();

  function creer() {
    worker = new Worker(urlWorker);
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
}

/* =================================================================== Éditeur */

/* Le bundle ne se charge qu'une fois pour toute la page, quelle que soit
   l'application qui le demande. */
let CM = null;
async function chargerCodeMirror(urlBundle) {
  if (!CM) CM = await import(urlBundle);
  return CM;
}

export async function creerEditeur(hote, depart, onChange, urlBundle, langage = "python") {
  const { EditorView, EditorState, basicSetup, indentUnit, keymap, indentMore, indentLess,
          python, html, css } = await chargerCodeMirror(urlBundle);

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

  // Sur un écran de téléphone, une ligne un peu longue sort du cadre par la
  // droite : l'élève ne voit plus la fin de ce qu'il écrit. On la replie.
  if (window.matchMedia("(max-width: 620px)").matches) extensions.push(EditorView.lineWrapping);

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


/* ============================================================ Exécuter avec input()

   Le worker ne peut pas se mettre en pause pour attendre le clavier
   (SharedArrayBuffer indisponible sur GitHub Pages). Quand le programme réclame
   une saisie, il rend la main ; on demande la réponse à l'élève, puis le
   programme est REJOUÉ depuis le début avec les réponses déjà connues. Pour un
   script déterministe le résultat est le même — d'où l'interdiction d'un
   `input()` et d'un `random` dans la même étape.

   `reclamerSaisie()` rend une promesse sur ce que tape l'élève ; `afficher()`
   reçoit la sortie produite jusque-là, pour qu'il voie la question posée avant
   de répondre. `tests` non nul → validation par assertions dans le même espace
   de noms que son programme. */
export async function executerAvecSaisies(python, code, {
  tests = null, reclamerSaisie, afficher = () => {}, maxSaisies = 60,
} = {}) {
  const reponses = [];
  for (;;) {
    const r = tests ? await python.valider(code, tests, reponses)
                    : await python.executer(code, reponses);
    if (!r.ok) return r;

    if (r.besoin_entree) {
      if (reponses.length >= maxSaisies) {
        return { ok: false, erreur: `Trop de saisies demandées (${maxSaisies}). ` +
                                    "input() serait-il dans une boucle sans fin ?" };
      }
      afficher(r.stdout || "");
      reponses.push(await reclamerSaisie());
      continue;
    }
    return r;
  }
}
