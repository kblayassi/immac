---
title: Calculer une variance et un écart type
weight: 2
---

# Calculer une variance et un écart type

## Comment faire ?

!!! methode "Comment calculer une variance et un écart type ?"
    On traitera la série suivante, identique à celle de la fiche 18.

    | Valeur | 5 | 8 | 10 |
    |:--|:-:|:-:|:-:|
    | **Effectif** | 1 | 2 | 2 |

    1. **On calcule d'abord la moyenne \( \overline{x} \)** (fiche 18).  
        \( \textcolor{gray}{\overline{x}=\dfrac{1\times 5+2\times 8+2\times 10}{5}=8{,}2} \)

    2. **Pour chaque valeur, on calcule son écart à la moyenne**, que l'on élève au **carré**.  
        \( \textcolor{gray}{(5-8{,}2)^2=10{,}24} \)  ·  \( \textcolor{gray}{(8-8{,}2)^2=0{,}04} \)  ·  \( \textcolor{gray}{(10-8{,}2)^2=3{,}24} \)

    3. **La variance \( V \) est la moyenne pondérée de ces carrés :** chacun compte autant de fois que son effectif.  
        \( \textcolor{gray}{V=\dfrac{1\times 10{,}24+2\times 0{,}04+2\times 3{,}24}{5}=\dfrac{16{,}8}{5}=3{,}36} \)

    4. **L'écart type \( \sigma \) est la racine carrée de la variance** (fiche 13).  
        \( \textcolor{gray}{\sigma=\sqrt{3{,}36}\approx 1{,}83} \)

!!! methode "Comment comparer deux séries avec le couple $(\overline{x}\,;\sigma)$ ?"
    Deux classes ont la même moyenne \( \textcolor{gray}{\overline{x}=8{,}2} \), avec \( \textcolor{gray}{\sigma_A\approx 1{,}83} \) et \( \textcolor{gray}{\sigma_B\approx 4{,}50} \).

    1. **On compare d'abord les moyennes :** elles disent laquelle des deux séries est globalement la plus élevée.  
        Les deux moyennes sont égales : les notes sont globalement au même niveau.

    2. **À moyennes voisines, on compare les écarts types :** le plus petit signale la série la plus **régulière**, la plus resserrée autour de sa moyenne.  
        \( \textcolor{gray}{\sigma_A<\sigma_B} \) : la classe \( \textcolor{gray}{A} \) est plus homogène, la classe \( \textcolor{gray}{B} \) plus dispersée.

    3. **On conclut en revenant au contexte**, sans se contenter des nombres.  
        Même niveau moyen, mais \( \textcolor{gray}{B} \) contient à la fois de très bonnes et de très faibles notes.
