_l = genere_liste_aleatoire(40, 100)
assert len(_l) == 40, "genere_liste_aleatoire(40, 100) doit renvoyer 40 valeurs"
assert all(0 <= v <= 100 for v in _l), "Toutes les valeurs doivent être comprises entre 0 et maximum"

assert tri_insertion([3, 1, 2]) == [1, 2, 3], "Le tri doit ranger les valeurs dans l'ordre croissant"
assert tri_insertion([]) == [], "Une liste vide reste vide"
assert tri_insertion([2, 2, 1]) == [1, 2, 2], "Les doublons doivent être conservés"
assert tri_insertion([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5], "Une liste rangée à l'envers"

_alea = genere_liste_aleatoire(60, 50)
assert sorted(_alea) == tri_insertion(_alea), "Le tri doit contenir exactement les mêmes valeurs qu'au départ"

assert tri_insertion_comptage([1, 2, 3, 4, 5]) == 4, "Sur une liste déjà triée de 5 valeurs : 4 comparaisons seulement"
assert tri_insertion_comptage([5, 4, 3, 2, 1]) == 10, "Sur la liste inversée de 5 valeurs : 10 comparaisons, soit n(n-1)/2"
assert tri_insertion_comptage([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) == 9, "Le meilleur cas reste linéaire : n - 1 comparaisons"
