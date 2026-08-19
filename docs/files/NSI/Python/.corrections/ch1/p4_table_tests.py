import io, sys

def _capture(n):
    memoire, sys.stdout = sys.stdout, io.StringIO()
    try:
        table_multiplication(n)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = memoire

_sortie = _capture(9)

assert _sortie.strip() != "", "table_multiplication doit afficher quelque chose"
assert len(_sortie.strip().splitlines()) == 10, "La table doit compter exactement 10 lignes"
assert "9 x 1 = 9" in _sortie, "La première ligne doit être : 9 x 1 = 9"
assert "9 x 10 = 90" in _sortie, "La dernière ligne doit être : 9 x 10 = 90"
assert "7 x 4 = 28" in _capture(7), "Ça doit fonctionner pour n'importe quel nombre"
