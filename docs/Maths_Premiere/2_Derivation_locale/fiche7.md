---
title: Déterminer l’équation réduite d’une tangente
weight: 4
---

# Déterminer l’équation réduite d’une tangente

## Comment faire ?

!!! methode "Comment déterminer l’équation réduite d’une tangente ?"
    <span style="color: gray;">On cherche à déterminer l’équation réduite de la tangente à la courbe représentative de \( f \) définie par \( f(x) = x^3 - x^2 + x - 1 \) au point d’abscisse \( a = 1 \).</span>

    1. **On calcule \( f(a) \) :**  
       <span style="color: gray;">Ici, \( f(1) = 1 - 1 + 1 - 1 = 0 \).</span>

    2. **On calcule \( f'(a) \) (voir fiche 5)**  
       <span style="color: gray;">On a</span>  
       $$
       \textcolor{gray}{T_{f,1}(h) = \frac{f(1+h) - f(1)}{h} = \frac{h(h^2+2h+2)}{h} = h^2 + 2h + 2}
       $$  
       <span style="color: gray;">Donc \( f'(2) = \displaystyle \lim_{h \to 0} T_{f,1}(h) = 2 \).</span>

    3. **On applique la forme : \( T_A : y = f'(a)(x-a) + f(a) \) et on développe/simplifie.**  
       <span style="color: gray;">Ainsi, on a \( T_1 : y = 2(x-1) + 0 \).</span>  
       <span style="color: gray;">Donc, finalement, \( T_1 : y = 2x - 2 \).</span>



## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e926c526c40f22272e13461e8a133213f32b1614bb272e13350f2c17e60f2217e60f1c272e132b2e3627c127cb277b27c817e81336133512d20f2d29592a7617f90e8714d813f2139e197e2d962cd6295327c711222b3e10d2139e1a400e8714d616962df62d9a2bab111127802d922b4027c32d96" class="exerciseur" allowfullscreen></iframe>



