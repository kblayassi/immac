from random import randint

lancer_de = randint(1, 6)   # un lancer de dé

while lancer_de != 6:
    print(lancer_de, "perdu !")
    lancer_de = randint(1, 6)

print(lancer_de, "gagné !")
