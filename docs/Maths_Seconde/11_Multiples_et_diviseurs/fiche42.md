---
title: Démontrer qu'un entier est multiple d'un autre, est pair ou impair
weight: 2
---

# Démontrer qu'un entier est multiple d'un autre, est pair ou impair

## Comment faire ?

!!! methode "Comment démontrer qu'un entier est un multiple de $a$ ?"
    On démontrera que la somme de deux multiples de \( \textcolor{gray}{5} \) est un multiple de \( \textcolor{gray}{5} \).

    1. **On traduit chaque hypothèse** avec la définition (fiche 41) : « \( b \) est un multiple de \( 5 \) » s'écrit \( b=5k \), avec \( k \) entier. On prend une **lettre différente** pour chaque nombre.  
        Il existe un entier \( \textcolor{gray}{k} \) tel que \( \textcolor{gray}{b=5k} \), et un entier \( \textcolor{gray}{k'} \) tel que \( \textcolor{gray}{c=5k'} \).

    2. **On calcule** l'expression demandée, puis on **factorise par \( a \)**.  
        \( \textcolor{gray}{b+c=5k+5k'=5(k+k')} \)

    3. **On nomme** le facteur obtenu, et on vérifie que c'est bien un **entier**.  
        On pose \( \textcolor{gray}{K=k+k'} \) : c'est un entier, comme somme de deux entiers.

    4. **On conclut avec la définition :** l'expression s'écrit \( aK \) avec \( K \) entier.  
        \( \textcolor{gray}{b+c=5K} \) avec \( \textcolor{gray}{K} \) entier, donc \( \textcolor{gray}{b+c} \) est un multiple de \( \textcolor{gray}{5} \).

!!! methode "Comment démontrer qu'un entier est pair ou impair ?"
    On démontrera que le carré d'un nombre impair est impair.

    1. **On traduit l'hypothèse :** « \( a \) est impair » s'écrit \( a=2k+1 \), avec \( k \) entier (fiche 41).  
        Soit \( \textcolor{gray}{a} \) impair : il existe un entier \( \textcolor{gray}{k} \) tel que \( \textcolor{gray}{a=2k+1} \).

    2. **On calcule**, puis on **fait apparaitre \( 2\times(\dots) \)**, suivi de \( +1 \) s'il en reste un.  
        \( \textcolor{gray}{a^2=(2k+1)^2=4k^2+4k+1=2(2k^2+2k)+1} \)

    3. **On nomme** le contenu de la parenthèse, et on vérifie que c'est un entier.  
        On pose \( \textcolor{gray}{K=2k^2+2k} \) : c'est un entier, comme somme de deux entiers.

    4. **On conclut :** de la forme \( 2K \), le nombre est pair ; de la forme \( 2K+1 \), il est impair.  
        \( \textcolor{gray}{a^2=2K+1} \) avec \( \textcolor{gray}{K} \) entier, donc \( \textcolor{gray}{a^2} \) est impair.


## S'entrainer !

#### Déterminer la parité d'une expression

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e827b814f80f22272e13b7139911ad0f2f181a2a762e5e0f1e2d0a13ff133612d113350f2d29592a7617f90e8714c714d813f2139e139e197e2d962cd6295327c70e8714c714c7130d25ea139e139e13992c022cd22d56139e139e1a400e8714c714d6164a139e139e13992716139e13a02e03277a139e139e139927cd2c1327c82d362bab" class="exerciseur" allowfullscreen></iframe>
