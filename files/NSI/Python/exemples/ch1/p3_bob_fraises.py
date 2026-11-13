# On définit une variable nombre qu'on initialise à 0 :
nombre = 0

# Bob répète ses cueillettes :
for i in range(10) :
    print("Bob mange", nombre, "fraises")
    nombre = nombre + 1   # à chaque cueillette, il en mange une de plus
