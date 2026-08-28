---
title: Déterminer les multiples et les diviseurs d'un entier
weight: 1
---

# Déterminer les multiples et les diviseurs d'un entier

## Comment faire ?

!!! methode "Comment montrer qu'un entier est, ou n'est pas, un multiple d'un autre ?"
    On dira si \( \textcolor{gray}{12} \) est un multiple de \( \textcolor{gray}{3} \), puis si \( \textcolor{gray}{17} \) est un multiple de \( \textcolor{gray}{2} \).

    1. **On cherche s'il existe un entier \( k \) tel que \( a=kb \) :** pour cela, on divise \( a \) par \( b \).  
        \( \textcolor{gray}{12\div 3=4} \)  ·  \( \textcolor{gray}{17\div 2=8{,}5} \)

    2. **Si le quotient est un entier**, on écrit l'égalité \( a=kb \) et on conclut dans les deux sens.  
        \( \textcolor{gray}{12=3\times 4} \) avec \( \textcolor{gray}{4} \) entier : \( \textcolor{gray}{12} \) est un multiple de \( \textcolor{gray}{3} \), et \( \textcolor{gray}{3} \) est un diviseur de \( \textcolor{gray}{12} \).

    3. **Sinon, on conclut que ce n'est pas un multiple**, en justifiant que le quotient n'est pas entier.  
        Si \( \textcolor{gray}{2k=17} \), alors \( \textcolor{gray}{k=8{,}5} \), qui n'est pas un entier : \( \textcolor{gray}{17} \) n'est pas un multiple de \( \textcolor{gray}{2} \).

!!! methode "Comment déterminer tous les diviseurs d'un entier ?"
    On cherchera tous les diviseurs de \( \textcolor{gray}{36} \).

    1. **On teste les entiers à partir de \( 1 \)**, dans l'ordre croissant.  
        \( \textcolor{gray}{1} \) divise \( \textcolor{gray}{36} \), \( \textcolor{gray}{2} \) aussi, \( \textcolor{gray}{3} \) aussi, \( \textcolor{gray}{4} \) aussi ; \( \textcolor{gray}{5} \) ne le divise pas ; \( \textcolor{gray}{6} \) le divise.

    2. **Chaque diviseur trouvé en donne un second :** son quotient. On les note par **paires**.  
        \( \textcolor{gray}{36=1\times 36=2\times 18=3\times 12=4\times 9=6\times 6} \)

    3. **On s'arrête** quand les deux nombres d'une paire se rejoignent, puis on écrit la liste dans l'ordre croissant.  
        Les diviseurs de \( \textcolor{gray}{36} \) sont \( \textcolor{gray}{1\ ;\ 2\ ;\ 3\ ;\ 4\ ;\ 6\ ;\ 9\ ;\ 12\ ;\ 18} \) et \( \textcolor{gray}{36} \).


## S'entrainer !

#### Comprendre le vocabulaire

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e5165d27530f22272e13b7139911a80f2717e60f1d17e612c72d0a14572cff17e6138f2d0017e614bb2d0117e612c726f117e60f2f181a2a762e5e0f1e2d0a13ff133612d113350f2d29592a7617f82baa2c1327c32763277a139e139e13992a760e8714c714c713172ba026272e01262e2cce" class="exerciseur" allowfullscreen></iframe>

#### Écrire la liste de tous les diviseurs d'un entier

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917ec26f314690f22272e13b7139911a60f2717ea0f1d17e612c72d0a13fa13fa13f32cff17ed11a612ce13370f2c140a13370f2c146e138f2922132b26f117e60f2f181a2a762e5e0f1e2d0a13ff133612d113350f2d29592a7617da139e139e1a400e8714c714cd16882cd22cce0e8714c714c7130d25ea139e139e13992a7a2d41277a139e139e139927560e8714c714c713152bb22cf2139e139e13992a762cf2139e139e1399275a2e622d322e072cf2139e139e13992716139e13a02e030e8714c714c713062b4d294a0072" class="exerciseur" allowfullscreen></iframe>

#### Utiliser les critères de divisibilité

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181914f6155d0f22272e13b7139911a70f2f181a2a762e5e0f1e2d0a13ff133612d113350f2d29592a76180a2d9a2a7a2d322c8e139e139e13992a762cf2139e139e139926ff29590e8714c714d813f2139e139e197d2cce2cf2139e139e139927560e8714c714c71305295b29582947295129590e8714c714d813f2139e139e197e" class="exerciseur" allowfullscreen></iframe>
