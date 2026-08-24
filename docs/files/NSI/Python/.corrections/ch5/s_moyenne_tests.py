assert abs(moyenne(20) - 17.0909) < 1e-3, "Avec 20 à la dernière évaluation : (14 + 30 + 64 + 80) / 11 ≈ 17,09"
assert abs(moyenne(0) - 9.8182) < 1e-3, "Avec 0 : 108 / 11 ≈ 9,82"
assert abs(moyenne(15) - 15.2727) < 1e-3, "Avec 15 : 168 / 11 ≈ 15,27"
assert moyenne(20) > moyenne(0), "Plus la dernière note est haute, plus la moyenne l'est"

_bornes = True
for _n in (-1, 21, 100):
    try:
        moyenne(_n)
        _bornes = False
    except AssertionError:
        pass
assert _bornes, "Une note hors de l'intervalle 0-20 doit lever une AssertionError"

assert moyenne.__doc__ is not None and len(moyenne.__doc__.strip()) > 30, "N'oublie pas la docstring"
