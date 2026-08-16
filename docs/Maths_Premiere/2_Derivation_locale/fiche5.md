---
title: Calculer un nombre dérivé
weight: 2
---

# Calculer un nombre dérivé

## Comment faire ?

!!! methode "Comment calculer le nombre dérivé de \( f \) en \( a \) ?"
    <span style="color: gray;">Soit \( f \) définie sur \( \mathbb{R} \) par \( f(x) = x^2 + 2x - 3 \).  
    On cherche à montrer si \( f \) est dérivable en \( x = 2 \) ou non. Si oui, on calculera ensuite \( f'(2) \).</span>

    1. **On calcule le taux d’accroissement de \( f \) en \( a \) (voir Fiche 4)**  
       <span style="color: gray;">On a</span>  
       $$
       \textcolor{gray}{T_{f,2}(h) = \frac{f(2+h) - f(2)}{h} = \frac{4+4h+h^2+4+2h-3-4-4+3}{h} = \frac{h^2+6h}{h} = h+6}
       $$

    2. **On fait tendre \( h \) vers zéro.**  
       <span style="color: gray;">Si le résultat est un réel, c’est le nombre dérivé de \( f \) en \( a \).  
       Si le résultat dépend de \( h \), alors \( f \) n’est pas dérivable en \( a \).</span>  

       $$
       \textcolor{gray}{\lim_{h \to 0} T_{f,2}(h) = \lim_{h \to 0} (h+6) = 6}
       $$

    3. **On conclut**  
       <span style="color: gray;">Ici, \( f \) est donc dérivable en \( x=2 \) et \( f'(2) = 6 \).</span>



## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e7165712d30f22272e13461e8a12ce132b2b1614bb272e13350f2c17ea0f1c272e132b2e3627c127cb277b27c817e81336133512d20f2d29592a7617f8263127022a762c942e03111b2baa269b27802716139e1a400e8714d61697295b0e8714d813f2139e197e" class="exerciseur" allowfullscreen></iframe>


