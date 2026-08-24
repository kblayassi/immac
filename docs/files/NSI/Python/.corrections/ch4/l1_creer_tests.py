import sys
_sortie = sys.stdout.getvalue()

assert isinstance(notes, list), "notes doit contenir une liste"
assert notes == [12, 15, 11, 18, 16], "Après tes modifications, notes doit valoir [12, 15, 11, 18, 16]"
assert "5" in _sortie, "Ton programme doit afficher le nombre de notes, c'est-à-dire 5"
assert "16" in _sortie, "Ton programme doit afficher la dernière note, c'est-à-dire 16"
