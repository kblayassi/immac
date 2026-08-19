---
title: Manipulation et traitement
weight: 3
---

# Manipulation et traitement des tables 📊

Dans toute cette section, on utilisera la table suivante comme exemple. 

```python title="Table pour les exemples" linenums="1"
table = [
    {"ID": 1, "Nom": "Alice", "Âge": 16, "Moyenne": 15.8},
    {"ID": 2, "Nom": "Bob", "Âge": 17, "Moyenne": 13.2},
    {"ID": 3, "Nom": "Clara", "Âge": 16, "Moyenne": 17.5}
]
```

## 1 - Sélection et extraction de données 🔍

Une fois les données importées, il est souvent nécessaire de **ne travailler que sur une partie de la table** : certaines lignes ou certaines colonnes. Cette opération s'appelle **la sélection** ou **l'extraction**.

### Sélection de colonnes ↕️

Extraire une **colonne** revient à récupérer toutes les valeurs associées à un **descripteur** donné.

*Exemple : Pour extraire les noms des élèves d'une table représentée par une **liste de dictionnaires** :*

```python title="Exemple de sélection de lignes" linenums="1"
noms = [ligne["Nom"] for ligne in table]
print(noms)
```

```pyhton 
['Alice', 'Bob', 'Clara']
```

!!! tip "Info 💡"
    On remarquera que la liste est construire en **compréhension**. Cette méthode de construction est très pratique pour parcourir une table et extraire une colonne.

### Sélection de lignes ↔️

Sélectionner certaines **lignes** consiste à filtrer les enregistrements selon une **condition logique**.

*Exemple : On cherchera à extraire les élèves ayant une moyene supérieure à 15.*

```python title="Exemple de sélection de colonnes" linenums="1"
bons_eleves = [ligne for ligne in table if float(ligne["Moyenne"]) > 15]
for e in bons_eleves:
    print(e)
```

```python
{'ID': '1', 'Nom': 'Alice', 'Âge': '16', 'Moyenne': '15.8'}
{'ID': '3', 'Nom': 'Clara', 'Âge': '16', 'Moyenne': '17.5'}
```

!!! warning "Attention !"
    Les valeurs provenant de fichiers CSV sont souvent des **chaînes de caractères**. Il faut donc parfois les convertir en nombres (`float()` ou `int()`) pour exploiter les données.

### Sélection de lignes et de colonnes ↕️↔️

On peut combiner les deux opérations pour ne garder qu’une information spécifique sur certaines lignes.

*Exemple : Dans la même table que les exemples précédents, on cherche à récupérer les noms des élèves ayant une moyenne supérieure à 15.*

```python title="Exemple de sélection de lignes et de colonnes" linenums="1"
noms_bons = [ligne["Nom"] for ligne in table if float(ligne["Moyenne"]) > 15]
print(noms_bons)
```

```python
['Alice', 'Clara']
```

!!! tip "Sélection sur plusieurs conditions"
    Si nécessaire, il est possible de combiner plusieurs conditions avec les **opérateurs logiques** `and`, `or` et `not`.

    Exemple : on pourrait imaginer extraire les élèves de 16 ans avec une moyenne supérieure ou égale à 16 : 

    ```python title="Exemple de sélection avec plusieurs critères" linenums="1"
    selection = [ligne for ligne in table if int(ligne["Âge"]) == 16 and float(ligne["Moyenne"]) >= 16]
    ```

!!! info "À retenir !"
    - On peut extraire une **colonne** en définissant une **liste en compréhension** : `[ligne["Nom"] for ligne in table]`
	- On filtre les **lignes** en ajoutant une **condition** dans la compréhension de liste.
	- Les **valeurs numériques** doivent être converties (`int()` ou `float()`) si elles viennent d’un fichier CSV.
	- Les **opérateurs logiques** permettent de combiner plusieurs conditions (`and`, `or`, `not`).

---

## 2 - Tri des tables 📊

Trier une table permet de **réorganiser les enregistrements** selon les valeurs d’un descripteur, en ordre **croissant** ou **décroissant**. Cette opération est très utile pour **analyser les données**, par exemple trier des élèves par moyenne ou par âge.

En Python, on utilise la fonction `sorted()` pour trier une **liste**. Pour trier une **liste de dictionnaires**, on utilise l'argument `key` pour indiquer la **valeur à comparer**.

!!! python "Fonction `sorted()`"
    La structure de la fonction `sorted()` est la suivante : 

    ```python
    sorted(table : list/dict, key: function , reverse: bool) -> list
    ```

    Cette fonction prend en argument : 

    - Une **liste** ou un **dictionnaire** que l'on souhaite trier.
    - *[Optionel]* Une **clé de tri** `key` : il s'agit d'une fonction qui spécifie quelle.s donnée.s trier si plusieurs sont disponibles (comme dans une liste de tuple ou dans un dictionnaire).
    - *[Optionel]* Un booléen `reverse` : s’il vaut `True`, le tri se fait en ordre décroissant ; s’il vaut `False` (par défaut), le tri est croissant.

    La fonction renverra une **liste** triée de nos éléments. 

