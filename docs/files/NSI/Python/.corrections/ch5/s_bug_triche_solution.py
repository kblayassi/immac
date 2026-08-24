from math import pi


def aire_disque(rayon):
    """Renvoie l'aire d'un disque de rayon donné."""
    return pi * rayon ** 2


def test_aire_disque():
    assert abs(aire_disque(1) - 3.14159265) < 1e-6
    assert aire_disque(0) == 0
    assert abs(aire_disque(2) - 12.5663706) < 1e-6
    assert abs(aire_disque(7) - 153.9380400) < 1e-5   # une valeur inattendue

test_aire_disque()
print("Tous les tests passent sur cette version.")
