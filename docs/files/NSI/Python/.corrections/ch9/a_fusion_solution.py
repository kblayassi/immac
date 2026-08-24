def fusion(L1, L2):
    resultat = []
    i = 0                      # où on en est dans L1
    j = 0                      # où on en est dans L2

    # tant qu'il reste des éléments dans les DEUX tableaux,
    # on prend le plus petit des deux candidats
    while i < len(L1) and j < len(L2):
        if L1[i] <= L2[j]:
            resultat.append(L1[i])
            i = i + 1
        else:
            resultat.append(L2[j])
            j = j + 1

    # l'un des deux est épuisé : on recopie ce qui reste de l'autre
    while i < len(L1):
        resultat.append(L1[i])
        i = i + 1
    while j < len(L2):
        resultat.append(L2[j])
        j = j + 1

    return resultat


print(fusion([1, 5, 6], [2, 4, 8, 12, 20]))
