# 1. Deux façons de le vérifier : convertir 47 en hexadécimal,
#    ou relire "2F" comme un nombre hexadécimal.
verification = (hex(47) == "0x2f")        # ou : int("2F", 16) == 47

# 2. bin() renvoie une chaîne préfixée par "0b"
binaire_83 = bin(83)

print(verification, binaire_83)
print("47 en hexadécimal :", hex(47))
print("2F relu en base 10 :", int("2F", 16))
print("83 en binaire :", binaire_83, "soit", 64 + 16 + 2 + 1)
