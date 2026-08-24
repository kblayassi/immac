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

## Langages de programmation

!!! exopapier "Exercice 1 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Noaïtte a lu que le langage **C** est utilisé pour programmer le système d’exploitation **UNIX** et qu’il est toujours très populaire.  
    Elle veut comparer sa syntaxe à celle du langage **Python**. Voici une même fonction écrite dans les deux langages :

    === "Langage C"
        ```c linenums="1"
        float racine_carree(float a) {
            float racine = a;
            for (int i = 0; i < 10; i++) {
                racine = (racine + a / racine) / 2;
            }
            return racine;
        }
        ```

    === "Langage Python"
        ```python linenums="1"
        def racine_carree(a):
            racine = a
            for i in range(10):
                racine = (racine + a / racine) / 2
            return racine
        ```

    1. Pensez-vous que l’**indentation** du code soit indispensable dans la version C ?  
       Si non, pourquoi le code est-il tout de même indenté ?
    2. Selon vous, à quoi sert le mot-clé `float` situé devant le nom de la fonction et des variables en langage C ?  
    3. Pourquoi le code C contient-il des **points-virgules** à la fin des lignes 2, 4 et 6 ?  

    ??? success "Correction"
        1. L’indentation n’est **pas obligatoire** en C (car la structure est délimitée par des `{}`),  
           mais elle est **utilisée pour la lisibilité** du code et pour faciliter la compréhension par le programmeur.
        2. Le mot-clé `float` indique que la fonction et les variables manipulent des **nombres réels** (à virgule).  
        3. En langage C, chaque instruction doit se terminer par un **point-virgule** pour signaler la fin de la ligne d’exécution.  

!!! exopapier "Exercice 2 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Léo découvre le langage **JavaScript**, très utilisé dans le développement web.  
    Il souhaite comparer sa syntaxe avec celle du langage **Python**.  
    Voici une même fonction, écrite dans les deux langages :

    === "Python"
        ```python linenums="1"
        def cube(x):
            return x ** 3
        ```

    === "JavaScript"
        ```javascript linenums="1"
        function cube(x) {
            return x ** 3;
        }
        ```

    1. Quelle est la fonction de cette portion de code ?  
    2. Quels sont les **principaux symboles ou mots-clés** différents entre Python et JavaScript ?  
    3. Pourquoi y a-t-il des **accolades `{}`** dans la version JavaScript ?  
    4. À quoi sert le **point-virgule `;`** à la fin des lignes ?

    ??? success "Correction"
        1. Les deux fonctions calculent le **cube d’un nombre `x`**.  
        2. En JavaScript, la fonction commence par le mot-clé `function`, et le bloc d’instructions est délimité par des **accolades `{}`**.  
        3. Les **accolades** servent à indiquer le **début et la fin du bloc** d’instructions de la fonction.  
        4. Le **point-virgule `;`** marque la fin de chaque instruction (il est facultatif, mais recommandé pour éviter les erreurs).

!!! exopapier "Exercice 3 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Manon apprend le langage **Swift**, utilisé sur iPhone et Mac.  
    Elle veut comparer sa syntaxe à celle de **Python**.  
    Voici une même fonction écrite dans les deux langages :

    === "Python"
        ```python linenums="1"
        def carre(x):
            return x * x
        ```

    === "Swift"
        ```swift linenums="1"
        func carre(x: Double) -> Double {
            return x * x
        }
        ```

    1. Quel est le rôle de cette fonction ?  
    2. Que signifient les mentions `x: Double` et `-> Double` dans la version Swift ?  
    3. Quelles différences remarquez-vous dans la **syntaxe générale** entre Swift et Python ?  
    4. Pourquoi peut-on dire que Swift est un langage **typé** ?

    ??? success "Correction"
        1. La fonction calcule le **carré d’un nombre `x`**.  
        2. `x: Double` indique que le paramètre `x` est un **nombre réel** (type `Double`),  
           et `-> Double` précise que la fonction **renvoie un réel**.  
        3. En Swift :
            - la fonction commence par le mot-clé `func` ;
            - les types des variables et du retour sont explicitement indiqués ;
            - les blocs sont délimités par `{}`.  
        4. Swift est **typé statiquement**, car le type des variables et des retours est défini **dès la déclaration** et vérifié **avant l’exécution**.


