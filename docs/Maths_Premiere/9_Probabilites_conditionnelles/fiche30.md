---
title: Déterminer si deux événements sont indépendants
weight: 4
---

# Déterminer si deux événements sont indépendants

## Comment faire ?

!!! methode "Comment déterminer si deux événements sont indépendants ?"
    On tire au hasard une carte dans un jeu de 32 cartes.

    **Méthode 1 - Avec la définition**

    1. **On détermine la probabilité des événements $A$ et $B$.**  
       L’événement $\textcolor{gray}{A}$ "la carte tirée est un as" a pour probabilité :  $\textcolor{gray}{\mathbb{P}(A) = \dfrac{4}{32} = \dfrac{1}{8}}$.  
       L’événement $\textcolor{gray}{B}$ "la carte tirée est un cœur" a pour probabilité :  $\textcolor{gray}{\mathbb{P}(B) = \dfrac{8}{32} = \dfrac{1}{4}}$.

    2. **On détermine la probabilité de leur intersection.**  
       L’événement $\textcolor{gray}{A \cap B}$ est "la carte tirée est l’as de cœur", de probabilité : $\textcolor{gray}{\dfrac{1}{32}}$.

    3. **Si $\mathbb{P}(A \cap B) = \mathbb{P}(A) \times \mathbb{P}(B)$, les événements sont indépendants.**  
       On a $\textcolor{gray}{\mathbb{P}(A) \times \mathbb{P}(B) = \mathbb{P}(A \cap B)}$.  
       $\textcolor{gray}{A}$ et $\textcolor{gray}{B}$ sont donc, par définition, indépendants.

    **Méthode 2 - Avec la propriété**

    1. **On calcule $\mathbb{P}_B(A)$ (ou $\mathbb{P}_A(B)$)** :   
       Ici, on a : $\textcolor{gray}{\mathbb{P}_B(A) = \dfrac{1}{8}}$.

    2. **On calcule $\mathbb{P}(A)$ (ou $\mathbb{P}(B)$)** :   
       De même, $\textcolor{gray}{\mathbb{P}(A) = \dfrac{1}{8}}$.

    3. **Si $\mathbb{P}_A(B) = \mathbb{P}(B)$ (ou $\mathbb{P}_B(A) = \mathbb{P}(A)$), les événements sont indépendants**.   
       On remarque ici que l'égalité est vérifiée. Les évènements sont donc indépendants. 

## S'entrainer !

#### Vérifier si deux évènements sont indépendants

!!! example "Aucun exerciseur disponible"
      Pour le moment, aucun exerciseur n’est disponible pour travailler ces compétences. Le site sera mis à jour dès qu’une ressource sera disponible.

#### Calculer une probabilité avec des évènements indépendants

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181b1431133b0f22272e26ee2b0a1f5212c72b1614bb272e13350f1c272e132b2e3627c127cb277b27c817e81336133512d10f2d29592a7617f8263127022a762c942e0327802c132b9f2627295129590e8714d813f2139e197e110e2e5e26b827562cf80e8714d813f2139e197e2e1e139e1a400e8714d6162f27c227c32da411162b3d0e8714d813f2139e197e2c062b3d26332da4" class="exerciseur" allowfullscreen></iframe>