def promo_A(prix_1, prix_2):
    # la réduction porte sur le moins cher des deux
    if prix_1 < prix_2:
        return prix_2 + prix_1 / 2
    else:
        return prix_1 + prix_2 / 2


def promo_B(prix_1, prix_2):
    return (prix_1 + prix_2) * 0.8


def meilleure_formule(prix_1, prix_2):
    if promo_A(prix_1, prix_2) <= promo_B(prix_1, prix_2):
        return "A"
    else:
        return "B"


# 4. Programme principal
parfum_1 = float(input("Prix du premier parfum : "))
parfum_2 = float(input("Prix du second parfum : "))

total_a = promo_A(parfum_1, parfum_2)
total_b = promo_B(parfum_1, parfum_2)

print("Formule A :", total_a, "€")
print("Formule B :", total_b, "€")
print("La formule la plus avantageuse est la formule", meilleure_formule(parfum_1, parfum_2))

if min(total_a, total_b) <= 50:
    print("Nicolas peut offrir les deux parfums à sa mère.")
else:
    print("50 € ne suffiront pas...")
