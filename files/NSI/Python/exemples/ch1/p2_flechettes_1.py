from random import randint

# Bob lance sa fléchette : elle atteint une case au hasard du plateau.
numero_ligne = randint(0, 4)
numero_colonne = randint(0, 4)

print("La fléchette atteint la case ligne", numero_ligne, ", colonne", numero_colonne)

if ... :
    print("Bob a gagné")
elif ... :
    print("Bob a gagné")
else :
    print("Bob a perdu")
