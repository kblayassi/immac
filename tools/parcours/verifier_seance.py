"""Banc de test d'une séance du parcours Python.

Usage : python3 tools/parcours/verifier_seance.py [parcours] [séance]
        sans argument      : tous les parcours, toutes les séances
        parcours-nsi       : toutes les séances de ce parcours
        parcours-nsi s03   : une seule séance

Pour chaque étape de code :
  1. la solution officielle s'exécute sans erreur ;
  2. sa sortie est exactement celle annoncée ;
  3. les contrôles codeContient / codeAbsent acceptent la solution ;
  4. le code de départ ne passe PAS déjà la validation (sinon l'exercice est offert).
Pour chaque QCM : une bonne réponse et une seule.
"""
import io, json, re, signal, subprocess, sys, contextlib, pathlib

RACINE = pathlib.Path(__file__).parent

def normaliser(t):
    return "\n".join(l.rstrip() for l in str(t).replace("\r\n", "\n").split("\n")).strip("\n")

def drapeaux(opts):
    return re.M if opts and "m" in opts else 0

def executer(code, saisies=None):
    """Renvoie (sortie, erreur). `saisies` alimente input() comme le fait le worker :
    l'invite est écrite, puis la réponse est renvoyée en écho."""
    tampon = io.StringIO()
    file = list(saisies or [])

    def faux_input(invite=""):
        sys.stdout.write(str(invite))
        if not file:
            raise EOFError("input() réclame une saisie non fournie par saisiesTest")
        reponse = file.pop(0)
        sys.stdout.write(reponse + "\n")
        return reponse

    espace = {"__name__": "__main__", "input": faux_input}

    def trop_long(signum, frame):
        raise TimeoutError("le programme tourne depuis plus de 10 s (boucle sans fin ?)")

    ancien = signal.signal(signal.SIGALRM, trop_long)
    signal.alarm(10)
    try:
        with contextlib.redirect_stdout(tampon):
            exec(compile(code, "<eleve>", "exec"), espace)
    except BaseException as e:
        return normaliser(tampon.getvalue()), f"{type(e).__name__}: {e}", espace
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, ancien)
    return normaliser(tampon.getvalue()), None, espace

def valider(code, v, saisies=None):
    """Rejoue la logique de validерCode de app.js. Renvoie la liste des échecs."""
    echecs = []
    if not code.strip():
        return ["éditeur vide"]
    for r in v.get("codeContient", []):
        if not re.search(r["motif"], code, drapeaux(r.get("options"))):
            echecs.append("codeContient /%s/" % r["motif"])
    for r in v.get("codeAbsent", []):
        if re.search(r["motif"], code, drapeaux(r.get("options"))):
            echecs.append("codeAbsent /%s/" % r["motif"])
    if echecs:
        return echecs
    sortie, erreur, espace = executer(code, saisies)
    if erreur:
        return ["exécution : " + erreur]
    if v.get("sortieNonVide") and not sortie:
        echecs.append("sortie vide")
    if "sortie" in v and sortie != normaliser(v["sortie"]):
        echecs.append("sortie ≠ attendu")
    for frag in v.get("sortieContient", []):
        if frag not in sortie:
            echecs.append("sortieContient %r" % frag)
    if "sortieRegex" in v and not re.search(v["sortieRegex"], sortie,
                                            drapeaux(v.get("sortieRegexOptions"))):
        echecs.append("sortieRegex non satisfaite")

    if v.get("tests"):
        import ast
        arbre = ast.parse(v["tests"], "<tests>")

        def trop_long(signum, frame):
            raise TimeoutError("le test tourne depuis plus de 10 s (boucle sans fin ?)")

        for noeud in arbre.body:
            module = ast.Module(body=[noeud], type_ignores=[])
            ancien = signal.signal(signal.SIGALRM, trop_long)
            signal.alarm(10)
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(module, "<tests>", "exec"), espace)
            except AssertionError as e:
                echecs.append("test : " + (str(e) or ast.get_source_segment(v["tests"], noeud) or "assertion"))
            except BaseException as e:
                echecs.append(f"test cassé ({type(e).__name__}: {e})")
                break
            finally:
                signal.alarm(0)
                signal.signal(signal.SIGALRM, ancien)
    return echecs

