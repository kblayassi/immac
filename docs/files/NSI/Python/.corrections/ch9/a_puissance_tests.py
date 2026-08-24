assert puissance1(2, 10) == 1024, "2 puissance 10 vaut 1024"
assert puissance1(5, 0) == 1, "Toute puissance 0 vaut 1"
assert puissance1(3, 4) == 81, "3 puissance 4 vaut 81"
assert puissance1(7, 1) == 7, "x puissance 1 vaut x"

assert puissance2(2, 10) == 1024, "La version rapide doit donner le même résultat"
assert puissance2(5, 0) == 1, "Toute puissance 0 vaut 1"
assert puissance2(3, 5) == 243, "3 puissance 5 vaut 243"
assert puissance2(2, 13) == 8192, "Attention aux exposants impairs : c'est là que le p * x intervient"

for _n in range(0, 12):
    assert puissance1(2, _n) == puissance2(2, _n), "Les deux fonctions doivent toujours coïncider"
