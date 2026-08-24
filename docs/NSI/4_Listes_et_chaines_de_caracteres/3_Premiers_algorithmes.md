---
title: Premiers algorithmes
weight: 3
---

# Premiers algorithmes : parcourir, rechercher, calculer 🔎

Une classe de 25 élèves vient de recevoir ses notes. On aimerait savoir :

- est-ce que **quelqu'un** a eu 20 ?
- **quelle** est la meilleure note, et **qui** l'a obtenue ?
- **combien** d'élèves ont eu 15, et à **quelles positions** de la liste ?

Ces questions se ressemblent, mais elles ne demandent pas le même travail. Toutes reposent sur la même idée : le **parcours** d'un tableau.

!!! definition "Définition : parcourir un tableau"
    **Parcourir un tableau**, c'est examiner ses éléments les uns après les autres.

    L'ordinateur ne « voit » pas le tableau d'un coup d'œil comme nous le ferions sur le papier : il doit lire les cases une à une.

!!! info "Objectif de cette partie"
    Dans cette partie, nous allons apprendre à :

    - distinguer un **parcours total** et un **parcours partiel** ;
    - rechercher une **occurrence** ;
    - lister **toutes** les occurrences d'une valeur ;
    - rechercher un **minimum** ou un **maximum** ;
    - calculer une **moyenne**.

---

## 1 - Le parcours total 🔁

!!! definition "Définition : parcours total"
    Un **parcours total** est un parcours dans lequel **tous** les éléments du tableau sont examinés.

On l'écrit naturellement avec une boucle `for`.

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

!!! info "Quand utilise-t-on un parcours total ?"
    Dès que la réponse dépend de **toutes** les valeurs. Par exemple pour :

    - afficher tous les éléments ;
    - additionner toutes les valeurs ;
    - compter les éléments qui vérifient une condition ;
    - rechercher un minimum ou un maximum ;
    - calculer une moyenne.

!!! methode "Le schéma de l'accumulateur"
    La plupart des parcours totaux suivent le même schéma en trois temps :

    1. **avant** la boucle, on prépare une variable (`total ← 0`, `compteur ← 0`, `resultat ← []`) ;
    2. **dans** la boucle, on la fait évoluer ;
    3. **après** la boucle, on l'utilise ou on la renvoie.

    ⚠️ Une erreur classique : placer l'initialisation *dans* la boucle. La variable repartirait de zéro à chaque tour !

---

## 2 - Le parcours partiel et la recherche d'une occurrence ⏹️

Il n'est pas toujours nécessaire d'aller jusqu'au bout. Si l'on cherche seulement à savoir si la valeur `18` est **présente** dans `[12, 15, 9, 18, 14]`, inutile de regarder ce qui suit une fois qu'on l'a trouvée.

!!! definition "Définition : parcours partiel"
    Un **parcours partiel** est un parcours qui peut s'arrêter **avant la fin** du tableau.

!!! definition "Définition : occurrence"
    Une **occurrence** d'une valeur dans un tableau est une case qui contient cette valeur.

    Dans le tableau `[7, 3, 7, 7, 1]`, la valeur 7 possède **trois** occurrences, aux indices 0, 2 et 3.

Rechercher une occurrence, c'est donc chercher si une valeur apparaît **au moins une fois**. La réponse est un booléen.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme recherche

Entrées :
    tableau, un tableau de valeurs
    valeur, la valeur recherchée

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
def recherche(tableau, valeur):
    for element in tableau:
        if element == valeur:
            return True
    return False
```

</div>

La fonction renvoie `True` **dès** que la valeur est trouvée : le parcours s'arrête là. Si la boucle se termine sans succès, c'est que la valeur est absente : on renvoie `False`.

!!! warning "L'erreur à ne pas commettre"
    Le `return False` doit se trouver **après** la boucle, jamais à l'intérieur :

    ```python linenums="1"
    def recherche(tableau, valeur):   # ⚠️ FAUX
        for element in tableau:
            if element == valeur:
                return True
            else:
                return False
    ```

    Cette version ne regarde que le **premier** élément : dès le premier tour, elle renvoie une réponse et quitte la fonction.

    Retenez la logique : pour répondre **oui**, une seule case suffit ; pour répondre **non**, il faut les avoir **toutes** vues.

On peut aussi écrire cet algorithme avec une boucle `while`.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme recherche

Entrées :
    tableau, un tableau de valeurs
    valeur, la valeur recherchée

i ← 0
Tant que i < longueur(tableau)
      et tableau[i] ≠ valeur :
    i ← i + 1
Fin Tant que

Renvoyer i < longueur(tableau)

Sortie :
    Vrai si valeur est présente dans tableau
    Faux sinon
```

