def prix_unitaire(total, nb):
    """
    Renvoie le prix d'un seul produit dans un lot de nb produits identiques.

    Paramètres :
    total (float) -> prix total du lot
    nb (int) -> nombre de produits, strictement positif

    Retourne :
    float -> prix d'un produit, après réduction éventuelle

    Précondition :
    nb > 0
    """
    assert nb > 0, "le nombre de produits doit être strictement positif"
    if nb > 10:
        total = total * 0.9      # réduction de 10 %
    return total / nb


def test():
    if prix_unitaire(2, 1) != 2:
        return "Erreur 1"
    elif prix_unitaire(10, 5) != 2:
        return "Erreur 2"
    elif prix_unitaire(20, 10) != 2:
        return "Erreur 3"
    elif prix_unitaire(40, 18) != 2:
        return "Erreur 4"
    return "OK"


print(test())