---

## Spécification de fonctions

!!! exopapier "Exercice 4 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def aire_rectangle(L, l):
        return L * l
    ```

    1. Quel est le rôle de cette fonction ?
    2. Documenter cette fonction (docstring courte décrivant les paramètres et la valeur de retour).


    ??? success "Correction"
        1. Elle calcule l'aire d'un rectangle de longueur `L` et de largeur `l`.
        2. Par exemple :

            ```python linenums="1"
            def aire_rectangle(L: float, l: float) -> float:
                """
                Calcule l'aire d'un rectangle.
                
                Paramètres :
                L (float) -> longueur
                l (float) -> largeur

                Retourne :
                float -> aire du rectangle, égale à L * l
                """
                return L * l
            ```

!!! exopapier "Exercice 5 - :fontawesome-solid-star:  :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def maximum(n1, n2):
        if n1 > n2:
            return n1
        else:
            return n2
    ```

    1. Quel est son rôle ?
    2. Documenter cette fonction. 

    ??? success "Correction"
        1. Elle détermine le maximum entre deux entiers `n1` et `n2`. 
        2. On a : 

            ```python linenums="1"
            def maximum(n1:int, n2:int) -> int:
                '''
                Renvoie l'entier maximum entre n1 et n2

                Paramètres:
                n1 (entier) -> premiere valeur
                n2 (entier) -> deuxieme valeur

                Retourne: 
                int -> la plus grandes des deux valeurs.
                '''
                if n1 > n2:
                    return n1
                else:
                    return n2
            ```

!!! exoordi "Exercice 6 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def division(a, b):
        return a / b
    ```

    1. Quel est le rôle de cette fonction ?
    2. Donne une précondition nécessaire sur `b`.
    3. Réécris la fonction en ajoutant :
        - un docstring clair ;
        - une assertion correspondant à la précondition.


    {{ python_playground(
      key="ch5-division",
      hauteur="300px",
      example_file="files/NSI/Python/exemples/ch5/s_division.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_division_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_division_tests.py"
    ) }}

    ??? success "Correction"
        1. Elle renvoie le quotient `a / b`.
        2. Précondition : `b` doit être non nul.
        3. Exemple :

            ```python linenums="1"
            def division(a: float, b: float) -> float:
                """
                Calcule le quotient a / b.

                Paramètres :
                a (float) -> numérateur
                b (float) -> dénominateur non nul

                Retourne :
                float -> résultat de a / b

                Précondition :
                b != 0
                """
                assert b != 0, "b doit être non nul"
                return a / b
            ```

!!! exoordi "Exercice 7 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On souhaite écrire une fonction `racine_carree(x)` qui renvoie la racine carrée de `x`.

    1. Donne une précondition raisonnable sur `x`.
    2. Donne une postcondition raisonnable sur le résultat.
    3. Écris la fonction `racine_carree(x)`, correctement documenter, en Python en utilisant `assert` pour faire respecter la précondition.


    {{ python_playground(
      key="ch5-racine",
      hauteur="300px",
      example_file="files/NSI/Python/exemples/ch5/s_racine.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_racine_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_racine_tests.py"
    ) }}

    ??? success "Correction"
        1. Précondition : `x` doit être positif ou nul (`x >= 0`).
        2. Postcondition : le résultat renvoyé doit être positif, et son carré doit être (environ) égal à `x`.
        3. Exemple :

            ```python linenums="1"
            def racine_carree(x):
                """
                Renvoie la racine carrée d'un nombre réel positif x.

                Paramètres :
                x (float) -> réel positif ou nul

                Retourne :
                float -> racine carrée de x (>= 0)

                Précondition :
                x >= 0
                """
                assert x >= 0, "x doit être positif ou nul"
                res = x ** 0.5
                # postcondition attendue : res >= 0
                assert res >= 0, "résultat négatif impossible"
                return res
            ```

!!! exopapier "Exercice 8 - :fontawesome-solid-star:  :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def compte_voyelles(phrase):
        voyelles = 'aeiouy'
        nb_voyelles = 0
        for lettre in phrase:
            if lettre in voyelles:
                nb_voyelles += 1
        return nb_voyelles
    ```

    1. Quel est son rôle ?
    2. Documenter cette fonction. 

    ??? success "Correction"
        1. Compter le nombre de voyelle dans une phrase passée en argument. 
        2. On a : 

            ```python linenums="1"
            def compte_voyelles(phrase: str) -> int:
                """
                Renvoie le nombre de voyelle présent dans la chaine de caractère phrase. 

                Paramètres : phrase (str) -> la chaine de caractère
                Retour : int -> le nombre de voyelle

                Post-condition : supérieur ou égal à 0
                """
                voyelles = 'aeiouy'
                nb_voyelles = 0
                for lettre in phrase:
                    if lettre in voyelles:
                        nb_voyelles += 1
                return nb_voyelles
            ```


