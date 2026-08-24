def pgcd(a, b):
    r = a % b
    while r != 0:        # tant que le reste n'est pas nul
        a = b            # b devient le nouveau a
        b = r            # le reste devient le nouveau b
        r = a % b
    return b             # le PGCD est le dernier reste non nul


print(pgcd(782, 221))
