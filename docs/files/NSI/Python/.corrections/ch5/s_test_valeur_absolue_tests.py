import copy

assert callable(test_valeur_absolue), "Ta fonction test_valeur_absolue doit exister"
test_valeur_absolue()   # tes assertions doivent passer sur la bonne fonction

# On remplace maintenant la fonction par une version SUBTILEMENT buguée.
_correcte = valeur_absolue
def _buguee(x):
    if x >= 0:
        return x
    else:
        return x        # le signe moins a été oublié
valeur_absolue = _buguee
globals()["valeur_absolue"] = _buguee

_demasque = False
try:
    test_valeur_absolue()
except AssertionError:
    _demasque = True
finally:
    valeur_absolue = _correcte
    globals()["valeur_absolue"] = _correcte

assert _demasque, "Ton jeu de tests laisse passer une version buguée : as-tu pensé à tester un nombre négatif ?"
