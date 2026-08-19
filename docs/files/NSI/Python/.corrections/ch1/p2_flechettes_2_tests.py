import sys
_sortie = sys.stdout.getvalue()

if numero_ligne == 2 and numero_colonne == 2:
    _attendu = "100 points"
elif numero_ligne == 2 or numero_colonne == 2:
    _attendu = "50 points"
else:
    _attendu = "0 point"

assert _attendu in _sortie, "Sur ce tir, le nombre de points annoncé ne correspond pas au plateau"
assert not (_attendu != "100 points" and "100 points" in _sortie), "Une seule annonce doit s'afficher"
