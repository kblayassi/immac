assert chiffrer("abc", 1) == "bcd", 'chiffrer("abc", 1) doit renvoyer "bcd"'
assert chiffrer("xyz", 3) == "abc", "Après le z, on repart au début : pense au modulo %"
assert chiffrer("bonjour", 0) == "bonjour", "Un décalage nul ne change rien"
assert chiffrer("vive la nsi", 5) == "anaj qf sxn", "Les espaces doivent être recopiés tels quels"
assert chiffrer("csar !", 4) == "gwev !", "La ponctuation aussi est recopiée telle quelle"
assert dechiffrer("bcd", 1) == "abc", 'dechiffrer("bcd", 1) doit renvoyer "abc"'
assert dechiffrer(chiffrer("secret", 7), 7) == "secret", "Chiffrer puis déchiffrer doit redonner le message d'origine"
assert dechiffrer(chiffrer("bonjour la nsi", 13), 13) == "bonjour la nsi", "Ça doit marcher sur une phrase entière"
