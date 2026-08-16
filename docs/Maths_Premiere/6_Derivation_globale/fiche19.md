---
title: Dériver le quotient de deux fonction
weight: 4
---

# Dériver le quotient de deux fonction

## Comment faire ?

!!! methode "Comment dériver le quotient de deux fonction ?"
    On considère la fonction \( f \) définie sur \( \mathbb{R}^* \) par \( \textcolor{gray}{f(x) = \frac{2x^2 + 4x - 5}{\sqrt{x}}} \).

    1. **On identifie le dividende et le diviseur constituant l’expression algébrique de la fonction.**  
        Ici, on a :  $ \textcolor{gray}{u(x) = 2x^2 + 4x - 5}$ et $ \textcolor{gray}{v(x) = \sqrt{x}} $.

    2. **On dérive séparément chaque produit.** (voir fiche 15 et 16)  
        Ici, on a donc :  $ \textcolor{gray}{u'(x) = 4x + 4}$ et $ \textcolor{gray}{ v'(x) = \frac{1}{2\sqrt{x}}} $.

    3. **On applique la formule de la dérivée d’un quotient** \(\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2} \) :  
        La fonction \( u \) est dérivable sur \( \mathbb{R} \) et \( v \) sur \( \mathbb{R}^* \), \( f \) est donc dérivable sur \( \mathbb{R}^* \).  
        On a :  \( \textcolor{gray}{\forall x \in \mathbb{R}^*, \, f'(x) = \frac{u'(x)v(x) - u(x)v'(x)}{v(x)^2}} \)  \( \textcolor{gray}{= \frac{(4x + 4)\sqrt{x} - (2x^2 + 4x - 5) \times \frac{1}{2\sqrt{x}}}{(\sqrt{x})^2}} \).

    4. **On simplifie et factorise, si possible, l’expression de la dérivée.**  
        Ici, aucune simplification ne paraît évidente.

## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181713ff27eb0f22272e13461e8a145e151f2e3627c127cb277b27c817e81336133512d20f2d29592a7617f90e8714d813f2139e197e2cd22e1e139e1a400e8714d6168a111127802dba139e13af0076"  class="exerciseur" allowfullscreen></iframe>