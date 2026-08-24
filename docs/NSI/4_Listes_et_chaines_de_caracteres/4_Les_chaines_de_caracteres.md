---
title: Les chaînes de caractères
weight: 4
---

# Les chaînes de caractères ✂️

Vous manipulez des chaînes depuis votre tout premier `print("Bonjour")`. Il est temps de découvrir qu'une chaîne n'est pas un bloc insécable : c'est une **séquence**, exactement comme un tableau — et presque tout ce que vous savez faire sur un tableau, vous savez déjà le faire sur une chaîne.

!!! definition "Définition : chaîne de caractères"
    Une **chaîne de caractères** (type `str` en Python) est une suite **ordonnée** de caractères, chacun repérable par son **indice**.

    Un caractère est une lettre, un chiffre, un espace, une ponctuation, un emoji...

!!! python "Écrire une chaîne"
    Les guillemets simples et doubles sont équivalents.

    ```python linenums="1"
    a = "Bonjour"
    b = 'Bonjour'          # identique à a
    c = "L'informatique"   # les doubles évitent d'échapper l'apostrophe
    vide = ""              # la chaîne vide : 0 caractère
    ```

---

## 1 - Longueur et indexation

Tout se passe comme pour un tableau : `len()` pour la taille, des crochets pour accéder à un caractère.

!!! python "Accéder à un caractère"
    On utilise des crochets, exactement comme pour une liste :

    ```python linenums="1"
    mot = "PYTHON"
    print(len(mot))    # 6
    print(mot[0])      # P   (le premier caractère)
    print(mot[3])      # H
    print(mot[-1])     # N   (le dernier)
    ```

| Caractère | `P` | `Y` | `T` | `H` | `O` | `N` |
|:----------|:---:|:---:|:---:|:---:|:---:|:---:|
| Indice | 0 | 1 | 2 | 3 | 4 | 5 |
| Indice négatif | −6 | −5 | −4 | −3 | −2 | −1 |

!!! warning "Indice hors limites"
    Comme pour un tableau, dépasser la longueur provoque une erreur :

    ```python linenums="1"
    mot = "PYTHON"
    print(mot[6])   # IndexError: string index out of range
    ```

    Le dernier indice valide est toujours `len(mot) - 1`, soit 5 ici.

!!! tip "Un caractère est... une chaîne"
    En Python, il n'existe pas de type « caractère » distinct : `mot[0]` renvoie la chaîne `"P"`, de longueur 1.

---

## 2 - Une chaîne ne se modifie pas

Voici **la** différence essentielle avec les tableaux.

!!! propriete "Les chaînes sont non modifiables"
    Une chaîne de caractères est **immuable** : une fois créée, son contenu ne peut plus changer.

    ```python linenums="1"
    mot = "PYTHON"
    mot[0] = "C"   # TypeError: 'str' object does not support item assignment
    ```

    Une liste, elle, accepterait cette écriture sans broncher.

Comment fait-on, alors, pour « modifier » un mot ? On n'en modifie pas : on en **fabrique un nouveau**.

!!! example "Remplacer le premier caractère"
    On fabrique une nouvelle chaîne en assemblant le caractère voulu et le reste de l'ancienne :

    ```python linenums="1"
    mot = "PYTHON"
    nouveau = "C" + mot[1:]    # on assemble "C" et "YTHON"
    print(nouveau)             # CYTHON
    print(mot)                 # PYTHON  (l'original est intact)
    ```

!!! tip "Une bonne nouvelle, en réalité"
    L'immuabilité fait disparaître d'un coup tous les pièges d'**alias** rencontrés avec les listes : une chaîne ne pouvant pas changer, la partager ne présente aucun danger.

!!! propriete "Tableaux et chaînes : le tableau comparatif"
    | | Tableau (`list`) | Chaîne (`str`) |
    |:---|:---:|:---:|
    | Ordonné, indexé à partir de 0 | ✅ | ✅ |
    | `len()`, parcours `for`, opérateur `in` | ✅ | ✅ |
    | Concaténation avec `+` | ✅ | ✅ |
    | Modifiable après création | ✅ | ❌ |
    | `L[i] = valeur`, `append()` | ✅ | ❌ |
    | Risque d'alias | ⚠️ oui | non |

---

## 3 - Concaténer et répéter

!!! python "Les opérateurs `+` et `*`"
    L'opérateur `+` **concatène** deux chaînes bout à bout, tandis que `*` en **répète** une :

    ```python linenums="1"
    prenom = "Ada"
    nom = "Lovelace"

    complet = prenom + " " + nom     # concaténation
    print(complet)                   # Ada Lovelace

    print("-" * 20)                  # répétition : --------------------
    ```

!!! warning "On ne mélange pas les torchons et les serviettes"
    On ne peut pas concaténer une chaîne et un nombre : il faut d'abord **convertir** le nombre en chaîne.

    ```python linenums="1"
    age = 17
    print("J'ai " + age + " ans")        # TypeError !
    print("J'ai " + str(age) + " ans")   # ✅ après conversion
    print("J'ai", age, "ans")            # ✅ ou plus simplement
    ```

