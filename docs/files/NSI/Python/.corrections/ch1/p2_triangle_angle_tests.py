import sys
_sortie = sys.stdout.getvalue()

assert "rectangle en C" in _sortie, "Avec AB = 5, AC = 3 et BC = 4, l'angle droit est en C"
assert "rectangle en A" not in _sortie, "Un seul message doit s'afficher : ici l'angle droit n'est pas en A"
assert "rectangle en B" not in _sortie, "Un seul message doit s'afficher : ici l'angle droit n'est pas en B"
assert "pas un triangle rectangle" not in _sortie, "Ce triangle est bien rectangle : ce message ne doit pas apparaître"
