import math


def duree_maxime(n):
    return 2 * n ** 2 / 20e9


def duree_arthur(n):
    return 50 * n * math.log2(n) / 1e9


def bascule():
    n = 2                       # surtout pas 1 : log2(1) vaut 0,
                                # Arthur semblerait alors instantané
    while duree_maxime(n) <= duree_arthur(n):
        n = n + 1
    return n


print("Arthur l'emporte à partir de n =", bascule())