!!! exopapier "Exercice 9 - :fontawesome-solid-star:  :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def fizzbuzz(nombre):
        if nombre%3 == 0 and nombre%5 == 0:
            return 'FizzBuzz'
        elif nombre%3 == 0:
            return 'Fizz'
        elif nombre%5 == 0:
            return 'Buzz'
        else:
            return nombre
    ```

    1. Que fait cette fonction ?
    2. Documenter cette fonction.

    ??? success "Correction"
        1. Si le nombre est multiple de 3 et de 5, elle renvoie `"FizzBuzz"`, si le nombre est uniquement mutliple de 3, elle renvoie uniquement `"Fizz"` et si le nombre est uniquement multiple de 5, elle renvoie uniquement `"Buzz"`. 
        2. On a : 

            ```python linenums="1"
            def fizzbuzz(nombre: int) -> str | int :
                """
                Si le paramètre est multiple de 3 et de 5, elle renvoie `"FizzBuzz"`, si le nombre est uniquement mutliple de 3, elle renvoie uniquement `"Fizz"` et si le nombre est uniquement multiple de 5, elle renvoie uniquement `"Buzz"`.

                Pré-condition : nombre est un entier naturel
                """
                assert (type(nombre)==int) and (nombre>=0), "L'argument n'est pas valide"

                if nombre%3 == 0 and nombre%5 == 0:
                    return 'FizzBuzz'
                elif nombre%3 == 0:
                    return 'Fizz'
                elif nombre%5 == 0:
                    return 'Buzz'
                else:
                    return nombre
            ```

!!! exoordi "Exercice 10 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Augustin a déjà eu **3 notes sur 20 en NSI** : 14, 15 et 16, coefficientées respectivement 1, 2 et 4.  
    En révisant la **dernière évaluation du trimestre**, qui aura un **coefficient 4**, il veut prévoir **sa moyenne trimestrielle**  en fonction de cette dernière note.

    Il souhaite écrire une fonction Python `moyenne()` qui prend pour argument sa **dernière note** et renvoie sa **moyenne trimestrielle**.

    1. Donner le **prototype** de cette fonction.  
    2. Écrire la **spécification complète** (docstring avec paramètres, retour et préconditions).  
    3. Proposer une **implémentation Python** correcte.

    {{ python_playground(
      key="ch5-moyenne",
      hauteur="320px",
      example_file="files/NSI/Python/exemples/ch5/s_moyenne.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_moyenne_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_moyenne_tests.py"
    ) }}

    ??? success "Correction"
        1. Prototype : `def moyenne(note4: float) -> float`  
        2. Spécification :
            ```python linenums="1"
            def moyenne(note4: float) -> float:
                """
                Calcule la moyenne trimestrielle d'Augustin en fonction de sa dernière note.

                Paramètres :
                note4 (float) -> note obtenue à la dernière évaluation (coefficient 4)

                Retourne :
                float -> moyenne finale sur 20

                Précondition :
                0 <= note4 <= 20
                """
            ```
        3. Implémentation :
            ```python linenums="1"
            def moyenne(note4: float) -> float:
                """
                Calcule la moyenne trimestrielle d'Augustin en fonction de sa dernière note.

                Paramètres :
                note4 (float) -> note obtenue à la dernière évaluation (coefficient 4)

                Retourne :
                float -> moyenne finale sur 20

                Précondition :
                0 <= note4 <= 20
                """
                assert 0 <= note4 <= 20, "La note doit être comprise entre 0 et 20"
                somme = 14*1 + 15*2 + 16*4 + note4*4
                total_coef = 1 + 2 + 4 + 4
                return somme / total_coef
            ```


---

## Tester un programme

!!! exoordi "Exercice 11 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def est_pair(n):
        return n % 2 == 0
    ```

    1. Écris trois appels de test (avec `print(...)`) pour vérifier le bon fonctionnement de `est_pair`.
       
        Tu dois inclure :

          - un nombre pair positif,
          - un nombre impair,
          - éventuellement 0.
    2. Pour chaque appel, précise le résultat attendu (True ou False).


    {{ python_playground(
      key="ch5-est-pair",
      hauteur="240px",
      example_file="files/NSI/Python/exemples/ch5/s_est_pair.py"
    ) }}

    💡 Ici, pas de bouton **Valider** : c'est l'exécution elle-même qui te donne la réponse. Compare chaque affichage au résultat que tu avais prévu.

    ??? success "Correction"
        Par exemple :

        ```python linenums="1"
        print(est_pair(4))   # Attendu : True
        print(est_pair(7))   # Attendu : False
        print(est_pair(0))   # Attendu : True
        ```

