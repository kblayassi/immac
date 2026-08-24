def tours_puissance1(n):
    tours = 0
    for i in range(1, n + 1):     # la boucle fait exactement n tours
        tours = tours + 1
    return tours


def tours_puissance2(n):
    tours = 0
    while n > 0:                  # n est divisé par 2 à chaque tour
        n = n // 2
        tours = tours + 1
    return tours


for n in [5, 50, 5000, 5000000]:
    print(n, ":", tours_puissance1(n), "tours contre", tours_puissance2(n))
