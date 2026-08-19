---
title: Les boucles
weight: 3
---

# Répéter des instructions : les boucles 🔁🔂

Un programme doit souvent **répéter une suite d’instructions** plusieurs fois : c’est le rôle des **boucles**.  
En Python, on utilise principalement deux types de boucles : `while` et `for`.

---

## La boucle `while` 🔁

La boucle `while` permet de **répéter un bloc d’instructions tant qu’une condition est vraie**. Lorsque la condition devient fausse, la boucle s’arrête.

!!! definition "Définition : boucle non bornée"
    La boucle `while` est appelée boucle **non bornée** puisqu'on ne sait pas à l'avance le nombre de passage dans la boucle.

!!! python "Boucle non bornée `while`"
     En Python, la structure de base pour une boucle non bornée est :

    ```python linenums="1"  
    while condition :
        instructions
    ``` 

Par exemple, voici un programme qui effectue une succession de calcul jusqu'à ce que le résultat soit supérieur à 100 : 

```python linenums="1"
x = 1
somme = 0
while somme < 100:
    somme += x
    x += 1
print(x)
```

!!! warning "Boucle infinie"
    Attention à toujours bien écrire votre condition ! 
    
    Si cette dernière est mal écrite, ou si vous oubliez de mettre à jour une potentielle variable, il est possible que votre boucle devienne infinie. 

    Dans ce cas, le programme tournera sans fin dans votre boucle, pouvant causer le crash du site, logiciel ou ordinateur sur lequel vous codez.

    **Pensez donc bien à enregistrer votre travail avant d'executer une boucle non bornée !**

---

## La boucle `for` avec `range()` 🔃

La boucle `for` permet de répéter un bloc d’instructions un nombre connu de fois.

!!! definition "Boucle bornée"
    Contrairement à la bouche `while`, il est nécessaire de connaitre à l'avance le nombre de passage dans la boucle lors de l'utilisation de `for`. 

    On parlera donc de **boucle bornée**. 

Pour indiquer au programme le nombre de passage nécessaire, on utilisera la fonction `range()` : 

!!! python "Fonction `range()`"
    La fonction `range()` peut être utilisée avec 1, 2 ou 3 arguments en fonction de l'effet recherché : 

    <div align="center">

    | **Syntaxe**         | **Effet**                                |
    |---------------------|-------------------------------------------|
    | `range(n)`          | De 0 à n−1                                |
    | `range(a, b)`       | De a à b−1                                |
    | `range(a, b, p)`    | De a à b−1 avec un pas de p                    |

    </div>

!!! python "Boucle bornée `for`"
    En Python, la structure de base pour une boucle bornée est :

    ```python 
    for variable_boucle in range(...):
        instructions
    ```

    La **variable de boucle** est une variable qui n'est définie que lors de la création de la boucle. On la note généralement `loop`, `i` ou encore `_` quand elle n'est pas utilisé dans le programme. 

=== "Exemple 1"

    Si on souhaite afficher 30 fois "Coucou !" : 

    ```python linenums="1"
    for loop in range(30):
        print("Coucou !")
    ```

=== "Exemple 2"

    Si on souhaite afficher les nombres de 0 à 100 : 

    ```python linenums="1"
    for i in range(101):
        print(i)
    ```

=== "Exemple 3"

    Si on souhaite afficher les nombres de 100 à 1000 : 

    ```python linenums="1"
    for i in range(100,1001):
        print(i)
    ```

=== "Exemple 4"

    Si on souhaite afficher les nombres pair de 100 à 1000 : 

    ```python linenums="1"
    for i in range(100, 1001, 2):
        print(i)
    ```

=== "Exemple 5"

    Si on souhaite afficher 100 fois "Je ne triche pas en DS." : 

    ```python linenums="1"
    for _ in range(100):
        print("Je ne triche pas en DS.")
    ```

!!! expert "Boucles imbriquées"
    Une boucle peut être placée dans une autre :

    === "Exemple 1"

        Si on souhaite parcourir un "tableau" avec 3 lignes et 2 colonnes : 

        ```python linenums="1"
        for i in range(3): #Pour chaque ligne...
            for j in range(2): #Pour chaque colonne...
                print(i, j) #On affiche les coordonnées.
        ```

    === "Exemple 2"

        Si on souhaite afficher le nombre de nombres pairs inférieur à chaque nombres compris entre 0 et 100 : 

        ```python linenums="1"
        for i in range(100): #Pour chaque nombres compris entre 1 et 100...
            for j in range(0, i+1, 2): #Pour chaque nombre pair compris entre 0 et i...
                print(j) #On affiche ce nombre.
        ```

!!! expert "Pour aller plus loin : `break` et `continue`"
    Dans le corps d'une boucle, on pourra être amener à utiliser deux instructions python : 

    - `break` : arrête complètement la boucle
    - `continue` : passe à l’itération suivante

    === "Exemple `break`"

        On veut vérifier si 12345 est un nombre premier. Pour cela, on vérifie si chaque nombre compris entre 2 et 12344 est diviseur de 12345 (car 1 et 12345 le sont toujours). Si c'est le cas, on arrête tout. Le nombre n'est pas premier.

        ```python linenums="1"
        n= 12345
        for i in range(2, n):
            if n % i == 0:
                print(f"{n} n'est pas premier")
                break
        ```

    === "Exemple `continue`"

        On veut afficher tous les numéros de 1 à 20 sauf le 13 qui porte malheur : 

        ```python 
        for i in range(1, 20+1):
            if i == 13:
                continue
            print(i)
        ```

---

## À retenir 📌

!!! info "Résumé"
    - `while` : boucle non bornée qui se répète tant qu’une condition est vraie
    - `for` : boucle bornée qui se répète un nombre fixé de fois (souvent avec `range()`)
    - Penser à modifier une variable dans une boucle `while`
    - Les boucles peuvent être imbriquées
    - `break` et `continue` permettent de contrôler le déroulement d’une boucle