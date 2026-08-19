import io, sys

def _capture(n):
    memoire, sys.stdout = sys.stdout, io.StringIO()
    try:
        table(n)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = memoire

_sortie = _capture(3)
assert _sortie.strip() != "", "La fonction table doit afficher quelque chose"
assert len(_sortie.strip().splitlines()) == 10, "Il faut exactement 10 lignes"
assert "3 x 1 = 3" in _sortie, "La première ligne doit être : 3 x 1 = 3"
assert "3 x 10 = 30" in _sortie, "La dernière ligne doit être : 3 x 10 = 30"
assert "7 x 4 = 28" in _capture(7), "Ça doit marcher pour n'importe quel n"
