assert nb_annees == 15, "Avec 1000 € placés à 5 %, le capital double au bout de 15 années"
assert capital >= 2 * capital_initial, "À la sortie de la boucle, le capital doit avoir atteint le double du capital initial"
assert capital < 2.2 * capital_initial, "La boucle tourne trop longtemps : elle doit s'arrêter dès que le capital a doublé"
