---
title: Les dictionnaires (dict)
weight: 3
---

# Les dictionnaires (dict) 🗂️

En Python, un **dictionnaire** est une structure permettant d’associer une **clé** à une **valeur**.  
C’est un type construit très utile pour représenter des données structurées.

!!! definition "Définition : dictionnaire"
    Un **dictionnaire** est une collection **non ordonnée**, **modifiable** et **indexée par des clés**.

    Chaque **clé** est unique et permet d’accéder à une **valeur**.

!!! python "Type d'un dictionnaire"
    En Python, un dictionnaire est de type `dict`.

---

## Créer un dictionnaire



!!! python "Syntaxe d'un dictionnaire"
    Un dictionnaire s’écrit avec des **accolades** (contrairement aux p-uplets et aux listes). Une valeur est associée à une clé selon la syntaxe `clé:valeur`.

    ```python linenums="1"
    personne = {
        "nom": "Alice",
        "age": 23,
        "etudiant": True
    }
    ```

Dans l'exemple précédent, le dictionnaire `personne` est constitué : 

- Des clés `nom`, `age` et `etudiant`.
- Des valeurs : `Alice`, `23` et `True`

!!! info "Clés possibles"
    Les clés doivent être **immutables** : `int`, `float`, `str`, `tuple`, etc.  
    Ceci implique que les listes (`list`) ne peuvent **pas** être utilisées comme clés (mais elles peuvent être utilisées comme valeur...)

---

## Accéder à une valeur

Les éléments d'un dictionnaire ne sont pas indexés. Il est donc impossible d'afficher son $n$-ième élément.

Les valeurs sont, toutefois, accessibles grâce à leur **clé**. Raison pour laquelle **les clés doivent être toutes différentes**. 

!!! python "Lire une valeur"
    Pour accéder à une valeur, on utilisera la syntaxe : `nom_dico[clé]`
    ```python linenums="1"
    personne = {"nom": "Alice", "age": 23}

    print(personne["nom"])  # Alice
    print(personne["age"])  # 23
    ```

!!! warning "Clé inexistante"
    Tenter d’accéder à une clé absente provoque une erreur :
    ```
    >>> personne['adresse']
    KeyError: 'adresse'
    ```

---

## Ajouter ou modifier une entrée

Un dictionnaire est **modifiable** : on peut ajouter ou mettre à jour des couples clé–valeur.

!!! python "Ajouter / modifier une entrée"
    Que ce soit pour ajouter ou modifier une entrée du dictionnaire, on utilisera la même syntaxe, à savoir : `nom_dico[clé] = valeur`
    ```python linenums="1"
    personne = {"nom": "Alice", "age": 23}

    personne["ville"] = "Paris"   # ajout
    personne["age"] = 24          # modification

    print(personne)
    # {'nom': 'Alice', 'age': 24, 'ville': 'Paris'}
    ```

---

## Supprimer une entrée

Il est également, bien entendu, possible de supprimer des couples `clé:valeur` du dictionnaire.

!!! python "`del` pour supprimer une entrée"
    Pour supprimer une entrée du dictionnaire, on utilisera la commande `del` : 

    ```python linenums="1"
    personne = {"nom": "Alice", "age": 23}
    del personne["age"]
    ```

---

## Parcourir un dictionnaire

Il existe **trois façons principales** de parcourir un dictionnaire.

!!! python "Parcours par clés"
    On parcours uniquement les clés du dictionnaire : 

    ```python linenums="1"
    d = {"a": 1, "b": 2}

    for cle in d.keys():
        print(cle)         # a b
    ```

    !!! info "Méthode `keys()`"
        La méthode `keys()` renvoie la collection itérable de toutes les clé du dictionnaire. 

        Par exemple, `d.keys()` renvoie : `dict_keys(['a', 'b'])`


!!! python "Parcours par valeurs"
    On parcours toutes les valeurs du dictionnaire :

    ```python linenums="1"
    d = {"a": 1, "b": 2}

    for valeur in d.values():
        print(valeur)           # 1 2
    ```

    !!! info "Méthode `values()`"
        La méthode `values()` renvoie la collection itérable de toutes les valeurs du dictionnaire. 

        Par exemple, `d.values()` renvoie : `dict_values([1, 2])`



!!! python "Parcours par items"
    On parcours chaque couple clé/valeur du dictionnaire : 

    ```python linenums="1"
    d = {"a": 1, "b": 2}

    for cle, valeur in d.items():
        print(cle, "→", valeur)        # a -> 1    b -> 2
    ```

    !!! info "Méthode `items()`"
        La méthode `items()` renvoie la collection de tous les objets du dictionnaires. 

        Par exemple, `d.items()` renvoie : `dict_items([('a', 1), ('b', 2)])`

    !!! tip "Utiliser `items()`"
        La méthode `items()` est indispensable lorsque les deux informations (clé et valeur) sont nécessaires.


---

## Exemples

Voici deux exemples d'utilisation d'un dictionnaire : 

=== "Notes d'élèves"

    On veut stocker les moyennes de quelques élèves :

    ```python linenums="1"
    moyennes = {
        "Alice": 15.5,
        "Bob": 12.0,
        "Chloé": 18.0
    }

    print(moyennes["Chloé"])  # 18.0
    ```

=== "Dictionnaire de dictionnaires"

    On peut organiser des données complexes :

    ```python linenums="1"
    eleves = {
        "Alice": {"age": 16, "moyenne": 15},
        "Bob":   {"age": 17, "moyenne": 12}
    }

    print(eleves["Alice"]["moyenne"])  # 15
    ```

!!! info "Dictionnaires imbriqués"
    Un dictionnaire peut contenir d’autres dictionnaires, des listes, des tuples…
    C’est une structure très flexible.

---

## À retenir 📌

!!! info "Résumé"
    - Un **dictionnaire** est une structure associant des **clés** et des **valeurs**.
    - On accède aux données grâce à la clé, **pas à un index**.
    - Les dictionnaires sont **modifiables**.
    - Parcours possible par **clés** (`keys()`), **valeurs** (`values()`) ou **couples clé–valeur** (`items()`).
    - Les structures imbriquées permettent d’organiser des données complexes.