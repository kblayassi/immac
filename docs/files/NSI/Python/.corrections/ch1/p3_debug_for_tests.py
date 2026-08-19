import sys
_lignes = [l for l in sys.stdout.getvalue().splitlines() if l.strip()]

assert len(_lignes) == 10, "La phrase doit s'afficher 10 fois"
assert all("tout compris" in l for l in _lignes), "Chaque ligne doit contenir la phrase de départ"
