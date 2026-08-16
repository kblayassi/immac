---
title: Exercices
weight: 6
---

# Exercices 

Vous trouverez ci-dessous les exercices de cette séquence.

- Les exercices marqués avec :fontawesome-solid-pencil: se réalisent **sans ordinateur**.  
  Ceux indiqués par :fontawesome-solid-laptop: nécessitent **un ordinateur**.

- Le **niveau de difficulté** est indiqué par des étoiles :  
    <ul style="list-style: none;">
        <li>:fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star: → Exercices pour **s'approprier les notions**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star: → Exercices pour **renforcer vos compétences**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star: → Exercices pour vous **challenger** et tester vos acquis.</li>
    </ul>

Les corrections sont généralement disponibles, mais elles ne doivent être consultées **qu'après validation de votre production par l'enseignant**.

---

## Théorie sur les bases

!!! exopapier "Exercice 1 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la base $7$. Citer tous les chiffres de cette base.

    ??? success "Correction"
        0, 1, 2, 3, 4, 5, 6

!!! exopapier "Exercice 2 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Quel est le chiffre le plus grand utilisé en base $8$ ?

    ??? success "Correction"
        7

!!! exopapier "Exercice 3 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Donner la valeur du chiffre $5$ dans le nombre $452_{10}$.

    ??? success "Correction"
        Il est à la position des dizaines, donc $5 \times 10^1 = 50$.

!!! exopapier "Exercice 4 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Donner un exemple de chiffre utilisé en base 16 mais pas en base 10.

    ??? success "Correction"
        A, B, C, D, E ou F


!!! exopapier "Exercice 5 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Combien de nombres binaires peut-on représenter avec :
    
    1. $6$ bits ?  
    2. $5$ bits ?

    ??? success "Correction"
        1. $2^6 = 64$ nombres, de $0$ à $63$  
        2. $2^5 = 32$ nombres, de $0$ à $31$

!!! exopapier "Exercice 6 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Pourquoi la base 2 est-elle utilisée dans les ordinateurs ? Expliquer en une phrase.

    ??? success "Correction"
        Parce que les ordinateurs ne reconnaissent que deux états : allumé/éteint, donc 1 ou 0.

!!! exopapier "Exercice 7 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    En base 16, quelles sont les valeurs décimales des lettres A à F ?

    ??? success "Correction"
        A = 10, B = 11, C = 12, D = 13, E = 14, F = 15

!!! exopapier "Exercice 8 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Dans quelles bases les nombres suivants sont-ils valides ? $239$, $1AF$, $305$.

    ??? success "Correction"
        - 239 : base ≥ 10 (car le "plus grand" chiffre est 9) 
        - 1AF : base ≥ 16  (car le "plus grand" chiffre est F = $15_{10}$) 
        - 305 : base ≥ 6 (car le "plus grand" chiffre est 5) 


!!! exopapier "Exercice 9 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Combien de nombres différents peut-on représenter avec 4 chiffres en base 4 ?

    ??? success "Correction"
        $4^4 = 256$ nombres (de $0000_4$ à $3333_4$)

!!! exopapier "Exercice 10 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Un élève écrit $538_6$. Est-ce valide ? Justifie ta réponse.

    ??? success "Correction"
        Non, car 8 n’est pas un chiffre valide en base 6 (chiffres possibles : 0 à 5).

!!! exopapier "Exercice 11 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Robin a vu que les paquets IP sont munis d'un champ appelé TTL (Time To Live), que l'on peut traduire par « reste à vivre ». Ce champ est initialisé par l'émetteur à 255 en général et chaque routeur traversé décrémente ce champ de 1 jusqu'à la valeur 0, ce qui entraînera la suppression du paquet IP. Robin se demande si la valeur d'initialisation du champ TTL a un lien avec la représentation des entiers en machine.

    1. Combien de bits sont nécessaires pour stocker le champs TTL ?

    2. $255_{10}$ est-elle la valeur maximale stockable sur ce nombre de bits ? 

    ??? success "Correction"

        1. Pour représenter $255_{10}$, il faut trouver le plus petit $n$ tel que $2^n > 255$ : 
         
            - $2^7 = 128$  
            - $2^8 = 256$

            Il faut donc 8 bits

        2. Oui, $255_{10} = 11111111_{2}$ est la **valeur maximale** stockable sur **8 bits** pour un entier **naturel**.  
        C’est donc cohérent avec l’usage machine.

!!! exopapier "Exercice 12 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Le nombre de lignes d'un fichier de l'ancienne version d'un tableur très connu était limité à 65 535.

    Combien de bits étaient nécessaires pour stocker le numéro de ligne ? Et combien d'octet ?

    ??? success "Correction"

        On cherche le plus petit $n$ tel que $2^n > 65\,535$ :  
        - $2^{16} = 65\,536$  
        → Il faut **16 bits**

        ⚠️ 1 octet = 8 bits → $16 \div 8 = 2$

        ➤ Il fallait **16 bits** ou **2 octets** pour stocker un numéro de ligne.

!!! exopapier "Exercice 13 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Quel est le lien entre la base 16 et la base 2 ?

    ??? success "Correction"
        Chaque chiffre hexadécimal correspond à un groupe de 4 bits.

