---
title: Donner la forme canonique d'un trinôme
weight: 2
---

# Donner la forme canonique d'un trinôme

## Comment faire ?

!!! methode "Comment donner la forme canonique d'un trinôme ? (méthode 1)"
    <span style="color: gray;">On prendre pour exemple : </span> $ \textcolor{gray}{f(x) = 6x^2 + 5x - 3 .}$

    1. On factorise l’expression de \( f \) par le coefficient de \( x^2 \) :

        $$
        \textcolor{gray}{6x^2 + 5x - 3 = 6 \left( x^2 + \frac{5}{6}x - \frac{3}{6} \right) = 6 \left( x^2 + \frac{5}{6}x - \frac{1}{2} \right)}
        $$

    2. On met en évidence une identité remarquable :

        $$
        \textcolor{gray}{
        \begin{aligned}
            6 \left( x^2 + \frac{5}{6}x - \frac{1}{2} \right) &= 6 \left( x^2 + 2 \times \frac{5}{2 \times 6}x - \frac{1}{2} \right) \\
            &= 6 \left( x^2 + \frac{5}{12}x + \left( \frac{5}{12} \right)^2 - \left( \frac{5}{12} \right)^2 - \frac{1}{2} \right) \\
            &= 6 \left( \left( x + \frac{5}{12} \right)^2 - \left( \frac{5}{12} \right)^2 - \frac{1}{2} \right)
        \end{aligned}
        }
        $$

    3. On développe et simplifie :

        $$
        \textcolor{gray}{6 \left( \left( x + \frac{5}{12} \right)^2 - \left( \frac{5}{12} \right)^2 - \frac{1}{2} \right) = 6 \left( \left( x + \frac{5}{12} \right)^2 - \frac{97}{24} \right)}
        $$

!!! methode "Comment donner la forme canonique d'un trinôme ? (méthode 2)"
    <span style="color: gray;">On prendre pour exemple : </span> $ \textcolor{gray}{f(x) = 6x^2 + 5x - 3 .}$

    1. On calcule \( \alpha \) :

        \[
        \textcolor{gray}{\alpha = -\frac{b}{2a} = -\frac{5}{2 \times 6} = -\frac{5}{12}}
        \]

    2. On calcule \( \beta \) :

        \[
        \textcolor{gray}{
        \beta = f(\alpha) = f\left(-\frac{5}{12}\right) = 6 \times \left(-\frac{5}{12}\right)^2 + 5 \times \left(-\frac{5}{12}\right) - 3 = -\frac{47}{24}
        }
        \]

    3. On donne la forme canonique :

        \[
        \textcolor{gray}{
        f(x) = a(x - \alpha)^2 + \beta = 6 \left(x + \frac{5}{12}\right)^2 - \frac{97}{24}
        }
        \]

## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917eb12d612d50f22272e13461dc313fa132b2b1614bb272e13350f1c272e132b263127b6182b2eb21db72e3627c127cb277b27c817e81336133512d20f2d29592a7617f92bab2b3e2c942a7211132baf2ada111026332bab29562dfa11110e8714c715d22b042da329530e8714d813f2139e19dd2ada002e" class="exerciseur" allowfullscreen></iframe>