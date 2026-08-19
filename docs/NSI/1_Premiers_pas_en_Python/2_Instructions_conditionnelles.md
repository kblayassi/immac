---
title: Instructions conditionnelles
weight: 2
---

# Les instructions conditionnelles 🔁✅❌

Pour que notre programme **prenne des décisions**, il doit pouvoir **tester des conditions**.  
C’est le rôle des **instructions conditionnelles**, qui permettent d’exécuter certaines instructions **seulement si** une condition est vraie.

---

## Structure `if` ➡️

!!! definition "Définition : condition"
    Une **condition** est une expression qui renvoie une valeur booléenne :  
    - `True` (vrai)  
    - `False` (faux)

!!! python "Structure conditionnelle"
    En Python, la structure de base pour tester une condition est :

    ```python linenums="1"
    if condition:
        instructions
    ```

Par exemple, le programme ci-dessous affiche `Majeur` si l'âge est supérieur ou égal à 18 : 

```python linenums="1"
age = 17
if age >= 18:
    print("Majeur")
```

!!! warning "Indentation"
    Le bloc d’instructions à exécuter doit être indenté (en général 1 indentation soit 4 espaces).

    Sinon, Python renvoie une `IndentationError`.

Pour comparer les valeurs dans les conditions, on utilisera des **opérateurs de comparaisons** : 

!!! python "Opérateurs de comparaisons"
    En python, les opérateurs de comparaison sont (presque) les même qu'en mathématiques : 

    <div align="center">

    | Opérateur | Signification                     | Exemple         |
    |-----------|-----------------------------------|-----------------|
    | `==`        | Égal à                            | `x == 5`          |
    | `!=`        | Différent de                      | `nom != "Alice"`  |
    | `<`, `>`      | Inférieur / Supérieur             | `a < 10`          |
    | `<=`, `>=`    | Inf. ou égal / Sup. ou égal       | `x >= 3`          |

    </div>

!!! warning "Ne pas confondre `=` et `==`"
    - `=` sert à **affecter une valeur à une variable**.
    - `==` sert à **tester l’égalité**.


---

## Alternatives : else et elif 🔄

Pour traiter plusieurs cas, on peut utiliser `else` (sinon) et `elif` (sinon si), bien que cela reste facultatif. 

Par exemple, dans notre programme précédent, on pourrait ajouter une option pour préciser si la personne est : majeure, presque majeure ou mineure : 

```python linenums="1"
if age >= 18:
    print("Majeur")
elif age >= 16:
    print("Presque majeur")
else:
    print("Mineur")
```

!!! tip "`elif` successifs"
    Il est possible d'enchainer plusieurs `elif` successivement. 

    En voici un exemple : 

    ```python
    if age < 11: #Si tu as moins de 11 ans...
        print("Tu es à l'école primaire")
    elif 11 <= age < 15 : #Sinon, si tu as entre 11 et 15 ans...
        print("Tu es au collège")
    elif 15 <= age < 18 : #Sinon, si tu as entre 15 et 18 ans...
        print("Tu es au lycée")
    else : #Sinon...
        print("Tu es adulte")
    ```

--- 

## Opérateurs logiques 🧠

Parfois, il est nécessaire de combiner plusieurs conditions. Pour cela, on utilisera des **opérateurs logiques**.

!!! python "Opérateurs logiques"
    Ils permettent de **combiner plusieurs conditions** :

    <div align="center">

    | Opérateur | Signification     | Exemple                   |
    |-----------|-------------------|---------------------------|
    | `and`       | Et logique        | `x > 0 and x < 10`          |
    | `or`        | Ou logique        | `x < 5 or x > 15`           |
    | `not`       | Négation (non)    | `not(x > 10)`               |

    </div>

!!! tip "Attention aux parenthèses"
    Il est recommandé d’**utiliser des parenthèses** pour éviter les ambiguïtés, surtout avec not.

Voici un exemple simple utilisant des conditions logiques : 

```python linenums="1"
age = 17
a_obtenu_permis = True

if (age >= 18) and (a_obtenu_permis == true):
    print("Tu peux aller conduire seul")
else : 
    print("Tu ne peux pas conduire seul")
```

!!! expert "Conditions avec des booléens"
    Dans l'exemple précédent, on teste si la personne a obtenu le permis ou non grâce à la condition `a_obtenu_permis == true`. 

    Dans les faits, on simplifiera généralement la notion en `nom_variable_booleenne` si on veut vérifier qu'elle vaut `True` et `not(nom_variable_booleenne)` si on veut vérifier qu'elle vaut `False`.

    Ainsi, notre programme peut se réecrire : 

    ```python linenums="1"
    if age >= 18 and a_obtenu_permis :
        print("Tu peux aller conduire seul")
    else : 
        print("Tu ne peux pas conduire seul")
    ```

---

## À retenir 📌

!!! info "Résumé"
    - if permet de tester une condition
    - elif permet de tester un autre cas
    - else s’exécute si aucune condition précédente n’est vraie
    - Les opérateurs ==, !=, <, >, <=, >= comparent des valeurs
    - Les opérateurs and, or, not combinent des conditions