from random import randint

numero_ligne = randint(0, 4)
numero_colonne = randint(0, 4)

print("La fléchette atteint la case ligne", numero_ligne, ", colonne", numero_colonne)

if numero_ligne == 2:
    print("Bob a gagné")
elif numero_colonne == 2:
    print("Bob a gagné")
else :
    print("Bob a perdu")

# Version plus courte, avec un « ou » logique :
# if numero_ligne == 2 or numero_colonne == 2:
#     print("Bob a gagné")
# else:
#     print("Bob a perdu")
