assert somme_valeurs({"a": 1, "b": 2}) == 3, "1 + 2 = 3"
assert somme_valeurs({}) == 0, "La somme des valeurs d'un dictionnaire vide vaut 0"
assert somme_valeurs({"x": 10}) == 10, "Une seule entrée"
assert somme_valeurs({"a": -5, "b": 5}) == 0, "Ça doit marcher avec des valeurs négatives"

assert moyenne_valeurs({"Alice": 14, "Bob": 11, "Chloé": 17}) == 14, "(14 + 11 + 17) / 3 = 14"
assert moyenne_valeurs({"x": 8}) == 8, "La moyenne d'une seule valeur, c'est cette valeur"
