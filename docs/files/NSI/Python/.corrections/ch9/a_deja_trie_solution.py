def deja_trie(T):
    for i in range(len(T) - 1):
        if T[i] > T[i + 1]:      # deux voisins mal rangés suffisent
            return False         # parcours partiel : inutile de continuer
    return True


# Version avec une boucle non bornée, tout aussi valable :
# def deja_trie(T):
#     i = 0
#     while i < len(T) - 1 and T[i] <= T[i + 1]:
#         i = i + 1
#     return i == len(T) - 1
