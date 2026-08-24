_l = genere_liste_aleatoire(50, 100)
assert len(_l) == 50, "genere_liste_aleatoire(50, 100) doit renvoyer 50 valeurs"
assert all(0 <= v <= 100 for v in _l), "Toutes les valeurs doivent être comprises entre 0 et maximum"

assert tri_selection([3, 1, 2]) == [1, 2, 3], "Le tri doit ranger les valeurs dans l'ordre croissant"
assert tri_selection([]) == [], "Une liste vide reste vide"
assert tri_selection([5]) == [5], "Une seule valeur"
assert tri_selection([2, 2, 1]) == [1, 2, 2], "Les doublons doivent être conservés"
assert tri_selection([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5], "Une liste rangée à l'envers"

_alea = genere_liste_aleatoire(60, 50)
_trie = tri_selection(_alea)
assert len(_trie) == 60, "Le tri ne doit perdre aucune valeur"
assert all(_trie[i] <= _trie[i + 1] for i in range(59)), "Le résultat doit être trié, même sur un tirage aléatoire"
assert sorted(_alea) == _trie, "Le tri doit contenir exactement les mêmes valeurs qu'au départ"
