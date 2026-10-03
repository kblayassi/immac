M = [[1, 2], [3, 4]]

# Observe d'abord ce que donne une copie « ordinaire » :
N = M.copy()
N[0][1] = 99
print("M vaut", M, "après avoir modifié N...")


def copier_matrice(M):
    """Renvoie une copie VRAIMENT indépendante de la matrice M."""
    ...

