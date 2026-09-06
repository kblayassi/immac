ALPHABET = "abcdefghijklmnopqrstuvwxyz"


def rang(lettre):
    """Renvoie la position de lettre dans l'alphabet (0 pour a, 25 pour z),
    ou -1 si ce n'est pas une lettre minuscule. Cette fonction vous est donnée."""
    for i in range(len(ALPHABET)):
        if ALPHABET[i] == lettre:
            return i
    return -1



def chiffrer(message, decalage):
    """Décale chaque lettre minuscule de decalage rangs dans l'alphabet.
    Les autres caractères (espaces, ponctuation) sont recopiés tels quels.
    Après le z, on repart au début de l'alphabet."""
    ...


def dechiffrer(message, decalage):
    """L'opération inverse. Une seule ligne suffit !"""
    ...

