import io, re, sys

def _capture(n):
    memoire, sys.stdout = sys.stdout, io.StringIO()
    try:
        syracuse(n)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = memoire

assert suivant(5) == 16, "5 est impair : suivant(5) doit valoir 3 x 5 + 1 = 16"
assert suivant(16) == 8, "16 est pair : suivant(16) doit valoir 8"
assert suivant(1) == 4, "suivant(1) doit valoir 4"
assert suivant(1) != 4.0 or isinstance(suivant(16), int), "Utilise la division entière // pour rester avec des entiers"

assert [int(x) for x in re.findall(r"\d+", _capture(5))] == [5, 16, 8, 4, 2, 1], "syracuse(5) doit afficher 5, 16, 8, 4, 2 puis 1"

assert temps_de_vol(1) == 0, "temps_de_vol(1) vaut 0 : on est déjà arrivé"
assert temps_de_vol(5) == 5, "temps_de_vol(5) doit valoir 5"
assert temps_de_vol(53) == 11, "temps_de_vol(53) doit valoir 11"

assert temps_max(10) == (19, 9), "Jusqu'à 10, le plus long vol est celui de 9, en 19 étapes"
assert temps_max(100) == (118, 97), "Jusqu'à 100, le plus long vol est celui de 97, en 118 étapes"
