---
title: Bibliothèques en Python
weight: 4
---

# Les bibliothèques Python 🧩

!!! definition "Définition : Bibliothèque"
    Une **bibliothèque** (ou *module*) est un ensemble de **fonctions prêtes à l’emploi** permettant d’enrichir les capacités de Python.

Plutôt que de tout réécrire soi-même, on peut **importer** des bibliothèques existantes pour effectuer des tâches plus complexes :  mathématiques, aléatoire, statistiques, traitement de texte, etc.

---

## Importer une bibliothèque

En Python, il existe diverses façons d'importer une bibliothèque, en fonction de nos besoins :

!!! python "Importation d'un module complet"
    Pour importer un **module complet**, il est possible de procéder de trois manières différentes : 

    - `import module` : importe le module `module`, nécessite le nom du module pour utiliser une fonction : 
  
        ```python
        import math
        print(math.sqrt(16)) #Renvoie la racine carré de 16
        ```
    - `import module as surnom` : importe le module `module` et le renomme `surnom`, nécessite également le surnom du module pour utiliser une fonction : 
  
        ```python
        import math as m
        print(m.sqrt(16)) #Renvoie la racine carré de 16
        ```
    - `from module import *` : importe toutes les fonctions du module `module`, ne nécessite que l'appel de la fonction :
  
        ```python
        from math import *
        print(sqrt(16)) #Renvoie la racine carré de 16
        ```

        ⚠️ Cette méthode est déconseillée dans les grands programmes, car elle peut créer des conflits entre noms de fonctions.

!!! python "Importation d'une fonction d'un module"
    Pour importe une seule fonction d'un module, deux choix s'offrent à nous : 

    - `from module import fonction` : importe uniquement la fonction `fonction` du module `module`.

        ```python linenums="1"
        from math import sqrt
        print(sqrt(25))  # Affiche 5.0
        ```

    - `from module import fonction as surnom` : importe uniquement la fonction `fonction` du module `module` en la renomant `surnom`.

        ```python linenums="1"
        from math import sqrt as racine_carree
        print(racine_carree(25))  # Affiche 5.0
        ```

!!! tip "Importation multiple"
    Il est également possible d'importer plusieurs modules simultanément : 

    ```python linenums="1"
    import random, math

    x = random.randint(1, 100)  # nombre aléatoire entre 1 et 100
    print(f"Nombre choisi : {x}")
    print(f"Sa racine carrée : {math.sqrt(x)}")
    ```

---

## Quelques bibliothèques utiles 💡

Voici quelques bibliothèques qui nous seront parfois très utiles cette année : 

| Bibliothèque | Utilisation principale | Exemple |
|---------------|-----------------------|----------|
| `math` | Fonctions mathématiques | `math.sqrt(9)` → `3.0` |
| `random` | Générer des valeurs aléatoires | `random.randint(1, 6)` |
| `statistics` | Calculs statistiques | `statistics.mean([12, 15, 18])` |
| `datetime` | Manipuler les dates et heures | `datetime.date.today()` |
| `time` | Mesurer le temps, faire des pauses | `time.sleep(1)` |

!!! tip "Astuce"
    Pour savoir **quelles fonctions** sont disponibles dans un module, il est possible d'utiliser la commande `dir()` :

    ```python linenums="1"
    import math
    dir(math)
    ```

    Ici, cela renvoie, par exemple, une **liste de toutes les fonctions et constantes** contenues dans le module `math`.

!!! expert "Pour aller plus loin : Bibliothèques et partage du code 🌍"
    Les bibliothèques Python sont regroupées dans une immense collection appelée **PyPI** (*Python Package Index*).  
    Elles peuvent être installées avec la commande `pip` depuis une console ou terminal :

    ```bash
    pip install numpy
    ```

    Les bibliothèques externes permettent d’aller **bien au-delà** de la bibliothèque standard : traitement d’image, dessin, IA, web, robotique, etc.

---

## À retenir 📌

!!! info "Résumé"
    - Les **bibliothèques** contiennent des fonctions prêtes à l’emploi : on les importe avec `import`.
    - La commande `dir` permet de lister les fonctions présentes dans un module.  
    - Python dispose d’une **grande bibliothèque standard**, mais aussi d’un **vaste écosystème externe** via `pip`.
