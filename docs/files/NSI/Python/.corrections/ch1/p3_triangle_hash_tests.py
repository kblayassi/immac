import sys
_lignes = [l.strip() for l in sys.stdout.getvalue().splitlines() if l.strip()]

assert len(_lignes) == 20, "Le triangle doit compter exactement 20 lignes"
assert _lignes[0] == "#", "La première ligne ne contient qu'un seul #"
assert _lignes[-1] == "#" * 20, "La vingtième ligne contient 20 symboles #"
assert [len(l) for l in _lignes] == list(range(1, 21)), "La ligne n° n doit contenir n symboles #"
