---
title: TP1 - Performance et coût d'un algorithme
weight: 0.9
---

# TP1 — Performance et coût d'un algorithme ⏱️

Certains algorithmes de cryptographie utilisent la multiplication de très grands nombres entiers. Ils nécessitent donc des algorithmes de calcul performants. On s'intéresse ici à deux algorithmes de calcul de $x^n$, où $x$ est un nombre réel et $n$ un entier positif.

L'algorithme pour résoudre un problème mathématique n'est **pas unique**. Pour déterminer lequel choisir en termes de temps de calcul, une des méthodes consiste à évaluer le **coût** des algorithmes, en estimant le nombre d'opérations élémentaires effectuées, ou le nombre de tours de boucle.

!!! definition "Opération élémentaire"
    On appelle **opération élémentaire** toute opération d'affectation de variable, de calcul (addition, soustraction, division, multiplication) ou encore de comparaison entre deux valeurs.

    On suppose que les instructions sont exécutées l'une après l'autre, sans opérations simultanées.

Ce coût est appelé **complexité temporelle**.

---

## 1 - Dérouler les deux algorithmes

Voici les deux algorithmes étudiés.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;" markdown="1">

```text title="Algorithme 1"
Algorithme : puissance1(x, n)

p ← 1
Pour i allant de 1 à n :
    p ← p * x
Fin Pour

Renvoyer p
```

```text title="Algorithme 2"
Algorithme : puissance2(x, n)

p ← 1
Tant que n > 0 :
    Si n est impair :
        p ← p * x
    Fin Si
    x ← x * x
    n ← n // 2
Fin Tant que

Renvoyer p
```

</div>

**Question 1.** Dérouler chacun des algorithmes en complétant les deux tableaux de variables, pour $x = 2$ et $n = 5$.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;" markdown="1">

| Algorithme 1 | `i` | `p` |
|:---|:---:|:---:|
| Initialisation | non définie | 1 |
| 1ᵉʳ tour | ...... | ...... |
| 2ᵉ tour | ...... | ...... |
| 3ᵉ tour | ...... | ...... |
| 4ᵉ tour | ...... | ...... |
| 5ᵉ tour | ...... | ...... |

| Algorithme 2 | `p` | `x` | `n` |
|:---|:---:|:---:|:---:|
| Initialisation | 1 | 2 | 5 |
| 1ᵉʳ tour | ...... | ...... | ...... |
| 2ᵉ tour | ...... | ...... | ...... |
| 3ᵉ tour | ...... | ...... | ...... |

</div>

**Question 2.** Quel est le point commun essentiel entre ces deux algorithmes ?

??? success "Correction"
    **1.**

    | Algorithme 1 | `i` | `p` |
    |:---|:---:|:---:|
    | Initialisation | non définie | 1 |
    | 1ᵉʳ tour | 1 | 2 |
    | 2ᵉ tour | 2 | 4 |
    | 3ᵉ tour | 3 | 8 |
    | 4ᵉ tour | 4 | 16 |
    | 5ᵉ tour | 5 | 32 |

    | Algorithme 2 | `p` | `x` | `n` |
    |:---|:---:|:---:|:---:|
    | Initialisation | 1 | 2 | 5 |
    | 1ᵉʳ tour | 2 | 4 | 2 |
    | 2ᵉ tour | 2 | 16 | 1 |
    | 3ᵉ tour | 32 | 256 | 0 |

    **2.** Ils renvoient **exactement le même résultat** : $2^5 = 32$. Deux algorithmes différents peuvent résoudre le même problème — et c'est précisément pour cela qu'il faut savoir les **comparer**.

    Observez tout de même la différence de chemin : l'algorithme 1 a fait 5 tours, le second seulement 3.

---

## 2 - Compter les tours de boucle

Pour simplifier l'étude de la complexité, on ne s'intéresse ici qu'au **nombre de tours de boucle**.

**Question 3.** Recopier et compléter le tableau suivant.

| Nombre de tours de boucle | Algorithme 1 | Algorithme 2 |
|:---|:---:|:---:|
| Calcul de $2^5$ | ...... | ...... |
| Calcul de $2^{5000}$ | ...... | ...... |
| Calcul de $2^n$ | ...... | environ $\log_2(n+1)$ tours |

💡 Pour la dernière colonne, il suffit de s'intéresser aux affectations successives de la variable `n` : elle est divisée par 2 à chaque tour.

**Question 4.** Vérifier vos réponses en complétant les deux fonctions ci-dessous, qui comptent les tours de boucle sans effectuer le calcul.

{{ python_playground(
  key="ch9-tp-puissance-tours",
  hauteur="400px",
  example_file="files/NSI/Python/exemples/ch9/tp_puissance_tours.py",
  solution_file="files/NSI/Python/.corrections/ch9/tp_puissance_tours_solution.py",
  tests_file="files/NSI/Python/.corrections/ch9/tp_puissance_tours_tests.py"
) }}

**Question 5.** Que peut-on supposer pour les temps d'exécution des deux algorithmes ? Conclure en précisant quel algorithme choisir pour calculer $x^n$ lorsque $n$ est grand.

??? success "Correction"
    **3.**

    | Nombre de tours de boucle | Algorithme 1 | Algorithme 2 |
    |:---|:---:|:---:|
    | Calcul de $2^5$ | 5 tours | 3 tours |
    | Calcul de $2^{5000}$ | 5 000 tours | 13 tours |
    | Calcul de $2^n$ | $n$ tours | environ $\log_2(n+1)$ tours |

    **5.** Le temps d'exécution étant proportionnel au nombre de tours, l'algorithme 2 est **massivement** plus rapide dès que $n$ grandit : 13 tours au lieu de 5 000, soit près de 400 fois moins de travail.

    Et l'écart ne cesse de se creuser : pour $n = 5\,000\,000$, l'algorithme 1 demande cinq millions de tours quand le second en demande 23. **Pour un grand $n$, il n'y a pas à hésiter : c'est l'algorithme 2.**

    Retenez la forme de cette croissance : quand la taille du problème est **multipliée par mille**, le second algorithme n'a besoin que d'une dizaine de tours supplémentaires. Nous donnerons bientôt un nom à ce comportement — le coût **logarithmique**.

!!! info "Ce qu'il faut retenir de ce TP"
    - Un même problème admet **plusieurs** algorithmes, qui ne se valent pas.
    - Pour les comparer sans dépendre de la machine, on compte les **opérations élémentaires**, ou plus simplement les **tours de boucle**.
    - Le vrai critère n'est pas la vitesse sur un petit exemple, mais la façon dont le coût **évolue** quand les données grandissent.

    C'est exactement ce que la partie suivante va formaliser.
