def somme(tableau):
    total = 0                      # l'accumulateur, AVANT la boucle
    for element in tableau:
        total = total + element    # il évolue DANS la boucle
    return total                   # on l'utilise APRÈS


def moyenne(tableau):
    return somme(tableau) / len(tableau)
