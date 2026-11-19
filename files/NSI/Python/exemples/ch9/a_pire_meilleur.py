def tri_insertion_comptage(tableau):
    """Cette fonction vous est donnée : elle trie par insertion et renvoie
    le nombre de comparaisons effectuées."""
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
    """Renvoie un tableau de n valeurs entre 0 et maximum, disposées dans
    l'ordre le plus favorable au tri par insertion."""
    ...


def generer_pire_cas(n, maximum):
    """Même chose, dans l'ordre le plus défavorable."""
    ...

