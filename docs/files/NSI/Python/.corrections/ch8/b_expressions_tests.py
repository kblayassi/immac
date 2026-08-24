assert tous_deux_non_nuls(3, 5), "3 et 5 sont bien tous deux non nuls"
assert not tous_deux_non_nuls(0, 5), "x est nul : la réponse est False"
assert not tous_deux_non_nuls(3, 0), "y est nul : la réponse est False"
assert not tous_deux_non_nuls(0, 0), "les deux sont nuls"

assert entre_0_et_10(5), "5 est bien dans l'intervalle"
assert entre_0_et_10(10), "10 est INCLUS dans l'intervalle"
assert not entre_0_et_10(0), "0 est EXCLU de l'intervalle"
assert not entre_0_et_10(11), "11 dépasse la borne"
assert not entre_0_et_10(-3), "une valeur négative est hors de l'intervalle"

assert vaut_0_ou_1(0) and vaut_0_ou_1(1), "0 et 1 conviennent tous les deux"
assert not vaut_0_ou_1(2), "2 ne convient pas"
assert not vaut_0_ou_1(-1), "-1 ne convient pas"

assert un_seul_est_nul(0, 5), "seul x est nul : True"
assert un_seul_est_nul(5, 0), "seul y est nul : True"
assert not un_seul_est_nul(0, 0), "les deux sont nuls : le ou exclusif renvoie False"
assert not un_seul_est_nul(3, 5), "aucun n'est nul : False"
