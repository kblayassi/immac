---
title: Introduction
weight: 1
---

# Listes, piles et files 📚🥞🚶

En Première, une question ne se posait jamais : **comment** le `list` de Python range-t-il ses
éléments ? On écrivait `notes[3]`, `notes.append(15)`, et cela marchait. Cette année, c'est
précisément cette question qui devient le sujet.

Car derrière `append` et les crochets, il y a des choix — et d'autres choix étaient possibles.
Un ingénieur a décidé, un jour, que les éléments d'une liste Python se suivraient en mémoire.
Ce choix rend l'accès à la case n° 1000 instantané, et l'insertion en tête coûteuse. Une autre
décision aurait donné l'inverse.

!!! definition "Structure de données"
    Une **structure de données** est une façon d'organiser des informations en mémoire, choisie
    pour rendre rapides les opérations dont on se sert le plus.

## Le contrat d'abord, le code ensuite

L'idée qui organise tout le chapitre tient en une phrase : **on décrit une structure par ce
qu'elle sait faire, avant de dire comment elle est faite**.

- Ce qu'elle sait faire, c'est son **interface** : la liste de ses opérations et la promesse
  de chacune. C'est un texte, pas du code.
- Comment elle est faite, c'est son **implémentation** : le code, et la façon de ranger les
  données. Il y en a toujours **plusieurs**.

!!! definition "Type abstrait de données"
    Un **type abstrait de données** est une structure décrite par sa seule interface : les noms
    de ses opérations, ce qu'elles prennent, ce qu'elles rendent, ce qu'elles promettent. Rien
    sur la mémoire, rien sur le langage.

Cette séparation n'est pas une coquetterie de théoricien. C'est elle qui permet de changer
entièrement l'intérieur d'une bibliothèque sans que les milliers de programmes qui s'en servent
aient à être relus.

## Les trois structures du chapitre

Nous en étudierons trois, toutes **linéaires** — leurs éléments se suivent, l'un après l'autre :

| Structure | Ce qui la caractérise | L'image |
|---|---|---|
| La **liste** | une tête, et une queue qui est elle-même une liste | un train de wagons accrochés |
| La **pile** | on n'accède qu'au **dernier arrivé** — *LIFO* | une pile d'assiettes |
| La **file** | on n'accède qu'au **premier arrivé** — *FIFO* | la queue à la boulangerie |

!!! warning "Deux pièges de vocabulaire, dès maintenant"
    - La **liste** du chapitre n'est **pas** le `list` de Python. Le `list` de Python est un
      *tableau* ; la liste dont nous parlons est un type abstrait, sans indices, né avec le
      langage **Lisp** en 1958.
    - **Piles et files sont volontairement pauvres.** Elles interdisent plus qu'elles
      n'autorisent, et c'est exactement ce qui fait leur force : une structure qui ne permet
      qu'un seul geste ne permet pas de se tromper de geste.

## Ce que nous allons faire

1. **Spécifier** une structure par son interface, et écrire des programmes **clients** qui ne
   regardent jamais dedans 📋
2. Découvrir le type abstrait **liste** : `vide`, `est_vide`, `cons`, `car`, `cdr` 🚂
3. Découvrir les **piles** (LIFO) et les **files** (FIFO), et les implémenter 🥞
4. Écrire **plusieurs implémentations** d'une même structure — la file par un tableau, puis par
   deux piles — et constater que les clients n'y voient que du feu 🔁
5. Comprendre les **listes chaînées**, et ce que le chaînage rend gratuit 🔗
6. **Choisir** la structure adaptée à une situation, en comparant le coût des opérations, et
   distinguer la recherche dans une liste de la recherche dans un dictionnaire 🎯
7. Mettre tout cela au travail : parenthésage, notation polonaise inverse, tri crêpes,
   simulation d'une file d'attente ⚙️

!!! info "Où est la programmation objet ?"
    Le programme associe à cette rubrique le vocabulaire des **classes**. Tout ce chapitre est
    écrit avec des **fonctions** : on se concentre d'abord sur les structures elles-mêmes. Le
    chapitre suivant reprendra exactement les mêmes piles et les mêmes files pour les réécrire
    en objet — et la comparaison sera d'autant plus parlante.

!!! tip "Comment travailler ce chapitre"
    L'essentiel du travail se fait dans le [parcours interactif](Parcours_interactif.md) :
    huit séances d'environ une heure trente, où le cours et les exercices alternent et se
    corrigent tout seuls. Cette page et la [conclusion](Conclusion.md) sont là pour situer et
    pour réviser.

    [Ouvrir le parcours interactif :material-arrow-right:](Parcours_interactif.md){ .md-button }
