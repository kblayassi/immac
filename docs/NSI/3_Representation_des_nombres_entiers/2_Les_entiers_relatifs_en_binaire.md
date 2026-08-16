---
title: Représentation des entiers relatifs en binaire
weight: 3
---

# Représentation des entiers relatifs en binaire ➖➕

Jusqu’ici, nous avons vu comment représenter des **entiers naturels** (positifs ou nuls) en binaire, octal ou hexadécimal.  Mais que faire si l’on veut représenter un nombre **négatif** comme $-3$ ou $-127$ ?

Un ordinateur, par nature, ne manipule que des **bits**, c’est-à-dire des 0 et des 1. Il n’a pas de "signe moins" intégré.  Il faut donc trouver un moyen de **représenter les entiers négatifs uniquement avec des bits**.

Dans cette partie, nous allons découvrir **comment représenter les entiers relatifs en binaire**.

---

## Solution naïve : signe + valeur absolue 🧪

Une première idée, assez intuitive, consiste à utiliser un **bit supplémentaire pour coder le signe** du nombre.

!!! definition "Définition : bit de poids fort"
    Le **bit de poids fort** (souvent abrégé en **MSB** pour *Most Significant Bit*) est le **bit situé le plus à gauche** dans une écriture binaire.  
    C’est celui qui représente la **plus grande puissance de 2**.

Pour coder un entier relatif avec la méthode du **bit de signe**, on procèdera comme suit : 

- Le **bit de gauche** (bit de poids fort) indique le **signe** :
    - `0` → le nombre est **positif**
    - `1` → le nombre est **négatif**
- Les **bits restants** codent la **valeur absolue** du nombre, comme s’il était naturel.

Voici quelques exemples sur 5 bits (1 de signe et 4 pour la valeur absolue) : 

| Nombre binaire | Signe | Valeur absolue | Nombre représenté |
| --- |-------|----------------|-------------------|
| 00110 | 0     | 0110           | $+6$              |
| 10110 | 1     | 0110           | $-6$              |
| 00000 | 0     | 0000           | $+0$              |
| 10000 | 1     | 0000           | $-0$             |

!!! expert "Pour aller plus loin : Plage des valeurs avec un bit de signe"
    Si on utilise la méthode du **bit de signe** (signe + valeur absolue) sur $n$ bits :

    - On utilise **1 bit pour le signe** (bit de poids fort)
    - Il reste **$n - 1$ bits** pour la valeur

    On pourra donc représenter tous les entiers de l'intervalle : 

    $$[-(2^{n-1} - 1), \quad +(2^{n-1} - 1)]$$

!!! warning "Problèmes rencontrés"
    - Il y a **deux représentations pour 0** : `0000` et `1000`
    - Ce système rend les opérations (comme l’addition) difficiles à gérer (exemple : $-6 + 6$ ne donne pas 0 en binaire). Nous verrons plus loin comment le complément à deux permet de les effectuer simplement. 
    - Ce système **n’est pas utilisé en pratique** dans les ordinateurs modernes

C’est pourquoi on préfère une autre méthode : le **complément à deux**, que nous allons maintenant découvrir.

---

## Une autre méthode : le complément à un 🧮

Avant d’adopter la méthode encore utilisée aujourd'hui, certains systèmes utilisaient une méthode un peu plus simple : le **complément à un**.

!!! definition "Définition : complément à un"
    Le **complément à un** d’un entier $N$ est obtenu en **inversant tous les bits** de son écriture binaire.

    ---

    Par exemple, sur 4 bits, on a $5 = 0101_2$ donc $-5$ (en complément à un) = $1010_2$

Cette méthode permettait déjà de représenter **des entiers négatifs**, mais elle avait plusieurs **inconvénients**.

!!! warning "Limites du complément à un"
    - Il existe **deux représentations du zéro** : `0000` (pour $+0$) et `1111` (pour $-0$).
    - Les opérations comme l’addition deviennent **plus complexes** :
        - Il faut parfois **réajouter une retenue** à la fin.
        - Exemple : $5 + (-5)$ ne donne pas 0 directement, sauf si on gère la **retenue finale**.

C’est pour **résoudre ces problèmes** qu’on a introduit la méthode du **complément à deux**, qui améliore cette idée en ajoutant **+1 au complément à un**.

---

## La méthode du complément à deux 🔄

Pour résoudre les problèmes liés à la représentation des entiers négatifs, les ordinateurs utilisent une méthode très efficace : **le complément à deux** (souvent noté C2).  
C’est le système **le plus utilisé aujourd’hui** pour représenter des entiers relatifs en binaire.

### Principe

Un entier est représenté sur un nombre fixe de bits (par exemple 4 ou 8).  

- Les **entiers positifs** sont codés comme des entiers naturels classiques.  
- Les **entiers négatifs** sont codés de façon spéciale, en utilisant une **transformation binaire** appelée complément à deux.

Cette méthode permet de :  

- **Représenter les entiers positifs et négatifs sans ambiguïté**
- **Faire des additions et soustractions directement**, sans règles particulières


### Comment coder un entier négatif en complément à deux ? 🛠️

!!! methode "Méthode : Encoder un entier négatif en complément à deux"
    Pour coder un entier négatif $-N$ sur $n$ bits :

    1. **Coder $N$ en binaire** sur $n$ bits
    2. **Inverser** tous les bits (on obtient le complément à un)
    3. **Ajouter 1** au résultat

    C’est ce qu’on appelle le **complément à deux** de $N$.

    ---

    *Exemple : coder $-5$ sur 4 bits*

    1. *5 = 0101*  
    2. *Inversion : 1010* 
    3. *Ajout de 1 : 1010 + 0001 = 1011*

    *Ainsi -5 est représenté par 1011 en complément à deux sur 4 bits*


