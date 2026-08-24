def extremes(t):
    return (min(t), max(t))


# Variante sans min() ni max(), avec un parcours (voir chapitre 4) :
# def extremes(t):
#     mini = t[0]
#     maxi = t[0]
#     for valeur in t:
#         if valeur < mini:
#             mini = valeur
#         if valeur > maxi:
#             maxi = valeur
#     return (mini, maxi)
