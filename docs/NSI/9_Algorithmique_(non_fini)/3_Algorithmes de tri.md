---
title: Algorithmes de tri
weight: 3
---

# Algorithmes de tri 📊

Dans la partie précédente, nous avons vu comment parcourir un tableau pour rechercher une valeur, trouver un extremum ou calculer une moyenne.

Dans cette partie, nous allons nous intéresser à une autre opération fondamentale : **trier des données**.

!!! info "Objectif de cette partie"
    Dans cette partie, nous allons apprendre à :
    
    - comprendre l'intérêt du tri ;
    - trier un tableau en place ;
    - écrire un tri par sélection ;
    - écrire un tri par insertion ;
    - justifier la terminaison de ces algorithmes ;
    - expliquer leur correction partielle à l'aide d'un invariant ;
    - étudier leur coût.

---

## 1 - Pourquoi trier ? 🗂️

Trier des données consiste à les ranger dans un certain ordre.

Par exemple, on peut vouloir :

- ranger des notes dans l'ordre croissant ;
- classer des élèves par ordre alphabétique ;
- afficher des produits du moins cher au plus cher ;
- organiser des dates de la plus ancienne à la plus récente ;
- préparer des données pour faciliter certaines recherches.

!!! definition "Définition : tri"
    **Trier** un tableau, c'est réorganiser ses éléments selon un ordre donné.

Dans ce chapitre, nous allons surtout trier des tableaux de nombres dans l'**ordre croissant**.

Par exemple :

```python title="Exemple" linenums="1"
tableau = [12, 5, 18, 7, 3]
```

Après un tri dans l'ordre croissant, on obtient :

```python title="Résultat attendu" linenums="1"
tableau = [3, 5, 7, 12, 18]
```

!!! info "À retenir"
    Trier des données permet de les rendre plus faciles à lire, à comparer et à exploiter.

---

## 2 - Tri en place et ordre croissant 🔄

Il existe plusieurs façons de trier un tableau.

Dans cette partie, nous allons étudier des algorithmes qui modifient directement le tableau donné en entrée.

On dit qu'ils trient **en place**.

!!! definition "Définition : tri en place"
    Un **tri en place** est un tri qui réorganise directement les éléments du tableau, sans créer un nouveau tableau contenant les valeurs triées.

Par exemple, si l'on part du tableau suivant :

```python title="Avant le tri" linenums="1"
tableau = [12, 5, 18, 7, 3]
```

Après le tri, le même tableau contient les valeurs rangées dans l'ordre croissant :

```python title="Après le tri" linenums="1"
tableau = [3, 5, 7, 12, 18]
```

!!! info "À retenir"
    Les tris par sélection et par insertion que nous allons étudier sont des tris en place.

---

## 3 - Tri par sélection 🃏

### 3.1 - Principe

Le **tri par sélection** repose sur une idée simple : à chaque étape, on sélectionne le plus petit élément restant et on le place au bon endroit.

Pour trier le tableau `[12, 5, 18, 7, 3]` dans l'ordre croissant :

1. on cherche le plus petit élément du tableau ;
2. on l'échange avec l'élément en première position ;
3. on cherche le plus petit élément dans la partie restante ;
4. on l'échange avec l'élément en deuxième position ;
5. on recommence jusqu'à ce que le tableau soit trié.

!!! info "Idée principale"
    Le tri par sélection construit progressivement une partie gauche triée.
    
    À chaque étape, on ajoute le plus petit élément restant à cette partie triée.

Exemple avec le tableau `[12, 5, 18, 7, 3]` :

| Étape | Partie triée | Partie restante |
|---|---|---|
| Départ | `[]` | `[12, 5, 18, 7, 3]` |
| Étape 1 | `[3]` | `[5, 18, 7, 12]` |
| Étape 2 | `[3, 5]` | `[18, 7, 12]` |
| Étape 3 | `[3, 5, 7]` | `[18, 12]` |
| Étape 4 | `[3, 5, 7, 12]` | `[18]` |
| Fin | `[3, 5, 7, 12, 18]` | `[]` |

Et voici une illustration animée : 

![Exemple de tri par sélection](../../files/NSI/Algo1/tri_selection.gif)

---

### 3.2 - Algorithme

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme tri_selection

Entrée :
    tableau, un tableau de nombres

Pour i allant de 0 à longueur(tableau) - 2 :
    indice_min ← i

    Pour j allant de i + 1 à longueur(tableau) - 1 :
        Si tableau[j] < tableau[indice_min] :
            indice_min ← j
        Fin Si
    Fin Pour

    Échanger tableau[i] et tableau[indice_min]
