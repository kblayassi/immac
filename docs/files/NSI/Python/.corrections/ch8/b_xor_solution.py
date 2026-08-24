def chiffre(mot_clair: str, cle: str) -> str:
    """
    Chiffre mot_clair avec cle, par un XOR caractère par caractère.

    Précondition : mot_clair et cle ont la même longueur.
    """
    assert len(mot_clair) == len(cle), "Le mot et la clé doivent avoir la même longueur"
    mot_chiffre = ''
    for i in range(len(mot_clair)):
        code = ord(mot_clair[i]) ^ ord(cle[i])
        mot_chiffre = mot_chiffre + chr(code)
    return mot_chiffre


secret = chiffre("BONJOUR", "MAURIAC")
print(repr(secret))
print(chiffre(secret, "MAURIAC"))    # on retrouve le mot de départ
