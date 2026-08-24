def compte_voyelles(phrase):
    voyelles = 'aeiouy'
    nb_voyelles = 0
    for lettre in phrase:
        if lettre in voyelles:
            nb_voyelles += 1
    return nb_voyelles


def test_compte_voyelles():
    assert compte_voyelles("bonjour") == 3
    assert compte_voyelles("") == 0            # la chaîne vide
    assert compte_voyelles("bcdfg") == 0       # aucune voyelle
    assert compte_voyelles("aeiouy") == 6      # que des voyelles
    assert compte_voyelles("rythme") == 2      # le y compte

test_compte_voyelles()
print("Tous les tests passent !")
