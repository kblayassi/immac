---
title: Déterminer le sens de variation d'une suite arithmétique ou géométrique
weight: 2
---

# Déterminer le sens de variation d'une suite arithmétique ou géométrique

## Comment faire ?

!!! methode "Comment déterminer le sens de variation d'une suite arithmétique ?"
    On considère la suite arithmétique définie sur $\mathbb{N}$ par  $\textcolor{gray}{u_n = 8n + 4}$.

    1. **Déterminer la raison de la suite** (voir fiche 24)

        Ici, on a : $\textcolor{gray}{u_{n+1} - u_n = (8(n+1) + 4) - (8n + 4) = 8n + 8 + 4 - 8n - 4 = 28}$

        Donc $\textcolor{gray}{(u_n)}$ est une suite arithmétique de raison $\textcolor{gray}{28}$.

    2. **Analyser le signe de la raison :**  

        - Si la raison est **positive**, la suite est **croissante**.
        - Si la raison est **nulle**, la suite est **constante**.
        - Si la raison est **négative**, la suite est **décroissante**.

        Ici, on a $\textcolor{gray}{r = 28 > 0}$. La suite est donc **croissante**.

!!! methode "Comment déterminer le sens de variation d'une suite géométrique ?"
    On considère la suite $(u_n)$ définie par $\textcolor{gray}{u_n = 3 \times 1,2^n}$.

    1. **Déterminer la raison et le premier terme de la suite** (voir fiche 26).

        $$
        q = \frac{u_{n+1}}{u_n} = \frac{3 \times 1,2^{n+1}}{3 \times 1,2^n} = \textcolor{gray}{1,2}
        $$

        De même,  $\textcolor{gray}{u_0 = 3 \times 1,2^0 = 3}$.

        Finalement, $(u_n)$ est une suite géométrique de premier terme $\textcolor{gray}{u_0 = 3}$ et de raison $\textcolor{gray}{q = 1,2}$.

    2. **Analyser les variations de la suite**.

        En utilisant le **signe du premier terme** et en comparant la raison à **1**, on peut conclure :

        Ici, $\textcolor{gray}{u_0 > 0}$ et $\textcolor{gray}{q > 1}$.  
        La suite $(u_n)$ est donc **croissante**.

## S'entrainer !

#### Déterminer le sens de variation d'une suite arithmétique

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e814fb142e0f22272e13461dc21396132b2b1614bb272e13350f2c17e60f2217e60f1c272e132b2e3627c127cb277b27c817e81336133512d10f2d29592a7617f90e8714d813f2139e197e2d962cd6295327c7111927802d322b4c111127802e5a2cd2263929542b042716139e13a02e0327802d42295927802637295928ee0e8714d813f2139e197e2d9a2c7a0065" class="exerciseur" allowfullscreen></iframe>

#### Déterminer le sens de variation d'une suite géométrique

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e814fb142e0f22272e13461dc21396132b2b1614bb272e13350f2c17e711a80f1c272e132b2e3627c127cb277b27c817e81336133512d10f2d29592a7617f90e8714d813f2139e197e2d962cd6295327c7111927802d322b4c111127802e5a2cd2263929542b042716139e13a02e0327802d42295927802842139e1a400e8714d616942a9a139e1a400e8714d616992cd22c7a0065" class="exerciseur" allowfullscreen></iframe>