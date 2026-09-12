"""Exécute un programme d'élève et rend le même verdict que le worker Pyodide.

Le banc d'essai des barèmes (verifier_bareme.mjs) tourne sous Node, hors
navigateur : il n'a ni Pyodide ni worker. Ce script tient le même rôle, avec le
Python de la machine.

    echo '{"code": "...", "tests": "...", "saisies": ["12"]}' | python3 executeur.py

Il rend, sur la sortie standard, la même forme que le worker :

    {"ok": true, "stdout": "...", "erreur": null,
     "resultats": [{"ok": true, "libelle": "assert f(3) == 6"}]}

Ce n'est pas le même interpréteur que celui des élèves — c'est celui-ci qui
tranche au banc, Pyodide qui tranche en classe. Les écarts possibles tiennent à
la version de Python ; pour du code de première NSI, ils sont sans objet.
"""

import ast
import io
import json
import sys
import traceback

FICHIER_ELEVE = "<votre code>"
FICHIER_TESTS = "<tests>"


def _trace(exc):
    """Trace limitée aux lignes écrites par l'élève, comme dans le worker."""
    te = traceback.TracebackException.from_exception(exc)
    te.stack = traceback.StackSummary.from_list(
        [f for f in te.stack if f.filename in (FICHIER_ELEVE, FICHIER_TESTS)]
    )
    return "".join(te.format()).rstrip()


def _libelle(noeud, source):
    return source.strip() if source else "test"


def executer(code, tests, saisies):
    sortie = io.StringIO()
    espace = {"__name__": "__main__"}
    stdin_origine, stdout_origine = sys.stdin, sys.stdout
    sys.stdin = io.StringIO("\n".join(saisies or []) + "\n")
    sys.stdout = sortie

    try:
        exec(compile(code, FICHIER_ELEVE, "exec"), espace)
    except BaseException as exc:                     # noqa: BLE001
        sys.stdin, sys.stdout = stdin_origine, stdout_origine
        return {"ok": True, "stdout": sortie.getvalue(),
                "erreur": _trace(exc), "resultats": []}

    resultats = []
    if tests:
        try:
            arbre = ast.parse(tests, FICHIER_TESTS)
        except SyntaxError as exc:
            sys.stdin, sys.stdout = stdin_origine, stdout_origine
            return {"ok": True, "stdout": sortie.getvalue(),
                    "erreur": "Tests invalides : " + _trace(exc), "resultats": []}

        for noeud in arbre.body:
            source = ast.get_source_segment(tests, noeud)
            libelle = _libelle(noeud, source)
            est_assertion = isinstance(noeud, ast.Assert)
            module = ast.Module(body=[noeud], type_ignores=[])
            try:
                exec(compile(module, FICHIER_TESTS, "exec"), espace)
                if est_assertion:
                    resultats.append({"ok": True, "libelle": libelle})
            except BaseException as exc:             # noqa: BLE001
                detail = str(exc) if isinstance(exc, AssertionError) else _trace(exc)
                if not est_assertion:
                    libelle = ("Impossible de tester ce code : il manque sans doute "
                               "une fonction ou une variable attendue.")
                resultats.append({"ok": False, "libelle": libelle,
                                  "detail": detail or None})
                if not est_assertion:
                    break

    sys.stdin, sys.stdout = stdin_origine, stdout_origine
    return {"ok": True, "stdout": sortie.getvalue(), "erreur": None,
            "resultats": resultats}


def main():
    demande = json.load(sys.stdin)
    try:
        reponse = executer(demande.get("code", ""),
                           demande.get("tests"),
                           demande.get("saisies") or [])
    except BaseException as exc:                     # noqa: BLE001
        reponse = {"ok": False, "erreur": str(exc), "stdout": "", "resultats": []}
    json.dump(reponse, sys.stdout)


if __name__ == "__main__":
    main()
