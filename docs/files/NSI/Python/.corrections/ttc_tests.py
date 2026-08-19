assert prix_ttc(100) == 120, "Pour 100 € HT, on attend 120 € TTC"
assert prix_ttc(0) == 0, "Un prix nul reste nul"
assert round(prix_ttc(19.99), 2) == 23.99, "Ça doit marcher aussi avec des décimaux"
assert prix_ttc(50) == 60, "Pour 50 € HT, on attend 60 € TTC"
