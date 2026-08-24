---
title: Exercices
weight: 5
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

## Les p-uplets

!!! exopapier "Exercice 1 - Reconnaître et lire un p-uplet - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    **1.** On considère le p-uplet `t = (3, 7, 9)`. Donner la valeur de `t[0]`, celle de `t[2]`, celle de `t[-1]` et celle de `len(t)`.

    **2.** Parmi les écritures suivantes, lesquelles correspondent à un **p-uplet** ?

    ```python
    a = (5)
    b = (5,)
    c = 5, 6
    d = [5, 6]
    e = ()
    ```

    ??? success "Correction"
        **1.** `t[0]` vaut `3`, `t[2]` vaut `9`, `t[-1]` vaut également `9` (le dernier élément) et `len(t)` vaut `3`.

        **2.**

        - `a` ❌ : les parenthèses sont ici de simples parenthèses de calcul, `a` est l'**entier** 5 ;
        - `b` ✅ : c'est la virgule finale qui fait le p-uplet à un élément ;
        - `c` ✅ : les parenthèses sont facultatives, c'est bien un p-uplet ;
        - `d` ❌ : des crochets, donc une liste ;
        - `e` ✅ : le p-uplet vide.

!!! exoordi "Exercice 2 - Le point A - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Écrivez un p-uplet `point` contenant les coordonnées du point $A$ d'abscisse 4 et d'ordonnée $-2$, puis affichez ces deux coordonnées séparément.

    {{ python_playground(
      key="ch6-p-point",
      hauteur="220px",
      example_file="files/NSI/Python/exemples/ch6/p_point.py",
      solution_file="files/NSI/Python/.corrections/ch6/p_point_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/p_point_tests.py"
    ) }}

!!! exopapier "Exercice 3 - Un p-uplet ne se modifie pas - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    **1.** On considère le code suivant :

    ```python linenums="1"
    t = (1, 2, 3)
    t[1] = 10
    ```

    Le programme fonctionne-t-il ? Justifier.

    **2.** Sans exécuter, donner les valeurs affichées :

    ```python linenums="1"
    t = (4, 8, 15, 16)
    print(t[-1])
    print(len(t))
    print(t + (23, 42))
    print(t)
    ```

    ??? success "Correction"
        **1.** Non : les p-uplets sont **immuables**, on ne peut pas remplacer une composante après création. Python signale une `TypeError`.

        **2.** Le programme affiche successivement `16`, puis `4`, puis `(4, 8, 15, 16, 23, 42)`, puis `(4, 8, 15, 16)`.

        La dernière ligne est la plus instructive : la concaténation n'a **pas modifié** `t`, elle a fabriqué un **nouveau** p-uplet, aussitôt affiché puis oublié faute d'avoir été stocké.

!!! exoordi "Exercice 4 - Minimum et maximum - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez une fonction `extremes` qui prend un p-uplet de nombres et renvoie un **p-uplet** contenant le minimum et le maximum, dans cet ordre.

    {{ python_playground(
      key="ch6-p-extremes",
      hauteur="200px",
      example_file="files/NSI/Python/exemples/ch6/p_extremes.py",
      solution_file="files/NSI/Python/.corrections/ch6/p_extremes_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/p_extremes_tests.py"
    ) }}

    💡 Une fois validé, réécrivez la fonction **sans** `min()` ni `max()`, avec un parcours — comme au chapitre 4.

