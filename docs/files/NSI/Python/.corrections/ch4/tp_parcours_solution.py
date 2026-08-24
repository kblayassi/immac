tableau = ["a", "n", "a", "l", "y", "s", "e", "a"]


def comptage(tableau, lettre):
    compteur = 0
    for element in tableau:      # parcours total : toutes les cases
        if element == lettre:
            compteur = compteur + 1
    return compteur


def recherche(tableau, lettre):
    for element in tableau:
        if element == lettre:
            return True          # parcours partiel : on sort aussitôt
    return False                 # tout vu, sans succès


print("le a apparaît", comptage(tableau, "a"), "fois")
print("le z est-il présent ?", recherche(tableau, "z"))
