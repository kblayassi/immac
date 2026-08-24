def division(a: float, b: float) -> float:
    """
    Calcule le quotient a / b.

    Paramètres :
    a (float) -> numérateur
    b (float) -> dénominateur non nul

    Retourne :
    float -> résultat de a / b

    Précondition :
    b != 0
    """
    assert b != 0, "b doit être non nul"
    return a / b
