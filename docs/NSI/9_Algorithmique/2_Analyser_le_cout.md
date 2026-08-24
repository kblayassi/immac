---
title: Analyser le coût de nos algorithmes
weight: 2
---

# Analyser le coût de nos algorithmes 📈

Dans le chapitre sur les **listes et les chaînes de caractères**, nous avons écrit une petite collection d'algorithmes de référence : rechercher une occurrence, lister toutes les occurrences, trouver un extremum, calculer une moyenne.

Ils fonctionnent tous. Mais lequel travaille le plus ? Lequel supportera un tableau d'un million de valeurs ? C'est à ces questions que nous répondons maintenant, avec les outils de la partie précédente : le **coût**, le **meilleur cas**, le **pire cas** et la notation **grand O**.

!!! info "Objectif de cette partie"
    Dans cette partie, nous allons apprendre à :

    - **compter** les opérations effectuées par un algorithme ;
    - distinguer le coût d'un **parcours total** et celui d'un **parcours partiel** ;
    - analyser un algorithme selon son **meilleur cas** et son **pire cas** ;
    - reconnaître un coût **quadratique** derrière deux boucles imbriquées.

!!! tip "Rappel des algorithmes étudiés"
    Nous ne réécrivons pas ici ces algorithmes : reportez-vous au chapitre **Listes et chaînes de caractères** si nécessaire.

    | Algorithme | Ce qu'il fait | Type de parcours |
    |:---|:---|:---:|
    | `recherche(tableau, valeur)` | la valeur est-elle présente ? | partiel |
    | `premier_indice(tableau, valeur)` | indice de la 1ʳᵉ occurrence, ou $-1$ | partiel |
    | `indices_occurrences(tableau, valeur)` | toutes les positions | total |
    | `maximum(tableau)` / `minimum(tableau)` | la plus grande / petite valeur | total |
    | `moyenne(tableau)` | la moyenne des valeurs | total |

---

## 1 - Compter les opérations ⏱️

Pour comparer deux algorithmes, on ne chronomètre pas : un ordinateur rapide ferait paraître bon un mauvais algorithme. On compte le nombre d'**opérations élémentaires** effectuées, en fonction de la taille $n$ des données.

!!! methode "Quelle opération compter ?"
    On choisit l'opération la plus représentative du travail effectué — le plus souvent, celle qui se trouve **au cœur de la boucle**.

    Pour nos algorithmes de parcours, c'est la **comparaison** entre un élément et la valeur recherchée.

Reprenons `maximum` sur le tableau `[12, 15, 9, 18, 14]`, qui contient $n = 5$ éléments :

| Élément lu | Comparaison effectuée | Nombre total de comparaisons |
|:---:|:---:|:---:|
| `12` | `12 > 12` ? | 1 |
| `15` | `15 > 12` ? | 2 |
| `9` | `9 > 15` ? | 3 |
| `18` | `18 > 15` ? | 4 |
| `14` | `14 > 18` ? | 5 |

Cinq éléments, cinq comparaisons. Avec un tableau de 1000 éléments, il y en aurait 1000. Le nombre d'opérations est **proportionnel** à $n$.

!!! propriete "Coût d'un parcours total"
    Un parcours total examine les $n$ éléments du tableau : il effectue donc de l'ordre de $n$ opérations.

    Son coût est **linéaire**, noté $O(n)$.

C'est le cas de `indices_occurrences`, `maximum`, `minimum` et `moyenne` : **quoi qu'il arrive**, ces algorithmes lisent tout le tableau.

!!! warning "Un piège fréquent"
    Écrire `for i in range(len(tableau))` ne coûte pas plus cher que `for element in tableau` : dans les deux cas, on lit $n$ éléments.

    En revanche, une opération comme `valeur in tableau` **cache un parcours complet** : la placer à l'intérieur d'une boucle revient à emboîter deux parcours, avec le coût que cela implique (voir le paragraphe 4).

---

## 2 - Le cas du parcours partiel : meilleur et pire cas ⏹️

Avec `recherche`, la situation change : l'algorithme s'arrête dès qu'il trouve. Le nombre d'opérations ne dépend plus seulement de la **taille** du tableau, mais aussi de son **contenu**.

Cherchons la valeur `18` dans un tableau de 5 éléments :

| Tableau | Position de `18` | Comparaisons effectuées |
|:---|:---:|:---:|
| `[18, 15, 9, 12, 14]` | en 1ʳᵉ position | 1 |
| `[12, 15, 18, 9, 14]` | au milieu | 3 |
| `[12, 15, 9, 14, 18]` | en dernière position | 5 |
| `[12, 15, 9, 14, 11]` | absente | 5 |

!!! definition "Définition : meilleur cas et pire cas"
    Le **meilleur cas** est la situation la plus favorable pour l'algorithme : celle où il effectue le moins d'opérations.

    Le **pire cas** est la situation la plus défavorable : celle où il en effectue le plus.

