assert racine_carree(25) == 5, "La racine carrée de 25 vaut 5"
assert racine_carree(0) == 0, "La racine carrée de 0 vaut 0"
assert abs(racine_carree(2) - 1.41421356) < 1e-6, "La racine carrée de 2 vaut environ 1,414"

_declenchee = False
try:
    racine_carree(-4)
except AssertionError:
    _declenchee = True
assert _declenchee, "Avec x négatif, ta précondition doit lever une AssertionError"

assert racine_carree.__doc__ is not None and len(racine_carree.__doc__.strip()) > 30, "N'oublie pas la docstring"
