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

## $p$-uplet

!!! exopapier "Exercice 1 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère le p-uplet suivant :

    ```python
    t = (3, 7, 9)
    ```

    1. Donner la valeur de `t[0]`
    2. Donner la valeur de `t[2]`
    3. Donner la longueur du p-uplet

    ??? success "Correction"
        1. `t[0] = 3`  
        2. `t[2] = 9`  
        3. `len(t) = 3`

!!! exopapier "Exercice 2 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Parmi les écritures suivantes, indiquer lesquelles correspondent à un **p-uplet** :

    ```python
    a = (5)
    b = (5,)
    c = 5, 6
    d = [5, 6]
    ```

    ??? success "Correction"
        - `a` ❌ (entier)
        - `b` ✅ (p-uplet à un élément)
        - `c` ✅ (p-uplet)
        - `d` ❌ (liste)

!!! exoordi "Exercice 3 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Écrire un p-uplet `point` contenant les coordonnées du point A d’abscisse 4 et d’ordonnée −2, puis afficher ces coordonnées séparément.

    ??? success "Correction"
        ```python
        point = (4, -2)
        print(point[0])
        print(point[1])
        ```

!!! exopapier "Exercice 4 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le code suivant :

    ```python
    t = (1, 2, 3)
    t[1] = 10
    ```

    1. Le programme fonctionne-t-il ?
    2. Justifier la réponse.

    ??? success "Correction"
        1. Non  
        2. Les p-uplets sont immuables, on ne peut pas modifier une composante après création.

!!! exopapier "Exercice 5 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Sans exécuter le code, donner les valeurs affichées :

    ```python
    t = (4, 8, 15, 16)
    print(t[-1])
    print(len(t))
    ```

    ??? success "Correction"
        - `t[-1]` affiche `16`  
        - `len(t)` affiche `4`

!!! exoordi "Exercice 6 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrire une fonction `extremes` qui prend un p-uplet de nombres et renvoie un p-uplet contenant le minimum et le maximum.

    ??? success "Correction"
        ```python
        def extremes(t: tuple) -> tuple:
            """
            Renvoie un couple contenant le minimum et le maximum d'un p-uplet. 

            Argument: t -> un p-uplet

            Retourne: un couple
            """
            return (min(t), max(t))
        ```

