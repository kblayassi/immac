notes = {"Alice": 14, "Bob": 11}

notes["Chloé"] = 17        # clé absente : l'entrée est créée

notes["Bob"] = 13          # clé présente : la valeur est remplacée

print("Note de Bob :", notes["Bob"])
print("Nombre d'élèves :", len(notes))
