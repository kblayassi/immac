from random import randint
from time import time


def genere_liste_aleatoire(n, maximum):
    return [randint(0, maximum) for i in range(n)]


def tri_selection(liste_a_trier):
    liste = liste_a_trier.copy()
    for i in range(len(liste) - 1):
        indice_min = i
        for j in range(i + 1, len(liste)):
            if liste[j] < liste[indice_min]:
                indice_min = j
        liste[i], liste[indice_min] = liste[indice_min], liste[i]
    return liste


for taille in [500, 1000, 2000]:
    liste = genere_liste_aleatoire(taille, 100)
    t1 = time()
    tri_selection(liste)
    t2 = time()
    print(taille, "valeurs :", round(t2 - t1, 3), "s")
