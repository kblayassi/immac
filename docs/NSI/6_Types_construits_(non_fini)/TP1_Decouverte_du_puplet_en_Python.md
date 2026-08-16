---
title: TP1 - Découvrir les p-uplets en Python
weight: 0.9
---

# TP1 - Découverte du p-uplet en Python

Le but de ce premier TP est de découvrir la notion de $p$-uplet et son implémentation en Python.

## Création d’un p-uplet

L’instruction `t1 = ("a", "b", "c", "d")` permet de créer par affectation un p-uplet, nommé `t1`. Les éléments sont séparés par des virgules et les parenthèses sont optionnelles, mais fortement recommandées. Le p-uplet est de type **tuple**.

1. Ouvrez la [console Basthon](https://console.basthon.fr), puis écrire l'instruction : 
`t1 = ("a", "b", "c", "d", "e")` dans la console et appuyer sur la touche `Entrée`.

1. Créer par affectation un p-uplet nommé `t2` contenant les lettres du mot “book”. 

## Test d’appartenance

1. Écrire l’instruction `"e" in t1` dans la console et appuyer sur `Entrée`. Quel est le résultat obtenu ? 
2. Faire de même avec l’instruction `"b" in t1`. Conclure sur le rôle joué par l’opérateur `in`.

## Opérations utiles sur les p-uplets

Deux opérateurs de concaténation notés `+` et `*` permettent de manipuler les p-uplets.

1. Que renvoie l’instruction `t1 + t2` dans la console Python ? 
2. Même question avec l’instruction `2 * t1` ?

## Accès à un élément contenu dans un p-uplet

On peut accéder directement à l’un des éléments d’un p-uplet en utilisant la même syntaxe que pour les chaînes de caractères, c’est-à-dire la notation entre crochets, en précisant l’indice (appelé également **index**).

1. Que renvoie l’instruction `t1[2]` ? et `t1[-1]` ?
2. Préciser l’indexe de position de chaque élément de `t1`.

## Un p-uplet n’est pas modifiable par affectation

1. Que renvoie l’instruction d’affectation `t1[2] = "s"` ? Conclure sur le caractère modifiable (on dit mutable) d’un p-uplet.

## Premières utilisation

Dans un notebook Basthon, effectuer les opérations suivantes : 

2. Écrire une fonction Python `multiples(n)` qui renvoie le double, le triple et le quadruple d’un nombre `n` donné en argument, sous forme de triplet (3-uplet).

3. Écrire une instruction Python qui appelle la fonction `multiples(n)` et stocke les multiples de 5 dans trois variables `a`, `b` et `c`.

4. Écrire une instruction pour affecter à une variable `d` la somme du double et du triple de 5 en réutilisant les variables `a` et `b` de la réponse précédente.