def premier_indice(tableau, valeur):
    for i in range(len(tableau)):
        if tableau[i] == valeur:
            return i       # parcours partiel : on s'arrête ici
    return -1              # convention : -1 signifie « absente »


def indices_occurrences(tableau, valeur):
    positions = []         # parcours total : on doit tout lire
    for i in range(len(tableau)):
        if tableau[i] == valeur:
            positions.append(i)
    return positions
