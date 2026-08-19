---
title: Langages de programmation
weight: 1
---


# Langages de programmation 💬

Les langages de programmation permettent aux humains de **communiquer avec la machine**.  
Ils offrent un moyen de **décrire des algorithmes** sous une forme que l’ordinateur peut comprendre et exécuter.

---

## Les bases d’un langage de programmation 🧱

!!! definition "Définition : Langage de programmation"
    Un langage de programmation est un **langage formel** utilisé pour **décrire des algorithmes** de façon compréhensible par un ordinateur.

!!! definition "Définition : Programme"
    Un **programme** est une **suite d’instructions** que la machine exécute dans un ordre précis.  
    Ces instructions permettent de réaliser des calculs, d’afficher des informations ou encore de prendre des décisions.

Voici, pour rappel, les **principales instructions** déjà rencontrées :

| Type d’instruction | Rôle | Exemple Python |
|--------------------|------|----------------|
| Affectation | Stocker une valeur | `x = 5` |
| Conditionnelle | Choisir une action | `if x > 0:` |
| Boucle bornée | Répéter un nombre fixe de fois | `for i in range(10):` |
| Boucle non bornée | Répéter tant qu’une condition est vraie | `while x < 10:` |
| Appel de fonction | Exécuter un sous-programme | `print(x)` |

!!! definition "Définition : Fonctions"
    Une **fonction** est un ensemble d'instructions identifiées par un nom, avec éventuellement des arguments en entrée et des résultats en sortie.

Les **fonctions** permettent de **structurer** et **réutiliser** le code. Par exemple : 

```python linenums="1"
def carre(x):
    return x * x

for i in range(5):
    print(carre(i))
```

---

## Paradigmes et classification des langages 🧩

Il existe **des centaines de langages de programmation**.  
Ils se distinguent par leur **style**, leur **usage** ou leur **niveau de proximité avec la machine**.


!!! definition "Définition : Paradigme"
    Un **paradigme** est une manière de penser la programmation. 

Chaque paradigme propose une **façon différente d’organiser le code**.

| Paradigme | Idée principale | Exemples |
|------------|-----------------|-----------|
| Impératif | Décrire les étapes à exécuter | Python, C |
| Fonctionnel | Utiliser des fonctions sans modifier les données | Haskell |
| Orienté objet | Manipuler des objets regroupant données et comportements | Java, Python, Swift |
| Logique | Décrire des faits et des règles logiques | Prolog |
| Événementiel | Réagir à des actions ou événements externes | JavaScript |

!!! tip "Différents styles pour un même objectif"
    Chaque paradigme correspond à **une façon de penser la programmation**, mais tous visent à **résoudre efficacement un problème donné**.

    De plus, passer d'un langage à l'autre est en général assez facile... tant qu'ils sont dans le même paradigme !

!!! expert "Pour aller plus loin : Autres types de classifications"
    Il existe d'autre types de classification des langages de programmation. En particulier : 

    - **Langages généralistes** ou **langages spécialisés** 
        
        Pour différencier les langages utilisables dans de nombreux domaines *(Python, Java, C++, Swift, ...)* de ceux conçus pour un usage précis *(HTML, SQL, ...)*
    - **Langages compilés** ou **langages interprétés**

        Pour indiquer si le programme est traduit entièrement avant exécution *(C, Swift, Java, ...)* ou si le code est lu et exécuté ligne par ligne *(Python, JavaScript, ...)*

    - **Bas niveau** ou **Haut niveau**

        Pour préciser si le langages est proche du matériel : rapide, mais complexe à lire *(assembleur, C, ...)* ou s'il est proche du langage humain : plus simple à écrire et comprendre *(Python, Java, Swift, ...)*

---

## Comparer des syntaxes 🧩

Malgré leurs différences d’écriture, **tous les langages partagent la même logique**.  
Voici un même programme calculant la somme des entiers de 1 à 10, écrit dans quatre langages différents :

!!! example "Somme des entiers de 1 à 10 dans plusieurs langages"

    === "Python"

        Programme en Python : 

        ```python linenums="1"
        somme = 0
        for i in range(1, 11):
            somme += i
        print(somme)
        ```

    === "C"

        Programme en C : 

        
        ```c linenums="1"
        int somme = 0;
        for (int i = 1; i <= 10; i++) {
            somme += i;
        }
        printf("%d", somme);
        ```

    === "JavaScript"

        Programme en JavaScript : 

        
        ```javascript linenums="1"
        let somme = 0;
        for (let i = 1; i <= 10; i++) {
            somme += i;
        }
        console.log(somme);
        ```

    === "Swift"

        Programme en Swift : 

        
        ```swift linenums="1"
        var somme = 0
        for i in 1...10 {
            somme += i
        }
        print(somme)
        ```

!!! info "Observation"
    Le code change légèrement, mais la **logique reste identique** :  
    créer une variable, parcourir une suite de nombres, additionner, afficher.

---

## Pourquoi Python ? 🐍

Python réunit plusieurs atouts qui en font un **excellent langage d’apprentissage** : 

- **Multi-paradigme** : impératif, fonctionnel, orienté objet.  
- **Généraliste** : utilisable pour le web, la data, les IA, l’automatisation...  
- **Haut niveau** : syntaxe claire et lisible.  
- **Interprété** : facile à tester et corriger sans compilation.  
- **Libre et multiplateforme** : fonctionne sur tous les systèmes.

!!! tip "Pourquoi on aime Python"
    Python est lisible, polyvalent et soutenu par une immense communauté éducative.  
    Son but : **rendre la programmation accessible à tous**, sans sacrifier la puissance.

---

## À retenir 📌

!!! info "Résumé"
    - Tous les langages servent à **exprimer des algorithmes**.  
    - Ils partagent les mêmes **structures fondamentales** (séquences, conditions, boucles, fonctions).  
    - Les différences portent sur :
        - le **paradigme** (style de pensée) ;  
        - le **niveau** (haut/bas) ;  
        - le **mode d’exécution** (compilé/interprété).  
    - **Python** est un langage **haut niveau, interprété et multi-paradigme**, idéal pour apprendre et expérimenter.
