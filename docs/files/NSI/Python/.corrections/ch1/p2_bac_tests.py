import sys
_sortie = sys.stdout.getvalue().lower()

assert abs(moyenne - 14.2758620) < 0.01, "La moyenne pondérée vaut environ 14,28 (somme des coefficients : 58)"
assert "mention bien" in _sortie, "Avec cette moyenne, le résultat est « Admis mention bien »"
assert "assez bien" not in _sortie, "« Assez bien » commence à 12 et s'arrête à 14"
assert "très bien" not in _sortie, "« Très bien » commence à 16"
assert "rattrapage" not in _sortie and "non admis" not in _sortie, "Un seul message de résultat doit s'afficher"
