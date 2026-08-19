---
title: Des tables de données
weight: 1 
---

# Présentation et représentation des tables de données 📊

Les données sont partout dans notre quotidien, que ce soit sous forme de relevés météorologiques, de bases de clients ou encore de résultats d'examens. Pour les exploiter efficacement, elles doivent être organisées de manière structurée. 

L’une des façons les plus courantes de représenter des données est sous **forme de table**, c'est-à-dire un ensemble d’informations **organisées en lignes et colonnes**. Ce format est simple à comprendre et permet d’appliquer facilement des traitements automatisés.

Dans cette partie, nous allons voir **pourquoi** structurer les données sous forme de table, découvrir les **principaux termes associés**, explorer différentes **représentations en Python** et apprendre à **manipuler des fichiers CSV**, un format standard pour stocker des données tabulaires.

---

## 1 - Pourquoi structurer les données sous forme de table ? 📋

Pour représenter de **manière organisée des données**, on choisit généralement un "tableau" : un ensemble de **lignes et de colonnes**, similaire à ce que l'on retrouve dans un tableur (comme Excel, Numbers ou Google Sheets). 

!!! definition "Définition : Table"
    Une **table** est un **ensemble structuré de données**, organisé en **lignes** et **colonnes**. Elle permet de stocker et manipuler des informations de manière efficace.

    *Exemple : Imaginons un fichier contenant des informations sur des élèves :*

    | ID  | Nom      | Âge | Moyenne |
    |-----|---------|----|---------|
    | 1   | Alice    | 16 | 15.8    |
    | 2   | Bob      | 17 | 13.2    |
    | 3   | Clara    | 16 | 17.5    |

Chaque élément de la table possède sa propre ligne. On parlera d'**enregistrement**.

!!! definition "Définition : Enregistrement"
    Un **enregistrement** (ou **ligne**) est une **entrée unique** dans la table, contenant plusieurs valeurs associées à chaque descripteur.

    *Exemple : L’enregistrement `(2, "Bob", 17, 13.2)` représente un élève de 17 ans avec une moyenne de **13.2**.*

Afin d'organiser, dans un premier temps, et de traiter, dans un second temps, les données de notre table, il est nécessaire que tous les enregistrements possèdent les mêmes types d'informations, les mêmes **descripteurs**.

!!! definition "Définition : Descripteur"
    Un **descripteur** correspond au **nom d’une colonne** dans une table. Il identifie le type d’information stocké dans cette colonne.

    *Exemple : Dans la table d'élèves précédente, les descripteurs sont `"ID"`, `"Nom"`, `"Âge"` et `"Moyenne"`.*

Il sera également nécessaire que la table soit complète : chaque **enregistrement** doit posséder une **valeur** pour chaque **descripteur**.

!!! definition "Définition : Valeur"
    Une **valeur** est une donnée individuelle stockée dans une **cellule** de la table. Elle correspond à l’intersection entre une ligne et un descripteur.

    *Exemple : `"Alice"` est une valeur pour le descripteur `"Nom"`, **16** est une valeur pour le descripteur `"Âge"`.*

#### **Pourquoi utiliser des tables ?** 📌
Structurer les données sous forme de table présente plusieurs **avantages** :

- **Clarté et lisibilité** : les données sont organisées de manière tabulaire, ce qui les rend faciles à lire et interpréter.
- **Manipulation efficace** : il est simple d’effectuer des opérations comme le tri, la recherche ou la sélection de certaines lignes.
- **Interopérabilité** : les formats tabulaires (comme CSV) sont largement utilisés dans les bases de données, les tableurs et les logiciels de traitement de données.
- **Automatisation** : avec un langage comme **Python**, il est facile d’automatiser des tâches de traitement et d’analyse de grandes quantités de données.

!!! info "À retenir !"
    * Une **table** est une collection (un ensemble) d'**enregistrements**.
    * Chaque **enregistrement** contient une **valeur** pour chaque **descripteur** de la table.

---

## 2 - Représentation des tables en Python 🐍

Maintenant que nous avons défini ce qu’est une **table de données** et compris son utilité, il est temps de voir comment nous pouvons les **modéliser et manipuler en Python**. 📊

En Python, une table peut être représentée de plusieurs manières, en fonction des besoins. 📋

### Liste de listes 📄

Chaque enregistrement est une **liste**, et chaque élément de cette liste correspond à une **valeur**. Notre table est donc représentée par une liste de listes.

```python title="Python" linenums="1"
table = [
    [1, "Alice", 16, 15.8],
    [2, "Bob", 17, 13.2],
    [3, "Clara", 16, 17.5]
]
```

**Avantages ✅ :**

- Structure simple et proche d'un tableau matriciel.
- Facile à créer et manipuler

**Inconvénients ❌ :**

- L'accès aux valeurs se fait par **indice numérique** (exemple : `table[1][2]` pour accéder à l'âge de Bob), ce qui peut être source d'erreurs.
- Pas de noms explicite pour les colonnes.

### Liste de tuples 📦

On garde une strucure similaire, mais chaque enregistrement sera représenté sous forme d'un **tuple** : 

```python title="Python" linenums="1"
table = [
    (1, "Alice", 16, 15.8),
    (2, "Bob", 17, 13.2),
    (3, "Clara", 16, 17.5)
]
```

**Avantages ✅ :**

- Les tuples sont **immuables**, ce qui évite les modifications éventuelles.
- Légèrement plus rapide que les listes car non modifiables.

**Inconvénients ❌ :**

- L'accès aux valeurs se fait toujours par **indice numérique**.
- Moins flexible que les listes pour des manipulations avancées.

