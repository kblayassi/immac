_secret = chiffre("BONJOUR", "MAURIAC")

assert len(_secret) == 7, "Le mot chiffré doit avoir la même longueur que le mot clair"
assert _secret == '\x0f\x0e\x1b\x18\x06\x14\x11', "Le chiffrement de BONJOUR par MAURIAC ne donne pas le bon résultat"
assert chiffre(_secret, "MAURIAC") == "BONJOUR", "Rechiffrer avec la même clé doit redonner le mot de départ"
assert chiffre("A", "A") == chr(0), "Une lettre XOR elle-même donne toujours 0"
assert chiffre("NSI", "NSI") == chr(0) * 3, "Un mot XOR lui-même donne des zéros"

_declenchee = False
try:
    chiffre("BONJOUR", "CLE")
except AssertionError:
    _declenchee = True
assert _declenchee, "Une clé de longueur différente doit lever une AssertionError"
