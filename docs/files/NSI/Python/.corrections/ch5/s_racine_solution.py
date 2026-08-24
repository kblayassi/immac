def racine_carree(x: float) -> float:
    """
    Renvoie la racine carrée d'un nombre réel positif x.

    Paramètres :
    x (float) -> réel positif ou nul

    Retourne :
    float -> racine carrée de x (positive ou nulle)

    Précondition :
    x >= 0
    """
    assert x >= 0, "x doit être positif ou nul"
    resultat = x ** 0.5
    assert resultat >= 0, "un résultat négatif serait impossible"
    return resultat
