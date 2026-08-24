assert operations_parcours(10) == 10, "Un parcours de 10 éléments fait 10 tours"
assert operations_parcours(100) == 100, "Le nombre d'opérations est proportionnel à n"
assert operations_parcours(0) == 0, "Un tableau vide ne demande aucun tour"

assert operations_double_boucle(10) == 100, "Deux boucles imbriquées sur 10 éléments : 10 x 10 = 100"
assert operations_double_boucle(100) == 10000, "Sur 100 éléments : 100 x 100 = 10 000"

assert operations_parcours(200) == 2 * operations_parcours(100), "Doubler n doit doubler le nombre d'opérations : c'est O(n)"
assert operations_double_boucle(200) == 4 * operations_double_boucle(100), "Doubler n doit quadrupler le nombre d'opérations : c'est O(n²)"
