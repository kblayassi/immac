fable = """maitre corbeau sur un arbre perche tenait en son bec un fromage
maitre renard par l odeur alleche lui tint a peu pres ce langage"""


def compter_lettre(texte, lettre):
    compteur = 0
    for caractere in texte:
        if caractere == lettre:
            compteur = compteur + 1
    return compteur


def frequence(texte, lettre):
    return compter_lettre(texte, lettre) / len(texte) * 100


for lettre in "easin":
    print(lettre, ":", compter_lettre(fable, lettre), "fois")
