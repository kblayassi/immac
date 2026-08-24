def statistiques(tableau):
    mini = tableau[0]
    maxi = tableau[0]
    total = 0

    for valeur in tableau:          # un seul parcours pour les trois résultats
        if valeur < mini:
            mini = valeur
        if valeur > maxi:
            maxi = valeur
        total = total + valeur

    return (mini, maxi, total / len(tableau))
