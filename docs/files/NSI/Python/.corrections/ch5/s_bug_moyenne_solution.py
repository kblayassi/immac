def moyenne(notes):
    """Renvoie la moyenne des notes. Le tableau ne doit pas être vide."""
    total = 0
    for i in range(len(notes)):
        total = total + notes[i]
    return total / len(notes)


def test_moyenne():
    assert moyenne([10, 10, 10]) == 10
    assert moyenne([0, 20]) == 10
    assert moyenne([5]) == 5
    assert moyenne([1, 2, 3, 40]) == 11.5    # la dernière note pèse lourd

test_moyenne()
print("Tous les tests passent sur cette version.")
