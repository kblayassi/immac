from random import randint

ALPHABET = "abcdefghijklmnopqrstuvwxyz"


def genere_lettres(n):
    resultat = []
    for i in range(n):
        resultat.append(ALPHABET[randint(0, 25)])
    return resultat


def tri(liste_lettres):
    liste = liste_lettres.copy()          # on ne touche pas au tableau reçu
    for i in range(len(liste) - 1):
        indice_min = i
        for j in range(i + 1, len(liste)):
            if liste[j] < liste[indice_min]:      # les lettres se comparent
                indice_min = j                    # comme des nombres !
        liste[i], liste[indice_min] = liste[indice_min], liste[i]
    return liste


lettres = genere_lettres(12)
print("avant :", lettres)
print("après :", tri(lettres))
