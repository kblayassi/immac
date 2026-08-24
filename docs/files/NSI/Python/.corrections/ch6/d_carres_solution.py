def carres(n):
    resultat = {}
    for i in range(1, n + 1):
        resultat[i] = i * i
    return resultat


def carres_comprehension(n):
    return {i: i * i for i in range(1, n + 1)}
