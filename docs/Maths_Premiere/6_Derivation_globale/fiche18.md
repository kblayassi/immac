---
title: Dériver le produit de deux fonction
weight: 3
---

# Dériver le produit de deux fonction

## Comment faire ?

!!! methode "Comment dériver le produit de deux fonction ?"
    On considère la fonction \( f \) définie sur \( \mathbb{R} \) par \( \textcolor{gray}{f(x) = (x^2 - 5x + 1)(3x + 4)} \).

    1. **On identifie les deux facteurs constituant l’expression algébrique de la fonction.**  
         Ici, on a deux termes :  \( \textcolor{gray}{u(x) = x^2 - 5x + 1 \, \text{et} \, v(x) = 3x + 4} \).

    2. **On dérive séparément chaque produit.** *(voir fiches 15 et 16)*  
        Ici, on a donc :  \( \textcolor{gray}{u'(x) = 2x - 5 \, \text{et} \, v'(x) = 3} \).

    3. **On applique la formule de la dérivée d’un produit** \( (u \times v)' = u'v + uv' \) :  
        Les fonctions \( u \) et \( v \) sont dérivables sur \( \mathbb{R} \), \( f \) est donc dérivable sur \( \mathbb{R} \).  
        On a :  \( \textcolor{gray}{\forall x \in \mathbb{R}, \, f'(x) = u'(x)v(x) + u(x)v'(x)} \)  \( \textcolor{gray}{= (2x - 5)(3x + 4) + (x^2 - 5x + 1) \times 3} \).

    4. **On simplifie et factorise, si possible, l’expression de la dérivée.**  
        Ici, on peut uniquement simplifier :  \( \textcolor{gray}{f'(x) = 9x^2 - 22x - 17} \).

## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e625fb13070f22272e13461e8a145e14bb2b1614bb272e13350f2c17e811aa11a70f1c272e132b2e3627c127cb277b27c817e81336133512d20f2d29592a7617f90e8714d813f2139e197e2cd22e1e139e1a400e8714d6168a111127802e0b" class="exerciseur" allowfullscreen></iframe>