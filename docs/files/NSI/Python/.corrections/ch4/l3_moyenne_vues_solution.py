vues = [120, 95, 240, 310, 180, 150, 420, 380, 290, 210,
        175, 160, 500, 640, 320, 280, 240, 190, 210, 260]


def moyenne_vues(donnees, nb_jours):
    total = 0
    # les nb_jours derniers jours : on démarre à len(donnees) - nb_jours
    for i in range(len(donnees) - nb_jours, len(donnees)):
        total = total + donnees[i]
    return total / nb_jours


def meilleur_jour(donnees):
    indice_record = 0
    for i in range(len(donnees)):
        if donnees[i] > donnees[indice_record]:
            indice_record = i
    return indice_record


print("Moyenne sur les 7 derniers jours :", moyenne_vues(vues, 7))
print("Meilleur jour : jour n°", meilleur_jour(vues))
