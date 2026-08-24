assert compter_lettres("banane") == {"b": 1, "a": 2, "n": 2, "e": 1}, "On attend b:1, a:2, n:2, e:1"
assert compter_lettres("") == {}, "Un texte vide donne un dictionnaire vide"
assert compter_lettres("aaa") == {"a": 3}, "Une seule lettre, répétée trois fois"
assert compter_lettres("abc") == {"a": 1, "b": 1, "c": 1}, "Trois lettres différentes"
assert compter_lettres("a b") == {"a": 1, " ": 1, "b": 1}, "L'espace est un caractère comme un autre"

_c = compter_lettres("informatique")
assert _c["i"] == 2, "Le mot informatique contient deux i"
assert sum(_c.values()) == len("informatique"), "La somme des compteurs doit valoir la longueur du texte"
