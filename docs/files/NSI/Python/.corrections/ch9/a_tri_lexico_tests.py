_l = genere_lettres(15)
assert len(_l) == 15, "genere_lettres(15) doit renvoyer 15 lettres"
assert all(c in ALPHABET for c in _l), "Toutes les lettres doivent être comprises entre a et z"

assert tri(["c", "a", "b"]) == ["a", "b", "c"], "Le tri doit ranger les lettres de a à z"
assert tri(["b", "a", "b"]) == ["a", "b", "b"], "Les doublons doivent être conservés"
assert tri([]) == [], "Un tableau vide reste vide"
assert tri(["z"]) == ["z"], "Un seul élément"
assert tri(["z", "y", "x", "a"]) == ["a", "x", "y", "z"], "Un tableau rangé à l'envers"

_depart = ["d", "a", "c"]
tri(_depart)
assert _depart == ["d", "a", "c"], "Le tableau reçu ne doit pas être modifié : pense à le copier"

_alea = genere_lettres(30)
_trie = tri(_alea)
assert len(_trie) == 30, "Le tri ne doit perdre aucune lettre"
assert all(_trie[i] <= _trie[i + 1] for i in range(len(_trie) - 1)), "Le résultat doit être rangé dans l'ordre, même sur un tirage aléatoire"
