_a = {"x": 1, "y": 2}
_b = {"y": 20, "z": 30}
_f = fusionner(_a, _b)

assert _f == {"x": 1, "y": 20, "z": 30}, "En cas de clé commune, la valeur de d2 l'emporte"
assert _a == {"x": 1, "y": 2}, "Le premier dictionnaire ne doit pas être modifié : pense à le copier"
assert _b == {"y": 20, "z": 30}, "Le second dictionnaire ne doit pas être modifié"
assert _f is not _a, "Le résultat doit être un nouveau dictionnaire"
assert fusionner({}, {}) == {}, "Deux dictionnaires vides"
assert fusionner({"a": 1}, {}) == {"a": 1}, "Fusionner avec un dictionnaire vide"
assert fusionner({}, {"a": 1}) == {"a": 1}, "Fusionner un dictionnaire vide avec un autre"
