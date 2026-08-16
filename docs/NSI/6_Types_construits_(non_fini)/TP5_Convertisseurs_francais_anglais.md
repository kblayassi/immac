---
title: TP5 - Convertisseur français → anglais
weight: 3.1
---

# TP5 - Convertisseur français → anglais

Pierre, qui a des difficultés à retenir les verbes irréguliers d’anglais, a l’idée d’écrire un programme en Python pour s’auto-évaluer. Son professeur de NSI lui suggère d’utiliser un dictionnaire Python.

## Création du dictionnaire 

Voici une liste de quelques verbes irréguliers et de leurs trois formes : infinitive, prétérit et participe passé.

|Avoir         |Savoir           |Aller         |Prendre          |Chercher            |
|--------------|-----------------|--------------|-----------------|--------------------|
|have, had, had|know, knew, known|go, went, gone|take, took, taken|seek, sought, sought|

1. Ouvrez la [console Basthon](https://console.basthon.fr).
2. Dans la partie « programme » à gauche, écrire une instruction pour créer un dictionnaire nommé `mots` dont les clés sont les verbes en français et les valeurs sont des **chaînes de caractères** comme par exemple `"have, had, had"`.

## Accès aux éléments d’un dictionnaire

Pour manipuler un dictionnaire, quatre fonctions (appelées des **méthodes**) permettent d’interroger le dictionnaire : ce sont les méthodes `items()`, `keys()`, `values()` et `len()`.

1. Compléter le tableau suivant en saisissant les instructions de la première ligne dans la console Python.

    |Instruction                    |mots.items()|mots.keys()|mots.values()|len(mots)|
    |-------------------------------|------------|-----------|-------------|---------|
    |Que renvoie cette instruction ?|            |           |             |         |

1. Que renvoie la fonction `concatener()` ci-dessous ?
   
    Est-il possible d’utiliser aussi `mots.keys()` et `mots.items()` dans une boucle `for` à la place de `mots.values()` ?

    ```python
    def concatener(mots):
        c = ""
        for valeur in mots.values():
            c = c + valeur + ", "
        return c
    ```

1. Que se passe-t-il si l’on tente d’insérer deux entrées ayant la même clé ? Tester cette éventualité et proposer une explication.
2. Pierre a désormais une centaine de verbes inscrits. Écrire une fonction booléenne `cherche(verbe, mots)` qui renvoie `True` si le verbe cherché est dans le dictionnaire `mots`, et `False` sinon.
    
    ??? tip "Remarque : à lire après la résolution"
        Il est aussi possible d’utiliser la syntaxe `mots.has_key(k)` (qui renvoie `True` ou `False`) pour vérifier si une clé `k` est déjà présente ou non dans le dictionnaire.

3. Pierre écrit l’instruction `cherche("avoir", mots)` dans la console Python, qui renvoie `False`, alors que le verbe est présent dans le dictionnaire `mots`. Expliquer.