```python title="Python" linenums="1"
def recherche(tableau, valeur):
    i = 0
    while i < len(tableau) and tableau[i] != valeur:
        i = i + 1
    return i < len(tableau)
```

</div>

Cette version avance **tant que** deux conditions sont réunies : on n'a pas dépassé la fin du tableau, et la valeur lue n'est pas celle que l'on cherche. À la sortie de la boucle, deux situations sont possibles :

- `i < len(tableau)` : on s'est arrêté sur la valeur, elle est **présente** ;
- `i == len(tableau)` : on est sorti par la fin, elle est **absente**.

!!! warning "L'ordre des conditions n'est pas anodin"
    Si l'on écrivait `while tableau[i] != valeur and i < len(tableau)`, le programme lirait `tableau[i]` **avant** de vérifier que `i` est un indice valide : erreur garantie sur un tableau où la valeur est absente.

---

## 3 - Où se trouve la valeur ? 📍

Savoir qu'une valeur est présente, c'est bien. Savoir **où**, c'est mieux. Cette fois, on ne renvoie plus un booléen, mais un **indice**.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme premier_indice

Entrées :
    tableau, un tableau de valeurs
    valeur, la valeur recherchée

Pour i allant de 0 à longueur(tableau) - 1 :
    Si tableau[i] = valeur :
        Renvoyer i
    Fin Si
Fin Pour

Renvoyer -1

Sortie :
    l'indice de la première occurrence,
    ou -1 si la valeur est absente
```

```python title="Python" linenums="1"
def premier_indice(tableau, valeur):
    for i in range(len(tableau)):
        if tableau[i] == valeur:
            return i
    return -1
```

</div>

!!! tip "Pourquoi renvoyer `-1` ?"
    Il faut bien renvoyer **quelque chose** quand la valeur est absente. On choisit alors une valeur qui ne peut **jamais** être un indice valide : comme les indices vont de 0 à $n-1$, la valeur $-1$ est impossible... et donc parfaite pour signaler l'échec.

    C'est une **convention** très répandue en informatique. Pensez à la tester :

    ```python linenums="1"
    position = premier_indice(notes, 20)
    if position == -1:
        print("Cette note n'a pas été attribuée.")
    else:
        print("Première occurrence à l'indice", position)
    ```

!!! python "Les outils de Python"
    Python sait déjà faire tout cela : l'opérateur `in` répond à la question de la présence, `index()` donne une position et `count()` compte les occurrences.

    ```python linenums="1"
    notes = [12, 15, 8, 15]
    print(15 in notes)        # True  : la recherche d'occurrence
    print(notes.index(15))    # 1     : l'indice de la première occurrence
    print(notes.count(15))    # 2     : le nombre d'occurrences
    ```

    ⚠️ Contrairement à notre fonction, `index()` **provoque une erreur** si la valeur est absente.

    Utilisez ces outils dans vos programmes... mais sachez **toujours** réécrire l'algorithme correspondant : c'est lui qui est évalué à l'examen.

---

## 4 - Lister toutes les occurrences 🔍

Une valeur peut apparaître plusieurs fois, et `index()` ne renvoie que la première position. Comment obtenir **toutes** les positions ?

Impossible de s'arrêter en route : c'est un **parcours total**. Et la réponse n'est ni un booléen, ni un nombre, mais un **tableau d'indices**. L'accumulateur n'est donc plus un compteur, mais une liste que l'on remplit au fur et à mesure.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Langage naturel"
Algorithme indices_occurrences

Entrées :
    tableau, un tableau de valeurs
    valeur, la valeur recherchée

positions ← tableau vide
Pour i allant de 0 à longueur(tableau) - 1 :
    Si tableau[i] = valeur :
        Ajouter i à positions
    Fin Si
Fin Pour

Renvoyer positions

Sortie :
    le tableau des indices de toutes
    les occurrences de valeur
```

```python title="Python" linenums="1"
def indices_occurrences(tableau, valeur):
    positions = []
    for i in range(len(tableau)):
        if tableau[i] == valeur:
            positions.append(i)
    return positions
```

</div>

```python linenums="1"
notes = [12, 15, 8, 15, 15]
print(indices_occurrences(notes, 15))   # [1, 3, 4]
print(indices_occurrences(notes, 20))   # []
```

