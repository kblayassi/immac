def recherche(tableau, valeur):
    for element in tableau:
        if element == valeur:
            return True    # trouvé : inutile de continuer
    return False           # on a tout regardé, sans succès
