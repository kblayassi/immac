---
title: Exercices
weight: 6
---

# Exercices 

Vous trouverez ci-dessous les exercices de cette séquence.

- Les exercices marqués avec :fontawesome-solid-pencil: se réalisent **sans ordinateur**.  
  Ceux indiqués par :fontawesome-solid-laptop: nécessitent **un ordinateur**.

- Le **niveau de difficulté** est indiqué par des étoiles :  
    <ul style="list-style: none;">
        <li>:fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star: → Exercices pour **s'approprier les notions**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star: → Exercices pour **renforcer vos compétences**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star: → Exercices pour vous **challenger** et tester vos acquis.</li>
    </ul>

Les corrections sont généralement disponibles, mais elles ne doivent être consultées **qu'après validation de votre production par l'enseignant**.

---

## Les tableaux

!!! exopapier "Exercice 1 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la liste suivante :

    ```python
    L = [5, 12, 9]
    ```

    1. Donner la valeur de `L[0]`
    2. Donner la valeur de `L[-1]`
    3. Donner la longueur de la liste

    ??? success "Correction"
        - `L[0] = 5`
        - `L[-1] = 9`
        - `len(L) = 3`

!!! exopapier "Exercice 2 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Parmi les écritures suivantes, indiquer lesquelles correspondent à des **listes** :

    ```python
    a = (1, 2, 3)
    b = [1, 2, 3]
    c = []
    d = "1, 2, 3"
    ```

    ??? success "Correction"
        - `a` ❌
        - `b` ✅
        - `c` ✅
        - `d` ❌

!!! exoordi "Exercice 3 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Créer une liste `notes` contenant les valeurs 10, 12, 15 puis afficher la deuxième note.

    ??? success "Correction"
        ```python
        notes = [10, 12, 15]
        print(notes[1])
        ```

!!! exopapier "Exercice 4 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Sans exécuter le code, indiquer ce qui est affiché :

    ```python
    L = [3, 6, 9]
    L[1] = 100
    print(L)
    ```

    ??? success "Correction"
        La liste affichée est `[3, 100, 9]`

!!! exoordi "Exercice 5 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Créer une liste vide `L`, puis y ajouter successivement les nombres 1, 2 et 3.

    ??? success "Correction"
        ```python
        L = []
        L.append(1)
        L.append(2)
        L.append(3)
        ```

!!! exopapier "Exercice 6 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Vrai ou faux ?

    - Une liste est immuable  
    - Les indices d’une liste commencent à 0  
    - Une liste peut être modifiée après sa création  

    ??? success "Correction"
        - Faux : on peut ajouter ou modifier un élément
        - Vrai
        - Vrai

!!! exopapier "Exercice 7 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Sans exécuter le code, indiquer la valeur affichée :

    ```python
    L = [2, 4, 6, 8]
    s = 0
    for x in L:
        s = s + x
    print(s)
    ```

    ??? success "Correction"
        La valeur affichée est `20`.

!!! exoordi "Exercice 8 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrire une fonction `somme` qui prend une liste de nombres et renvoie leur somme. (sans utiliser la méthode `sum`)

    ??? success "Correction"
        ```python
        def somme(L: list) -> int:
            s = 0
            for x in L:
                s += x
            return s
        ```

!!! exopapier "Exercice 9 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le code suivant :

    ```python
    L = [1, 2, 3]
    M = L
    M[0] = 100
    ```

    1. Donner la valeur finale de `L`
    2. Expliquer le résultat

    ??? success "Correction"
        1. `L = [100, 2, 3]`
        2. `L` et `M` désignent en fait la même liste en mémoire, la modification de `M` entraine donc la modification de `L` ! Pour effectuer une vraie copie de la liste `L`, on devrait procéder comme suit : 

            ```python linenums="1"
            M = L.copy()
            # ou
            M = L[:]
            # ou
            M = list(L)
            ```

!!! exopapier "Exercice 10 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Sans exécuter le code, indiquer la liste obtenue :

    ```python
    L = [1, 2, 3, 4]
    M = [x*2 for x in L]
    ```

    ??? success "Correction"
        `M = [2, 4, 6, 8]`

!!! exoordi "Exercice 11 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrire une fonction qui renvoie le nombre d’éléments pairs dans une liste.

    ??? success "Correction"
        ```python
        def nb_pairs(L: list) -> int:
            c = 0
            for x in L:
                if x % 2 == 0:
                    c += 1
            return c
        ```

!!! exopapier "Exercice 12 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Une liste est-elle adaptée pour représenter :
    - les notes d’un élève ?
    - les coordonnées d’un point ?
    
    Justifier.

    ??? success "Correction"
        - Oui pour les notes, car elles peuvent être modifier et il peut en avoir de nouvelles
        - Non pour les coordonnées (p-uplet plus adapté) car les coordonnées d'un point sont fixes.

!!! exoordi "Exercice 13 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Construire, par compréhension, la liste des carrés des entiers de 1 à 10.

    ??? success "Correction"
        ```python
        carres = [i*i for i in range(1, 11)]
        ```

!!! exopapier "Exercice 14 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère une matrice représentée par une liste de listes.

    1. Combien de lignes contient une matrice `M` de taille 4×3 ?
    2. Combien de colonnes ?

    ??? success "Correction"
        - 4 lignes
        - 3 colonnes


!!! exopapier "Exercice 15 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Sans exécuter le code, donner la valeur finale de `M` :

    ```python
    M = [[1, 2], [3, 4]]
    M[0][1] = 99
    ```

    ??? success "Correction"
        `M = [[1, 99], [3, 4]]`

!!! exoordi "Exercice 16 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrire une fonction qui prend une matrice carrée et renvoie la somme de la diagonale principale.

    ??? success "Correction"
        ```python
        def somme_diagonale(M: list) -> int:
            s = 0
            for i in range(len(M)):
                s += M[i][i]
            return s
        ```

!!! exoordi "Exercice 18 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Construire une matrice identité (avec uniquement des 0 sauf à la $i^e$ position de la $i^e$ ligne où il y aura des 1) de taille 4×4 à l’aide de listes en compréhension.

    ??? success "Correction"
        ```python
        I = [[1 if i == j else 0 for j in range(4)] for i in range(4)]
        ```


!!! exoordi "Exercice 20 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrire une fonction qui renvoie une nouvelle liste contenant uniquement les éléments strictement positifs d’une liste donnée.

    ??? success "Correction"
        ```python
        def positifs(L: list) -> list:
            return [x for x in L if x > 0]
        ```
