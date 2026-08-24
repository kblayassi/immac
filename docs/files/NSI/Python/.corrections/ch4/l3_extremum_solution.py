temperatures = [12, -3, 8, 15, -7, 4]


def maximum(tableau):
    maxi = tableau[0]           # on part du PREMIER élément, jamais de 0 !
    for element in tableau:
        if element > maxi:
            maxi = element
    return maxi


def minimum(tableau):
    mini = tableau[0]
    for element in tableau:
        if element < mini:
            mini = element
    return mini


def extremum(tableau):
    moyenne = sum(tableau) / len(tableau)
    return [maximum(tableau), minimum(tableau), moyenne]
