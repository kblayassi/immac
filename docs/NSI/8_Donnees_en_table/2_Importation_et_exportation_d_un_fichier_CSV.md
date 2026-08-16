---
title: Importation et exportation de fichier CSV
weight: 2
---

# Importation et exportation d'un fichier CSV 🗃️

Après avoir appris à représenter une table en Python, nous allons maintenant voir **comment exploiter ces données efficacement**. Cette partie vous permettra de **charger, rechercher, trier et modifier** des tables, tout en appliquant des opérations courantes sur les fichiers CSV.

Nous commencerons par **importer et exporter des fichiers CSV en Python**, car ils sont un format universel pour l’échange de données. Ensuite, nous verrons comment **sélectionner, filtrer et trier** les informations dans une table.

Dans toute cette section, on utilisera le fichier CSV suivant comme exemple. 

```CSV title="eleves.csv" linenums="1"
ID,Nom,Âge,Moyenne
1,Alice,16,15.8
2,Bob,17,13.2
3,Clara,16,17.5
```

---

## 1 - Importation des fichiers CSV en Python :simple-python:

Comme vu précédemment, les fichiers CSV sont couramment utilisés pour **stocker et partager des données tabulaires**. En Python, nous pouvons **importer et exporter des fichiers CSV** à l’aide du module `csv`, qui offre plusieurs outils adaptés.

!!! definition "Définition : Importer un fichier"
    **Importer un fichier** est une opération qui consiste à lire les informations d'un fichier externe au programme, de manière à pouvoir effectuer un traitement informatique sur les valeurs lues.

### Lecture d’un fichier CSV 📥

Pour lire un fichier CSV, on utilise le module `csv` et la fonction `csv.reader()`, qui charge le fichier sous forme de **liste de listes**.

Exemple de lecture d'un fichier nommé `eleves.csv` :

```python title="Python" linenums="1"
import csv #(1)

with open("eleves.csv", "r") as fichier: #(2)
    lecteur = csv.reader(fichier, delimiter=",")  # (3)
    table = list(lecteur)  #(4)

# Affichage (optionnel) du résultat
for ligne in table:
    print(ligne)
```

1. On importe le module csv
2. On ouvre le fichier `eleves.csv` et on le stocke dans la variable `fichier` pour l'exploiter dans la suite du programme. <br/><br/> 🔎 Remarques : <ul> <li>L'argument `"r"` signifie que l'on ouvre le fichier en mode lecture (**r**ead)</li><li>Il faut parfois ajouter un argument `newline=''` pour supprimer les retours à la ligne (`/n`) présent dans le fichier CSV;</li> <li>Il faut parfois préciser l'encodage du fichier CSV avec l'argument `encoding="utf-8"` par exemple</li></ul>
3. On créer un nouvel objet `reader` en lui précisant le délimiteur utilisé.
4. *[Optionel]* On stocke le contenu dans une liste `table` pour l'utiliser utlérieurement.

```python
[‘ID’, ‘Nom’, ‘Âge’, ‘Moyenne’]
[‘1’, ‘Alice’, ‘16’, ‘15.8’]
[‘2’, ‘Bob’, ‘17’, ‘13.2’]
[‘3’, ‘Clara’, ‘16’, ‘17.5’]
```

L’inconvénient de cette méthode est que l’accès aux valeurs se fait par **indice numérique** (`ligne[1]` pour le nom), ce qui **peut être source d’erreurs**.

### Lecture d’un CSV sous forme de liste de dictionnaires 🔑

Pour manipuler les données plus facilement, on peut utiliser `csv.DictReader()`, qui charge chaque ligne sous forme de **dictionnaire**, avec les **descripteurs comme clés**.

Exemple de lecture d'un fichier nommé `eleves.csv` :

```python title="Python" linenums="1"
import csv

with open("eleves.csv", "r") as fichier:
    lecteur = csv.DictReader(fichier, delimiter=",")  #(1)
    table = list(lecteur)  #(2)

# Affichage du résultat
for ligne in table:
    print(ligne)
```

1. On utilise `DictReader` au lieu de `reader` pour préciser que l'on souhaite obtenir un dictionnaire et non pas une liste.
2. Création, optionnelle, d'une variable pour stocker notre liste de dictionnaire.


```python
{‘ID’: ‘1’, ‘Nom’: ‘Alice’, ‘Âge’: ‘16’, ‘Moyenne’: ‘15.8’}
{‘ID’: ‘2’, ‘Nom’: ‘Bob’, ‘Âge’: ‘17’, ‘Moyenne’: ‘13.2’}
{‘ID’: ‘3’, ‘Nom’: ‘Clara’, ‘Âge’: ‘16’, ‘Moyenne’: ‘17.5’}
```

Cette approche est **plus lisible et plus sécurisée**, car elle permet d’accéder aux valeurs par **descripteur** (`ligne["Nom"]` au lieu de `ligne[1]`).

!!! warning "Erreurs courantes"
    1. **Problème d’encodage (`UnicodeDecodeError`)**
        - Vérifier que le fichier est bien encodé en **UTF-8**.
        - Utiliser `encoding="utf-8"` lors de l’ouverture du fichier si nécessaire.

    2. **Erreur de séparateur mal interprété**
        - Vérifier si le fichier utilise `","`, `";"`, ou `"\t"` comme séparateur.
        - Ouvrir le fichier avec un éditeur de texte pour identifier le bon séparateur.

    3. **Conversion des nombres incorrecte**
        - `csv.reader()` stocke toutes les valeurs sous **forme de chaînes**.
        - Penser à convertir : 
            ```python 
            ligne["Âge"] = int(ligne["Âge"])
            ligne["Moyenne"] = float(ligne["Moyenne"])
            ```

