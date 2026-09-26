from random import randint

# L'ordinateur choisit un nombre entre 1 et 10 :
nombre_cache = randint(1, 10)

# Au départ, on n'a ni trouvé, ni abandonné : le drapeau est levé.
continuer = True

while continuer:   # inutile d'écrire continuer == True : continuer est déjà un booléen
    entree = input("Entre un nombre entre 1 et 10 (ou q pour quitter) : ")
    if entree == "q":
        continuer = False
        print("Abandon !")
    elif int(entree) == nombre_cache:
        continuer = False
        print("Bravo !")
    else:
        print("Ce n'est pas la bonne réponse")   # le drapeau reste levé : on refait un tour