!!! tip "`sorted()` ou `sort()` ?"
    Contrairement à la fonction `sorted()` qui créer une nouvelle liste triée, la fonction `sort()` modifie la liste initiale et ne renvoie rien (`None`). 

    On privilégiera donc la fonction `sorted()` pour toujours garder une copie de notre table initiale.


*Exemple : On va trier notre table par moyenne décroissante*

```python title="Tri par moyenne croissante" linenums="1"
def cle_tri(dico): #(1)
    return dico['Moyenne'] #(2)

table_triee = sorted(table, key=cle_tri, reverse=True) #(3)

print(table_triee)
```

1. On créé notre clé de tri
2. Ici, on souhaite effectuer un tri selon la valeur du descripteur `Moyenn`. La fonction renvoie donc la valeur du descripteur `Moyenne`.
3. Arguments : 
    - `table` : nom de notre table, 
    - `key=cle-tri` : on indique quelle est notre fonction clé de tri, 
    - `reverse=True` : car on souhaite un tri décroissant

```python 
[{'ID': 3, 'Nom': 'Clara', 'Âge': 16, 'Moyenne': 17.5},{'ID': 1, 'Nom': 'Alice', 'Âge': 16, 'Moyenne': 15.8}, {'ID': 2, 'Nom': 'Bob', 'Âge': 17, 'Moyenne': 13.2}]
```

!!! tip "Tri selon plusieurs descripteurs"
    On peut aussi trier selon **plusieurs descripteurs**, en fournissant une clé de tri renvoyant un tuple de données.

    *Exemple : si l'on souhaite trier par âge puis par moyenne décroissante, on procèdera comme ci-dessous :*

    ```python title="Tri selon plusieurs descripteurs" linenums="1"
    def cle_tri(dico):
    return (dico['Âge'], -dico['Moyenne']) #(1)

    table_triee = sorted(table, key=cle_tri)

    print(table_triee)
    ```

    1. Ici, on souhaite que le tri s'effectue en priorité sur l'**âge** des élèves. La première valeur est du tuple est donc la valeur du descripteur `Âge`. Le second critère de tri est la `Moyenne`. <br/> <br/> 🔎 Remarque : on met un **signe négatif** devant la moyenne pour inverser l’ordre de tri (décroissant).

    ```python
    [{'ID': 3, 'Nom': 'Clara', 'Âge': 16, 'Moyenne': 17.5}, {'ID': 1, 'Nom': 'Alice', 'Âge': 16, 'Moyenne': 15.8}, {'ID': 2, 'Nom': 'Bob', 'Âge': 17, 'Moyenne': 13.2}]
    ```

!!! expert "Pour aller plus loin : la fonction `lambda`"
    Python permet une syntaxe plus brève :

    ```python
    table_triee = sorted(table, key=lambda dico: dico['Moyenne'])
    ```

    La fonction est définie de façon plus brève avec une expression `lambda`.

    L’expression commence par l’expression `lambda` suivie des paramètres, ici le paramètre se nomme  `dico`, puis le "résultat" de la fonction, ici `dico['Moyenne']` pour effectuer un tri selon la moyenne des élèves.


!!! info "À retenir !"
    - On utilise la fonction `sorted()` pour trier une table.
    - L’argument `key=...` permet de spécifier la ou les données à trier.
    - `reverse=True` inverse l’ordre pour un tri.
    - On peut trier selon **plusieurs critères** en retournant un **tuple** dans la clé.
    - **Penser à convertir** les valeurs numériques si elles viennent d’un fichier CSV (`int()` ou `float()`).

---

## 3 - Agrégation de données ➕

Lorsque l'on travaille avec des tables, il est souvent utile de **résumer les données** à l'aide de calculs globaux : **somme**, **moyenne**, **maximum**, **comptage**, etc.  
Ces opérations sont appelées **opérations d’agrégation**.

Elles permettent par exemple de :  

- connaître la **moyenne générale** d’une classe ;
    
    ```python title="Calcul de la moyenne générale" linenums="1"
    somme = sum([float(ligne["Moyenne"]) for ligne in table])
    effectif = len(table)
    moyenne = somme / effectif
    ```

- compter le **nombre d’élèves** ayant plus de 15 ; 
    
    ```python title="Calcul d'un nombre d'élèves" linenums="1"
    nb_bons = len([ligne for ligne in table if float(ligne["Moyenne"]) > 15])
    ```

- déterminer le **meilleur score**.

    ```python title="Calcul de la meilleure moyenne" linenums="1"
    meilleur = max(table, key=lambda ligne: float(ligne["Moyenne"]))
    ```

On remarquera que l’agrégation de données consiste généralement à **extraire des valeurs** numériques d’une table (éventuellement après filtrage), puis à leur appliquer une **fonction mathématique**, souvent déjà présente en Python (`sum`, `len`, `max`, etc.).

!!! info "À retenir !"
    - Les fonctions `sum()`, `len()`, `max()`, `min()` permettent d’effectuer des **agrégations simples**.
    - Les **compréhensions de liste** sont très utiles pour filtrer et extraire les données numériques.
    - Il faut toujours penser à **convertir les données** (`int()` ou `float()`) si elles proviennent d’un fichier CSV.
    - Il est possible de regrouper les données à la main pour faire des **moyennes par groupe**.