---
title: TP3 - Tri par insertion
weight: 2.8
---

# TP3 — Tri par insertion 🂡

L'algorithme de tri par insertion est la façon la plus **naturelle** de trier des cartes à jouer : c'est celle que tout le monde emploie sans y penser, en ramassant sa main. On souhaite à nouveau trier les cartes dans l'ordre 7, 8, 9, 10, V, D, R, As.

!!! info "Principe de l'algorithme de tri par insertion"
    En balayant la main carte par carte, il s'agit d'**insérer** chaque nouvelle carte à la bonne place parmi celles déjà rangées, en décalant vers la droite celles qui lui sont supérieures.

    En fin de parcours, on obtient une main triée.

---

## 1 - Dérouler l'algorithme

**Question 1.** Reprenez huit cartes et appliquez ce principe à la main, sur plusieurs mains différentes. Comparez votre façon spontanée de ranger vos cartes avec l'algorithme décrit.

**Question 2.** Appliquer le tri sur la main `R - V - 9 - 7 - 10 - As - 8 - D`, en recopiant et complétant le tableau suivant. La dernière colonne sera remplie à la question 7.

| Tableau | Carte à comparer | Bien placée ? | Carte(s) à décaler | Carte à insérer | Rang | Comparaisons |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| R – V – 9 – 7 – 10 – As – 8 – D | V | Non | R | V | 0 | 1 |
| V – R – 9 – 7 – 10 – As – 8 – D | 9 | Non | V-R | 9 | 0 | 2 |
| ...... | ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | ...... | ...... | ...... | ...... | ...... | ...... |
| ...... | | Le tableau est trié | | | | **TOTAL :** ...... |

??? success "Correction"
    | Tableau | Comparer | Bien placée ? | À décaler | À insérer | Rang | Comparaisons |
    |:---|:---:|:---:|:---:|:---:|:---:|:---:|
    | R – V – 9 – 7 – 10 – As – 8 – D | V | Non | R | V | 0 | 1 |
    | V – R – 9 – 7 – 10 – As – 8 – D | 9 | Non | V-R | 9 | 0 | 2 |
    | 9 – V – R – 7 – 10 – As – 8 – D | 7 | Non | 9-V-R | 7 | 0 | 3 |
    | 7 – 9 – V – R – 10 – As – 8 – D | 10 | Non | V-R | 10 | 2 | 3 |
    | 7 – 9 – 10 – V – R – As – 8 – D | As | Oui | — | As | 5 | 1 |
    | 7 – 9 – 10 – V – R – As – 8 – D | 8 | Non | 9-10-V-R-As | 8 | 1 | 6 |
    | 7 – 8 – 9 – 10 – V – R – As – D | D | Non | R-As | D | 5 | 3 |
    | 7 – 8 – 9 – 10 – V – D – R – As | | Le tableau est trié | | | | **TOTAL : 19** |

    Observez la ligne de l'As : il est **déjà bien placé**, une seule comparaison suffit et rien n'est décalé. C'est là toute la différence avec le tri par sélection, qui aurait balayé la fin du tableau malgré tout.

---

## 2 - Écrire l'algorithme

**Question 3.** Proposer, en pseudo-code, un algorithme de tri par insertion d'un tableau d'entiers de taille $n$.

??? success "Correction"
    ```text linenums="1"
    Algorithme tri_insertion

    Entrée :
        tableau, un tableau de nombres

    Pour i allant de 1 à longueur(tableau) - 1 :
        valeur ← tableau[i]
        j ← i - 1
        Tant que j ≥ 0 et tableau[j] > valeur :
            tableau[j + 1] ← tableau[j]
            j ← j - 1
        Fin Tant que
        tableau[j + 1] ← valeur
    Fin Pour

    Sortie :
        le tableau trié dans l'ordre croissant
    ```

    La boucle extérieure démarre à **1** et non à 0 : une main d'une seule carte est déjà triée, il n'y a rien à y insérer.

---

## 3 - Terminaison et correction

**Question 4.** Montrer que l'algorithme se termine. ⚠️ Attention : contrairement au tri par sélection, il contient une boucle **non bornée**.

**Question 5.** Dans le tableau de la question 2, entourer la partie déjà triée, étape après étape.

**Question 6.** En déduire la propriété **invariante** au cours du déroulement de l'algorithme :

