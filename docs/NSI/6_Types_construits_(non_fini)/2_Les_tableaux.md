---
title: Les tableaux (listes)
weight: 2
---

# Les tableaux (listes) 📚

En Python, on appelle **tableau** une structure permettant de stocker plusieurs valeurs accessibles par leur **index**.  
En pratique, Python utilise le type `list`, qui est **modifiable**, contrairement aux p-uplets vus précédemment.

!!! definition "Définition : tableau (liste)"
    Un **tableau** (ou *liste* en Python) est une collection **ordonnée**, **indexée** et **modifiable** d’éléments.

!!! warning "Restriction du programme"
    Le programme NSI indique que les tableaux doivent contenir des **éléments du même type**.  
    Python autorise l’hétérogène, mais **dans ce cours**, nous utiliserons toujours des listes homogènes.

!!! python "Type d'un tableau"
    En Python, un tableau est de type `list`.

---

## Créer une liste

Dans une liste, les termes doivent être séparés par des virgules et entourés de **crochets**. 

!!! python "Syntaxe d'une liste"
    En Python, une liste s’écrit entre **crochets** :

    ```python linenums="1"
    notes = [12, 15, 8, 18]
    couleurs = ["rouge", "vert", "bleu"]
    ```

!!! info "Liste vide"
    Il sera parfois intéressant de commencer le programme par une liste ne contenant aucune valeur. En python, une liste vide s’écrit :

    ```python linenums="1"
    L = []
    ```

!!! expert "Conversion d'un `tuple` en `list`"
    La fonction `list` permet de convertir un p-uplet de valeurs en une liste : 

    ```python linenums="1"
    L = list((1, 2, 3))  # conversion d'un tuple en liste
    ```

---

## Indexation des éléments

Tout comme pour les p-uplets, les éléments d’une liste sont accessibles grâce à leurs **indices**.

!!! definition "Index"
    L’**index** est la position d’un élément dans la liste.  
    Pour une liste de taille `n`, les indices vont de **0 à n−1**.

!!! python "Accéder à un élément"
    On peut accéder à l'élément de rang `i` de la liste `L` grâce à la syntaxe `L[i]` : 

    ```python linenums="1"
    L = [10, 20, 30, 40]
    print(L[0])   # 10
    print(L[2])   # 30
    print(L[-1])  # 40 (dernier élément)
    ```

!!! warning "Index hors limites"
    Un accès comme `L[10]` sur une liste de 4 éléments provoque une erreur :
    ```
    IndexError: list index out of range
    ```

---

## Modifier un élément

Les listes sont **modifiables** (on dit *mutables*). On peut donc utiliser la syntaxe précédente pour lire une valeur d'une liste, mais aussi la modifier : 

!!! example "Modifier un élément"
    On considère la liste `notes_NSI` contenant les notes de NSI de Quentin au premier trimestre. Suite à un rattrapage, sa denière note est passée de 9 à 15 : 

    ```python linenums="1"
    notes_NSI = [16, 14, 9]
    notes_NSI[2] = 15
    print(notes_NSI)   # [16, 14, 15]
    ```

Ou même ajouter de nouveaux éléments : 

!!! python "Méthode `append()`"
    La méthode `append()` ajoute un élément à la fin d’une liste.

    ```python linenums="1"
    notes = [12, 15, 9]
    notes.append(18)
    print(notes)   # [12, 15, 9, 18]
    ```
---

## Quelques fonctions utiles

!!! python "Fonctions `len()`, `sum()`, `min()`, `max()`, `in`"
    Voici quelques fonctions Python qui pourront nous être utile lorsque l'on travaillera avec les listes : 

    ```python linenums="1"
    L = [3, 6, 9]
    len(L)     # Renvoie la longueur de la liste (ici 3)
    sum(L)     # Renvoie la somme des éléments de la liste (ici 18)
    min(L)     # Renvoie la valeur minimum de la liste (ici 3)
    max(L)     # Renvoie la valeur maximale de la liste (ici 9)
    6 in L     # Vérifie si 6 est dans la liste L (ici True)
    ```

---

## Parcourir une liste

Deux façons principales : **par élément** ou **par index**.

!!! python "Parcours par élément"
    On utilise le mot-clé `in` pour parcours les éléments de la liste. On peut ainsi agir directement avec les éléments. 
    ```python linenums="1"
    L = [4, 6, 8]
    for valeur in L:
        print(valeur)
    ```

