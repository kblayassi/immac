#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rejoue chaque correction contre son jeu de tests, comme le fait le playground.

    python3 tools/verifier_corrections.py            # tous les chapitres
    python3 tools/verifier_corrections.py ch5 ch9    # seulement ceux-là

Le harnais reproduit celui de docs/javascripts/pyodide-worker.js : la solution
est exécutée, puis les assertions sont déroulées une à une dans son espace de
noms. Un exercice aléatoire est rejoué plusieurs fois.
"""
import ast, io, sys, traceback
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
CORRECTIONS = RACINE / "docs/files/NSI/Python/.corrections"
MODULES = RACINE / "docs/files/NSI/.modules"      # modules fournis masqués aux élèves

# Réponses clavier des corrections qui appellent input()
SAISIES = {
    "p4_parfumerie": ["12", "45"],
    "p4_distance_arret": ["50"],
}
REPETITIONS_ALEA = 100    # pour les exercices qui tirent au hasard


class Clavier:
    def __init__(self, reponses):
        self.reponses, self.rang = list(reponses), 0

    def readline(self, *args):
        if self.rang >= len(self.reponses):
            raise EOFError("input() sans réponse prévue : compléter SAISIES")
        valeur = self.reponses[self.rang]
        self.rang += 1
        sys.stdout.write(valeur + "\n")
        return valeur + "\n"


def solutions_de(tests):
    """Un jeu de tests peut être partagé par plusieurs corrections."""
    exact = tests.with_name(tests.name.replace("_tests.py", "_solution.py"))
    if exact.exists():
        return [exact]
    prefixe = tests.name[: -len("_tests.py")]
    return sorted(tests.parent.glob(f"{prefixe}_*_solution.py"))


def rejouer(solution, tests, repetitions):
    source_tests = tests.read_text(encoding="utf-8")
    try:
        arbre = ast.parse(source_tests, "<tests>")
    except SyntaxError as exc:
        return [f"tests invalides : {exc}"]

    echecs = []
    for _ in range(repetitions):
        espace = {"__name__": "__main__"}
        vrai_stdout, vrai_stdin = sys.stdout, sys.stdin
        sys.stdout = io.StringIO()
        sys.stdin = Clavier(SAISIES.get(solution.name[: -len("_solution.py")], []))
        try:
            exec(compile(solution.read_text(encoding="utf-8"), "<solution>", "exec"), espace)
        except BaseException:
            echecs.append("la correction elle-même échoue :\n" + traceback.format_exc(limit=2))
            sys.stdout, sys.stdin = vrai_stdout, vrai_stdin
            break
        for noeud in arbre.body:
            extrait = ast.get_source_segment(source_tests, noeud)
            try:
                exec(compile(ast.Module(body=[noeud], type_ignores=[]), "<tests>", "exec"), espace)
            except BaseException as exc:
                echecs.append(f"{type(exc).__name__}: {exc}\n      <<< {extrait}")
        sys.stdout, sys.stdin = vrai_stdout, vrai_stdin
        if echecs:
            break
    return echecs


def main():
    sys.path.insert(0, str(MODULES))
    demandes = sys.argv[1:]
    dossiers = sorted(d for d in CORRECTIONS.iterdir()
                      if d.is_dir() and (not demandes or d.name in demandes))
    total = fautifs = 0

    for dossier in dossiers:
        print(f"\n\033[1m{dossier.name}\033[0m")
        for tests in sorted(dossier.glob("*_tests.py")):
            solutions = solutions_de(tests)
            if not solutions:
                print(f"  ⚠️  {tests.name} : aucune correction associée")
                fautifs += 1
                continue
            for solution in solutions:
                source = solution.read_text(encoding="utf-8")
                repetitions = REPETITIONS_ALEA if "random" in source else 1
                echecs = rejouer(solution, tests, repetitions)
                total += 1
                nom = solution.name[: -len("_solution.py")]
                if echecs:
                    fautifs += 1
                    print(f"  ❌ {nom}")
                    for e in echecs[:3]:
                        print(f"      {e}")
                else:
                    suffixe = f" (×{repetitions})" if repetitions > 1 else ""
                    print(f"  ✅ {nom}{suffixe}")

    print(f"\n{total - fautifs}/{total} corrections valides"
          + (f" — \033[31m{fautifs} à reprendre\033[0m" if fautifs else " — tout passe"))
    return 1 if fautifs else 0


if __name__ == "__main__":
    sys.exit(main())
