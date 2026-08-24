import copy

assert callable(test_fizzbuzz), "Ta fonction test_fizzbuzz doit exister"
test_fizzbuzz()   # tes assertions doivent passer sur la bonne fonction

# On remplace maintenant la fonction par une version SUBTILEMENT buguée.
_correcte = fizzbuzz
def _buguee(nombre):
    if nombre % 3 == 0:            # le cas des DEUX multiples est passé après
        return 'Fizz'
    elif nombre % 5 == 0:
        return 'Buzz'
    elif nombre % 3 == 0 and nombre % 5 == 0:
        return 'FizzBuzz'
    else:
        return nombre
fizzbuzz = _buguee
globals()["fizzbuzz"] = _buguee

_demasque = False
try:
    test_fizzbuzz()
except AssertionError:
    _demasque = True
finally:
    fizzbuzz = _correcte
    globals()["fizzbuzz"] = _correcte

assert _demasque, "Ton jeu de tests laisse passer une version buguée : as-tu testé un multiple de 3 ET de 5, comme 15 ?"
