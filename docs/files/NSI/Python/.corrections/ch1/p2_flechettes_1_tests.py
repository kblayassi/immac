import sys
_sortie = sys.stdout.getvalue()
_gagne = "gagné" in _sortie

assert "gagné" in _sortie or "perdu" in _sortie, "Ton programme doit afficher si Bob gagne ou perd"
assert _gagne == (numero_ligne == 2 or numero_colonne == 2), "Sur ce tir, le résultat annoncé ne correspond pas à la croix rouge"
