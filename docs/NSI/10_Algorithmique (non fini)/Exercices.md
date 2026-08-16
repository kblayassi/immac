---
title: Exercices
weight: 4
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

## Coût d'un algorithme 

!!! exoordi "Exercice 1 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:" 
    En utilisant l'interface « Complexité », [disponible ici](https://www.cahier-nsi.fr/complexite/), classer les temps d'exécution des algorithmes suivants de 1 (rapide) à 7 (extrêmement lent).

    | Complexité | $n^2$ | $n!$ | $n \cdot \log(n)$ | $\log(n)$ | $2^n$ | $n$ | $n^{\frac{3}{2}}$ |
    |------------|-------|------|-------------------|-----------|-------|-----|-------------------|
    | Classement | ...... | ...... | ...... | ...... | ...... | ...... | ...... |

    ??? success "Correction"
        | Complexité | $n^2$ | $n!$ | $n \cdot \log(n)$ | $\log(n)$ | $2^n$ | $n$ | $n^{\frac{3}{2}}$ |
        |------------|-------|------|-------------------|-----------|-------|-----|-------------------|
        | Classement | 4 | 7 | 3 | 1 | 6 | 2 | 5 |

!!! exoordi "Exercice 2 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:" 
    On considère ici un problème de taille $n = 10^6$ (par exemple, un tableau avec un million de données), traité avec un ordinateur capable d'effectuer $10^9$ opérations élémentaires par seconde. Le tableau ci-dessous propose de calculer la durée d'exécution de cet algorithme, en fonction de sa complexité.

    On indique que $\log_2(n) = \dfrac{\log(n)}{\log(2)}$.

    | Nom de la complexité | Notation $O$ | Durée de l'exécution de l'algorithme | Commentaire |
    |----------------------|--------------|---------------------------------------|-------------|
    | Temps constant | $O(1)$ | 1 ns | Le temps d'exécution ne dépend pas de la taille $n$ du problème |
    | ...... | $O(\log_2(n))$ | $\dfrac{\log_2(10^6)}{10^9} \approx 20 \text{ ns}$ | Quasi instantané |
    | ...... | $O(n)$ | ...... | ...... |
    | Quasi linéaire | $O(n \cdot \log_2(n))$ | ...... | ...... |
    | ...... | $O(n^2)$ | ...... | ...... |
    | ...... | $O(n^3)$ | ...... | ...... |
    | Polynomiale | $O(n^k)$ avec $k > 3$ | Pour $k = 4$ : ...... | ...... |
    | ...... | $O(2^n)$ | ...... | ...... |
    | ...... | $O(n!)$ | ...... | ...... |

    1. Compléter la première colonne en recherchant sur le Web le nom de chaque complexité.

    2. Compléter enfin les deux dernières colonnes en calculant le temps d'exécution des différents algorithmes, avec chaque modèle de complexité.

    3. Un GPS muni d'un processeur capable d'effectuer 800 000 calculs élémentaires par seconde doit traiter une carte routière composée de 100 000 entrées. Quelles sont les complexités envisageables pour l'algorithme afin que les calculs de route puissent être menés en temps réel pendant le déplacement du véhicule ?

    ??? success "Correction"
        **2. Noms et durées d'exécution pour $n = 10^6$ et $10^9$ op/s :**

        | Nom de la complexité | Notation $O$ | Durée | Commentaire |
        |----------------------|--------------|-------|-------------|
        | Temps constant | $O(1)$ | 1 ns | Indépendant de $n$ |
        | Logarithmique | $O(\log_2(n))$ | $\approx 20$ ns | Quasi instantané |
        | Linéaire | $O(n)$ | $\dfrac{10^6}{10^9} = 1$ ms | Très rapide |
        | Quasi linéaire | $O(n \cdot \log_2(n))$ | $\approx 20$ ms | Rapide |
        | Quadratique | $O(n^2)$ | $\dfrac{10^{12}}{10^9} \approx 16$ min | Lent |
        | Cubique | $O(n^3)$ | $\dfrac{10^{18}}{10^9} \approx 31$ ans | Très lent |
        | Polynomiale ($k=4$) | $O(n^4)$ | $\dfrac{10^{24}}{10^9} \approx 3 \times 10^7$ ans | Inutilisable |
        | Exponentielle | $O(2^n)$ | Astronomique | Totalement inutilisable |
        | Factorielle | $O(n!)$ | Astronomique | Totalement inutilisable |

        **3.** Pour un GPS avec 800 000 op/s et $n = 100\,000$ entrées, le calcul doit s'effectuer en temps réel (moins d'une seconde). Les complexités envisageables sont :

        - $O(1)$, $O(\log_2(n))$, $O(n)$ et $O(n \cdot \log_2(n))$ sont acceptables.
        - $O(n^2)$ donne $\dfrac{(10^5)^2}{8 \times 10^5} \approx 12\,500$ s → trop lent.
        
        Seules les complexités **constante, logarithmique, linéaire et quasi-linéaire** sont envisageables.

