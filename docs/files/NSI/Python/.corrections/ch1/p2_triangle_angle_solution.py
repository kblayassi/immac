AB = 5
AC = 3
BC = 4

print("AB =", AB, "; AC =", AC, "; BC =", BC)

# L'angle droit est au sommet opposé au plus grand côté :
# rectangle en A  <=>  [BC] est l'hypoténuse, etc.
if BC ** 2 == AB ** 2 + AC ** 2:
    print("ABC est un triangle rectangle en A")
elif AC ** 2 == AB ** 2 + BC ** 2:
    print("ABC est un triangle rectangle en B")
elif AB ** 2 == AC ** 2 + BC ** 2:
    print("ABC est un triangle rectangle en C")
else :
    print("ABC n'est pas un triangle rectangle")
