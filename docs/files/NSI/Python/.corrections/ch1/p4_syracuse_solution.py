def suivant(n):
    if n % 2 == 0:
        return n // 2
    else:
        return 3 * n + 1


def syracuse(n):
    print(n)
    while n != 1:
        n = suivant(n)
        print(n)


def temps_de_vol(n):
    etapes = 0
    while n != 1:
        n = suivant(n)
        etapes = etapes + 1
    return etapes


def temps_max(n):
    maximum = 0
    depart = 1
    for k in range(1, n + 1):
        duree = temps_de_vol(k)
        if duree > maximum:
            maximum = duree
            depart = k
    return (maximum, depart)
