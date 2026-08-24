_donnees = [10, 20, 30, 40, 50]

assert moyenne_vues(_donnees, 5) == 30, "Sur les 5 jours : (10+20+30+40+50) / 5 = 30"
assert moyenne_vues(_donnees, 2) == 45, "Sur les 2 DERNIERS jours : (40+50) / 2 = 45"
assert moyenne_vues(_donnees, 1) == 50, "Sur le dernier jour : 50"
assert moyenne_vues([4, 4, 4], 3) == 4, "Des valeurs toutes égales"

assert meilleur_jour(_donnees) == 4, "Le record (50) est au dernier jour, d'indice 4"
assert meilleur_jour([5, 90, 12]) == 1, "Le record (90) est à l'indice 1"
assert meilleur_jour([7]) == 0, "Un seul jour : c'est forcément le meilleur"
assert meilleur_jour([9, 2, 9]) == 0, "En cas d'égalité, on garde la première position"
