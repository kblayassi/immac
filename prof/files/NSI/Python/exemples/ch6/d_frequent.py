def compter_lettres(texte):
    """Cette fonction vous est donnée : elle est celle de l'exercice précédent."""
    compteurs = {}
    for lettre in texte:
        if lettre in compteurs:
            compteurs[lettre] = compteurs[lettre] + 1
        else:
            compteurs[lettre] = 1
    return compteurs


def lettre_la_plus_frequente(texte):
    """Renvoie la lettre qui revient le plus souvent dans le texte.
    En cas d'égalité, on renvoie celle rencontrée en premier.
    Appelle obligatoirement compter_lettres()."""
    ...

