def puissance1(x, n):
    p = 1
    for i in range(n):          # n tours, une multiplication par tour : O(n)
        p = p * x
    return p


def puissance2(x, n):
    p = 1
    while n > 0:                # n est divisé par 2 à chaque tour : O(log n)
        if n % 2 != 0:          # si n est impair
            p = p * x
        x = x * x
        n = n // 2
    return p


import time

depart = time.time()
puissance1(2, 100000)
print("puissance1 :", time.time() - depart, "s")

depart = time.time()
puissance2(2, 100000)
print("puissance2 :", time.time() - depart, "s")
