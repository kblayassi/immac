---
title: Spécifier une fonction
weight: 2
---

# Spécifier une fonction 📋

Pour qu’un programme soit **fiable**, il doit être **clairement défini** : on doit savoir **ce qu’il fait**, **avec quelles données** et **ce qu’il renvoie**.  
C’est le rôle de la **spécification** (ou **documentation**).

---

## Lire la documentation

Pour accéder à la documentation d'une fonction Python, on utilisera la commande `help` : 

!!! python "Commande `help`"
    La commande `help()` affiche dans le terminal la description, les paramètres attendus et parfois des exemples d'utilisation.

    ```python linenums="1"
    help(print)   # Affiche la documentation de la fonction print
    help(str)     # Affiche la documentation du type str
    ```

Toutes les fonctions intégrées à Python possèdent une documentation. Il sera toutefois nécessaire de spécifier nous-même les fonctions que nous allons créer...

---

## Le prototype d’une fonction 🧩

!!! definition "Définition : Prototype d'une fonction"
    **Prototyper une fonction** c'est préciser : 

    - son **nom**
    - ses **paramètres** et leur **type**
    - ses **retours** et leur **type**

!!! python "Prototyper une fonction en Python"
    En Python, il n'est pas nécessaire de donner le type des paramètres.  
    Cela facilite donc le travail d'écriture des fonctions : 

    ```python linenums="1"
    def somme(a, b):
        return a + b
    ```

    On peut toutefois choisir de faire apparaitre le type des paramètres et du retour : 

    ```python linenums="1"
    def somme(a: int, b:int ) -> int :
        return a + b
    ```

---

## Préconditions et postconditions ⚙️

Une fonction n’est **valide** que si certaines **conditions** sont respectées avant et après son exécution.

!!! definition "Définition : Précondition"
    Une **précondition** est une condition qui doit être **vraie avant l’exécution** de la fonction.  
    Elle garantit que les arguments fournis sont cohérents.

!!! definition "Définition : Postcondition"
    Une **postcondition** est une condition qui doit être **vraie après l’exécution** de la fonction.  
    Elle garantit que le **résultat obtenu** correspond bien à ce qui est attendu.

Pour vérifier ces conditions (et donc de repérer les erreurs plus tôt dans le programme), on utilisera la commande `assert` en Python.

!!! python "Commande `assert`"
    L’instruction assert permet de vérifier une condition :

    - Si la condition est vraie → le programme continue.
    - Si elle est fausse → une erreur est levée (`AssertionError`).

Exemple :

```python linenums="1"
x = -3
assert x >= 0
print("Tout va bien")
```

Résultat ? `AssertionError`

!!! tip "Erreur personnalisée"
    Il est possible de personnaliser l'erreur afin de plus facilement identifier le problème.

    Pour cela, on procèdera comme dans cet exemple : 

    ```python linenums="1"
    x = -3
    assert x >= 0, "x doit être positif" #On ajoute une description de l'erreur après l'assertion
    print("Tout va bien")
    ```

    Ce coup-ci, le résultat sera donc : `AssertionError : x doit être positif`


!!! example "Exemple concret"
    Par exemple, si on considère la fonction `racine_carree` qui prend pour paramètre un réel positif `x` et renvoie sa racine carré (un autre réel positif donc), on aurait : 

    ```python linenums="1"
    def racine_carree(x):
        assert x >= 0, "x doit être positif"       # précondition
        resultat = x ** 0.5 #La racine carré équivaut à une puissance 0.5
        assert resultat >= 0, "résultat négatif ?" # postcondition
        return resultat
    ```

---

## Spécifier une fonction Python : docstring ✅

!!! definition "Définition : Spécifier une fonction"
    **Spécifier** (ou **documenter**) une fonction, c'est indiquer clairement : 

    1.	Quels sont ses paramètres et leurs types ;
    2.	Expliquer ce qu’elle fait ;
    3.	Préciser ce qu’elle renvoie ;
    4.	Garantir ses préconditions et postconditions.

En Python, on utilisera le "docstring" comme vu précédemment.  
Par exemple, si on considère la fonction `racine_carree` de l'exemple précédent, on aurait : 

```python linenums="1" 
def racine_carree(x: float) -> float :
    """
    Calcule la racine carré d'un nombre réel positif. 

    Paramètres : x (float) -> nombre réel
    Retourne : float -> la racine carré de x

    Précondition : x doit être positif 
    """
    assert x >= 0, "x doit être positif"       # précondition
    resultat = x ** 0.5 #La racine carrée équivaut à une puissance 0.5
    return resultat
```

La documentation ainsi écrite sera également accessible via la commande `help` : 

```python linenums="1"
help(racine_carree)
```

```
Help on function racine_carree in module __main__:

racine_carree(x)
    Calcule la racine carré d'un nombre réel positif.

    Paramètres : x (float) -> nombre réel
    Retourne : float -> la racine carré de x

    Précondition : x doit être positif
```



---

## À retenir 📌

!!! info "Résumé"
    - **Spécifier une fonction**, c’est décrire ce qu’elle fait, avec quelles entrées et quelles sorties.
    - La commande `help` permet d'accéder à la documentation d'une fonction.
    - Une **précondition** précise les contraintes avant l’exécution,
    - Une **postcondition** décrit le résultat attendu après.
    - Le **mot-clé `assert`** permet de vérifier automatiquement ces conditions.
    - Une bonne spécification rend le programme plus lisible, plus sûr et plus facile à tester.