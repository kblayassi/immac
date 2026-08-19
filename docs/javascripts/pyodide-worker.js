/* Worker d'exécution Python (Pyodide).
   Tourne hors du thread principal : une boucle infinie dans le code d'un élève
   fige le worker, pas la page. Le thread principal le termine au bout du délai. */

const PYODIDE_VERSION = "0.28.3";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodide = null;

/* Harnais Python : exécute le code de l'élève, capture les sorties,
   puis déroule les tests instruction par instruction pour un rapport détaillé. */
const HARNAIS = String.raw`
import ast, io, sys, traceback, json, types

FICHIER_ELEVE = "<votre code>"
FICHIER_TESTS = "<tests>"

class _BesoinEntree(BaseException):
    """Levee quand input() reclame une saisie que l'eleve n'a pas encore tapee.

    Sans SharedArrayBuffer (indisponible sur GitHub Pages), un worker ne peut pas
    se mettre en pause pour attendre le clavier. On interrompt donc l'execution,
    la page reclame la saisie, puis relance le programme depuis le debut avec les
    reponses deja connues : pour un script deterministe le resultat est identique.
    """

class _Clavier:
    """sys.stdin alimente par les reponses deja saisies."""
    def __init__(self, reponses):
        self._reponses = list(reponses or [])
        self._rang = 0

    def readline(self, *args):
        if self._rang >= len(self._reponses):
            raise _BesoinEntree()
        ligne = self._reponses[self._rang]
        self._rang += 1
        # Echo, comme dans un vrai terminal : la reponse fait partie du transcript,
        # donc elle survit aux relances qui suivent chaque nouvelle saisie.
        sys.stdout.write(ligne + "\n")
        return ligne + "\n"

    def read(self, *args):
        raise _BesoinEntree()

    def isatty(self):
        return False

def _trace(exc):
    """Trace d'erreur limitee aux lignes ecrites par l'eleve."""
    te = traceback.TracebackException.from_exception(exc)
    te.stack = traceback.StackSummary.from_list(
        [f for f in te.stack if f.filename in (FICHIER_ELEVE, FICHIER_TESTS)]
    )
    return "".join(te.format()).rstrip()

class _Sortie(io.StringIO):
    """Coupe court aux programmes qui inondent la console."""
    LIMITE = 200_000
    def write(self, s):
        if self.tell() > self.LIMITE:
            raise RuntimeError("Trop de texte affiche : le programme boucle-t-il ?")
        return super().write(s)

def _prepare(reponses):
    sortie = _Sortie()
    sys.stdout = sortie
    sys.stderr = sortie
    sys.stdin = _Clavier(reponses)
    return sortie

def _restaure():
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
    sys.stdin = sys.__stdin__

def _fonctions(espace):
    """Fonctions definies par l'eleve, pour aider quand rien ne s'affiche."""
    return [nom for nom, valeur in espace.items()
            if isinstance(valeur, types.FunctionType)
            and getattr(valeur, "__code__", None) is not None
            and valeur.__code__.co_filename == FICHIER_ELEVE]

def executer(code, reponses=None):
    sortie = _prepare(reponses)
    espace = {"__name__": "__main__"}
    erreur = None
    besoin = False
    try:
        exec(compile(code, FICHIER_ELEVE, "exec"), espace)
    except _BesoinEntree:
        besoin = True
    except BaseException as exc:
        erreur = _trace(exc)
    finally:
        texte = sortie.getvalue()
        _restaure()
    return json.dumps({"stdout": texte, "erreur": erreur,
                       "besoin_entree": besoin, "fonctions": _fonctions(espace)})

def _libelle(noeud, source):
    """Intitule lisible d'une assertion : son message si l'auteur en a mis un."""
    if isinstance(noeud, ast.Assert) and isinstance(noeud.msg, ast.Constant):
        if isinstance(noeud.msg.value, str) and noeud.msg.value.strip():
            return noeud.msg.value.strip()
    ligne = (source or "").strip().splitlines()[0] if source else ""
    return ligne or "assertion"

def valider(code, tests, reponses=None):
    sortie = _prepare(reponses)
    espace = {"__name__": "__main__"}

    try:
        exec(compile(code, FICHIER_ELEVE, "exec"), espace)
    except _BesoinEntree:
        texte = sortie.getvalue()
        _restaure()
        return json.dumps({"stdout": texte, "erreur": None, "resultats": [],
                           "besoin_entree": True})
    except BaseException as exc:
        message = _trace(exc)
        texte = sortie.getvalue()
        _restaure()
        return json.dumps({"stdout": texte, "erreur": message, "resultats": []})

    resultats = []
    fatale = None
    try:
        arbre = ast.parse(tests, FICHIER_TESTS)
    except SyntaxError as exc:
        _restaure()
        return json.dumps({"stdout": sortie.getvalue(),
                           "erreur": "Tests invalides : " + _trace(exc),
                           "resultats": []})

    for noeud in arbre.body:
        source = ast.get_source_segment(tests, noeud)
        libelle = _libelle(noeud, source)
        est_assertion = isinstance(noeud, ast.Assert)
        module = ast.Module(body=[noeud], type_ignores=[])
        try:
            exec(compile(module, FICHIER_TESTS, "exec"), espace)
            if est_assertion:
                resultats.append({"ok": True, "libelle": libelle})
        except _BesoinEntree:
            texte = sortie.getvalue()
            _restaure()
            return json.dumps({"stdout": texte, "erreur": None, "resultats": [],
                               "besoin_entree": True})
        except BaseException as exc:
            if isinstance(exc, AssertionError):
                detail = str(exc)
            else:
                detail = _trace(exc)
            # Inutile de repeter le message deja affiche comme intitule.
            if detail == libelle:
                detail = None
            # Un test qui echoue n'empeche pas les suivants ; en revanche une
            # instruction de preparation qui casse rend la suite ininterpretable.
            if not est_assertion:
                libelle = ("Impossible de tester ton code : il manque sans doute "
                           "une fonction ou une variable attendue par l'exercice.")
                fatale = True
            resultats.append({"ok": False, "libelle": libelle, "detail": detail or None})
            if fatale:
                break

    texte = sortie.getvalue()
    _restaure()
    return json.dumps({"stdout": texte, "erreur": None,
                       "resultats": resultats, "interrompu": bool(fatale)})
`;

async function demarrer() {
  if (pyodide) return pyodide;
  importScripts(PYODIDE_URL + "pyodide.js");
  pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  pyodide.runPython(HARNAIS);
  return pyodide;
}

self.onmessage = async (event) => {
  const { id, action, code, tests, reponses } = event.data || {};
  try {
    const py = await demarrer();
    if (action === "prechauffer") {
      self.postMessage({ id, ok: true, pret: true });
      return;
    }
    const fn = py.globals.get(action === "check" ? "valider" : "executer");
    const saisies = py.toPy(reponses || []);
    const brut = action === "check"
      ? fn(code, tests || "", saisies)
      : fn(code, saisies);
    saisies.destroy();
    fn.destroy();
    self.postMessage({ id, ok: true, ...JSON.parse(brut) });
  } catch (err) {
    self.postMessage({ id, ok: false, erreur: String(err && err.message || err) });
  }
};