!!! exopapier "Exercice 7 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python
    def f():
        return 2, 5
    ```

    1. Quel est le type de la valeur retournée ?
    2. Que font les instructions suivantes ?

        ```python
        a, b = f()
        ```

    ??? success "Correction"
        1. La fonction retourne un p-uplet  
        2. Le p-uplet est décomposé : `a = 2` et `b = 5`

!!! exopapier "Exercice 8 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On considère le p-uplet :

    ```python
    t = (1, (2, 3), 4)
    ```

    1. Combien de composantes contient `t` ?
    2. Donner la valeur de `t[1][0]`

    ??? success "Correction"
        1. Le p-uplet contient 3 composantes  
        2. `t[1][0] = 2`

!!! exoordi "Exercice 9 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrire une fonction `distance_origine` qui prend en paramètre un point du plan représenté par un p-uplet `(x, y)` et renvoie la distance à l’origine sous forme d’un nombre réel.

    ??? success "Correction"
        ```python
        def distance_origine(P: tuple) -> float:
            x, y = P
            return (x**2 + y**2)**0.5
        ```


!!! exopapier "Exercice 10 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On souhaite échanger les valeurs de deux variables `a` et `b` sans utiliser de variable temporaire.

    Proposer une solution en utilisant un p-uplet.
    

    ??? success "Correction"
        ```python
        a, b = b, a
        ```
        Python crée un p-uplet intermédiaire `(b, a)` puis l’affecte aux variables.


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

  

## Les dictionnaires

!!! exopapier "Exercice 1 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère le dictionnaire suivant :

    ```python
    d = {"a": 1, "b": 2}
    ```

    1. Donner la valeur associée à la clé `"a"`.
    2. Donner le nombre d’entrées du dictionnaire.

    ??? success "Correction"
        - `d["a"] = 1`
        - `len(d) = 2`
  
!!! exopapier "Exercice 2 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Parmi les écritures suivantes, indiquer lesquelles correspondent à des **dictionnaires** :

    ```python
    a = {"x": 3}
    b = {1, 2, 3}
    c = {}
    d = [("a", 1), ("b", 2)]
    ```

    ??? success "Correction"
        - `a` ✅
        - `b` ❌ (ensemble)
        - `c` ✅
        - `d` ❌ (liste)

!!! exoordi "Exercice 3 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Créer un dictionnaire `notes` associant `"Alice"` à 14 et `"Bob"` à 11, puis afficher la note de Bob.

    ??? success "Correction"
        ```python
        notes = {"Alice": 14, "Bob": 11}
        print(notes["Bob"])
        ```

!!! exopapier "Exercice 4 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Vrai ou faux ?

    - Les clés d’un dictionnaire doivent être uniques  
    - Un dictionnaire est indexé par des entiers consécutifs  
    - Un dictionnaire est modifiable  

    ??? success "Correction"
        - Vrai
        - Faux
        - Vrai

!!! exopapier "Exercice 5 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Sans exécuter le code, indiquer ce qui est affiché :

    ```python
    d = {"x": 5}
    d["x"] = 8
    print(d)
    ```

    ??? success "Correction"
        Le dictionnaire affiché est `{"x": 8}`.

!!! exoordi "Exercice 6 – :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Créer un dictionnaire vide puis y ajouter la clé `"ville"` associée à `"Millau"`.

    ??? success "Correction"
        ```python
        d = {}
        d["ville"] = "Millau"
        ```

!!! exopapier "Exercice 19 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Comparer liste et dictionnaire pour stocker des notes d’élèves.
    Donner un avantage du dictionnaire.

    ??? success "Correction"
        Le dictionnaire permet d’associer directement un nom à une note.


!!! exopapier "Exercice 7 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Sans exécuter le code, indiquer la valeur affichée :

    ```python
    d = {"a": 1, "b": 2}
    print("a" in d)
    ```

    ??? success "Correction"
        La valeur affichée est `True`.

!!! exoordi "Exercice 8 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrire une fonction `est_present` qui renvoie `True` si une clé est présente dans un dictionnaire, `False` sinon.

    ??? success "Correction"
        ```python
        def est_present(d: dict, cle) -> bool:
            return cle in d
        ```

!!! exopapier "Exercice 9 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le code suivant :

    ```python
    d = {"a": 1, "b": 2}
    for cle in d:
        print(cle)
    ```

    1. Que parcourt la boucle ?
    2. Qu’affiche ce programme ?

    ??? success "Correction"
        1. Les clés du dictionnaire  
        2. `a` puis `b` (dans un ordre quelconque)


!!! exoordi "Exercice 10 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrire une fonction qui renvoie la somme des valeurs d’un dictionnaire de nombres.

    ??? success "Correction"
        ```python
        def somme_valeurs(d: dict) -> int:
            s = 0
            for v in d.values():
                s += v
            return s
        ```

!!! exopapier "Exercice 11 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Sans exécuter le code, indiquer l’erreur éventuelle :

    ```python
    d = {"a": 1}
    print(d["b"])
    ```

    ??? success "Correction"
        Le programme provoque une erreur `KeyError`.

!!! exopapier "Exercice 12 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Expliquer pourquoi une liste ne peut pas être utilisée comme clé d’un dictionnaire.

    ??? success "Correction"
        Une liste est modifiable, or une clé doit être immuable.


!!! exoordi "Exercice 13 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Construire un dictionnaire associant chaque entier de 1 à 5 à son carré.

    ??? success "Correction"
        ```python
        d = {i: i*i for i in range(1, 6)}
        ```


!!! exopapier "Exercice 14 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Un dictionnaire est-il adapté pour représenter :
    - un répertoire téléphone (nom → numéro) ?
    - une suite ordonnée de nombres ?

    Justifier.

    ??? success "Correction"
        - Oui pour le répertoire  
        - Non pour une suite ordonnée


!!! exopapier "Exercice 15 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Sans exécuter le code, donner la valeur finale de `d` :

    ```python
    d = {"a": 1, "b": 2}
    d["c"] = d["a"] + d["b"]
    ```

    ??? success "Correction"
        `d = {"a": 1, "b": 2, "c": 3}`



!!! exoordi "Exercice 18 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Construire un dictionnaire imbriqué permettant de stocker pour chaque élève son âge et sa moyenne.

    ??? success "Correction"
        ```python
        eleves = {
            "Alice": {"age": 16, "moyenne": 15},
            "Bob": {"age": 17, "moyenne": 12}
        }
        ```

!!! exoordi "Exercice 20 – :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrire une fonction qui inverse clés et valeurs d’un dictionnaire (valeurs uniques).

    ??? success "Correction"
        ```python
        def inverse(d: dict) -> dict:
            return {v: k for k, v in d.items()}
        ```