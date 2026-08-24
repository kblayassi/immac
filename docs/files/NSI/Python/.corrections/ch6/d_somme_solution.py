def somme_valeurs(dico):
    total = 0
    for valeur in dico.values():      # on ne parcourt QUE les valeurs
        total = total + valeur
    return total


def moyenne_valeurs(dico):
    return somme_valeurs(dico) / len(dico)
