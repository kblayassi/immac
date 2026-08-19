import sys
_sortie = sys.stdout.getvalue()
_gagne = "gagné" in _sortie
_perdu = "perdu" in _sortie

assert _gagne or _perdu, "Ton programme doit afficher « gagné 1 euro » ou « perdu 1 euro »"
assert not (_gagne and _perdu), "Un seul des deux messages doit s'afficher"
assert _gagne == (lancer_1 == lancer_2), "Sur ce tirage, le message affiché ne respecte pas la règle du jeu"
