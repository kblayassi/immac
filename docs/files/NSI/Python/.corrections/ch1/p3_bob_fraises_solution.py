nombre = 1        # à la première cueillette, il mange déjà 1 fraise

for i in range(10) :
    print("Bob mange", nombre, "fraises")
    nombre = nombre + 1

# Autre correction possible : garder nombre = 0 et incrémenter AVANT d'afficher.
