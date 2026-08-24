def valeur_absolue(x):
    if x >= 0:
        return x
    else:
        return -x


def test_valeur_absolue():
    assert valeur_absolue(5) == 5      # un nombre positif
    assert valeur_absolue(-8) == 8     # un nombre négatif
    assert valeur_absolue(0) == 0      # le cas limite

test_valeur_absolue()
print("Tous les tests passent !")
