def prix(nbre_adultes, nbre_enfants):
    resultat = 37 * nbre_adultes + 28 * nbre_enfants
    return resultat

adultes = int(input("Nombre d'adultes ? "))
enfants = int(input("Nombre d'enfants ? "))

a_payer = prix(adultes, enfants)
print("À payer :", a_payer, "€")
