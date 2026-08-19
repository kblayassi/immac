---
title: Tester un programme
weight: 3
---

# Tester un programme 🧪

Un programme peut **fonctionner sans être correct** : il peut produire un résultat, mais pas forcément le bon.  
Pour garantir sa fiabilité, il faut le **tester**.

Les tests permettent de **vérifier** qu’un programme se comporte comme prévu et qu’il **respecte sa spécification**.

---

## Pourquoi tester un programme ? 🤔

!!! definition "Définition : Test d’un programme"
    **Tester un programme**, c’est exécuter le code avec différents jeux de données pour **vérifier** que le résultat obtenu correspond au **résultat attendu**.

Tester, c’est donc :

- **détecter les erreurs** (bugs) avant l’utilisation réelle ;
- **valider** le comportement du programme ;
- **assurer** qu’une modification n’en casse pas d’autres (test de non-régression).

---

## Les différents types de tests 🧩

!!! info "Les principaux types de tests"
    | Type de test | Objectif | Exemple |
    |---------------|-----------|----------|
    | Test unitaire | Vérifier le comportement d’une seule fonction | `test_racine_carree()` |
    | Test d’intégration | Vérifier que plusieurs fonctions interagissent correctement | `calculer_note_finale()` qui appelle plusieurs sous-fonctions |
    | Test fonctionnel | Vérifier que le programme répond bien au besoin global | L’utilisateur saisit une note et obtient une moyenne correcte |

En NSI, on se concentre surtout sur les **tests unitaires**, car ils permettent de **valider les fonctions une à une**.

---

## Le jeu de tests 🎯

!!! definition "Définition : Jeu de tests"
    Un **jeu de tests** est un ensemble d’exemples choisis pour **évaluer le comportement d’un programme**.  
    Chaque test associe :

    - des **entrées** connues ;
    - un **résultat attendu**.

Par exemple, pour une fonction `carre(x)` :

```python linenums="1"
def carre(x):
    return x * x
```

On pourra tester :

```python linenums="1"
print(carre(2))  # Doit renvoyer 4
print(carre(5))  # Doit renvoyer 25
print(carre(0))  # Doit renvoyer 0
```

!!! tip "Bon réflexe"
    Un bon jeu de tests doit inclure :

    - des valeurs classiques (cas simples) ;
    - des valeurs limites (0, négatif, très grand, etc.) ;
    - éventuellement des valeurs erronées (pour vérifier les préconditions).

---

## Utiliser `assert` pour tester automatiquement 🧠

On peut automatiser ces vérifications avec `assert`.

En reprenant les tests de la fonction `carre` précédente, on aura alors : 

```python linenums="1"
# Tests automatiques
assert carre(2) == 4
assert carre(5) == 25
assert carre(0) == 0
```

Si toutes les assertions sont vraies, le programme s’exécute sans message.
Sinon, il affiche une erreur.

!!! info "Avantage"
    Ces tests sont rapides à écrire et se rejouent automatiquement à chaque modification du code.

!!! expert "Pour aller plus loin : `doctest`"
    Python permet d’intégrer les tests directement dans la documentation de la fonction grâce au module `doctest`.

    Si on reprend notre fonction `carre`, l'utilisation de `doctest` se traduirait par la syntaxe suivante : 

    ```python linenums="1"
    def carre(x):
        """
        Calcule le carré d'un nombre.

        >>> carre(2)
        4
        >>> carre(3)
        9
        """
        return x * x

    import doctest
    doctest.testmod()
    ```

    Résultat :  
    ✅ Si tous les tests passent, rien ne s’affiche.  
    ❌ En cas d’erreur, Python indique le test qui a échoué.

---

## À retenir 📌

!!! info "Résumé"
    - **Tester**, c’est comparer les résultats obtenus avec les résultats attendus.
    - Les **tests unitaires** vérifient chaque fonction séparément.
    - Un **jeu de tests** doit couvrir les cas classiques, limites et erronés.
    - Le mot-clé `assert` **automatise** les vérifications.
    - Le module `doctest` permet de **tester directement dans la documentation**.
    - Un programme est fiable lorsqu’il passe tous les tests définis par sa spécification.