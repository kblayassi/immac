---
title: Dériver une somme de fonctions
weight: 2
---

# Dériver une somme de fonctions

## Comment faire ?

!!! methode "Comment dériver une somme de fonctions ?"
    On considère la fonction \( f \) définie sur \( \mathbb{R}^+ \) par \( \textcolor{gray}{f(x) = x^3 + x^2 + \sqrt{x}} \).

    1. **On identifie chaque terme constituant l’expression algébrique de la fonction.**  
        Ici, on a trois termes :  \( \textcolor{gray}{u(x) = x^3, \, v(x) = x^2 \, \text{et} \, w(x) = \sqrt{x}} \).

    2. **On dérive séparément chaque terme.** (voir fiche 15)  
        Ici, on a donc :  \( \textcolor{gray}{u'(x) = 3x^2, \, v'(x) = 2x \,} \) et \( \textcolor{gray}{\, w'(x) = \frac{1}{2\sqrt{x}}} \).

    3. **On détermine le domaine de dérivabilité de la fonction \( f \).**  
        Il s’agit de l’intersection des domaines de dérivabilité de chaque terme.  
        Ici, $u$ et $v$ sont dérivables sur $\mathbb{R}$ et $w$ sur $\mathbb{R}^*_+$.  
        La fonction \( f \) est donc dérivable sur $\mathbb{R}^*_+$.

    4. **La dérivée de notre fonction est la somme des dérivées de chaque terme.**  
        Au final, on a donc :  
        \( \textcolor{gray}{\forall x \in \mathbb{R}^+, \, f'(x) = u'(x) + v'(x) + w'(x) = 3x^2 + 2x + \frac{1}{2\sqrt{x}}.} \)

    ---

    **Déduction :** On en déduit que la fonction $k\times u$ admet pour dérivée $k\times u'$.

    *Exemple : Si $f(x)=3x^2+4x$, alors $f'(x)=3\times 2x + 4\times 1$. Ainsi, $\forall x \in \mathbb{R}, f'(x)=6x+4$*


## S'entrainer !

#### Dérivée de $k\times u$

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181a268d15fa0f22272e13461e8a145e132b2b1614bb272e13350f2c17ed0f1c272e132b2e3627c127cb277b27c817e81336133512d20f2d29592a7617f90e8714d813f2139e197e2cd22e1e139e1a400e8714d6168a111127802a22" class="exerciseur" allowfullscreen></iframe>

#### Dérivée d'un polynôme

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181a26bd15f90f22272e13461e8a145e13f32b1614bb272e13350f2c17eb0f2c13a6281a2a84277b2d00181b26312d320f1c272e132b2e0a2949181a26bd15f90f22272e13461e8a145e13f32b1613f3272e13350f2c17eb0f2c13a62da32dfa0f2c140a2da32dfa0f1c272e12c72e3627c127cb277b27c817e61336133512d20f2d29592a7617f90e8714d813f2139e197e2cd22e1e139e1a400e8714d6168a11110e8714da138e139e15f10e8714ce169a2b042c102a8a2afe139e1a400e8714d7149e0065" class="exerciseur" allowfullscreen></iframe>

#### Dérivée de $u+v$

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181615f426bd0f22272e13461e8a145e14572e3627c127cb277b27c817e61336133512d20f2d29592a7617f90e8714d813f2139e197e2cd22e1e139e1a400e8714d6168a111127802dba139e13ab0076" class="exerciseur" allowfullscreen></iframe>