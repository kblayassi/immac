---
title: TP3 - Extremum et moyenne
weight: 2.9
---

# TP3 — Recherche d'un extremum et calcul d'une moyenne 📊

La majorité des langages de programmation proposent des fonctions `max()` et `min()`, qui renvoient l'élément le plus grand et l'élément le plus petit d'un tableau. Nous allons découvrir dans ce TP **le principe d'un tel algorithme** — et le reprogrammer nous-mêmes.

---

## 1 - Chercher le plus grand

**Question 1.** Le parcours total du tableau est-il nécessaire pour trouver son plus grand élément ? En déduire la nature de la boucle à privilégier.

**Question 2.** Combien de fois faut-il parcourir le tableau, de taille $n$, pour en extraire le maximum ? En déduire le coût à prévoir pour cet algorithme.

**Question 3.** Le recours à une variable temporaire semble nécessaire. Quel est son rôle ? Proposer un nom évocateur pour la nommer.

**Question 4.** Proposer, en pseudo-code, un algorithme de recherche du maximum d'un tableau qui renvoie la valeur maximale.

??? success "Correction"
    **1.** **Oui**, le parcours total est indispensable : la plus grande valeur peut se trouver n'importe où, y compris dans la toute dernière case. Tant qu'on ne l'a pas lue, on ne peut rien affirmer. On privilégie donc une boucle **bornée**.

    **2.** Un **seul** parcours suffit : on lit chaque case une fois et une seule. Le nombre d'opérations est donc proportionnel à $n$ — le coût est **linéaire**.

    **3.** Elle mémorise **le plus grand élément rencontré jusqu'ici**, et se met à jour dès qu'on trouve mieux. Un nom évocateur : `maxi`, ou `record`.

    **4.**

    ```text linenums="1"
    Algorithme maximum

    Entrée :
        tableau, un tableau non vide de nombres

    record ← tableau[0]
    Pour chaque element du tableau :
        Si element > record :
            record ← element
        Fin Si
    Fin Pour

    Renvoyer record

    Sortie :
        la plus grande valeur du tableau
    ```

    ⚠️ Le record est initialisé avec **le premier élément du tableau**, jamais avec 0 : sur un tableau de températures négatives, la fonction renverrait sinon une valeur qui n'y figure même pas.

---

## 2 - Calculer une moyenne

En plus des fonctions `max()` et `min()`, le recours aux **statistiques** est indispensable dans de nombreuses applications. Le calcul de la moyenne d'un tableau de nombres en est un exemple classique.

**Question 5.** Pour calculer la valeur moyenne d'un tableau d'entiers, combien de fois faut-il le parcourir ? En déduire le coût attendu.

**Question 6.** Le recours à une variable temporaire semble ici aussi nécessaire. Quel est son rôle ? Proposer un nom évocateur.

**Question 7.** Proposer, en pseudo-code, un algorithme de calcul de la moyenne des valeurs d'un tableau de taille $n$.

??? success "Correction"
    **5.** Un seul parcours également : on accumule la somme au fil de la lecture, puis on divise **une fois**, après la boucle. Le coût est là encore **linéaire**.

    **6.** Elle accumule la **somme des valeurs déjà lues**. Un nom évocateur : `total`, ou `somme`.

    **7.**

    ```text linenums="1"
    Algorithme moyenne

    Entrée :
        tableau, un tableau non vide de nombres

    total ← 0
    Pour chaque element du tableau :
        total ← total + element
    Fin Pour

    Renvoyer total / longueur(tableau)

    Sortie :
        la moyenne des valeurs du tableau
    ```

    ⚠️ La division se fait **après** la boucle, et le tableau ne doit pas être vide — on ne divise pas par zéro.

---

## 3 - Passer au programme

**Question 8.** Implémenter les deux algorithmes en Python, sans utiliser `max()` ni `sum()`.

{{ python_playground(
  key="ch4-tp-extremum",
  hauteur="360px",
  example_file="files/NSI/Python/exemples/ch4/tp_extremum.py",
  solution_file="files/NSI/Python/.corrections/ch4/tp_extremum_solution.py",
  tests_file="files/NSI/Python/.corrections/ch4/tp_extremum_tests.py"
) }}

**Question 9.** Comment modifier votre fonction `maximum` pour qu'elle renvoie non pas la valeur du maximum, mais sa **position** dans le tableau ?

??? success "Correction de la question 9"
    Il suffit de mémoriser l'**indice** du record plutôt que sa valeur — ce qui oblige à parcourir le tableau par indices :

    ```python linenums="1"
    def indice_du_maximum(tableau):
        indice_record = 0
        for i in range(len(tableau)):
            if tableau[i] > tableau[indice_record]:
                indice_record = i
        return indice_record
    ```

    C'est une variante que vous retrouverez très souvent : savoir **où** se trouve une valeur est souvent plus utile que la valeur elle-même.

!!! info "Ce qu'il faut retenir de ce TP"
    Les trois algorithmes de ce TP — maximum, minimum, moyenne — reposent tous sur le **même schéma** : une variable préparée avant la boucle, mise à jour à chaque tour, utilisée après.

    C'est le schéma de l'**accumulateur**, et il est partout : compter, sommer, chercher un record, collecter des indices.
