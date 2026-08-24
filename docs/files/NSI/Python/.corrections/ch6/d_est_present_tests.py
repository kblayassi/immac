_d = {"nom": "Alice", "age": 23}

assert est_present(_d, "nom"), "La clé nom est bien présente"
assert not est_present(_d, "adresse"), "La clé adresse est absente"
assert not est_present(_d, "Alice"), "Alice est une VALEUR, pas une clé : la réponse est False"
assert not est_present({}, "nom"), "Un dictionnaire vide ne contient aucune clé"

assert valeur_ou_defaut(_d, "age", 0) == 23, "La clé existe : on renvoie sa valeur"
assert valeur_ou_defaut(_d, "adresse", "inconnue") == "inconnue", "La clé est absente : on renvoie la valeur par défaut"
assert valeur_ou_defaut({}, "x", -1) == -1, "Ça doit marcher aussi sur un dictionnaire vide"