!!! exoordi "Exercice 12 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def valeur_absolue(x):
        if x >= 0:
            return x
        else:
            return -x
    ```

    1. Donne le rôle de cette fonction.
    2. Propose un **jeu de tests automatiques** sous forme d'assertions (`assert ...`) pour vérifier son comportement sur :
        - un nombre positif ;
        - un nombre négatif ;
        - zéro.


    {{ python_playground(
      key="ch5-test-valeur-absolue",
      hauteur="380px",
      example_file="files/NSI/Python/exemples/ch5/s_test_valeur_absolue.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_test_valeur_absolue_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_test_valeur_absolue_tests.py"
    ) }}

    ??? success "Correction"
        1. Cette fonction renvoie la valeur absolue de `x`, c'est-à-dire la distance entre `x` et 0.
        2. Exemple de jeu de tests :

            ```python linenums="1"
            assert valeur_absolue(5) == 5      # positif
            assert valeur_absolue(-8) == 8     # négatif
            assert valeur_absolue(0) == 0      # zéro
            ```

!!! exoordi "Exercice 13 - :fontawesome-solid-star:  :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def fizzbuzz(nombre):
        if nombre%3 == 0 and nombre%5 == 0:
            return 'FizzBuzz'
        elif nombre%3 == 0:
            return 'Fizz'
        elif nombre%5 == 0:
            return 'Buzz'
        else:
            return nombre
    ```

    1. Que fait cette fonction ?
    2. Écrire un jeu de tests pour cette fonction.

    {{ python_playground(
      key="ch5-test-fizzbuzz",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch5/s_test_fizzbuzz.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_test_fizzbuzz_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_test_fizzbuzz_tests.py"
    ) }}

    ??? success "Correction"
        1. Si le nombre est multiple de 3 et de 5, elle renvoie `"FizzBuzz"`, si le nombre est uniquement mutliple de 3, elle renvoie uniquement `"Fizz"` et si le nombre est uniquement multiple de 5, elle renvoie uniquement `"Buzz"`. 
        2. Il faut tester au moins 4 cas, un pour chaque retour possible : 

            ```python linenums="1"
            def test_fizzbuzz():
                assert fizzbuzz(3) == 'Fizz'
                assert fizzbuzz(5) == 'Buzz'
                assert fizzbuzz(15) == 'FizzBuzz'
                assert fizzbuzz(2) == 2
            ```


