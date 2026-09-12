---
title: Conclusion
weight: 3
---

# Conclusion 🎯

En Première, nous écrivions des programmes qui **manipulaient** des données. Nous savons
désormais concevoir les **récipients** eux-mêmes — et surtout expliquer pourquoi on en choisit
un plutôt qu'un autre.

Nous savons désormais :

- [x] **Spécifier** une structure par son **interface** : signature, rôle, précondition, effet ;
- [x] Distinguer l'**interface** — ce que la structure promet — de l'**implémentation** — la
      façon dont elle est faite ;
- [x] Écrire un programme **client** qui ne regarde jamais dedans, et qui survit donc à un
      changement d'implémentation ;
- [x] Utiliser le type abstrait **liste** — `vide`, `est_vide`, `cons`, `car`, `cdr` — et le
      distinguer du `list` de Python, qui est un **tableau** ;
- [x] **Descendre** une liste chaînée avec le schéma `while not est_vide(L) : … ; L = cdr(L)`,
      et la **reconstruire** avec `resultat = cons(…, resultat)` ;
- [x] Reconnaître une **pile** (LIFO) et une **file** (FIFO), et les implémenter ;
- [x] Écrire **plusieurs implémentations** d'une même structure — la file par un tableau, par
      un tableau circulaire, puis par deux piles ;
- [x] Comparer le **coût** des opérations et **choisir** la structure adaptée à un problème ;
- [x] Distinguer la recherche d'une valeur dans une **liste** de la recherche par **clé** dans
      un dictionnaire.

!!! info "Les trois idées à ne jamais oublier"
    1. **Le contrat n'est pas le code.** Une interface dit ce qu'on peut faire ; elle ne dit
       rien de la mémoire, et rien du temps. C'est pour cela qu'on peut écrire plusieurs
       implémentations — et c'est pour cela qu'il faut les comparer.
    2. **Une structure pauvre est une structure sûre.** Une pile n'offre qu'un geste, une
       file qu'un autre. En s'interdisant tout le reste, on s'interdit aussi de se tromper —
       et le programme dit alors de lui-même ce qu'il fait.
    3. **Il n'y a pas de structure meilleure qu'une autre.** Le tableau gagne sur l'accès par
       rang, le chaînage sur l'ajout en tête, le dictionnaire sur la recherche par clé. La
       bonne structure est celle dont les opérations rapides sont celles dont on se sert le
       plus.

!!! tip "Les réflexes à emporter en devoir"
    - Avant d'écrire une fonction sur une structure, se demander **quelles opérations elle a
      le droit d'utiliser** ;
    - Ne jamais appeler `car`, `depiler` ou `defiler` sans avoir vérifié que la structure
      n'est pas vide : la **précondition est pour l'appelant** ;
    - « Des choses mises de côté puis reprises en sens inverse » : il y a une **pile** dedans ;
    - « Des choses traitées dans l'ordre d'arrivée » : il y a une **file** dedans ;
    - Un crochet appliqué à une structure abstraite est presque toujours une faute.

## Et maintenant ?

Le prochain chapitre reprendra **exactement** ces piles et ces files pour les réécrire avec des
**classes** : `Pile()`, `p.empiler(3)`, `p.depiler()`. Le vocabulaire de la programmation objet
— attributs, méthodes, objets — y trouvera son premier usage concret, et la séparation
interface / implémentation que nous venons d'installer à la main y deviendra une propriété du
langage lui-même. 🧱

Nous quitterons ensuite les structures **linéaires** pour des structures **hiérarchiques**, les
**arbres**, puis **relationnelles**, les **graphes**. Les parcours qu'on y pratique s'écrivent
avec les deux structures de ce chapitre : un parcours en profondeur est un algorithme à
**pile**, un parcours en largeur un algorithme à **file**. Rien de ce que tu viens d'apprendre
ne sera perdu. 🌳

Enfin, la question du **coût**, qu'on a seulement effleurée ici en comptant des tours de boucle,
deviendra un objet d'étude à part entière : passer de $n^2$ à $n\log_2 n$, ou de $n$ à
$\log_2 n$, c'est la différence entre un programme qui répond et un programme qui n'aboutit
jamais. 📈
