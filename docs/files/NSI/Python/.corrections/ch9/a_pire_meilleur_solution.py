def tri_insertion_comptage(tableau):
    liste = tableau.copy()
    comparaisons = 0
    for i in range(1, len(liste)):
        valeur = liste[i]
        j = i - 1
        comparaisons = comparaisons + 1
        while j >= 0 and liste[j] > valeur:
            liste[j + 1] = liste[j]
            j = j - 1
            if j >= 0:
                comparaisons = comparaisons + 1
        liste[j + 1] = valeur
    return comparaisons


def generer_meilleur_cas(n, maximum):
    # le meilleur cas, c'est un tableau DÉJÀ trié : chaque valeur reste
    # à sa place après une seule comparaison
    return [i * maximum // n for i in range(n)]


def generer_pire_cas(n, maximum):
    # le pire cas, c'est l'ordre décroissant : chaque valeur doit remonter
    # tout le tableau déjà trié
    return [maximum - i * maximum // n for i in range(n)]


for n in [10, 20, 40]:
    meilleur = tri_insertion_comptage(generer_meilleur_cas(n, 1000))
    pire = tri_insertion_comptage(generer_pire_cas(n, 1000))
    print(f"n = {n} : {meilleur} comparaisons au mieux, {pire} au pire")
