assert callable(test_moyenne), "Ta fonction test_moyenne doit exister"
test_moyenne()   # tes assertions doivent d'abord passer sur la version correcte

_correcte = moyenne
def _buguee(notes):
    total = 0
    for i in range(len(notes) - 1):    # la dernière note est oubliée
        total = total + notes[i]
    return total / len(notes)
globals()["moyenne"] = _buguee

_demasque = False
try:
    test_moyenne()
except AssertionError:
    _demasque = True
finally:
    globals()["moyenne"] = _correcte

assert _demasque, "La version buguée passe encore tes tests. Avec des notes toutes égales, l'oubli d'une valeur ne se voit pas."
