from time import time


def duree_boucle(n):
    temps_debut = time()          # relevé AVANT
    for k in range(n):
        pass
    temps_fin = time()            # relevé APRÈS
    return temps_fin - temps_debut


for n in [100000, 1000000, 2000000]:
    print(n, "tours :", duree_boucle(n), "s")
