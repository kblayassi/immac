def prix_etudiants(nbre_adultes, nbre_etudiants, nbre_enfants):
    resultat = 37 * nbre_adultes + 30 * nbre_etudiants + 28 * nbre_enfants
    return resultat


print("1 adulte, 2 étudiants, 3 enfants :", prix_etudiants(1, 2, 3), "€")
