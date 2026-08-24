assert division_euclidienne(17, 5) == (3, 2), "17 = 5 x 3 + 2, donc (3, 2)"
assert isinstance(division_euclidienne(17, 5), tuple), "La fonction doit renvoyer un p-uplet"
assert division_euclidienne(10, 2) == (5, 0), "Une division qui tombe juste : le reste est nul"
assert division_euclidienne(0, 7) == (0, 0), "0 divisé par 7"
assert division_euclidienne(4, 9) == (0, 4), "Quand a est plus petit que b, le quotient est nul"

_q, _r = division_euclidienne(123, 7)
assert 123 == 7 * _q + _r, "La relation a = b x q + r doit toujours être vérifiée"
assert 0 <= _r < 7, "Le reste doit être compris entre 0 et b - 1"
