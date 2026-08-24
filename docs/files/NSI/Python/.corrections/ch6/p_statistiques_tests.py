assert statistiques([12, 15, 9, 18, 14]) == (9, 18, 13.6), "On attend (9, 18, 13.6)"
assert isinstance(statistiques([1, 2]), tuple), "La fonction doit renvoyer un p-uplet"
assert len(statistiques([1, 2])) == 3, "Le p-uplet doit contenir trois valeurs"
assert statistiques([7]) == (7, 7, 7), "Avec une seule valeur, tout est confondu"
assert statistiques([-5, -1, -3]) == (-5, -1, -3), "N'initialise pas mini et maxi à 0 !"
assert statistiques([2, 4]) == (2, 4, 3), "statistiques([2, 4]) doit renvoyer (2, 4, 3)"

_mini, _maxi, _moyenne = statistiques([3, 8, 4])
assert _mini <= _moyenne <= _maxi, "La moyenne est toujours comprise entre le minimum et le maximum"
