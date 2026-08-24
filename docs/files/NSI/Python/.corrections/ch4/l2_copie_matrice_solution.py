M = [[1, 2], [3, 4]]

N = M.copy()
N[0][1] = 99
print("M vaut", M, "après avoir modifié N...")


def copier_matrice(M):
    # copy() ne recopierait que la liste extérieure : les lignes resteraient
    # partagées. Il faut donc copier chaque ligne, une par une.
    return [ligne.copy() for ligne in M]
