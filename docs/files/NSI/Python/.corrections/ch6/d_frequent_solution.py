def compter_lettres(texte):
    compteurs = {}
    for lettre in texte:
        if lettre in compteurs:
            compteurs[lettre] = compteurs[lettre] + 1
        else:
            compteurs[lettre] = 1
    return compteurs


def lettre_la_plus_frequente(texte):
    compteurs = compter_lettres(texte)

    # même schéma que la recherche d'un maximum, mais sur les entrées d'un dictionnaire
    record = None
    for lettre in compteurs:
        if record is None or compteurs[lettre] > compteurs[record]:
            record = lettre
    return record