---

## 4 - Parcourir une chaîne

Les deux parcours des tableaux fonctionnent à l'identique.

=== "Parcours par caractère"
    Le plus lisible, quand seul le contenu importe.

    ```python linenums="1"
    mot = "NSI"
    for lettre in mot:
        print(lettre)
    ```

=== "Parcours par indice"
    Nécessaire dès que la **position** entre en jeu.

    ```python linenums="1"
    mot = "NSI"
    for i in range(len(mot)):
        print("Indice", i, ":", mot[i])
    ```

!!! python "L'opérateur `in` cherche une sous-chaîne"
    Sur une chaîne, `in` ne se limite pas aux caractères isolés :

    ```python linenums="1"
    phrase = "J'aime la NSI"
    print("NSI" in phrase)      # True
    print("maths" in phrase)    # False
    ```

!!! example "Compter les voyelles d'un mot"
    Un compteur, une boucle sur les lettres, et un test d'appartenance :

    ```python linenums="1"
    def compter_voyelles(mot):
        compteur = 0
        for lettre in mot:
            if lettre in "aeiouy":
                compteur = compteur + 1
        return compteur

    print(compter_voyelles("anticonstitutionnellement"))   # 10
    ```

    On retrouve exactement le **schéma de l'accumulateur** de la partie précédente : ce qui fonctionne sur un tableau fonctionne sur une chaîne.

---

## 5 - Pour aller plus loin

!!! expert "Pour aller plus loin : les tranches (*slicing*)"
    Extraire un morceau de chaîne est si courant que Python offre une syntaxe dédiée :

    ```python linenums="1"
    mot[debut:fin]        # du caractère d'indice debut à fin - 1
    mot[debut:fin:pas]    # idem, en avançant de pas en pas
    ```

    ⚠️ Comme pour `range()`, l'indice de **fin est exclu**.

    ```python linenums="1"
    mot = "INFORMATIQUE"
    print(mot[0:5])     # INFOR   (indices 0, 1, 2, 3, 4)
    print(mot[:5])      # INFOR   (depuis le début)
    print(mot[5:])      # MATIQUE (jusqu'à la fin)
    print(mot[-3:])     # QUE     (les trois derniers)
    print(mot[::2])     # IFRAIU  (un caractère sur deux)
    print(mot[::-1])    # EUQITAMROFNI  (à l'envers !)
    ```

    `mot[::-1]` parcourt la chaîne avec un pas de $-1$ : c'est le moyen le plus court de l'inverser, idéal pour tester si un mot est un **palindrome**.

    ```python linenums="1"
    def est_palindrome(mot):
        return mot == mot[::-1]

    print(est_palindrome("radar"))   # True
    ```

    Bonne nouvelle : tout ceci s'applique aussi aux listes — `L[1:3]`, `L[::-1]`, et même `L[:]`, que vous connaissez déjà comme moyen de **copier** un tableau.

!!! expert "Pour aller plus loin : les f-strings"
    Une écriture bien plus confortable pour insérer des valeurs dans un texte : préfixez la chaîne d'un `f`, et placez vos variables entre accolades.

    ```python linenums="1"
    prenom = "Ada"
    age = 17
    print(f"{prenom} a {age} ans, soit {age * 12} mois.")
    # Ada a 17 ans, soit 204 mois.
    ```

!!! expert "Pour aller plus loin : comparer des chaînes"
    Les opérateurs de comparaison fonctionnent sur les chaînes, qui sont classées dans l'ordre **lexicographique**, celui du dictionnaire :

    ```python linenums="1"
    print("abricot" < "banane")   # True
    print("Chat" == "chat")       # False : la casse compte !
    print("Zoé" < "abricot")      # True  😱
    ```

    Chaque caractère est en réalité représenté par un **nombre**, et les majuscules ont des numéros plus petits que les minuscules. Pour comparer équitablement, on met tout dans la même casse : `mot1.lower() < mot2.lower()`.

    Vous découvrirez ces numéros — l'**ASCII** et l'**Unicode** — dans le chapitre consacré à l'encodage des caractères. 🔡

---

## À retenir 📌

!!! info "Résumé"
    - Une chaîne est une **séquence** de caractères : `len()`, indexation `mot[i]`, indices négatifs, parcours `for`, opérateur `in`.
    - Une chaîne est **immuable** : `mot[0] = "C"` est impossible. On ne modifie pas une chaîne, on en **construit une nouvelle**.
    - `+` concatène, `*` répète, et il faut **convertir** avec `str()` avant de concaténer un nombre.
    - On parcourt une chaîne comme un tableau, **caractère par caractère** ou **par indice**, et l'opérateur `in` y cherche une sous-chaîne.
    - Les **tranches** `mot[debut:fin:pas]` extraient un morceau ; `mot[::-1]` renvoie la chaîne à l'envers.