### Liste de dictionnaires 🔑

Chaque enregistrement est alors représenté par un **dictionnaire**, où les descripteurs sont les **clés**. On obtient ainsi une table représentée sous forme d'une liste de dictionnaires : 

```python title="Python" linenums="1"
table = [
    {"ID": 1, "Nom": "Alice", "Âge": 16, "Moyenne": 15.8},
    {"ID": 2, "Nom": "Bob", "Âge": 17, "Moyenne": 13.2},
    {"ID": 3, "Nom": "Clara", "Âge": 16, "Moyenne": 17.5}
]
```

**Avantages ✅ :**

- Accès **direct par descripteur** (exemple : `table[1]["Âge"] pour obtenir l'âge de Bob)
- Meilleure **lisibilité** et compréhension du code.

**Inconvénients ❌ :**

- Nécessite un peu plus de mémoire que les listes ou tuples.

### Quelle représentation choisir ? 🤔

On peut dresser le tableau récapitulatif suivant : 

| Représentation          | Accès aux lignes | Accès aux colonnes | Modifiable ? | Lisibilité |
|-------------------------|-----------------|---------------------|--------------|------------|
| Liste de listes 📄       | ✔️ Facile       | ❌ Complexe (boucles) | ✔️ Oui        | 😕 Peu clair |
| Liste de tuples 📦      | ✔️ Facile       | ❌ Complexe          | ❌ Non       | 😕 Peu clair |
| Liste de dictionnaires 🔑 | ✔️ Facile       | ✔️ Facile            | ✔️ Oui       | ✅ Très lisible |
| Dictionnaire de listes 📊 | ❌ Complexe    | ✔️ Facile (`dict[key]`) | ✔️ Oui      | ⚠️ Moyen |

La **liste de dictionnaires** est généralement le choix le plus pratique car :

- Elle permet un **accès direct aux valeurs** grâce aux descripteurs.
- Elle est **plus lisible** et facilite la compréhension du code.
- Elle est **modulable**, permettant l’ajout et la suppression d’enregistrements sans complication.

!!! info "À retenir !"
    - **Plusieurs représentations existent en Python** :
        - Les **listes de listes** et **listes de tuples** sont simples mais peu lisibles.
        - La **liste de dictionnaires** est souvent le meilleur choix pour une **manipulation efficace**.
    - Le choix de la représentation dépend des **besoins en manipulation des données**.

---

## 3 - Fichiers CSV : standard et structure 📄

Les **fichiers CSV** (**Comma-Separated Values**) sont un format de stockage et d’échange de **données tabulaires** largement utilisé. Ils permettent de représenter une table sous forme de **texte brut**, où chaque ligne correspond à un **enregistrement**.

Le format CSV est apparu avec les premiers tableurs dans les années 1970. Il est devenu un **standard universel** pour le stockage et l’échange de données, notamment entre **logiciels tableurs (Excel, Google Sheets), bases de données et langages de programmation**. 

Malgré son ancienneté, il reste **très utilisé** grâce à sa simplicité et sa compatibilité avec presque tous les outils de gestion de données.


### Structure d’un fichier CSV 📝

Un fichier CSV est un simple fichier texte où :
- Chaque **ligne** représente un **enregistrement**.
- Chaque **colonne** est séparée par un **caractère délimiteur** (souvent `,` ou `;`).
- La première ligne contient souvent les **descripteurs**.

Par exemple, considérons à nouveau la table ci-dessous :

| ID  | Nom   | Âge | Moyenne |
|-----|------|----|---------|
| 1   | Alice | 16 | 15.8    |
| 2   | Bob   | 17 | 13.2    |
| 3   | Clara | 16 | 17.5    |

Le fichier CSV correspondant serait alors : 

```CSV
ID,Nom,Âge,Moyenne
1,Alice,16,15.8
2,Bob,17,13.2
3,Clara,16,17.5
```

### Délimiteurs et encodage 🔤

Les fichiers CSV peuvent différer selon les **délimiteurs** utilisés :

- **`,`** (virgule) : standard dans la plupart des logiciels.
- **`;`** (point-virgule) : souvent utilisé en France et dans les logiciels comme Excel.
- **`\t`** (tabulation) : format similaire appelé TSV (*Tab-Separated Values*).

L’**encodage** est aussi un aspect important : 

- **UTF-8** est recommandé pour assurer la compatibilité avec tous les caractères.
- Certains logiciels (comme Excel) utilisent **ISO-8859-1 (Latin-1)** par défaut, ce qui peut poser des problèmes d'affichage.

### Avantages et limites des fichiers CSV ⚖️

Utiliser des fichiers CSV pour représenter des tables de données présente des avantages indéniables : 

- **Format léger et universel** : compatible avec tous les logiciels et langages.
- **Facilement lisible** par les humains et machines.
- **Supporté par Python, Excel, Google Sheets, bases de données**, etc.

Toutefois, ce type de fichiers n'est pas excempt de défauts. On notera, par exemple : 

- **Pas de gestion des types de données** (tout est stocké sous forme de texte).
- **Difficulté avec les valeurs contenant des virgules** (requiert des guillemets pour éviter les erreurs).
- **Peu optimisé** pour des fichiers très volumineux (formats binaires plus efficaces).

!!! info "À retenir !"
    - Un **CSV est un fichier texte structuré** qui représente une **table de données**.
    - Il utilise un **délimiteur** (`,` ou `;`) pour séparer les valeurs.
    - Il est **simple et universel**, mais ne gère pas directement les **types de données**.
    - L’**encodage** peut varier selon les logiciels, nécessitant parfois une conversion.