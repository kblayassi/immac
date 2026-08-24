repertoire = {"Alice": "06 12 34 56 78", "Bob": "07 98 76 54 32"}


def ajouter(repertoire, nom, numero):
    repertoire[nom] = numero


def numero_de(repertoire, nom):
    if nom in repertoire:
        return repertoire[nom]
    else:
        return "inconnu"


def supprimer(repertoire, nom):
    if nom in repertoire:        # sans ce test, del provoquerait une KeyError
        del repertoire[nom]
