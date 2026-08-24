def compter_lettres(texte):
    compteurs = {}                          # on part d'un dictionnaire vide
    for lettre in texte:
        if lettre in compteurs:             # déjà rencontrée ?
            compteurs[lettre] = compteurs[lettre] + 1
        else:
            compteurs[lettre] = 1           # première rencontre
    return compteurs
