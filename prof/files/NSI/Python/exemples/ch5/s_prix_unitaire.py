def prix_unitaire(total, nb):
    """Renvoie le prix d'un seul produit dans un lot de nb produits identiques.
    Au-delà de 10 unités, une réduction de 10 % s'applique sur le prix total."""
    ...


# La fonction de test de Malek — à ne pas modifier
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
