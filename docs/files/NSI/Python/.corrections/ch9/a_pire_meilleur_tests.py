_m = generer_meilleur_cas(10, 100)
_p = generer_pire_cas(10, 100)

assert len(_m) == 10 and len(_p) == 10, "Les deux fonctions doivent renvoyer n valeurs"
assert all(_m[i] <= _m[i + 1] for i in range(9)), "Le meilleur cas du tri par insertion est un tableau déjà trié"
assert all(_p[i] >= _p[i + 1] for i in range(9)), "Le pire cas est un tableau rangé dans l'ordre décroissant"

assert tri_insertion_comptage(_m) == 9, "Sur un tableau déjà trié de 10 valeurs : 9 comparaisons, soit n - 1"
assert tri_insertion_comptage(_p) == 45, "Sur le pire cas de 10 valeurs : 45 comparaisons, soit n(n-1)/2"

_m20 = generer_meilleur_cas(20, 100)
_p20 = generer_pire_cas(20, 100)
assert tri_insertion_comptage(_m20) == 19, "Le meilleur cas reste linéaire : n - 1 comparaisons"
assert tri_insertion_comptage(_p20) == 190, "Le pire cas est quadratique : n(n-1)/2 comparaisons"
