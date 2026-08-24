assert division(10, 2) == 5, "La fonction doit continuer à diviser correctement"
assert division(-9, 3) == -3, "Elle doit aussi fonctionner avec des négatifs"
assert division(0, 5) == 0, "Un numérateur nul donne 0"

# Le cœur de l'exercice : la précondition doit se déclencher.
_declenchee = False
try:
    division(1, 0)
except AssertionError:
    _declenchee = True
except ZeroDivisionError:
    _declenchee = False
assert _declenchee, "Avec b = 0, ta fonction doit lever une AssertionError — et non laisser Python planter sur une ZeroDivisionError"

assert division.__doc__ is not None and len(division.__doc__.strip()) > 30, "N'oublie pas la docstring : elle fait partie de la spécification"
