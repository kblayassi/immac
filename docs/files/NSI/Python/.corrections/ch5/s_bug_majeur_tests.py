assert callable(test_est_majeur), "Ta fonction test_est_majeur doit exister"
test_est_majeur()   # tes assertions doivent d'abord passer sur la version correcte

_correcte = est_majeur
def _buguee(age):
    return age > 18        # le >= est devenu >
globals()["est_majeur"] = _buguee

_demasque = False
try:
    test_est_majeur()
except AssertionError:
    _demasque = True
finally:
    globals()["est_majeur"] = _correcte

assert _demasque, "La version buguée passe encore tes tests. Le bug porte sur une borne : quel âge exactement sépare les deux cas ?"
