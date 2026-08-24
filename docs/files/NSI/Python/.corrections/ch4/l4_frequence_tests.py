assert compter_lettre("banane", "a") == 2, '"banane" contient 2 fois la lettre a'
assert compter_lettre("banane", "n") == 2, '"banane" contient 2 fois la lettre n'
assert compter_lettre("banane", "z") == 0, "Une lettre absente donne 0"
assert compter_lettre("", "a") == 0, "Un texte vide ne contient aucune lettre"
assert compter_lettre("aaa", "a") == 3, "Trois occurrences à la suite"

assert frequence("aabb", "a") == 50.0, "2 lettres a sur 4 caractères : 50 %"
assert frequence("abcd", "a") == 25.0, "1 lettre a sur 4 caractères : 25 %"
assert round(frequence("banane", "a"), 1) == 33.3, "2 lettres a sur 6 caractères : environ 33,3 %"
assert frequence("abcd", "z") == 0.0, "Une lettre absente a une fréquence nulle"
