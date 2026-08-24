def division_euclidienne(a, b):
    return (a // b, a % b)


# On récupère les deux valeurs d'un coup grâce au déballage :
q, r = division_euclidienne(17, 5)
print(17, "=", 5, "x", q, "+", r)