!!! info "À retenir !"
    - `csv.reader()` et `csv.DictReader()` permettent **d’importer des fichiers CSV** sous forme de **listes de listes** ou **listes de dictionnaires**.
    - **La liste de dictionnaires est souvent plus pratique** car elle permet un accès **direct aux valeurs par descripteur**.
    - **Faire attention aux encodages (`UTF-8` recommandé)** et aux séparateurs (`","`, `";"` ou `"\t"`).

---

## 2 - Exportation des fichiers CSV en Python :simple-python:

De façon similaire, nous pouvons également **exporter** des données Python en un fichier CSV.

!!! definition "Exporter une table" 
    **Exporter une table vers un fichier** est une opération qui consiste à enregistrer les valeurs d'une table Python dans un fichier externe  au programme. C'est l'opération inverse d'une importation.

L’écriture d’un fichier CSV peut se faire, toujours à l'aide du module `csv` de Python, de deux manières :

- **Avec `csv.writer()`** si les données sont sous forme de liste de listes.
- **Avec `csv.DictWriter()`** si les données sont sous forme de liste de dictionnaires.

#### Écriture d’un CSV à partir d’une liste de listes

```python title="Python" linenums="1"
import csv #(1)

table = [
    ["ID", "Nom", "Âge", "Moyenne"],
    [1, "Alice", 16, 15.8],
    [2, "Bob", 17, 13.2],
    [3, "Clara", 16, 17.5]
]

# Écriture dans un fichier CSV
with open("eleves_export.csv", "w") as fichier: #(2)
    writer = csv.writer(fichier, delimiter=",") #(3)
    writer.writerows(table)  #(4)
```

1. On importe le module `csv` de Python nécessaire
2. On créer un fichier nommé `eleves_export.csv` dans le même dossier que le fichier python. On ouvre celui-ci en mode écrite (`w` pour `write`).
3. On déclare un objet `writer`, ce sera notre "écrivain". On lui précise dans quel fichier écrire (ici `fichier`) et quel délimiteur utiliser (ici la virgule).
4. On écrit chaque ligne de notre table `table` dans le document. <br/> <br/> 🔎 Remarque : On pourrait ajouter manuellement de nouvelles lignes avec `writer.writerow(...)` (sans le S)

#### Écriture d’un CSV à partir d’une liste de dictionnaires

```python title="Python" linenums="1"
import csv #(1)

table = [
    {"ID": 1, "Nom": "Alice", "Âge": 16, "Moyenne": 15.8},
    {"ID": 2, "Nom": "Bob", "Âge": 17, "Moyenne": 13.2},
    {"ID": 3, "Nom": "Clara", "Âge": 16, "Moyenne": 17.5}
]

# Écriture dans un fichier CSV
with open("eleves_export_dict.csv", "w") as fichier: #(2)
    descripteurs = ["ID", "Nom", "Âge", "Moyenne"]  #(3)
    writer = csv.DictWriter(fichier, descripteurs, delimiter=",") #(4)
    writer.writeheader()  # Écriture de l'en-tête
    writer.writerows(table)  # Écriture des lignes
```

1. On importe le module `csv` de Python nécessaire
2. On créer un fichier nommé `eleves_export_dict.csv` dans le même dossier que le fichier python. On ouvre celui-ci en mode écrite (`w` pour `write`).
3. On déclare une nouvelle variable contenant la liste des descripteurs.
4. On déclare un objet `writer`, ce sera notre "écrivain". On lui précise dans quel fichier écrire (ici `fichier`), **quels sont les descripteurs** et quel délimiteur utiliser (ici la virgule).


!!! info "À retenir !"
    - `csv.writer()` et `csv.DictWriter()` permettent **d’exporter des données en CSV**.
    - Pour exporter en CSV une liste de dictionnaire, il est nécessaire de fournir la liste des descripteurs en plus de la table.

!!! expert "Pour aller plus loin : Compléter un fichier CSV existant"
    Il est également possibile d'ouvrir un fichier en mode **a**ppend afin de le compléter.

    Par exemple, considérons le fichier CSV suivant : 

    ```csv title="eleves.csv"
    ID,Nom,Âge,Moyenne
    1,Alice,16,15.8
    2,Bob,17,13.2
    3,Clara,16,17.5
    ```

    On peut ajouter des élèves grâce au code suivant : 

    ```python linenums="1"
    import csv

    with open("eleves.csv", 'a') as fichier:
        descripteurs = ["ID", "Nom", "Âge", "Moyenne"]
        writer = csv.DictWriter(fichier, descripteurs, delimiter=",")
        writer.writerows(new_students)
    ```

    Ce qui nous donnera : 

    ```csv title="eleves.csv"
    ID,Nom,Âge,Moyenne
    1,Alice,16,15.8
    2,Bob,17,13.2
    3,Clara,16,17.5
    4,Benjamin,16,14.1
    5,Valérie,17,18.5

    ```

--- 