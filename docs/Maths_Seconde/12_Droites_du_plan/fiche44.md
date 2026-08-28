---
title: Déterminer une équation cartésienne de droite
weight: 2
---

# Déterminer une équation cartésienne de droite

## Comment faire ?

!!! methode "Comment déterminer une équation cartésienne de droite ?"
    \( \textcolor{gray}{d} \) est la droite passant par \( \textcolor{gray}{A(1\,;3)} \) et de vecteur directeur \( \textcolor{gray}{\vec{u}\begin{pmatrix}2\\5\end{pmatrix}} \).

    1. **On se donne un point courant \( M(x\,;y) \)** et on écrit la condition d'appartenance : \( M\in d \) signifie que \( \vec{AM} \) et \( \vec{u} \) sont **colinéaires**.  
        \( \textcolor{gray}{\vec{AM}\begin{pmatrix}x-1\\y-3\end{pmatrix}} \) doit être colinéaire à \( \textcolor{gray}{\vec{u}\begin{pmatrix}2\\5\end{pmatrix}} \).

    2. **On traduit la colinéarité par un déterminant nul** (fiche 40).  
        \( \textcolor{gray}{\det(\vec{AM}\,;\vec{u})=0 \Leftrightarrow \begin{vmatrix}x-1 & 2\\y-3 & 5\end{vmatrix}=0 \Leftrightarrow 5(x-1)-2(y-3)=0} \)

    3. **On développe** et on ramène tout du même côté.  
        \( \textcolor{gray}{5x-5-2y+6=0 \Leftrightarrow 5x-2y+1=0} \)

    4. **On conclut :** c'est une équation **de la forme** \( ax+by+c=0 \).  
        Une équation cartésienne de \( \textcolor{gray}{d} \) est \( \textcolor{gray}{5x-2y+1=0} \).

!!! methode "Comment vérifier qu'un point appartient à une droite ?"
    On reprend la droite \( \textcolor{gray}{d} \) ci-dessus, d'équation \( \textcolor{gray}{5x-2y+1=0} \), qui passe par \( \textcolor{gray}{A(1\,;3)} \) et a pour vecteur directeur \( \textcolor{gray}{\vec{u}\begin{pmatrix}2\\5\end{pmatrix}} \).

    **Méthode 1 — avec une équation de la droite**

    1. **On remplace \( x \) et \( y \)** dans l'équation par les coordonnées du point testé.  
        Pour \( \textcolor{gray}{C(1\,;3)} \) : \( \textcolor{gray}{5\times 1-2\times 3+1=5-6+1=0} \).  ·  Pour \( \textcolor{gray}{D(0\,;0)} \) : \( \textcolor{gray}{0-0+1=1} \).

    2. **Si l'égalité est vérifiée, le point appartient à la droite** ; sinon, il n'y appartient pas.  
        \( \textcolor{gray}{C} \) appartient à \( \textcolor{gray}{d} \), car on obtient bien \( \textcolor{gray}{0} \) ; \( \textcolor{gray}{D} \) n'y appartient pas, car \( \textcolor{gray}{1\neq 0} \).

    **Méthode 2 — avec un point et un vecteur directeur**

    1. **On calcule les coordonnées du vecteur** allant du point connu au point testé (fiche 37).  
        Le point \( \textcolor{gray}{M(-2\,;3)} \) donne \( \textcolor{gray}{\vec{AM}\begin{pmatrix}-2-1\\3-3\end{pmatrix}\Leftrightarrow\vec{AM}\begin{pmatrix}-3\\0\end{pmatrix}} \).

    2. **On teste la colinéarité** de ce vecteur avec \( \vec{u} \) par le déterminant, puis on conclut (fiche 40).  
        \( \textcolor{gray}{\begin{vmatrix}-3 & 2\\0 & 5\end{vmatrix}=-3\times 5-0\times 2=-15\neq 0} \) : \( \textcolor{gray}{M} \) n'appartient pas à \( \textcolor{gray}{d} \).