!!! exopapier "Exercice 14 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Une adresse IPv6 est composée de 8 champs de 4 valeurs hexadécimales, délimités par des « : » pour la rendre plus facile à lire pour l'humain. Par exemple, l'IPv6 de `facebook.com` est `2a03:2880: f145:82:face:b00c:face:b00c:0:25de`.

    Quel est le nombre de bits nécessaire pour écrire une adresse IPv6 en binaire ?

    ??? success "Correction"

        Chaque **chiffre hexadécimal** correspond à **4 bits**.

        Une adresse IPv6 est composée de **8 champs de 4 chiffres hexadécimaux**  
        → $8 \times 4 = 32$ chiffres hexadécimaux

        → $32 \times 4 = 128$ bits

        ➤ Une adresse IPv6 est donc codée sur **128 bits**

---

## Conversion d'un entier naturel vers la base 10

!!! exopapier "Exercice 15 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Convertir les nombres binaires suivants en base 10 :

    1. $11_2$  
    2. $1001_2$  
    3. $1101_2$
    4. $1010_2$  

    ??? success "Correction"
        1. $11_2 = 1 \times 2^1 + 1 \times 2^0 = 2 + 1 = 3$  
        2. $1001_2 = 1 \times 2^3 + 0 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 0 + 0 + 1 = 9$  
        3. $1101_2 = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13$
        4. $1010_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 0 \times 2^0 = 8 + 0 + 2 + 0 = 10$  

!!! exopapier "Exercice 16 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Convertir les nombres hexadécimaux suivants en base 10 :

    1. $7C_{16}$  
    2. $2F_{16}$
    3. $B4_{16}$

    ??? success "Correction"
        1. $7C_{16} = 7 \times 16^1 + 12 \times 16^0 = 112 + 12 = 124$  
        2. $2F_{16} = 2 \times 16^1 + 15 \times 16^0 = 32 + 15 = 47$
        3. $B4_{16} = 11 \times 16^1 + 4\times 16^0 = 176 + 4 = 180$

!!! exopapier "Exercice 17 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir les nombres binaires suivants en base 10 :

    1. $101010_2$
    2. $11100_2$

    ??? success "Correction"
        1. $101010_2 = 1\times 2^5 + 1\times 2^3 + 1\times 2^1 = 32 + 8 + 2 = 42$
        2. $11100_2 = 1 \times 2^4 + 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 0 \times 2^0 = 16 + 8 + 4 + 0 + 0 = 28$

!!! exopapier "Exercice 18 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir $ABCDE_{16}$ en base 10

    ??? success "Correction"
        $ABCDE_{16} = 10 \times 16^4 + 11 \times 16^3 + 12 \times 16^2 + 13 \times 16^1 + 14 = 703710_{10}$

!!! exopapier "Exercice 19 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir les nombres octaux suivants en base 10 :

    1. $72_8$  
    2. $135_8$  
    3. $47_8$

    ??? success "Correction"
        1. $72_8 = 7 \times 8^1 + 2 \times 8^0 = 56 + 2 = 58$  
        2. $135_8 = 1 \times 8^2 + 3 \times 8^1 + 5 \times 8^0 = 64 + 24 + 5 = 93$  
        3. $47_8 = 4 \times 8^1 + 7 \times 8^0 = 32 + 7 = 39$

!!! exopapier "Exercice 20 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Convertir les nombres suivants en base 10 :

    1. $34_5$
    2. $B4_{13}$

    ??? success "Correction"
        1. $34_5 = 3\times 5^1 + 4\times 5^0 = 15 + 4 = 19$
        2. $B4_{13} = 11 \times 13^1 + 4\times 13^0 = 143 + 4 = 147_{10}$

---

## Conversion d'un entier naturel depuis la base 10

!!! exopapier "Exercice 21 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Convertir les entiers décimaux suivants dans une autre base :

    1. $10_{10}$ en base 2  
    2. $12_{10}$ en base 8  
    3. $31_{10}$ en base 16

    ??? success "Correction"
        1. **$10_{10}$ en base 2** :

            | Étape | Division       | Quotient | Reste |
            |-------|----------------|----------|--------|
            | 1     | $10 ÷ 2$       | 5        | 0      |
            | 2     | $5 ÷ 2$        | 2        | 1      |
            | 3     | $2 ÷ 2$        | 1        | 0      |
            | 4     | $1 ÷ 2$        | 0        | 1      |

            Lecture des restes de bas en haut → **$1010_2$**

        2. **$12_{10}$ en base 8** :

            | Étape | Division       | Quotient | Reste |
            |-------|----------------|----------|--------|
            | 1     | $12 ÷ 8$       | 1        | 4      |
            | 2     | $1 ÷ 8$        | 0        | 1      |

            Lecture des restes de bas en haut → **$14_8$**

        3. **$31_{10}$ en base 16** :

            | Étape | Division       | Quotient | Reste |
            |-------|----------------|----------|--------|
            | 1     | $31 ÷ 16$      | 1        | 15 (F) |
            | 2     | $1 ÷ 16$       | 0        | 1      |

            Lecture des restes de bas en haut → **$1F_{16}$**