Fin Pour

Renvoyer tableau

Sortie :
    le tableau trié dans l'ordre croissant
```

```python title="Python" linenums="1"
def tri_selection(tableau):
    for i in range(len(tableau) - 1):
        indice_min = i
        for j in range(i + 1, len(tableau)):
            if tableau[j] < tableau[indice_min]:
                indice_min = j
        tableau[i], tableau[indice_min] = tableau[indice_min], tableau[i]
    return tableau
```

</div>

!!! tip "Méthode"
    Dans le tri par sélection, la variable `indice_min` mémorise la position du plus petit élément trouvé dans la partie non triée.

---

### 3.3 - Terminaison

L'algorithme contient deux boucles `for`.

- La première boucle fait varier `i` de `0` à `len(tableau) - 2`.
- La deuxième boucle fait varier `j` de `i + 1` à `len(tableau) - 1`.

Ces deux boucles parcourent des ensembles finis de valeurs.

!!! propriete "Terminaison"
    Le tri par sélection termine, car il utilise uniquement des boucles `for` bornées.

---

### 3.4 - Correction partielle

Pour expliquer pourquoi le tri par sélection fonctionne, on peut utiliser un invariant de boucle.

!!! propriete "Invariant du tri par sélection"
    Au début de l'étape `i`, les `i` premiers éléments du tableau sont triés et contiennent les `i` plus petites valeurs du tableau initial.

Regardons ce que cela signifie.

- Au début, pour `i = 0`, la partie gauche est vide : elle est donc déjà triée.
- À chaque étape, on cherche le plus petit élément de la partie restante.
- On l'échange avec l'élément placé à l'indice `i`.
- La partie gauche contient alors un élément trié de plus.

À la fin, tous les éléments ont été placés dans l'ordre croissant.

!!! info "À retenir"
    Le tri par sélection est correct car il place, à chaque étape, le plus petit élément restant à la fin de la partie déjà triée.

---

### 3.5 - Coût

Le tri par sélection effectue beaucoup de comparaisons.

Pour un tableau de taille `n` :

- à la première étape, on compare environ `n - 1` éléments ;
- à la deuxième étape, on compare environ `n - 2` éléments ;
- à la troisième étape, on compare environ `n - 3` éléments ;
- et ainsi de suite.

Le nombre total de comparaisons est donc proche de :

```text
(n - 1) + (n - 2) + ... + 2 + 1
```

Ce nombre est de l'ordre de `n^2`.

!!! propriete "Coût du tri par sélection"
    Le tri par sélection a un coût quadratique dans le pire cas : $O(n^2)$.

Même si le tableau est déjà trié, l'algorithme recherche quand même le minimum dans la partie restante à chaque étape.

!!! info "À retenir"
    Le tri par sélection est simple à comprendre, mais il devient coûteux lorsque le tableau contient beaucoup d'éléments.

---

## 4 - Tri par insertion 🧩

### 4.1 - Principe

Le **tri par insertion** fonctionne comme lorsqu'on range des cartes dans sa main.

On garde une partie gauche déjà triée, puis on prend une nouvelle valeur et on l'insère à la bonne place.

Pour trier le tableau `[12, 5, 18, 7, 3]` :

1. on considère que le premier élément est déjà trié ;
2. on prend le deuxième élément et on l'insère au bon endroit dans la partie gauche ;
3. on prend le troisième élément et on l'insère au bon endroit ;
4. on continue jusqu'à la fin du tableau.

!!! info "Idée principale"
    Le tri par insertion construit progressivement une partie gauche triée.
    
    À chaque étape, on insère une nouvelle valeur à sa bonne position dans cette partie triée.

Exemple avec le tableau `[12, 5, 18, 7, 3]` :

| Étape | Partie triée | Partie restante |
|---|---|---|
| Départ | `[12]` | `[5, 18, 7, 3]` |
| Étape 1 | `[5, 12]` | `[18, 7, 3]` |
| Étape 2 | `[5, 12, 18]` | `[7, 3]` |
| Étape 3 | `[5, 7, 12, 18]` | `[3]` |
| Fin | `[3, 5, 7, 12, 18]` | `[]` |

Et voici une illustration animée : 

![Exemple de tri par sélection](../../files/NSI/Algo1/tri_insertion.gif)

---

### 4.2 - Algorithme

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme tri_insertion

Entrée :
    tableau, un tableau de nombres

Pour i allant de 1 à longueur(tableau) - 1 :
    valeur ← tableau[i]
    j ← i

    Tant que j > 0 et tableau[j - 1] > valeur :
        tableau[j] ← tableau[j - 1]
        j ← j - 1
    Fin Tant que

    tableau[j] ← valeur
Fin Pour

Renvoyer tableau

Sortie :
    le tableau trié dans l'ordre croissant
```

