ALPHABET = "abcdefghijklmnopqrstuvwxyz"


def rang(lettre):
    """Renvoie la position de lettre dans l'alphabet (0 pour a, 25 pour z),
    ou -1 si ce n'est pas une lettre minuscule. Cette fonction vous est donnée."""
    for i in range(len(ALPHABET)):
        if ALPHABET[i] == lettre:
            return i
    return -1



def chiffrer(message, decalage):
    resultat = ""
    for lettre in message:
        position = rang(lettre)              # -1 si ce n'est pas une lettre
        if position == -1:
            resultat = resultat + lettre     # espace, ponctuation : tel quel
        else:
            nouvelle = (position + decalage) % 26   # le modulo fait le tour
            resultat = resultat + ALPHABET[nouvelle]
    return resultat


def dechiffrer(message, decalage):
    return chiffrer(message, -decalage)