!!! exoordi "Exercice 22 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    En utilisant Python, 

    1. Vérifier que $47_{10}$ est bien égal à $2F_{16}$.
    2. Donner l’écriture binaire de $83$, puis vérifier le résultat à la main. 

    ??? success "Correction"
        En Python :  

        1. `hex(47)` renvoie `'0x2f'`  
            On retrouve bien $2F_{16}$, donc la conversion est correcte.
        2. `bin(83)` renvoie `'0b1010011'`  
            Vérification manuelle :  
            $64 + 16 + 2 + 1 = 83$  
            Donc $1010011_2$ est bien l’écriture correcte.


!!! exopapier "Exercice 23 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir les nombres décimaux suivants dans les bases indiquées :

    1. $79_{10}$ en base 2  
    2. $64_{10}$ en base 8  
    3. $255_{10}$ en base 16  
    4. $128_{10}$ en base 2  
    5. $300_{10}$ en base 8

    ??? success "Correction"
        1. **$79_{10}$ en base 2** :

            | Étape | Division       | Quotient | Reste |
            |-------|----------------|----------|--------|
            | 1     | $79 ÷ 2$       | 39       | 1      |
            | 2     | $39 ÷ 2$       | 19       | 1      |
            | 3     | $19 ÷ 2$       | 9        | 1      |
            | 4     | $9 ÷ 2$        | 4        | 1      |
            | 5     | $4 ÷ 2$        | 2        | 0      |
            | 6     | $2 ÷ 2$        | 1        | 0      |
            | 7     | $1 ÷ 2$        | 0        | 1      |

            Lecture des restes de bas en haut → **$1001111_2$**

        2. **$64_{10}$ en base 8** :

            | Étape | Division       | Quotient | Reste |
            |-------|----------------|----------|--------|
            | 1     | $64 ÷ 8$       | 8        | 0      |
            | 2     | $8 ÷ 8$        | 1        | 0      |
            | 3     | $1 ÷ 8$        | 0        | 1      |

            Lecture des restes de bas en haut → **$100_8$**

        3. **$255_{10}$ en base 16** :

            | Étape | Division       | Quotient | Reste     |
            |-------|----------------|----------|------------|
            | 1     | $255 ÷ 16$     | 15       | 15 (F)     |
            | 2     | $15 ÷ 16$      | 0        | 15 (F)     |

            Lecture des restes de bas en haut → **$FF_{16}$**

        4. **$128_{10}$ en base 2** :

            $128 = 2^7$ donc il s’écrit directement : **$10000000_2$**

        5. **$300_{10}$ en base 8** :

            | Étape | Division       | Quotient | Reste |
            |-------|----------------|----------|--------|
            | 1     | $300 ÷ 8$      | 37       | 4      |
            | 2     | $37 ÷ 8$       | 4        | 5      |
            | 3     | $4 ÷ 8$        | 0        | 4      |

            Lecture des restes de bas en haut → **$454_8$**

!!! exopapier "Exercice 24 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Que vaut $F_{16}$ en base 10 ? Et $F_{16}$ en binaire ?

    ??? success "Correction"
        En base 10 : $F_{16} = 15_{10}$  
        En binaire : $15_{10} = 1111_2$

!!! exopapier "Exercice 25 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Convertir $1000_{10}$ en base 2.

    ??? success "Correction"
        Trop long à faire ici, mais en utilisant la méthode des divisions successives, on trouve :  
        **$1000_{10} = 1111101000_2$**


!!! exopapier "Exercice 26 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Convertir $4095_{10}$ en base 16.

    ??? success "Correction"
        $4095 = 16^3 - 1 = 1000_{16} -1 = FFF_{16}$

!!! exopapier "Exercice 27 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    En base 16, quel est le plus petit nombre **à trois chiffres** divisible par 10 en base 10 ?

    ??? success "Correction"
        Il suffit d'ajouter des zéros "inutiles" à gauche pour obtenir un nombre à 3 chiffres.
        Ainsi, $00A_{16} = 10_{10}$ → c’est le plus petit à 3 chiffres hexadécimaux et divisible par 10.

!!! exopapier "Exercice 28 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Convertir les nombres hexadécimaux suivants en base binaire : 
        - $12_{16}$
        - $B3_{16}$
        - $4DC5_{16}$

    2. Convertir les nombres binaires suivants en base hexadécimale :
        - $1010 1111_2$
        - $0100 0001_2$
        - $0110 1000 1100 1110_2$

    ??? success "Correction"

        ✅ **Partie 1 – Hexadécimal → Binaire**

        Chaque chiffre hexadécimal correspond à **4 bits** en binaire :

        | Hexa        | Conversion binaire        |
        |-------------|----------------------------|
        | $1_{16}$    | `0001`                     |
        | $2_{16}$    | `0010`                     |
        | **$12_{16}$** | **`0001 0010`**           |

        De même, 

        | Hexa        | Conversion binaire        |
        |-------------|----------------------------|
        | $B_{16} = 11_{10}$ | `1011`               |
        | $3_{16}$           | `0011`               |
        | **$B3_{16}$**      | **`1011 0011`**       |

        Finalement, 

        | Hexa        | Conversion binaire        |
        |-------------|----------------------------|
        | $4_{16}$    | `0100`                     |
        | $D_{16}$    | `1101`                     |
        | $C_{16}$    | `1100`                     |
        | $5_{16}$    | `0101`                     |
        | **$4DC5_{16}$** | **`0100 1101 1100 0101`** |

        ---

        ✅ **Partie 2 – Binaire → Hexadécimal**

        On regroupe les bits **par paquets de 4**, puis on convertit chaque groupe :

        | Binaire                    | Groupes            | Hexa équivalent |
        |----------------------------|--------------------|-----------------|
        | $1010\ 1111_2$             | `1010` `1111`      | $A_{16}$ $F_{16}$ → **$AF_{16}$** |
        | $0100\ 0001_2$             | `0100` `0001`      | $4_{16}$ $1_{16}$ → **$41_{16}$** |
        | $0110\ 1000\ 1100\ 1110_2$ | `0110` `1000` `1100` `1110` | $6_{16}$ $8_{16}$ $C_{16}$ $E_{16}$ → **$68CE_{16}$**
