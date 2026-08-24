def est_majeur(age):
    """Renvoie True si la personne est majeure, False sinon."""
    return age >= 18


def test_est_majeur():
    assert est_majeur(25) == True       # nettement majeur
    assert est_majeur(12) == False      # nettement mineur
    assert est_majeur(18) == True       # LE cas limite
    assert est_majeur(17) == False      # juste en dessous

test_est_majeur()
print("Tous les tests passent sur cette version.")
