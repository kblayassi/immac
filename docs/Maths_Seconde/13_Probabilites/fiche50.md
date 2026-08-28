---
title: Utiliser la réunion, l'intersection et le contraire
weight: 3
---

# Utiliser la réunion, l'intersection et le contraire

## Comment faire ?

!!! methode "Comment calculer la probabilité d'une réunion ou d'un contraire ?"
    On lance un dé équilibré numéroté de \( 1 \) à \( 6 \). Soient \( A \) : « obtenir un résultat pair » et \( B \) : « obtenir un résultat inférieur ou égal à \( 4 \) ».

    **Méthode 1 — la probabilité d'une réunion**

    1. **On calcule séparément \( P(A) \), \( P(B) \) et \( P(A\cap B) \)** (fiche 49).  
        \( \textcolor{gray}{A=\{2\,;4\,;6\}} \), \( \textcolor{gray}{B=\{1\,;2\,;3\,;4\}} \) et \( \textcolor{gray}{A\cap B=\{2\,;4\}} \), donc  
        \( \textcolor{gray}{P(A)=\dfrac{3}{6}} \)  ·  \( \textcolor{gray}{P(B)=\dfrac{4}{6}} \)  ·  \( \textcolor{gray}{P(A\cap B)=\dfrac{2}{6}} \)

    2. **On applique \( P(A\cup B)=P(A)+P(B)-P(A\cap B) \).**  
        \( \textcolor{gray}{P(A\cup B)=\dfrac{3}{6}+\dfrac{4}{6}-\dfrac{2}{6}=\dfrac{5}{6}} \).

    **Méthode 2 — la probabilité d'un contraire**

    1. **On repère l'événement dont on cherche le contraire**, puis on applique \( P(\overline{B})=1-P(B) \).  
        « Ne pas obtenir un résultat inférieur ou égal à \( \textcolor{gray}{4} \) » est l'événement \( \textcolor{gray}{\overline{B}} \), donc  
        \( \textcolor{gray}{P(\overline{B})=1-P(B)=1-\dfrac{4}{6}=\dfrac{2}{6}=\dfrac{1}{3}} \).
