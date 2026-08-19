import sys
_sortie = sys.stdout.getvalue()

assert lancer == 6, "À la sortie de la boucle, le dé doit être tombé sur 6"
assert isinstance(nb_lancers, int), "nb_lancers doit contenir un nombre entier de lancers"
assert nb_lancers >= 1, "Il y a forcément eu au moins un lancer"
assert str(nb_lancers) in _sortie, "Ton programme doit afficher le nombre de lancers effectués"
