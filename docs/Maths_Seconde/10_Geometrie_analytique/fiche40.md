---
title: Démontrer que deux vecteurs sont colinéaires avec le déterminant
weight: 4
---

# Démontrer que deux vecteurs sont colinéaires avec le déterminant

## Comment faire ?

!!! methode "Comment tester la colinéarité de deux vecteurs ?"
    Dans un repère, \( \textcolor{gray}{\vec{u}\begin{pmatrix}2\\-1\end{pmatrix}} \) et \( \textcolor{gray}{\vec{v}\begin{pmatrix}-3\\4\end{pmatrix}} \).

    1. **On calcule le déterminant :** produit de la diagonale descendante, moins produit de la diagonale montante.  
        \( \textcolor{gray}{\det(\vec{u}\,;\vec{v})=\begin{vmatrix}2 & -3\\-1 & 4\end{vmatrix}=2\times 4-(-1)\times(-3)=8-3=5} \)

    2. **On conclut :** les vecteurs sont colinéaires **si, et seulement si, le déterminant est nul**.  
        \( \textcolor{gray}{5\neq 0} \) : les vecteurs \( \textcolor{gray}{\vec{u}} \) et \( \textcolor{gray}{\vec{v}} \) ne sont pas colinéaires.

!!! methode "Comment démontrer un alignement ou un parallélisme ?"
    Dans un repère, \( \textcolor{gray}{A(-2\,;-3)} \), \( \textcolor{gray}{B(6\,;1)} \), \( \textcolor{gray}{C(-4\,;1)} \), \( \textcolor{gray}{D(2\,;4)} \) et \( \textcolor{gray}{E(2\,;-2)} \). Les droites \( \textcolor{gray}{(AB)} \) et \( \textcolor{gray}{(CD)} \) sont-elles parallèles ? Les points \( \textcolor{gray}{A} \), \( \textcolor{gray}{B} \) et \( \textcolor{gray}{E} \) sont-ils alignés ?

    1. **On choisit deux vecteurs adaptés à la question.**  
        Parallélisme : \( \textcolor{gray}{\vec{AB}} \) et \( \textcolor{gray}{\vec{CD}} \).  ·  Alignement : \( \textcolor{gray}{\vec{AB}} \) et \( \textcolor{gray}{\vec{AE}} \).

    2. **On calcule leurs coordonnées** (fiche 37).  
        \( \textcolor{gray}{\vec{AB}\begin{pmatrix}6-(-2)\\1-(-3)\end{pmatrix}\Leftrightarrow\vec{AB}\begin{pmatrix}8\\4\end{pmatrix}} \), \( \textcolor{gray}{\vec{CD}\begin{pmatrix}6\\3\end{pmatrix}} \) et \( \textcolor{gray}{\vec{AE}\begin{pmatrix}4\\1\end{pmatrix}} \).

    3. **On calcule le déterminant**, puis on **conclut avec la phrase attendue**.  
        \( \textcolor{gray}{\det(\vec{AB}\,;\vec{CD})=\begin{vmatrix}8 & 6\\4 & 3\end{vmatrix}=8\times 3-4\times 6=0} \) : les droites \( \textcolor{gray}{(AB)} \) et \( \textcolor{gray}{(CD)} \) sont parallèles.  
        \( \textcolor{gray}{\det(\vec{AB}\,;\vec{AE})=\begin{vmatrix}8 & 4\\4 & 1\end{vmatrix}=8\times 1-4\times 4=-8\neq 0} \) : les points \( \textcolor{gray}{A} \), \( \textcolor{gray}{B} \) et \( \textcolor{gray}{E} \) ne sont pas alignés.


## S'entrainer !

#### Déterminer le déterminant de deux vecteurs

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917ed149626260f22272e26ee2b0b1bce14bb2b1614bb272e13350f2a26fa17e50f2217e60f1c272e132b2d9a2bde12c72e3627c127cb277b27c817e81336133512d10031" class="exerciseur" allowfullscreen></iframe>
