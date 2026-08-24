assert fusion([1, 5, 6], [2, 4, 8, 12, 20]) == [1, 2, 4, 5, 6, 8, 12, 20], "L'exemple de l'énoncé"
assert fusion([], []) == [], "Deux tableaux vides"
assert fusion([1, 2, 3], []) == [1, 2, 3], "Fusionner avec un tableau vide"
assert fusion([], [4, 5]) == [4, 5], "Fusionner un tableau vide avec un autre"
assert fusion([1, 2], [3, 4]) == [1, 2, 3, 4], "Deux tableaux qui ne s'entrelacent pas"
assert fusion([3, 4], [1, 2]) == [1, 2, 3, 4], "Le second est entièrement avant le premier"
assert fusion([1, 3], [1, 2]) == [1, 1, 2, 3], "Les doublons doivent être conservés"
assert fusion([5], [1, 2, 3, 4, 6]) == [1, 2, 3, 4, 5, 6], "Des tailles très différentes"

_a, _b = [1, 4], [2, 3]
fusion(_a, _b)
assert _a == [1, 4] and _b == [2, 3], "Les tableaux reçus ne doivent pas être modifiés"
