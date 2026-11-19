# Prédis d'abord chaque valeur sur ton cahier, puis exécute pour vérifier.
a = (2 > 1)
b = (3 == 1 + 2)
c = (1 < 0)
d = (2 != 5 / 2)
e = (2 != 5 // 2)
f = ('a' == 'A')
g = not a
h = b and c
i = b or c
j = not c and (d or e)

for nom, valeur in [("a", a), ("b", b), ("c", c), ("d", d), ("e", e),
                    ("f", f), ("g", g), ("h", h), ("i", i), ("j", j)]:
    print(nom, "=", valeur)
