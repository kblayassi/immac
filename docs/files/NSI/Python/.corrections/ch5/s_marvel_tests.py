import marvel

assert compte_perso(["Iron Man", "Black Widow"], "Black") == 1, "Un seul nom contient Black"
assert compte_perso([], "Black") == 0, "Une liste vide ne contient rien"
assert compte_perso(["Black Cat", "Black Bolt"], "Black") == 2, "Deux noms sur deux"
assert compte_perso(["Iron Man"], "Black") == 0, "Aucun nom ne contient Black"
assert compte_perso(["Ant-Man", "Ant-Man"], "Ant") == 2, "Les doublons comptent chacun pour un"

_reponse = compte_perso(marvel.personnages, "Black")
assert _reponse > 0, "Le module marvel contient forcément des personnages nommés Black..."
assert _reponse == len([_p for _p in marvel.personnages if "Black" in _p]), "Ta fonction ne trouve pas le bon nombre de personnages contenant Black"
