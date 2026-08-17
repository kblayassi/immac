---
title: Dériver une fonction composée affine
weight: 5
---

# Dériver une fonction composée affine

## Comment faire ?

!!! methode "Comment dériver une fonction composée affine ?"
    On considère les fonctions $\textcolor{gray}{f_1(x) = (3x + 1)^2}$ et $\textcolor{gray}{f_2(x) = \sqrt{5x + 2}}$.

    1. **On identifie les coefficients $m$ et $p$ de la fonction affine "cachée".**  
        Dans le cas de $f_1$, on a $\textcolor{gray}{m = 3}$ et $\textcolor{gray}{p = 1}$.  
        Dans le cas de $f_2$, on a $\textcolor{gray}{m = 5}$ et $\textcolor{gray}{p = 2}$.
       
    2. **On identifie la fonction de référence.**  
       Ici, on remarque qu’il s’agit de $\textcolor{gray}{g_1 : x \mapsto x^2}$ dans le cas de $f_1$  
       et de $\textcolor{gray}{g_2 : x \mapsto \sqrt{x}}$ dans le cas de $f_2$.

    2. **On dérive cette fonction de référence.**  
       On a :  $\textcolor{gray}{g_1'(x) = 2x}$ et $\textcolor{gray}{g_2'(x) = \frac{1}{2\sqrt{x}}}$.

    4. **On applique la formule $f'(x) = m \times g'(mx + p)$.**  
       Ici, on a donc :  $\textcolor{gray}{\forall x \in \mathbb{R}, f_1'(x) = 3 \times g_1'(3x + 1) = 3 \times 2(3x + 1) = 18x + 6}$  
       et  $\textcolor{gray}{\forall x \in ]\frac{-2}{5};+\infty[, f_2'(x) = 5 \times g_2'(5x + 2) = 5 \times \frac{1}{2\sqrt{5x + 2}} = \frac{5}{2\sqrt{5x + 2}}}$.

## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e8140613690f22272e13461e8a145e15832e3627c127cb277b27c817e81336133512d20f2d29592a7617f90e8714d813f2139e197e2cd22e1e139e1a400e8714d6168a111127802842139e13a1263d0e8714c71a0b0e8714c70039" class="exerciseur" allowfullscreen></iframe>