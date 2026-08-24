_d = duree_boucle(200000)
assert isinstance(_d, float), "La fonction doit renvoyer une durée, donc un flottant"
assert _d >= 0, "Une durée ne peut pas être négative : as-tu soustrait dans le bon sens ?"
assert _d < 30, "La durée mesurée est anormalement longue"
assert duree_boucle(0) < 0.1, "Une boucle de 0 tour doit être quasi instantanée"
assert duree_boucle(2000000) > duree_boucle(1000), "Une boucle plus longue doit prendre plus de temps"
