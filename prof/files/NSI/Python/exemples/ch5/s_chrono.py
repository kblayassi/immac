from time import time


def duree_boucle(n):
    """Renvoie la durée, en secondes, d'une boucle vide de n tours.
    Relève le temps avant, puis après, et renvoie la différence."""
    ...


for n in [100000, 1000000, 2000000]:
    print(n, "tours :", duree_boucle(n), "s")
