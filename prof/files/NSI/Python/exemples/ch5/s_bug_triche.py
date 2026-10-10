from math import pi


def aire_disque(rayon):
    """Renvoie l'aire d'un disque de rayon donné."""
    return pi * rayon ** 2


def test_aire_disque():
    """Écris ici un jeu de tests capable de démasquer la version buguée."""
    ...

test_aire_disque()
print("Tous les tests passent sur cette version.")
