_depart = [1, 2, 3, 4, 5, 6]

assert pairs(_depart) == [2, 4, 6], "pairs([1, 2, 3, 4, 5, 6]) doit renvoyer [2, 4, 6]"
assert _depart == [1, 2, 3, 4, 5, 6], "Le tableau donné en paramètre ne doit pas être modifié"
assert pairs([1, 3, 5]) == [], "Sans élément pair, le résultat est un tableau vide"
assert pairs([]) == [], "Un tableau vide donne un tableau vide"
assert pairs([0, -2, 7]) == [0, -2], "0 et -2 sont pairs"
assert pairs_comprehension([1, 2, 3, 4, 5, 6]) == [2, 4, 6], "La version par compréhension doit donner le même résultat"
assert pairs_comprehension([0, -2, 7]) == [0, -2], "La version par compréhension doit gérer les mêmes cas"
