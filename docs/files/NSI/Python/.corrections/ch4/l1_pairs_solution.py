def pairs(tableau):
    resultat = []
    for element in tableau:
        if element % 2 == 0:
            resultat.append(element)
    return resultat


def pairs_comprehension(tableau):
    return [element for element in tableau if element % 2 == 0]
