---
title: Étudier les variations d'une suite
weight: 2
---

# Étudier les variations d'une suite

## Comment faire ?

!!! methode "Comment étudier les variations d’une suite ?"
    <span style="color: gray;">Il existe trois méthodes différentes. Il faut savoir utiliser les trois !  
    Prenons par exemple la suite \( (u_n) \) définie sur \( \mathbb{N}^* \) par \( u_n = \tfrac{1}{n} \).</span>

    **Méthode 1 - Étudier le signe de \( u_{n+1} - u_n \)**  

    1. Si pour tout entier \( n \), \( u_{n+1} - u_n > 0 \) alors \( u_{n+1} > u_n \). Donc \( (u_n) \) est croissante.  
    2. Si pour tout entier \( n \), \( u_{n+1} - u_n < 0 \) alors \( u_{n+1} < u_n \). Donc \( (u_n) \) est décroissante.   
    <span style="color: gray;">Ici, \( \frac{1}{n+1} - \frac{1}{n} = \frac{n-(n+1)}{n(n+1)} = \frac{-1}{n(n+1)} < 0 \).  
    Donc \( u_{n+1} - u_n < 0 \iff u_{n+1} < u_n \iff (u_n) \) décroissante.</span>  

    **Méthode 2 - Comparer \( \frac{u_{n+1}}{u_n} \) à 1**  

    1. Si tous les termes de la suite sont strictement positifs, on calcule \( \frac{u_{n+1}}{u_n} \).  
    2. Si pour tout entier \( n \), \( \frac{u_{n+1}}{u_n} > 1 \), alors \( u_{n+1} > u_n \). Donc \( (u_n) \) est croissante.  
    3. Si pour tout entier \( n \), \( \frac{u_{n+1}}{u_n} < 1 \), alors \( u_{n+1} < u_n \). Donc \( (u_n) \) est décroissante.  
    <span style="color: gray;">Ici,  on a \( \frac{u_{n+1}}{u_n} = \frac{1}{n+1} \times \frac{n}{1} = \frac{n}{n+1} < 1 \).  
    Donc \( \frac{u_{n+1}}{u_n} < 1 \iff u_{n+1} < u_n \iff (u_n) \) est décroissante.</span>  

    **Méthode 3 - Variation de la fonction**  

    1. Si la suite est définie explicitement, on étudie le sens de variation de la fonction \( f \) telle que \( u_n = f(n) \).  
    <span style="color: gray;">Ici, \( f : x \mapsto \tfrac{1}{x} \) est une fonction strictement décroissante sur \( ]0,+\infty[ \).  
    Donc \( (u_n) \) est strictement décroissante.</span>



## S'entrainer !

#### Etudier le sens de variation d'une suite définie de façon explicite

<iframe src="https://coopmaths.fr/alea/?uuid=f3e42&id=1AL12-20&n=5&d=10&s=4&cd=1&v=eleve&es=3211001&title=Etudier+le+sens+de+variation+d%27une+suite+d%C3%A9finie+de+fa%C3%A7on+explicite" class="exerciseur" allowfullscreen></iframe>

#### Etudier le sens de variation d'une suite définie par récurrence 

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e6265f14cb0f22272e13461dc21396139a0f2717ea0f1d17e612c72d0a145726f117e60f2f181a2a762e5e0f1e2d0a13ff133612d1132b2d9a2d9d27921b492df9294a2c942a76112027c32cf827561123263729462d9a2bab11110e8714c715d22b3e11202dfe2d9611110e8714d813f2139e197e28222b4227802c022c942c8e139e1a400e8714d616882e072cce2b3c2780" class="exerciseur" allowfullscreen></iframe>