!!! python "Parcours par index"
    On utilise une variable de boucle allant de `0` (premier élément de la liste) à `len(L)` (dernier élément de la liste). On peut ainsi agit directement avec l'index des éléments. 
    ```python linenums="1"
    L = [4, 6, 8]
    for i in range(len(L)):
        print("Index :", i, " - Valeur :", L[i])
    ```

!!! expert "Quel parcours choisir ?"
    - Si seul le **contenu** t’intéresse → parcours direct  
    - Si tu as besoin de l’**index** → parcours par index  

---

## Listes en compréhension

Les compréhensions permettent de créer des listes de façon **compacte et lisible**.



!!! python "Syntaxe de construction en compréhension"
    Construire une liste en compréhension revient à décrire le contenu de la liste directement entre crochet. 

    ```python linenums="1"
    L = [expression for variable in sequence]
    ```

=== "Doubler chaque élément"
    Dans ce premier exemple, on cherche à créer une liste `M` contenant le double de chaque valeur d'une liste `L` : 

    ```python linenums="1" title="Construction par ajout successifs"
    L = [1, 2, 3]
    M = []
    for i in range(0, len(L)):
        M.append(L[i]*2)
    ```

    ```python linenums="1" title="Construction par comprehension"
    L = [1, 2, 3]
    M = [x * 2 for x in L]   # [2, 4, 6]
    ```

=== "Garder seulement les pairs"
    Dans ce deuxième exemple, on cherche à construire une liste `M` ne contenant que les valeurs paires d'une liste `L` : 

    ```python linenums="1" title="Construction par ajout successifs"
    L = [1, 2, 3, 4, 5, 6]
    M = []
    for i in range(len(L)):
        if L[i]%2==0:
            M.append(L[i])
    ```

    ```python linenums="1" title="Construction par comprehension"
    L = [1, 2, 3, 4, 5, 6]
    M = [x for x in L if x % 2 == 0]   # [2, 4, 6]
    ```

=== "Carrés de 0 à 10"
    Dans ce dernier exemple, on cherche à construire la liste `carres` contenant le carré des entiers de 0 à 10 : 

    ```python linenums="1" title="Construction par ajout successifs"
    carres = []
    for i in range(11):
        carres.append(i**2)
    ```

    ```python linenums="1" title="Construction par comprehension"
    carres = [i*i for i in range(11)]
    ```

!!! warning "Lisibilité"
    Une compréhension trop longue peut rendre le code difficile à lire.  
    Dans ce cas, préfère une boucle `for`.

---

## Tableaux de tableaux : matrices

Une **matrice** peut être représentée par une liste contenant d’autres listes.

!!! definition "Matrice"
    Une **matrice** est un tableau à deux dimensions :  
    une liste dont chaque élément est une **ligne**, elle-même représentée par une liste.

Par exemple, voici la matrice représentant le tableau ci-dessous : 



<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">

  <div>
    <div align="center">
        <img src="../../../files/NSI/Types_construits/matrice1.png" width=40%>
    </div>
  </div>

  <div>
    ```python linenums="1"
    M = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    ```
  </div>

</div>

!!! warning "Restriction du programme"
    Dans le cadre du programme NSI, toutes les lignes doivent avoir la même taille.

    On parlera alors de **matrices homogènes**

!!! python "Accéder à un élément d'une matrice"
    Pour accéder à un élément d'une matrice `M`, on utilisera la syntaxe : `M[ligne][colone]`

    Dans l'exemple ci-dessus, `M[2][2]` vaut 9, `M[0][1]` vaut 2, ...

!!! python "Parcourir une matrice"
    Deux possibilités pour parcourir une matrice : **par ligne** si l'on souhaite travailler avec les lignes entières ou **par lignes et colonnes** si l'on souhaite exploiter les valeurs directement.

    ```python linenums="1" title="Parcours par lignes"
    for ligne in M: 
        print(ligne) #Affichera les lignes une à une
    ```

    ```python linenums="1" title="Parcours par lignes et colonnes"
    for i in range(len(M)):         # lignes 
        for j in range(len(M[i])):  # colonnes 
            print(M[i][j]) #Affichera les éléments un à un
    ```

---

## À retenir 📌

!!! info "Résumé"
    - Une liste est un tableau **modifiable**, **indexé** et **ordonné**.
    - Les éléments sont accessibles **via leurs indices**.
    - Deux types de parcours : **par élément** ou **par index**.
    - Les **compréhensions** permettent de créer rapidement de nouvelles listes.
    - Une **matrice** est un **tableau de tableaux**, avec accès via `M[i][j]`.