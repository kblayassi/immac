ecrit_francais = 12
oral_francais = 14
maths = 15
philosophie = 8
grand_oral = 16
eds_1 = 13
eds_2 = 18

total = (3 * ecrit_francais + 3 * oral_francais + 2 * maths + 8 * philosophie
         + 10 * grand_oral + 16 * eds_1 + 16 * eds_2)
moyenne = total / 58

print("Moyenne :", moyenne)

if moyenne >= 16:
    print("Admis mention très bien")
elif moyenne >= 14:
    print("Admis mention bien")
elif moyenne >= 12:
    print("Admis mention assez bien")
elif moyenne >= 10:
    print("Admis")
elif moyenne >= 8:
    print("Rattrapage")
else:
    print("Non admis")
