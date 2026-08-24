assert tours_puissance1(5) == 5, "L'algorithme 1 fait exactement n tours"
assert tours_puissance1(5000) == 5000, "Pour n = 5000, l'algorithme 1 fait 5000 tours"
assert tours_puissance1(0) == 0, "Pour n = 0, aucune multiplication n'est nécessaire"

assert tours_puissance2(5) == 3, "5 → 2 → 1 → 0 : trois tours"
assert tours_puissance2(8) == 4, "8 → 4 → 2 → 1 → 0 : quatre tours"
assert tours_puissance2(5000) == 13, "Pour n = 5000, l'algorithme 2 ne fait que 13 tours"
assert tours_puissance2(0) == 0, "Pour n = 0, la boucle ne s'exécute pas"

assert tours_puissance2(5000000) <= 25, "Multiplier n par mille n'ajoute qu'une poignée de tours : c'est tout l'intérêt de l'algorithme 2"
