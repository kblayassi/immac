def moyenne(notes):
    """Renvoie la moyenne des notes. Le tableau ne doit pas être vide."""
    total = 0
    for i in range(len(notes)):
        total = total + notes[i]
    return total / len(notes)


def test_moyenne():
    """Écris ici un jeu de tests capable de démasquer la version buguée."""
    ...

test_moyenne()
print("Tous les tests passent sur cette version.")
