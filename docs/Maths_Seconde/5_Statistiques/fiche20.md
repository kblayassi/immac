---
title: Déterminer la médiane et les quartiles d'une série
weight: 3
---

# Déterminer la médiane et les quartiles d'une série

## Comment faire ?

!!! methode "Comment déterminer la médiane et les quartiles ?"
    On traitera les \( \textcolor{gray}{10} \) notes suivantes : \( \textcolor{gray}{12\ ;\ 8\ ;\ 15\ ;\ 8\ ;\ 12\ ;\ 17\ ;\ 12\ ;\ 8\ ;\ 15\ ;\ 20} \).

    1. **On range les valeurs dans l'ordre croissant.**  
        \( \textcolor{gray}{8\ ;\ 8\ ;\ 8\ ;\ 12\ ;\ 12\ ;\ 12\ ;\ 15\ ;\ 15\ ;\ 17\ ;\ 20} \)

    2. **On les regroupe dans un tableau d'effectifs**, puis on complète la ligne des **effectifs cumulés croissants** (ECC) : à chaque colonne, on ajoute l'effectif au cumul précédent.

        | Valeur | 8 | 12 | 15 | 17 | 20 |
        |:--|:-:|:-:|:-:|:-:|:-:|
        | **Effectif** | 3 | 3 | 2 | 1 | 1 |
        | **ECC** | 3 | 6 | 8 | 9 | 10 |

    3. **On calcule le rang de la valeur cherchée.**  
        \( \textcolor{gray}{Me} \) : \( \textcolor{gray}{N} \) est pair, on prend les rangs \( \textcolor{gray}{\dfrac{N}{2}=5} \) et \( \textcolor{gray}{\dfrac{N}{2}+1=6} \), et on fera leur moyenne.  
        \( \textcolor{gray}{Q_1} \) : plus petit entier \( \textcolor{gray}{\geqslant\dfrac{N}{4}=2{,}5} \), soit le rang \( \textcolor{gray}{3} \).  
        \( \textcolor{gray}{Q_3} \) : plus petit entier \( \textcolor{gray}{\geqslant\dfrac{3N}{4}=7{,}5} \), soit le rang \( \textcolor{gray}{8} \).

    4. **On lit la valeur de ce rang sur la ligne des ECC :** c'est la première colonne dont l'ECC atteint le rang.  
        Rangs \( \textcolor{gray}{5} \) et \( \textcolor{gray}{6} \) : ECC \( \textcolor{gray}{6} \), donc la valeur \( \textcolor{gray}{12} \) les deux fois, d'où \( \textcolor{gray}{Me=\dfrac{12+12}{2}=12} \).  
        Rang \( \textcolor{gray}{3} \) : ECC \( \textcolor{gray}{3} \), donc \( \textcolor{gray}{Q_1=8} \).  ·  Rang \( \textcolor{gray}{8} \) : ECC \( \textcolor{gray}{8} \), donc \( \textcolor{gray}{Q_3=15} \).


## S'entrainer !

#### Déterminer une médiane

<iframe src="https://coopmaths.fr/alea/?EEEE2e0a294917e9268c14050f22272e13bc139911a70f2717ea0f1d17e612c72d0a132b26f117e60f2f181a2a762e5e0f1e2d0a13fe133612d112c72d9a2d9d27921a96139e139e1a400e8714c714d6169927c72ade2b3e2c8e139e139e13992e03277a139e139e13992a9a139e139e1a400e8714c714d6168929462b3e" class="exerciseur" allowfullscreen></iframe>
