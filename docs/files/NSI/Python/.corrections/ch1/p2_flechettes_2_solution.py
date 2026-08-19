from random import randint

numero_ligne = randint(0, 4)
numero_colonne = randint(0, 4)

print("La fléchette atteint la case ligne", numero_ligne, ", colonne", numero_colonne)

# L'ordre compte : la case rouge est aussi sur la croix orange,
# il faut donc la tester en premier.
if numero_ligne == 2 and numero_colonne == 2:
    print("100 points")
elif numero_ligne == 2 or numero_colonne == 2:
    print("50 points")
else :
    print("0 point")
