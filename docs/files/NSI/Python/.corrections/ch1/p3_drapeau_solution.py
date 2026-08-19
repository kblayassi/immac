from random import randint

nombre_cache = randint(1, 10)
continuer = True
nb_essais = 0        # le compteur

while continuer:
    entree = input("Entre un nombre entre 1 et 10 (ou q pour quitter) : ")
    if entree == "q":
        continuer = False
        print("Abandon ! Le nombre caché était", nombre_cache)
    else:
        nb_essais = nb_essais + 1
        if int(entree) == nombre_cache:
            continuer = False
            print("Bravo ! Trouvé en", nb_essais, "essai(s)")
        elif int(entree) < nombre_cache:
            print("C'est plus grand")
        else:
            print("C'est plus petit")
