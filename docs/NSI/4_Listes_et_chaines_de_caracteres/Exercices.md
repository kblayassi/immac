---
title: Exercices
weight: 6
---

# Exercices 

Vous trouverez ci-dessous les exercices de cette séquence.

- Les exercices marqués avec :fontawesome-solid-pencil: se réalisent **sans ordinateur**.  
  Ceux indiqués par :fontawesome-solid-laptop: se font **directement dans la page** : l'éditeur exécute du vrai Python dans votre navigateur, et votre travail est conservé d'une séance à l'autre.

- Le **niveau de difficulté** est indiqué par des étoiles :  
    <ul style="list-style: none;">
        <li>:fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star: → Exercices pour **s'approprier les notions**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star: → Exercices pour **renforcer vos compétences**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star: → Exercices pour vous **challenger** et tester vos acquis.</li>
    </ul>

!!! info "Mode d'emploi des éditeurs"
    - **Exécuter** (ou ++ctrl+enter++) lance votre programme ; l'affichage apparaît dans la console juste en dessous.
    - **Valider** vérifie votre code sur plusieurs cas : tant qu'une ligne est rouge, c'est qu'un cas ne passe pas.
    - :fontawesome-solid-lightbulb: affiche la correction, :fontawesome-solid-arrow-rotate-right: remet le code de départ, :fontawesome-solid-trash: vide l'éditeur.
    - Le tout premier lancement demande quelques secondes : Python doit d'abord être téléchargé.

Les corrections sont accessibles à tout moment, mais elles ne doivent être consultées **qu'après avoir vraiment cherché** — et, pour les travaux notés, qu'après validation de votre production par l'enseignant.

---

## Les listes : principes de base

!!! exopapier "Exercice 1 - Lire une liste - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    **1.** On considère la liste suivante :

    ```python
    L = [5, 12, 9, 4]
    ```

    Donner la valeur de `L[0]`, de `L[2]`, de `L[-1]` et de `len(L)`.

    **2.** Que se passerait-il si l'on écrivait `L[4]` ?

    **3.** Parmi les écritures suivantes, lesquelles correspondent à des **listes** ?

    ```python
    a = (1, 2, 3)
    b = [1, 2, 3]
    c = []
    d = "1, 2, 3"
    e = [4]
    ```

    ??? success "Correction"
        **1.** `L[0]` vaut `5`, `L[2]` vaut `9`, `L[-1]` vaut `4` (le dernier élément) et `len(L)` vaut `4`.

        **2.** La liste contient 4 éléments, donc ses indices valides vont de 0 à **3**. L'écriture `L[4]` provoquerait une erreur : `IndexError: list index out of range`.

        **3.** Seules `b`, `c` et `e` sont des listes — reconnaissables à leurs **crochets**.

        - `a` utilise des parenthèses : c'est un p-uplet, que nous découvrirons plus tard ;
        - `c` est une liste **vide**, ce qui est parfaitement valide ;
        - `d` est une chaîne de caractères qui *ressemble* à une liste, mais n'en est pas une.

!!! exoordi "Exercice 2 - Créer et modifier - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    En suivant les consignes du code de départ, créez la liste des notes, corrigez-en une, ajoutez-en une, puis affichez ce qu'il faut.

    {{ python_playground(
      key="ch4-l1-creer",
      hauteur="300px",
      example_file="files/NSI/Python/exemples/ch4/l1_creer.py",
      solution_file="files/NSI/Python/.corrections/ch4/l1_creer_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l1_creer_tests.py"
    ) }}

    ⚠️ Attention : la **troisième** note n'est pas `notes[3]` !

