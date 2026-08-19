from random import randint

lancer = randint(1, 6)
nb_lancers = 1

while lancer != 6:
    lancer = randint(1, 6)
    nb_lancers = nb_lancers + 1

print("Il a fallu", nb_lancers, "lancer(s) pour obtenir un 6")
