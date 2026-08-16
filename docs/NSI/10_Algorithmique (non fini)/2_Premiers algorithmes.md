---
title: Premiers algorithmes
weight: 2
---

# Premiers algorithmes : parcourir, rechercher, calculer 🔎

Dans cette partie, nous allons étudier des algorithmes simples mais fondamentaux sur les tableaux.

L'objectif est de comprendre comment parcourir des données pour en extraire une information : rechercher une valeur, trouver un minimum ou un maximum, calculer une moyenne...

!!! definition "Définition : parcourir un tableau"
    **Parcourir un tableau**, c'est examiner ses éléments les uns après les autres.

Il existe deux grands types de parcours en fonction de ce que l'on cherchera à déterminer :

- le **parcours total** ;
- le **parcours partiel**.

!!! info "Objectif de cette partie"
    Dans cette partie, nous allons apprendre à :
    
    - parcourir un tableau ;
    - distinguer un parcours total et un parcours partiel ;
    - rechercher une occurrence ;
    - rechercher un minimum ou un maximum ;
    - calculer une moyenne ;
    - analyser le coût de ces algorithmes.

---

## 2 - Parcours total 🔁

Dans un **parcours total**, on examine tous les éléments du tableau.

!!! definition "Définition : parcours total"
    Un **parcours total** est un parcours dans lequel tous les éléments du tableau sont examinés.

On utilise souvent une boucle `for`.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme afficher

Entrée :
    tableau, un tableau de valeurs

Pour chaque élément du tableau :
    Afficher élément
Fin Pour

Sortie :
    aucune, les valeurs sont affichées
```

```python title="Python" linenums="1"
def afficher(tableau):
    for element in tableau:
        print(element)
```

</div>

La boucle parcourt tous les éléments, du premier au dernier.

!!! info "Utilisation du parcours total"
    Ce type de parcours est utile lorsque l'on a besoin de toutes les valeurs du tableau.

    Par exemple, pour :

    - afficher tous les éléments ;
    - additionner toutes les valeurs ;
    - compter certains éléments ;
    - rechercher un minimum ou un maximum ;
    - calculer une moyenne.

!!! propriete "Coût d'un parcours total"
    Si un tableau contient $n$ éléments, un parcours total effectue $n$ étapes.
    
    Son coût est donc linéaire : $O(n)$.

---

## 3 - Parcours partiel et recherche d'une occurrence ⏹️

Dans certains cas, il n'est pas nécessaire de parcourir tout le tableau.

On peut s'arrêter dès que l'information recherchée est trouvée.

C'est ce qu'on appelle un **parcours partiel**.

!!! definition "Définition : parcours partiel"
    Un **parcours partiel** est un parcours qui peut s'arrêter avant la fin du tableau.

Par exemple, si l'on cherche si la valeur `18` est présente dans le tableau `[12, 15, 9, 18, 14]`, il est inutile de regarder les éléments situés après `18` une fois qu'on l'a trouvée.

On peut écrire une fonction de recherche avec une boucle `for`.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme recherche

Entrées :
    valeur, la valeur recherchée
    tableau, un tableau de valeurs

Pour chaque élément du tableau :
    Si élément = valeur :
        Renvoyer Vrai
    Fin Si
Fin Pour

Renvoyer Faux

Sortie :
    Vrai si valeur est présente dans tableau
    Faux sinon
```

```python title="Python" linenums="1"
def recherche(valeur, tableau):
    for element in tableau:
        if element == valeur:
            return True
    return False
```

</div>

La fonction renvoie `True` dès que la valeur est trouvée.

Si la boucle se termine sans trouver la valeur, la fonction renvoie `False`.

!!! info "À retenir"
    Une **occurrence** d'une valeur est une apparition de cette valeur dans une collection.
    
    Rechercher une occurrence, c'est donc chercher si une valeur apparaît au moins une fois.

On peut aussi écrire cet algorithme avec une boucle `while`.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme recherche

Entrées :
    valeur, la valeur recherchée
    tableau, un tableau de valeurs

i ← 0
Tant que i < longueur(tableau) et tableau[i] ≠ valeur :
    i ← i + 1
Fin Tant que

Renvoyer i < longueur(tableau)

Sortie :
    Vrai si valeur est présente dans tableau
    Faux sinon
```

```python title="Python" linenums="1"
def recherche(valeur, tableau):
    i = 0
    while i < len(tableau) and tableau[i] != valeur:
        i = i + 1
    return i < len(tableau)