!!! exoordi "Exercice 3 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:" 
    Reprenons les algorithmes 1 et 2 de calcul de $x^n$ : 

    ```text title="Algorithme 1"
    Algorithme : puissance1(x, n)
    p ← 1
    pour i allant de 1 à n
    p ← p * x
    renvoyer p
    ```

    ```text title="Algorithme 2"
    Algorithme : puissance2(x, n)
    p ← 1
    tant que n > 0
    si n est impair alors
        p ← p * x
    x ← x * x
    n ← n // 2
    renvoyer p
    ```

    1. Écrire une fonction Python `puissance1(x, n)` qui implémente l'algorithme 1 et qui renvoie la valeur de $x^n$.
    2. Écrire une fonction Python `puissance2(x, n)` qui implémente l'algorithme 2.
    3. En utilisant le module Python `time`, effectuer des mesures comparatives de durées d'exécution en calculant le nombre $2^{500\,000}$.
    4. Ces résultats sont-ils en accord avec la complexité attendue ?

    ??? success "Correction"
        **1.** `puissance1` suit l'algorithme 1 : une boucle de $n$ tours, chacun effectuant une multiplication → complexité $O(n)$ :

        ```python
        def puissance1(x, n):
            p = 1
            for i in range(1, n + 1):
                p = p * x
            return p
        ```

        **2.** `puissance2` suit l'algorithme 2 : à chaque tour on divise $n$ par 2 → le nombre de tours est $\log_2(n)$ → complexité $O(\log_2(n))$ :

        ```python
        def puissance2(x, n):
            p = 1
            while n > 0:
                if n % 2 != 0:  # si n est impair
                    p = p * x
                x = x * x
                n = n // 2
            return p
        ```

        **3.** Mesure comparative avec le module `time` :

        ```python
        import time

        t1 = time.time()
        puissance1(2, 500000)
        t2 = time.time()
        print("puissance1 :", t2 - t1, "s")

        t1 = time.time()
        puissance2(2, 500000)
        t2 = time.time()
        print("puissance2 :", t2 - t1, "s")
        ```

        `puissance2` est nettement plus rapide que `puissance1`.

        **4.** Oui, les résultats sont en accord avec la complexité attendue :

        - `puissance1` est en $O(n)$ : le nombre de multiplications est exactement $n$.
        - `puissance2` est en $O(\log_2(n))$ : le nombre de tours de boucle est $\lfloor \log_2(n) \rfloor$.

        Pour $n = 500\,000$, `puissance2` effectue seulement $\approx 19$ tours contre $500\,000$ pour `puissance1`, ce qui explique la très grande différence de durée observée.