### Comment lire un entier signé codé en complément à deux ? 🔍


!!! tip "Astuce"
    En complément à deux, comme pour la méthode précédente, **le bit de poids fort** permet de détecter le signe :

    - `0` → nombre **positif ou nul**
    - `1` → nombre **négatif**

!!! methode "Méthode : Lire un entier en complément à deux"
    Soit un nombre codé sur $n$ bits :

    - Si le **bit de poids fort** est **0** → c’est un **entier positif**, à lire comme un entier naturel.
    - Si le **bit de poids fort** est **1** → c’est un **entier négatif**, codé en complément à deux.

    Pour retrouver sa valeur, il faut alors : 

    1. Inverser tous les bits
    2. Ajouter 1
    3. Convertir le résultat en décimal
    4. Ajouter un **signe moins**

    ---

    *Exemple : convertir 1011 (sur 4 bits)*

    1. *Inversion : 0100*
    2. *Ajout de 1 : 0101*
    3. *Ici, $0101_2 = 5_{10}$. Donc $1011_2 = -5_{10}$*

Cette méthode peut paraître un peu technique au départ, mais elle est **très pratique** : elle permet de **faire des additions entre entiers positifs et négatifs sans changer les règles !**


### Plage de valeurs possibles selon le nombre de bits 📈

Quand on code les entiers relatifs en **complément à deux**, on réserve un **nombre fixe de bits** pour leur représentation (souvent 8, 16, 32, etc.).

Avec ce système, la **plage de valeurs représentables** n’est plus symétrique autour de 0, car le 0 n’est codé qu’**une seule fois**.

!!! propriete "Propriété : plage des entiers représentables en complément à deux"
    Sur $n$ bits, le complément à deux permet de représenter des entiers de : 

    $$-2^{n-1} \quad \text{à} \quad 2^{n-1} - 1$$

Par exemple, 

| Nombre de bits ($n$) | Plage de valeurs représentables |
|----------------------|---------------------------------|
| 3 bits               | de $-4$ à $+3$                  |
| 4 bits               | de $-8$ à $+7$                  |
| 8 bits               | de $-128$ à $+127$              |
| 16 bits              | de $-32\,768$ à $+32\,767$      |

!!! info "Pourquoi $-2^{n-1}$ à $2^{n-1} - 1$ ?"
    - On réserve un bit pour le **signe** (le bit de poids fort) d'où le $2^{n-1}$
    - Il y a **une seule représentation du zéro**, donc on a une valeur négative de plus que de positives (le 0 étant compté comme positif)
    - On garde **toutes les combinaisons possibles** sur $n$ bits ($2^n$ valeurs totales (négatif et positif))

Ainsi, avec 8 bits (soit un octet), on peut stocker :

- tous les entiers **de $-128$ à $+127$**
- et effectuer **des opérations correctes** même avec des entiers négatifs

---

## Soustraction de deux entiers relatifs ➖

Les ordinateurs **n’effectuent pas de soustraction directement**.  
À la place, ils utilisent une **technique astucieuse** que vous avez déjà rencontré au collège :  
!!! propriete "Propriété : Soustraction"
    Soustraire un nombre, c’est **ajouter son opposé**.

    Par exemple, au lieu de faire $5 - 3$, on fait : $5 + (-3)$.

!!! methode "Méthode : Soustraction de deux entiers relatifs"
    Pour effectuer $A - B$ en binaire :

    1. **Coder $A$** en binaire sur $n$ bits (en utilisant le complément à 2 si besoin)
    2. **Coder $-B$** en binaire sur $n$ bits (en utilisant le complément à 2 si besoin)
    3. **Effectuer l’addition** de $A + (-B)$
    4. **Interpréter le résultat** comme un entier signé

Prenons, par exemple, la soustraction suivante : $6-3$ sur 4 bits. 

1. On a $6_{10} = 0110_{2}$
2. De même, $-3_{10}=1101_2$. En effet, $3 = 0011$ → inversion = $1100$ → +1 = $1101$.
3. On effectue l'addition $6+(-3)$ : 

    \[
    \begin{array}{cccc}
      & (1) &  &     \\
      & 0 & 1 & 1 & 0 \\
    + & 1 & 1 & 0 & 1 \\
    \hline
      & 0 & 0 & 1 & 1 
    \end{array}
    \]

Finalement, on obtient, sur 4 bits $0011_2 = 3_{10}$ ✅

---

## Synthèse 📋

Voici un résumé de ce que nous avons appris sur la **représentation des entiers relatifs** en binaire :

### Comparaison des méthodes

| Méthode                 | Principe                            | Problèmes rencontrés                    | Utilisation actuelle |
|-------------------------|--------------------------------------|-----------------------------------------|----------------------|
| **Signe + valeur absolue** | 1 bit pour le signe, reste = valeur | Deux représentations pour 0, opérations incorrectes | ❌ Obsolète         |
| **Complément à un**       | Inversion des bits                  | Nécessite des ajustements lors de l’addition | ❌ Peu utilisée     |
| **Complément à deux**     | Comp. à 1 + 1                       | Représentation non intuitive mais fiable | ✅ Standard moderne  |

!!! info "À retenir !"

    - **Les entiers positifs** sont codés de façon classique
    - **Les entiers négatifs** utilisent le **complément à deux**
    - Avec le complément à deux, sur $n$ bits, on peut représenter les entiers de :
  
        $$-2^{n-1} \quad \text{à} \quad 2^{n-1} - 1$$

    - Les opérations comme **l’addition** fonctionnent **sans adaptation particulière** grâce au complément à deux

