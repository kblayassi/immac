assert test() == "OK", "La fonction de test de Malek doit renvoyer OK"

assert prix_unitaire(2, 1) == 2, "Un seul produit à 2 € coûte 2 €"
assert prix_unitaire(10, 5) == 2, "5 produits pour 10 € : 2 € l'unité, sans réduction"
assert prix_unitaire(20, 10) == 2, "À exactement 10 unités, la réduction ne s'applique pas encore"
assert abs(prix_unitaire(40, 18) - 2) < 1e-9, "18 unités : 40 x 0,9 / 18 = 2 €"
assert abs(prix_unitaire(100, 20) - 4.5) < 1e-9, "20 unités : 100 x 0,9 / 20 = 4,50 €"
assert abs(prix_unitaire(100, 11) - 8.181818) < 1e-4, "Dès 11 unités, la réduction s'applique"
assert abs(prix_unitaire(100, 10) - 10) < 1e-9, "À 10 unités pile, pas de réduction"
