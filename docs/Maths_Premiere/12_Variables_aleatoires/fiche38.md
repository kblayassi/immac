---
title: Déterminer la loi de probabilité d'une variable aléatoire
weight: 2
---

# Déterminer la loi de probabilité d'une variable aléatoire

## Comment faire ?

!!! methode "Comment déterminer la loi de probabilité d'une variable aléatoire ?"
    Dans une foire, un jeu consiste à lancer un dé. Si on obtient 6, le joueur gagne 6€ sinon, il doit payer 3€.

    1. **On précise notre modélisation.**  
       On note $\textcolor{gray}{X}$ le gain du joueur, $\textcolor{gray}{X}$ est une variable aléatoire définie sur $\textcolor{gray}{\Omega = \{1;2;3;4;5;6\}}$, et qui peut prendre les valeurs $\textcolor{gray}{-3}$ et $\textcolor{gray}{9}$. Autrement dit, $\textcolor{gray}{X \in \{-3;9\}}$.

    2. **On détermine la probabilité de chaque événement du type $\textcolor{gray}{\{X = k\}}$.**  
       Ici, l'événement $\textcolor{gray}{\{X = 9\}}$ est réalisé par une seule issue : 6. Sa probabilité vaut $\textcolor{gray}{\dfrac{1}{6}}$.  
       L'événement $\textcolor{gray}{\{X = -3\}}$ est réalisé par les issues 1 ;2 ;3 ;4 ;5. Sa probabilité vaut $\textcolor{gray}{\dfrac{5}{6}}$.

    3. **On dresse le tableau représentant la loi de probabilité de $\textcolor{gray}{X}$.**

       | $x_i$ | $-3$ | $9$ |
       |:---:|:---:|:---:|
       | $P(X = x_i)$ | $\dfrac{5}{6}$ | $\dfrac{1}{6}$ |


## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917ea26bd13fe0f22272e1355139911a60f2717ea0f1d17e612c72d0a14572922132b26f117e60f2d295517e50f2f181a2a762e5e0f1e2d0a13fe133612d112d10f2d29592a7617f90e8714c714d813f2139e139e197e2d962cd6295327c70e8714c714c7130d25ea139e139e13992a80290a139e139e139927560e8714c714c713112cd8268a26922a7a2d56139e139e1a400e8714c714d6164a139e139e13992716139e13a02e03277a139e139e13992e5a2cd226272a760e8714c714c713022a36139e139e1a400e8714c714d616862da029570065" class="exerciseur" allowfullscreen></iframe>