secret = 123456

mot_de_passe = int(input("Mot de passe : "))

while mot_de_passe != secret:
    print("Mauvais mot de passe...")
    mot_de_passe = int(input("Mot de passe : "))

print("Vous pouvez entrer !")
