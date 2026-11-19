---
title: TD2 - Integer Overflow
weight: 2.5 
---

# Integer Overflow

Dans une usine, sur une machine qui fabrique en moyenne 200 pièces par jour, un compteur stocké sur un octet affiche le nombre de pièces produites. Quand un technicien récupère les pièces fabriquées, il vérifie que le nombre est conforme, puis appuie sur un bouton pour remettre le compteur à zéro. Un jour, le compteur affiche 21 alors que 277 pièces ont été produites. Il appelle le numéro d'assistance pour signaler que le compteur ne fonctionne plus. On lui répond que c'est normal et qu'une mise à jour sera effectuée prochainement pour corriger ce défaut. Essayons d'expliquer ce qui est arrivé !

## Premières vérifications

1. Vérifier que l'écriture binaire de $277_{10}$ est $1 0001 0101_2$.

    ??? success "Correction"
        On décompose $277$ en somme de puissances de 2 :

        $$277 = 256 + 16 + 4 + 1 = 2^8 + 2^4 + 2^2 + 2^0$$

        | $2^8$ | $2^7$ | $2^6$ | $2^5$ | $2^4$ | $2^3$ | $2^2$ | $2^1$ | $2^0$ |
        |:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
        |   1   |   0   |   0   |   0   |   1   |   0   |   1   |   0   |   1   |

        Donc $277_{10} = 1\,0001\,0101_2$.

        On peut aussi le vérifier par divisions successives par 2 :
        $277 = 2 \times 138 + \mathbf{1}$, $138 = 2 \times 69 + \mathbf{0}$, $69 = 2 \times 34 + \mathbf{1}$,
        $34 = 2 \times 17 + \mathbf{0}$, $17 = 2 \times 8 + \mathbf{1}$, $8 = 2 \times 4 + \mathbf{0}$,
        $4 = 2 \times 2 + \mathbf{0}$, $2 = 2 \times 1 + \mathbf{0}$, $1 = 2 \times 0 + \mathbf{1}$.
        En lisant les restes de bas en haut : $1\,0001\,0101_2$.

2. Sachant qu'un octet est composé de 8 bits, compléter un octet avec le nombre binaire obtenu. Que remarquez-vous ?

    | ... | ... | ... | ... | ... | ... | ... | ... |

    ??? success "Correction"
        Le nombre $1\,0001\,0101_2$ s'écrit avec **9 bits**, mais un octet ne contient que **8 cases** :

        | en trop | bit 8 | bit 7 | bit 6 | bit 5 | bit 4 | bit 3 | bit 2 | bit 1 |
        |:-------:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
        |  **1**  |   0   |   0   |   0   |   1   |   0   |   1   |   0   |   1   |

        Il y a **un bit de trop** : le nombre $277$ ne rentre pas dans un octet.

3. Pour stocker 1 0001 0101, sur un octet, seuls les 8 derniers bits sont conservés. Quel sera alors l'affichage du compteur ? Comment pourrait-on améliorer ce compteur ?
Combien de bits faut-il pour représenter un nombre entier en binaire ?

    ??? success "Correction"
        - On ne garde que les 8 derniers bits : le bit de gauche ($2^8 = 256$) est perdu et il reste
          $0001\,0101_2 = 16 + 4 + 1 = 21$. Le compteur affiche donc **21**, soit $277 - 256$ :
          après 255, il est revenu à 0 et a continué à compter.
        - Pour améliorer le compteur, il faut le stocker sur **plus de bits**, par exemple sur
          **2 octets** (16 bits) : il pourrait alors compter jusqu'à $65\,535$. On pourrait aussi
          détecter le dépassement pour prévenir le technicien plutôt que d'afficher une valeur fausse.
        - Le nombre de bits nécessaires dépend de la taille de l'entier : il faut $n$ bits
          lorsque $2^{n-1} \leq N < 2^n$. Plus l'entier est grand, plus il faut de bits.

!!! info "Integer Overflow" 
    Un dépassement d'entier (integer overflow) se produit lorsqu'une opération mathématique conduit à une valeur numérique supérieure à celle représentable dans l'espace de stockage disponible.

## Combien de bits faut-il ?

Pour évaluer le nombre de bits minimum nécessaires à l'écriture en base 2 d'un entier positif, il faut trouver la plus petite puissance de 2 qui soit strictement supérieure à l'entier à écrire.