def main(seance, parcours="parcours-python"):
    brut = subprocess.run(["node", str(RACINE / "extraire.mjs"), parcours, seance],
                          cwd=RACINE, capture_output=True, text=True)
    if brut.returncode:
        print(brut.stderr); sys.exit(1)
    d = json.loads(brut.stdout)

    print(f"\n═══ Séance {d['numero']} — {d['titre']} ({len(d['etapes'])} étapes) ═══")
    souci = []
    for e in d["etapes"]:
        nom = f"{e['id']:>3} {e['titre'][:44]:<44}"

        if e["type"] in ("qcm", "prediction"):
            n = sum(e["options"])
            if n != 1:
                souci.append(f"{e['id']} : {n} bonne(s) réponse(s) au lieu d'une")
                print(f"  ✗ {nom} {n} bonnes réponses")
            else:
                print(f"  ✓ {nom} QCM")
            continue

        if e["type"] != "code":
            print(f"  · {nom} {e['type']}")
            continue

        v = e["validation"] or {}
        # Une étape sans solution est une étape de démonstration : le code est
        # déjà écrit, l'élève l'exécute. Elle doit donc passer telle quelle.
        if not e["solution"]:
            echecs = valider(e["depart"] or "", v, e.get("saisiesTest"))
            if echecs:
                souci.append(f"{e['id']} : ni solution, ni code de départ valide — {', '.join(echecs)}")
                print(f"  ✗ {nom} démonstration invalide : {', '.join(echecs)}")
            else:
                print(f"  ✓ {nom} démonstration (code fourni)")
            continue

        echecs = valider(e["solution"], v, e.get("saisiesTest"))
        if echecs:
            souci.append(f"{e['id']} : la solution est refusée — {', '.join(echecs)}")
            sortie, err, _ = executer(e["solution"], e.get("saisiesTest"))
            print(f"  ✗ {nom} {', '.join(echecs)}")
            if "sortie" in v and not err:
                print(f"        attendu : {v['sortie']!r}")
                print(f"        obtenu  : {sortie!r}")
            elif err:
                print(f"        {err}")
            continue

        # Le code de départ ne doit pas déjà satisfaire la validation.
        if e["depart"] is not None and not valider(e["depart"], v, e.get("saisiesTest")):
            souci.append(f"{e['id']} : le code de départ passe déjà la validation")
            print(f"  ✗ {nom} le départ passe déjà !")
            continue

        print(f"  ✓ {nom} {e['indices']} indice(s)")

    if souci:
        print("\n⚠ " + "\n⚠ ".join(souci))
    else:
        print("\n✓ séance intégralement vérifiée")
    return len(souci)

def seances_de(parcours):
    dossier = RACINE.parent.parent / "docs" / parcours / "seances"
    return sorted(f.stem for f in dossier.glob("s*.js"))

def est_web(parcours):
    """Un parcours qui enseigne HTML/CSS n'a rien à faire dans un interpréteur
    Python : il est vérifié par verifier_web.mjs, qui partage avec le navigateur
    le même analyseur (docs/parcours/web-verif.js)."""
    manifeste = RACINE.parent.parent / "docs" / parcours / "seances" / "manifeste.js"
    return manifeste.exists() and re.search(r'langage:\s*"web"', manifeste.read_text(encoding="utf-8"))

def deleguer_au_banc_web(parcours, seance=None):
    argv = ["node", str(RACINE / "verifier_web.mjs"), parcours] + ([seance] if seance else [])
    return subprocess.run(argv, cwd=RACINE.parent.parent).returncode


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) == 2:
        if est_web(args[0]):
            sys.exit(min(deleguer_au_banc_web(args[0], args[1]), 1))
        sys.exit(min(main(args[1], args[0]), 1))
    parcours = [args[0]] if args else sorted(
        d.name for d in (RACINE.parent.parent / "docs").glob("parcours-*") if d.is_dir())
    total = 0
    for p in parcours:
        if est_web(p):
            total += deleguer_au_banc_web(p)
            continue
        for s in seances_de(p):
            total += main(s, p)
    print(f"\n{'✓ tout est vérifié' if not total else f'{total} problème(s) au total'}")
    sys.exit(min(total, 1))
