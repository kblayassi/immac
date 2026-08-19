total = 0

depense = int(input("Entrez la somme dépensée : "))

while depense != -1:
    total = total + depense
    depense = int(input("Entrez la somme dépensée : "))

print("Dépense totale :", total)