---

## Additions et multiplications

!!! exopapier "Exercice 29 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Effectuer les additions suivantes en base 2 (sans retenue) :

    a) $100_2 + 011_2$  
    b) $1010_2 + 0101_2$  
    c) $0001_2 + 0010_2$

    ??? success "Correction"
        a) $100_2 + 011_2 = 111_2$

        b) $1010_2 + 0101_2 = 1111_2$

        c) $0001_2 + 0010_2 = 0011_2$

!!! exopapier "Exercice 30 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Effectuer les additions suivantes en base 2 (avec retenue simple) :

    a) $1011_2 + 0101_2$  
    b) $1110_2 + 0001_2$  
    c) $0111_2 + 0001_2$

    ??? success "Correction"

        a)

        $$
        \begin{array}{ccccc}
          & & (1) & (1) &  (1) &   \\
          & & 1 & 0 & 1 & 1 \\
        + & & 0 & 1 & 0 & 1 \\
        \hline
          & 1 & 0 & 0 & 0 & 0
        \end{array}
        $$

        b)

        \[
        \begin{array}{ccccc}
          & 1 & 1 & 1 & 0 \\
        + & 0 & 0 & 0 & 1 \\
        \hline
          & 1 & 1 & 1 & 1
        \end{array}
        \]

        c)

        \[
        \begin{array}{cccc}
          & (1) & (1) & (1) \\
          & 0 & 1 & 1 & 1 \\
        + & 0 & 0 & 0 & 1 \\
        \hline
          & 1 & 0 & 0 & 0
        \end{array}
        \]

!!! exopapier "Exercice 31 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Effectuer les additions suivantes en base 2 :

    a) $1101_2 + 1001_2 + 0101_2$  
    b) $111_2 + 111_2 + 111_2$  
    c) $10001_2 + 11111_2 + 00001_2$

    ??? success "Correction"

        a) $1101_2 + 1001_2 + 0101_2$ 

        \[
        \begin{array}{cccccc}
          & (1) & (1) &  & (1) & \\
          &  & 1 & 1 & 0 & 1 \\
        + &  & 1 & 0 & 0 & 1 \\
        + &  & 0 & 1 & 0 & 1 \\
        \hline
          & 1 & 1 & 0 & 1 & 1 
        \end{array}
        \]

        b)$111_2 + 111_2 + 111_2$

        \[
        \begin{array}{ccccc}
           & (10) & (10) & (1) &   \\
           &  & 1 & 1 & 1 \\
        +  &  & 1 & 1 & 1 \\
        +  &  & 1 & 1 & 1 \\
        \hline
        1  & 0 & 1 & 0 & 1 
        \end{array}
        \]

        c) $10001_2 + 11111_2 + 00001_2$

        \[
        \begin{array}{ccccccc}
          & (1) & (1) & (1) & (1) & (1) & \\
        + & & 1 & 0 & 0 & 0 & 1 \\
        + & & 1 & 1 & 1 & 1 & 1 \\
        + & & 0 & 0 & 0 & 0 & 1 \\
        \hline
          & 1 & 1 & 0 & 0& 0 & 1
        \end{array}
        \]

!!! exopapier "Exercice 32 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Poser les multiplications suivantes en base 2 :

    a) $11_2 \times 10_2$  
    b) $101_2 \times 1_2$

    ??? success "Correction"

        a)

        \[
        \begin{array}{cccc}
          &  & 1 & 1 \\
        \times & & 1 & 0 \\
        \hline
           & & 0 & 0 \\
        + & 1 & 1 &  \\
        \hline
            & 1 & 1 & 0
        \end{array}
        \]

        b) $101_2 \times 1_2 = 101_2$ (identité de la multiplication)
        \]

!!! exopapier "Exercice 33 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Poser les multiplications suivantes en base 2 :

    a) $101_2 \times 11_2$  
    b) $1101_2 \times 10_2$

    ??? success "Correction"

        a)

        \[
        \begin{array}{cccccc}
              &   &   & 1 & 0 & 1 \\
        \times &   &   &   & 1 & 1 \\
        \hline
              &   &   & 1 & 0 & 1 \\
        +     &   & 1 & 0 & 1 &   \\
        \hline
              &  & 1 & 1 & 1 & 1 
        \end{array}
        \]

        b)

        \[
        \begin{array}{cccccc}
              &   & 1 & 1 & 0 & 1 \\
        \times &   &   &   & 1 & 0 \\
        \hline
              &   & 0  &  0 & 0 & 0  \\
        +     &  1 & 1 & 0 & 1 &   \\
        \hline
              & 1 & 1 & 0 & 1 & 0  
        \end{array}
        \]

