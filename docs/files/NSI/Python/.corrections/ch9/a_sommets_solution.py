sommets = [
    ("Makalu", 8485), ("K2", 8611), ("Annapurna", 8091),
    ("Mont Everest", 8848), ("Lhotse", 8516), ("Manaslu", 8163),
    ("Cho Oyu", 8188), ("Kangchenjunga", 8586), ("Dhaulagiri", 8167),
    ("Nanga Parbat", 8126)
]


def tri_selection(liste):
    resultat = liste.copy()
    for i in range(len(resultat) - 1):
        indice_max = i                       # décroissant : on cherche le MAX
        for j in range(i + 1, len(resultat)):
            if resultat[j][1] > resultat[indice_max][1]:   # [1] = l'altitude
                indice_max = j
        resultat[i], resultat[indice_max] = resultat[indice_max], resultat[i]
    return resultat


def plus_hauts1(liste_triee, n):
    resultat = []
    for i in range(n):
        resultat.append(liste_triee[i])
    return resultat


def plus_hauts2(liste_triee, altitude):
    resultat = []
    for sommet in liste_triee:
        if sommet[1] > altitude:
            resultat.append(sommet)
    return resultat


tries = tri_selection(sommets)
print("Les 3 plus hauts :", plus_hauts1(tries, 3))
print("Au-dessus de 8500 m :", plus_hauts2(tries, 8500))
