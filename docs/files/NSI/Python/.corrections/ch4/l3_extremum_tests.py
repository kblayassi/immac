assert maximum([12, 15, 9, 18, 14]) == 18, "maximum([12, 15, 9, 18, 14]) doit valoir 18"
assert maximum([-3, -7, -1]) == -1, "Avec des valeurs négatives : n'initialise surtout pas maxi à 0 !"
assert maximum([5]) == 5, "Un tableau d'un seul élément"
assert maximum([1, 9, 2]) == 9, "Le record peut se trouver au milieu"
assert maximum([1, 2, 9]) == 9, "Le record peut se trouver en dernière position"

assert minimum([12, 15, 9, 18, 14]) == 9, "minimum([12, 15, 9, 18, 14]) doit valoir 9"
assert minimum([-3, -7, -1]) == -7, "Ça doit marcher avec des valeurs négatives"
assert minimum([5]) == 5, "Un tableau d'un seul élément"

assert extremum([12, 15, 9, 18, 14]) == [18, 9, 13.6], "extremum doit renvoyer [maximum, minimum, moyenne]"
assert extremum([2, 4]) == [4, 2, 3], "extremum([2, 4]) doit renvoyer [4, 2, 3]"