!!! exopapier "Exercice 34 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Effectuer les additions suivantes dans la base indiquée :

    **En Base 8 :**

    a) $127_8 + 61_8$  
    b) $745_8 + 32_8$

    **En base 16 :** 

    c) $3A_{16} + 2F_{16}$  
    d) $C9_{16} + 7B_{16}$

    ??? success "Correction"

        a) $127_8 + 61_8$

        On pose l’addition en base 8 :

        \[
        \begin{array}{cccc}
          & (1) &   (1)  &     \\
          & 1 & 2 & 7 \\
        + & 0 & 6 & 1 \\
        \hline
          & 2 & 1 & 0 
        \end{array}
        \]


        b) $745_8 + 32_8$

        \[
        \begin{array}{cccc}
          & 7 & 4 & 5 \\
        + & 0 & 3 & 2 \\
        \hline
          & 7 & 7 & 7 
        \end{array}
        \]

        c) $3A_{16} + 2F_{16}$

        \[
        \begin{array}{ccc}
         & (1) & \\
          & 3 & A \\
        + & 2 & F \\
        \hline
          & 6 & 9 
        \end{array}
        \]

        Conversion en décimal pour la vérification :  
        $3A_{16} = 3 \times 16 + 10 = 58_{10}$  
        $2F_{16} = 2 \times 16 + 15 = 47_{10}$  
        $58 + 47 = 105_{10} = 69_{16}$

        d) $C9_{16} + 7B_{16}$

        \[
        \begin{array}{ccc}
           & & (1) &  \\
           & & C & 9 \\
        +  & & 7 & B \\
        \hline
          & 1 & 4 & 4 
        \end{array}
        \]

        Conversion en décimal pour la vérification :  
        $C9_{16} = 12 \times 16 + 9 = 201_{10}$  
        $7B_{16} = 7 \times 16 + 11 = 123_{10}$  
        $201 + 123 = 324_{10} = 144_{16}$

---

## Conversion d'un relatif (bit de signe)

!!! exopapier "Exercice 35 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Quelle est la particularité du bit de poids fort dans la méthode du bit de signe ?

    ??? success "Correction"
        Il indique le **signe** du nombre : 0 pour un nombre positif, 1 pour un nombre négatif.

!!! exopapier "Exercice 36 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Donner tous les chiffres binaires utilisables pour représenter un entier **positif** sur 4 bits avec un bit de signe.

    ??? success "Correction"
        Le bit de signe est 0, et les 3 bits restants donnent :  
        `0000`, `0001`, `0010`, `0011`, `0100`, `0101`, `0110`, `0111`


!!! exopapier "Exercice 37 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Quelle valeur représente le nombre binaire `1011` si on utilise la méthode du bit de signe (sur 4 bits) ?

    ??? success "Correction"
        Bit de signe = 1 → négatif  
        Valeur absolue = `011` = 3  
        Donc : $-3$

!!! exopapier "Exercice 38 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Convertir le nombre décimal $+6$ en représentation binaire sur 5 bits avec la méthode du bit de signe.

    ??? success "Correction"
        Signe = 0, valeur absolue = `0110` → $+6 = 00110$

!!! exopapier "Exercice 39 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Le codage binaire `10000` (en méthode du bit de signe sur 5 bits) représente-t-il $-16$ ?

    ??? success "Correction"
        Non. Il représente $-0$.  
        Avec 4 bits pour la valeur, on peut coder jusqu’à $15$ → $-16$ n’est **pas représentable**.

!!! exopapier "Exercice 40 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Convertir le nombre décimal $-4$ en représentation binaire sur 5 bits avec la méthode du bit de signe.

    ??? success "Correction"
        Signe = 1, valeur = `0100` → $-4 = 10100$


!!! exopapier "Exercice 41 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Combien de valeurs **positives** peut-on représenter sur 6 bits avec la méthode du bit de signe ?

    ??? success "Correction"
        1 bit pour le signe → reste 5 bits : $2^5 = 32$ valeurs positives

!!! exopapier "Exercice 42 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir les nombres $-1$, $0$ et $+1$ en binaire sur 4 bits avec la méthode du bit de signe.

    ??? success "Correction"
        $-1 = 1001$,  
        $+0 = 0000$,  
        $+1 = 0001$


!!! exopapier "Exercice 43 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Quelle est la **plage des entiers** représentables avec la méthode du bit de signe sur 5 bits ?

    ??? success "Correction"
        Il y a 1 bit pour le signe et 4 bit pour les valeurs. Soit $2^4 = 16$ valeurs possibles (en comptant le 0).
        On peut donc coder de $-15$ à $+15$ mais avec **deux fois le zéro** (donc 31 valeurs au total)


!!! exopapier "Exercice 44 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Explique pourquoi la méthode du bit de signe n'est pas utilisée dans les ordinateurs modernes.

    ??? success "Correction"
        Car elle crée **deux représentations pour 0** et ne permet pas de **faire des additions ou soustractions correctes** automatiquement.

---

## Conversion d'un relatif (complément à 2)

!!! exopapier "Exercice 45 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Quel est l’intérêt principal du complément à deux par rapport à la méthode du bit de signe ?

    ??? success "Correction"
        Il permet de **faire des opérations comme l’addition sans règles supplémentaires**, et n’a **qu’une seule représentation du 0**.

