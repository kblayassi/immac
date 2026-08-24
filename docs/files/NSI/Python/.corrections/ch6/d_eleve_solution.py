eleves = {
    "Alice": {"age": 16, "moyenne": 15},
    "Bob": {"age": 17, "moyenne": 12}
}


def moyenne_de(eleves, nom):
    if nom in eleves:
        return eleves[nom]["moyenne"]     # deux niveaux : l'élève, puis son champ
    else:
        return None


def inscrire(eleves, nom, age, moyenne):
    eleves[nom] = {"age": age, "moyenne": moyenne}


def moyenne_generale(eleves):
    total = 0
    for fiche in eleves.values():
        total = total + fiche["moyenne"]
    return total / len(eleves)