!!! exopapier "Exercice 5 - Une fonction qui renvoie deux valeurs - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def f():
        return 2, 5
    ```

    1. Quel est le type de la valeur renvoyée ? Combien de valeurs la fonction renvoie-t-elle réellement ?
    2. Que font les instructions `a, b = f()` ?
    3. Que vaut `f()[1]` ?
    4. Que se passe-t-il si l'on écrit `a, b, c = f()` ?

    ??? success "Correction"
        1. La fonction renvoie **un p-uplet** — donc une seule valeur, qui en contient deux. Les parenthèses sont facultatives : `return 2, 5` construit bien `(2, 5)`.
        2. Le p-uplet est **déballé** dans deux variables : `a` reçoit 2 et `b` reçoit 5.
        3. `f()[1]` vaut `5` : on appelle la fonction, puis on lit la composante d'indice 1 du p-uplet obtenu.
        4. Une erreur : `ValueError: not enough values to unpack`. Le déballage exige **autant de variables que de composantes**.

!!! exoordi "Exercice 6 - Distance à l'origine - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez une fonction `distance_origine` qui prend en paramètre un point du plan représenté par un p-uplet `(x, y)` et renvoie sa distance à l'origine du repère.

    Rappel : $d = \sqrt{x^2 + y^2}$, et une racine carrée s'obtient en élevant à la puissance $0{,}5$.

    {{ python_playground(
      key="ch6-p-distance",
      hauteur="200px",
      example_file="files/NSI/Python/exemples/ch6/p_distance.py",
      solution_file="files/NSI/Python/.corrections/ch6/p_distance_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/p_distance_tests.py"
    ) }}

    💡 Le déballage `x, y = P` évite d'écrire `P[0]` et `P[1]` partout : le code devient bien plus lisible.

!!! exopapier "Exercice 7 - Un p-uplet dans un p-uplet - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le p-uplet `t = (1, (2, 3), 4)`.

    1. Combien `t` contient-il de composantes ?
    2. Que vaut `t[1]` ? Quel est son type ?
    3. Que vaut `t[1][0]` ?
    4. Que vaut `len(t[1])` ?

    ??? success "Correction"
        1. **Trois** composantes : `1`, le p-uplet `(2, 3)`, et `4`. Le p-uplet imbriqué compte pour **une seule** composante.
        2. `t[1]` vaut `(2, 3)` : c'est un p-uplet.
        3. `t[1][0]` vaut `2` : on ouvre d'abord la composante d'indice 1, puis on y lit l'indice 0.
        4. `len(t[1])` vaut `2`.

!!! exoordi "Exercice 8 - Division euclidienne - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez une fonction `division_euclidienne(a, b)` qui renvoie le p-uplet `(quotient, reste)`.

    Par exemple, `division_euclidienne(17, 5)` doit renvoyer `(3, 2)`, car $17 = 5 \times 3 + 2$.

    {{ python_playground(
      key="ch6-p-division",
      hauteur="220px",
      example_file="files/NSI/Python/exemples/ch6/p_division.py",
      solution_file="files/NSI/Python/.corrections/ch6/p_division_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/p_division_tests.py"
    ) }}

    💡 Deux opérateurs vus au chapitre 1 font tout le travail : `//` pour le quotient, `%` pour le reste.

!!! exopapier "Exercice 9 - Échanger sans variable temporaire - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Au chapitre 1, échanger le contenu de deux variables demandait une troisième variable, faisant office de verre vide.

    1. Écrire cet échange en une seule ligne, à l'aide d'un p-uplet.
    2. Expliquer pourquoi cette ligne fonctionne, alors qu'écrire `a = b` puis `b = a` échoue.

    ??? success "Correction"
        1. Il suffit d'écrire :

            ```python linenums="1"
            a, b = b, a
            ```

        2. Python évalue **d'abord** tout le membre de droite : il construit le p-uplet `(b, a)` avec les valeurs **actuelles**, avant toute affectation. Ce p-uplet intermédiaire joue exactement le rôle du verre vide — il met les deux anciennes valeurs à l'abri. Ce n'est qu'ensuite qu'il est déballé dans `a` et `b`.

            Dans la version fautive, `a = b` écrase la valeur de `a` avant qu'on ait eu le temps de la mettre de côté.

