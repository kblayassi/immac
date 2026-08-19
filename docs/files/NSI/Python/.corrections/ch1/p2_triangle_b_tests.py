import sys
_sortie = sys.stdout.getvalue()

assert "rectangle en B" in _sortie, "Avec BC = 3, AB = 4 et AC = 5, le message doit s'afficher"
assert AC ** 2 == AB ** 2 + BC ** 2, "Les longueurs de départ ne doivent pas être modifiées"
