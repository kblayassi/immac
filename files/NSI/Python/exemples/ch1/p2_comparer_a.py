note = float(input("Saisir votre note : "))

if note >= 16:
    print("TB")
elif note >= 14:
    print("B")
elif note >= 12:
    print("AB")
elif note >= 10:
    print("reçu")
else:
    print("refusé")
