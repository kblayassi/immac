def operations_parcours(n):
    tableau = [0] * n
    operations = 0
    for element in tableau:
        operations = operations + 1
    return operations


def operations_double_boucle(n):
    tableau = [0] * n
    operations = 0
    for i in range(len(tableau)):
        for j in range(len(tableau)):
            operations = operations + 1
    return operations


for n in [10, 100, 1000]:
    print(n, ":", operations_parcours(n), "contre", operations_double_boucle(n))
