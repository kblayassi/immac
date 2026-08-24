def milieu(A, B):
    xA, yA = A
    xB, yB = B
    return ((xA + xB) / 2, (yA + yB) / 2)


def longueur(A, B):
    xA, yA = A
    xB, yB = B
    return ((xB - xA) ** 2 + (yB - yA) ** 2) ** 0.5
