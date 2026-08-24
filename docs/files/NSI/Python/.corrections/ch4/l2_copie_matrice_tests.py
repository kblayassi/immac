_M = [[1, 2], [3, 4]]
_N = copier_matrice(_M)

assert _N == [[1, 2], [3, 4]], "La copie doit avoir le même contenu que la matrice d'origine"
assert _N is not _M, "La copie doit être un nouvel objet"
assert _N[0] is not _M[0], "Chaque LIGNE doit elle aussi être une nouvelle liste"

_N[0][1] = 99
assert _M == [[1, 2], [3, 4]], "Modifier la copie ne doit pas modifier la matrice d'origine"

assert copier_matrice([[7]]) == [[7]], "Ça doit marcher sur une matrice d'une seule case"
assert copier_matrice([[1, 2, 3], [4, 5, 6]]) == [[1, 2, 3], [4, 5, 6]], "Ça doit marcher sur une matrice 2 x 3"