!!! exopapier "Exercice 3 - Prévoir sans exécuter - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    **1.** Sans exécuter le code, indiquer ce qui est affiché :

    ```python linenums="1"
    L = [3, 6, 9]
    L[1] = 100
    L.append(12)
    print(L)
    print(len(L))
    ```

    **2.** Vrai ou faux ?

    1. Une liste est immuable.
    2. Les indices d'une liste commencent à 0.
    3. Une liste peut être modifiée après sa création.
    4. Tous les éléments d'une liste doivent être du même type.

    ??? success "Correction"
        **1.** Le programme affiche `[3, 100, 9, 12]`, puis `4`.

        **2.**

        1. **Faux** : c'est même le contraire, une liste est modifiable. Ce sont les *chaînes de caractères* qui sont immuables.
        2. **Vrai**.
        3. **Vrai** : on peut modifier un élément, en ajouter, en supprimer.
        4. **Faux** en Python, qui accepte les listes hétérogènes... mais **vrai dans le cadre du programme de NSI**, où l'on n'utilise que des listes homogènes.

!!! exoordi "Exercice 4 - Somme et moyenne - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez les fonctions `somme` et `moyenne`, **sans utiliser** `sum()`.

    ⚠️ `moyenne` doit obligatoirement appeler `somme` : on ne recopie pas un code que l'on a déjà écrit.

    {{ python_playground(
      key="ch4-l1-somme",
      hauteur="280px",
      example_file="files/NSI/Python/exemples/ch4/l1_somme.py",
      solution_file="files/NSI/Python/.corrections/ch4/l1_somme_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l1_somme_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        Pensez au schéma de l'**accumulateur** : une variable préparée *avant* la boucle, qui évolue *dans* la boucle, et que l'on renvoie *après*. Attention à l'initialiser au bon endroit — et à la bonne valeur.

!!! exopapier "Exercice 5 - Dérouler une boucle - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    **1.** On donne le script suivant :

    ```python linenums="1"
    L = [2, 4, 6, 8]
    s = 0
    for x in L:
        s = s + x
    print(s)
    ```

    Qu'affiche-t-il ? Détailler l'évolution de la variable `s` à chaque tour de boucle.

    **2.** Donner le contenu des listes `M` et `N` obtenues :

    ```python linenums="1"
    L = [1, -2, 3, -4]
    M = [x * 2 for x in L]
    N = [x for x in L if x > 0]
    ```

    **3.** Écrire, en compréhension, la liste des cubes des entiers de 1 à 5.

    ??? success "Correction"
        **1.** Le programme affiche `20`.

        | Tour | Valeur de `x` | Nouvelle valeur de `s` |
        |:---:|:---:|:---:|
        | départ | — | `0` |
        | 1 | `2` | `0 + 2 = 2` |
        | 2 | `4` | `2 + 4 = 6` |
        | 3 | `6` | `6 + 6 = 12` |
        | 4 | `8` | `12 + 8 = 20` |

        **2.** `M` vaut `[2, -4, 6, -8]` : chaque élément est doublé, la liste garde donc la même longueur.

        `N` vaut `[1, 3]` : seuls les éléments strictement positifs sont conservés, la liste est plus courte.

        **3.** `cubes = [i ** 3 for i in range(1, 6)]`, ce qui donne `[1, 8, 27, 64, 125]`.

!!! exoordi "Exercice 6 - Filtrer une liste, deux fois - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez deux fois la même fonction : d'abord avec une boucle et `append()`, puis en une seule ligne par compréhension.

    ⚠️ Ces fonctions doivent renvoyer un **nouveau** tableau, sans modifier celui qu'elles reçoivent.

    {{ python_playground(
      key="ch4-l1-pairs",
      hauteur="300px",
      example_file="files/NSI/Python/exemples/ch4/l1_pairs.py",
      solution_file="files/NSI/Python/.corrections/ch4/l1_pairs_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l1_pairs_tests.py"
    ) }}

    💡 Un nombre est pair lorsque le reste de sa division par 2 est nul : `element % 2 == 0`.

---

## Matrices et mémoire

!!! exopapier "Exercice 7 - Se repérer dans une matrice - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la matrice suivante :

    ```python linenums="1"
    M = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
    ]
    ```

    1. Combien `M` compte-t-elle de lignes ? de colonnes ?
    2. Que valent `len(M)` et `len(M[0])` ?
    3. Que vaut `M[1][2]` ? Et `M[2][1]` ?
    4. Quelle écriture permet d'atteindre la valeur `10` ?
    5. Donner la valeur finale de `M[0]` après l'instruction `M[0][1] = 99`.

    ??? success "Correction"
        1. `M` compte **4 lignes** et **3 colonnes**.
        2. `len(M)` vaut `4` : c'est le nombre de lignes. `len(M[0])` vaut `3` : c'est la longueur d'une ligne, donc le nombre de colonnes.
        3. `M[1][2]` vaut `6` (ligne 1, colonne 2) et `M[2][1]` vaut `8` (ligne 2, colonne 1). L'ordre compte !
        4. `10` se trouve à la ligne 3, colonne 0 : on écrit `M[3][0]`.
        5. `M[0]` vaut `[1, 99, 3]`.

!!! exoordi "Exercice 8 - Travailler sur une matrice - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Écrivez `somme_matrice(M)`, qui additionne toutes les valeurs de la matrice.
    2. Écrivez `identite(n)`, qui construit la matrice identité de taille $n \times n$ — des 0 partout, sauf des 1 sur la diagonale — **par compréhension**.

    {{ python_playground(
      key="ch4-l2-matrice",
      hauteur="380px",
      example_file="files/NSI/Python/exemples/ch4/l2_matrice.py",
      solution_file="files/NSI/Python/.corrections/ch4/l2_matrice_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l2_matrice_tests.py"
    ) }}

    ??? tip "Coup de pouce pour la question 2"
        Une matrice se construit par **compréhensions imbriquées** : une pour les lignes, une pour les colonnes.

        ```python
        [[ ... for j in range(n)] for i in range(n)]
        ```

        Il reste à décider ce que vaut la case `(i, j)` : `1` lorsque `i == j`, `0` sinon. L'écriture `1 if i == j else 0` peut vous aider.

!!! exopapier "Exercice 9 - Le piège de la copie - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le code suivant :

    ```python linenums="1"
    L = [1, 2, 3]
    M = L
    M[0] = 100
    print(L)
    ```

    1. Donner la valeur affichée.
    2. Expliquer ce résultat en une ou deux phrases.
    3. Proposer trois façons de corriger le programme pour que `L` reste inchangée.
    4. Le même problème peut-il se produire avec des chaînes de caractères ? Justifier.

    ??? success "Correction"
        1. Le programme affiche `[100, 2, 3]`.

        2. L'instruction `M = L` ne **copie pas** la liste : elle donne un second nom à la **même** liste en mémoire. `L` et `M` sont des **alias**, et toute modification faite à travers l'un est visible à travers l'autre.

        3. Il faut demander explicitement une copie :

            ```python linenums="1"
            M = L.copy()
            # ou
            M = L[:]
            # ou
            M = list(L)
            ```

        4. **Non.** Une chaîne de caractères est **immuable** : on ne peut pas en modifier le contenu. L'écriture `M[0] = "A"` provoquerait une erreur, et toute « modification » (comme `M = M + "!"`) fabrique en réalité une **nouvelle** chaîne, laissant l'originale intacte.

!!! exoordi "Exercice 10 - Ne pas abîmer ce qu'on reçoit - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Ces deux fonctions doivent renvoyer un **nouveau** tableau, sans jamais modifier celui qu'elles reçoivent en paramètre.

    {{ python_playground(
      key="ch4-l2-copie",
      hauteur="320px",
      example_file="files/NSI/Python/exemples/ch4/l2_copie.py",
      solution_file="files/NSI/Python/.corrections/ch4/l2_copie_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l2_copie_tests.py"
    ) }}

    ⚠️ Le piège se cache dans `ajouter_note` : écrire directement `notes.append(note)` modifierait le tableau de l'appelant, car c'est **son** tableau que la fonction a reçu, et non une copie.

!!! exopapier "Exercice 11 - `==` ou `is` ? - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On exécute les instructions suivantes :

    ```python linenums="1"
    L = [1, 2, 3]
    M = L
    N = [1, 2, 3]
    ```

    Indiquer, en justifiant, ce qu'affiche chacune de ces lignes :

    1. `print(L == M)`
    2. `print(L is M)`
    3. `print(L == N)`
    4. `print(L is N)`
    5. `print(id(L) == id(M))`

    ??? success "Correction"
        1. `True` : `L` et `M` ont le même **contenu**.
        2. `True` : c'est en plus le **même objet** en mémoire — `M = L` n'a fait que donner un second nom à la liste.
        3. `True` : `L` et `N` ont bien le même contenu, élément par élément.
        4. `False` : ce sont deux listes **distinctes**, créées séparément, même si elles se ressemblent.
        5. `True` : `id()` renvoie l'identifiant de l'objet en mémoire ; comme `L` et `M` désignent le même objet, leurs identifiants sont égaux. C'est exactement ce que teste `is`.

        À retenir : `==` compare les **contenus**, `is` compare les **identités**. Dans vos programmes, c'est presque toujours `==` qu'il faut utiliser.

!!! exoordi "Exercice 12 - Copier une matrice - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    **1.** Exécutez d'abord le code de départ : on y copie une matrice avec `copy()`, puis on modifie la copie. Observez ce qui arrive à l'original.

    **2.** Écrivez `copier_matrice(M)`, qui renvoie une copie **vraiment** indépendante.

    {{ python_playground(
      key="ch4-l2-copie-matrice",
      hauteur="340px",
      example_file="files/NSI/Python/exemples/ch4/l2_copie_matrice.py",
      solution_file="files/NSI/Python/.corrections/ch4/l2_copie_matrice_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l2_copie_matrice_tests.py"
    ) }}

    ??? success "Correction de la question 1"
        L'original est modifié lui aussi ! `copy()` recopie bien la liste **extérieure**, mais pas les listes qu'elle contient : les **lignes** restent partagées entre les deux matrices. On parle de **copie superficielle**.

        Pour une copie complète, il faut recopier chaque ligne, une par une.

---

## Premiers algorithmes

!!! exopapier "Exercice 13 - Total ou partiel ? - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Pour chacune des questions suivantes, portant sur un tableau de 1000 notes, indiquer si l'on peut **s'arrêter avant la fin** du tableau ou s'il faut **tout lire**. Justifier en une phrase.

    1. Quelqu'un a-t-il eu 20 ?
    2. Combien d'élèves ont eu 20 ?
    3. Quelle est la meilleure note ?
    4. Quelle est la position du premier 20 ?
    5. Quelle est la moyenne de la classe ?
    6. Y a-t-il au moins une note en dessous de 5 ?

    ??? success "Correction"
        | Question | Parcours | Pourquoi |
        |:---|:---:|:---|
        | 1 | **partiel** | dès qu'on trouve un 20, la réponse est connue |
        | 2 | **total** | une case non lue pourrait encore contenir un 20 |
        | 3 | **total** | le record peut se trouver dans la dernière case |
        | 4 | **partiel** | seule la *première* occurrence nous intéresse |
        | 5 | **total** | toutes les notes interviennent dans la somme |
        | 6 | **partiel** | une seule note en dessous de 5 suffit à répondre « oui » |

        ⚠️ Dans tous les cas, si la valeur cherchée est **absente**, même un parcours partiel devra lire l'intégralité du tableau pour pouvoir l'affirmer.

!!! exoordi "Exercice 14 - Rechercher une occurrence - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Écrivez la fonction `recherche`, qui indique si une valeur figure dans un tableau.

    ⚠️ Interdit d'utiliser l'opérateur `in` : c'est justement ce que vous êtes en train de reprogrammer !

    {{ python_playground(
      key="ch4-l3-recherche",
      hauteur="220px",
      example_file="files/NSI/Python/exemples/ch4/l3_recherche.py",
      solution_file="files/NSI/Python/.corrections/ch4/l3_recherche_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l3_recherche_tests.py"
    ) }}

!!! exopapier "Exercice 15 - Trouver l'erreur - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    **1.** Théo a écrit cette fonction de recherche. Elle ne fonctionne pas.

    ```python linenums="1"
    def recherche(tableau, valeur):
        for element in tableau:
            if element == valeur:
                return True
            else:
                return False
    ```

    1. Que renvoie `recherche([12, 15, 8], 12)` ?
    2. Que renvoie `recherche([12, 15, 8], 15)` ?
    3. Expliquer l'erreur, puis corriger la fonction.

    **2.** Léa, elle, a écrit son algorithme en langage naturel :

    ```text linenums="1"
    Algorithme present

    Entrées :
        tableau, un tableau de valeurs
        valeur, la valeur recherchée

    trouve ← Faux
    i ← 0
    Tant que trouve = Faux et i < longueur(tableau) :
        Si tableau[i] = valeur :
            trouve ← Vrai
    Fin Tant que

    Renvoyer trouve
    ```

    Quelle instruction manque-t-il ? Que se passe-t-il si on exécute l'algorithme tel quel ?

    ??? success "Correction"
        **1.**

        1. `True` : la valeur cherchée est en première position, l'algorithme tombe juste... par chance.
        2. `False` ! Au premier tour, `12 != 15`, donc le `else` s'exécute et la fonction renvoie immédiatement `False`. Le 15 ne sera jamais examiné.
        3. Le `return False` ne doit **pas** se trouver dans la boucle : on ne peut affirmer qu'une valeur est absente qu'après avoir examiné **toutes** les cases. Pour répondre « oui », une case suffit ; pour répondre « non », il faut les avoir toutes vues.

            ```python linenums="1"
            def recherche(tableau, valeur):
                for element in tableau:
                    if element == valeur:
                        return True
                return False
            ```

        **2.** Il manque l'incrémentation `i ← i + 1` à la fin du bloc de la boucle. Sans elle, `i` vaut toujours 0 : on relit indéfiniment la même case et, si la valeur ne s'y trouve pas, l'algorithme ne s'arrête **jamais**. C'est une **boucle infinie**.

!!! exoordi "Exercice 16 - Où, et combien de fois ? - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Écrivez `premier_indice`, qui renvoie l'indice de la première occurrence d'une valeur, ou `-1` si elle est absente.
    2. Écrivez `indices_occurrences`, qui renvoie le tableau des indices de **toutes** les occurrences.

    {{ python_playground(
      key="ch4-l3-indices",
      hauteur="340px",
      example_file="files/NSI/Python/exemples/ch4/l3_indices.py",
      solution_file="files/NSI/Python/.corrections/ch4/l3_indices_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l3_indices_tests.py"
    ) }}

    💡 L'une de ces deux fonctions effectue un parcours **partiel**, l'autre un parcours **total**. Sauriez-vous dire laquelle, et pourquoi ?

!!! exopapier "Exercice 17 - Dérouler la recherche d'un maximum - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On applique l'algorithme `maximum` du cours au tableau `[7, 3, 12, 9, 15, 2]`.

    **1.** Recopier et compléter le tableau d'évolution :

    | Élément lu | Valeur de `maxi` |
    |:---:|:---:|
    | départ | ...... |
    | `7` | ...... |
    | `3` | ...... |
    | `12` | ...... |
    | `9` | ...... |
    | `15` | ...... |
    | `2` | ...... |

    **2.** Combien de fois la variable `maxi` a-t-elle changé de valeur ?

    **3.** Marc propose d'initialiser `maxi` à `0` plutôt qu'à `tableau[0]`. Donner un tableau de températures pour lequel sa version renvoie un résultat **faux**.

    **4.** Que se passe-t-il si l'on applique l'algorithme à un tableau **vide** ?

    ??? success "Correction"
        **1.**

        | Élément lu | Valeur de `maxi` |
        |:---:|:---:|
        | départ | `7` |
        | `7` | `7` |
        | `3` | `7` |
        | `12` | `12` |
        | `9` | `12` |
        | `15` | `15` |
        | `2` | `15` |

        L'algorithme renvoie donc `15`.

        **2.** Deux fois : lors de la lecture de `12`, puis de `15`.

        **3.** Avec `[-3, -7, -1]`, la version de Marc renvoie `0`, alors que le maximum vaut `-1`. Pire : `0` ne figure même pas dans le tableau ! C'est pourquoi on part **toujours** du premier élément.

        **4.** L'instruction `maxi = tableau[0]` provoque une erreur `IndexError` : un tableau vide n'a pas de premier élément. Chercher un maximum n'a d'ailleurs aucun sens dans ce cas.

!!! exoordi "Exercice 18 - Station météo - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Soit un tableau de températures relevées par une station météo. **Sans utiliser** `min()` ni `max()` :

    1. Écrivez `maximum(tableau)`, qui renvoie la température la plus élevée.
    2. Écrivez `minimum(tableau)`, qui renvoie la plus basse.
    3. Écrivez `extremum(tableau)`, qui renvoie la liste `[maximum, minimum, moyenne]`. Cette fonction doit **obligatoirement appeler** les deux précédentes.

    {{ python_playground(
      key="ch4-l3-extremum",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch4/l3_extremum.py",
      solution_file="files/NSI/Python/.corrections/ch4/l3_extremum_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l3_extremum_tests.py"
    ) }}

    ⚠️ Les températures peuvent être **négatives** : c'est le piège de l'exercice précédent.

!!! exopapier "Exercice 19 - Écrire un algorithme - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On souhaite écrire un algorithme `compter` qui renvoie le nombre d'occurrences d'une valeur dans un tableau.

    **1.** Recopier et compléter cet algorithme en langage naturel :

    ```text linenums="1"
    Algorithme compter

    Entrées :
        tableau, un tableau de valeurs
        valeur, la valeur recherchée

    compteur ← ......
    Pour chaque élément du tableau :
        Si ...... :
            ......
        Fin Si
    Fin Pour

    Renvoyer ......

    Sortie :
        le nombre d'occurrences de valeur dans tableau
    ```

    **2.** Traduire cet algorithme en Python.

    **3.** S'agit-il d'un parcours total ou partiel ? Justifier.

    **4.** On applique l'algorithme au tableau `[7, 3, 7, 7, 1]` avec la valeur `7`. Donner la valeur du compteur après chaque tour de boucle.

    ??? success "Correction"
        **1.**

        ```text linenums="1"
        compteur ← 0
        Pour chaque élément du tableau :
            Si élément = valeur :
                compteur ← compteur + 1
            Fin Si
        Fin Pour

        Renvoyer compteur
        ```

        **2.**

        ```python linenums="1"
        def compter(tableau, valeur):
            compteur = 0
            for element in tableau:
                if element == valeur:
                    compteur = compteur + 1
            return compteur
        ```

        **3.** C'est un parcours **total** : pour être sûr de n'oublier aucune occurrence, il faut examiner toutes les cases, y compris la dernière.

        **4.** `0` (départ), puis `1`, `1`, `2`, `3`, `3`. La fonction renvoie `3`.

!!! exoordi "Exercice 20 - Statistiques d'une chaîne vidéo - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Le tableau `vues` contient le nombre de vues quotidiennes d'une chaîne vidéo, du jour le plus ancien au plus récent.

    1. Écrivez `moyenne_vues(donnees, nb_jours)`, qui renvoie le nombre moyen de vues sur les `nb_jours` **derniers** jours — c'est exactement ce que calcule un tableau de bord d'audience.
    2. Écrivez `meilleur_jour(donnees)`, qui renvoie l'**indice** du jour record.

    {{ python_playground(
      key="ch4-l3-moyenne-vues",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch4/l3_moyenne_vues.py",
      solution_file="files/NSI/Python/.corrections/ch4/l3_moyenne_vues_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l3_moyenne_vues_tests.py"
    ) }}

    ??? tip "Coup de pouce pour la question 1"
        Les `nb_jours` derniers jours ne commencent pas à l'indice 0 ! Si le tableau contient 20 valeurs et que l'on veut les 7 dernières, il faut parcourir les indices de $20 - 7 = 13$ jusqu'à 19 :

        ```python
        for i in range(len(donnees) - nb_jours, len(donnees)):
        ```

    💡 Pour la question 2, on cherche la **position** du record, pas sa valeur : c'est donc l'indice qu'il faut mémoriser au fil du parcours.

---

## Les chaînes de caractères

!!! exopapier "Exercice 21 - Lire une chaîne - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la chaîne suivante :

    ```python
    mot = "ORDINATEUR"
    ```

    1. Que vaut `len(mot)` ?
    2. Que valent `mot[0]`, `mot[4]` et `mot[-1]` ?
    3. Quel est le plus grand indice utilisable ?
    4. Que se passe-t-il si l'on écrit `mot[10]` ?
    5. Que se passe-t-il si l'on écrit `mot[0] = "A"` ? Comment obtenir malgré tout la chaîne `"ARDINATEUR"` ?

    ??? success "Correction"
        1. `len(mot)` vaut `10`.
        2. `mot[0]` vaut `"O"`, `mot[4]` vaut `"N"` et `mot[-1]` vaut `"R"`.
        3. Le plus grand indice est `9`, soit `len(mot) - 1`.
        4. Erreur : `IndexError: string index out of range`.
        5. Erreur également : une chaîne est **immuable**, on ne peut pas en modifier un caractère (`TypeError`). Il faut **fabriquer une nouvelle chaîne**, par exemple avec `nouveau = "A" + mot[1:]`.

!!! exoordi "Exercice 22 - Les initiales - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Écrivez la fonction `initiales`, qui renvoie les initiales en majuscules, séparées par des points.

    {{ python_playground(
      key="ch4-l4-initiales",
      hauteur="200px",
      example_file="files/NSI/Python/exemples/ch4/l4_initiales.py",
      solution_file="files/NSI/Python/.corrections/ch4/l4_initiales_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l4_initiales_tests.py"
    ) }}

    💡 Trois outils suffisent : l'indexation `mot[0]`, la concaténation `+`, et la méthode `upper()`
    qui renvoie une **nouvelle** chaîne tout en majuscules — par exemple `"a".upper()` vaut `"A"`.

!!! exopapier "Exercice 23 - Construire une chaîne, caractère par caractère - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le programme suivant :

    ```python linenums="1"
    mot = "NSI"
    resultat = ""
    for lettre in mot:
        resultat = lettre + resultat
    print(resultat)
    ```

    **1.** Recopier et compléter le tableau d'évolution de la variable `resultat` :

    | Lettre lue | Valeur de `resultat` |
    |:---:|:---:|
    | départ | `""` |
    | `N` | ...... |
    | `S` | ...... |
    | `I` | ...... |

    **2.** Qu'affiche le programme ? Que réalise-t-il, quel que soit le mot de départ ?

    **3.** Qu'afficherait-il si l'on remplaçait la ligne 4 par `resultat = resultat + lettre` ?

    **4.** Pourquoi ne peut-on pas remplacer tout ce programme par une simple instruction `mot[0] = "X"` ? Quel nom donne-t-on à cette propriété des chaînes ?

    ??? success "Correction"
        **1.**

        | Lettre lue | Valeur de `resultat` |
        |:---:|:---:|
        | départ | `""` |
        | `N` | `"N"` |
        | `S` | `"SN"` |
        | `I` | `"ISN"` |

        Chaque nouvelle lettre est placée **devant** ce qui a déjà été construit.

        **2.** Le programme affiche `ISN` : il **inverse** le mot de départ. On retrouve le schéma de l'accumulateur, avec une chaîne comme accumulateur au lieu d'un compteur.

        **3.** Il afficherait `NSI`, c'est-à-dire une copie à l'identique : en ajoutant chaque lettre **à la suite**, on reconstruit le mot dans le même ordre.

        **4.** Parce qu'une chaîne est **immuable** : on ne peut pas en modifier un caractère, l'instruction provoquerait une `TypeError`. La seule façon de « transformer » une chaîne est d'en **construire une nouvelle**, exactement comme le fait ce programme.

!!! exoordi "Exercice 24 - Analyse de fréquences - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    En français, certaines lettres reviennent bien plus souvent que d'autres — c'est ce qui permet de casser des codes secrets ! Le code de départ contient les deux premiers vers d'une fable de La Fontaine.

    1. Écrivez `compter_lettre(texte, lettre)`, qui compte les occurrences d'une lettre dans un texte.
    2. Écrivez `frequence(texte, lettre)`, qui renvoie le pourcentage d'occurrences de cette lettre.
    3. Utilisez vos fonctions pour classer les cinq lettres `e`, `a`, `s`, `i`, `n` de la plus fréquente à la moins fréquente dans la fable.

    {{ python_playground(
      key="ch4-l4-frequence",
      hauteur="400px",
      example_file="files/NSI/Python/exemples/ch4/l4_frequence.py",
      solution_file="files/NSI/Python/.corrections/ch4/l4_frequence_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l4_frequence_tests.py"
    ) }}

    !!! expert "Pour aller plus loin"
        Les lettres les plus fréquentes ne sont pas les mêmes dans toutes les langues : en anglais, ce sont **e** et **t**. Comparer les fréquences d'un texte chiffré à celles de la langue permet ainsi de le déchiffrer **sans connaître la clé**.

        Pour automatiser complètement cette analyse, il faudrait associer un compteur à chaque lettre : c'est exactement le rôle des **dictionnaires**, que nous découvrirons au chapitre sur les types construits. 🗝️

!!! exopapier "Exercice 25 - Les tranches - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la chaîne `mot = "PROGRAMME"`.

    Donner la valeur de chacune des expressions suivantes :

    1. `mot[0:4]`
    2. `mot[:3]`
    3. `mot[4:]`
    4. `mot[-3:]`
    5. `mot[::2]`
    6. `mot[::-1]`
    7. `len(mot[2:5])`

    ??? success "Correction"
        La chaîne `"PROGRAMME"` compte 9 caractères, d'indices 0 à 8.

        | Expression | Valeur | Explication |
        |:---|:---|:---|
        | `mot[0:4]` | `"PROG"` | indices 0, 1, 2, 3 — l'indice de fin est **exclu** |
        | `mot[:3]` | `"PRO"` | depuis le début |
        | `mot[4:]` | `"RAMME"` | jusqu'à la fin |
        | `mot[-3:]` | `"MME"` | les trois derniers caractères |
        | `mot[::2]` | `"PORME"` | un caractère sur deux |
        | `mot[::-1]` | `"EMMARGORP"` | la chaîne à l'envers |
        | `len(mot[2:5])` | `3` | la tranche `"OGR"` compte 3 caractères, soit $5-2$ |

!!! exoordi "Exercice 26 - Le chiffre de César - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Le **chiffre de César** est l'une des plus anciennes méthodes de chiffrement : chaque lettre du message est remplacée par celle située quelques rangs plus loin dans l'alphabet. Avec un décalage de 3, `a` devient `d`, `b` devient `e`... et `z` revient à `c`.

    1. Écrivez `chiffrer(message, decalage)`. Les caractères qui ne sont pas des lettres minuscules (espaces, ponctuation) sont recopiés tels quels.
    2. Écrivez `dechiffrer(message, decalage)`. Une seule ligne suffit !

    {{ python_playground(
      key="ch4-l4-cesar",
      hauteur="400px",
      example_file="files/NSI/Python/exemples/ch4/l4_cesar.py",
      solution_file="files/NSI/Python/.corrections/ch4/l4_cesar_solution.py",
      tests_file="files/NSI/Python/.corrections/ch4/l4_cesar_tests.py"
    ) }}

    ??? tip "Coups de pouce"
        - La fonction `rang()`, **déjà écrite** dans le code de départ, vous donne la position d'une lettre dans l'alphabet. Vous la reconnaîtrez : c'est exactement l'algorithme `premier_indice` de la partie 3, appliqué à une chaîne. Elle renvoie **-1** si le caractère n'est pas une lettre minuscule — pratique pour repérer les espaces et la ponctuation !
        - Pour « revenir au début » après le `z`, utilisez le **modulo** : `(position + decalage) % 26` retombe toujours entre 0 et 25.
        - Pour la question 2, déchiffrer revient à chiffrer... dans l'autre sens.

    !!! histoire "Un peu d'histoire"
        Jules César utilisait ce procédé, avec un décalage de 3, pour ses correspondances militaires. Le chiffre a résisté quelques siècles — jusqu'à ce que les savants arabes du IXe siècle inventent l'**analyse fréquentielle** (l'exercice précédent !), qui le casse en quelques minutes.
