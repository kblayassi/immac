---
title: Représentation des nombres décimaux et réels
weight: 4 
---

# Représentation des nombres décimaux et réels 🌡️

Jusqu’à présent, nous avons travaillé avec des **entiers**, qu’ils soient positifs, négatifs, ou exprimés dans différentes bases.  
Mais dans le monde **réel** (sans jeu de mots 😄), on manipule très souvent des **valeurs avec une partie décimale** : prix, mesures, temps, pourcentages…

Ces **nombres** posent un nouveau défi pour les ordinateurs : comment les représenter **avec un nombre fini de bits**, quand ils peuvent avoir **une infinité de décimales** ?

Dans cette partie, nous allons voir :

- comment représenter **des nombres avec une partie décimale** en binaire ;
- pourquoi certaines valeurs **ne peuvent pas être représentées exactement** ;
- ce que cela implique pour les calculs et les comparaisons ;
- et comment les ordinateurs utilisent une **représentation flottante** pour stocker ces nombres.

Pas besoin d’entrer dans les détails techniques des normes complexes : l’objectif est de **comprendre les limites**, pas d’apprendre par cœur leur structure binaire. 😉

---

## Convertir un nombre décimal simple en binaire 🔢

Pour représenter un **nombre décimal** en binaire, on peut séparer le travail en deux parties :

- la **partie entière** se convertit comme un entier naturel (méthode déjà vue),
- la **partie décimale** se convertit à l’aide de **multiplications par 2** successives.


!!! methode "Méthode : Convertir un nombre décimal en binaire"
    Soit $x$ un nombre décimal. On sépare $x$ en deux parties :
    
    - Partie entière : on applique la méthode des **divisions euclidiennes successives** (déjà vue en base 2).
    - Partie décimale : on effectue des **multiplications successives par 2**.
        - À chaque étape, la **partie entière du résultat** donne le bit suivant.
        - La **partie décimale restante** est à multiplier à nouveau par 2.
        - On continue jusqu’à ce que la partie décimale soit nulle (ou qu’on atteigne un nombre de bits fixé).

=== "Exemple 1" 
    
    Nous allons convertir $6.25$ en binaire

    - Partie entière : $6 = 110_2$
    - Partie décimale :   
        $0.25 \times 2 = 0.5$ → 0  
        $0.5 \times 2 = 1.0$ → 1  ✅ Fin : la partie décimale est nulle

    $\Rightarrow \boxed{6.25_{10} = 110.01_2}$

=== "Exemple 2" 

    Nous allons convertir $0.75$ en binaire

    - Partie entière : $0 = 0_2$
    - Partie décimale :  
        $0.75 \times 2 = 1.5$ → 1  
        $0.5 \times 2 = 1.0$ → 1  ✅ Fin : la partie décimale est nulle

    $\Rightarrow \boxed{0.75_{10} = 0.11_2}$

=== "Exemple 3" 
    
    Nous allons convertir $0.1$ en binaire

    - Partie entière : $0 = 0_2$
    - Partie décimale :  
        $0.1 \times 2 = 0.2$ → 0  
        $0.2 \times 2 = 0.4$ → 0  
        $0.4 \times 2 = 0.8$ → 0  
        $0.8 \times 2 = 1.6$ → 1  
        $0.6 \times 2 = 1.2$ → 1  
        $0.2 \times 2 = 0.4$ → 0  (🔁 on retombe sur $4$, la partie décimale sera donc périodique)

    $\Rightarrow \boxed{0.1_{10}}$ **n’a pas d’écriture finie en binaire. Ainsi $\boxed{0,1 = 0,0\overline{0011}}$**


!!! info "À retenir"
    - Certains nombres décimaux **ont une écriture binaire finie** (comme $0.25$ ou $0.75$)
    - D’autres **ne peuvent pas être représentés exactement** (comme $0.1$ ou $1/3$)
    - Cela entraîne des **erreurs d’approximation** en machine

---

## Limites de la représentation et erreurs d’approximation ⚠️

