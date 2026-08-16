---
title: TD2 - Integer Overflow
weight: 2.5 
---

# Integer Overflow

Dans une usine, sur une machine qui fabrique en moyenne 200 pièces par jour, un compteur stocké sur un octet affiche le nombre de pièces produites. Quand un technicien récupère les pièces fabriquées, il vérifie que le nombre est conforme, puis appuie sur un bouton pour remettre le compteur à zéro. Un jour, le compteur affiche 21 alors que 277 pièces ont été produites. Il appelle le numéro d'assistance pour signaler que le compteur ne fonctionne plus. On lui répond que c'est normal et qu'une mise à jour sera effectuée prochainement pour corriger ce défaut. Essayons d'expliquer ce qui est arrivé !

## Premières vérifications

1. Vérifier que l'écriture binaire de $277_{10}$ est $1 0001 0101_2$.

2. Sachant qu'un octet est composé de 8 bits, compléter un octet avec le nombre binaire obtenu. Que remarquez-vous ?

    | ... | ... | ... | ... | ... | ... | ... | ... |

3. Pour stocker 1 0001 0101, sur un octet, seuls les 8 derniers bits sont conservés. Quel sera alors l'affichage du compteur ? Comment pourrait-on améliorer ce compteur ?
Combien de bits faut-il pour représenter un nombre entier en binaire ?

!!! info "Integer Overflow" 
    Un dépassement d'entier (integer overflow) se produit lorsqu'une opération mathématique conduit à une valeur numérique supérieure à celle représentable dans l'espace de stockage disponible.

## Combien de bits faut-il ?

Pour évaluer le nombre de bits minimum nécessaires à l'écriture en base 2 d'un entier positif, il faut trouver la plus petite puissance de 2 qui soit strictement supérieure à l'entier à écrire.

Exemple : comme $2^8 = 256$ et $2^9 = 512$, $2^7 \leq 277 < 2^9$ donc 9 bits sont nécessaires pour écrire 277.

1. Combien de bits sont nécessaires pour stocker les entiers $1 047$ et $65 512$ ?

2. Remplir le tableau suivant avec les tailles fréquentes des entiers en binaire et la généralisation. 

    | Nombre d'octet utilisés                          |     1    |      2     |      4     |      8     |      n     |
    |--------------------------------------------------|:--------:|:----------:|:----------:|:----------:|:----------:|
    | Nombre de bits utilisés                          |     8    | .......... | .......... | .......... | .......... |
    | Nombres d'entiers positifs que l'on peut stocker |   $2^8$  | .......... | .......... | .......... | .......... |
    | Plus grand entier positif que l'on peut stocker  | $2^8 -1$ | .......... | .......... | .......... | .......... |

3. Quelle est la valeur maximale représentable sur le compteur de la machine ?

## Et pour la somme de deux entiers naturels ?

1. En utilisant les deux plus grands nombres entiers représentables sur 8 bits, déterminer le nombre de bits nécessaires pour représenter leur somme. 