```python title="Python" linenums="1"
def tri_insertion(tableau):
    for i in range(1, len(tableau)):
        valeur = tableau[i]
        j = i
        while j > 0 and tableau[j - 1] > valeur:
            tableau[j] = tableau[j - 1]
            j = j - 1
        tableau[j] = valeur
    return tableau
```

</div>

!!! tip "Méthode"
    Dans le tri par insertion, la variable `valeur` mémorise l'élément à insérer, tandis que `j` sert à trouver sa bonne position.

---

### 4.3 - Terminaison

Le tri par insertion contient :

- une boucle `for` bornée ;
- une boucle `while` à l'intérieur.

La boucle `for` termine car elle parcourt un nombre fini d'indices.

Pour la boucle `while`, on peut utiliser un variant.

!!! propriete "Variant de la boucle while"
    Dans la boucle `while`, la variable `j` est un variant.
    
    Elle est entière positive et diminue de `1` à chaque tour de boucle.

Comme `j` ne peut pas diminuer indéfiniment, la boucle `while` termine.

!!! propriete "Terminaison"
    Le tri par insertion termine car la boucle `for` est bornée et la boucle `while` possède un variant.

---

### 4.4 - Correction partielle

Pour expliquer pourquoi le tri par insertion fonctionne, on utilise aussi un invariant de boucle.

!!! propriete "Invariant du tri par insertion"
    Au début de l'étape `i`, le sous-tableau `tableau[0:i]` est trié.

Regardons ce que cela signifie.

- Au départ, le sous-tableau contenant seulement `tableau[0]` est trié.
- À l'étape `i`, on prend la valeur `tableau[i]`.
- On décale vers la droite les valeurs plus grandes qu'elle.
- On insère la valeur à la bonne position.
- Le sous-tableau `tableau[0:i+1]` est alors trié.

À la fin, toute la liste est triée.

!!! info "À retenir"
    Le tri par insertion est correct car il conserve une partie gauche triée et y insère chaque nouvelle valeur au bon endroit.

---

### 4.5 - Coût

Le coût du tri par insertion dépend de l'ordre initial des valeurs.

### Meilleur cas

Si le tableau est déjà trié, la condition de la boucle `while` est immédiatement fausse à chaque étape.

L'algorithme parcourt simplement les éléments une fois.

Dans ce cas, le coût est linéaire : $O(n)$.

### Pire cas

Si le tableau est trié dans l'ordre décroissant, chaque nouvelle valeur doit être déplacée jusqu'au début de la partie déjà triée.

Le nombre de décalages devient alors très important.

Le coût est quadratique : $O(n^2)$.

!!! propriete "Coût du tri par insertion"
    Le tri par insertion a :
    
    - un coût linéaire dans le meilleur cas : $O(n)$ ;
    - un coût quadratique dans le pire cas : $O(n^2)$.

!!! info "À retenir"
    Le tri par insertion est particulièrement efficace sur des tableaux déjà presque triés.

---

## 5 - Comparaison des deux tris ⚖️

Les tris par sélection et par insertion sont deux algorithmes simples à comprendre et à programmer.

Ils permettent tous les deux de trier un tableau en place dans l'ordre croissant.

Cependant, ils ne se comportent pas exactement de la même manière.

| Algorithme | Principe | Meilleur cas | Pire cas | Remarque |
|---|---|---|---|---|
| Tri par sélection | chercher le minimum restant | $O(n^2)$ | $O(n^2)$ | peu sensible à l'ordre initial |
| Tri par insertion | insérer chaque valeur à sa place | $O(n)$ | $O(n^2)$ | efficace si le tableau est presque trié |

!!! info "À retenir"
    Les deux tris étudiés ont un coût quadratique dans le pire cas.
    
    Ils sont donc adaptés pour comprendre les principes du tri, mais ils deviennent peu efficaces sur de très grands tableaux.

!!! expert "Pour aller plus loin"
    Il existe des algorithmes de tri plus efficaces, comme le tri fusion ou le tri rapide.
    
    Certains de ces algorithmes peuvent atteindre un coût en $O(n \log n)$ dans de nombreux cas.