_d = {"a": 1, "b": 2}
_r = inverse(_d)

assert _r == {1: "a", 2: "b"}, "Les clés et les valeurs doivent être échangées"
assert _d == {"a": 1, "b": 2}, "Le dictionnaire d'origine ne doit pas être modifié"
assert inverse({}) == {}, "Un dictionnaire vide donne un dictionnaire vide"
assert inverse({"x": 10}) == {10: "x"}, "Une seule entrée"
assert inverse(inverse(_d)) == _d, "Inverser deux fois doit redonner le dictionnaire de départ"

_codes = {"France": "FR", "Espagne": "ES"}
assert inverse(_codes) == {"FR": "France", "ES": "Espagne"}, "Ça doit marcher avec des chaînes des deux côtés"