!!! exoordi "Exercice 4 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:" 
    Pour résoudre un problème algorithmique, qui traite un tableau de taille $n$, Arthur et Maxime ont implémenté un algorithme dans leur langage préféré.

    - Le programme de **Maxime** fait exactement $2n^2$ opérations élémentaires. Il le fait tourner sur sa super machine, capable d'effectuer **20 milliards** d'opérations élémentaires par seconde.
    - **Arthur**, quant à lui, propose un programme qui ne fait pas plus de $50 \cdot n \cdot \log_2(n)$ opérations élémentaires. Il le fait tourner en salle de TP tout en regardant YouTube, sa machine étant alors **20 fois plus lente** que celle de Maxime.

    Répondre aux questions suivantes : 

    1. En tenant compte de la complexité (ou coût) de chaque programme et de la performance des machines, émettre une conjecture sur la durée d'exécution la plus courte.
    2.  Exprimer la durée d'exécution d'un programme en fonction du nombre d'opérations $m$ et du nombre $N$ d'opérations par seconde.
    3. Aller à l'adresse [lycee.editions-bordas.fr/cahier-NSI1re](http://lycee.editions-bordas.fr/cahier-NSI1re), puis cliquer sur « Éditeur Python ».
    Vérifier la conjecture faite à la question 2 en proposant un programme en Python qui renvoie le rang $n$ à partir duquel une solution l'emporte sur l'autre, en termes de temps de calcul.

        > **Aide** : On peut utiliser la fonction `math.log2(x)` du module `math`, pour calculer $50 \cdot n \cdot \log_2(n)$.
    4. Il est possible d'illustrer ce résultat par les graphiques ci-dessous, représentant la durée d'exécution en fonction de $n$ et obtenus à la calculatrice. Redonner chaque courbe à son propriétaire et conclure.

    ??? success "Correction"
        **1.** Pour les petites valeurs de $n$, Maxime (complexité $O(n^2)$) peut être plus rapide grâce à sa machine plus puissante. Mais pour les grandes valeurs de $n$, Arthur (complexité $O(n \cdot \log_2(n))$) devrait l'emporter malgré une machine 20 fois plus lente.

        **2.** La durée d'exécution est :

        $$t = \frac{m}{N}$$

        - Durée pour Maxime : $t_M = \dfrac{2n^2}{20 \times 10^9}$
        - Durée pour Arthur : $t_A = \dfrac{50 \cdot n \cdot \log_2(n)}{10^9}$

        **3.** Programme Python pour trouver le rang $n$ à partir duquel Arthur l'emporte :

        ```python
        import math

        n = 1
        while (2 * n**2) / (20e9) <= (50 * n * math.log2(n)) / (1e9):
            n += 1
        print("Arthur l'emporte à partir de n =", n)
        ```

        Arthur l'emporte à partir d'un certain rang $n$ (aux alentours de $n \approx 1000$).

        **4.** Sur le graphique :
        - La courbe **noire** (croissance plus lente) correspond à **Arthur** ($O(n \cdot \log_2(n))$).
        - La courbe **rouge** (croissance plus rapide) correspond à **Maxime** ($O(n^2)$).

        **Conclusion** : Même avec une machine plus lente, l'algorithme quasi-linéaire d'Arthur finit par surpasser l'algorithme quadratique de Maxime dès que $n$ devient suffisamment grand.

## Parcours de tableau

!!! exopapier "Exercice 5 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Théo a écrit un algorithme de recherche qui doit renvoyer « Vrai » si la valeur cherchée est présente dans la liste donnée, et « Faux » sinon.

    **Trouver l'erreur qui s'est glissée dans son algorithme !**

    ```linenums="1"
    Algorithme : présent(liste, valeur)
    trouvé ← Faux
    i ← 0
    tant que trouvé = Faux et i < longueur(liste)
        si liste[i] = valeur alors
            trouvé ← Vrai
    renvoyer trouvé
    ```

    ??? success "Correction"
        L'erreur se trouve à la ligne 04 : la variable `i` n'est jamais incrémentée, ce qui provoque une boucle infinie. Il faut ajouter `i ← i + 1` à la fin du bloc de la boucle :

        ```linenums="1"
        Algorithme : présent(liste, valeur)
        trouvé ← Faux
        i ← 0
        tant que trouvé = Faux et i < longueur(liste)
            si liste[i] = valeur alors
                trouvé ← Vrai
            i ← i + 1
        renvoyer trouvé
        ```