!!! exopapier "Exercice 46 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Parmi les écritures binaires suivantes sur 4 bits, lesquelles représentent des entiers négatifs en complément à deux ?  
    $0110$, $1100$, $0011$, $1011$, $1000$

    ??? success "Correction"
        Les valeurs dont le bit de poids fort est 1 sont négatives →  
        $1100$, $1011$, $1000$ représentent des **nombres négatifs**.

!!! exopapier "Exercice 47 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Un élève affirme que $1000_{2}$ représente $+8_{10}$ en complément à deux sur 4 bits. A-t-il raison ? Justifie.

    ??? success "Correction"
        ❌ Faux.  
        $1000_{2}$ a un bit de poids fort = 1 → c’est un **négatif**.  
        En complément à deux : $1000_{2} = -8_{10}$

!!! exopapier "Exercice 48 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Coder les entiers relatifs suivants en **complément à deux sur 4 bits** :

    1. $+5_{10}$  
    2. $-1_{10}$  
    3. $-6_{10}$

    ??? success "Correction"
        1. $+5_{10}$ : nombre positif → codé normalement  
            $\Rightarrow +5_{10} = 0101_{2}$

        2. $-1_{10}$ :  
            $1_{10} = 0001_{2}$  
            Inversion : `1110`  
            Ajout de 1 : `1111`  
            $\Rightarrow -1_{10} = 1111_{2}$

        3. $-6_{10}$ :  
            $6_{10} = 0110_{2}$  
            Inversion : `1001`  
            Ajout de 1 : `1010`  
            $\Rightarrow -6_{10} = 1010_{2}$

!!! exopapier "Exercice 49 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Déterminer la valeur décimale des nombres binaires suivants, **codés en complément à deux sur 4 bits** :

    1. $1100_2$  
    2. $1111_2$  
    3. $1010_2$  
    4. $0111_2$
    5. $1000_2$

    ??? success "Correction"
        1. $1100_2$ :  
            Bit de poids fort = 1 → **négatif**  
            Inversion : `0011`  
            Ajout de 1 : `0100` → $4$  
            $\Rightarrow 1100_2 = -4$

        2. $1111_2$ :  
            Bit de poids fort = 1 → **négatif**  
            Inversion : `0000`  
            Ajout de 1 : `0001` → $1$  
            $\Rightarrow 1111_2 = -1$

        3. $1010_2$ :  
            Bit de poids fort = 1 → **négatif**  
            Inversion : `0101`  
            Ajout de 1 : `0110` → $6$  
            $\Rightarrow 1010_2 = -6$

        4. $0111_2$ :  
            Bit de poids fort = 0 → **positif**  
            $0111_2 = 7$  
            $\Rightarrow 0111_2 = +7$

        5. $1000_2$ :
            Bit de poids fort = 1 → **négatif**
            Inversion : `0111`
            Ajout de 1 : `1000` → $8$  
            $\Rightarrow 1000_{2} = -8$

!!! exopapier "Exercice 50 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Donner tous les entiers représentables sur 3 bits en complément à deux.

    ??? success "Correction"
        Sur 3 bits : $[-2^{2}, 2^{2}-1] = [-4 ; +3]$  
        → $-4, -3, -2, -1, 0, 1, 2, 3$



!!! exopapier "Exercice 51 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Coder $-15_{10}$ en complément à deux sur 5 bits.

    ??? success "Correction"
        $15_{10} = 01111_{2}$  
        Inversion : `10000`  
        Ajout de 1 : `10001`  
        Donc $-15_{10} = 10001_{2}$

!!! exopapier "Exercice 52 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir les entiers suivants en complément à deux sur 4 bits : $-1_{10}$, $-2_{10}$, $-3_{10}$, $-4_{10}$, $-5_{10}$.

    ??? success "Correction"
        - $-1_{10} = 1111_{2}$
        - $-2_{10} = 1110_{2}$
        - $-3_{10} = 1101_{2}$
        - $-4_{10} = 1100_{2}$
        - $-5_{10} = 1011_{2}$

