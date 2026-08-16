---
title: Utiliser la formule des probabilités totales
weight: 3
---

# Utiliser la formule des probabilités totales

## Comment faire ?

!!! methode "Comment utiliser la formule des probabilités totales ?"
    On considère l’arbre ci-contre. On cherche à calculer $\mathbb{P}(D)$.

    1. **On vérifie que les événements du premier nœud forment bien une partition de l’univers.**  
       Ici, $\textcolor{gray}{A, B}$ et $\textcolor{gray}{C}$ sont bien incompatibles puisqu’ils ne peuvent pas se réaliser simultanément et  
       $\textcolor{gray}{\mathbb{P}(A) + \mathbb{P}(B) + \mathbb{P}(C) = 1}$, donc ils forment bien une partition de l’univers.

    2. **On écrit la formule des probabilités totales.**  
       Ici, $\textcolor{gray}{\mathbb{P}(D) = \mathbb{P}(A \cap D) + \mathbb{P}(B \cap D) + \mathbb{P}(C \cap D)}$.

    3. **On effectue les calculs en détaillant les intersections.**  
       Donc,  $\textcolor{gray}{\mathbb{P}(D) = \mathbb{P}(A) \times \mathbb{P}_A(D) + \mathbb{P}(B) \times \mathbb{P}_B(D) + \mathbb{P}(C) \times \mathbb{P}_C(D) = 0{,}1 \times 0{,}2 + 0{,}5 \times 0{,}7 + 0{,}4 \times 0{,}1 = 0{,}41}$.

    4. **On conclut.**  
       La probabilité de l’événement $\textcolor{gray}{D}$ est de $\textcolor{gray}{0{,}41}$.

## S'entrainer !

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a2949181a278915950f22272e26ee2b0a1f5114bb2b1614bb272e13350f2c18292cde277b2922132b26f117e60f2f181a2a762e5e0f1e2d0a13fe133612d112c72d9a2d9d279221892951295827c7111925f028282cd62e01278027562cf82c132b9f2627295129590e8714d813f2139e197e2cf82da02d922a760073" class="exerciseur" allowfullscreen></iframe>