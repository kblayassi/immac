M = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for i in range(len(M)):           # pour chaque ligne
    for j in range(len(M[i])):    # pour chaque colonne de cette ligne
        print(M[i][j])
