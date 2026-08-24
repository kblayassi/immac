import sys
_sortie = sys.stdout.getvalue()

assert isinstance(notes, dict), "notes doit être un dictionnaire, écrit avec des accolades"
assert notes == {"Alice": 14, "Bob": 13, "Chloé": 17}, "Après tes trois opérations, on attend Alice 14, Bob 13 et Chloé 17"
assert "13" in _sortie, "Ton programme doit afficher la note de Bob"
assert "3" in _sortie, "Ton programme doit afficher le nombre d'élèves, c'est-à-dire 3"
