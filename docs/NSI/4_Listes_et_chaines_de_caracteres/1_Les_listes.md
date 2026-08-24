---
title: Les listes
weight: 1
---

# Les listes : principes de base 📚

En Python, on appelle **tableau** une structure permettant de stocker plusieurs valeurs accessibles par leur **index**.  
En pratique, Python utilise le type `list`, qui a la particularité d'être **modifiable** : son contenu peut changer après sa création.

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

---

## Indexation des éléments

Les éléments d’une liste sont accessibles grâce à leurs **indices**.

!!! definition "Index"
    L’**index** est la position d’un élément dans la liste.  
    Pour une liste de taille `n`, les indices vont de **0 à n−1**.

!!! python "Accéder à un élément"
    On peut accéder à l'élément de rang `i` de la liste `L` grâce à la syntaxe `L[i]` : 

{{ python_playground(
      key="ch4-cours-indexation",
      hauteur="200px",
      example_file="files/NSI/Python/exemples/ch4/cours_indexation.py"
    ) }}

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

{{ python_playground(
      key="ch4-cours-modifier",
      hauteur="180px",
      example_file="files/NSI/Python/exemples/ch4/cours_modifier.py"
    ) }}

Ou même ajouter de nouveaux éléments : 

!!! python "Méthode `append()`"
    La méthode `append()` ajoute un élément à la fin d’une liste.

{{ python_playground(
      key="ch4-cours-append",
      hauteur="180px",
      example_file="files/NSI/Python/exemples/ch4/cours_append.py"
    ) }}
---

## Quelques fonctions utiles

!!! python "Fonctions `len()`, `sum()`, `min()`, `max()`, `in`"
    Voici quelques fonctions Python qui pourront nous être utiles lorsque l'on travaillera avec les listes. Exécutez le programme, puis modifiez la liste `L` pour vérifier que les résultats suivent :

{{ python_playground(
      key="ch4-cours-fonctions",
      hauteur="240px",
      example_file="files/NSI/Python/exemples/ch4/cours_fonctions.py"
    ) }}

---

## Parcourir une liste

Deux façons principales : **par élément** ou **par index**.

!!! python "Parcours par élément"
    On utilise le mot-clé `in` pour parcours les éléments de la liste. On peut ainsi agir directement avec les éléments. 
{{ python_playground(
      key="ch4-cours-parcours-element",
      hauteur="180px",
      example_file="files/NSI/Python/exemples/ch4/cours_parcours_element.py"
    ) }}

!!! python "Parcours par index"
    On utilise une variable de boucle allant de `0` (premier élément de la liste) à `len(L)` (dernier élément de la liste). On peut ainsi agit directement avec l'index des éléments. 
{{ python_playground(
      key="ch4-cours-parcours-index",
      hauteur="180px",
      example_file="files/NSI/Python/exemples/ch4/cours_parcours_index.py"
    ) }}

!!! tip "Quel parcours choisir ?"
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

## À retenir 📌

!!! info "Résumé"
    - Une liste est un tableau **modifiable**, **indexé** et **ordonné**.
    - Les éléments sont accessibles **via leurs indices**.
    - Deux types de parcours : **par élément** ou **par index**.
    - Les **compréhensions** permettent de créer rapidement de nouvelles listes.

Un tableau peut contenir bien autre chose que des nombres — y compris d'autres tableaux.
C'est ce que nous verrons dans la partie suivante, avec les **matrices**. 🧮
