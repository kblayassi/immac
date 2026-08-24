temperatures = [12, -3, 8, 15, -7, 4]


def maximum(tableau):
    record = tableau[0]          # la variable temporaire : le record du moment
    for element in tableau:
        if element > record:
            record = element     # on ne garde que le meilleur
    return record


def moyenne(tableau):
    total = 0                    # la variable temporaire : la somme en cours
    for element in tableau:
        total = total + element
    return total / len(tableau)


print("maximum :", maximum(temperatures))
print("moyenne :", moyenne(temperatures))
