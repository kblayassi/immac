---
title: Tableau récapitulatif
weight: 4
---

# Tableau récapitulatif

Voici un tableau récapitulatif du chapitre : 

| | **P-uplet** | **Tableau (liste)** | **Dictionnaire** |
|----------------------------------------|----------------------------------------|----------------------------------------|----------------------------------------|
| **Notation** | `(1, 8, 5)` | `[1, 8, 5]` | `{1: 'Paul', 2: 'Tom', 3: 'Nadia'}`<br>Syntaxe : `{cle: valeur}` |
| **Construction** | p-uplet vide : `t = ()` <br> p-uplet : `t1=(1,8,5)`| Liste vide : `L = []` <br> Liste : `L1=[1,8,5]`| Dictionnaire vide : `D = {}`<br> Dictionnaire : `d1 = {1: 'Paul', 2: 'Tom', 3: 'Nadia'}` |
| **Les éléments internes peuvent être de différents types** | **Oui**<br>`t2 = (1, "b", True)` | **Oui**<br>`L2 = [1, "b", True]` | Les clés peuvent être de tout type, à condition d'être non modifiables : **int**, **str**, **tuple**<br>`d2 = {4: 'Léa', 5: 'Téo'}` |
| **Lecture du contenu** | `t1[0]` renvoie 1<br>`t1[-1]` renvoie le dernier élément de `t1`, soit 5.<br>`t2[2]` renvoie `True`. | `L1[0]` renvoie 1<br>`L1[-1]` renvoie le dernier élément de `L1`, soit 5.<br>`L2[2]` renvoie `True`. | `d1[0]` renvoie une erreur car la clé 0 n'existe pas dans `d1`.<br>`d1[1]` renvoie `"Paul"`. |
| **Opérations** - **Concaténation** | `t1 + t2` renvoie<br>`(1, 8, 5, 1, "b", True)`. | `L1 + L2` renvoie<br>`[1, 8, 5, 1, "b", True]`. | **Non**<br>`d1 + d2` renvoie une erreur de type. |
| **Opérations** - **Multiplication par un entier** | `2 * t1` renvoie<br>`(1, 8, 5, 1, 8, 5)`. | `2 * L1` renvoie<br>`[1, 8, 5, 1, 8, 5]`. | **Non**<br>`2 * d1` renvoie une erreur. |
| **Modifiable par affectation ?** | **Non**<br>On peut créer un nouveau p-uplet. | **Oui**<br>Avec l'instruction<br>`L1[2] = 4`,<br>`L1` devient<br>`[1, 8, 4]`. | On peut seulement modifier les valeurs, pas les clés.<br>Avec l'instruction<br>`d1[2] = "Joe"`, la valeur `'Tom'` est remplacée par `'Joe'`. |
| **Longueur** | `len(t1)` renvoie 3. | `len(L1)` renvoie 3. | `len(d1)` renvoie 3. |
| **Méthodes** | Pas de méthode spécifique à connaître. | `L1.append(element)`<br>ajoute `element` à la fin de la liste `L1`. | `d1.items()` renvoie la collection d'objets.<br>`d1.keys()` renvoie les clés.<br>`d1.values()` renvoie les valeurs. |