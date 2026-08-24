import sys
_sortie = sys.stdout.getvalue()

assert isinstance(point, tuple), "point doit être un p-uplet, donc écrit avec des parenthèses"
assert point == (4, -2), "point doit contenir l'abscisse 4 puis l'ordonnée -2, dans cet ordre"
assert "4" in _sortie, "Ton programme doit afficher l'abscisse"
assert "-2" in _sortie, "Ton programme doit afficher l'ordonnée"
