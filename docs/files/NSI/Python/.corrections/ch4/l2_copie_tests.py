_t = [1, 2, 3]
assert doubler(_t) == [2, 4, 6], "doubler([1, 2, 3]) doit renvoyer [2, 4, 6]"
assert _t == [1, 2, 3], "doubler() ne doit pas modifier le tableau reçu"
assert doubler([]) == [], "Un tableau vide donne un tableau vide"

_notes = [12, 15]
_resultat = ajouter_note(_notes, 18)
assert _resultat == [12, 15, 18], "ajouter_note([12, 15], 18) doit renvoyer [12, 15, 18]"
assert _notes == [12, 15], "ajouter_note() ne doit pas modifier le tableau reçu : pense à le copier"
assert _resultat is not _notes, "Le tableau renvoyé doit être un nouvel objet, pas un alias"
assert ajouter_note([], 5) == [5], "Ajouter à un tableau vide"
