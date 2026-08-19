def nombre_voyelles(mot):
    compteur = 0
    for lettre in mot:
        if lettre in "aeiouy":
            compteur = compteur + 1
    return compteur
