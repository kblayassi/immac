assert milieu((0, 0), (5, 6)) == (2.5, 3.0), "Le milieu de (0,0) et (5,6) est (2.5, 3.0)"
assert isinstance(milieu((0, 0), (2, 2)), tuple), "milieu doit renvoyer un p-uplet"
assert milieu((-2, 4), (2, -4)) == (0.0, 0.0), "Ça doit marcher avec des coordonnées négatives"
assert milieu((1, 1), (1, 1)) == (1.0, 1.0), "Le milieu d'un point avec lui-même, c'est lui-même"

assert longueur((0, 0), (3, 4)) == 5.0, "La longueur de (0,0) à (3,4) vaut 5"
assert longueur((1, 1), (1, 1)) == 0, "Un segment réduit à un point a une longueur nulle"
assert longueur((3, 4), (0, 0)) == 5.0, "L'ordre des points ne change pas la longueur"

_M = milieu((0, 0), (3, 4))
assert abs(longueur((0, 0), _M) - longueur(_M, (3, 4))) < 1e-9, "Le milieu doit être à égale distance des deux extrémités"
