---
title: Exercices
weight: 7  
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

## Variables et types de bases

!!! exoordi "Exercice 1 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Faire les exercices 1 à 9 sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968).


!!! exopapier "Exercice 2 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Pour chacune des variables ci-dessous, indiquer son type.

    1. `a = 2`
    2. `b = -1`
    3. `c = 3.14`
    4. `d = 1.0`
    5. `e = "Kevin"`
    6. `f = "Bonjour, " + "ça va ?"`
    7. `g = 2 + 6`
    8. `h = 4.2 + 1`
    9. `i = True`
    10. `j = False`

    ??? success "Correction"
        1. Integer
        2. Integer
        3. Float
        4. Float (à cause du `.0`)
        5. String
        6. String (car égal à `"Bonjour, ça va ?")
        7. Integer (car égal à `8`)
        8. Float (car égal à `5.2`)
        9. Boolean
        10. Boolean

---

## Instructions conditionnelles

!!! exoordi "Exercice 3 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Répondre aux exercices 10 à 14 sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968) **en utilisant uniquement des `if`**, les `elif` et `else` sont interdits. 

!!! exoordi "Exercice 4 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Répondre aux exercices 15 à 19 sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968)

---

## Les boucles 

!!! exoordi "Exercice 5 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Répondre aux exercices 20 à 28 portant sur les boucles non bornées sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968).

!!! exoordi "Exercice 6 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Répondre aux exercices 29 à 44 portant sur les boucles bornées sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968).

!!! exopapier "Exercice 7 - "
    1. Écrire un code Python qui affiche les entiers de 0 à 11.
    2. Écrire un code Python qui affiche les entiers de 10 à 21. 
    3. Écrire un code Python qui affiche les carrés des entiers entre 1 et 10 compris.
    4. Écrire un code Python qui affiche les multiples de 5 entre 5 et 100 compris.

    ??? success "Correction"
        1. On a : 
            ```python linenums="1"
            for i in range(12): 
                print(i)
            ```
        2. On a : 
            ```python linenums="1"
            for i in range(10, 22) : 
                print(i)
            ```
        3. On a : 
            ```python linenums="1"
            for i in range(1, 11) :
                print(i ** 2)
            ```
        4. On a : 
            ```python linenums="1"
            for i in range(5, 101, 5) : 
                print(i)
            ```

!!! exopapier "Exercice 8 - "
    On donne le script suivant : 

    ```python linenums="1"
    somme = 0
    for i in range(1, 6):
        somme = somme + i
    print(somme)
    ```

    Qu'affiche-t-il ?

    ??? success "Correction"
        Il affichera $15$.

        1. Au premier passage : `somme = 0+1 = 1`
        2. Au second passage : `somme = 1+2 = 3`
        3. Au troisième passage : `somme = 3+3 = 6`
        4. Au quatrième passage : `somme = 6+4 = 10`
        5. Au cinquième passage : `somme = 10+5 = 15`

--- 

## Les fonctions

!!! exoordi "Exercice 9 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Répondre aux exercices 45 à 48 portant sur le "*Parc d'attraction*" sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968).

!!! exoordi "Exercice 10 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Répondre aux exercices 49 à 51 portant sur les "*tables de multiplications*" sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968).

!!! exopapier "Exercice 11 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    On considère le programme suivant : 

    ```python linenums="1"
    def euro_vers_dollar(euros):
        return euros * 1.19 # en supposant qu'un euro vaut 1,19 dollars

    def dollar_vers_yuan(dollars):
        return dollars * 6.93 # en supposant qu'un dollar vaut 6,93 yuans

    def euro_vers_yuan(montant):
        # Appel de la fonction euro_vers_dollar
        montant_dollar = euro_vers_dollar(montant)
        # Appel de la fonction dollar_vers_yuan
        montant_yuan = dollar_vers_yuan(montant_dollar)
        # Valeur renvoyée
        return montant_yuan

    euros = float(input("entrez le montant en euros :"))
    montant_converti = euro_vers_yuan(euros)
    print(euros, "€ représente ", montant_converti, "yuan")
    ```

    Déterminer, pour chaque variable, si elle est **globale** ou **locale**. 
    
    Si elle est locale, on précisera la fonction associée et si elle est paramètre ou non.

    ??? success "Correction"
        - `euros` est une variable locale (paramètre) dans la fonction `euro_vers_dollars`. Une autre variable `euros` dans le corp du programme (ligne 15) est elle une variable globale.
        - `dollars` est une variable locale (paramètre) dans la fonction `dollars_vers_yuan`.
        - `montant` est une variable locale (paramètre) dans la fonction `euro_vers_yuan`.
        - `montant_dollar` est une variable locale dans la fonction `euro_vers_yuan`.
        - `montant_yuan` est une variable locale dans la fonction `euro_vers_yuan`.
        - `montant_converti` est une variable globale.

!!! exoordi "Exercice 12 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Répondre aux exercices 52 à 56 sur [Capytale](https://capytale2.ac-paris.fr/web/c/7de4-6907968).