import sys
_lignes = [l for l in sys.stdout.getvalue().splitlines() if l.strip()]

assert len(_lignes) == 7, "Il faut exactement 7 lignes affichées"
assert all("Grand Sorcier" in l for l in _lignes), "Chaque ligne doit contenir la phrase demandée"