Exemple : comme $2^8 = 256$ et $2^9 = 512$, $2^8 \leq 277 < 2^9$ donc 9 bits sont nécessaires pour écrire 277.

1. Combien de bits sont nécessaires pour stocker les entiers $1 047$ et $65 512$ ?

    ??? success "Correction"
        - $2^{10} = 1\,024$ et $2^{11} = 2\,048$, donc $2^{10} \leq 1\,047 < 2^{11}$ : il faut **11 bits**.
          (Vérification : $1\,047 = 1\,024 + 16 + 4 + 2 + 1 = 100\,0001\,0111_2$.)
        - $2^{15} = 32\,768$ et $2^{16} = 65\,536$, donc $2^{15} \leq 65\,512 < 2^{16}$ : il faut **16 bits**,
          soit exactement 2 octets.

2. Remplir le tableau suivant avec les tailles fréquentes des entiers en binaire et la généralisation. 

    | Nombre d'octet utilisés                          |     1    |      2     |      4     |      8     |      n     |
    |--------------------------------------------------|:--------:|:----------:|:----------:|:----------:|:----------:|
    | Nombre de bits utilisés                          |     8    | .......... | .......... | .......... | .......... |
    | Nombres d'entiers positifs que l'on peut stocker |   $2^8$  | .......... | .......... | .......... | .......... |
    | Plus grand entier positif que l'on peut stocker  | $2^8 -1$ | .......... | .......... | .......... | .......... |

    ??? success "Correction"
        | Nombre d'octets utilisés                         |     1    |      2      |      4      |      8      |      n       |
        |--------------------------------------------------|:--------:|:-----------:|:-----------:|:-----------:|:------------:|
        | Nombre de bits utilisés                          |     8    |      16     |      32     |      64     |     $8n$     |
        | Nombres d'entiers positifs que l'on peut stocker |   $2^8$  |   $2^{16}$  |   $2^{32}$  |   $2^{64}$  |   $2^{8n}$   |
        | Plus grand entier positif que l'on peut stocker  | $2^8 -1$ | $2^{16}-1$  | $2^{32}-1$  | $2^{64}-1$  | $2^{8n}-1$   |

        Valeurs numériques :

        - 1 octet : de $0$ à $255$ ;
        - 2 octets : de $0$ à $65\,535$ ;
        - 4 octets : de $0$ à $4\,294\,967\,295$ (environ 4 milliards) ;
        - 8 octets : de $0$ à $18\,446\,744\,073\,709\,551\,615$ (environ $1{,}8 \times 10^{19}$).

        On stocke $2^{8n}$ entiers différents ; comme on commence à compter à $0$,
        le plus grand vaut $2^{8n} - 1$.

3. Quelle est la valeur maximale représentable sur le compteur de la machine ?

    ??? success "Correction"
        Le compteur est stocké sur 1 octet : sa valeur maximale est $2^8 - 1 = 255 = 1111\,1111_2$.
        La machine produit **en moyenne** 200 pièces par jour : un jour plus productif que la moyenne
        (ici 277 pièces) suffit à provoquer un dépassement.

## Et pour la somme de deux entiers naturels ?

1. En utilisant les deux plus grands nombres entiers représentables sur 8 bits, déterminer le nombre de bits nécessaires pour représenter leur somme.

    ??? success "Correction"
        Les deux plus grands entiers représentables sur 8 bits sont $255$ et $254$
        (ou $255$ et $255$ si l'on s'autorise à prendre deux fois le même) :

        $$255 + 254 = 509 \qquad 255 + 255 = 510$$

        Comme $2^8 = 256 \leq 509 < 510 < 512 = 2^9$, il faut **9 bits** dans les deux cas.

        En binaire :

        ```
            1111 1111       (255)
          + 1111 1111       (255)
          -----------
          1 1111 1110       (510)
        ```

        La dernière retenue « déborde » sur un 9ᵉ bit. Sur un octet, elle serait perdue et le résultat
        affiché serait $1111\,1110_2 = 254$ : c'est encore un *integer overflow*.

        **Généralisation** : si $a$ et $b$ s'écrivent sur $n$ bits, alors $a + b \leq 2 \times (2^n - 1) = 2^{n+1} - 2 < 2^{n+1}$.
        La somme de deux entiers naturels de $n$ bits s'écrit donc sur **au plus $n + 1$ bits** :
        un seul bit supplémentaire suffit toujours.
