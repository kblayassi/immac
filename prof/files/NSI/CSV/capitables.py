# Exercice 1 de la séquence 4

# Si vous utilisez l'éditeur Python Bordas, le fichier capitales.csv est déjà chargé
# Si vous utilisez un autre éditeur Python, le fichier capitales.csv est à déposer dans le même dossier que le fichier activite_1.py

import csv

def lecture_fichier(nom_fichier):
    with open(nom_fichier, "r") as fichier:
        return [ligne for ligne in csv.reader(fichier)]

def exporter(tableau, nom_fichier):
    with open(nom_fichier, "w") as fichier:
        csv.writer(fichier).writerows(tableau)
