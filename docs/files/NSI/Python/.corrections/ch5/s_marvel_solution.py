import marvel


def compte_perso(liste_persos, chaine):
    c = 0
    for perso in liste_persos:
        if chaine in perso:
            c += 1
    return c


print(compte_perso(marvel.personnages, "Black"), "personnages contiennent Black")
