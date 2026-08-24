_t = tri_selection(sommets)

assert len(_t) == len(sommets), "Le tri ne doit perdre aucun sommet"
assert _t[0] == ("Mont Everest", 8848), "Le premier doit être l'Everest, le plus haut"
assert _t[-1] == ("Annapurna", 8091), "Le dernier doit être l'Annapurna, le moins haut des dix"
assert all(_t[i][1] >= _t[i + 1][1] for i in range(len(_t) - 1)), "Les altitudes doivent décroître"
assert sommets[0] == ("Makalu", 8485), "Le tableau de départ ne doit pas être modifié : pense à le copier"

assert plus_hauts1(_t, 1) == [("Mont Everest", 8848)], "Le plus haut sommet du monde"
assert plus_hauts1(_t, 4) == [("Mont Everest", 8848), ("K2", 8611), ("Kangchenjunga", 8586), ("Lhotse", 8516)], "Les quatre plus hauts, dans l'ordre"
assert plus_hauts1(_t, 0) == [], "Zéro sommet demandé, tableau vide"

assert plus_hauts2(_t, 8500) == [("Mont Everest", 8848), ("K2", 8611), ("Kangchenjunga", 8586), ("Lhotse", 8516)], "Quatre sommets dépassent 8500 m"
assert plus_hauts2(_t, 8848) == [], "Aucun sommet ne dépasse strictement l'Everest"
assert len(plus_hauts2(_t, 8000)) == 10, "Les dix sommets dépassent 8000 m"
