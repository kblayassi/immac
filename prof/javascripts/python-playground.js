/* Playground Python — même architecture que editor-module.js :
   CodeMirror depuis le bundle local, exécution déléguée à un worker Pyodide. */
(async function () {
  const BASE = document.currentScript?.src || location.href;
  const BUNDLE_URL = new URL("./codemirror-bundle.js", BASE).href;
  const WORKER_URL = new URL("./pyodide-worker.js", BASE).href;

  let CM;
  try {
    CM = await import(BUNDLE_URL);
  } catch (e) {
    console.error("[python-playground] import bundle failed:", e);
    return;
  }

  const { EditorView, EditorState, basicSetup, indentUnit, keymap, indentMore, indentLess } = CM;
  const pythonLang = CM.python;

  if (!EditorView || !EditorState || !basicSetup) {
    console.error("[python-playground] exports CodeMirror manquants :", CM);
    return;
  }
  if (!pythonLang) {
    console.warn("[python-playground] python() absent du bundle : coloration desactivee.");
  }

  // ------------------ Helpers ------------------
  function decodeB64Utf8(b64) {
    if (!b64) return "";
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  }

  function safeJSONParse(s) {
    try { return JSON.parse(s); } catch { return null; }
  }

  // ------------------ Worker partagé ------------------
  // Un seul interpréteur pour toute la page : Pyodide pèse ~10 Mo, inutile de le
  // charger une fois par bloc. En revanche chaque exécution repart d'un espace
  // de noms neuf, donc les blocs restent indépendants.
  let worker = null;
  let compteur = 0;
  const enAttente = new Map();

  function creerWorker() {
    worker = new Worker(WORKER_URL);
    worker.onmessage = (event) => {
      const { id } = event.data || {};
      const resolveur = enAttente.get(id);
      if (!resolveur) return;
      enAttente.delete(id);
      resolveur(event.data);
    };
    worker.onerror = (e) => {
      console.error("[python-playground] worker:", e.message);
      for (const [id, resolveur] of enAttente) {
        resolveur({ id, ok: false, erreur: "Interpréteur Python indisponible." });
      }
      enAttente.clear();
    };
    return worker;
  }

  function redemarrerWorker() {
    if (worker) worker.terminate();
    for (const [id, resolveur] of enAttente) {
      resolveur({ id, ok: false, erreur: "Exécution interrompue." });
    }
    enAttente.clear();
    worker = null;
  }

  function demander(charge, delaiMs) {
    if (!worker) creerWorker();
    const id = ++compteur;
    return new Promise((resolve) => {
      let fini = false;
      const terminer = (reponse) => {
        if (fini) return;
        fini = true;
        clearTimeout(minuteur);
        resolve(reponse);
      };
      const minuteur = setTimeout(() => {
        // Le worker est bloqué (boucle infinie) : seul terminate() le libère.
        redemarrerWorker();
        terminer({
          ok: false,
          erreur: `Temps dépassé (${Math.round(delaiMs / 1000)} s). ` +
                  `Le programme tourne-t-il sans fin ? Vérifie la condition d'arrêt de tes boucles.`,
        });
      }, delaiMs);
      enAttente.set(id, terminer);
      worker.postMessage({ id, ...charge });
    });
  }

  // ------------------ Affichage ------------------
  function ecrireConsole(bloc, texte, etat) {
    const sortie = bloc.querySelector(".sortie");
    sortie.textContent = texte;
    sortie.dataset.etat = etat || "";
    sortie.scrollTop = sortie.scrollHeight;
  }

  /* input() : le worker ne peut pas se mettre en pause pour attendre le clavier.
     Il rend la main, on réclame la saisie ici, puis le programme est relancé avec
     les réponses déjà connues (voir _BesoinEntree côté worker). */
  function reclamerSaisie(bloc, invite) {
    return new Promise((resolve) => {
      const sortie = bloc.querySelector(".sortie");
      const champ = document.createElement("input");
      champ.type = "text";
      champ.className = "saisie";
      champ.autocomplete = "off";
      champ.spellcheck = false;
      champ.setAttribute("aria-label", invite || "Saisie attendue par le programme");
      sortie.appendChild(champ);
      sortie.scrollTop = sortie.scrollHeight;
      champ.focus();

      champ.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const valeur = champ.value;
        // La saisie devient du texte figé : la console garde la trace de l'échange.
        champ.replaceWith(document.createTextNode(valeur + "\n"));
        resolve(valeur);
      });
    });
  }

  /* Dernière ligne affichée : c'est l'invite écrite par input("..."). */
  function derniereLigne(texte) {
    const lignes = (texte || "").split("\n");
    return lignes[lignes.length - 1].trim();
  }

  function messageSansAffichage(fonctions) {
    if (fonctions && fonctions.length === 1) {
      const f = fonctions[0];
      return `Programme terminé sans rien afficher.\n\n` +
             `Tu as défini la fonction ${f}, mais tu ne l'appelles jamais : ` +
             `ajoute par exemple ${f}(3) à la fin de ton code pour la voir à l'œuvre.`;
    }
    if (fonctions && fonctions.length > 1) {
      return `Programme terminé sans rien afficher.\n\n` +
             `Tu as défini ${fonctions.join(", ")}, mais tu n'appelles aucune de ces ` +
             `fonctions : ajoute un appel à la fin de ton code.`;
    }
    return "Programme terminé sans rien afficher.\n\nUtilise print() pour voir un résultat.";
  }

  function afficherResultats(bloc, resultats, interrompu) {
    const panneau = bloc.querySelector(".panel-resultats");
    const liste = bloc.querySelector(".resultats");
    liste.textContent = "";

    for (const r of resultats) {
      const li = document.createElement("li");
      li.className = r.ok ? "reussi" : "echoue";
      const icone = document.createElement("i");
      icone.className = r.ok ? "fa-solid fa-check" : "fa-solid fa-xmark";
      li.append(icone, document.createTextNode(" " + r.libelle));
      if (!r.ok && r.detail) {
        const detail = document.createElement("pre");
        detail.className = "detail";
        detail.textContent = r.detail;
        li.appendChild(detail);
      }
      liste.appendChild(li);
    }

    const reussis = resultats.filter((r) => r.ok).length;
    const bilan = document.createElement("li");
    bilan.className = "bilan " + (reussis === resultats.length && !interrompu ? "reussi" : "echoue");
    bilan.textContent = interrompu
      ? `${reussis} test(s) réussi(s) — une erreur a interrompu la validation.`
      : reussis === resultats.length
        ? `Tout est bon : ${reussis} test(s) réussi(s) 🎉`
        : `${reussis} test(s) réussi(s) sur ${resultats.length}.`;
    liste.appendChild(bilan);

    panneau.hidden = false;
  }

  function occupe(bloc, actif) {
    bloc.querySelectorAll(".toolbar .btn").forEach((b) => { b.disabled = actif; });
    bloc.dataset.occupe = actif ? "1" : "";
  }

  // ------------------ Initialisation d'un bloc ------------------
  function initPlayground(bloc, index) {
    if (bloc.dataset.initialized === "1") return;
    bloc.dataset.initialized = "1";

    const hote = bloc.querySelector(".editor");
    if (!hote) return;

    const exemple = decodeB64Utf8(bloc.dataset.exampleB64 || "") ||
                    "# Modifie-moi 🙂\nprint(\"Bonjour !\")\n";
    const solution = bloc.dataset.solutionB64 ? decodeB64Utf8(bloc.dataset.solutionB64) : null;
    const tests = bloc.dataset.testsB64 ? decodeB64Utf8(bloc.dataset.testsB64) : null;
    const modules = bloc.dataset.modulesB64
      ? safeJSONParse(decodeB64Utf8(bloc.dataset.modulesB64)) || {}
      : {};
    const delaiMs = (parseInt(bloc.dataset.timeout, 10) || 15) * 1000;

    const cleStockage = bloc.dataset.storageKey || `python_editor:${location.pathname}:${index}`;
    const cleMeta = `${cleStockage}:meta`;
    const empreinte = bloc.dataset.exampleB64 || "";

    // Si l'énoncé a changé côté enseignant, on repart de l'exemple.
    const meta = safeJSONParse(localStorage.getItem(cleMeta) || "");
    let depart = localStorage.getItem(cleStockage) ?? exemple;
    if (!meta || meta.hash !== empreinte) {
      depart = exemple;
      localStorage.setItem(cleStockage, depart);
      localStorage.setItem(cleMeta, JSON.stringify({ hash: empreinte }));
    }

    const extensions = [
      basicSetup,
      EditorState.tabSize.of(4),
      indentUnit.of("    "), // PEP 8 : 4 espaces, pas de tabulation
      keymap.of([
        { key: "Tab", run: indentMore, preventDefault: true },
        { key: "Shift-Tab", run: indentLess, preventDefault: true },
      ]),
      EditorView.updateListener.of((u) => {
        if (u.docChanged) localStorage.setItem(cleStockage, u.state.doc.toString());
      }),
    ];
    if (pythonLang) extensions.splice(4, 0, pythonLang());

    const vue = new EditorView({
      parent: hote,
      state: EditorState.create({ doc: depart, extensions }),
    });

    const remplacer = (texte) => {
      vue.dispatch({ changes: { from: 0, to: vue.state.doc.length, insert: texte } });
      localStorage.setItem(cleStockage, texte);
    };

    const MAX_SAISIES = 100; // garde-fou : un input() dans une boucle infinie

    /* Exécute, et redemande le worker autant de fois que le programme réclame
       une saisie. Chaque relance rejoue le programme depuis le début, donc la
       console est simplement réécrite avec le transcript complet. */
    async function lancer(action) {
      const panneauResultats = bloc.querySelector(".panel-resultats");
      occupe(bloc, true);
      panneauResultats.hidden = true;
      ecrireConsole(bloc, action === "check" ? "Vérification en cours…" : "Démarrage de Python…",
                    "attente");

      const reponses = [];
      for (;;) {
        const r = await demander(
          { action, code: vue.state.doc.toString(), tests, reponses, modules },
          delaiMs
        );

        if (!r.ok) {
          occupe(bloc, false);
          return ecrireConsole(bloc, r.erreur, "erreur");
        }

        if (r.besoin_entree) {
          if (reponses.length >= MAX_SAISIES) {
            occupe(bloc, false);
            return ecrireConsole(
              bloc,
              (r.stdout || "") +
              `\n\nTrop de saisies demandées (${MAX_SAISIES}). ` +
              `Ton programme appelle-t-il input() dans une boucle sans fin ?`,
              "erreur"
            );
          }
          ecrireConsole(bloc, r.stdout || "", "saisie");
          reponses.push(await reclamerSaisie(bloc, derniereLigne(r.stdout)));
          continue;
        }

        occupe(bloc, false);

        if (r.erreur) {
          return ecrireConsole(bloc, (r.stdout || "") + r.erreur, "erreur");
        }

        if (action === "check") {
          ecrireConsole(bloc,
            r.stdout || "Aucun affichage direct : ce sont les tests qui ont analysé ton code.",
            r.stdout ? "" : "vide");
          afficherResultats(bloc, r.resultats || [], r.interrompu);
        } else {
          ecrireConsole(bloc,
            r.stdout || messageSansAffichage(r.fonctions),
            r.stdout ? "" : "vide");
        }
        return;
      }
    }

    const executer = () => lancer("run");
    const valider = () => lancer("check");

    bloc.querySelector('[data-action="run"]')?.addEventListener("click", executer);
    bloc.querySelector('[data-action="check"]')?.addEventListener("click", valider);

    bloc.querySelector('[data-action="clear"]')?.addEventListener("click", () => {
      remplacer("");
      ecrireConsole(bloc, "", "");
      bloc.querySelector(".panel-resultats").hidden = true;
    });

    bloc.querySelector('[data-action="example"]')?.addEventListener("click", () => {
      remplacer(exemple);
      localStorage.setItem(cleMeta, JSON.stringify({ hash: empreinte }));
      ecrireConsole(bloc, "", "");
      bloc.querySelector(".panel-resultats").hidden = true;
    });

    if (solution !== null) {
      const panneau = bloc.querySelector(".panel-correction");
      panneau.querySelector("code").textContent = solution;
      const bouton = bloc.querySelector('[data-action="solution"]');
      bouton?.addEventListener("click", () => {
        panneau.hidden = !panneau.hidden;
        bouton.classList.toggle("actif", !panneau.hidden);
      });
      panneau.querySelector('[data-action="load-solution"]')
             ?.addEventListener("click", () => remplacer(solution));
    }

    // Exécuter avec Ctrl/Cmd + Entrée
    hote.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (!bloc.dataset.occupe) executer();
      }
    });

    ecrireConsole(bloc, "Clique sur « Exécuter » pour lancer ton programme.", "vide");
  }

  // ------------------ Boot ------------------
  /* Une page d'exercices peut porter plusieurs dizaines d'éditeurs. Les créer
     tous au chargement bloquerait la page : on ne construit chaque éditeur
     qu'à l'approche de son entrée dans la fenêtre. */
  function boot() {
    const blocs = document.querySelectorAll("[data-python-playground]");

    if (typeof IntersectionObserver === "function") {
      const observateur = new IntersectionObserver((entrees, obs) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          obs.unobserve(entree.target);
          initPlayground(entree.target, entree.target.dataset.rang | 0);
        }
      }, { rootMargin: "400px 0px" });
      blocs.forEach((b, i) => { b.dataset.rang = i; observateur.observe(b); });
    } else {
      blocs.forEach((b, i) => initPlayground(b, i));
    }

    // Pyodide met quelques secondes à arriver : on le précharge dès qu'un bloc
    // est présent, pour que le premier « Exécuter » réponde tout de suite.
    if (blocs.length && !worker) demander({ action: "prechauffer" }, 120000);
  }

  if (window.document$?.subscribe) window.document$.subscribe(boot);
  else window.addEventListener("DOMContentLoaded", boot);

  boot();
})();
