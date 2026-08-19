nombre = float(input("Saisir un nombre entre 1 et 100 : "))

while nombre < 1 or nombre > 100:
    print("Ce nombre n'est pas dans l'intervalle demandé.")
    nombre = float(input("Saisir un nombre entre 1 et 100 : "))

print("On peut continuer !")
