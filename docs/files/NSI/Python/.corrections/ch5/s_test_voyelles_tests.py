import copy

assert callable(test_compte_voyelles), "Ta fonction test_compte_voyelles doit exister"
test_compte_voyelles()   # tes assertions doivent passer sur la bonne fonction

# On remplace maintenant la fonction par une version SUBTILEMENT buguée.
_correcte = compte_voyelles
def _buguee(phrase):
    voyelles = 'aeiou'          # le y a disparu
    nb_voyelles = 0
    for lettre in phrase:
        if lettre in voyelles:
            nb_voyelles += 1
    return nb_voyelles
compte_voyelles = _buguee
globals()["compte_voyelles"] = _buguee

_demasque = False
try:
    test_compte_voyelles()
except AssertionError:
    _demasque = True
finally:
    compte_voyelles = _correcte
    globals()["compte_voyelles"] = _correcte

assert _demasque, "Ton jeu de tests laisse passer une version buguée : as-tu testé un mot contenant un y ?"