```

</div>

Cette version avance dans le tableau **tant que** :

- on n'a pas dépassé la fin du tableau ;
- la valeur courante n'est pas celle que l'on cherche.

À la fin de la boucle, deux situations sont possibles :

- soit `i < len(tableau)` : la valeur a été trouvée ;
- soit `i == len(tableau)` : la valeur n'est pas présente.

!!! propriete "Coût d'une recherche d'occurrence"
    Dans le meilleur cas, la valeur recherchée est au début du tableau : le coût est $O(1)$.
    
    Dans le pire cas, la valeur est absente ou située à la fin : le coût est $O(n)$.

!!! tip "Méthode"
    Lorsqu'un algorithme peut s'arrêter avant la fin, on étudie souvent :
    
    - le **meilleur cas** ;
    - le **pire cas**.

---

## 4 - Rechercher un maximum ou un minimum 📊

On souhaite maintenant trouver la plus grande ou la plus petite valeur d'un tableau.

Pour cela, il faut parcourir tout le tableau : une valeur extrême peut se trouver n'importe où.

!!! warning "Attention"
    Pour rechercher un minimum ou un maximum, le tableau ne doit pas être vide.
    
    Sinon, il n'existe pas de première valeur avec laquelle commencer.

### 4.1 - Rechercher un maximum

L'idée est la suivante :

1. on suppose que le premier élément est le maximum ;
2. on parcourt le tableau ;
3. dès qu'on trouve une valeur plus grande, on met à jour le maximum.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme maximum

Entrée :
    tableau, un tableau non vide de nombres

maxi ← tableau[0]
Pour chaque élément du tableau :
    Si élément > maxi :
        maxi ← élément
    Fin Si
Fin Pour

Renvoyer maxi

Sortie :
    la plus grande valeur du tableau
```

```python title="Python" linenums="1"
def maximum(tableau):
    maxi = tableau[0]
    for element in tableau:
        if element > maxi:
            maxi = element
    return maxi
```

</div>

Avec le tableau `[12, 15, 9, 18, 14]`, la variable `maxi` évolue ainsi :

| Élément lu | Valeur de `maxi` |
|---|---|
| départ | `12` |
| `12` | `12` |
| `15` | `15` |
| `9` | `15` |
| `18` | `18` |
| `14` | `18` |

La fonction renvoie donc `18`.

### 4.2 - Rechercher un minimum

Le principe est le même, mais on met à jour la valeur lorsqu'on trouve un élément plus petit.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme minimum

Entrée :
    tableau, un tableau non vide de nombres

mini ← tableau[0]
Pour chaque élément du tableau :
    Si élément < mini :
        mini ← élément
    Fin Si
Fin Pour

Renvoyer mini

Sortie :
    la plus petite valeur du tableau
```

```python title="Python" linenums="1"
def minimum(tableau):
    mini = tableau[0]
    for element in tableau:
        if element < mini:
            mini = element
    return mini
```

</div>

### 4.3 - Complexité

!!! propriete "Coût d'une recherche d'extremum"
    Rechercher un minimum ou un maximum nécessite de parcourir tout le tableau.
    
    Si le tableau contient `n` éléments, le coût est donc $O(n)$.

!!! info "À retenir"
    Pour trouver un minimum ou un maximum, on utilise un parcours total.
    
    En effet, il faut vérifier toutes les valeurs pour être certain de ne pas manquer l'extremum.

---

## 5 - Calculer une moyenne 🧮

On souhaite maintenant calculer la moyenne des valeurs d'un tableau.

Pour cela, il faut :

1. additionner toutes les valeurs ;
2. diviser la somme obtenue par le nombre de valeurs.

!!! warning "Attention"
    Pour calculer une moyenne, le tableau ne doit pas être vide.
    
    En effet, on ne peut pas diviser par `0`.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme moyenne

Entrée :
    tableau, un tableau non vide de nombres

total ← 0
Pour chaque élément du tableau :
    total ← total + élément
Fin Pour

Renvoyer total / longueur(tableau)

Sortie :
    la moyenne des valeurs du tableau
```

```python title="Python" linenums="1"
def moyenne(tableau):
    total = 0
    for element in tableau:
        total = total + element
    return total / len(tableau)
```

</div>

Par exemple, avec le tableau `[12, 15, 9, 18, 14]`, on obtient :

```text
12 + 15 + 9 + 18 + 14 = 68
68 / 5 = 13.6
```

La moyenne est donc `13.6`.

!!! propriete "Coût du calcul d'une moyenne"
    Pour calculer une moyenne, il faut parcourir tous les éléments du tableau afin de calculer la somme.
    
    Si le tableau contient `n` éléments, le coût est donc $O(n)$.

!!! info "À retenir"
    Le calcul d'une moyenne est un exemple de parcours total.
    
    Même si les valeurs sont déjà rangées dans un certain ordre, il faut toutes les utiliser pour calculer la moyenne.

---

## 6 - Bilan ✅

!!! info "À retenir"
    Les premiers algorithmes sur les tableaux reposent souvent sur un parcours des éléments.
    
    On distingue :
    
    - le **parcours total**, qui examine tous les éléments ;
    - le **parcours partiel**, qui peut s'arrêter avant la fin.

    Nos premiers algorithmes de références sont : 

    | Algorithme | Type de parcours | Objectif | Coût dans le pire cas |
    |---|---|---|---|
    | Recherche d'une occurrence | partiel | savoir si une valeur est présente | $O(n)$ |
    | Recherche d'un minimum | total | trouver la plus petite valeur | $O(n)$ |
    | Recherche d'un maximum | total | trouver la plus grande valeur | $O(n)$ |
    | Calcul d'une moyenne | total | résumer une série de valeurs | $O(n)$ |
