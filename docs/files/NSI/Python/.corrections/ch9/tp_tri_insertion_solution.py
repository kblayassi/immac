from random import randint


def genere_liste_aleatoire(n, maximum):
    return [randint(0, maximum) for i in range(n)]


def tri_insertion(liste_a_trier):
    liste = liste_a_trier.copy()
    for i in range(1, len(liste)):
        valeur = liste[i]
        j = i - 1
        while j >= 0 and liste[j] > valeur:    # la comparaison de valeurs
            liste[j + 1] = liste[j]            # on décale vers la droite
            j = j - 1
        liste[j + 1] = valeur                  # on insère à la bonne place
    return liste


def tri_insertion_comptage(liste_a_trier):
    liste = liste_a_trier.copy()
    comparaisons = 0
    for i in range(1, len(liste)):
        valeur = liste[i]
        j = i - 1
        comparaisons = comparaisons + 1        # la première comparaison
        while j >= 0 and liste[j] > valeur:
            liste[j + 1] = liste[j]
            j = j - 1
            if j >= 0:
                comparaisons = comparaisons + 1
        liste[j + 1] = valeur
    return comparaisons


for taille in [250, 500, 1000]:
    liste = genere_liste_aleatoire(taille, 100)
    print(taille, "valeurs :", tri_insertion_comptage(liste), "comparaisons")
