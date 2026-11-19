def compte_voyelles(phrase):
    voyelles = 'aeiouy'
    nb_voyelles = 0
    for lettre in phrase:
        if lettre in voyelles:
            nb_voyelles += 1
    return nb_voyelles


def test_compte_voyelles():
    """Écris ici tes assertions."""
    ...

test_compte_voyelles()
print("Tous les tests passent !")