!!! exoordi "Exercice 6 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    L'application YouTube Studio propose un traitement statistique des connexions à une chaîne YouTube : nombre de vues, nombre d'abonnés, durée de visionnage, etc.

    1. Aller à l'adresse [lycee.editions-bordas.fr/cahier-NSI1re](http://lycee.editions-bordas.fr/cahier-NSI1re), puis « Séquence 9 » et enfin « Éditeur Python pour l'exercice 6 » ou récupérer les deux fichiers `stats.py` et `data.csv`. Le fichier `data.csv` contient le nombre de vues journalières d'une chaîne YouTube réelle depuis sa création, le 2 septembre 2017.
    2.  À l'aide de la fonction `affiche_points()` ou de l'application « Modélisation » du site [lycee.editions-bordas.fr/cahier-NSI1re](http://lycee.editions-bordas.fr/cahier-NSI1re), afficher le nombre de vues en fonction du temps sur un graphique.

        YouTube propose de calculer le nombre de vues moyen au cours des 28 derniers jours, des 90 derniers jours ou depuis toujours.

    3. Écrire une fonction Python `moyenne_vues(nb_jours)` qui renvoie le nombre moyen journalier de vues depuis `nb_jours`.

    4. Que renvoie l'appel `moyenne_vues(28)` ?

    ??? success "Correction"
        **3.**
        ```python
        def moyenne_vues(nb_jours):
            total = 0
            for i in range(len(data) - nb_jours, len(data)):
                total += data[i]
            return total / nb_jours
        ```

        **4.** `moyenne_vues(28)` renvoie la moyenne journalière des vues sur les 28 derniers jours enregistrés dans le fichier `data.csv`.

!!! exoordi "Exercice 7 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Soit `L` une liste d'entiers de taille $n$ qui représentent des températures recueillies par une station météo. Sans utiliser les fonctions `min()` et `max()` de Python :

    1. Écrire une fonction Python `maximum(L)` qui renvoie la valeur maximale des températures de la liste `L`.

    2. Écrire une fonction Python `minimum(L)` qui renvoie la valeur minimale de la liste `L`.

    3. Écrire une fonction Python `extremum(L)` qui renvoie le p-uplet `(maxi, mini, moyenne)` constitué des valeurs maximum et minimum et de la moyenne des températures de la liste `L`.

    4. La fonction Python `extremum(L)` écrite à la question précédente fait-elle appel aux fonctions `maximum(L)` et `minimum(L)` des questions 1 et 2 ? Si non, la modifier pour les réutiliser.

    ??? success "Correction"
        **1.**
        ```python
        def maximum(L):
            maxi = L[0]
            for val in L:
                if val > maxi:
                    maxi = val
            return maxi
        ```

        **2.**
        ```python
        def minimum(L):
            mini = L[0]
            for val in L:
                if val < mini:
                    mini = val
            return mini
        ```

        **3.**
        ```python
        def extremum(L):
            maxi = maximum(L)
            mini = minimum(L)
            moyenne = sum(L) / len(L)
            return (maxi, mini, moyenne)
        ```

        **4.** Dans la version ci-dessus, `extremum(L)` réutilise bien `maximum(L)` et `minimum(L)`. Si ce n'était pas le cas, il suffit de les appeler explicitement comme montré ci-dessus.

!!! exoordi "Exercice 8 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Écrire une fonction Python `comptage(tableau, lettre)` qui implémente l'algorithme de comptage suivant renvoyant le nombre d'occurrences de `lettre` dans le tableau.

        ```text linenums="1" title="Algorithme 1"
        Données :
        - L : un tableau de lettres 
        - lettre : une lettre recherchée

        Début
            occurence ← 0
            Pour chaque lettre du tableau :
                Si la lettre observée est égale à la lettre recherchée :
                    occurence ← occurence + 1
                Fin Si
            Fin Pour
            Renvoyer occurence.
        Fin

        Résultat : 
        - le nombre d'apparitions de la lettre recherchée dans le tableau
        ```

    2. Écrire une fonction Python `recherche(tableau, lettre)` qui implémente l'algorithme ci-dessous renvoyant `True` si la lettre cherchée est présente dans le tableau.

        ```text linenums="1" title="Algorithme 2"
        Données :
        - L : un tableau de lettres
        - lettre : une lettre recherchée

        Début
            i ← 0
            trouve ← Faux

            Tant que i est inférieur à la longueur de L et que trouve est égal à Faux :
                Si la lettre située à la position i est égale à la lettre recherchée :
                      trouve ← Vrai
                Sinon :
                      i ← i + 1
                Fin Si
            Fin Tant que

            Renvoyer trouve.
        Fin

        Résultat :
        - Vrai si la lettre recherchée est présente dans le tableau
        - Faux sinon
        ```

    3. Rappeler la différence essentielle en termes de parcours entre ces deux algorithmes.

    4. Modifier la fonction `recherche(tableau, lettre)` pour qu'elle renvoie l'indice de la première position de la lettre rencontrée ou la valeur $-1$ si la valeur est absente du tableau.

    ??? success "Correction"
        **1.**
        ```python
        def comptage(tableau, lettre):
            count = 0
            for elem in tableau:
                if elem == lettre:
                    count += 1
            return count
        ```

        **2.**
        ```python
        def recherche(tableau, lettre):
            for elem in tableau:
                if elem == lettre:
                    return True
            return False
        ```

        **3.** L'algorithme de **comptage** effectue un parcours **complet** du tableau (il doit compter toutes les occurrences). L'algorithme de **recherche** effectue un parcours **partiel** : il s'arrête dès qu'il trouve la valeur cherchée.

        **4.**
        ```python
        def recherche(tableau, lettre):
            for i in range(len(tableau)):
                if tableau[i] == lettre:
                    return i
            return -1
        ```

!!! exoordi "Exercice 9 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Le chiffre de César est une méthode de chiffrement par substitution monoalphabétique : chaque lettre du « texte clair » est remplacée par une autre pour former le « texte chiffré ». Cette méthode n'est plus employée car elle ne résiste pas à une analyse des fréquences, ce qui en fait un « chiffre » peu sûr.

    L'analyse fréquentielle consiste à comparer la valeur des fréquences d'apparition des lettres employées dans le texte chiffré avec les fréquences d'apparition des lettres dans les langues vivantes classiques. Par déduction, on peut déchiffrer le « texte chiffré ».

    Soit deux chaînes de caractère nommées `chaine` et `lettre_alphabet`.

    1. Aller à l'adresse [lycee.editions-bordas.fr/cahier-NSI1re](http://lycee.editions-bordas.fr/cahier-NSI1re), « Séquence 9 » et enfin « Éditeur Python pour l'exercice 9 » ou récupérer le fichier `fable.py`. Écrire une fonction Python `compter(chaine, lettre_alphabet)` qui renvoie le nombre d'occurrences de `lettre_alphabet` dans `chaine`.

    2. Utiliser cette fonction pour trouver le nombre d'occurrences de la lettre « e » dans la fable « Le corbeau et le renard » de Jean de La Fontaine. Les lettres é et è ont déjà été remplacées par des « e ».

    3. Procéder de même avec les 4 autres lettres les plus fréquentes de la langue française : a, s, i et n.

    4. Les lettres les plus fréquentes seront-elles les mêmes dans un texte en langue anglaise ? Rechercher sur le Web les deux lettres les plus fréquentes de la langue anglaise.

    5. Écrire une fonction Python `analyse(chaine)` qui renvoie un dictionnaire composé des clés et des valeurs suivantes : les clés sont les différentes lettres de l'alphabet du texte et les valeurs associées seront les fréquences d'apparition de chacune des lettres.

    6. Écrire une fonction Python `dechiffre(texte_chiffre, chaine)` qui déchiffre le texte chiffré en utilisant une analyse fréquentielle de la variable `chaine` de la question 1.

    ??? success "Correction"
        1. Voici le programme :
   
            ```python
            def compter(chaine, lettre_alphabet):
                count = 0
                for lettre in chaine:
                    if lettre == lettre_alphabet:
                        count += 1
                return count
            ```

        2. On appelle `compter(fable, 'e')` — le résultat dépend du texte fourni dans `fable.py`.

        3. On appelle successivement `compter(fable, 'a')`, `compter(fable, 's')`, `compter(fable, 'i')`, `compter(fable, 'n')`.

        4. Non, les fréquences varient selon la langue. En anglais, les deux lettres les plus fréquentes sont **e** et **t**.

        5. Voici le programme : 
   
            ```python
            def analyse(chaine):
                frequences = {}
                for lettre in chaine:
                    if lettre.isalpha():
                        lettre = lettre.lower()
                        if lettre in frequences:
                            frequences[lettre] += 1
                        else:
                            frequences[lettre] = 1
                total = sum(frequences.values())
                for lettre in frequences:
                    frequences[lettre] /= total
                return frequences
            ```

        6. Voici le programme : 
   
            ```python
            def dechiffre(texte_chiffre, chaine):
                freq_chiffre = analyse(texte_chiffre)
                freq_ref = analyse(chaine)
                # Trier les lettres par fréquence décroissante
                lettres_chiffre = sorted(freq_chiffre, key=freq_chiffre.get, reverse=True)
                lettres_ref = sorted(freq_ref, key=freq_ref.get, reverse=True)
                # Créer la table de correspondance
                table = {}
                for i in range(len(lettres_chiffre)):
                    table[lettres_chiffre[i]] = lettres_ref[i]
                # Déchiffrer
                resultat = ''
                for lettre in texte_chiffre:
                    if lettre.lower() in table:
                        resultat += table[lettre.lower()]
                    else:
                        resultat += lettre
                return resultat
            ```