!!! exopapier "Exercice 53 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Effectuer les soustractions suivantes en **complément à deux sur 4 bits**.  
    Pour chaque opération, coder les deux entiers, calculer l’opposé, poser l’addition, et donner le résultat final.

    a) $5 - 2$  
    b) $7 - 3$  
    c) $4 - 6$  
    d) $0 - 5$  
    e) $-3 - 4$

    ??? success "Correction"

        a) $5 - 2$

        - $5 = 0101_2$
        - $-2 = 1110_2$. En effet, $2 = 0010$ → $\overline{0010} = 1101$ puis $+1$ → $1110$.
        - $0101 + 1110 = 0011$ → $3_{10}$ ✅

        \[
        \begin{array}{cccc}
          & (1) & (1) &   \\
          & 0 & 1 & 0 & 1 \\
        + & 1 & 1 & 1 & 0 \\
        \hline
          & 0 & 0 & 1 & 1
        \end{array}
        \]

        b) $7 - 3$

        - $7 = 0111_2$, 
        - $-3 = 1101_2$  
        - $0111 + 1101 = 0100$ → $4_{10}$ ✅

        \[
        \begin{array}{cccc}
          & (1) & (1) &   \\
          & 0 & 1 & 1 & 1 \\
        + & 1 & 1 & 0 & 1 \\
        \hline
          & 0 & 1 & 0 & 0
        \end{array}
        \]

        c) $4 - 6$

        - $4 = 0100_2$, 
        - $-6 = 1010_2$,
        - $0100 + 1010 = 1110$ → bit fort = 1 → négatif → inversion : $0001$ → +1 : $0010$ → $-2_{10}$ ✅

        \[
        \begin{array}{cccc}
          & (1) &     &   \\
          & 0 & 1 & 0 & 0 \\
        + & 1 & 0 & 1 & 0 \\
        \hline
          & 1 & 1 & 1 & 0
        \end{array}
        \]

        d) $0 - 5$

        - $0 = 0000_2$, 
        - $-5 = 1011_2$,
        - $0000 + 1011 = 1011$ → négatif → inversion : $0100$ → +1 : $0101$ → $-5_{10}$ ✅

        \[
        \begin{array}{cccc}
          &     &     &   \\
          & 0 & 0 & 0 & 0 \\
        + & 1 & 0 & 1 & 1 \\
        \hline
          & 1 & 0 & 1 & 1
        \end{array}
        \]

        e) $-3 - 4$

        - $-3 = 1101$, 
        - $-4 = 1100$, 
        - $1101 + 1100 = 11001$ → sur 4 bits = $1001$ (on perd le bit de dépassement)  
        - Or $1001$ → Inversion : `0110` → +1 : `0111` → $-7_{10}$ ✅

        \[
        \begin{array}{ccccc}
          & (1) & &     &   \\
          & 1 & 1 & 0 & 1 \\
        + & 1 & 1 & 0 & 0 \\
        \hline
        (1)& 1 & 0 & 0 & 1
        \end{array}
        \]

!!! exopapier "Exercice 54 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On vous donne $11101000_{2}$ sur 8 bits. À quel entier décimal correspond ce nombre en complément à deux ?

    ??? success "Correction"
        Bit de poids fort = 1 → c’est un nombre négatif  
        Inversion : `00010111`, ajout de 1 : `00011000` = $24_{10}$  
        Donc $11101000_{2} = -24_{10}$

!!! exopapier "Exercice 55 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Est-il possible de représenter $-16_{10}$ sur 5 bits en complément à deux ? Justifie.

    ??? success "Correction"
        Oui : sur 5 bits → plage = $[-2^{4}, 2^{4}-1] = [-16 ; +15]$  
        Donc $-16_{10}$ est bien représentable.

!!! exopapier "Exercice 56 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On travaille en **complément à deux sur 8 bits**.

    1. Convertir les entiers suivants en binaire :
        - $53_{10}$
        - $-124_{10}$
        - $81_{10}$
        - $-32_{10}$

    2. Donner la valeur décimale des nombres binaires suivants (en complément à deux sur 8 bits) :
        - $11000000_2$
        - $01001101_2$
        - $10011100_2$
        - $00010110_2$

    ??? success "Correction"
        **Question 1 :**

        - $53_{10} = 00110101_{2}$
        - $-124_{10}$ →  
          $124_{10} = 01111100_{2}$ → inversion = `10000011` → +1 = `10000100`  
          Donc $-124_{10} = 10000100_{2}$
        - $81_{10} = 01010001_{2}$
        - $-32_{10}$ →  
          $32_{10} = 00100000_{2}$ → inversion = `11011111` → +1 = `11100000`  
          Donc $-32_{10} = 11100000_{2}$

        ---

        **Question 2 :**

        - `11000000` → négatif → inversion = `00111111`, +1 = `01000000` = $64_{10}$  
          Donc : $11000000_{2} = -64_{10}$
        - `01001101` → positif = $77_{10}$
        - `10011100` → négatif → inversion = `01100011`, +1 = `01100100` = $100_{10}$  
          Donc : $10011100_{2} = -100_{10}$
        - `00010110` → positif = $22_{10}$

!!! exopapier "Exercice 57 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Combien d'entiers négatifs différents peut-on représenter sur 7 bits en complément à deux ?

    ??? success "Correction"
        Sur 7 bits → $2^7 = 128$ valeurs totales  
        Plage = $[-64 ; +63]$ → donc il y a **64 entiers négatifs** (et un 0)

---
## Nombres décimaux et réels

!!! exopapier "Exercice 58 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Une console Python affiche `-2.7755575615628914e-17` pour le calcul `0.5 - 0.2 -0.2 -0.1`.

    Quel est le résultat exact de ce calcul ? Expliquer la différence entre la valeur affichée et la valeur attendue. 

    ??? success "Correction"
        Le résultat **mathématique exact** est $0.5 - 0.2 - 0.2 - 0.1 = 0$.  
        Mais Python affiche $-2.7755575615628914 \times 10^{-17}$, qui est très proche de zéro.

        Cela s’explique par la **représentation binaire des nombres flottants** : certains nombres décimaux comme $0.1$ ou $0.2$ **ne peuvent pas être représentés exactement** en binaire, ce qui provoque une **petite erreur d’arrondi** dans les calculs.  
        Ce phénomène est courant dans **tous les langages** de programmation et justifie pourquoi on **ne teste jamais l’égalité exacte entre deux flottants**.

