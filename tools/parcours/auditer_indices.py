"""Mesure la part du travail restant que les coups de pouce livrent verbatim.

« Travail restant » = la solution, moins ce que le code de départ fournit déjà.
Un indice qui en reproduit la majeure partie donne la réponse au lieu d'y mener.

Usage : python3 tools/parcours/auditer_indices.py [parcours] [nb_seances]
        python3 tools/parcours/auditer_indices.py parcours-nsi 13

Le seuil d'alerte est à 55 %. En dessous, un indice qui donne une ligne sur
trois reste un indice ; au-dessus, il faut reformuler pour décrire le geste
plutôt que d'écrire la ligne. Voir docs/.Ressources/parcours-interactifs.md.
"""
import json, re, subprocess, pathlib, difflib

DEPOT = pathlib.Path("/Users/kblayassi/Documents/Python/MkDocs")
CODE = re.compile(r"<code>(.*?)</code>", re.S)
ENTITES = {"&lt;": "<", "&gt;": ">", "&amp;": "&", "&quot;": '"', "&#39;": "'", "&nbsp;": " "}

def decoder(s):
    for k, v in ENTITES.items():
        s = s.replace(k, v)
    return s

def norme(s):
    return re.sub(r"\s+", "", decoder(s))

resultats = []
import sys
PARCOURS = sys.argv[1] if len(sys.argv) > 1 else "parcours-python"
NB = int(sys.argv[2]) if len(sys.argv) > 2 else 11
for numero in range(1, NB + 1):
    sid = f"s{numero:02d}"
    d = json.loads(subprocess.run(["node", str(DEPOT / "tools/parcours/extraire.mjs"), PARCOURS, sid],
                                  cwd=DEPOT / "tools/parcours", capture_output=True, text=True).stdout)
    source = (DEPOT / "docs" / PARCOURS / "seances" / f"{sid}.js").read_text(encoding="utf-8")
    for e in d["etapes"]:
        if e["type"] != "code" or not e["solution"]:
            continue
        debut = source.index(f'          id: "{e["id"]}",')
        bloc = source[debut:source.index("\n        },", debut)]
        m = re.search(r"indices: \[(.*?)\n          \],", bloc, re.S)
        if not m:
            continue
        textes = [t.replace('\\"', '"') for t in re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))]

        # Ce que l'élève doit produire : la solution privée des lignes déjà données.
        depart = set(l.strip() for l in (e["depart"] or "").split("\n") if l.strip())
        reste = [l.strip() for l in e["solution"].split("\n")
                 if l.strip() and l.strip() not in depart and not l.strip().startswith("#")]
        cible = norme("".join(reste))
        if len(cible) < 12:
            continue

        # Ce que les indices en révèlent, morceau par morceau.
        revele = set()
        for texte in textes:
            for fragment in CODE.findall(texte):
                f = norme(fragment)
                if len(f) < 6:
                    continue
                # position du fragment dans la cible, s'il y figure tel quel
                i = cible.find(f)
                if i >= 0:
                    revele.update(range(i, i + len(f)))
        part = len(revele) / len(cible)
        if part >= 0.55:
            resultats.append((part, sid, e["id"], e["titre"][:36], len(textes)))

resultats.sort(reverse=True)
print(f"=== {len(resultats)} étapes dont les indices livrent plus de la moitié du travail ===")
for part, sid, eid, titre, n in resultats:
    print(f"  {part:4.0%}  {sid}/{eid:<4} {titre:<38} {n} indice(s)")
