capital_initial = 1000
taux = 5

capital = capital_initial
nb_annees = 0

while capital < 2 * capital_initial:
    capital = capital * (1 + taux / 100)
    nb_annees = nb_annees + 1

print("Le capital a doublé au bout de", nb_annees, "années")