!!! exopapier "Exercice 59 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Convertir les nombres suivants en base binaire (jusqu'à 3 chiffres après la virgule si nécessaire) :
    
    1. $0{,}25_{10}$
    2. $0{,}75_{10}$
    3. $0{,}5_{10}$
    4. $0{,}125_{10}$

    ??? success "Correction"
        1. $0{,}25 = 0{,}01_2$  
        2. $0{,}75 = 0{,}11_2$  
        3. $0{,}5 = 0{,}1_2$  
        4. $0{,}125 = 0{,}001_2$

!!! exopapier "Exercice 60 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Convertir les nombres suivants en base binaire **avec la méthode des multiplications successives** :

    1. $0{,}3_{10}$  
    2. $0{,}6_{10}$

    (Limiter à **5 chiffres après la virgule**)

    ??? success "Correction"
        1. $0{,}3 ≈ 0{,}01001_2$ (valeur approchée)  
        2. $0{,}6 ≈ 0{,}10011_2$ (valeur approchée)

        Ces deux nombres **ne peuvent pas être codés exactement** en binaire car leur développement est **infini**.

!!! exopapier "Exercice 61 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Parmi les nombres suivants, lesquels sont **représentables exactement** en binaire ? Justifier.

    1. $0{,}25$
    2. $0{,}1$
    3. $0{,}125$
    4. $0{,}2$

    ??? success "Correction"
        - $0{,}25 = \frac{1}{4} = 0{,}01_2$ → ✅ exact  
        - $0{,}1$ → ❌ non représentable (développement infini)  
        - $0{,}125 = \frac{1}{8} = 0{,}001_2$ → ✅ exact  
        - $0{,}2$ → ❌ non représentable (développement infini)

        👉 Seuls les **nombres décimaux dont le dénominateur est une puissance de 2** sont **exactement codables** en binaire.

!!! exopapier "Exercice 62 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Convertir $3,375_{10}$ en base binaire.
    2. En TP de Physique-Chimie, on mesure une tension de 5,15V à la sortie d'un convertisseur analogique-numérique. Cette valeur pourra-t-elle être représentée de manière exacte dans la mémoire de l'ordinateur ?

    ??? success "Correction"
        1. $3{,}375_{10} = 3 + 0{,}375 = 11{,}011_2$ 

            - $3 = 11_2$  
            - $0{,}375 = 0{,}011_2$ car :  
             $0{,}375 \times 2 = 0{,}75 → 0$  
             $0{,}75 \times 2 = 1{,}5 → 1$  
             $0{,}5 \times 2 = 1{,}0 → 1$  
           Donc : $3{,}375_{10} = 11{,}011_2$

        2. La valeur $5{,}15$ **ne peut pas être représentée exactement** en binaire car sa partie décimale est **non fractionnaire en base 2** (contrairement à $0.5$, $0.25$, etc.).  
        Elle sera donc **approximationnée** dans la mémoire, ce qui peut entraîner des **erreurs de précision**.

            On peut le vérifier par le calcul : 

            - $15 = 1111_2$
            - $0,15 \times 2 = 0,30 → 0$  
              $0,30 \times 2 = 0,60 → 0$  
              $0,60 \times 2 = 1,2 → 1$  
              $0,2 \times 2 = 0,4 → 0$  
              $0,4 \times 2 = 0,8 → 0$  
              $0,8 \times 2 = 1,6 → 1$ 🔁  
              Donc $0,15 = 0,00\overline{1001}$

!!! exopapier "Exercice 63 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Similaire au bogue de l'an 2000, le bogue de l'an 2038 pourrait perturber le fonctionnement d'un grand nombre de systèmes informatiques le 19 janvier 2038. En effet, l'heure des systèmes d'exploitation de type Unix est une mesure du temps basée sur le nombre de secondes écoulées depuis le 1er janvier 1970 à 00:00:00 UTC. Ce nombre est codé sur 32 bits.

    1. Quelle est la valeur maximale représentable pour un entier signé sur 32 bits ? Justifier.
    2. Combien d'années cela représente-t-il ?
    3. Que risque-t-il de se passer le 19 janvier 2038 à 03:14:08 UTC ?

    ??? success "Correction"
        1. Un entier **signé** sur 32 bits peut représenter au maximum $2^{31} - 1 = 2\,147\,483\,647$ car 1 bit est utilisé pour le signe.

        2. On a donc $2\,147\,483\,647$ secondes, soit :   
            - $2\,147\,483\,647 ÷ 60 ≈ 35\,791\,394$ minutes  
            - $÷ 60 ≈ 596\,523$ heures  
            - $÷ 24 ≈ 24\,855$ jours  
            - $÷ 365,25 ≈ 68$ ans  
            Donc ≈ **68 années** après 1970 → **janvier 2038**

        3. Le **19 janvier 2038 à 03:14:08 UTC**, la valeur $2\,147\,483\,647$ sera atteinte.  
            Toute seconde supplémentaire fera **déborder** l’entier signé (dépassement de capacité), le compteur passera à une **valeur négative**, ce qui pourrait :  
            - provoquer des **comportements imprévisibles**,  
            - afficher une **date incohérente** (comme 1901),  
            - ou **planter des systèmes** non mis à jour.

            Ce problème est connu sous le nom de **bogue de l'an 2038**.