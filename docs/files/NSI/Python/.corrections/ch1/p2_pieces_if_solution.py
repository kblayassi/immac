from random import choice

lancer_1 = choice(["pile", "face"])
lancer_2 = choice(["pile", "face"])

print("Pièce 1 :", lancer_1)
print("Pièce 2 :", lancer_2)

if lancer_1 == lancer_2:
    print("gagné 1 euro")
if lancer_1 != lancer_2:
    print("perdu 1 euro")
