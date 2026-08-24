def doubler(tableau):
    resultat = []                      # on construit un nouveau tableau
    for element in tableau:
        resultat.append(element * 2)
    return resultat


def ajouter_note(notes, note):
    copie = notes.copy()               # sans cette copie, on modifierait
    copie.append(note)                 # le tableau de l'appelant !
    return copie
