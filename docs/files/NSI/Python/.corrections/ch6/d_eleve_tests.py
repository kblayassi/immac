_e = {"Alice": {"age": 16, "moyenne": 15}, "Bob": {"age": 17, "moyenne": 12}}

assert moyenne_de(_e, "Alice") == 15, "La moyenne d'Alice est 15"
assert moyenne_de(_e, "Bob") == 12, "La moyenne de Bob est 12"
assert moyenne_de(_e, "Zoé") is None, "Pour un élève inconnu, la fonction doit renvoyer None"

inscrire(_e, "Chloé", 16, 18)
assert "Chloé" in _e, "Après inscription, Chloé doit être une clé du dictionnaire"
assert _e["Chloé"] == {"age": 16, "moyenne": 18}, "La fiche de Chloé doit contenir son âge et sa moyenne"
assert moyenne_de(_e, "Chloé") == 18, "moyenne_de doit fonctionner sur le nouvel élève"

assert moyenne_generale({"A": {"moyenne": 10}, "B": {"moyenne": 20}}) == 15, "(10 + 20) / 2 = 15"
assert moyenne_generale({"A": {"moyenne": 12}}) == 12, "Un seul élève"
