assert comptage(["a", "n", "a"], "a") == 2, "Le a apparaît deux fois"
assert comptage(["a", "n", "a", "l", "y", "s", "e", "a"], "a") == 3, "Le a apparaît trois fois dans le tableau de Julie"
assert comptage(["a", "n"], "z") == 0, "Une lettre absente donne 0"
assert comptage([], "a") == 0, "Un tableau vide ne contient rien"

assert recherche(["a", "n", "a"], "n"), "Le n est bien présent"
assert not recherche(["a", "n", "a"], "z"), "Le z est absent"
assert not recherche([], "a"), "Rien n'est présent dans un tableau vide"
assert recherche(["a", "n", "z"], "z"), "La lettre peut être en dernière position : attention au return False mal placé"
