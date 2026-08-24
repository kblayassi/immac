---
title: TP2 - Parcours séquentiel d'un tableau
weight: 2.8
---

# TP2 — Parcours séquentiel, total ou partiel 🔍

Julie, fan de cryptographie, souhaite faire une **analyse fréquentielle** sur un tableau de lettres. L'un de ses programmes doit compter les occurrences d'une lettre particulière dans un tableau.

Le **parcours séquentiel** permet d'examiner le tableau dans sa totalité, ou seulement en partie, selon l'algorithme choisi. C'est cette différence que ce TP explore.

---

## 1 - Compter les occurrences

**Question 1.** Rechercher sur le Web un synonyme du mot « occurrence ». Comment Julie doit-elle s'y prendre pour faire ce comptage ?

**Question 2.** Julie pourrait-elle prévoir à l'avance le nombre de cases du tableau à parcourir ? En déduire le type de boucle à privilégier pour déterminer la fréquence d'apparition de la lettre.

**Question 3.** Proposer, en pseudo-code, un algorithme de parcours qui renvoie le nombre d'occurrences de la lettre cherchée dans un tableau donné.

??? success "Correction"
    **1.** Une occurrence, c'est une **apparition** de la lettre dans le tableau. Pour les compter, Julie doit examiner les cases **une par une** et incrémenter un compteur à chaque fois qu'elle rencontre la lettre cherchée.

    **2.** Oui, elle le sait à l'avance : c'est la **longueur du tableau**. Comme le nombre de tours est connu avant de commencer, on privilégie une boucle **bornée** — un `pour`.

    **3.**

    ```text linenums="1"
    Algorithme comptage

    Entrées :
        tableau, un tableau de lettres
        lettre, la lettre recherchée

    compteur ← 0
    Pour chaque element du tableau :
        Si element = lettre :
            compteur ← compteur + 1
        Fin Si
    Fin Pour

    Renvoyer compteur

    Sortie :
        le nombre d'occurrences de lettre dans tableau
    ```

---

## 2 - Chercher la présence

Julie souhaite à présent rechercher la **présence ou l'absence** d'une lettre particulière dans le tableau.

**Question 4.** Le parcours total du tableau est-il toujours nécessaire ? En déduire le type de boucle à privilégier pour effectuer cette recherche.

**Question 5.** Modifier l'algorithme précédent afin de transformer le parcours total en un parcours **partiel**. L'algorithme doit renvoyer « Vrai » si la lettre cherchée est présente dans le tableau, et « Faux » sinon.

**Question 6.** Montrer que cet algorithme se termine, en examinant la condition de bouclage.

??? success "Correction"
    **4.** **Non.** Dès que la lettre est trouvée, la réponse est connue : inutile d'examiner la suite. Comme on ne sait pas à l'avance quand on s'arrêtera, une boucle **non bornée** — un `tant que` — traduit le mieux cette intention.

    ⚠️ Attention toutefois : si la lettre est **absente**, il faudra bel et bien parcourir tout le tableau pour pouvoir l'affirmer.

    **5.**

    ```text linenums="1"
    Algorithme recherche

    Entrées :
        tableau, un tableau de lettres
        lettre, la lettre recherchée

    i ← 0
    Tant que i < longueur(tableau) et tableau[i] ≠ lettre :
        i ← i + 1
    Fin Tant que

    Renvoyer i < longueur(tableau)

    Sortie :
        Vrai si lettre est présente dans tableau, Faux sinon
    ```

    **6.** La variable `i` part de 0 et **augmente de 1 à chaque tour**. La condition de bouclage exige `i < longueur(tableau)` : au bout d'au plus `longueur(tableau)` tours, cette condition devient fausse et la boucle s'arrête forcément. L'algorithme se termine donc toujours.

    Vous retrouverez ce raisonnement, sous le nom de **variant de boucle**, dans le chapitre d'algorithmique.

---

## 3 - Passer au programme

**Question 7.** Implémenter les deux algorithmes en Python.

{{ python_playground(
  key="ch4-tp-parcours",
  hauteur="380px",
  example_file="files/NSI/Python/exemples/ch4/tp_parcours.py",
  solution_file="files/NSI/Python/.corrections/ch4/tp_parcours_solution.py",
  tests_file="files/NSI/Python/.corrections/ch4/tp_parcours_tests.py"
) }}

**Question 8.** Combien de cases chacun des deux algorithmes examine-t-il, dans le pire des cas, pour un tableau de taille $n$ ?

??? success "Correction de la question 8"
    Les deux en examinent **$n$**, c'est-à-dire la totalité du tableau.

    Pour le comptage, c'est évident : il faut tout lire pour être sûr de n'oublier aucune occurrence. Pour la recherche, c'est plus surprenant — mais le pire cas est celui de la **lettre absente**, et il n'existe alors aucun raccourci.

    L'avantage du parcours partiel ne se voit donc pas dans le pire cas, mais **en moyenne** : bien souvent, la lettre est trouvée avant la fin. Le chapitre d'algorithmique donnera un nom et une mesure à cette différence. 📈

!!! info "Ce qu'il faut retenir de ce TP"
    Deux façons de parcourir un tableau, qui répondent à deux questions différentes :

    | | Parcours **total** | Parcours **partiel** |
    |:--|:--|:--|
    | Boucle | bornée (`pour`) | non bornée (`tant que`) |
    | On s'arrête | à la fin, toujours | dès qu'on a trouvé |
    | Exemple | compter les occurrences | chercher la présence |