- [ ] **Propriété 1** : la variable `i` décroît strictement à chaque étape.
- [ ] **Propriété 2** : à la fin de l'étape `i`, le sous-tableau `[0, 1, …, i]` est trié.
- [ ] **Propriété 3** : à la fin de l'étape `i`, le sous-tableau `[0, 1, …, i]` contient les $i+1$ plus petites valeurs du tableau.
- [ ] **Propriété 4** : à la fin de l'étape `i`, le tableau entier est trié.

??? success "Correction"
    **4.** La boucle extérieure est bornée : $n-1$ tours. Pour la boucle `tant que`, on exhibe un **variant** : la quantité `j + 1`. Elle est entière, positive, et **diminue strictement** à chaque tour puisque `j` décroît de 1. Elle ne peut donc pas diminuer indéfiniment : la boucle intérieure s'arrête, et l'algorithme avec elle.

    **6.** C'est la **propriété 2** — et la comparaison avec le tri par sélection est éclairante :

    - la propriété 1 est fausse, `i` croît ;
    - la propriété 4 n'est vraie qu'à la fin ;
    - la **propriété 3 est le piège** : elle est vraie pour le tri par **sélection**, pas pour l'insertion !

    Dans le tri par insertion, la partie gauche est bien triée, mais elle ne contient **pas** les plus petites valeurs du tableau : ce sont simplement les $i+1$ **premières cartes de la main**, rangées entre elles. Une carte plus petite peut très bien apparaître plus tard — et il faudra alors la faire remonter jusqu'à sa place.

    C'est exactement pour cela que le tri par insertion **décale** des valeurs, là où le tri par sélection se contente d'**échanger**.

---

## 4 - Déterminer la complexité expérimentalement

!!! tip "À faire après le cours"
    Comme pour le TP précédent, cette partie mesure ce que le cours démontrera.

Cette fois, plutôt que de chronométrer, nous allons **compter les comparaisons** entre éléments du tableau. C'est une mesure plus fidèle, car indépendante de la vitesse de votre machine.

**Question 7.** Dans l'algorithme de la question 3, repérer l'instruction qui compare la valeur de deux cartes, et compléter la dernière colonne du tableau de la question 2.

**Question 8.** Écrire les fonctions `genere_liste_aleatoire`, `tri_insertion`, puis `tri_insertion_comptage`, qui renvoie le nombre de comparaisons effectuées.

{{ python_playground(
  key="ch9-tp-tri-insertion",
  hauteur="520px",
  example_file="files/NSI/Python/exemples/ch9/tp_tri_insertion.py",
  solution_file="files/NSI/Python/.corrections/ch9/tp_tri_insertion_solution.py",
  tests_file="files/NSI/Python/.corrections/ch9/tp_tri_insertion_tests.py"
) }}

**Question 9.** Effectuer des comptages successifs pour des tableaux d'entiers compris entre 0 et 100, et compléter le tableau suivant.

| Taille du tableau | 250 | 500 | 1 000 | 2 000 | 4 000 |
|:---|:---:|:---:|:---:|:---:|:---:|
| Nombre de comparaisons | ...... | ...... | ...... | ...... | ...... |

**Question 10.** Que devient ce nombre lorsque la taille double ? En déduire la complexité expérimentale du tri par insertion.

**Question 11.** Recommencer avec un tableau **déjà trié**, puis avec un tableau rangé dans l'**ordre décroissant**. Que constate-t-on ?

??? success "Correction des questions 9 à 11"
    **9. et 10.** Sur des tableaux aléatoires, le nombre de comparaisons est **multiplié par 4** à chaque doublement de la taille : le coût est **quadratique**, en $O(n^2)$ — comme pour le tri par sélection.

    **11.** C'est là que tout change :

    | Tableau de départ | Comparaisons | Coût |
    |:---|:---:|:---:|
    | déjà trié | $n - 1$ | $O(n)$ — **linéaire** |
    | aléatoire | environ $n^2/4$ | $O(n^2)$ |
    | trié à l'envers | $n(n-1)/2$ | $O(n^2)$ — le pire cas |

    Sur un tableau déjà trié, chaque carte est comparée une seule fois à sa voisine de gauche et reste sur place : le tri par insertion **devient linéaire**. Le tri par sélection, lui, met exactement le même temps quel que soit l'ordre de départ.

    C'est ce qui fait tout l'intérêt du tri par insertion en pratique : les données réelles sont très souvent **presque triées** — par exemple lorsqu'on ajoute quelques valeurs à une liste déjà ordonnée.
