import math


def duree_maxime(n):
    """Durée, en secondes, du programme de Maxime : 2n² opérations
    sur une machine à 20 milliards d'opérations par seconde."""
    return 2 * n ** 2 / 20e9


def duree_arthur(n):
    """Durée, en secondes, du programme d'Arthur : 50·n·log2(n) opérations
    sur une machine 20 fois plus lente."""
    return 50 * n * math.log2(n) / 1e9


def bascule():
    """Renvoie la plus petite taille n à partir de laquelle
    le programme d'Arthur devient le plus rapide."""
    ...