!!! exoordi "Exercice 14 - :fontawesome-solid-star:  :fontawesome-solid-star: :fontawesome-regular-star:"
    On considère la fonction suivante :

    ```python linenums="1"
    def compte_voyelles(phrase):
        voyelles = 'aeiouy'
        nb_voyelles = 0
        for lettre in phrase:
            if lettre in voyelles:
                nb_voyelles += 1
        return nb_voyelles
    ```

    1. Quel est son rôle ?
    2. Écrire un jeu de tests pour cette fonction.

    {{ python_playground(
      key="ch5-test-voyelles",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch5/s_test_voyelles.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_test_voyelles_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_test_voyelles_tests.py"
    ) }}

    ??? success "Correction"
        1. Compter le nombre de voyelle dans une phrase passée en argument. 
        2. Il faudrait balayer un large choix de cas : 

            | Cas à tester | Entrée (`phrase`) | Résultat attendu | Justification |
            |---------------|------------------|------------------|----------------|
            | Cas simple | `"bonjour"` | `3` | Voyelles = o, o, u |
            | Majuscules | `"BONJOUR"` | `0` | La fonction ne gère que les minuscules — test de sensibilité à la casse |
            | Mélange majuscules/minuscules | `"Bonjour"` | `2` | Seules les voyelles minuscules comptent |
            | Phrase vide | `""` | `0` | Aucun caractère |
            | Sans voyelles | `"bcdfg"` | `0` | Test d’absence de voyelles |
            | Toutes voyelles | `"aeiouy"` | `6` | Toutes comptées |
            | Espaces et ponctuation | `"Salut, toi !"` | `4` | a, u, o, i (les signes ignorés) |
            | Accents | `"éàîôù"` | `0` | Les voyelles accentuées ne sont **pas** dans `'aeiouy'` |
            | Long texte | `"La programmation Python est cool"` | `10` | Vérifie le bon comptage sur une phrase complète |


!!! exoordi "Exercice 15 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Malek travaille sur un logiciel d’analyse pour un système de vente.  
    Il doit écrire une fonction `prix_unitaire()` qui prend en arguments le **prix total** et le **nombre de produits**, et qui renvoie le **prix d’un seul produit** dans un lot de produits identiques.  
    Pour plus de 10 unités, une **réduction de 10 %** est appliquée sur le prix total.

    Avant de la programmer, il crée une fonction `test()` qui vérifie le bon comportement de `prix_unitaire()` :

    ```python linenums="1"
    def test():
        if prix_unitaire(2, 1) != 2:
            return "Erreur 1"
        elif prix_unitaire(10, 5) != 2:
            return "Erreur 2"
        elif prix_unitaire(20, 10) != 2:
            return "Erreur 3"
        elif prix_unitaire(40, 18) != 2:
            return "Erreur 4"
        return "OK"
    ```

    1. Écris la fonction `prix_unitaire(total, nb)` qui respecte les consignes (et applique la réduction de 10 %).  
    2. Voici une nouvelle fonction : 

        ```python linenums="1"
        def prix_unitaire(total, nb):
            if total in (2, 10, 20, 40):
                return 2
            else:
                return 0
        ```

        L’appel de la fonction `test()` renvoie-t-il `"OK"` avec cette nouvelle fonction ? Essaie avec d’autres valeurs.  

    3. Que peux-tu conclure ?  
    4. Selon toi, la réussite de ce test prouve-t-elle que la fonction est correcte ? 

    {{ python_playground(
      key="ch5-prix-unitaire",
      hauteur="460px",
      example_file="files/NSI/Python/exemples/ch5/s_prix_unitaire.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_prix_unitaire_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_prix_unitaire_tests.py"
    ) }}

    ??? success "Correction"
        1. Une fonction correcte pourrait être :

            ```python linenums="1"
            def prix_unitaire(total, nb):
                if nb > 10:
                    total *= 0.9   # réduction de 10 %
                return total / nb
            ```

        2. L’appel à `test()` renvoie `"OK"`.  
        3. Cela signifie que la fonction fonctionne pour les **cas prévus**, mais pas forcément pour **tous les cas possibles**.  
        4. La réussite d’un test ne **garantit pas** la perfection du code : elle montre seulement que la fonction passe **certains jeux de tests**.

