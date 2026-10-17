# Le module marvel est déjà disponible : il contient une liste « personnages »
# avec les noms de tous les personnages de l'univers Marvel.
import marvel

print(len(marvel.personnages), "personnages")
print(marvel.personnages[:5])


def compte_perso(liste_persos, chaine):
    """Renvoie le nombre de personnages dont le nom contient chaine."""
    ...


# print(compte_perso(marvel.personnages, "Black"))
