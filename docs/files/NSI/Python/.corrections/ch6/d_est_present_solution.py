def est_present(dico, cle):
    return cle in dico


def valeur_ou_defaut(dico, cle, defaut):
    if cle in dico:
        return dico[cle]
    else:
        return defaut
