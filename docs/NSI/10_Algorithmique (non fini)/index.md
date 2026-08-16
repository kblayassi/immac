---
title: Introduction
weight: 10
---

# Introduction à l'algorithmique 🧩

Depuis l'Antiquité, les êtres humains cherchent à résoudre des problèmes en suivant des méthodes précises : effectuer des calculs, organiser des informations, retrouver une donnée, comparer des résultats...

Ces méthodes, lorsqu'elles sont décrites sous la forme d'une suite d'étapes claires, sont au coeur de ce que l'on appelle aujourd'hui un **algorithme**.

!!! info "Idée principale"
    L'algorithmique consiste à étudier des méthodes permettant de résoudre des problèmes.
    
    En informatique, ces méthodes peuvent ensuite être traduites en programmes exécutables par une machine.

---

## 1 - Pourquoi étudier des algorithmes ? 🧠

Un ordinateur est capable d'exécuter très rapidement des instructions, mais il ne choisit pas seul la méthode à utiliser.

C'est au programmeur ou à la programmeuse de décrire précisément les étapes à suivre pour résoudre un problème.

Pour un même problème, plusieurs méthodes peuvent exister.

Par exemple, pour chercher une valeur dans une liste, on peut :

- regarder les éléments un par un ;
- utiliser une méthode plus efficace si les données sont déjà organisées ;
- trier les données pour les exploiter plus facilement ensuite.

!!! info "À retenir"
    Étudier des algorithmes permet de comparer plusieurs méthodes pour résoudre un même problème.
    
    On cherche notamment à savoir si une méthode est correcte, si elle termine, et si elle est efficace.

---

## 2 - Un peu d'histoire 📜

Le mot **algorithme** vient du nom du mathématicien perse **Al-Khwârizmî**, qui a vécu entre le VIIIe et le IXe siècle.

Ses travaux ont notamment porté sur les méthodes de calcul et la résolution d'équations. Son nom latinisé, *Algoritmi*, a progressivement donné naissance au mot *algorithme*.

!!! histoire "Repère historique"
    **Al-Khwârizmî** est souvent associé à l'origine du mot *algorithme*.
    
    À l'origine, ce mot désignait surtout des méthodes de calcul. Aujourd'hui, il désigne plus largement une méthode précise permettant de résoudre un problème.

Au XXe siècle, l'informatique moderne se construit autour d'une idée essentielle : une machine peut exécuter automatiquement des suites d'instructions.

En 1936, **Alan Turing** propose un modèle théorique de machine capable d'exécuter n'importe quel algorithme : la **machine de Turing**.

!!! histoire "Repère historique"
    **Alan Turing** est un mathématicien britannique.
    
    Ses travaux ont permis de mieux comprendre ce qu'est un calcul, ce qu'une machine peut faire, et ce qu'un algorithme peut résoudre.

---

## 3 - Qu'est-ce qu'un algorithme ? ⚙️

!!! definition "Définition : algorithme"
    Un **algorithme** est une suite finie et précise d'instructions permettant de résoudre un problème.

Un algorithme n'est pas forcément écrit dans un langage de programmation.

Il peut être décrit :

- en langage naturel ;
- sous forme de pseudo-code ;
- sous forme d'organigramme ;
- dans un langage de programmation, comme Python.

Par exemple, une recette de cuisine peut être vue comme une forme d'algorithme :

1. préparer les ingrédients ;
2. suivre les étapes dans le bon ordre ;
3. obtenir un résultat attendu.

!!! info "À retenir"
    Un algorithme décrit une **méthode**.
    
    Un programme est l'écriture de cette méthode dans un langage compréhensible par une machine.

---

## 4 - Problèmes faciles et problèmes difficiles 🧠

Certains problèmes sont relativement faciles à résoudre pour un ordinateur.

Par exemple :

- chercher le maximum dans une liste ;
- calculer une moyenne ;
- vérifier si une valeur est présente dans un tableau ;
- trier une petite liste de nombres.

D'autres problèmes sont beaucoup plus difficiles.

Par exemple :

- trouver le meilleur emploi du temps possible ;
- optimiser un itinéraire avec de nombreuses étapes ;
- répartir au mieux des objets dans des boîtes ;
- trouver rapidement la meilleure solution parmi des milliards de possibilités.

!!! expert "Pour aller plus loin : problèmes P et NP"
    En informatique théorique, on classe les problèmes selon leur difficulté.
    
    De manière simplifiée :
    
    - les problèmes de la classe **P** sont ceux pour lesquels on connaît un algorithme efficace ;
    - les problèmes de la classe **NP** sont ceux pour lesquels on peut vérifier rapidement une solution proposée, même si trouver cette solution peut être très difficile.

La question **P = NP ?** est l'un des grands problèmes ouverts des mathématiques et de l'informatique.

!!! info "À retenir"
    Tous les problèmes ne se résolvent pas avec la même efficacité.
    
    L'un des objectifs de l'algorithmique est donc de concevoir des méthodes :
    
    - efficaces ;
    - qui terminent ;
    - et qui donnent le bon résultat.

---

## 5 - Objectifs du chapitre 🎯

Dans ce chapitre, nous allons découvrir les premières notions d'algorithmique à travers des problèmes simples sur les tableaux.

Nous apprendrons notamment à :

- analyser le coût d'un algorithme ;
- comprendre les notions de correction et de terminaison ;
- utiliser les idées de variant et d'invariant ;
- parcourir un tableau ;
- rechercher une occurrence ;
- rechercher un minimum ou un maximum ;
- calculer une moyenne ;
- trier un tableau par sélection ;
- trier un tableau par insertion.

!!! info "Objectif général"
    L'objectif n'est pas seulement d'écrire du code qui fonctionne.
    
    Il faut aussi apprendre à expliquer pourquoi un algorithme fonctionne, pourquoi il s'arrête, et comment son efficacité évolue lorsque les données deviennent plus nombreuses.