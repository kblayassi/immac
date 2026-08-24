M = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]


def somme_matrice(M):
    total = 0
    for i in range(len(M)):             # pour chaque ligne
        for j in range(len(M[i])):      # pour chaque colonne de cette ligne
            total = total + M[i][j]
    return total


def identite(n):
    return [[1 if i == j else 0 for j in range(n)] for i in range(n)]