!!! exoordi "Exercice 10 - Statistiques d'une série - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrivez une fonction `statistiques` qui prend un tableau de nombres et renvoie le p-uplet `(minimum, maximum, moyenne)`.

    ⚠️ Interdit d'utiliser `min()`, `max()` et `sum()` : votre fonction ne doit effectuer qu'**un seul parcours** du tableau.

    {{ python_playground(
      key="ch6-p-statistiques",
      hauteur="240px",
      example_file="files/NSI/Python/exemples/ch6/p_statistiques.py",
      solution_file="files/NSI/Python/.corrections/ch6/p_statistiques_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/p_statistiques_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        Trois accumulateurs préparés avant la boucle, mis à jour dans le même tour : `mini` et `maxi` partent de `tableau[0]` — surtout pas de 0 ! — et `total` part de 0.

        C'est tout l'intérêt du p-uplet : rendre trois résultats d'un coup, là où trois fonctions séparées parcourraient trois fois le tableau.

!!! exopapier "Exercice 11 - Peut-on « ajouter » à un p-uplet ? - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On exécute le programme suivant :

    ```python linenums="1"
    t = (1, 2, 3)
    print(id(t))
    t = t + (4,)
    print(t)
    print(id(t))
    ```

    1. Que contient `t` à la fin ?
    2. Les deux appels à `id()` affichent-ils la même chose ? Qu'en déduire ?
    3. A-t-on modifié le p-uplet de départ ? Cela contredit-il son immuabilité ?
    4. Quelle différence essentielle avec `L = [1, 2, 3]` suivi de `L.append(4)` ?

    ??? success "Correction"
        1. `t` contient `(1, 2, 3, 4)`.
        2. **Non**, les deux identifiants diffèrent. On en déduit que `t` ne désigne plus le même objet qu'au départ.
        3. Le p-uplet de départ n'a **pas** été modifié : la concaténation en a fabriqué un **nouveau**, et la variable `t` a simplement été réaffectée vers celui-ci. L'ancien, que plus personne ne désigne, est abandonné. L'immuabilité est donc bien respectée.
        4. `append()` modifie la liste **sur place** : l'objet reste le même, seul son contenu change — `id(L)` serait inchangé. C'est exactement la différence entre modifier et remplacer, déjà rencontrée avec les chaînes de caractères.

!!! exoordi "Exercice 12 - Milieu et longueur d'un segment - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Les points du plan sont représentés par des p-uplets `(x, y)`.

    1. Écrivez `milieu(A, B)`, qui renvoie le p-uplet des coordonnées du milieu de $[AB]$.
    2. Écrivez `longueur(A, B)`, qui renvoie la longueur de $[AB]$.

    {{ python_playground(
      key="ch6-p-segment",
      hauteur="300px",
      example_file="files/NSI/Python/exemples/ch6/p_segment.py",
      solution_file="files/NSI/Python/.corrections/ch6/p_segment_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/p_segment_tests.py"
    ) }}

    💡 L'un des tests vérifie une propriété géométrique : le milieu doit être **à égale distance** des deux extrémités. Vos deux fonctions sont donc contrôlées l'une par l'autre.

---

## Les dictionnaires

!!! exopapier "Exercice 13 - Reconnaître et lire un dictionnaire - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    **1.** On considère `d = {"a": 1, "b": 2}`. Donner la valeur associée à la clé `"a"`, puis le nombre d'entrées du dictionnaire.

    **2.** Parmi les écritures suivantes, lesquelles correspondent à des **dictionnaires** ?

    ```python
    a = {"x": 3}
    b = {1, 2, 3}
    c = {}
    d = [("a", 1), ("b", 2)]
    ```

    ??? success "Correction"
        **1.** `d["a"]` vaut `1`, et `len(d)` vaut `2` — on compte les **entrées**, c'est-à-dire les couples clé/valeur.

        **2.**

        - `a` ✅ : des accolades, et des couples `clé: valeur` ;
        - `b` ❌ : des accolades, mais pas de `:` — c'est un **ensemble** (`set`), hors programme ;
        - `c` ✅ : le dictionnaire vide ;
        - `d` ❌ : des crochets, donc une **liste** de p-uplets. Elle contient pourtant la même information : nous verrons au chapitre sur les données en tables que les deux écritures se croisent souvent.

!!! exoordi "Exercice 14 - Le carnet de notes - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    En suivant les consignes du code de départ, créez le dictionnaire des notes, ajoutez une élève, corrigez une note, puis affichez ce qu'il faut.

    {{ python_playground(
      key="ch6-d-creer",
      hauteur="300px",
      example_file="files/NSI/Python/exemples/ch6/d_creer.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_creer_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_creer_tests.py"
    ) }}

    💡 Observez que **la même écriture** `notes["Bob"] = 13` sert à créer une entrée et à en modifier une : tout dépend de l'existence préalable de la clé.

!!! exopapier "Exercice 15 - Vrai ou faux ? - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    1. Les clés d'un dictionnaire doivent être uniques.
    2. Un dictionnaire est indexé par des entiers consécutifs.
    3. Un dictionnaire est modifiable.
    4. Les valeurs d'un dictionnaire doivent être uniques.
    5. Une clé peut être un p-uplet.

    ??? success "Correction"
        1. **Vrai** : c'est ce qui permet à une clé de désigner une valeur sans ambiguïté.
        2. **Faux** : c'est la définition d'un **tableau**. Un dictionnaire est indexé par des clés, de n'importe quel type immuable.
        3. **Vrai** : on peut ajouter, modifier et supprimer des entrées.
        4. **Faux** : rien n'interdit que deux élèves aient la même note.
        5. **Vrai**, justement parce qu'un p-uplet est immuable. C'est même très pratique : `{(0, 0): "départ", (3, 4): "arrivée"}` associe des informations à des coordonnées.

!!! exopapier "Exercice 16 - Prévoir l'affichage - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Sans exécuter, indiquer ce qui est affiché par chacun de ces programmes.

    **1.**
    ```python linenums="1"
    d = {"x": 5}
    d["x"] = 8
    print(d)
    ```

    **2.**
    ```python linenums="1"
    d = {"a": 1, "b": 2}
    d["c"] = d["a"] + d["b"]
    print(d)
    print(len(d))
    ```

    **3.**
    ```python linenums="1"
    d = {"a": 1}
    print(d["b"])
    ```

    ??? success "Correction"
        **1.** `{'x': 8}` : la clé existait déjà, sa valeur a été **remplacée** — le dictionnaire compte toujours une seule entrée.

        **2.** `{'a': 1, 'b': 2, 'c': 3}`, puis `3`. La clé `"c"` n'existait pas : elle a été **créée**, avec pour valeur la somme des deux autres.

        **3.** Rien n'est affiché : le programme s'interrompt sur une erreur `KeyError: 'b'`. C'est précisément ce que l'exercice suivant apprend à éviter.

!!! exoordi "Exercice 17 - La clé existe-t-elle ? - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    1. Écrivez `est_present(dico, cle)`, qui renvoie `True` si la clé figure dans le dictionnaire.
    2. Écrivez `valeur_ou_defaut(dico, cle, defaut)`, qui renvoie la valeur associée à la clé — ou la valeur de repli si la clé est absente, **sans jamais provoquer d'erreur**.

    {{ python_playground(
      key="ch6-d-est-present",
      hauteur="280px",
      example_file="files/NSI/Python/exemples/ch6/d_est_present.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_est_present_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_est_present_tests.py"
    ) }}

    ⚠️ Attention au piège testé par la validation : sur un dictionnaire, `in` regarde les **clés**, jamais les valeurs.

!!! exopapier "Exercice 18 - Clés ou valeurs ? - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère le dictionnaire `d = {"a": 1, "b": 2}`.

    **1.** Donner la valeur affichée par chacune de ces instructions :

    ```python linenums="1"
    print("a" in d)
    print(1 in d)
    print("a" in d.keys())
    print(1 in d.values())
    ```

    **2.** On exécute maintenant :

    ```python linenums="1"
    for cle in d:
        print(cle)
    ```

    Que parcourt cette boucle ? Qu'affiche-t-elle ?

    **3.** Comment modifier cette boucle pour afficher les **valeurs** ? Et pour afficher `a → 1` puis `b → 2` ?

    ??? success "Correction"
        **1.** `True`, puis `False`, puis `True`, puis `True`.

        La deuxième mérite un arrêt : `1` est bien une **valeur** du dictionnaire, mais `in` ne teste que les **clés**. Pour interroger les valeurs, il faut le demander explicitement avec `d.values()`.

        **2.** La boucle parcourt les **clés** — c'est le parcours par défaut d'un dictionnaire. Elle affiche `a` puis `b`.

        **3.** Avec `for valeur in d.values():` pour les valeurs, et avec `for cle, valeur in d.items():` pour obtenir les deux à la fois.

!!! exoordi "Exercice 19 - Somme et moyenne des valeurs - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Écrivez `somme_valeurs(dico)`, qui renvoie la somme des valeurs d'un dictionnaire de nombres.
    2. Écrivez `moyenne_valeurs(dico)`, qui en renvoie la moyenne, en appelant obligatoirement la fonction précédente.

    {{ python_playground(
      key="ch6-d-somme",
      hauteur="280px",
      example_file="files/NSI/Python/exemples/ch6/d_somme.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_somme_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_somme_tests.py"
    ) }}

    💡 C'est le schéma de l'accumulateur du chapitre 4, appliqué cette fois aux **valeurs** d'un dictionnaire.

!!! exopapier "Exercice 20 - Pourquoi pas une liste comme clé ? - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Expliquer pourquoi une liste ne peut pas servir de clé dans un dictionnaire.
    2. Un p-uplet, lui, en a le droit. Quelle propriété fait toute la différence ?
    3. Une liste peut-elle être une **valeur** ? Justifier.
    4. Donner un exemple d'utilisation d'un p-uplet comme clé.

    ??? success "Correction"
        1. Parce qu'une liste est **modifiable**. Si on la modifiait après l'avoir utilisée comme clé, le dictionnaire ne saurait plus où retrouver l'entrée correspondante : la clé aurait changé sous ses pieds. Python refuse donc dès le départ (`TypeError: unhashable type: 'list'`).
        2. L'**immuabilité** : un p-uplet ne peut pas changer, la clé reste donc valable pour toujours.
        3. **Oui, sans problème.** La contrainte ne porte que sur les clés. `{"Alice": [12, 15, 8]}` est parfaitement valide, et très pratique pour stocker plusieurs notes par élève.
        4. Repérer les cases d'une grille : `{(0, 0): "libre", (1, 2): "mur"}`. Un couple de coordonnées est un identifiant naturel, et il est immuable.

!!! exoordi "Exercice 21 - Le dictionnaire des carrés - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Écrivez `carres(n)`, qui renvoie le dictionnaire associant chaque entier de 1 à `n` à son carré, **avec une boucle**.
    2. Écrivez `carres_comprehension(n)`, qui fait la même chose **en une seule ligne**.

    {{ python_playground(
      key="ch6-d-carres",
      hauteur="280px",
      example_file="files/NSI/Python/exemples/ch6/d_carres.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_carres_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_carres_tests.py"
    ) }}

    💡 La compréhension de dictionnaire ressemble à celle des listes, avec un couple au lieu d'une valeur : `{cle: valeur for ... in ...}`.

!!! exopapier "Exercice 22 - Liste ou dictionnaire ? - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Pour chacune des situations suivantes, indiquer la structure la plus adaptée — **liste**, **p-uplet** ou **dictionnaire** — et justifier en une phrase.

    1. Les 20 notes d'une classe, dans l'ordre où elles ont été rendues.
    2. Un répertoire téléphonique : à chaque nom correspond un numéro.
    3. Les coordonnées $(x, y)$ d'un point du plan.
    4. Le nombre d'occurrences de chaque lettre d'un texte.
    5. La date de naissance d'une personne : jour, mois, année.
    6. Les températures relevées heure par heure pendant une journée.

    ??? success "Correction"
        1. **Liste** : des données de même nature, dont l'ordre a un sens, et que l'on veut pouvoir compléter.
        2. **Dictionnaire** : on cherche par nom, pas par numéro de position. Avec une liste, il faudrait parcourir tous les contacts à chaque recherche.
        3. **P-uplet** : deux valeurs de rôles fixés, qui n'ont aucune raison de changer une fois le point défini.
        4. **Dictionnaire** : c'est exactement l'association d'une clé (la lettre) à une valeur (son compteur).
        5. **P-uplet** — ou mieux, un **dictionnaire** `{"jour": 12, "mois": 5, "annee": 2008}` si l'on veut nommer les champs. C'est le fameux *enregistrement*.
        6. **Liste** de 24 valeurs, l'indice tenant lieu d'heure. Un dictionnaire `{0: 12.5, 1: 11.8, ...}` conviendrait aussi, mais numéroter des cases consécutives est précisément le métier de la liste.

!!! exoordi "Exercice 23 - Compter les occurrences - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez `compter_lettres(texte)`, qui renvoie un dictionnaire associant chaque caractère du texte à son nombre d'occurrences.

    Par exemple, `compter_lettres("banane")` doit renvoyer `{'b': 1, 'a': 2, 'n': 2, 'e': 1}`.

    {{ python_playground(
      key="ch6-d-compter",
      hauteur="240px",
      example_file="files/NSI/Python/exemples/ch6/d_compter.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_compter_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_compter_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        Pour chaque caractère, deux cas seulement : **la clé existe déjà** — on incrémente son compteur — ou **elle n'existe pas encore** — on la crée avec la valeur 1.

        C'est le motif le plus utile de tout le chapitre : retenez-le, il resservira sans arrêt.

!!! exopapier "Exercice 24 - Dérouler un comptage - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On applique l'algorithme de comptage de l'exercice précédent au mot `"abba"`.

    **1.** Recopier et compléter le tableau d'évolution du dictionnaire :

    | Lettre lue | Contenu de `compteurs` |
    |:---:|:---|
    | départ | `{}` |
    | `a` | ...... |
    | `b` | ...... |
    | `b` | ...... |
    | `a` | ...... |

    **2.** Que vaut la somme de toutes les valeurs du dictionnaire final ? Cette propriété est-elle toujours vraie ?

    **3.** Que renverrait la fonction pour le mot `"aaaa"` ? Combien d'entrées le dictionnaire contiendrait-il ?

    ??? success "Correction"
        **1.**

        | Lettre lue | Contenu de `compteurs` |
        |:---:|:---|
        | départ | `{}` |
        | `a` | `{'a': 1}` |
        | `b` | `{'a': 1, 'b': 1}` |
        | `b` | `{'a': 1, 'b': 2}` |
        | `a` | `{'a': 2, 'b': 2}` |

        **2.** La somme vaut `4`, soit exactement la longueur du mot. C'est **toujours** vrai : chaque caractère lu ajoute exactement 1 au total, quel que soit le compteur concerné.

        **3.** Elle renverrait `{'a': 4}` : une **seule** entrée. Le nombre d'entrées est le nombre de caractères **différents**, pas le nombre de caractères.

!!! exoordi "Exercice 25 - Le répertoire téléphonique - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Complétez les trois fonctions d'un répertoire : `ajouter`, `numero_de` et `supprimer`.

    ⚠️ Aucune ne doit provoquer d'erreur, même appelée sur un contact inexistant.

    {{ python_playground(
      key="ch6-d-repertoire",
      hauteur="360px",
      example_file="files/NSI/Python/exemples/ch6/d_repertoire.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_repertoire_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_repertoire_tests.py"
    ) }}

    💡 Remarquez que `ajouter` sert aussi à **mettre à jour** un numéro : c'est la même instruction, et la validation le vérifie.

!!! exoordi "Exercice 26 - Fusionner deux dictionnaires - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Écrivez `fusionner(d1, d2)`, qui renvoie un **nouveau** dictionnaire réunissant les entrées des deux. En cas de clé commune, c'est la valeur de `d2` qui l'emporte.

    ⚠️ Les deux dictionnaires reçus ne doivent pas être modifiés.

    {{ python_playground(
      key="ch6-d-fusion",
      hauteur="240px",
      example_file="files/NSI/Python/exemples/ch6/d_fusion.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_fusion_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_fusion_tests.py"
    ) }}

    💡 Le piège est celui du chapitre 4 : partir de `d1` sans le copier reviendrait à modifier le dictionnaire de l'appelant.

!!! exopapier "Exercice 27 - Une table de données - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    On représente une classe par une **liste d'enregistrements** :

    ```python linenums="1"
    classe = [
        {"nom": "Alice", "age": 16, "moyenne": 15},
        {"nom": "Bob",   "age": 17, "moyenne": 12},
        {"nom": "Chloé", "age": 16, "moyenne": 18}
    ]
    ```

    1. Quel est le type de `classe` ? Celui de `classe[0]` ? Celui de `classe[0]["nom"]` ?
    2. Écrire l'expression qui donne la moyenne de Bob.
    3. Écrire une boucle qui affiche le nom de chaque élève.
    4. Écrire une fonction `plus_jeune(classe)` qui renvoie le nom de l'élève le plus jeune.
    5. Toutes les fiches partagent les mêmes clés. Comment appelle-t-on ces clés, et à quelle structure de données cette liste vous fait-elle penser ?

    ??? success "Correction"
        1. `classe` est une **liste**, `classe[0]` un **dictionnaire**, et `classe[0]["nom"]` une **chaîne de caractères**.
        2. `classe[1]["moyenne"]` — d'abord l'indice dans la liste, ensuite la clé dans la fiche.
        3. Deux écritures possibles :

            ```python linenums="1"
            for fiche in classe:
                print(fiche["nom"])
            ```

        4. C'est une recherche de minimum, appliquée à un champ des fiches :

            ```python linenums="1"
            def plus_jeune(classe):
                record = classe[0]
                for fiche in classe:
                    if fiche["age"] < record["age"]:
                        record = fiche
                return record["nom"]
            ```

        5. Ces clés communes sont les **descripteurs**. Cette liste d'enregistrements est exactement ce qu'on appelle une **table de données** — l'objet du chapitre à venir. Chaque fiche y est une ligne, chaque descripteur une colonne. 📊

!!! exoordi "Exercice 28 - Le dossier des élèves - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Cette fois, les élèves sont rangés dans un **dictionnaire de dictionnaires** : à chaque nom correspond une fiche.

    1. Écrivez `moyenne_de(eleves, nom)`, qui renvoie la moyenne d'un élève — ou `None` s'il est inconnu.
    2. Écrivez `inscrire(eleves, nom, age, moyenne)`, qui ajoute un élève.
    3. Écrivez `moyenne_generale(eleves)`, qui renvoie la moyenne de toutes les moyennes.

    {{ python_playground(
      key="ch6-d-eleve",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch6/d_eleve.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_eleve_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_eleve_tests.py"
    ) }}

    💡 Deux niveaux d'accès se combinent : `eleves["Alice"]` donne une **fiche**, et `eleves["Alice"]["moyenne"]` en donne un **champ**.

!!! exoordi "Exercice 29 - Inverser un dictionnaire - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrivez `inverse(dico)`, qui renvoie un nouveau dictionnaire où les clés deviennent les valeurs, et réciproquement. On suppose les valeurs toutes différentes.

    {{ python_playground(
      key="ch6-d-inverse",
      hauteur="240px",
      example_file="files/NSI/Python/exemples/ch6/d_inverse.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_inverse_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_inverse_tests.py"
    ) }}

    Une fois validé, répondez : que se passe-t-il si deux clés partagent la **même valeur**, comme dans `{"Alice": 15, "Bob": 15}` ? Testez-le dans l'éditeur.

    ??? success "Correction de la question finale"
        Le dictionnaire obtenu ne contient qu'**une seule** entrée : `{15: "Bob"}`.

        Les deux élèves produisent la même clé `15` ; la seconde écriture écrase donc la première, et Alice disparaît. C'est la raison de l'hypothèse « valeurs toutes différentes » : sans elle, l'inversion perd de l'information.

!!! exoordi "Exercice 30 - La lettre la plus fréquente - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Écrivez `lettre_la_plus_frequente(texte)`, qui renvoie le caractère revenant le plus souvent. En cas d'égalité, on renvoie celui rencontré en premier.

    La fonction `compter_lettres` vous est donnée : votre fonction doit l'appeler.

    {{ python_playground(
      key="ch6-d-frequent",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch6/d_frequent.py",
      solution_file="files/NSI/Python/.corrections/ch6/d_frequent_solution.py",
      tests_file="files/NSI/Python/.corrections/ch6/d_frequent_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        C'est la recherche d'un maximum du chapitre 4, transposée aux entrées d'un dictionnaire : on retient la lettre record, et on la remplace dès qu'on en rencontre une dont le compteur est **strictement** plus grand.

        Pourquoi *strictement* ? Parce que c'est exactement ce qui garantit qu'en cas d'égalité, la première rencontrée l'emporte.

    !!! histoire "L'analyse fréquentielle"
        Vous venez d'écrire l'outil qui casse le chiffre de César du chapitre 4. En comparant les fréquences d'un texte chiffré à celles de la langue — en français, `e` domine largement — on retrouve le décalage sans connaître la clé.

        C'est la méthode inventée par le savant arabe **Al-Kindi** au IXe siècle, et elle a rendu obsolètes tous les chiffrements par substitution simple. 🔓
