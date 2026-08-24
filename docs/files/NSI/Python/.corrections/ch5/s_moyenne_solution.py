def moyenne(note4: float) -> float:
    """
    Calcule la moyenne trimestrielle d'Augustin en fonction de sa dernière note.

    Paramètres :
    note4 (float) -> note obtenue à la dernière évaluation (coefficient 4)

    Retourne :
    float -> moyenne finale sur 20

    Précondition :
    0 <= note4 <= 20
    """
    assert 0 <= note4 <= 20, "La note doit être comprise entre 0 et 20"
    somme = 14 * 1 + 15 * 2 + 16 * 4 + note4 * 4
    total_coef = 1 + 2 + 4 + 4
    return somme / total_coef