!!! tip "Le cas « aucune occurrence »"
    Pas besoin de convention particulière ici : si la valeur est absente, la fonction renvoie tout naturellement une **liste vide** `[]`. C'est bien plus élégant que le `-1` du paragraphe précédent.

!!! expert "Pour aller plus loin : la même chose en compréhension"
    Le parcours par indice se prête très bien à une construction par compréhension :

    ```python linenums="1"
    def indices_occurrences(tableau, valeur):
        return [i for i in range(len(tableau)) if tableau[i] == valeur]
    ```

    Une seule ligne, exactement le même travail. Sachez lire les deux écritures !

---

## 5 - Rechercher un maximum ou un minimum 📊

Pour trouver la plus grande valeur, il faut examiner **tout** le tableau : un record peut se cacher dans la toute dernière case. C'est donc un parcours total.

L'idée tient en trois temps :

1. on suppose que le **premier** élément est le maximum ;
2. on parcourt le tableau ;
3. dès qu'on rencontre une valeur plus grande, on met le record à jour.

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
|:---:|:---:|
| départ | `12` |
| `12` | `12` |
| `15` | `15` |
| `9` | `15` |
| `18` | `18` |
| `14` | `18` |

La fonction renvoie donc `18`.

!!! warning "Deux pièges à éviter"
    - **Ne jamais** initialiser `maxi` à 0 : sur un tableau de températures négatives, la fonction renverrait 0, qui n'y figure même pas ! On part **toujours** du premier élément du tableau.
    - Le tableau ne doit **pas être vide** : sinon, `tableau[0]` n'existe pas.

!!! example "Et pour le minimum ?"
    Exactement le même algorithme, en changeant la comparaison :

    ```python linenums="1"
    def minimum(tableau):
        mini = tableau[0]
        for element in tableau:
            if element < mini:
                mini = element
        return mini
    ```

!!! tip "Trouver *où* se cache le maximum"
    Souvent, on veut la **position** du record plutôt que sa valeur. On mémorise alors l'indice :

    ```python linenums="1"
    def indice_du_maximum(tableau):
        indice_record = 0
        for i in range(len(tableau)):
            if tableau[i] > tableau[indice_record]:
                indice_record = i
        return indice_record
    ```

    ```python linenums="1"
    notes = [12, 15, 8, 18, 11]
    print(indice_du_maximum(notes))   # 3
    ```

---

## 6 - Calculer une moyenne 🧮

Dernier algorithme de référence. Il faut :

1. additionner toutes les valeurs ;
2. diviser la somme obtenue par le nombre de valeurs.

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

Par exemple, avec le tableau `[12, 15, 9, 18, 14]` :

```text
12 + 15 + 9 + 18 + 14 = 68
68 / 5 = 13.6
```

!!! warning "Attention au tableau vide"
    `len(tableau)` vaudrait 0, et la division serait impossible. Une fonction bien écrite prévoit ce cas.

!!! python "Les raccourcis de Python"
    Là encore, Python propose des fonctions toutes faites pour l'extremum et la somme :

    ```python linenums="1"
    notes = [12, 15, 9, 18, 14]
    max(notes)                  # 18
    min(notes)                  # 9
    sum(notes)                  # 68
    sum(notes) / len(notes)     # 13.6
    ```

---

## 7 - Bilan ✅

!!! info "À retenir"
    Les premiers algorithmes sur les tableaux reposent tous sur un **parcours** des éléments. On distingue :

    - le **parcours total**, qui examine tous les éléments ;
    - le **parcours partiel**, qui peut s'arrêter avant la fin.

    Nos algorithmes de référence :

    | Algorithme | Type de parcours | Ce qu'il renvoie |
    |:---|:---:|:---|
    | Recherche d'une occurrence | partiel | un booléen : la valeur est-elle présente ? |
    | Indice de la première occurrence | partiel | un indice, ou $-1$ si la valeur est absente |
    | Liste de toutes les occurrences | total | un tableau d'indices, vide si la valeur est absente |
    | Recherche d'un minimum / maximum | total | la plus petite / plus grande valeur |
    | Calcul d'une moyenne | total | un nombre résumant la série |

!!! expert "Pour aller plus loin : lequel est le plus rapide ?"
    Vous l'avez sans doute pressenti : une recherche qui s'arrête à la première occurrence travaille souvent bien moins qu'un parcours total. Mais « souvent » n'est pas une mesure...

    Comparer sérieusement l'efficacité de deux algorithmes — en distinguant le **meilleur cas** du **pire cas** — est tout l'objet du chapitre consacré à l'**algorithmique**. Nous y retrouverons exactement ces algorithmes. 📈