Comme nous l’avons vu, certains **nombres décimaux** ne peuvent **pas être représentés exactement** en binaire, à cause des conversions ou du fait que l’ordinateur **n’a qu’un nombre limité de bits** pour coder un nombre réel.

🧠 Résultat : les nombres sont souvent **approximés**, ce qui peut entraîner des **erreurs invisibles**… mais gênantes dans les calculs.


### L'exemple typique `0.1 + 0.2 == 0.3` ❌

Testons dans Python :

```python
>>> 0.1 + 0.2 == 0.3
False
>>> 0.1 + 0.2
0.30000000000000004
>>> 0.3
0.3
```

😱 Pourtant, mathématiquement, $0.1 + 0.2 = 0.3$ !
Mais ici, l’ordinateur approxime $0.1$ et $0.2$ en binaire, ce qui crée un petit décalage.

### Pourquoi ça arrive ?

!!! info "Explication"
    
    - Les nombres sont codés en binaire flottant, avec un nombre limité de bits (ex : 32 ou 64).
    - Certaines fractions comme $0.1$ ont une écriture infinie en binaire.
    - L’ordinateur tronque ou arrondit, ce qui crée une erreur d’approximation.

### Comment gérer cela ?

De manière générale, il est donc fortement déconseillé de comparer deux flottants avec `==` :

```python
>>> a = 0.1 + 0.2
>>> a == 0.3
False  # à éviter ❌
```

À la place, on compare en autorisant une petite marge d’erreur (appelée **epsilon**) :

```python
>>> abs((0.1+0.2) - 0.3) < 1e-9
True  # ✅ plus fiable !
```

!!! info "À retenir"
    - Les ordinateurs ne peuvent représenter que des approximations de la plupart des réels.
    - Cela peut provoquer des erreurs dans les comparaisons ou les calculs en chaîne.
    - Il est conseillé d’utiliser `abs(a - b) < epsilon` pour comparer deux flottants.

---

## Représentation flottante des nombres réels 🌊

Pour coder un réel comme $31.4159$, un ordinateur utilise un système proche de la **notation scientifique** :

$$
31.4159 = 3.14159 \times 10^1
$$

On peut faire la même chose **en base 2** :

$$
13.5 = 1101,1_2 = 1.1011_2 \times 2^3
$$

Cette manière d’écrire un nombre permet de **représenter des valeurs très grandes ou très petites** avec un **nombre limité de bits**.


!!! definition "Définition : représentation en virgule flottante"
    Un **nombre en virgule flottante** est représenté sous la forme :

    $$
    \text{valeur} = \text{signe} \times \text{mantisse} \times 2^{\text{exposant}}
    $$

    ---

    Dans l'exemple précédent, on a :  

    - Signe : +
    - Mantisse : 1011
    - Exposant : 3


### Et dans la machine ? 💾

La plupart des langages (dont Python, Java, C…) utilisent la **norme IEEE 754**. Cette norme définit comment représenter les réels avec **32 bits (float)** ou **64 bits (double)**.

!!! definition "Float : réel codé en 32 bits (`float`)"
    - 1 bit pour le **signe** (0 ou 1)
    - 8 bits pour l’**exposant** (avec un biais)
    - 23 bits pour la **mantisse**

!!! definition "Double : réel codé en 64 bits (`double`)"
    - 1 bit pour le **signe** (0 ou 1)
    - 8 bits pour l’**exposant** (avec un biais)
    - 23 bits pour la **mantisse**

!!! info "À retenir"
    ⛔ Pas besoin de savoir **comment** convertir un réel en binaire sur 32 bits (c’est hors programme),  
    ✅ Mais il faut comprendre :

    - qu’un réel est **représenté en mantisse × 2 exposant**,
    - que cette écriture est **approximative** (limitée à 23 bits de précision),
    - et qu’elle **explique les erreurs** vues précédemment.


--- 

Nous avons désormais vu **comment représenter des entiers et des réels en machine**.  
Ces connaissances seront essentielles pour mieux comprendre les **calculs**, les **structures de données**, et la **programmation de bas niveau** !