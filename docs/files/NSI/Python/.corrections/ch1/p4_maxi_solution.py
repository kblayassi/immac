def maxi_2(n1, n2):
    if n1 > n2:
        return n1
    else:
        return n2


def maxi_3(n1, n2, n3):
    # le plus grand des trois, c'est le plus grand entre n3
    # et le plus grand des deux premiers
    return maxi_2(maxi_2(n1, n2), n3)
