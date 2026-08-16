---
title: Calculer une espérance, une variance et un écart-type
weight: 3
---

# Calculer une espérance, une variance et un écart-type

## Comment faire ?

!!! methode "Comment calculer une espérance, une variance et un écart-type ?"
    On considère la variable aléatoire $\textcolor{gray}{X}$ de la fiche 48 dont la loi de probabilité est donnée par le tableau ci-dessous :

    | $x_i$ | $-3$ | $9$ |
    |:---:|:---:|:---:|
    | $P(X = x_i)$ | $\dfrac{5}{6}$ | $\dfrac{1}{6}$ |

    **Méthode 1 - Calcul de l'espérance**

    1. **On fait la somme des produits de chaque valeur avec sa probabilité.**  
       On a $\textcolor{gray}{\mathbb{E}[X] = (-3) \times \dfrac{5}{6} + 9 \times \dfrac{1}{6} = -1}$

    2. **On conclut dans le contexte du problème.**  
       En effectuant un grand nombre de parties, le gain moyen sera de -1€.

    **Méthode 2 - Calcul de la variance et de l'écart-type**

    1. **On commence par calculer l'espérance :** Ici, $\textcolor{gray}{\mathbb{E}[X] = -1}$.

    2. **On utilise la formule pour calculer la variance.**  
       Ici, $\textcolor{gray}{\mathbb{V}[X] = \dfrac{5}{6}(-3-(-1))^2 + \dfrac{1}{6}(9-(-1))^2 = 20}$

    3. **On calcule l'écart-type en prenant la racine carrée de la variance.**  
       Ici, $\textcolor{gray}{\sigma(X) = \sqrt{\mathbb{V}[X]} = \sqrt{20} \approx 4,47}$

    4. **On conclut dans le contexte.**  
       Un joueur peut donc espérer obtenir un gain moyen d'environ -1€ avec une fluctuation importante d'environ 4,47€.

## S'entrainer !

!!! example "Aucun exerciseur disponible"
      Pour le moment, aucun exerciseur n’est disponible pour travailler ces compétences. Le site sera mis à jour dès qu’une ressource sera disponible.