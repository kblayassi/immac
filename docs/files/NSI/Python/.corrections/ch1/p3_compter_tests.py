import sys
_lignes = [l.strip() for l in sys.stdout.getvalue().splitlines() if l.strip()]

assert len(_lignes) == 51, "Il faut 51 lignes : de i = 0 à i = 50 inclus"
assert _lignes[0] == "i = 0", "La première ligne doit être exactement : i = 0"
assert _lignes[-1] == "i = 50", "La dernière ligne doit être exactement : i = 50"
assert _lignes[7] == "i = 7", "Chaque ligne doit être de la forme : i = 7"
