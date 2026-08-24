---
title: TP2 - Tri par sélection
weight: 2.7
---

# TP2 — Tri par sélection 🃏

L'objectif de ce TP est de trier les 8 cartes à jouer d'une même couleur, ici le trèfle, dans l'ordre suivant : **7, 8, 9, 10, V, D, R, As**.

!!! info "Principe de l'algorithme de tri par sélection"
    En balayant les cartes, il s'agit de **sélectionner l'indice de la carte de valeur la plus faible**, en comparant la première carte de la main avec toutes les autres.

    En fin de parcours, la carte la plus faible est **échangée** avec la première carte de la main. Le balayage se répète ensuite à l'exception de la première carte, qui est désormais bien placée — et ainsi de suite.

---

## 1 - Dérouler l'algorithme

**Question 1.** Prenez huit cartes, mélangez-les, et appliquez le principe ci-dessus à la main. Recommencez sur plusieurs mains différentes pour bien vous en imprégner.

**Question 2.** Appliquer le tri par sélection sur la main `V - R - 9 - 7 - 10 - As - 8 - D`, en recopiant et complétant le tableau suivant.

| Tableau | Carte à comparer (valeur) | (indice) | Carte à échanger (valeur) | (indice) | Variable `i` |
|:---|:---:|:---:|:---:|:---:|:---:|
| V – R – 9 – 7 – 10 – As – 8 – D | V | 0 | 7 | 3 | 0 |
| 7 – R – 9 – V – 10 – As – 8 – D | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | | | Le tableau est trié | | |

??? success "Correction"
    | Tableau | Carte à comparer | indice | Carte à échanger | indice | `i` |
    |:---|:---:|:---:|:---:|:---:|:---:|
    | V – R – 9 – 7 – 10 – As – 8 – D | V | 0 | 7 | 3 | 0 |
    | 7 – R – 9 – V – 10 – As – 8 – D | R | 1 | 8 | 6 | 1 |
    | 7 – 8 – 9 – V – 10 – As – R – D | 9 | 2 | 9 | 2 | 2 |
    | 7 – 8 – 9 – V – 10 – As – R – D | V | 3 | 10 | 4 | 3 |
    | 7 – 8 – 9 – 10 – V – As – R – D | V | 4 | D | 7 | 4 |
    | 7 – 8 – 9 – 10 – D – As – R – V | D | 5 | R | 6 | 5 |
    | 7 – 8 – 9 – 10 – D – R – As – V | R | 6 | V | 7 | 6 |
    | 7 – 8 – 9 – 10 – D – R – V – As | | | Le tableau est trié | | |

    Remarquez l'étape où `i` vaut 2 : la carte est **déjà à sa place**, et l'algorithme l'échange quand même avec elle-même. Il ne s'en aperçoit pas — c'est l'une de ses faiblesses.

---

## 2 - Écrire l'algorithme

**Question 3.** Proposer, en pseudo-code, un algorithme de tri par sélection d'un tableau d'entiers de taille $n$.

??? success "Correction"
    ```text linenums="1"
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

    Sortie :
        le tableau trié dans l'ordre croissant
    ```

    La boucle extérieure s'arrête à l'avant-dernier indice : une fois les $n-1$ premières cartes placées, la dernière est forcément la plus grande.

---

## 3 - Terminaison et correction

**Question 4.** Montrer que l'algorithme se termine.

**Question 5.** Dans le tableau de la question 2, entourer la partie déjà triée, étape après étape. La colonne `i` vous y aidera.

**Question 6.** En déduire la propriété qui vous semble **invariante** — c'est-à-dire qui ne change pas — au cours du déroulement de l'algorithme :

- [ ] **Propriété 1** : la variable `i` décroît strictement à chaque étape.
- [ ] **Propriété 2** : à la fin de l'étape `i`, le sous-tableau `[0, 1, …, i]` est trié et contient les $i+1$ plus petites valeurs.
- [ ] **Propriété 3** : à la fin de l'étape `i`, le sous-tableau `[i, i+1, …, n-1]` est trié.
- [ ] **Propriété 4** : à la fin de l'étape `i`, le tableau entier est trié.

