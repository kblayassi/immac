assert callable(test_aire_disque), "Ta fonction test_aire_disque doit exister"
test_aire_disque()   # tes assertions doivent d'abord passer sur la version correcte

_correcte = aire_disque
def _buguee(rayon):
    # Une fonction qui « triche » : elle ne calcule rien, elle récite.
    resultats = {0: 0, 1: 3.141592653589793, 2: 12.566370614359172,
                 3: 28.274333882308138, 10: 314.1592653589793}
    if rayon in resultats:
        return resultats[rayon]
    return 0
globals()["aire_disque"] = _buguee

_demasque = False
try:
    test_aire_disque()
except AssertionError:
    _demasque = True
finally:
    globals()["aire_disque"] = _correcte

assert _demasque, "La version buguée passe encore tes tests. Elle ne connaît par cœur que quelques rayons : essaie-en un auquel personne ne penserait."
