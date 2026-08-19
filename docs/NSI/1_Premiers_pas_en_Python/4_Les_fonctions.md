---
title: Les fonctions
weight: 4
---

# Les fonctions 🛠️📦

Les **fonctions** sont un outil fondamental en programmation : elles permettent de **regrouper un ensemble d’instructions** sous un **nom**.  
Cela permet de **réutiliser** du code facilement, d’**organiser** un programme et de **le rendre plus lisible**.

---

## Définir une fonction 🧱

!!! definition "Définition : fonction"
    Une **fonction** est un bloc de code qui **porte un nom** et qui peut être **appelé à plusieurs endroits** d’un programme.

!!! python "Structure d’une fonction"
    En Python, une fonction se définit avec le mot-clé `def` :

    ```python linenums="1"
    def nom_de_la_fonction(paramètres):
        instructions
    ```

=== "Exemple 1"

    Une fonction sans paramètre :  
    ```python linenums="1"
    def bonjour():
        print("Bonjour tout le monde !")
    ```

    Pour l’exécuter, on écrit :  
    ```python
    bonjour()
    ```

=== "Exemple 2"

    Une fonction avec un paramètre :  
    ```python linenums="1"
    def dire_bonjour(prenom):
        print(f"Bonjour {prenom} !")
    ```

    Elle peut être appelée plusieurs fois avec des valeurs différentes :
    ```python
    dire_bonjour("Ali")
    dire_bonjour("Lucie")
    ```

!!! tip "Avantages des fonctions"
    - ✂️ **Réutiliser** du code facilement
    - 🧠 **Alléger** le programme principal
    - 🧩 **Isoler** des traitements pour mieux tester
    - 🧹 **Améliorer la lisibilité** du code

---

## Retourner une valeur avec `return` 🔄

Certaines fonctions **retournent un résultat** après un calcul. On utilise pour cela le mot-clé `return`.

!!! python "Fonction avec un `return`"
    Lorsque l'on veut récuper le résultat d'une fonction, on utilisera le mot clé `return` à la fin des instructions afin de **renvoyer** le résultat voulu. 

    ```python linenums="1"
    def nom_de_la_fonction(parametres):
        instructions
        return resultat
    ```

Par exemple, on peut écrire une fonction renvoyant le carré du nombre passé en paramètres : 

```python
def carre(n):
    return n*n
```

L'appel de cette fonction renverra le carré du nombre demandé : 

```python 
carre(5)
---
>>> 25
```

!!! tip "Différence print vs return"
    - `print()` **affiche** quelque chose à l’écran, mais ne le garde pas en mémoire. 
    - `return` **renvoie une valeur** à celui qui a appelé la fonction. On peut donc la stockée dans une variable pour l'exploiter ultérieurement dans le programme. 

---

## Paramètres, variables locales et variables globales 🌍

!!! definition "Définitions : Paramètres, variables locales et variables globales"
    Il faudra veiller à discerner ces trois notions pourtant proches : 

    - Un **paramètre** (ou **argument**) est une variable donnée entre parenthèse lors de la création d'une fonction. 
    - Une **variable locale** est une variable qui n'existe **que pendant l’exécution de la fonction**. 
    - Une **variable globale** est une variable définie **en dehors des fonctions** et accessible **dans tout le programme**.

=== "Exemple 1"

    On considère le programme Python suivant : 

    ```python linenums="1"
    a = 123

    def carre(n):
        resultat = n*n
        return resultat

    print(carre(a))
    ```

    Dans ce programme : 

    - `a` est une variable globale
    - `n` est un paramètre de la fonction `carre`, c'est donc une variable locale.
    - `resultat` est une variable locale

=== "Exemple 2"

    On considère le programme Python suivant : 

    ```python linenums="1"
    nbr1 = 10
    nbr2 = 20

    def moyenne(a, b):
        return (a+b)/2

    moyenne = moyenne(nbr1, nbr2)
    print(moyenne)
    ```

    Dans ce programme : 
    
    - `nbr1`, `nbr2` et `moyenne` sont des variables globales
    - `a` et `b` sont des paramètres de la fonction `moyenne`, ce sont donc des variables locales.

!!! expert "Utilisation des variables globales"
    Il est possible **de lire** simplement une variable globale depuis une fonction.

    ❗ Toutefois, pour **la modifier**, il faut utiliser le mot-clé `global` :
    ```python linenums="1"
    compteur = 0

    def incrementer():
        global compteur
        compteur += 1
    ```

    ⚠️ Cet usage n'est cependant pas encourager et doit rester exceptionnel, au risque de rendre un programme **difficile à comprendre et à maintenir**.

!!! tip "Des éléments facultatifs"
    Comme nous le verrons en TP, certains éléments sont facultatifs :

    - les **paramètres** : si m'a fonction n'a pas besoin de données d'entrée, il n'est pas nécessaire de lui donner des paramètres. Il faudra toutefois concerver les parenthèses.
    - le **`return`** : parfois une fonction peut ne rien renvoyer. Au lieu d'écrire `return None`, on se contentera de ne rien écrire. On parle de *procédures*. 

    En voici un exemple : 

    ```python
    def message_de_bienvenue():
        print("Merci de votre visite !")
    ```

!!! expert "Pour aller plus loin : le docstring d'une fonction"
    Nous reviendrons plus tard dans l’année sur les "docstring" d’une fonction, et ajouterons d’autres éléments. Pour le moment, nous les utiliserons pour expliquer le rôle d’une fonction.

    Cette "docstring" est composée de lignes de texte écrites entre `"""` et `"""`.

    Ces lignes ne sont pas exécutées par le programme, et simplement destinées à donner des explications à celui qui lit le code (script).

    Par exemple :

    ```python
    def euro_vers_dollar(montant):
        """
        Cette fonction renvoie la valeur de montant euros convertie en dollars.
        par exemple euro_vers_dollar(2) doit renvoyer 2,38
        """
        return montant * 1.19 # en supposant qu'un euro vaut 1,19 dollars
    ```

---

## À retenir 📌

!!! info "Résumé"
    - Une fonction est un bloc de code qu’on peut appeler par son nom
    - Les fonctions sont définies avec `def` et peuvent prendre des **paramètres**
    - Le mot-clé `return` permet de renvoyer un **résultat**
    - Les **variables locales** n’existent que dans la fonction
    - Les **variables globales** peuvent être lues, mais doivent être déclarées avec `global` si modifiées
    - Les fonctions rendent le code plus lisible et réutilisable