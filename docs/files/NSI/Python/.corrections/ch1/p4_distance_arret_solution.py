def reaction(vitesse):
    """Distance parcourue pendant le temps de réaction, en mètres."""
    return vitesse / 3.6


def freinage(vitesse):
    """Distance de freinage, en mètres."""
    return vitesse ** 2 / 200


def arret(vitesse):
    """Distance d'arrêt totale, en mètres."""
    return reaction(vitesse) + freinage(vitesse)


vitesse = float(input("Quelle est votre vitesse en km/h ? "))

print("Distance de réaction :", reaction(vitesse), "m")
print("Distance de freinage :", freinage(vitesse), "m")
print("Distance d'arrêt :", arret(vitesse), "m")
