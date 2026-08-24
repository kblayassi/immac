def tous_deux_non_nuls(x, y):
    return x != 0 and y != 0


def entre_0_et_10(x):
    return 0 < x <= 10          # Python autorise les inégalités enchaînées


def vaut_0_ou_1(x):
    return x == 0 or x == 1


def un_seul_est_nul(x, y):
    return (x == 0) != (y == 0)   # le « ou exclusif » : vrai si les deux diffèrent
    # on peut aussi écrire (x == 0) ^ (y == 0)
