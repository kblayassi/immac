def inverse(dico):
    resultat = {}
    for cle, valeur in dico.items():     # items() donne les deux d'un coup
        resultat[valeur] = cle
    return resultat


# En une ligne, par compréhension :
# def inverse(dico):
#     return {valeur: cle for cle, valeur in dico.items()}