!!! propriete "Coût d'une recherche d'occurrence"
    - **Meilleur cas** : la valeur occupe la première case. Une seule comparaison suffit, et ce quel que soit $n$ : le coût est **constant**, noté $O(1)$.
    - **Pire cas** : la valeur est en dernière position, ou **absente**. Il faut lire les $n$ cases : le coût est **linéaire**, noté $O(n)$.

!!! warning "Le pire cas, c'est l'absence"
    Pour affirmer qu'une valeur est **absente**, il n'existe aucun raccourci : il faut avoir vérifié **toutes** les cases. Un parcours partiel se comporte alors exactement comme un parcours total.

!!! tip "Quel cas retenir ?"
    En informatique, on raisonne le plus souvent sur le **pire cas** : c'est la seule **garantie** que l'on puisse offrir. Dire « mon algorithme est rapide si les données sont bien rangées » n'engage à rien ; dire « il ne dépassera jamais $n$ comparaisons » est une promesse tenable.

    Une recherche d'occurrence est donc, dans le pire cas, en $O(n)$ — comme un parcours total. Son avantage ne se voit qu'en **moyenne**, sur de nombreuses exécutions.

---

## 3 - Un tableau trié change tout 🔎

Nos algorithmes ne font aucune hypothèse sur le tableau. Mais si celui-ci était **trié**, une recherche pourrait faire infiniment mieux que de lire les cases une à une : il suffirait de couper le tableau en deux à chaque étape, comme lorsqu'on cherche un mot dans un dictionnaire.

| Taille du tableau | Recherche séquentielle (pire cas) | Recherche par dichotomie (pire cas) |
|:---:|:---:|:---:|
| 100 | 100 comparaisons | 7 comparaisons |
| 1 000 | 1 000 comparaisons | 10 comparaisons |
| 1 000 000 | 1 000 000 comparaisons | 20 comparaisons |

!!! propriete "Coût logarithmique"
    Un algorithme qui **divise par deux** la taille du problème à chaque étape a un coût **logarithmique**, noté $O(\log n)$.

    Doubler la taille des données ne lui coûte qu'**une** étape supplémentaire.

C'est le principe de la **recherche dichotomique**, que nous étudierons dans le chapitre d'**algorithmique avancée** — nous y démontrerons sa terminaison à l'aide d'un variant de boucle. Retenez dès maintenant l'idée essentielle : **le coût d'un algorithme dépend aussi de la façon dont les données sont organisées**.

---

## 4 - Quand les boucles s'emboîtent 🔁🔁

Que se passe-t-il lorsqu'une boucle en contient une autre ? Nous en avons déjà rencontré un exemple : le parcours d'une **matrice**.

```python title="Parcourir une matrice de n lignes et n colonnes" linenums="1"
for i in range(len(M)):
    for j in range(len(M[i])):
        print(M[i][j])
```

Pour **chacune** des $n$ lignes, la boucle intérieure effectue $n$ tours : au total, $n \times n = n^2$ opérations.

| Taille $n$ | Opérations |
|:---:|:---:|
| 10 | 100 |
| 100 | 10 000 |
| 1 000 | 1 000 000 |

!!! propriete "Coût quadratique"
    Deux boucles imbriquées parcourant chacune $n$ éléments donnent un coût **quadratique**, noté $O(n^2)$.

    Multiplier la taille des données par 10 multiplie le temps de calcul par **100**.

!!! warning "Les boucles imbriquées ne sont pas toujours visibles"
    Un appel de fonction peut en cacher une :

    ```python linenums="1"
    def doublons(tableau):          # ⚠️ deux parcours emboîtés
        resultat = []
        for element in tableau:
            if tableau.count(element) > 1:
                resultat.append(element)
        return resultat
    ```

    `count()` parcourt tout le tableau... et il est appelé pour **chaque** élément : le coût est bien en $O(n^2)$, même si l'on ne voit qu'une seule boucle.

C'est ce coût quadratique que nous retrouverons dans la partie suivante, avec les **algorithmes de tri**.

---

## 5 - Bilan ✅

!!! info "À retenir"
    | Algorithme | Type de parcours | Meilleur cas | Pire cas |
    |:---|:---:|:---:|:---:|
    | Recherche d'une occurrence | partiel | $O(1)$ | $O(n)$ |
    | Indice de la première occurrence | partiel | $O(1)$ | $O(n)$ |
    | Liste de toutes les occurrences | total | $O(n)$ | $O(n)$ |
    | Recherche d'un minimum / maximum | total | $O(n)$ | $O(n)$ |
    | Calcul d'une moyenne | total | $O(n)$ | $O(n)$ |
    | Parcours d'une matrice $n \times n$ | total | $O(n^2)$ | $O(n^2)$ |

    Trois réflexes à conserver :

    1. un **parcours total** coûte toujours $O(n)$, quelles que soient les données ;
    2. un **parcours partiel** peut s'arrêter tôt, mais son **pire cas** reste $O(n)$ — et ce pire cas est celui de la valeur absente ;
    3. deux boucles **imbriquées** font basculer en $O(n^2)$ : traquez-les, y compris lorsqu'elles se cachent derrière un appel comme `count()` ou `in`.