??? success "Correction"
    **4.** L'algorithme n'utilise que des boucles **bornées** : la boucle extérieure fait exactement $n-1$ tours, et la boucle intérieure au plus $n-1$ tours. Un nombre fini de tours, connu à l'avance : l'algorithme se termine forcément.

    **6.** C'est la **propriété 2**.

    - La propriété 1 est fausse : `i` **croît** à chaque étape.
    - La propriété 3 inverse les rôles : c'est la partie **gauche** qui se trie, pas la droite.
    - La propriété 4 n'est vraie qu'à la toute fin — ce n'est donc pas un invariant.

    Notez bien les **deux** affirmations de la propriété 2 : la partie gauche est triée, *et* elle contient les plus petites valeurs du tableau. C'est cette seconde moitié qui garantit qu'on n'aura plus jamais à y toucher.

    Pour compléter cette étude, il faudrait montrer **par récurrence** que cette propriété est bien invariante — la démonstration est hors programme, la preuve par récurrence étant vue en spécialité Mathématiques de Terminale. Retenons que la preuve de terminaison et l'existence d'un **invariant de boucle** prouvent ensemble que l'algorithme est correct.

---

## 4 - Déterminer la complexité expérimentalement

!!! tip "À faire après le cours"
    Cette partie mesure ce que la partie *Algorithmes de tri* démontrera. Vous pouvez la traiter maintenant pour découvrir le résultat par l'expérience, ou y revenir ensuite pour le confirmer.

Nous allons mesurer la **durée d'exécution** de l'algorithme à l'aide du module Python `time`. Cette durée est une indication de son coût. La différence `t2 - t1` est égale à la durée écoulée entre deux appels successifs de la fonction `time()`, exprimée en secondes.

**Question 7.** Écrire une fonction `genere_liste_aleatoire(n, maximum)` qui renvoie une liste de `n` entiers compris entre 0 et `maximum`. On pourra la générer par compréhension.

**Question 8.** Écrire une fonction `tri_selection(liste_a_trier)` qui implémente l'algorithme de la question 3.

**Question 9.** Encadrer l'appel au tri par deux appels à `time()` afin de mesurer sa durée.

{{ python_playground(
  key="ch9-tp-tri-selection",
  hauteur="480px",
  example_file="files/NSI/Python/exemples/ch9/tp_tri_selection.py",
  solution_file="files/NSI/Python/.corrections/ch9/tp_tri_selection_solution.py",
  tests_file="files/NSI/Python/.corrections/ch9/tp_tri_selection_tests.py"
) }}

**Question 10.** Effectuer des mesures successives pour des tableaux d'entiers compris entre 0 et 100, de tailles croissantes, et compléter le tableau ci-dessous.

| Taille du tableau | 250 | 500 | 1 000 | 2 000 | 4 000 |
|:---|:---:|:---:|:---:|:---:|:---:|
| Durée du tri (s) | ...... | ...... | ...... | ...... | ...... |

⚠️ Le tri s'exécute ici **dans votre navigateur** : restez sur des tailles raisonnables, et augmentez progressivement.

**Question 11.** Que devient la durée lorsque la taille du tableau **double** ? En déduire la complexité expérimentale du tri par sélection.

??? success "Correction des questions 10 et 11"
    Les durées exactes dépendent de votre machine, mais leur **rapport** est toujours le même : à chaque doublement de la taille, la durée est multipliée par **environ 4**.

    Or $4 = 2^2$. Une durée qui quadruple quand la taille double est le comportement caractéristique d'un coût **quadratique**, en $O(n^2)$ — ce que confirme la lecture de l'algorithme, avec ses deux boucles imbriquées.

    Conséquence pratique : multiplier la taille par 10 multiplie la durée par 100. Sur un million de valeurs, ce tri serait inutilisable.
