def fusionner(d1, d2):
    resultat = d1.copy()                 # une copie, pour ne pas abîmer d1
    for cle, valeur in d2.items():
        resultat[cle] = valeur           # crée l'entrée, ou écrase celle de d1
    return resultat