---

## Bibliothèques Python

!!! exoordi "Exercice 16 - :fontawesome-solid-star:  :fontawesome-regular-star: :fontawesome-regular-star:"
    Dans l'éditeur ci-dessous :

    1. Calculer la racine carrée de 25, puis de 2 ;
    2. Calculer $\pi^2$.

    La fonction racine carrée (*square root* en anglais) et la constante $\pi$ se trouvent dans le module `math`. À vous de l'importer.

    {{ python_playground(
      key="ch5-math",
      hauteur="260px",
      example_file="files/NSI/Python/exemples/ch5/s_math.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_math_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_math_tests.py"
    ) }}

    💡 Deux façons d'importer : `import math` puis `math.sqrt(25)`, ou `from math import sqrt, pi` puis directement `sqrt(25)`.

    ??? success "Correction"
        1. `sqrt(25)` et `sqrt(2)`
        2. `pi**2`

!!! exoordi "Exercice 17 - :fontawesome-solid-star:  :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère le programme suivant : 

    ```python linenums="1"
    import matplotlib.pyplot as plt

    abscisses = [0, 1, 2, 5, 8, 10, 15]
    ordonnees = [0, 1, 4, 25, 64, 100, 225]

    plt.plot(abscisses, ordonnees, "-o") 
    plt.show()
    ```

    1. Copier et exécuter ce programme dans [Basthon Notebook :octicons-link-external-16:](https://notebook.basthon.fr)

        ⚠️ C'est le seul exercice de ce chapitre qui ne se fait pas dans l'éditeur du site : celui-ci n'affiche pas de graphiques.
    2. Remplacer l'argument `"-o"` à la ligne 6 successivement par : 

        - `"o"`
        - `"-"`
        - `"--x"`
        - `":sg"`
        - `:+r"`

    ??? success "Correction"
        Pas de correction pour cet exercice

!!! exoordi "Exercice 18 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    On souhaite comparer la fonction `random()` du langage **JavaScript** et l’équivalent en **Python**.

    1. Importer le module Python `random`, puis afficher la documentation de la fonction `randint(a, b)` avec `help(random.randint)`.
    2. Que fait cette fonction ? Exécuter plusieurs fois pour observer.

    {{ python_playground(
      key="ch5-random",
      hauteur="320px",
      example_file="files/NSI/Python/exemples/ch5/s_random.py"
    ) }}

    3. Poursuivre : 
    4. Le langage JavaScript ne possède pas de fonction identique, mais dispose d’une fonction `Math.random()` dans la bibliothèque `Math`.  

        La documentation indique que cette fonction renvoie un **nombre flottant pseudo-aléatoire entre 0 inclus et 1 exclu**.  
    5. Quelles différences trouvez-vous entre la fonction Python et celle de JavaScript ?  
    6. Pouvez-vous trouver un **équivalent en Python** de la fonction JavaScript `random()` ?  

    ??? success "Correction"
        1. Pas de correction
        2. `import random` puis `help(random.randint)`
        3. La fonction `random.randint(a,b)` en Python retourne un **nombre entier aléatoire entre a inclus et b inclus**.  
        4. En JavaScript, `Math.random()` renvoie le même type de valeur.  
        5. Les deux fonctions génère un nombre aléatoirement, mais selon des conditions différentes : 
            - `randint` en Python génère un entier entre deux bornes incluses
            - `random` en JavaScript génère un flottant entre deux 0 et 1 exclus.
        6. La fonction `random()` du module `random` de Python est identique à celle de JavaScript. 

!!! exoordi "Exercice 19 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Le module `marvel` contient une liste nommée `personnages`, avec les noms (type `str`) de tous les personnages de l'univers Marvel. **Il est déjà disponible dans l'éditeur ci-dessous** : un simple `import marvel` suffit.

    Combien de personnages contiennent la chaîne de caractères `"Black"` ?

    {{ python_playground(
      key="ch5-marvel",
      hauteur="400px",
      example_file="files/NSI/Python/exemples/ch5/s_marvel.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_marvel_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_marvel_tests.py",
      module_files="files/NSI/.modules/marvel.py"
    ) }}

    💡 Le module est bien réel, mais son contenu ne s'affiche pas : c'est exactement la situation d'une **bibliothèque** que l'on utilise sans jamais en lire le code.

    

    ??? info "Indication"
        ```python linenums="1"
        import 

        def compte_perso(liste_persos, chaine):

            for perso in liste_persos:
                if ... in ...:
                    c += 1
            return 
        ```

    ??? success "Correction"
        ```python linenums="1"
        import marvel

        def compte_perso(liste_persos, chaine):
            c = 0
            for perso in liste_persos:
                if chaine in perso:
                    c += 1
            return  c

        print(compte_perso(marvel.personnages, "Black"))
        ```


!!! exoordi "Exercice 20 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    L'objectif de cet exercice est de mesurer le temps d'exécution d'un programme. On va pour cela utiliser le module `time`.

    1. Dans l'éditeur ci-dessous : 
        1. Importer le module `time`
        2. Consulter la documentation de ce module. Repérer dans la description les deux façons de représenter le temps. Nous utiliserons la première. 
        3. Noter la date correspondante à "the Epoch"
        4. Trouver dans les fonctions celle qui permet de récupérer le **temps courant** en secondes depuis the Epoch.
        5. Maintenant qu'on dispose d'une telle fonction, qui renvoie donc le temps courant **au moment où on l'appelle dans le programme**, comment l'utiliser pour mesure le temps d'exécution d'un programme ?
    2. On va maintenant utiliser cette fonction pour mesurer le temps d'exécution du programme (très inutile) suivant : 

        ```python linenums="1"
        for k in range(1000000):
            pass
        ```

        Compléter la fonction `duree_boucle(n)` ci-dessous :

        1. Affecter à une variable `temps_debut` le temps courant **avant** la boucle `for`.
        2. Affecter à une variable `temps_fin` le temps courant **après** la boucle `for`.
        3. Renvoyer la durée d'exécution.

    {{ python_playground(
      key="ch5-chrono",
      hauteur="340px",
      example_file="files/NSI/Python/exemples/ch5/s_chrono.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_chrono_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_chrono_tests.py"
    ) }}

    3. Faire varier `n` : la durée est-elle proportionnelle au nombre de tours ?

    ??? success "Correction"
        1. Réponse de la question 1
            1. `import time` 
            2. `dir(time)` pour la liste des fonctions ou `help(time)` pour la liste et la description
            3. "The Epoch" correspond au 1er janvier 1970
            4. `time()` renvoie le temps courant au moment où on appelle la fonction
            5. On mesure le temps avant exécution, puis après exécution et on soustrait. 
        2. Voici le programme en question : 

            ```python linenums="1"
            temps_debut = time.time()
            for k in range(1000000):
                pass
            temps_fin = time.time()

            print(temps_fin-temps_debut)
            ```

---

## Démasquer un bug

!!! info "Le principe de ces trois exercices"
    Un stagiaire a livré une version **subtilement buguée** de chacune des fonctions ci-dessous. Vous ne la voyez pas, mais la validation, elle, la connaît.

    Votre jeu de tests doit satisfaire **deux exigences** :

    1. passer sur la version correcte, celle qui est affichée dans l'éditeur ;
    2. **échouer** sur la version buguée.

    Un test qui passe partout ne prouve rien : c'est toute la leçon de ce chapitre.

!!! exoordi "Exercice 21 - Une histoire de borne - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    La fonction `est_majeur(age)` indique si une personne est majeure.

    Écrire `test_est_majeur()` de façon à démasquer la version buguée du stagiaire.

    {{ python_playground(
      key="ch5-bug-majeur",
      hauteur="400px",
      example_file="files/NSI/Python/exemples/ch5/s_bug_majeur.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_bug_majeur_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_bug_majeur_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        Tester 25 ans et 12 ans ne suffira pas : ces deux cas sont sans ambiguïté, et une fonction même approximative les traitera correctement.

        Le bug se cache là où l'on hésite. À partir de quel âge exactement devient-on majeur ? Testez **cette valeur-là**, et celle juste en dessous.

    ??? success "Ce qu'il fallait comprendre"
        La version buguée écrivait `age > 18` au lieu de `age >= 18` : une personne de **18 ans pile** y était déclarée mineure.

        On appelle cela une **erreur de borne**, et c'est l'un des bugs les plus fréquents en programmation. D'où la règle : quand une condition fait intervenir un seuil, on teste **toujours** la valeur du seuil elle-même.

!!! exoordi "Exercice 22 - La note fantôme - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    La fonction `moyenne(notes)` calcule la moyenne d'un tableau de notes.

    Écrire `test_moyenne()` de façon à démasquer la version buguée.

    {{ python_playground(
      key="ch5-bug-moyenne",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch5/s_bug_moyenne.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_bug_moyenne_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_bug_moyenne_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        Essayez d'abord `moyenne([10, 10, 10])`. Le test passe — sur les deux versions. Pourquoi ?

        Parce qu'avec des notes toutes identiques, en oublier une ne change rien au résultat. Il faut donc des notes **bien différentes** les unes des autres, et surtout une **dernière note** qui se distingue nettement.

    ??? success "Ce qu'il fallait comprendre"
        La version buguée s'arrêtait à l'avant-dernière note : `range(len(notes) - 1)` au lieu de `range(len(notes))`. C'est l'**erreur d'indice** classique, celle du décalage de un.

        La leçon dépasse ce bug : un jeu de tests n'est bon que si ses données sont **discriminantes**. Des valeurs toutes égales, des tableaux de taille 1, des zéros partout : ce sont de mauvais cas de test, car ils masquent les erreurs au lieu de les révéler.

!!! exoordi "Exercice 23 - La fonction qui récite - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    La fonction `aire_disque(rayon)` renvoie l'aire d'un disque.

    Cette fois, le stagiaire n'a pas fait d'erreur de calcul : il n'a **rien calculé du tout**. Sa fonction connaît par cœur quelques résultats et les récite.

    Écrire `test_aire_disque()` de façon à la démasquer.

    {{ python_playground(
      key="ch5-bug-triche",
      hauteur="420px",
      example_file="files/NSI/Python/exemples/ch5/s_bug_triche.py",
      solution_file="files/NSI/Python/.corrections/ch5/s_bug_triche_solution.py",
      tests_file="files/NSI/Python/.corrections/ch5/s_bug_triche_tests.py"
    ) }}

    ??? tip "Coup de pouce"
        Les rayons auxquels on pense spontanément — 0, 1, 2, 10 — sont précisément ceux qu'une fonction tricheuse aura appris par cœur.

        Prenez un rayon dont personne n'aurait l'idée. C'est aussi une bonne habitude en général : des jeux de tests trop prévisibles finissent par ne tester que la mémoire du programmeur.

    ??? success "Ce qu'il fallait comprendre"
        Vous venez de retrouver, par l'autre bout, la conclusion de l'exercice 15 : **la réussite d'un test ne prouve pas qu'un programme est correct**. Elle prouve seulement qu'il se comporte bien sur les cas testés.

        C'est pourquoi on ne se contente jamais des cas « évidents » : on cherche systématiquement les **cas limites**, les **valeurs inattendues** et les **données discriminantes**. Et lorsqu'un programme doit vraiment être sûr — un logiciel médical, un pilote automatique — les tests ne suffisent plus : il faut **prouver** sa correction, comme vous le ferez au chapitre d'algorithmique avec les invariants de boucle.
