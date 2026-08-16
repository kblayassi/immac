---
title: TP4 - Découverte du type dictionnaire
weight: 2.9
---

# TP4 - Découverte du type dictionnaire

Les éléments d’un p-uplet ou d’une liste sont accessibles en lecture grâce à leur indice `0`, `1`, `2`, etc. Dans un dictionnaire, on accède à un élément non pas avec son indice, mais avec une **clé**, à laquelle est associée une **valeur**.

Un dictionnaire est une variable de type **dict**.

## Première approche

1. Ouvrez la [console Basthon](https://console.basthon.fr).

2. Créer un dictionnaire vide nommé `dico` avec l’instruction :
`dico = {}`.`

3. Pour ajouter une valeur associée à une clé dans le dictionnaire, on utilise la syntaxe : `dico[clé] = valeur` Dans le dictionnaire `dico`, ajouter la **clé** `bit` associée à la chaine de caractères suivante : `"élément d'information valant 0 ou 1"` (bien noter la présence de guillemets doubles qui permet d’utiliser des apostrophes).

4. Faire de même, en ajoutant au dictionnaire la valeur `"unité de calcul de l’ordinateur"` associée à la clé `"processeur"`. 

## Accès aux éléments d’un dictionnaire

1. Écrire l’instruction `dico[0]` dans une console Python, puis appuyer sur `Entrée`. Que remarquez-vous ?
Proposer une explication.

2. Pour accéder à la valeur d’un dictionnaire `dico` correspondant à la clé `c`, on utilise la syntaxe `dico[c]`. Quelle est l’instruction à écrire dans la console pour afficher la définition du mot “bit” ?

3. Quelle est l’instruction à écrire pour afficher la définition du mot “processeur” ?

4. Compléter le tableau ci-dessous en indiquant les deux clés du dictionnaire et leur valeur associée.
De quel type sont les clés de `dico` ?

    |Clés                    |→|Valeurs                 |
    |------------------------|-|------------------------|
    |…………………………………………………………….|→|…………………………………………………………….|
    |…………………………………………………………….|→|…………………………………………………………….|

5. En procédant de même, ajouter l’entrée « RAM » avec comme description « Mémoire vive ».

6. Que renvoie l’instruction `len(dico)` ?